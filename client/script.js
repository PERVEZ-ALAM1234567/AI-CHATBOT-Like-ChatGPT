document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const loader = document.getElementById("loader");
  const modeToggle = document.getElementById("mode-toggle");

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    addMessage("user", message);
    userInput.value = "";

    showLoader(true);

    const botReply = await getBotReply(message);
    showLoader(false);

    addMessage("bot", botReply);
  });

  function addMessage(sender, text) {
    const messageEl = document.createElement("div");
    messageEl.classList.add("message", sender);
    messageEl.textContent = "";

    chatBox.appendChild(messageEl);
    chatBox.scrollTop = chatBox.scrollHeight;

    if (sender === "bot") {
      typeEffect(messageEl, text);
    } else {
      messageEl.textContent = text;
    }
  }

  // async function getBotReply(message) {
  //   try {
  //     const response = await fetch('http://localhost:5000/api/chat', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ message }),
  //     });

  //     const data = await response.json();
  //     return data.reply;
  //   } catch (error) {
  //     console.error(error);
  //     return "Sorry, I couldn't fetch a reply.";
  //   }
  // }

  async function getBotReply(message) {
    try {
      const response = await fetch("http://localhost:5000/chat", {
        // <-- Sahi URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error(error);
      return "Sorry, I couldn't fetch a reply.";
    }
  }

  function typeEffect(element, text, delay = 30) {
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i > text.length) clearInterval(interval);
    }, delay);
  }

  function showLoader(show) {
    loader.classList.toggle("hidden", !show);
  }

  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      modeToggle.textContent = "☀️ Light Mode";
    } else {
      modeToggle.textContent = "🌙 Dark Mode";
    }
  });
});
