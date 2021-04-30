document.addEventListener('DOMContentLoaded', () => {
  //Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(x => {
      x.classList.add('hide');
      x.classList.remove('show', 'fade');
    });

    tabs.forEach(x => {
      x.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains('tabheader__item')) {

      tabs.forEach((x, i) => {
        if (x == target) {
          hideTabContent();
          showTabContent(i);
        }
      });

    }
  });

  //Timer
  const deadline = '2021-05-01';

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

  setClock('.timer', deadline);

  //Modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        body = document.body;

  modalTrigger.forEach(x => {
    x.addEventListener('click', () => {
      openModal(modal);
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target == modal || e.target.getAttribute('data-close') == '') {
      closeModal(modal);
    } 
  });

  document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape' && modal.classList.contains('show')) {
        closeModal(modal);
    }
  });

  function openModal(el = modal) {
    el.classList.add('show');
    el.classList.remove('hide');

    let width = window.innerWidth - body.offsetWidth;
    body.style.paddingRight = width + 'px';
    body.classList.add('hidden');

    clearInterval(modalTimeOut);
  }

  function closeModal(el = modal) {
    el.classList.add('hide');
    el.classList.remove('show');
    body.style.paddingRight = '0px';
    body.classList.remove('hidden');
  }

  const modalTimeOut = setTimeout(openModal, 50000); 

  function showModalByScroll() {
    const doc = document.documentElement;
    if (window.pageYOffset + doc.clientHeight >= doc.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }

  }

  window.addEventListener('scroll', showModalByScroll);

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

  axios.get('http://localhost:3000/menu')
        .then(data => {
          data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
          });
        });

  /* const getResorce = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not feth ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getResorce('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });*/

  

  //Forms
  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы свяжемся с Вами',
    failure: 'Что-то пошло не так...'
  }

  forms.forEach( item => {
    bindPostData(item);
  });

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

        postData('http://localhost:3000/requests', json)
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
    openModal();

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
      closeModal();
    }, 4000);
  }

  //Slider

  const items = document.querySelectorAll('.offer__slide'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        nextBtn = document.querySelector('.offer__slider-next'),
        prevBtn = document.querySelector('.offer__slider-prev'),
        wrapper = document.querySelector('.offer__slider-wrapper'),
        inner = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(wrapper).width,
        widthSlide = +width.replace(/\D/g, ''),
        slider = document.querySelector('.offer__slider');

  let slideIndex = 1,
      offset = 0;

  inner.style.width = 100 * items.length + '%';
  inner.style.display = 'flex';
  inner.style.transition = 'all .3s';
  
  wrapper.classList.add('hidden');

  items.forEach( x => {
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
});

