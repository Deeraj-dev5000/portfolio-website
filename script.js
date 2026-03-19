const form = document.getElementById("contactForm");

// Submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const data = { name, email, message };

  try {
    await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    alert("Message sent successfully!");
    form.reset();

    loadMessages(); // reload messages instantly

  } catch (err) {
    alert("Something went wrong");
  }
});

// Load messages
async function loadMessages() {
  const res = await fetch("http://localhost:3000/messages");
  const data = await res.json();

  const container = document.getElementById("messagesList");
  container.innerHTML = "";

  data.forEach(msg => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="message-card">
        <h3>${msg.name}</h3>
        <p><strong>Email:</strong> ${msg.email}</p>
        <p>${msg.message}</p>
      </div>
    `;

    container.appendChild(div);
  });
}

// Auto load on page open
loadMessages();