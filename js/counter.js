// document.addEventListener("DOMContentLoaded", () => {
//   const onlineEl = document.getElementById("onlineCount");
//   const slotsEl = document.getElementById("slotsCount");

//   // Проверяем, есть ли сохранённое значение в localStorage
//   let currentOnline = localStorage.getItem("currentOnline");
//   if (!currentOnline) {
//     // Если значения нет, генерируем новое и сохраняем
//     currentOnline = getRandomInt(17, 158);
//     localStorage.setItem("currentOnline", currentOnline);
//   } else {
//     // Если значение есть, преобразуем его в число
//     currentOnline = parseInt(currentOnline, 10);
//   }

//   let availableSlots = 410;

//   // Инициализация
//   onlineEl.textContent = currentOnline;
//   slotsEl.textContent = availableSlots;

//   // Свободные места убывают каждые 15–25 сек
//   setInterval(() => {
//     if (availableSlots > 12) {
//       availableSlots -= getRandomInt(1, 3);
//       slotsEl.textContent = availableSlots;
//     }
//   }, getRandomInt(35000, 60000));

//   // Функция генерации случайного числа в диапазоне
//   function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const slotsEl = document.getElementById("slotsCount");

  // Проверяем, есть ли сохранённое значение в localStorage
  let availableSlots = localStorage.getItem("availableSlots");
  if (!availableSlots) {
    // Если значения нет, устанавливаем начальное значение
    availableSlots = 410;
    localStorage.setItem("availableSlots", availableSlots);
  } else {
    // Если значение есть, преобразуем его в число
    availableSlots = parseInt(availableSlots, 10);
    // [UPDATE] Если значение ниже 290 или выше 410, сбрасываем в 410
    if (availableSlots < 290 || availableSlots > 410) availableSlots = 410;
  }

  // Инициализация
  slotsEl.textContent = availableSlots;

  // Свободные места убывают каждые 30–60 сек
  setInterval(() => {
    if (availableSlots > 290) { // Уменьшаем только если выше 290
      // [UPDATE] Если упало ниже 290, сбрасываем на 410
      if (availableSlots < 290) availableSlots = 410;
      availableSlots -= getRandomInt(1, 3);
      localStorage.setItem("availableSlots", availableSlots); // Сохраняем новое значение
      slotsEl.textContent = availableSlots;
    }
  }, getRandomInt(35000, 60000));

  // Функция генерации случайного числа в диапазоне
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});