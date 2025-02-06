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

      const verifyStatus = (status: string) => {
        switch (status) {
          case 'Pendente':
            return '#cf3e00';
          case 'Entregue':
            return '#7ccf00';
          case 'Em Transporte':
            return '#FDD301';
          default:
            return '#cf3e00';
        }
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
            submitButton.textContent = 'Carregando...';

            setTimeout(() => {
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

              submitButton.textContent = 'Produto adicionado!';

              setTimeout(() => {
                submitButton.textContent = 'Adicionar ao carrinho';
              }, 2000);
            }, 3000);
          } else {
            console.log('Preencha todos os campos.');
          }
        });
      }

      // Código para a página Produtos

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
                    <li>R$ ${Number(row.price).toFixed(2)}</li>
                    <li>R$ ${Number(row.total).toFixed(2)}</li>
                    <li style="color: ${verifyStatus(row.status)}">${row.status}</li>
                  </ul>
                  <br class="break" />
                </div>
              `
            ).join('');
        }
      }

      // Código para a página Status

      if (page === 'Status') {

        const storedData = JSON.parse(localStorage.getItem('products') || '{"products": []}') as {
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

        const renderColumns = () => {
          const columns: { [key: string]: Element | null } = {
            'Pendente': document.getElementById('colPendente'),
            'Em Transporte': document.getElementById('colEmTransporte'),
            'Entregue': document.getElementById('colEntregue')
          };

          Object.keys(columns).forEach(status => {
            const column = columns[status];
            if (column) {
              column.innerHTML = `
              <h3>${status}</h3>
              ${storedData.products
                  .filter(product => product.status === status)
                  .map(product => `
                  <div class="card" id="${product.code}" draggable="true" style="border-color: ${verifyStatus(product.status)}">
                    ${product.name}
                  </div>
                `).join('')
            }
            ` 
            }
          });

          enableDragAndDrop();
        };


        const enableDragAndDrop = () => {
          const columns = document.querySelectorAll('.kanban-column');
          const cards = document.querySelectorAll('.card');

          cards.forEach(card => {
            card.addEventListener('dragstart', dragStart as EventListener);
          });

          columns.forEach(column => {
            column.addEventListener('dragover', dragOver as EventListener);
            column.addEventListener('drop', drop as EventListener);
            column.addEventListener('dragleave', dragLeave as EventListener);
          });
        };


        const dragStart = (event: DragEvent) => {
          const card = event.target as HTMLElement;
          event.dataTransfer?.setData('text/plain', card.id);
        }

        const dragOver = (event: DragEvent) => {
          event.preventDefault();
          const column = event.target as HTMLElement;
          column.classList.add('drag-over');
        }

        const dragLeave = (event: DragEvent) => {
          const column = event.target as HTMLElement;
          column.classList.remove('drag-over');
        }

        const drop = (event: DragEvent) => {
          event.preventDefault();
          const column = event.target as HTMLElement;
          const cardId = event.dataTransfer?.getData('text/plain');
          const newStatus = column.getAttribute('data-status');

          column.classList.remove('drag-over');

          if (cardId && newStatus) {
            const card = document.getElementById(cardId);
            if (card) {
              const product = storedData.products.find(p => Number(p.code) === Number(cardId));

              if (product) {
                product.status = newStatus;
                localStorage.setItem('products', JSON.stringify(storedData, null, 2));
                renderColumns();
              }
            }
          }
        };

        renderColumns();
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
