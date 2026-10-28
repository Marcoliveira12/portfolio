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


//projetos

//para adicionar um projeto novo: copie um objeto inteiro (de { até },), cole no fim da lista e troque os dados
const projetos = [
    {
        titulo: 'Este portfólio',
        tipo: 'Projeto pessoal',
        ano: 2026,
        status: 'Em desenvolvimento',
        descricao: 'Site pessoal criado para apresentar meus projetos, minha formação e minha evolução na área de desenvolvimento de software.',
        tecnologias: ['HTML', 'CSS', 'JavaScript'],
        imagemDesktop: 'img/projeto-portfolio.png',
        imagemMobile: 'img/projeto-portfolio.png',
        alt: 'Página inicial deste portfólio',
        codigo: 'https://github.com/Marcoliveira12/portfolio',
        site: ''
    },
    {
        titulo: 'Teko Lixeira',
        tipo: 'TCC',
        ano: 2026,
        status: 'Em desenvolvimento',
        descricao: 'Lixeira inteligente criada no Amazon Hacking 2025 que pesa cada descarte e envia os dados para um dashboard, ajudando a otimizar a coleta de lixo.',
        tecnologias: ['ESP32', 'React', 'JavaScript', 'Firebase'],
        imagemDesktop: 'img/projeto-teko-lixeira.png',
        imagemMobile: 'img/projeto-teko-lixeira.png',
        alt: 'Dashboard do Teko Lixeira mostrando o peso de lixo coletado no mês e o status da lixeira',
        codigo: '',
        site: ''
    },
    {
        titulo: 'Tecboard',
        tipo: 'Curso Alura',
        ano: 2026,
        status: 'Concluído',
        descricao: 'Landing page construída em HTML e CSS a partir de um layout no Figma, durante o curso da Alura.',
        tecnologias: ['HTML', 'CSS'],
        imagemDesktop: 'img/projeto-tecboard.png',
        imagemMobile: 'img/projeto-tecboard.png',
        alt: 'Topo da landing page Tecboard, com o título Fique de olho no que importa, o botão Testar versão demo e celulares mostrando o aplicativo',
        codigo: 'https://github.com/Marcoliveira12/tecboard',
        site: 'https://marcoliveira12.github.io/tecboard/'
    }
];

const feedProjetos = document.querySelector('.feed');

//monta um post para cada projeto da lista recebida e coloca tudo dentro do .feed
function montarPosts(lista) {
    let html = '';

    for (let i = 0; i < lista.length; i++) {
        const projeto = lista[i];

        //só o primeiro print carrega na hora, os outros esperam a rolagem
        let carregamento = '';

        if (i > 0) {
            carregamento = ' loading="lazy"';
        }

        //links só aparecem se existirem
        let links = '';

        //aviso escondido da tela para o leitor de tela dizer que o link abre em nova aba
        const avisoNovaAba = '<span class="visualmente-oculto"> (abre em nova aba)</span>';

        if (projeto.codigo !== '') {
            links += `<a href="${projeto.codigo}" target="_blank" rel="noopener">Ver código${avisoNovaAba}</a>`;
        }

        if (projeto.site !== '') {
            links += `<a href="${projeto.site}" target="_blank" rel="noopener">Visitar site${avisoNovaAba}</a>`;
        }

        //o rodapé só existe se o projeto tiver algum link
        let rodape = '';

        if (links !== '') {
            rodape = `<footer><div class="post-links">${links}</div></footer>`;
        }

        html += `
            <article class="post cartao">
                <header>
                    <p>${projeto.tipo} · ${projeto.ano}</p>
                    <h3>${projeto.titulo}</h3>
                </header>

                <figure>
                    <picture>
                        <source media="(max-width: 599px)" srcset="${projeto.imagemMobile}">
                        <img src="${projeto.imagemDesktop}" alt="${projeto.alt}" width="1280" height="720"${carregamento}>
                    </picture>
                </figure>

                <p class="post-descricao">${projeto.descricao}</p>

                ${rodape}
            </article>
        `;
    }

    feedProjetos.innerHTML = html;
}

montarPosts(projetos);

//contadores do cartão de perfil (total de projetos e em andamento)
const contadorProjetos = document.querySelector('.contador-projetos');
const contadorAndamento = document.querySelector('.contador-andamento');

//coloca o zero na frente dos números menores que 10 (3 vira 03)
function doisDigitos(numero) {
    let texto = String(numero);

    if (numero < 10) {
        texto = '0' + numero;
    }

    return texto;
}

let projetosEmAndamento = 0;

for (let i = 0; i < projetos.length; i++) {
    if (projetos[i].status === 'Em desenvolvimento') {
        projetosEmAndamento++;
    }
}

contadorProjetos.textContent = doisDigitos(projetos.length);
contadorAndamento.textContent = doisDigitos(projetosEmAndamento);


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
