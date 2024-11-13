const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

sidebarLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        // Remove active link from all
        sidebarLinks.forEach(link => link.classList.remove('active-link'));

        // Add active link to the clicked one
        this.classList.add('active-link');

        // Redirect based on link text
        if (this.textContent.includes('Home')) {
            window.location.href = '/home';
        } else if (this.textContent.includes('Search')) {
            window.location.href = '/search';
        } else if (this.textContent.includes('Service')) {
            window.location.href = '/service';
        } else if (this.textContent.includes('Book Now')) {
            window.location.href = '/booking';
        } else if (this.textContent.includes('Favorites')) {
            window.location.href = '/favorites';
        } else if (this.textContent.includes('Manage')) {
            window.location.href = '/manage';
        } else if (this.textContent.includes('Sign Out')) {
            window.location.href = '/signout';
        }
    });
});
