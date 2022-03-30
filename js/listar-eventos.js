const campoEventos = document.querySelector('#campo-eventos');
const botaoEditar = document.querySelector('.btn btn-secondary');
const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';


window.onload = async () => {

    try {
        const opcoes = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const resposta = await fetch(`${BASE_URL}/events`, opcoes);

        const conteudoResposta = await resposta.json();

        for (let i = 0; i < conteudoResposta.length; i++) {

            const campoEvento = document.createElement('tr');
            const numeroEvento = document.createElement('th');
            const dataEvento = document.createElement('td');
            const tituloEvento = document.createElement('td');
            const atracoesEvento = document.createElement('td');
            const acoesEvento = document.createElement('td');
            const reservasEvento = document.createElement('a');
            const editarEvento = document.createElement('a');
            const excluirEvento = document.createElement('a');

            numeroEvento.setAttribute('scope', 'row');
            reservasEvento.setAttribute('href', 'reservas.html');
            editarEvento.setAttribute('href', 'editar-evento.html');
            excluirEvento.setAttribute('href', 'excluir-evento.html');

            reservasEvento.setAttribute('class', 'btn btn-dark');
            editarEvento.setAttribute('class', 'btn btn-secondary');
            excluirEvento.setAttribute('class', 'btn btn-danger');

            campoEvento.appendChild(numeroEvento);
            campoEvento.appendChild(dataEvento);
            campoEvento.appendChild(tituloEvento);
            campoEvento.appendChild(atracoesEvento);
            campoEvento.appendChild(acoesEvento);

            acoesEvento.appendChild(reservasEvento);
            acoesEvento.appendChild(editarEvento);
            acoesEvento.appendChild(excluirEvento);

            numeroEvento.innerText = i + 1;

            dataEvento.innerText = new Date(conteudoResposta[i].scheduled).toLocaleString().substr(0, 16);
            tituloEvento.innerText = conteudoResposta[i].name;
            atracoesEvento.innerText = conteudoResposta[i].attractions;
            reservasEvento.innerText = 'ver reservas';
            editarEvento.innerText = 'editar';
            excluirEvento.innerText = 'excluir';

            campoEventos.appendChild(campoEvento)

            function acessoId (id) {
                if (id == conteudoResposta[i]._id) {
                    editarEvento.setAttribute('href', `editar-evento.html?id=${id}`);
                } 
                return console.log(acessoId)
            }
            acessoId(conteudoResposta[i]._id);

        }

    } catch (error) {
        console.log(error)
    }
}
