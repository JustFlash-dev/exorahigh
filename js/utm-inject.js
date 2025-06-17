// utm-inject.js
function injectUTMToForm(form) {
  if (!form) return;
  const utmKeys = [
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
    "utm_adname", "utm_adset", "utm_placement"
  ];
  utmKeys.forEach(key => {
    // Сначала пробуем получить из URL, потом из localStorage
    let val = new URLSearchParams(window.location.search).get(key) || localStorage.getItem(key) || "";
    // Если в форме уже есть скрытое поле — обновим, если нет — создадим
    let input = form.querySelector(`input[name='${key}']`);
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      form.appendChild(input);
    }
    input.value = val;
  });
}

// Автоматически для формы с id="regForm"
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("regForm");
  if (form) injectUTMToForm(form);
});
