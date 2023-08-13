const grid = new Muuri('.grid', {
    layout: {
        rounding: false
      }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('uploaded-img');

    // Listener de los enlaces

    const links = document.querySelectorAll('#categories a');
    links.forEach((e) => {
        e.addEventListener('click', (event) => {
            event.preventDefault();
            links.forEach((link) => link.classList.remove('active') );
            event.target.classList.add('active');

            const category = event.target.innerHTML.toLowerCase();
            category === 'all pictures' ? grid.filter('[data-category]') : grid.filter(`[data-category="${category}"]`);        //Conditional If
        });
    });

    // Listener de la barra de busqueda

    document.querySelector('#search-id').addEventListener('input', (e) => {
        const search = e.target.value;
        grid.filter((item) => item.getElement().dataset.label.includes(search))
    });

    // Listener para las imagenes

    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach( (e) => {
        const route = e.getAttribute('src');
        const description = e.parentNode.parentNode.dataset.description;
        
        e.addEventListener('click', () => {
            overlay.classList.add('active');
            document.querySelector('#overlay img').src = route;
            document.querySelector('#overlay .description').innerHTML = description;
        });
    });

    // EventListener del boton
    
    document.querySelector('#btn-close-popup').addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    // EvenListener del Overlay
    overlay.addEventListener('click', (event) => {
        event.target.id === 'overlay'? overlay.classList.remove('active') : '';
    });
});
