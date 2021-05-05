import {getResorce} from '../services/services';

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

  
  getResorce('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });

}

export default cards;