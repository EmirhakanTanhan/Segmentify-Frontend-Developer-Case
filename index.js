const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget);

        tabs.forEach(tab => {
            tab.classList.remove('tab-active');
        });

        tab.classList.add('tab-active');

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active');
        });

        target.classList.add('active');
    })
})