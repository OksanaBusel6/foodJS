  import tabs from './modules/tabs';
  import modal from './modules/modal';
  import timer from './modules/timer';
  import cards from './modules/cards';
  import forms from './modules/forms';
  import calc from './modules/calc';
  import slider from './modules/slider';
  import { openModal } from './modules/modal';

  document.addEventListener('DOMContentLoaded', () => {

    const modalTimeOut = setTimeout(() => openModal('.modal', modalTimeOut), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimeOut);
    timer('.timer', '2021-06-11');
    cards();
    forms('form', modalTimeOut);
    calc();
    slider({
      container: '.offer__slider',
      slide: '.offer__slide',
      nextArrow: '.offer__slider-next',
      prevArrow: '.offer__slider-prev',
      totalCounter: '#total',
      currentCounter: '#current',
      wraper: '.offer__slider-wrapper',
      field: '.offer__slider-inner'
    });
  });