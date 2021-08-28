const selectTabs = (recData) => {
    const tabs = document.querySelectorAll('[data-tab-target]');
    const tabContents = document.querySelectorAll('[data-tab-content]');
    recCardTemplate(tabs[0].dataset.tabKey, recData);
    swiper();

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.tabTarget);

            tabs.forEach(tab => {
                tab.classList.remove('tab-active');
            });

            tab.classList.add('tab-active');

            tabContents.forEach(tabContent => {
                tabContent.classList.remove('tab-content-active');
            });

            target.classList.add('tab-content-active');

            recCardTemplate(tab.dataset.tabKey, recData);
            swiper();
        });
    });
}

const segmentifyLoad = async () => {
    const response = await fetch('product-list.json');
    const data = await response.json();

    return data.responses[0][0].params;
}

const createRecComponent = ({root}) => {
    segmentifyLoad()
        .then((recData) => {
            console.log(recData)
            root.innerHTML = recSkeletonTemplate(recData);

            selectTabs(recData)
        })
        .catch((err) => {
            console.log('Some error occured while loading segmentify: ' + err)
        })
}

const recCardTemplate = (target, recData) => {
    let root = document.querySelector(`[data-tab-key-pair="${target}"]`)
    root.innerHTML = `
    
    <div class="swiper">
        <div class="swiper-wrapper">
        
        ${recData.recommendedProducts[target].map((product, index) => {
            let _shippingFee = 'hidden';
            if (product.params.shippingFee === 'FREE') _shippingFee = '';
            
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
                                <span class="${_shippingFee} product-label-free-shipping"><i class="fas fa-truck"></i>Ücretsiz Kargo</span>
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

const recSkeletonTemplate = (recData) => {
    return `
    <div class="main">
        <div class="main-title">
            <div class="wrapper">
                <h2>Sizin için seçtiklerimiz</h2>
            </div>
        </div>
        <div class="main-content">
            <div class="main-content-nav">
                <div class="wrapper">
                    <div class="tab-group cut-text-items">
                        <!--TAB KISIMLARI-->
                        ${recData.userCategories.map((category, index) => {
                            let _tabActive = '';
                            let _category = category.split('>').pop();
                            if (index === 0) _tabActive = "tab-active";
                            
                            let tabs = `<div class="${_tabActive} tab" data-tab-target="#tab-${index}" data-tab-key="${category}" title="${_category}">${_category}</div>`
                            return tabs;
                        }).join('')}
                    </div>
                </div>
            </div>
            <div class="main-content-content">
                <!--TAB İÇERİK KISIMLARI-->
                ${recData.userCategories.map((category, index) => {
                    let _tabActive = '';
                    if (index === 0) _tabActive = "tab-content-active";
                    
                    let tabContents = `<div id="tab-${index}" class="${_tabActive} tab-content" data-tab-content data-tab-key-pair="${category}"></div>`
                    return tabContents;
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


