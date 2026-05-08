// ── Booking Form ──────────────────────────────────────────
const bookBtn = document.getElementById('bookBtn');

if (bookBtn) {

  bookBtn.addEventListener('click', async () => {

    const name  = document.getElementById('bookName').value.trim();
    const phone = document.getElementById('bookPhone').value.trim();
    const date  = document.getElementById('bookDate').value;

    // validation
    if (!name || !phone || !date) {

      bookBtn.textContent = '⚠️ Please fill all fields';

      setTimeout(() => {
        bookBtn.textContent = 'Confirm Reservation 🔥';
      }, 2000);

      return;
    }

    try {

      bookBtn.textContent = 'Booking...';
      bookBtn.disabled = true;

      // API call to backend server
      const response = await fetch('http://10.0.11.50:5000/api/book', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name,
          phone,
          date
        })
      });

      const data = await response.json();

      console.log(data);

      // success redirect
      if (data.success) {

        window.location.href = 'thankyou.html';

      } else {

        alert(data.message);

        bookBtn.disabled = false;
        bookBtn.textContent = 'Confirm Reservation 🔥';
      }

    } catch (error) {

      console.log(error);

      alert('Server error');

      bookBtn.disabled = false;
      bookBtn.textContent = 'Confirm Reservation 🔥';
    }

  });

}
