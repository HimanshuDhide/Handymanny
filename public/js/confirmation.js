document.addEventListener("DOMContentLoaded", function() {
    fetchOrderDetails();
});

function fetchOrderDetails() {
    // Assuming you are passing an order ID in the query parameter (or you could use session storage, etc.)
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId'); // Example: ?orderId=12345

    if (!orderId) {
        console.error('Order ID is missing');
        return;
    }

    // Fetch order details from your server
    fetch(`/service-provider/order/${orderId}`)  // Assuming your backend endpoint
        .then(response => response.json())
        .then(data => {
            if (data && data.order) {
                // Populate order details in the HTML
                document.getElementById('provider-name-value').textContent = data.order.providerName;
                document.getElementById('provider-number-value').textContent = data.order.providerNumber;
                document.getElementById('appointment-date-value').textContent = data.order.date;
                document.getElementById('appointment-time-value').textContent = data.order.timeSlot;
            } else {
                console.error('Order not found');
            }
        })
        .catch(error => {
            console.error('Error fetching order details:', error);
        });
}
