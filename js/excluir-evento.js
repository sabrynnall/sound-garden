const inputNome = document.querySelector('#nome');
const inputBanner = document.querySelector('#banner');
const inputAtracoes = document.querySelector('#atracoes');
const inputDescricao = document.querySelector('#descricao');
const inputData = document.querySelector('#data');
const inputLotacao = document.querySelector('#lotacao');
const form = document.querySelector('#form-evento');
const resultado = document.querySelector('.resultado');
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

        let data = conteudoResposta.scheduled;

        inputNome.value = conteudoResposta.name;
        inputBanner.value = conteudoResposta.poster;
        inputAtracoes.value = conteudoResposta.attractions;
        inputDescricao.value = conteudoResposta.description;
        inputData.value = data.split("").slice(0, 16).join("");
        inputLotacao.value = conteudoResposta.number_tickets;

    } catch (error){
        console.log(error)
    }
}

form.onsubmit = async (evento) => {

    evento.preventDefault();

    try {
        const opcoes = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        }

        await fetch(`${BASE_URL}/events/${novoId}`, opcoes);

        inputNome.value = '';
        inputBanner.value = '';
        inputAtracoes.value = '';
        inputDescricao.value = '';
        inputData.value = '';
        inputLotacao.value = '';

        let mensagemSucesso = '✅ Evento excluído com sucesso!';
        resultado.innerHTML = mensagemSucesso;
        resultado.style.display = "block";

    } catch (error) {
        console.log(error)
    }

}