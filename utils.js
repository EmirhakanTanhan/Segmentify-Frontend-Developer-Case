const initTabs = (recData) => {
    const tabs = document.querySelectorAll('[data-tab-target]');
    const tabContents = document.querySelectorAll('[data-tab-content]');
    //Render first tabs content and initialize the swiper for it
    renderRecContent(tabs[0].dataset.tabKey, recData);
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
        document.querySelector(tab.dataset.tabTarget).classList.add('tab-content-active');

        //Render cards and then initialize swiper
        renderRecContent(tab.dataset.tabKey, recData);
        swiper();
    }));
};

const segmentifyLoad = async () => {
    const response = await fetch('product-list.json');
    const data = await response.json();

    return data.responses[0][0].params;
}

const createRecComponent = async ({root}) => {
    try {
        const recData = await segmentifyLoad();
        console.log(recData)
        renderRecSkeleton(root, recData);
        initTabs(recData);
    } catch (err) {
        console.log('Some error occured while rendering segmentify widget: ' + err)
    }
}

const renderRecContent = (target, recData) => {
    let root = document.querySelector(`[data-tab-key-pair="${target}"]`);

    root.innerHTML = `
    <div class="swiper">
        <div class="swiper-wrapper">
        
        ${recData.recommendedProducts[target].map((product) => {
            return `
            <div class="swiper-slide">
                <div class="card">
                    <a class="card-link" title="${product.name}" href="${product.url}">
                        <div class="card-img">
                            <img loading="lazy" src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="card-content">
                            <div class="card-title">
                                <span class="cut-text">${product.name}</span>
                            </div>
                            <div class="card-price">
                                <span>${product.priceText}</span>
                            </div>
                            <div class="card-label">
                                <span class="${product.params.shippingFee === 'FREE' ? '' : 'hidden'} product-label-free-shipping"><i class="fas fa-truck"></i>Ücretsiz Kargo</span>
                            </div>
                        </div>
                    </a>
                    <div class="card-basket-add">
                        <button class="btn-blue">Sepete Ekle</button>
                    </div>
                </div>
            </div>
            `
        }).join('')}
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
    `
}

const renderRecSkeleton = (root, recData) => {
    root.innerHTML = `
    <div class="main">
        <div class="main-title">
            <div class="wrapper">
                <h2>Sizin için seçtiklerimiz</h2>
            </div>
        </div>
        <div class="main-content">
            <div class="main-content-nav">
                <div class=""><!--wrapper-->
                    <div class="tab-group cut-text-items">
                        <!--Tabs-->
                        ${recData.userCategories.map((category, index) => {
                            let _category = category.split('>').pop();
                            return `<div class="tab ${index === 0 ? 'tab-active' : ''}" data-tab-target="#tab-${index}" data-tab-key="${category}" title="${_category}">${_category}</div>`
                        }).join('')}
                    </div>
                </div>
            </div>
            <div class="main-content-content">
                <!--Tab contents-->
                ${recData.userCategories.map((category, index) => {
                    return `<div id="tab-${index}" class="tab-content ${index === 0 ? 'tab-content-active' : ''}" data-tab-content data-tab-key-pair="${category}"></div>`
                }).join('')}
            </div>
        </div>
    </div>
    `
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

}


