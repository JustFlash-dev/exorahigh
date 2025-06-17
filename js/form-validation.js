// form-validation.js

function isValidEmail(email) {
  const forbiddenChars = ['%', ',', ';', ' '];
  if (forbiddenChars.some(char => email.includes(char))) return false;
  const pattern = /^[a-zA-Z0-9](?!.*\.{2})[a-zA-Z0-9._+\-]{0,63}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!pattern.test(email)) return false;
  if (typeof allowedEmailDomains !== "undefined") {
    const domain = email.toLowerCase().split('@')[1];
    return allowedEmailDomains.includes(domain);
  }
  return true;
}

function isFormValid() {
  const name = window.nameInput.value.trim();
  const phone = window.phoneInput.value.trim();
  const email = window.emailInput.value.trim();
  const isNameValid = /[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]/.test(name);
  const digits = phone.replace(/\D/g, "");
  const isPhoneValid = phone.startsWith("+") && digits.length >= 7 && digits.length <= 15;
  const isEmailValid = isValidEmail(email);
  return isNameValid && isPhoneValid && isEmailValid;
}
