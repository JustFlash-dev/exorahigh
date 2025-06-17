// main.js

document.addEventListener("DOMContentLoaded", function () {
  // Глобальные элементы
  window.form = document.getElementById("regForm");
  window.message = document.getElementById("message");
  window.nameInput = document.getElementById("name");
  window.phoneInput = document.getElementById("phone");
  window.emailInput = document.getElementById("email");
  window.messangersInput = document.getElementById("messangers");
  window.submitBtn = form.querySelector(".send-form-btn");
  // Если есть emailDomains.js — allowedEmailDomains будет в window

  setupInputMasks();
  setupFormSubmit();
  validateFieldsAndShowErrors();
});
