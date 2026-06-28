from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction
from django.db.models import Q
from .serializers import UserRegisterSerializer, BusSerializer, BookingSerializer, SeatSerializer
from .models import Bus, Seat, Bookings

class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.id,
                'message': 'Registration successful'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.id,
                'username': user.username,
                'message': 'Login successful'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'Invalid username or password'
            }, status=status.HTTP_401_UNAUTHORIZED)

class BusListCreateView(generics.ListCreateAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
    permission_classes = [AllowAny]

class BusDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
    permission_classes = [AllowAny]

class BookingView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        seat_id = request.data.get('seat')
        
        if not seat_id:
            return Response({'error': 'Seat ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Use select_for_update to prevent race conditions
            seat = Seat.objects.select_for_update().get(id=seat_id)
            
            if seat.is_booked:
                return Response({
                    'error': 'Seat is already booked',
                    'seat_id': seat_id
                }, status=status.HTTP_409_CONFLICT)
            
            # Check if user already has a booking for this seat
            existing_booking = Bookings.objects.filter(
                user=request.user,
                seat=seat
            ).exists()
            
            if existing_booking:
                return Response({
                    'error': 'You have already booked this seat'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Book the seat
            seat.is_booked = True
            seat.save()
            
            booking = Bookings.objects.create(
                user=request.user,
                bus=seat.bus,
                seat=seat
            )
            
            serializer = BookingSerializer(booking)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Seat.DoesNotExist:
            return Response({'error': 'Invalid Seat ID'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        if request.user.id != user_id:
            return Response({'error': 'Unauthorized access'}, status=status.HTTP_403_FORBIDDEN)
        
        bookings = Bookings.objects.filter(user_id=user_id).select_related('bus', 'seat')
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)

class CancelBookingView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def delete(self, request, booking_id):
        try:
            booking = Bookings.objects.select_for_update().get(
                id=booking_id,
                user=request.user
            )
            
            # Free up the seat
            seat = booking.seat
            seat.is_booked = False
            seat.save()
            
            # Delete the booking
            booking.delete()
            
            return Response({
                'message': 'Booking cancelled successfully',
                'booking_id': booking_id
            }, status=status.HTTP_200_OK)
            
        except Bookings.DoesNotExist:
            return Response({
                'error': 'Booking not found or you are not authorized to cancel it'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AvailableSeatsView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, bus_id):
        try:
            bus = Bus.objects.get(id=bus_id)
            seats = Seat.objects.filter(bus=bus)
            serializer = SeatSerializer(seats, many=True)
            return Response({
                'bus_id': bus.id,
                'bus_name': bus.bus_name,
                'total_seats': seats.count(),
                'available_seats': seats.filter(is_booked=False).count(),
                'booked_seats': seats.filter(is_booked=True).count(),
                'seats': serializer.data
            })
        except Bus.DoesNotExist:
            return Response({'error': 'Bus not found'}, status=status.HTTP_404_NOT_FOUND)