createRecComponent({
    root: document.querySelector('.hero'),
    segmentifyLoad: async () => {
        const response = await fetch('product-list.json');
        const data = await response.json();

        return data.responses[0][0].params;
    } ,
    recContent: (product) => {
        if (!product.priceText || !product.image || !product.url || !product.params.shippingFee) return
        return `
        <div class="swiper-slide">
            <div class="card">
                <a class="card-link" title="${product.name ? product.name : ''}" href="${product.url}">
                    <div class="card-img">
                        <img loading="lazy" src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="card-content">
                        <div class="card-title">
                            <span class="cut-text">${product.name ? product.name : ''}</span>
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
                    <button class="btn-blue" onclick="notification()">Sepete Ekle</button>
                </div>
            </div>
        </div>
        `
    },
    recSkeleton: (recData) => {
        if (!(recData.userCategories.length > 1)) return
        return `
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
                                return `<div class="tab ${index === 0 ? 'tab-active' : ''}" data-tab data-tab-key="${category}" title="${_category}">${_category}</div>`
                            }).join('')}
                        </div>
                    </div>
                </div>
                <div class="main-content-content">
                    <!--Tab contents-->
                    ${recData.userCategories.map((category, index) => {
                        return `<div class="tab-content ${index === 0 ? 'tab-content-active' : ''}" data-tab-content data-tab-key-pair="${category}"></div>`
                    }).join('')}
                </div>
            </div>
        </div>
        `
    },
    itemPerView: 4,
})
