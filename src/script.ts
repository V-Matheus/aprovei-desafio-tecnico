document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const links = document.querySelectorAll('.item');

  async function loadPage(page: string) {
    try {
      const response = await fetch(`./pages/${page}.html`);
      if (!response.ok) throw new Error('Página não encontrada');

      const html = await response.text();

      if (content) {
        content.innerHTML = html;
      }

      // Código para a página Loja

      if (page === 'Loja') {
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const quantInput = document.getElementById('quant') as HTMLInputElement;
        const priceInput = document.getElementById('price') as HTMLInputElement;
        const submitButton = document.querySelector('.button-submit');

        if (!submitButton) return;

        submitButton.addEventListener('click', (event) => {
          event.preventDefault();
          if (nameInput.value && quantInput.value && priceInput.value) {
            const product = {
              name: nameInput.value,
              quantity: quantInput.value,
              price: priceInput.value,
            };

            let storedData = JSON.parse(
              localStorage.getItem('products') || '{"products": []}',
            );

            if (!Array.isArray(storedData.products)) {
              storedData.products = [];
            }

            storedData.products.push(product);

            const productsString = JSON.stringify(storedData, null, 2);

            localStorage.setItem('products', productsString);
          } else {
            console.log('Preencha todos os campos.');
          }
        });
      }

      links.forEach((link) => {
        const linkElement = link as HTMLElement;
        linkElement.classList.toggle(
          'selected',
          linkElement.innerText === page,
        );
      });
    } catch (error) {
      console.error('Erro ao carregar página:', error);
      if (content) content.innerHTML = '<h2>Página não encontrada.</h2>';
    }
  }

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const page = link.getAttribute('data-page');
      if (page) loadPage(page);
    });
  });

  loadPage('Loja');
});
