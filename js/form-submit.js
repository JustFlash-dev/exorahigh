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
       const token = await getGoogleScriptToken();
      const response = await fetch(`https://script.google.com/macros/s/${token}/exec`, {
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
