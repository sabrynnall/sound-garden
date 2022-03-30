const inputNome = document.querySelector('#nome');
const inputBanner = document.querySelector('#banner');
const inputAtracoes = document.querySelector('#atracoes');
const inputDescricao = document.querySelector('#descricao');
const inputData = document.querySelector('#data');
const inputLotacao = document.querySelector('#lotacao');
const form = document.querySelector('#form-evento');
const resultado = document.querySelector('.resultado-body');
const botaoEditar = document.querySelector('.btn btn-secondary');
const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';

const url = (window.location.search)
const id = url.split('?id=');
const novoId = id[1];

window.onload = async () => {

    try {
        const opcoes = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const resposta = await fetch(`${BASE_URL}/events/${novoId}`, opcoes);

        const conteudoResposta = await resposta.json();

        inputNome.value = conteudoResposta.name;
        inputBanner.value = conteudoResposta.poster;
        inputAtracoes.value = conteudoResposta.attractions;
        inputDescricao.value = conteudoResposta.description;
        inputData.value = new Date(conteudoResposta.scheduled).toLocaleString().substr(0, 16);
        inputLotacao.value = conteudoResposta.number_tickets;

    } catch (error) {
        console.log(error)
    }
}

form.onsubmit = async (evento) => {

    evento.preventDefault();

    try {
        const atualizarEvento = {
            name: inputNome.value,
            poster: inputBanner.value,
            attractions: inputAtracoes.value.split(','),
            description: inputDescricao.value,
//TODO            scheduled: new Date(inputData.value).toISOString(),
            number_tickets: inputLotacao.value
        };

        const opcoes = {
            method: 'PUT',
            body: JSON.stringify(atualizarEvento),
            headers: {
                "Content-Type": "application/json",
            }
        }

        await fetch(`${BASE_URL}/events/${novoId}`, opcoes);

    } catch (error) {
        console.log(error)
    }
}