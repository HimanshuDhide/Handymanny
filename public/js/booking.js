document.getElementById('book-appointment').addEventListener('click', function() {
    // Retrieve values dynamically
    const userId = localStorage.getItem('userId'); // Assuming you stored this in localStorage
    const serviceProviderId = localStorage.getItem('serviceProviderId'); // Assuming you stored this in localStorage
    const serviceProviderName = localStorage.getItem('serviceProviderName'); // Assuming you stored this in localStorage
    const serviceProviderNumber = localStorage.getItem('serviceProviderNumber'); // Assuming you stored this in localStorage
    const date = selectedDate ? selectedDate.textContent : null;
    const timeSlot = selectedTimeSlot ? selectedTimeSlot.textContent : null;

    if (date && timeSlot) {
        fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                serviceProviderId,
                serviceProviderName,
                serviceProviderNumber,
                date,
                timeSlot
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'booking-confirmation.html?orderId=' + data.orderId; // Optionally pass orderId for confirmation
            } else {
                alert('Booking failed, please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Please select both a date and a time slot.');
    }
});
