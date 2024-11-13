document.addEventListener('DOMContentLoaded', function() {
    // Select all result items
    const resultItems = document.querySelectorAll('.result-item');

    // Add click event listener to each result item
    resultItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the service name from the heading
            const serviceName = this.querySelector('h2').textContent.trim().toLowerCase();
            
            // Map service names to their corresponding pages
            const servicePages = {
                'electrician': 'views/electrician.html',
                'plumber': 'views/plumber.html',
                'painter': 'views/painter.html',
                'nanny': 'views/nanny.html',
                'maid': 'views/maid.html',
                'carpenter': 'views/carpenter.html',
                'security': 'views/security.html',
                'cook': 'views/cook.html'
            };
            
            // Navigate to the corresponding page
            if (servicePages[serviceName]) {
                window.location.href = '/' + servicePages[serviceName];
            }
            const page = servicePages[searchTerm];

            if (page) {
                // Redirect to the matching page if found
                window.location.href = page;
            } else {
                alert('Service not found. Please try searching for another service.');
            }
        });
    });
            
});


