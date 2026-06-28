from django.db import models
from django.contrib.auth.models import User

class Bus(models.Model):
    bus_name = models.CharField(max_length=100)
    number = models.CharField(max_length=20)
    origin = models.CharField(max_length=50)
    destination = models.CharField(max_length=50)
    features = models.TextField(blank=True, null=True)  # Made optional
    start_time = models.TimeField()
    reach_time = models.TimeField()
    no_of_seats = models.PositiveBigIntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f'{self.bus_name} - {self.number} - {self.origin} to {self.destination}'

class Seat(models.Model):
    bus = models.ForeignKey('Bus', on_delete=models.CASCADE, related_name='seats')
    seat_number = models.CharField(max_length=10)
    is_booked = models.BooleanField(default=False)

    class Meta:
        unique_together = ['bus', 'seat_number']  # Prevent duplicate seats

    def __str__(self):
        return f'{self.bus.bus_name} - Seat {self.seat_number}'

class Bookings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE)
    booking_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'seat']  # Prevent double booking same seat by same user
        ordering = ['-booking_time']  # Show newest first

    def __str__(self):
        return f"{self.user.username} - {self.bus.bus_name} - Seat {self.seat.seat_number}"