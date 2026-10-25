document.documentElement.classList.add('js');

//ano atual do rodapé
const elementoAno = document.querySelector('.ano-atual');
elementoAno.textContent = new Date().getFullYear();


//botão de copiar o email
const botaoCopiarEmail = document.querySelector('.contato-copiar');
const avisoEmailCopiado = document.querySelector('.contato-aviso');

let timerAvisoEmail;

function copiarEmail() {
    navigator.clipboard.writeText('marcoantoniomachado1010@gmail.com');

    clearTimeout(timerAvisoEmail);

    avisoEmailCopiado.textContent = 'E-mail copiado!';
    avisoEmailCopiado.classList.add('visivel');

    timerAvisoEmail = setTimeout(function () {
        avisoEmailCopiado.classList.remove('visivel');

        timerAvisoEmail = setTimeout(function () {
            avisoEmailCopiado.textContent = '';
        }, 150);
    }, 2000);
}

botaoCopiarEmail.addEventListener('click', copiarEmail);

//seções aparecendo de acordo com o scroll do usuário
const secoesRevelar = document.querySelectorAll('.revelar');

const observadorSecoes = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        entrada.target.classList.add('visivel');
        observadorSecoes.unobserve(entrada.target);
    });
}, { threshold: 0, rootMargin: '0px 0px -15% 0px' });

secoesRevelar.forEach((secao) => observadorSecoes.observe(secao));
