// form-utils.js

function showMessage(text, type) {
  window.message.textContent = text;
  window.message.className = type;
  window.message.style.display = "block";
}

function checkFormValidity() {
  if (isFormValid()) {
    window.submitBtn.classList.add("active");
    window.submitBtn.disabled = false;
  } else {
    window.submitBtn.classList.remove("active");
    window.submitBtn.disabled = true;
  }
}
