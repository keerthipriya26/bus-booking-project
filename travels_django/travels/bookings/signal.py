from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Bus, Seat, Bookings

@receiver(post_save, sender=Bus)
def create_seats_for_bus(sender, instance, created, **kwargs):
    if created:
        existing_seats = Seat.objects.filter(bus=instance).count()
        if existing_seats == 0:  # Only create if no seats exist
            for i in range(1, instance.no_of_seats + 1):
                Seat.objects.create(bus=instance, seat_number=f'S{i}')

@receiver(post_delete, sender=Bookings)
def free_seat_on_booking_delete(sender, instance, **kwargs):
    """When a booking is deleted (from admin or API), mark the seat as available again."""
    try:
        seat = instance.seat
        seat.is_booked = False
        seat.save()
    except Exception:
        pass
