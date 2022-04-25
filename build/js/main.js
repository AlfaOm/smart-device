window.addEventListener("DOMContentLoaded", () => {
  // Аккордеон в футере

  const accordions = document.querySelectorAll(".accordion");
  const accordionToggle = document.querySelectorAll(".accordion__toggle");
  const accordionContents = document.querySelectorAll(".accordion__content");

  const toggles = Array.from(accordionToggle);
  toggles.forEach((el) => {
    el.classList.remove("accordion__toggle--nojs");
  });

  const contents = Array.from(accordionContents);
  contents.forEach((el) => {
    el.classList.remove("accordion__content--nojs");
  });

  const hiddenContent = (button, content) => {
    button.classList.remove("accordion__toggle--active");
    content.classList.remove("accordion__content--show");
  };

  const showContent = (button, content) => {
    button.classList.add("accordion__toggle--active");
    content.classList.add("accordion__content--show");
  };

  const toggleAccordion = (evt) => {
    Array.prototype.forEach.call(
      accordionContents,
      function (accordionContent) {
        let button = accordionContent
          .closest(".accordion")
          .querySelector(".accordion__toggle");
        if (
          (button === evt.target &&
            !button.classList.contains("accordion__toggle")) ||
          button !== evt.target
        ) {
          hiddenContent(button, accordionContent);
        } else if (button === evt.target) {
          showContent(button, accordionContent);
        }
      }
    );
  };

  Array.prototype.forEach.call(accordions, function (accordion) {
    let toggleButton = accordion.querySelector(".accordion__toggle");
    let accordionContent = accordion.querySelector(".accordion__content");
    hiddenContent(toggleButton, accordionContent);
    toggleButton.addEventListener("click", toggleAccordion);
  });

  // Показать/скрыть текст блока 'О компании'

  const textHiddenDesk = document.querySelector(".about__text-desk");
  const textHiddenMob = document.querySelector(".about__text-mob");
  const aboutButton = document.querySelector(".about__button");

  textHiddenDesk.classList.remove("about__text-desk--nojs");
  textHiddenMob.classList.remove("about__text-mob--nojs");

  const readMore = () => {
    if (textHiddenDesk.classList.contains("about__text-desk--hidden")) {
      textHiddenDesk.classList.remove("about__text-desk--hidden");
      aboutButton.innerHTML = "Скрыть";
    } else {
      textHiddenDesk.classList.add("about__text-desk--hidden");
      aboutButton.innerHTML = "Подробнее";
    }

    if (textHiddenMob.classList.contains("about__text-mob--hidden")) {
      textHiddenMob.classList.remove("about__text-mob--hidden");
      aboutButton.innerHTML = "Скрыть";
    } else {
      textHiddenMob.classList.add("about__text-mob--hidden");
      aboutButton.innerHTML = "Подробнее";
    }
  };

  aboutButton.addEventListener("click", readMore);

  // Modal

  let m = document.querySelector(".modal");
  let p = document.querySelector(".page");

  function swap() {
    p.parentNode.insertBefore(m, p);
  }
  swap();

  let buttonFeedback = document.querySelector("[data-open-modal]");

  let modal = document.querySelector(".modal");
  let modalSuccess = document.querySelector(".modal-success");
  let modalClose = document.querySelectorAll(".modal__close");
  let closeInnerModal = document.querySelectorAll(".modal__overlay");

  let modalForm = modal.querySelector("form");
  let modalLogin = modal.querySelector("[name=name]");
  let modalTel = modal.querySelector("[name=tel]");


  let isStorageSupport = true;
  let storage = "";

  try {
    storage = localStorage.getItem("name");
  } catch (err) {
    isStorageSupport = false;
  }

  // Запрет скролла контента при открытом popup
  const disableScroll = function () {
    document.body.classList.add("scroll-lock");
  };

  const enableScroll = function () {
    document.body.classList.remove("scroll-lock");
  };

  buttonFeedback.addEventListener("click", function (evt) {
    evt.preventDefault();
    modal.classList.add("modal--show");
    disableScroll();

    if (storage) {
      modalLogin.value = storage;
      modalTel.focus();
    } else {
      modalLogin.focus();
    }
  });

  modalClose.forEach((el) => {
    el.addEventListener("click", function (evt) {
      evt.preventDefault();
      modal.classList.remove("modal--show");
      modalSuccess.classList.remove("modal-success--show");
      enableScroll();
    });
  });


  modalForm.addEventListener("submit", function (evt) {
    if (modalLogin.value || modalTel.value) {
      evt.preventDefault();
      modal.classList.remove("modal--show");
      modalSuccess.classList.add("modal-success--show");
    } else {
      if (isStorageSupport) {
        localStorage.setItem("name", modalLogin.value);
      }
    }
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (modal.classList.contains("modal--show")) {
        modal.classList.remove("modal--show");
        enableScroll();
      }

      if (modalSuccess.classList.contains("modal-success--show")) {
        modalSuccess.classList.remove("modal-success--show");
        enableScroll();
      }
    }
  });

  closeInnerModal.forEach((el) => {
    el.addEventListener("click", function () {
      if (modal.classList.contains("modal--show")) {
        modal.classList.remove("modal--show");
        enableScroll();
      }

      if (modalSuccess.classList.contains("modal-success--show")) {
        modalSuccess.classList.remove("modal-success--show");
        enableScroll();
      }
    });
  });

  // Захват фокуса в модальном окне
  function trapFocus(element) {
    let focusableEls = element.querySelectorAll('input[type="text"], input[type="tel"], textarea,  input[type="checkbox"], button');
    let firstFocusableEl = focusableEls[0];
    let lastFocusableEl = focusableEls[focusableEls.length - 1];
    let KEYCODE_TAB = 9;

    element.addEventListener('keydown', function(e) {
      let isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

      if (!isTabPressed) {
        return;
      }

      if ( e.shiftKey ) /* shift + tab */ {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
            e.preventDefault();
          }
        } else /* tab */ {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
            e.preventDefault();
          }
        }
    });
  }
  trapFocus(modal);

  // Маска для номера телефона
  [].forEach.call(
    document.querySelectorAll('input[type="tel"]'),
    function (input) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i);
        }
        let reg = matrix
          .substr(0, this.value.length)
          .replace(/_+/g, function (a) {
            return "\\d{1," + a.length + "}";
          })
          .replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (
          !reg.test(this.value) ||
          this.value.length < 5 ||
          (keyCode > 47 && keyCode < 58)
        )
          this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
    }
  );
});
