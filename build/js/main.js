// import {iosVhFix} from './utils/ios-vh-fix';
// import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  // iosVhFix();

  // Modules
  // ---------------------------------


  // Аккордеон в футере

  const accordions = document.querySelectorAll('.accordion');
  const accordionToggle = document.querySelectorAll('.accordion__toggle');
  const accordionContents = document.querySelectorAll('.accordion__content');

  const toggles = Array.from(accordionToggle);
  toggles.forEach((el) => {
    el.classList.remove('accordion__toggle--nojs');
  });

  const contents = Array.from(accordionContents);
  contents.forEach((el) => {
    el.classList.remove('accordion__content--nojs');
  });

  const hiddenContent = (button, content) => {
    button.classList.remove('accordion__toggle--active');
    content.classList.remove('accordion__content--show');
  }

  const showContent = (button, content) => {
    button.classList.add('accordion__toggle--active');
    content.classList.add('accordion__content--show');
  };

  const toggleAccordion = (evt) => {
    Array.prototype.forEach.call(accordionContents, function (accordionContent) {
      let button = accordionContent.closest('.accordion').querySelector('.accordion__toggle');
      if (button === evt.target && !button.classList.contains('accordion__toggle') || button !== evt.target) {
        hiddenContent(button, accordionContent);
      } else if (button === evt.target) {
        showContent(button, accordionContent);
      }
    });
  };

  Array.prototype.forEach.call(accordions, function (accordion) {
    let toggleButton = accordion.querySelector('.accordion__toggle');
    let accordionContent = accordion.querySelector('.accordion__content');
    hiddenContent(toggleButton, accordionContent);
    toggleButton.addEventListener('click', toggleAccordion);
  });


  // Показать/скрыть текст блока "О компании"

  const textHiddenDesk = document.querySelector('.about__text-desk');
  const textHiddenMob = document.querySelector('.about__text-mob');
  const aboutButton = document.querySelector('.about__button');

  textHiddenDesk.classList.remove('about__text-desk--nojs');
  textHiddenMob.classList.remove('about__text-mob--nojs');

  const readMore = () => {
    if (textHiddenDesk.classList.contains('about__text-desk--hidden')) {
      textHiddenDesk.classList.remove('about__text-desk--hidden');
      aboutButton.innerHTML = "Скрыть";
    } else {
      textHiddenDesk.classList.add('about__text-desk--hidden');
      aboutButton.innerHTML = "Подробнее";
    }

    if (textHiddenMob.classList.contains('about__text-mob--hidden')) {
      textHiddenMob.classList.remove('about__text-mob--hidden');
      aboutButton.innerHTML = "Скрыть";
    } else {
      textHiddenMob.classList.add('about__text-mob--hidden');
      aboutButton.innerHTML = "Подробнее";
    }
  }

  aboutButton.addEventListener('click', readMore)


  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    // initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
