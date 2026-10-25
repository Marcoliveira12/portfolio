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


//animações

//seções aparecendo de acordo com o scroll do usuário
const secoesRevelar = document.querySelectorAll('.revelar');

const observadorSecoes = new IntersectionObserver(function (entradas) {
    for (let i = 0; i < entradas.length; i++) {
        const entrada = entradas[i];

        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            observadorSecoes.unobserve(entrada.target);
        }
    }
}, { threshold: 0, rootMargin: '0px 0px -15% 0px' });

for (let i = 0; i < secoesRevelar.length; i++) {
    observadorSecoes.observe(secoesRevelar[i]);
}

//menu destacando o link da seção que está na tela
const secoesMenu = document.querySelectorAll('main section[id]');
const linksMenu = document.querySelectorAll('.menu a');

const observadorMenu = new IntersectionObserver(function (entradas) {
    for (let i = 0; i < entradas.length; i++) {
        const entrada = entradas[i];

        if (entrada.isIntersecting) {
            for (let j = 0; j < linksMenu.length; j++) {
                linksMenu[j].classList.remove('ativo');
                linksMenu[j].removeAttribute('aria-current');
            }

            const linkAtivo = document.querySelector(`.menu a[href="#${entrada.target.id}"]`);

            if (linkAtivo) {
                linkAtivo.classList.add('ativo');
                linkAtivo.setAttribute('aria-current', 'true');
            }
        }
    }
}, { rootMargin: '-50% 0px -50% 0px' });

for (let i = 0; i < secoesMenu.length; i++) {
    observadorMenu.observe(secoesMenu[i]);
}
secoesMenu.forEach((secao) => observadorMenu.observe(secao));
