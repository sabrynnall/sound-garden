const campoEventos = document.querySelector('#campo-eventos');
const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';

// função para colocar o id na url

function inserirId (id, elemento, nomeAcao) {
    elemento.setAttribute('href', `${nomeAcao}.html?id=${id}`);
}
// formatando a data para uma melhor visualização na tela
function formatarData (data) {
    const dataHora = data.split('T');
    const dataF = dataHora[0].split('-').reverse();
    const novaData = dataF.join('/');
    const horaF = dataHora[1].slice(0, 5);

    return `${novaData} ${horaF}`
}
// mostrando cada evento existente no banco da api
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

            const data = conteudoResposta[i].scheduled;
            const dataFormatada = formatarData(data);

            dataEvento.innerText = dataFormatada;
            tituloEvento.innerText = conteudoResposta[i].name;
            atracoesEvento.innerText = conteudoResposta[i].attractions;
            reservasEvento.innerText = 'ver reservas';
            editarEvento.innerText = 'editar';
            excluirEvento.innerText = 'excluir';

            campoEventos.appendChild(campoEvento)

            inserirId(conteudoResposta[i]._id, excluirEvento, 'excluir-evento');
            inserirId(conteudoResposta[i]._id, editarEvento, 'editar-evento');
        }

    } catch (error) {
        console.log(error)
    }
}
