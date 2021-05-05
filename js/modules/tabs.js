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

export default tabs;