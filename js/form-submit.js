// async function getGoogleScriptToken() {
//   const res = await fetch('https://canadanews.space/get-token.php');
//   const data = await res.json();
//   return data.token;
// }

function setupFormSubmit() {
  window.form.addEventListener("submit", async function(e) {
    e.preventDefault();
    window.form.style.display = "none";

    // if (!isFormValid()) {
    //   showMessage("Please fill in all required fields correctly.", "error");
    //   return;
    // } РАСКОМЕНТИТЬ ДЛЯ ВАЛИДАЦИИ ЕМАИЛ

    const formData = new FormData(window.form);
    const urlParams = new URLSearchParams(window.location.search);
    formData.append("utm_adname", urlParams.get("adname") || "");
    formData.append("utm_adset", urlParams.get("adset") || "");
    formData.append("utm_placement", urlParams.get("placement") || "");

    try {
      // 1. Получаем токен с сервера
      const token = await getGoogleScriptToken();
      const keyUrl = `https://script.google.com/macros/s/${token}/exec?t=${new Date().getTime()}`;
      console.log('Google Script URL:', keyUrl);
      // const keyUrl = `https://script.google.com/macros/s/${token}/exec`;
      // 2. Отправляем данные формы на сервер
      // Используем fetch для отправки данных формы на Google Apps Script
      const response = await fetch(keyUrl, {
        method: "POST",
        body: formData,
        redirect: "follow"
      });

      if (response.ok) {
        window.form.reset();
        showMessage("Your application has been successfully submitted ✅", "success");
        checkFormValidity();
        if (response.status === 200 || response.status === 302) {
          sessionStorage.setItem("formSubmitted", "true");
          // window.location.href = window.location.origin + "/thankyou.html";
          return;
        }
      } else {
        throw new Error();
      }
    } catch {
      showMessage("Submission failed. Please try again later.", "error");
    }
  });
}
