from rest_framework import serializers
from .models import Bus, Seat, Bookings
from django.contrib.auth.models import User

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['id', 'seat_number', 'is_booked']

class BusSerializer(serializers.ModelSerializer):
    seats = SeatSerializer(many=True, read_only=True)
    
    class Meta:
        model = Bus
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    bus = serializers.StringRelatedField(source='bus.bus_name')
    bus_id = serializers.IntegerField(source='bus.id', read_only=True)
    seat = serializers.StringRelatedField(source='seat.seat_number')
    seat_id = serializers.IntegerField(source='seat.id', read_only=True)
    user = serializers.StringRelatedField(source='user.username')
    origin = serializers.CharField(source='bus.origin', read_only=True)
    destination = serializers.CharField(source='bus.destination', read_only=True)
    bus_name = serializers.CharField(source='bus.bus_name', read_only=True)
    bus_number = serializers.CharField(source='bus.number', read_only=True)
    start_time = serializers.TimeField(source='bus.start_time', read_only=True)
    reach_time = serializers.TimeField(source='bus.reach_time', read_only=True)
    
    class Meta:
        model = Bookings
        fields = [
            'id', 'user', 'bus', 'bus_id', 'seat', 'seat_id', 
            'booking_time', 'origin', 'destination', 'bus_name', 
            'bus_number', 'start_time', 'reach_time'
        ]
        read_only_fields = ['user', 'booking_time']