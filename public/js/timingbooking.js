var currentDate = new Date();
        var selectedDate = null;

        function generateCalendar(month, year) {
            var calendarBody = document.getElementById('calendar-body');
            calendarBody.innerHTML = '';  // Clear previous calendar
            var monthYearDisplay = document.getElementById('month-year');
            var daysInMonth = new Date(year, month + 1, 0).getDate();
            var firstDay = new Date(year, month, 1).getDay();

            // Set the month and year display
            monthYearDisplay.textContent = currentDate.toLocaleString('default', { month: 'long' }) + ' ' + year;

            // Generate calendar rows and cells
            var row = document.createElement('tr');
            for (var i = 0; i < firstDay; i++) {
                row.appendChild(document.createElement('td'));  // Empty cells before first day
            }

            for (var day = 1; day <= daysInMonth; day++) {
                if ((firstDay + day - 1) % 7 === 0 && day !== 1) {
                    calendarBody.appendChild(row);
                    row = document.createElement('tr');  // Start new row every week
                }

                var cell = document.createElement('td');
                cell.textContent = day;
                cell.addEventListener('click', function() {
                    if (selectedDate) {
                        selectedDate.classList.remove('selected');  // Deselect previously selected date
                    }
                    this.classList.add('selected');  // Select current date
                    selectedDate = this;
                    alert('Selected date: ' + this.textContent + ' ' + monthYearDisplay.textContent);
                });

                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }

        function loadPreviousMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
        }

        function loadNextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
        }

        // Initialize calendar
        generateCalendar(currentDate.getMonth(), currentDate.getFullYear());

        // Event listeners for month navigation
        document.getElementById('prev-month').addEventListener('click', loadPreviousMonth);
        document.getElementById('next-month').addEventListener('click', loadNextMonth);
   

// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';

// document.addEventListener('DOMContentLoaded', function() {
//     var calendarEl = document.getElementById('calendar');
//     var selectedDate = null;
//     var selectedTime = null;

//     // Create the calendar instance
//     var calendar = new Calendar(calendarEl, {
//         initialView: 'dayGridMonth',
//         dateClick: function(info) {
//             selectedDate = info.dateStr;

//             // Add a highlight to the selected date
//             calendarEl.querySelector('.fc-day-selected')?.classList.remove('fc-day-selected');
//             info.dayEl.classList.add('fc-day-selected');
//         }
//     });
//     calendar.render();

//     // Handle time slot selection
//     document.querySelectorAll('.time-slots button').forEach(function(button) {
//         button.addEventListener('click', function() {
//             selectedTime = button.textContent;

//             document.querySelectorAll('.time-slots button').forEach(function(btn) {
//                 btn.style.backgroundColor = '#ff6666'; // Reset others
//             });
//             button.style.backgroundColor = '#cc5252'; // Highlight selected
//         });
//     });

//     // Booking API call
//     document.getElementById('book-appointment').addEventListener('click', function() {
//         if (selectedDate && selectedTime) {
//             fetch('/api/book', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ date: selectedDate, time: selectedTime })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 alert('Booking successful for ' + selectedDate + ' at ' + selectedTime);
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//         } else {
//             alert('Please select a date and time.');
//         }
//     });
// });