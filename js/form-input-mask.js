// form-input-mask.js

function setupInputMasks() {
  window.nameInput.addEventListener("input", function() {
    this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ -]/g, "");
    checkFormValidity();
  });

  window.emailInput.addEventListener("input", function() {
    this.value = this.value.replace(/[а-яА-ЯёЁіІїЇєЄґҐ ,;%]/g, "");
    checkFormValidity();
  });

  window.messangersInput.addEventListener("input", function() {
    this.value = this.value.replace(/[^a-zA-Z0-9_.@\-]/g, "");
  });

  window.phoneInput.addEventListener("focus", function() {
    if (!this.value.startsWith("+")) {
      this.value = "+" + this.value.replace(/\D/g, "");
    }
  });

  window.phoneInput.addEventListener("input", function() {
    const digits = this.value.replace(/\D/g, "");
    this.value = "+" + digits.slice(0, 15);
    checkFormValidity();
  });

  window.phoneInput.addEventListener("blur", function() {
    if (this.value === "+" || this.value.trim() === "") {
      this.value = "";
    }
  });

  [window.nameInput, window.phoneInput, window.emailInput].forEach(input => {
    input.addEventListener("input", checkFormValidity);
  });
}
