from django.urls import path
from .views import (
    RegisterView, LoginView, BusListCreateView, 
    UserBookingView, BookingView, BusDetailView,
    CancelBookingView, AvailableSeatsView
)

urlpatterns = [
    path('buses/', BusListCreateView.as_view(), name='bus-list'),
    path('buses/<int:pk>/', BusDetailView.as_view(), name='bus-detail'),
    path('buses/<int:bus_id>/seats/', AvailableSeatsView.as_view(), name='bus-seats'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/<int:user_id>/bookings/', UserBookingView.as_view(), name='user-bookings'),
    path('booking/', BookingView.as_view(), name='create-booking'),
    path('booking/<int:booking_id>/cancel/', CancelBookingView.as_view(), name='cancel-booking'),
]