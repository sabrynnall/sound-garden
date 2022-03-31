function iniciaModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('mostrar');
        modal.addEventListener('click', (e) => {
            if (e.target.id == modalId || e.target.className == 'btn-fechar') {
                modal.classList.remove('mostrar')
            }
        })
    }
}


const toArray = Array.from(document.querySelectorAll('#btn-abrirModal'));

toArray.forEach( item =>{
    item.addEventListener('click', (e) => {
        e.preventDefault();
        iniciaModal('abrir-modal')
    })
})




