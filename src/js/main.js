function listData() {
    /*
     * Incluindo múltiplas Promises como uma maior garantia de acessibilidade dos dados.
     * A primeira Promise a ser resolvida, irá retornar os dados e ignorar o resto.
     */
    const productsLocal = fetch('http://localhost:8000/src/js/data/data.json');
    const productsRemote = fetch('http://www.raphaelfabeni.com.br/rv/data.json');

    Promise
        .race([productsLocal, productsRemote])
        .then(data => data.json())
        .then(data => {
            init(data);
        });

    // Captura todos os catalogos da página e lista os produtos em cada um
    // Se o data-products === all, lista todos os produtos com um array único
    // Se não, ele lista com o data.releases e o data['best-sellers'], conforme for o atributo da classe
    const init = (data) => {

        const catalogs = document.querySelectorAll('.products');
        catalogs.forEach(catalog => {
            const attr = catalog.getAttribute('data-products');
            const productsArray = [];
            productsArray.push(...data['best-sellers'], ...data.releases);

            if(attr === 'all')
                productModule.renderData(productsArray, catalog);
            else
                productModule.renderData(data[attr], catalog)
        });

    };
}


/*
 * Faz o toggle da classe 'active' quando o usuário ativar o menu mobile
 */
const hamburger = document.querySelector('.hamburger'),
      mobileMenu = document.querySelector('.menu-mobile');

function menuToggle() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

hamburger.addEventListener('click', menuToggle);



/*
 * Carregada as animações em sequência
 */
(function() {
    const body = document.querySelector('body');

    window.addEventListener('load', function() {
        setTimeout(() => {
            loadAnimation();
        }, 500);
    });

    function loadAnimation() {
        const items = document.querySelectorAll('.has-animation');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('is-visible');
            }, 120 * index);
        });
    }
})();



/*
 * Slider
 */
const slider = document.querySelectorAll('.slider-bullets');
slider.forEach(item => {
    const bullets = item.querySelectorAll('.bullet');
    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', slide);

        function slide() {

            // Passa o slider
            const slider = this.closest('.products').querySelectorAll('.slider .slider-item');
            slider.forEach(item => {
                item.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
            });

            // Adiciona a class 'active' na bullet selecionada e remove das demais
            const all = this.parentNode.querySelectorAll('.bullet');
            all.forEach(bullet => bullet.classList.remove('active'));
            this.classList.add('active');
        }
    });
});
