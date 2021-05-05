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

export default calc;