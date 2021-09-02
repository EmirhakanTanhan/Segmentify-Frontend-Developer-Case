const initTabs = (recData, recContent, itemPerView) => {
    const tabs = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('[data-tab-content]');
    //Render first tabs content and initialize the swiper for it
    renderRecContent(tabs[0].dataset.tabKey, recData, recContent);
    swiper(itemPerView);

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
        swiper(itemPerView);
    }));
};

const createRecComponent = async ({root, segmentifyLoad, recContent, recSkeleton, itemPerView}) => {
    try {
        const recData = await segmentifyLoad();
        renderRecSkeleton(root, recData, recSkeleton);
        initTabs(recData, recContent, itemPerView);
    } catch (err) {
        console.log('Some error occured while rendering segmentify widget: ' + err);
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
        <div class="swiper-pagination"></div>
    </div>
    `
}

const renderRecSkeleton = (root, recData, recSkeleton) => {
    if (recSkeleton(recData)) root.innerHTML = recSkeleton(recData);
    else throw 'recSkeleton: Not enough categories';
}

const swiper = (itemPerView) => {
    new Swiper(".swiper", {
        slidesPerView: itemPerView - 2 > 2 ? itemPerView - 2 : 2,
        spaceBetween: 5,
        freeMode: {
            enabled: true,
            minimumVelocity: 0.2,
            momentumVelocityRatio: 0.4,
        },
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
        },
        breakpoints: {
            600: {
                slidesPerView: itemPerView - 1 > 1 ? itemPerView - 1 : 2,
                spaceBetween: 15,
                freeMode: {
                    enabled: true,
                    minimumVelocity: 0.2,
                    momentumVelocityRatio: 0.4,
                },
            },
            768: {
                slidesPerView: itemPerView - 1 > 1 ? itemPerView - 1 : 2,
                spaceBetween: 15,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            },
            1024: {
                slidesPerView: itemPerView > 1 ? itemPerView : 2,
                spaceBetween: 15,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            },
        },
    });
}

const notification = () => {
    let notification = document.querySelector("#toast");
    notification.className = "show";
    setTimeout(function(){ notification.className = notification.className.replace("show", ""); }, 3000);
}


