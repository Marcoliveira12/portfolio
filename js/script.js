//ano atual do rodapé
const elementoAno = document.querySelector('.ano-atual');
elementoAno.textContent = new Date().getFullYear();


//botão de copiar o email
const botaoCopiarEmail = document.querySelector('.contato-copiar');
const avisoEmailCopiado = document.querySelector('.contato-aviso');

function copiarEmail() {
    navigator.clipboard.writeText('marcoantoniomachado1010@gmail.com');

    avisoEmailCopiado.textContent = 'E-mail copiado!';
    avisoEmailCopiado.classList.add('visivel');

    setTimeout(function () {
        avisoEmailCopiado.classList.remove('visivel');
    }, 2000);
}

botaoCopiarEmail.addEventListener('click', copiarEmail);