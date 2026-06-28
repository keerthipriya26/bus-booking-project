from django.contrib import admin
from .models import Bus, Seat, Bookings

class SeatInline(admin.TabularInline):
    model = Seat
    extra = 0
    fields = ['seat_number', 'is_booked']
    readonly_fields = ['seat_number']

class BusAdmin(admin.ModelAdmin):
    list_display = ('bus_name', 'number', 'origin', 'destination', 'start_time', 'reach_time', 'price')
    list_filter = ('origin', 'destination')
    search_fields = ('bus_name', 'number', 'origin', 'destination')
    inlines = [SeatInline]
    
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        if not change:  # Only create seats when bus is first created
            for i in range(1, obj.no_of_seats + 1):
                Seat.objects.get_or_create(bus=obj, seat_number=f'S{i}')

class SeatAdmin(admin.ModelAdmin):
    list_display = ('seat_number', 'bus', 'is_booked')
    list_filter = ('is_booked', 'bus')
    search_fields = ('seat_number', 'bus__bus_name')
    list_editable = ('is_booked',)

class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'bus', 'seat', 'booking_time')
    list_filter = ('booking_time', 'bus')
    search_fields = ('user__username', 'bus__bus_name', 'seat__seat_number')
    readonly_fields = ('booking_time',)
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user', 'bus', 'seat')

admin.site.register(Bus, BusAdmin)
admin.site.register(Seat, SeatAdmin)
admin.site.register(Bookings, BookingAdmin)