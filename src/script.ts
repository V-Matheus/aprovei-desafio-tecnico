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
            const generateCode = () =>
              Math.floor(10000000 + Math.random() * 90000000).toString();

            const formatDate = (date: Date) => {
              const day = String(date.getDate()).padStart(2, '0');
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const year = date.getFullYear();
              return `${day}/${month}/${year}`;
            };

            const product = {
              code: generateCode(),
              name: nameInput.value,
              quantity: quantInput.value,
              price: priceInput.value,
              date: formatDate(new Date()),
              total: parseFloat(priceInput.value) * parseInt(quantInput.value),
              status: 'Pendente',
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

            nameInput.value = '';
            quantInput.value = '';
            priceInput.value = '';
          } else {
            console.log('Preencha todos os campos.');
          }
        });
      }

      if (page === 'Produtos') {
        let storedData = JSON.parse(
          localStorage.getItem('products') || '{"products": []}',
        ) as {
          products: {
            code: number,
            name: string,
            quantity: string,
            price: string,
            date: string,
            total: number,
            status: string,
          }[]
        };

        let table = document.querySelector('.table');
        if (table) {
          table.innerHTML = storedData.products
            .map(
              (row) => `
                <div class="row">
                  <ul class="values">
                    <li>#${row.code}</li>
                    <li>${row.date}</li>
                    <li>${row.name}</li>
                    <li>${row.quantity}</li>
                    <li>${row.price}</li>
                    <li>${row.total}</li>
                    <li>${row.status}</li>
                  </ul>
                  <br class="break" />
                </div>
              `
            ).join('');
          }


        console.log(storedData)
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
      const page = (link as HTMLElement).innerText;
      if (page) loadPage(page);
    });
  });

  loadPage('Loja');
});
