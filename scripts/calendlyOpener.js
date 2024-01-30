document.addEventListener('DOMContentLoaded', function() {
  fetch('contacts.html')
    .then(response => response.text())
    .then(html => {
      // Insert the fetched HTML into the placeholder
      document.getElementById('contacts-placeholder').innerHTML = html;

      // Whem contacts is loaded, attach the event listener to it
      var calendlySection = document.getElementById('Calendly');
      calendlySection.style.display = 'none';

      // Showing Calendly on click and scroll to it
      document.getElementById('showCalendly').addEventListener('click', function() {
        calendlySection.style.display = 'block';
        calendlySection.scrollIntoView({ behavior: 'smooth' });
      });
    })
    .catch(error => {
      console.error('Error loading contacts:', error);
    });
});
