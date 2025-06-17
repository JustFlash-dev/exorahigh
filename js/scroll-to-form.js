document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.scroll-to-registration').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      // Прокручиваем к форме с id="regForm" (или классом .register-form)
      const regForm = document.getElementById("regForm") || document.querySelector(".register-form");
      if (regForm) {
        regForm.scrollIntoView({ behavior: "smooth", block: "center" });
        // Необязательно: сделать краткую подсветку/анимацию
        regForm.classList.add("scroll-highlight");
        setTimeout(() => regForm.classList.remove("scroll-highlight"), 1200);
      }
    });
  });
});