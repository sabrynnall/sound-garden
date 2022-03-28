const inputNome = document.querySelector('#nome');
const inputPoster = document.querySelector('#poster');
const inputAtracoes = document.querySelector('#atracoes');
const inputDescricao = document.querySelector('#descricao');
const inputData = document.querySelector('#data');
const inputLotacao = document.querySelector('#lotacao');
const form = document.querySelector('#form-evento');
const toast = document.querySelector('.toast-body')
const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';
// informando que cada campo da api irá receber os valores dos inputs
form.onsubmit = async (evento) => {

    evento.preventDefault();

    try {
        const novoCadastro = {
            name: inputNome.value,
            poster: inputPoster.value,
            attractions: inputAtracoes.value.split(','),
            description: inputDescricao.value,
            scheduled: new Date(inputData.value).toISOString(),
            number_tickets: inputLotacao.value
        };
    
        // informando o método utilizado e o formato a ser recebido (JSON)
        const opcoes = {
            method: 'POST',
            body: JSON.stringify(novoCadastro),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // fazendo requisição na api para inserir um novo evento
        await fetch(`${BASE_URL}/events`, opcoes);

        let mensagemSucesso = '✅ Cadastro efetuado com sucesso!';
        toast.innerHTML = mensagemSucesso;
        toast.style.display = "block";

        // tratando o erro
    } catch (error) {
        let mensagemErro = '🟥 Não foi possível efetuar o cadastro!';
        toast.innerHTML = mensagemErro;
        toast.style.display = "block";

        console.log(error)
    } 
    finally {
        setTimeout(() => {
            toast.style.display = "none";
        }, 3000)
    }
}

