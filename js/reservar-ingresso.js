const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com/bookings';
const inputNome = document.querySelector('#reserva-nome');
const inputEmail = document.querySelector('#reserva-email');
const form = document.querySelector("#form-ingresso");
const resultado = document.querySelector('.resultado');

form.onsubmit = async (evento) => {

    evento.preventDefault();

    try {
        const novoCadastro = {
            owner_name: inputNome.value,
            owner_email: inputEmail.value
            
        };
    
        // informando o método utilizado e o formato a ser recebido (JSON)
        const opcoes = {
            method: 'POST',
            body: JSON.stringify(novoCadastro),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // fazendo requisição na api para fazer uma reserva
        await fetch(`${BASE_URL}/bookings`, opcoes);

        let mensagemSucesso = '✅ Cadastro efetuado com sucesso!';
        resultado.innerHTML = mensagemSucesso;
        resultado.style.display = "block";
        
        console.log(mensagemSucesso)

        // tratando o erro
    } catch (error) {
        let mensagemErro = '🟥 Não foi possível efetuar o cadastro!';
        resultado.innerHTML = mensagemErro;
        resultado.style.display = "block";

        console.log(error)
    } 
    finally {
        setTimeout(() => {
            resultado.style.display = "none";
        }, 3000)
    }
}