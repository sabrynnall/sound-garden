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

const reservarIngresso = document.querySelectorAll('#btn-abrirModal');
//reservarIngresso.addEventListener('click', () => iniciaModal('abrir-modal'))

