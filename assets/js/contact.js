document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (!form) {
    console.error("❌ Contact form not found in DOM");
    return;
  }

  form.addEventListener("submit", async function(event) {
    event.preventDefault();
    console.log("📩 Form submitted");

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("✅ Message sent successfully!");
        this.reset();
      } else {
        alert("❌ Failed to send message.");
      }
    } catch (error) {
      console.error("⚠️ Error:", error);
      alert("⚠️ Something went wrong.");
    }
  });
});
