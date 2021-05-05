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

 export default modal;
 export {
   openModal,
   closeModal
 };