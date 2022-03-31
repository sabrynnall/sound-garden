const campoEventos = document.querySelector('#campo-eventos');
const botaoEditar = document.querySelector('.btn btn-secondary');
const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';

function inserirId (id, editarEvento) {
    editarEvento.setAttribute('href', `editar-evento.html?id=${id}`);
}

function formatarData (data) {
    const dataHora = data.split('T');
    const dataF = dataHora[0].split('-').reverse();
    const novaData = dataF.join('/');
    const horaF = dataHora[1].slice(0, 5);

    return `${novaData} ${horaF}`
}

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

            const data = conteudoResposta[i].scheduled;
            const dataFormatada = formatarData(data);

            dataEvento.innerText = dataFormatada;
            tituloEvento.innerText = conteudoResposta[i].name;
            atracoesEvento.innerText = conteudoResposta[i].attractions;
            reservasEvento.innerText = 'ver reservas';
            editarEvento.innerText = 'editar';
            excluirEvento.innerText = 'excluir';

            campoEventos.appendChild(campoEvento)

            inserirId(conteudoResposta[i]._id, editarEvento);

        }

    } catch (error) {
        console.log(error)
    }
}
