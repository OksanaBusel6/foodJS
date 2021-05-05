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

export default slider;