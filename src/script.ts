document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const links = document.querySelectorAll('.item');
  console.log('links', links);

  async function loadPage(page: string) {
    try {
      const response = await fetch(`./pages/${page}.html`);
      if (!response.ok) throw new Error('Página não encontrada');

      const html = await response.text();

      if (content) {
        content.innerHTML = html;
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
