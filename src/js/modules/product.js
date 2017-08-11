const productModule = (function() {
    'use strict';


    // Lista os produtos
    function renderData(data, catalog) {

        const list = catalog.querySelector('.row'),
              attr = catalog.getAttribute('data-products');

        list.innerHTML = ''; // Reset markup
        data.forEach(product => {
            list.insertAdjacentHTML('beforeend', updateMarkup(data, product, attr))
        });

        // renderBullets(catalog);
    }


    // Cria o markup de cada produto
    function updateMarkup(data, product, array) {

        const toBRL = (price) => price.toFixed(2).replace('.', ',');

        const highTop = (isHigh) => isHigh ? 'Cano Alto' : 'Cano Baixo';

        const link = () => `produto.html?product=${data.indexOf(product)}&segmentation=${array}`;

        const markup = `
            <div class="slider-item col-xs-12 col-sm-6 col-md-3 has-animation">
                <div class="product" data-id="${data.indexOf(product)}">
                    <a href="${link()}" class="product-link">
                        <img class="product-image" src="${product.image}" alt="Imagem de demonstração da chuteira">
                    </a>
                    <div class="product-personalize"> <img class="icon" src="images/personalize.jpg">Personalize </div>
                    <div class="product-title">${product.title}</div>
                    <div class="product-top">${highTop(product['high-top'])}</div>
                    <div class="product-price">
                        <span class="price-normal">R$ ${toBRL(product.price)}</span>
                        <span class="price-quota">ou ${product.installments.number}X ${toBRL(product.installments.value)} sem juros</span>
                    </div>
                    <a href="${link()}" class="btn">Comprar</a>
                </div>
            </div>
        `;

        return markup;
    }

    function renderBullets(elem) {
        const bullets = elem.querySelector('.slider-bullets');
        const productsAmount = elem.querySelectorAll('.product');

        productsAmount.forEach(item => {
            bullets.insertAdjacentHTML('beforeend', '<div class="bullet"></div>');
        });
    }


    function filter(data, catalog, filter) {
        const tempArray = [];

        const filterCategory = data
            .filter(obj => obj.category === filter)
            .map(obj => obj);

        const filterHighTop = (value) => {
            return data
                .filter(obj => obj['high-top'] == value)
                .map(obj => obj);
        }

        const filtered = filter === 'cano-alto' ? filterHighTop(true) : filter === 'cano-baixo' ? filterHighTop(false) : filterCategory

        tempArray.push(...filtered)

        productModule.renderData(tempArray, catalog);
        loadAnimation();

        // console.log('Catalog:', catalog);
        // console.log(tempArray);
    }



    return {
        renderData,
        filter
    }

})();
