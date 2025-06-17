// utm-save.js
(function saveUTMParams() {
  const params = new URLSearchParams(window.location.search);
  params.forEach((value, key) => {
    if (key.startsWith("utm_")) {
      localStorage.setItem(key, value);
    }
  });
})();
