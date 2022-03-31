const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com/bookings';
const inputNome = document.querySelector('#reserva-nome');
const inputEmail = document.querySelector('#reserva-email');
const form = document.querySelector("#form-ingresso");
const resultado = document.querySelector('#link-reservar');


form.onsubmit = async (evento) => {

    evento.preventDefault();

    try {
        const novoCadastro = {
            owner_name: inputNome.value,
            owner_email: inputEmail.value,
            number_tickets: 1,
            event_id:""
            
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
        await fetch(`${BASE_URL}`, opcoes);

        let mensagemSucesso = 'Sucesso!';
        resultado.innerHTML = mensagemSucesso;
        resultado.style = 'background-color: green'
        

        console.log(mensagemSucesso)

        // tratando o erro
    } catch (error) {
        let mensagemErro = 'Erro';
        resultado.innerHTML = mensagemErro;
        resultado.style = 'background-color: red'

        console.log(error)
    } 
    finally {
        setTimeout(() => {
            resultado.innerHTML = "reservar";
            resultado.style = 'background-color: #C2185B'
        }, 3000)
    }
}