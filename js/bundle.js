/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
//calc

const personInfo = document.querySelector('.calculating__choose_medium'),
  resultSpan = document.querySelector('.calculating__result span');

let sex = localStorage.getItem('sex') || 'femail',
  weight,
  height,
  age,
  k = localStorage.getItem('k') || 1.375;

if (localStorage.getItem('weight')) {
  weight = JSON.parse(localStorage.getItem('weight'));
  document.querySelector('#weight').value = weight;
}

if (localStorage.getItem('height')) {
  height = JSON.parse(localStorage.getItem('height'));
  document.querySelector('#height').value = height;
}

if (localStorage.getItem('age')) {
  age = JSON.parse(localStorage.getItem('age'));
  document.querySelector('#age').value = age;
}



document.querySelectorAll('.calculating__choose-item').forEach(item => {
  item.classList.remove('calculating__choose-item_active');
  if (item.getAttribute('id') === sex || item.getAttribute('data-coef') === k) {
    item.classList.add('calculating__choose-item_active');

  }
});

function calcBMR() {
  if (!sex || !weight || !height || !age || !k) {
    resultSpan.innerHTML = '____';
    return;
  }

  if (sex === 'femail') {
    resultSpan.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * k).toFixed(0);
  }

  if (sex === 'mail') {
    resultSpan.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * k).toFixed(0);
  }

}

calcBMR();

function getStaticInfo(parent, classActive) {
  const items = document.querySelectorAll(`${parent} div`);

  document.querySelector(parent).addEventListener('click', (e) => {
    if (e.target !== document.querySelector(parent)) {

      if (e.target.getAttribute('data-coef')) {
        k = +e.target.getAttribute('data-coef');
        localStorage.setItem('k', k);
      } else {
        sex = e.target.getAttribute('id');
        localStorage.setItem('sex', sex);
      }

      items.forEach(item => item.classList.remove(classActive));
      e.target.classList.add(classActive);

      calcBMR();
    }
  });
}

getStaticInfo('#gender', 'calculating__choose-item_active');
getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');


personInfo.addEventListener('input', (e) => {
  if (e.target.value.match(/\D/g)) {
    e.target.style.border = '1px solid red';
  } else {
    e.target.style.border = 'none';
  }

  switch (e.target.getAttribute('id')) {
    case 'weight':
      weight = e.target.value;
      localStorage.setItem('weight', weight);
      break;
    case 'height':
      height = e.target.value;
      localStorage.setItem('height', height);
      break;
    case 'age':
      age = e.target.value;
      localStorage.setItem('age', age);
      break;
  }

  calcBMR();
});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  //add item

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = +price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price *= this.transfer;
    }

    render() {
      const el = document.createElement('div');
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        el.classList.add(this.element);
      } else {
        this.classes.forEach(className => el.classList.add(className));
      }
      el.innerHTML = `
        <img src = ${this.src} alt =${this.alt}>
        <h3 class = "menu__item-subtitle">${this.title}</h3>
        <div class = "menu__item-descr">${this.descr}</div>
        <div class = "menu__item-divider"></div>
        <div class = "menu__item-price">
          <div class = "menu__item-cost"> Цена: </div>
          <div class = "menu__item-total"><span>${this.price}</span> грн/день </div>
        </div>
      `;
      this.parent.append(el);
    }
  }

 /*  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({
        img,
        altimg,
        title,
        descr,
        price
      }) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    }); */

  
  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResorce)('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimeOut) {
//Forms
const forms = document.querySelectorAll(formSelector),
      modal = document.querySelector('.modal');

const message = {
  loading: 'img/form/spinner.svg',
  success: 'Спасибо! Скоро мы свяжемся с Вами',
  failure: 'Что-то пошло не так...'
}

forms.forEach(item => {
  bindPostData(item);
});

function bindPostData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
    form.insertAdjacentElement('afterend', statusMessage);

    const formData = new FormData(form);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
      .then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      })
      .catch(() => {
        showThanksModal(message.failure);
      })
      .finally(() => {
        form.reset();
      });

  });
}

function showThanksModal(message) {
  const prevModalDialog = document.querySelector('.modal__dialog');

  prevModalDialog.classList.add('hide');
  (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimeOut);

  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog');
  thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

  modal.append(thanksModal);

  setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.remove('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal', modalTimeOut);
  }, 4000);
}

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
 function openModal(elSelector, modalTimeOut) {
   let el = document.querySelector(elSelector);

   el.classList.add('show');
   el.classList.remove('hide');

   let width = window.innerWidth - document.body.offsetWidth;
   document.body.style.paddingRight = width + 'px';
   document.body.classList.add('hidden');

   if (modalTimeOut) {
     clearInterval(modalTimeOut);
   }

 }

 function closeModal(elSelector) {
   let el = document.querySelector(elSelector);

   el.classList.add('hide');
   el.classList.remove('show');
   document.body.style.paddingRight = '0px';
   document.body.classList.remove('hidden');
 }

 function modal(trigger, modalSelector, modalTimeOut) {
   //Modal

   const modalTrigger = document.querySelectorAll(trigger),
     modal = document.querySelector(modalSelector);

   modalTrigger.forEach(x => {
     x.addEventListener('click', () => openModal(modalSelector, modalTimeOut));
   });

   modal.addEventListener('click', (e) => {
     if (e.target == modal || e.target.getAttribute('data-close') == '') {
       closeModal(modalSelector);
     }
   });

   document.addEventListener('keydown', (e) => {
     if (e.code == 'Escape' && modal.classList.contains('show')) {
       closeModal(modalSelector);
     }
   });

   function showModalByScroll() {
     const doc = document.documentElement;
     if (window.pageYOffset + doc.clientHeight >= doc.scrollHeight) {
       openModal(modalSelector, modalTimeOut);
       window.removeEventListener('scroll', showModalByScroll);
     }

   }

   window.addEventListener('scroll', showModalByScroll);

 }

 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);
 

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wraper, field}) {
  //Slider

  const items = document.querySelectorAll(slide),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    nextBtn = document.querySelector(nextArrow),
    prevBtn = document.querySelector(prevArrow),
    wrapper = document.querySelector(wraper),
    inner = document.querySelector(field),
    width = window.getComputedStyle(wrapper).width,
    widthSlide = +width.replace(/\D/g, ''),
    slider = document.querySelector(container);

  let slideIndex = 1,
    offset = 0;

  inner.style.width = 100 * items.length + '%';
  inner.style.display = 'flex';
  inner.style.transition = 'all .3s';

  wrapper.classList.add('hidden');

  items.forEach(x => {
    x.style.width = width;
  });


  function addZero(num) {
    if (num < 10) {
      return num = '0' + num;
    } else {
      return num;
    }
  }

  total.innerHTML = addZero(items.length);
  current.innerHTML = addZero(slideIndex);


  slider.style.position = 'relative';

  const indicators = document.createElement('ul');
  indicators.classList.add('carousel-indicators');

  slider.append(indicators);

  for (let i = 0; i < items.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    if (i == 0) {
      dot.classList.add('dot__active');
    }
    dot.setAttribute('data-dot', i + 1);
    indicators.append(dot);
  }

  const dots = document.querySelectorAll('.dot');

  nextBtn.addEventListener('click', () => {
    if (offset == widthSlide * (items.length - 1)) {
      offset = 0;
      slideIndex = 1;
    } else {
      offset += widthSlide;
      slideIndex++;
    }

    dots.forEach(x => x.classList.remove('dot__active'));
    dots[slideIndex - 1].classList.add('dot__active');

    current.innerHTML = addZero(slideIndex);
    inner.style.transform = `translateX(-${offset}px)`;
  });

  prevBtn.addEventListener('click', () => {
    if (offset == 0) {
      offset = widthSlide * (items.length - 1);
      slideIndex = 4;
    } else {
      offset -= widthSlide;
      slideIndex--;
    }

    dots.forEach(x => x.classList.remove('dot__active'));
    dots[slideIndex - 1].classList.add('dot__active');

    current.innerHTML = addZero(slideIndex);
    inner.style.transform = `translateX(-${offset}px)`;
  });

  indicators.addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
      dots.forEach(x => {
        x.classList.remove('dot__active');
      });
      e.target.classList.add('dot__active');
      slideIndex = +e.target.dataset.dot;
      offset = (+e.target.dataset.dot - 1) * widthSlide;

      inner.style.transform = `translateX(-${offset}px)`;
      current.innerHTML = addZero(slideIndex);

    }
  });



  /*  function showSlide(i) {
     if (i > items.length) {
       slideIndex = 1;
     }
     if (i < 1) {
       slideIndex = items.length;
     }

     current.innerHTML = addZero(slideIndex);

     inner.style.transform = `translateX(${width})`;

   } */



  /* function showSlide(i) {
    if (i > items.length) {
      slideIndex = 1;
    }
    if (i < 1) {
      slideIndex = 4;
    }

    current.innerHTML = addZero(slideIndex);

    items.forEach( x => {
      x.classList.add('hide');
      x.classList.remove('show', 'fade');
    });

    items[slideIndex - 1].classList.add('show', 'fade');
    items[slideIndex - 1].classList.remove('hide');

  }

  showSlide(slideIndex);

  function plusSlide(i) {
    slideIndex += i;
    showSlide(slideIndex);
  }

  nextBtn.addEventListener('click', () => {
    plusSlide(1);
  });

  prevBtn.addEventListener('click', () => {
    plusSlide(-1);
  });
   */
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContSelector, tabsParenSelector, activClass) {
  //Tabs
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContSelector),
    tabsParent = document.querySelector(tabsParenSelector);

  function hideTabContent() {
    tabsContent.forEach(x => {
      x.classList.add('hide');
      x.classList.remove('show', 'fade');
    });

    tabs.forEach(x => {
      x.classList.remove(activClass);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activClass);
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {

      tabs.forEach((x, i) => {
        if (x == target) {
          hideTabContent();
          showTabContent(i);
        }
      });

    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
   //Timer

   function getTimeRemaining(endTime) {
     const t = Date.parse(endTime) - Date.parse(new Date()),
       days = Math.floor(t / (1000 * 60 * 60 * 24)),
       hours = Math.floor((t / (1000 * 60 * 60)) % 24),
       minutes = Math.floor((t / (1000 * 60)) % 60),
       seconds = Math.floor((t / 1000) % 60);

     return {
       t,
       days,
       hours,
       minutes,
       seconds
     };
   }

   function getZero(num) {
     if (num >= 0 && num < 10) {
       return `0${num}`;
     } else {
       return num;
     }
   }

   function setClock(selector, endTime) {
     const timer = document.querySelector(selector),
       days = timer.querySelector('#days'),
       hours = timer.querySelector('#hours'),
       minutes = timer.querySelector('#minutes'),
       seconds = timer.querySelector('#seconds'),
       timeInterwal = setInterval(updateClock, 1000);

     updateClock();

     function updateClock() {
       const t = getTimeRemaining(endTime);

       days.innerHTML = getZero(t.days);
       hours.innerHTML = getZero(t.hours);
       minutes.innerHTML = getZero(t.minutes);
       seconds.innerHTML = getZero(t.seconds);

       if (t.total <= 0) {
         clearInterval(timeInterwal);
       }
     }
   }

   setClock(id, deadline);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResorce": () => (/* binding */ getResorce)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  return await res.json();
};

const getResorce = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not feth ${url}, status: ${res.status}`);
  }

  return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
  
  
  
  
  
  
  
  

  document.addEventListener('DOMContentLoaded', () => {

    const modalTimeOut = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimeOut), 50000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal', modalTimeOut);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.timer', '2021-06-11');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)('form', modalTimeOut);
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)({
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map