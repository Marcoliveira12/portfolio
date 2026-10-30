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


//tecnologias

//para acrescentar uma tecnologia: copie um objeto { nome, arquivo } inteiro, cole no fim dos itens do grupo certo e troque os dados
//Java e SQL entram no Backend a partir de 15/12/2026, é só acrescentar um objeto em itens
const gruposTecnologias = [
    {
        titulo: 'Frontend',
        itens: [
            { nome: 'HTML', arquivo: 'img/icones/tec-html.svg' },
            { nome: 'CSS', arquivo: 'img/icones/tec-css.svg' },
            { nome: 'JavaScript', arquivo: 'img/icones/tec-javascript.svg' }
        ]
    },
    {
        titulo: 'Backend',
        itens: [
            { nome: 'Firebase', arquivo: 'img/icones/tec-firebase.svg' },
            { nome: 'ESP32', arquivo: 'img/icones/tec-esp32.svg' }
        ]
    },
    {
        titulo: 'Ferramentas',
        itens: [
            { nome: 'Git', arquivo: 'img/icones/tec-git.svg' },
            { nome: 'GitHub', arquivo: 'img/icones/tec-github.svg' },
            { nome: 'VS Code', arquivo: 'img/icones/tec-vscode.svg' }
        ]
    }
];

//tecnologias deste portfólio que aparecem no rodapé: só as linguagens e o Git
//(os nomes precisam ser iguais aos da lista de cima, porque o logo vem de lá)
const construidoCom = ['HTML', 'CSS', 'JavaScript', 'Git'];

const blocoGrupos = document.querySelector('.tecnologias-grupos');
const blocoConstruido = document.querySelector('.rodape-construido');

//procura nos grupos o arquivo do logo da tecnologia com esse nome (se não achar, devolve texto vazio)
function buscarArquivo(nome) {
    let arquivo = '';

    for (let i = 0; i < gruposTecnologias.length; i++) {
        const itens = gruposTecnologias[i].itens;

        for (let j = 0; j < itens.length; j++) {
            if (itens[j].nome === nome) {
                arquivo = itens[j].arquivo;
            }
        }
    }

    return arquivo;
}

//monta uma caixa para cada grupo, com um item (logo e nome) para cada tecnologia
function montarGrupos(lista) {
    let html = '';

    for (let i = 0; i < lista.length; i++) {
        const grupo = lista[i];
        let itens = '';

        for (let j = 0; j < grupo.itens.length; j++) {
            const item = grupo.itens[j];

            //cada item entra 80ms depois do anterior (o primeiro entra sem atraso)
            itens += `
                <li class="tecnologias-item" style="animation-delay: ${j * 80}ms">
                    <img class="tecnologias-icone" src="${item.arquivo}" alt="" width="48" height="48">
                    <span class="tecnologias-nome">${item.nome}</span>
                </li>
            `;
        }

        html += `
            <article class="tecnologias-grupo">
                <h3 class="tecnologias-rotulo">${grupo.titulo}</h3>
                <ul class="tecnologias-lista">${itens}</ul>
            </article>
        `;
    }

    return html;
}

//monta a linha do rodapé "esse portfólio foi construído com:" com os logos pequenos
function montarConstruido() {
    let itens = '';

    for (let i = 0; i < construidoCom.length; i++) {
        const nome = construidoCom[i];

        itens += `
            <li class="rodape-pequeno">
                <img src="${buscarArquivo(nome)}" alt="" width="32" height="32">
                <span class="tecnologias-nome">${nome}</span>
            </li>
        `;
    }

    const html = `
        <p class="rodape-construido-titulo">esse portfólio foi construído com:</p>
        <ul>${itens}</ul>
    `;

    return html;
}

if (blocoGrupos) {
    blocoGrupos.innerHTML = montarGrupos(gruposTecnologias);
}

if (blocoConstruido) {
    blocoConstruido.innerHTML = montarConstruido();
}


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


//topo

//em 15/12/2026 o 'Java' entra no fim da lista (e no comentário do index.html)
const tecnologias = ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub'];

const palavraTopo = document.querySelector('.inicio-palavra');
const caixaPalavra = document.querySelector('.inicio-palavra-caixa');

if (palavraTopo && caixaPalavra) {
    //quem pediu menos movimento continua vendo a lista parada do HTML
    const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduzirMovimento === false) {
        let indiceTecnologia = 0;

        //a tarja cobre a palavra, a palavra troca escondida e a tarja sai revelando a nova
        function trocarPalavra() {
            caixaPalavra.classList.add('cobrindo');

            setTimeout(function () {
                indiceTecnologia++;

                //depois da última, volta para a primeira
                if (indiceTecnologia === tecnologias.length) {
                    indiceTecnologia = 0;
                }

                palavraTopo.textContent = tecnologias[indiceTecnologia];
                caixaPalavra.classList.remove('cobrindo');
                caixaPalavra.classList.add('descobrindo');

                setTimeout(function () {
                    caixaPalavra.classList.remove('descobrindo');
                }, 300);
            }, 300);
        }

        palavraTopo.textContent = tecnologias[0];
        setInterval(trocarPalavra, 3000);
    }
}


//cabeçalho

//de 1024px para cima o CSS esconde o cabeçalho no topo; a classe cabecalho-visivel faz ele descer
const cabecalho = document.querySelector('.cabecalho');

//mostra o cabeçalho depois de rolar 40px; no topo esconde, a não ser que um link do menu esteja com o foco
function atualizarCabecalho() {
    if (window.scrollY > 40) {
        cabecalho.classList.add('cabecalho-visivel');
    } else if (cabecalho.contains(document.activeElement) === false) {
        cabecalho.classList.remove('cabecalho-visivel');
    }
}

if (cabecalho) {
    window.addEventListener('scroll', atualizarCabecalho);
    atualizarCabecalho();

    //Tab chegou num link do menu: o cabeçalho aparece na hora, mesmo no topo
    cabecalho.addEventListener('focusin', function () {
        cabecalho.classList.add('cabecalho-visivel');
    });

    //o foco saiu do cabeçalho: se a página estiver no topo, ele esconde de novo
    cabecalho.addEventListener('focusout', function (evento) {
        if (window.scrollY <= 40 && cabecalho.contains(evento.relatedTarget) === false) {
            cabecalho.classList.remove('cabecalho-visivel');
        }
    });
}


//progresso

const barraProgresso = document.querySelector('.progresso');

//estica a barra de 0 a 1 conforme a parte da página que já foi rolada
function atualizarProgresso() {
    const rolagemMaxima = document.documentElement.scrollHeight - window.innerHeight;
    let progresso = 0;

    //se a página não tem rolagem, a conta dividiria por zero
    if (rolagemMaxima > 0) {
        progresso = window.scrollY / rolagemMaxima;
    }

    barraProgresso.style.transform = `scaleX(${progresso})`;
}

if (barraProgresso) {
    window.addEventListener('scroll', atualizarProgresso);
    atualizarProgresso();
}
