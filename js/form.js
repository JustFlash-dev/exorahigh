document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("regForm");
  const message = document.getElementById("message");

  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const contactInput = document.getElementById("messangers");
  const submitBtn = form.querySelector(".send-form-btn");

  // === Утилиты ===
  const showMessage = (text, type) => {
    message.textContent = text;
    message.className = type;
    message.style.display = "block";
  };

  const isValidEmail = (email) => {
    const forbiddenChars = ['%', ',', ';', ' '];
    if (forbiddenChars.some(char => email.includes(char))) return false;

    const pattern = /^[a-zA-Z0-9](?!.*\.{2})[a-zA-Z0-9._+\-]{0,63}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(email)) return false;

    const domain = email.toLowerCase().split('@')[1];
    return allowedEmailDomains.includes(domain);
  };

  const checkFormValidity = () => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    submitBtn.disabled = !(name && phone && email);
  };

function checkFormFields() {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (name && phone && email) {
    submitBtn.classList.add("active");
    submitBtn.disabled = false;
  } else {
    submitBtn.classList.remove("active");
    submitBtn.disabled = true;
  }
}

[nameInput, phoneInput, emailInput].forEach(input => {
  input.addEventListener("input", checkFormFields);
});

// начальная проверка при загрузке
checkFormFields();

  // === Ограничения ввода ===
  nameInput.addEventListener("input", () => {
    nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ -]/g, "");
    checkFormValidity();
  });

  emailInput.addEventListener("input", () => {
    emailInput.value = emailInput.value.replace(/[а-яА-ЯёЁіІїЇєЄґҐ ,;%]/g, "");
    checkFormValidity();
  });

  contactInput.addEventListener("input", () => {
    contactInput.value = contactInput.value.replace(/[^a-zA-Z0-9_.@\-]/g, "");
  });

  phoneInput.addEventListener("focus", () => {
    if (!phoneInput.value.startsWith("+")) {
      phoneInput.value = "+" + phoneInput.value.replace(/\D/g, "");
    }
  });

  phoneInput.addEventListener("input", () => {
    const digits = phoneInput.value.replace(/\D/g, "");
    phoneInput.value = "+" + digits.slice(0, 15);
    checkFormValidity();
  });

  phoneInput.addEventListener("blur", () => {
    if (phoneInput.value === "+" || phoneInput.value.trim() === "") {
      phoneInput.value = "";
    }
  });

  // === Отправка формы ===
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const contact = contactInput.value.trim(); // не обязательное

    if (!name || !phone || !email) {
      showMessage("Please fill in all required fields.", "error");
      return;
    }

    if (!/[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]/.test(name)) {
      showMessage("Name must contain valid letters.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("Invalid email address.", "error");
      return;
    }

    const digits = phone.replace(/\D/g, "");
    if (!phone.startsWith("+") || digits.length < 7 || digits.length > 15) {
      showMessage("Phone must start with '+' and contain 7–15 digits.", "error");
      return;
    }

    const formData = new FormData(form);
    
    // Сбор UTM-меток
    const urlParams = new URLSearchParams(window.location.search);
    formData.append("utm_adname", urlParams.get("adname") || "");
    formData.append("utm_adset", urlParams.get("adset") || "");
    formData.append("utm_placement", urlParams.get("placement") || "");

    document.getElementById("preloader").classList.remove("hidden");
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzSPo2L2ryVJt-JrAnwsAaUrxwD6GmgaXc81gXeAQsPt824pEnyRH1ak05iTk-QnXxLyQ/exec", {
        method: "POST",
        body: formData,
         redirect: "follow"
      });

      if (response.ok) {
        form.reset();
        showMessage("Your application has been successfully submitted ✅", "success");
        checkFormValidity();
        if (response.status === 200 || response.status === 302) {
            sessionStorage.setItem("formSubmitted", "true");
            window.location.href = window.location.origin + "/thankyou.html";
            return;
      }
      } else {
        throw new Error();
      }
    } catch {
      document.getElementById("preloader").classList.add("hidden");
      showMessage("Submission failed. Please try again later.", "error");
    }
  });

  checkFormValidity();
});
