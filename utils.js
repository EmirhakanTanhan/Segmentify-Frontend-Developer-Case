const initTabs = (recData, recContent) => {
    const tabs = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('[data-tab-content]');
    //Render first tabs content and initialize the swiper for it
    renderRecContent(tabs[0].dataset.tabKey, recData, recContent);
    swiper();

    //Add event listener to every tab
    tabs.forEach(tab => tab.addEventListener('click', () => {
        //Remove and add tab-active to the tabs
        tabs.forEach(tab => {
            tab.classList.remove('tab-active');
        });
        tab.classList.add('tab-active');

        //Remove and add tab-content-active to the tab contents
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('tab-content-active');
        });
        document.querySelector(`[data-tab-key-pair="${tab.dataset.tabKey}"]`).classList.add('tab-content-active');

        //Render cards and then initialize swiper
        renderRecContent(tab.dataset.tabKey, recData, recContent);
        swiper();
    }));
};

const createRecComponent = async ({root, segmentifyLoad, recContent, recSkeleton}) => {
    try {
        const recData = await segmentifyLoad();
        renderRecSkeleton(root, recData, recSkeleton);
        initTabs(recData, recContent);
    } catch (err) {
        console.log('Some error occured while rendering segmentify widget: ' + err)
    }
}

const renderRecContent = (target, recData, recContent) => {
    let root = document.querySelector(`[data-tab-key-pair="${target}"]`);

    root.innerHTML = `
    <div class="swiper">
        <div class="swiper-wrapper">
        
        ${recData.recommendedProducts[target].map((product) => {
            return recContent(product);
        }).join('')}
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
    `
}

const renderRecSkeleton = (root, recData, recSkeleton) => {
    root.innerHTML = recSkeleton(recData);
}

const swiper = () => {
    new Swiper(".swiper", {
        slidesPerView: "auto",
        spaceBetween: 15,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

const notification = () => {
    let notification = document.querySelector("#toast");
    notification.className = "show";
    setTimeout(function(){ notification.className = notification.className.replace("show", ""); }, 3000);
}


