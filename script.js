// ── Booking Form ──────────────────────────────────────────
const bookBtn = document.getElementById('bookBtn');

if (bookBtn) {

  bookBtn.addEventListener('click', async () => {

    const name = document.getElementById('bookName').value.trim();
    const phone = document.getElementById('bookPhone').value.trim();
    const date = document.getElementById('bookDate').value;

    // Validation
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

      // 🔥 Backend API Call
      const response = await fetch('http://35.176.246.29:5000/api/book', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name,
          phone,
          date,
          guests: 2
        })

      });

      const data = await response.json();

      console.log(data);

      // Success
      if (data.success) {

        window.location.href = 'thankyou.html';

      } else {

        alert(data.message);

        bookBtn.disabled = false;
        bookBtn.textContent = 'Confirm Reservation 🔥';
      }

    } catch (error) {

      console.error(error);

      alert('Server error');

      bookBtn.disabled = false;
      bookBtn.textContent = 'Confirm Reservation 🔥';
    }

  });

}
