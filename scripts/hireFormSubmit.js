document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const submitButton = form.querySelector('button[type="submit"]');
  const formContainer = document.getElementById('hire');

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the default form submission action

    // Change the button text to "Submitting..."
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    // Prepare the form data to be sent
    const formData = new FormData(form);
    const data = {};
    formData.forEach(function(value, key){
      data[key] = value;
    });

    // Sending the data to the Google Apps Script Web App
    fetch('https://script.google.com/macros/s/AKfycbyh1J85A3J_Ni5Jlh8-ahZzEME5SxUjAQoOrldKrO9Q8j-h88s9hTH_Vsmex_ciUxVa/exec', {
      method: 'POST',
      mode: 'no-cors', // Prevents CORS issues
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    }).then(() => {
      // Hide the form and show the success message
      form.style.display = 'none';
      const successMessage = document.createElement('div');
      successMessage.textContent = 'Form submitted successfully.';
      successMessage.style.textAlign = 'center';
      successMessage.style.margin = '20px auto';
      successMessage.style.padding = '10px';
      successMessage.style.border = '1px solid';
      successMessage.style.borderRadius = '8px';
      successMessage.style.boxSizing = 'border-box';
      formContainer.appendChild(successMessage);

      // Clear the form fields
      form.reset();

      // Reset the button text and re-enable it
      submitButton.textContent = 'Suggest Job';
      submitButton.disabled = false;

      // After 10 seconds, hide the success message and show the form again
      setTimeout(() => {
        successMessage.style.display = 'none';
        form.style.display = 'flex';
      }, 6000);
    });
  });
});
