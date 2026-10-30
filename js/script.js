document.documentElement.classList.add('js');

//ano atual do rodapé
const elementoAno = document.querySelector('.ano-atual');
elementoAno.textContent = new Date().getFullYear();


//botão de copiar o email (só com ícone)
const botaoCopiarEmail = document.querySelector('.contato-copiar');
const dicaCopiarEmail = document.querySelector('.contato-dica');
//aviso escondido da tela: só o leitor de tela lê
const avisoEmail = document.querySelector('.contato-aviso');

let timerCopiarEmail;

//volta o botão ao normal: ícone de copiar, balãozinho "Copiar" e aviso vazio
function limparCopiarEmail() {
    botaoCopiarEmail.classList.remove('contato-copiar-ok');
    botaoCopiarEmail.classList.remove('contato-copiar-falhou');
    dicaCopiarEmail.textContent = 'Copiar';
    avisoEmail.textContent = '';
}

//mostra o resultado por 2 segundos; o CSS troca o ícone e o balãozinho pela classe
function mostrarResultadoCopia(deuCerto) {
    //clique repetido antes dos 2 segundos: cancela o tempo anterior e começa de novo
    clearTimeout(timerCopiarEmail);
    limparCopiarEmail();

    if (deuCerto === true) {
        botaoCopiarEmail.classList.add('contato-copiar-ok');
        avisoEmail.textContent = 'E-mail copiado';
    } else {
        botaoCopiarEmail.classList.add('contato-copiar-falhou');
        dicaCopiarEmail.textContent = 'Não copiou';
        avisoEmail.textContent = 'Não foi possível copiar o e-mail';
    }

    timerCopiarEmail = setTimeout(limparCopiarEmail, 2000);
}

function copiarEmail() {
    //sem a área de transferência (por exemplo, site aberto sem https) já é falha
    if (navigator.clipboard) {
        //writeText devolve uma promessa: a primeira function roda se copiou, a segunda se deu erro
        navigator.clipboard.writeText('marcoantoniomachado1010@gmail.com').then(function () {
            mostrarResultadoCopia(true);
        }, function () {
            mostrarResultadoCopia(false);
        });
    } else {
        mostrarResultadoCopia(false);
    }
}

if (botaoCopiarEmail && dicaCopiarEmail && avisoEmail) {
    botaoCopiarEmail.addEventListener('click', copiarEmail);
}


//projetos

//para adicionar um projeto novo: copie um objeto inteiro (de { até },), cole na lista na posição em que ele deve aparecer
//e troque os dados. Campos de link (site, codigo, pagina) ficam com '' quando não existem: o cartão só mostra o que tiver link.
//as descrições abaixo são provisórias: eu escrevo as definitivas
const projetos = [
    {
        titulo: 'Teko Lixeira',
        tipo: 'TCC',
        ano: 2026,
        origem: 'TCC · 2026',
        status: 'Em desenvolvimento',
        descricao: 'Lixeira IoT, do Amazon Hacking ao TCC.',
        tecnologias: ['ESP32', 'React', 'JavaScript', 'Firebase'],
        imagemDesktop: 'img/projeto-teko-lixeira.png',
        imagemMobile: 'img/projeto-teko-lixeira.png',
        alt: 'Dashboard do Teko Lixeira mostrando o peso de lixo coletado no mês e o status da lixeira',
        //TODO: ainda não tem repositório público nem site no ar
        codigo: '',
        site: '',
        //o prompt 8 preenche a página do projeto (ex: 'projetos/teko-lixeira.html')
        pagina: ''
    },
    {
        titulo: 'Este portfólio',
        tipo: 'Projeto pessoal',
        ano: 2026,
        origem: 'Projeto pessoal · 2026',
        status: 'Em desenvolvimento',
        descricao: 'Meu site pessoal.',
        tecnologias: ['HTML', 'CSS', 'JavaScript', 'Git'],
        imagemDesktop: 'img/projeto-portfolio.png',
        imagemMobile: 'img/projeto-portfolio.png',
        alt: 'Página inicial deste portfólio',
        codigo: 'https://github.com/Marcoliveira12/portfolio',
        //TODO: link do site no ar quando o portfólio for publicado
        site: '',
        //o prompt 8 preenche a página do projeto (ex: 'projetos/portfolio.html')
        pagina: ''
    },
    {
        titulo: 'Tecboard',
        tipo: 'Curso Alura',
        ano: 2026,
        origem: 'Curso Alura · 2026',
        status: 'Concluído',
        descricao: 'Do layout do Figma a uma landing page de monitoramento.',
        tecnologias: ['HTML', 'CSS'],
        imagemDesktop: 'img/projeto-tecboard.png',
        imagemMobile: 'img/projeto-tecboard.png',
        alt: 'Topo da landing page Tecboard, com o título Fique de olho no que importa, o botão Testar versão demo e celulares mostrando o aplicativo',
        codigo: 'https://github.com/Marcoliveira12/tecboard',
        site: 'https://marcoliveira12.github.io/tecboard/',
        //o prompt 8 preenche a página do projeto (ex: 'projetos/tecboard.html')
        pagina: ''
    }
];

const feedProjetos = document.querySelector('.feed');

//monta um cartão para cada projeto da lista recebida e coloca tudo dentro do .feed (a grade de projetos)
function montarPosts(lista) {
    let html = '';

    for (let i = 0; i < lista.length; i++) {
        const projeto = lista[i];

        //imagem do projeto; sem imagem, um bloco do mesmo tamanho com o nome
        let midia = '';

        if (projeto.imagemDesktop !== '') {
            midia = `
                <picture>
                    <source media="(max-width: 599px)" srcset="${projeto.imagemMobile}">
                    <img class="projeto-imagem" src="${projeto.imagemDesktop}" alt="${projeto.alt}" width="1280" height="800" loading="lazy">
                </picture>
            `;
        } else {
            //TODO: falta a imagem deste projeto
            midia = `<div class="projeto-sem-imagem">${projeto.titulo}</div>`;
        }

        //botões sobre a imagem: só os que têm link
        let acoes = '';

        if (projeto.site !== '') {
            acoes += `
                <a class="projeto-acao" href="${projeto.site}" target="_blank" rel="noopener noreferrer" aria-label="Ver site de ${projeto.titulo} (abre em nova aba)">
                    <span class="logo-rede logo-site" aria-hidden="true"></span>
                    <span class="projeto-acao-rotulo" aria-hidden="true">Ver site</span>
                </a>
            `;
        }

        if (projeto.codigo !== '') {
            acoes += `
                <a class="projeto-acao" href="${projeto.codigo}" target="_blank" rel="noopener noreferrer" aria-label="Ver código de ${projeto.titulo} no GitHub (abre em nova aba)">
                    <span class="logo-rede logo-github" aria-hidden="true"></span>
                    <span class="projeto-acao-rotulo" aria-hidden="true">Ver código</span>
                </a>
            `;
        }

        //o bloco dos botões só existe se o projeto tiver algum link
        let blocoAcoes = '';

        if (acoes !== '') {
            blocoAcoes = `<div class="projeto-acoes">${acoes}</div>`;
        }

        //com página, o título vira link e o cartão inteiro clica; sem página, o título é só texto
        let titulo = projeto.titulo;

        if (projeto.pagina !== '') {
            titulo = `<a class="projeto-link" href="${projeto.pagina}">${projeto.titulo}</a>`;
        }

        //uma pílula de texto para cada tecnologia
        let tags = '';

        for (let j = 0; j < projeto.tecnologias.length; j++) {
            tags += `<li class="projeto-tag">${projeto.tecnologias[j]}</li>`;
        }

        html += `
            <article class="projeto">
                <div class="projeto-midia">
                    ${midia}
                    ${blocoAcoes}
                </div>

                <h3 class="projeto-titulo">${titulo}</h3>
                <p class="projeto-origem">${projeto.origem}</p>
                <p class="projeto-descricao">${projeto.descricao}</p>

                <ul class="projeto-tags" aria-label="Tecnologias usadas">${tags}</ul>
            </article>
        `;
    }

    feedProjetos.innerHTML = html;
}

montarPosts(projetos);

//contadores da seção Projetos (total e em andamento), na linha abaixo do título
const contadoresProjetos = document.querySelector('.projetos-contadores');

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

//escolhe a palavra certa para a quantidade: 1 projeto, 2 projetos
function singularOuPlural(quantidade, singular, plural) {
    let palavra = plural;

    if (quantidade === 1) {
        palavra = singular;
    }

    return palavra;
}

//escreve "03 projetos · 02 em andamento", com os números num span para ficarem mais claros
if (contadoresProjetos) {
    const palavraProjetos = singularOuPlural(projetos.length, 'projeto', 'projetos');

    contadoresProjetos.innerHTML = `<span class="projetos-numero">${doisDigitos(projetos.length)}</span> ${palavraProjetos} · <span class="projetos-numero">${doisDigitos(projetosEmAndamento)}</span> em andamento`;
}


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

//monta a parte direita do rodapé: "Construído com" e os logos pequenos, na mesma linha
function montarConstruido() {
    let itens = '';

    for (let i = 0; i < construidoCom.length; i++) {
        const nome = construidoCom[i];

        itens += `
            <li class="rodape-pequeno">
                <img src="${buscarArquivo(nome)}" alt="" width="20" height="20">
                <span class="tecnologias-nome">${nome}</span>
            </li>
        `;
    }

    const html = `
        <p class="rodape-construido-titulo">Construído com</p>
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

//só observa as seções se o menu existir (abaixo de 1024px ele fica escondido, mas continua no HTML)
if (linksMenu.length > 0) {
    for (let i = 0; i < secoesMenu.length; i++) {
        observadorMenu.observe(secoesMenu[i]);
    }
}


//próxima seção

//no pé de cada seção, um rótulo para a seguinte (o CSS só mostra no computador em tela cheia).
//a última seção (Contato) fica de fora: o "Voltar ao topo" dela está no index.html
const secoesPagina = document.querySelectorAll('main > section');

function montarProximas() {
    //vai até a penúltima seção (length - 1 fica de fora): cada uma aponta para a seguinte
    for (let i = 0; i < secoesPagina.length - 1; i++) {
        const idProxima = secoesPagina[i + 1].id;
        const linkDoMenu = document.querySelector(`.menu a[href="#${idProxima}"]`);
        //o nome é o mesmo do menu; se o link não existir, fica o id
        let nome = idProxima;

        if (linkDoMenu) {
            nome = linkDoMenu.textContent;
        }

        secoesPagina[i].insertAdjacentHTML('beforeend', `
            <a class="proxima" href="#${idProxima}" aria-label="Ir para ${nome}">${nome}</a>
        `);
    }
}

montarProximas();


//topo

//em 15/12/2026 o 'Java' entra no fim da lista (e no comentário do index.html)
const tecnologias = ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub'];

const palavraTopo = document.querySelector('.inicio-palavra');
const caixaPalavra = document.querySelector('.inicio-palavra-caixa');
const sobrenomeTopo = document.querySelector('.inicio-sobrenome');
const machadoTopo = document.querySelector('.inicio-sobrenome .logo-machado');

if (palavraTopo && caixaPalavra && sobrenomeTopo && machadoTopo) {
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

        //um ciclo do topo: o machado golpeia e, no impacto, o sobrenome treme e a palavra troca
        function cicloTopo() {
            machadoTopo.classList.add('golpeando');

            //o impacto é aos 330ms: 55% dos 600ms do golpe, o quadro em que o machado desce (ver @keyframes marca-golpe)
            setTimeout(function () {
                sobrenomeTopo.classList.add('tremendo');
                trocarPalavra();
            }, 330);
        }

        //cada classe sai quando a sua animação termina, para o próximo ciclo poder colocar de novo
        machadoTopo.addEventListener('animationend', function () {
            machadoTopo.classList.remove('golpeando');
        });

        //o animationend do machado também chega aqui, porque o machado está dentro do sobrenome: por isso confere o nome
        sobrenomeTopo.addEventListener('animationend', function (evento) {
            if (evento.animationName === 'marca-tremida') {
                sobrenomeTopo.classList.remove('tremendo');
            }
        });

        palavraTopo.textContent = tecnologias[0];
        setInterval(cicloTopo, 3000);
    }
}


//cabeçalho

//de 1024px para cima o CSS esconde o cabeçalho no topo; a classe cabecalho-visivel faz ele descer
const cabecalho = document.querySelector('.cabecalho');

//mostra o cabeçalho depois de rolar 40px; no topo esconde, a não ser que um link do menu esteja com o foco do teclado.
//o foco do clique não conta: depois de clicar em Início, o link fica com o foco e o menu precisa esconder ao chegar no topo
function atualizarCabecalho() {
    if (window.scrollY > 40) {
        cabecalho.classList.add('cabecalho-visivel');
    } else if (cabecalho.querySelector(':focus-visible') === null) {
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


//rolagem por seção

//no computador em tela cheia, cada gesto da roda do mouse (ou cada toque nas setas para cima e para baixo)
//leva à próxima seção (ou à anterior) numa animação de 1s.
//só a roda e as duas setas passam por aqui: as outras teclas, a barra de rolagem, o leitor de tela e o toque
//continuam com a rolagem do navegador
const faixaTelaCheia = window.matchMedia('(min-width: 1024px) and (min-height: 640px)');
const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');

//número da seção em que a página está, na lista secoesPagina (0 é o início, 6 é o contato)
let indiceAtual = 0;
//true enquanto a animarRolagem está rodando
let animando = false;
//hora (em ms) do último evento da roda que fez parte de um gesto
let ultimoGiro = 0;
//true quando o gesto atual já trocou de seção ou chegou durante uma animação: o resto dele é ignorado
let gestoUsado = false;
let timerSincronizar;

//curva de aceleração e freada (ease-in-out cúbica): recebe o tempo de 0 a 1 e devolve o caminho de 0 a 1.
//na primeira metade é 4t³: começa devagar e acelera. Na segunda é a mesma curva espelhada: freia até parar.
//as duas metades se encontram no meio (t = 0,5 dá 0,5 nas duas contas)
function curvaSuave(t) {
    let caminho = 4 * t * t * t;

    if (t >= 0.5) {
        caminho = 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    return caminho;
}

//leva a página da posição atual até destino (em px) em 1000ms, um quadro de cada vez
function animarRolagem(destino) {
    const inicio = window.scrollY;
    const distancia = destino - inicio;
    const duracao = 1000;
    const comeco = performance.now();

    //cada quadro calcula quanto do tempo passou e põe a página no ponto certo da curva
    function quadro() {
        //de 0 a 1; o Math.min não deixa passar de 1 se um quadro atrasar
        const t = Math.min((performance.now() - comeco) / duracao, 1);

        //instant: rola na hora, sem a rolagem suave do CSS por cima da animação
        window.scrollTo({ top: inicio + distancia * curvaSuave(t), behavior: 'instant' });

        //enquanto não chegou ao fim, pede o próximo quadro; no último, a animação termina
        if (t < 1) {
            requestAnimationFrame(quadro);
        } else {
            animando = false;
        }
    }

    //com movimento reduzido vai direto para o destino, sem animação
    if (movimentoReduzido.matches) {
        window.scrollTo({ top: destino, behavior: 'instant' });
    } else {
        animando = true;
        requestAnimationFrame(quadro);
    }
}

//decide o que um gesto faz, seja da roda ou das setas. paraCima é true quando o gesto sobe.
//mesmoGesto é true quando o evento continua um gesto que já começou (a roda girando, a seta segurada).
//devolve true quando o navegador não pode rolar sozinho (quem chamou faz o preventDefault)
function rolarPorSecao(paraCima, mesmoGesto) {
    let bloquear = false;

    //um gesto novo começa sem ter sido usado
    if (mesmoGesto === false) {
        gestoUsado = false;
    }

    const caixa = secoesPagina[indiceAtual].getBoundingClientRect();
    const alturaJanela = window.innerHeight;
    //seção mais alta que a janela (2px de tolerância para os arredondamentos)
    const maisAlta = caixa.height > alturaJanela + 2;

    //para baixo: vai para a seguinte; a seção alta ainda tem conteúdo se o fim dela está abaixo da janela
    let destino = indiceAtual + 1;
    let temConteudo = maisAlta && caixa.bottom > alturaJanela + 2;

    //para cima: vai para a anterior; a seção alta ainda tem conteúdo se o começo dela está acima da janela
    if (paraCima === true) {
        destino = indiceAtual - 1;
        temConteudo = maisAlta && caixa.top < -2;
    }

    if (animando === true || gestoUsado === true) {
        //animação em andamento, ou o resto de um gesto já usado (a inércia depois de trocar de seção):
        //o gesto não faz nada, nem rola por dentro de uma seção alta
        bloquear = true;
        gestoUsado = true;
    } else if (temConteudo === false && destino >= 0 && destino < secoesPagina.length) {
        //existe uma seção para ir: o navegador não rola sozinho
        bloquear = true;

        //só um gesto novo troca de seção; a continuação de um gesto que estava rolando nativo é ignorada
        if (mesmoGesto === false) {
            indiceAtual = destino;
            gestoUsado = true;
            animarRolagem(secoesPagina[destino].offsetTop);
        }
    }
    //nos outros casos (seção alta com conteúdo, primeira seção para cima, última para baixo)
    //bloquear fica false: o navegador rola normal

    return bloquear;
}

//roda do mouse
function rolarPelaRoda(evento) {
    //só na faixa de tela cheia e sem o Ctrl (Ctrl + roda é o zoom do navegador)
    if (faixaTelaCheia.matches && evento.ctrlKey === false) {
        const agora = performance.now();
        //menos de 200ms desde o último evento: é o mesmo gesto continuando (um giro rápido, a inércia do trackpad)
        const mesmoGesto = agora - ultimoGiro < 200;

        //movimento maior que 4, ou movimento mínimo que continua um gesto (o fim da inércia).
        //um movimento mínimo solto fica com o navegador
        if (Math.abs(evento.deltaY) > 4 || mesmoGesto === true) {
            ultimoGiro = agora;

            if (rolarPorSecao(evento.deltaY < 0, mesmoGesto) === true) {
                evento.preventDefault();
            }
        }
    }
}

window.addEventListener('wheel', rolarPelaRoda, { passive: false });

//devolve true quando o elemento recebe texto digitado (campo de formulário ou elemento editável)
function ehCampoDeTexto(elemento) {
    let campo = false;

    if (elemento.tagName === 'INPUT' || elemento.tagName === 'TEXTAREA' || elemento.tagName === 'SELECT') {
        campo = true;
    }

    if (elemento.isContentEditable === true) {
        campo = true;
    }

    return campo;
}

//setas para baixo e para cima: o mesmo que um gesto da roda
function rolarPelaSeta(evento) {
    const ehSeta = evento.key === 'ArrowDown' || evento.key === 'ArrowUp';
    //Ctrl, Alt, Meta ou Shift apertado: a tecla é um atalho, fica com o navegador
    const temModificador = evento.ctrlKey === true || evento.altKey === true || evento.metaKey === true || evento.shiftKey === true;

    if (faixaTelaCheia.matches && ehSeta === true && temModificador === false && ehCampoDeTexto(evento.target) === false) {
        //segurar a tecla repete o keydown com repeat true: conta como o mesmo gesto continuando,
        //como a roda girando sem parar, e por isso nunca troca de seção
        if (rolarPorSecao(evento.key === 'ArrowUp', evento.repeat) === true) {
            evento.preventDefault();
        }
    }
}

window.addEventListener('keydown', rolarPelaSeta);

//devolve o número da seção com o topo mais perto do topo da janela
function acharSecaoMaisPerto() {
    let maisPerto = 0;
    let menorDistancia = Math.abs(secoesPagina[0].getBoundingClientRect().top);

    for (let i = 1; i < secoesPagina.length; i++) {
        const distancia = Math.abs(secoesPagina[i].getBoundingClientRect().top);

        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            maisPerto = i;
        }
    }

    return maisPerto;
}

//rolou por outro meio (outras teclas, barra de rolagem, menu, rótulos): a seção atual passa a ser a que está na tela.
//não mexe durante a animação da roda, que já sabe para onde vai
function sincronizarSecao() {
    if (animando === false) {
        indiceAtual = acharSecaoMaisPerto();
    }
}

//cada scroll reinicia a contagem: a sincronização só roda quando a rolagem fica 150ms parada
function agendarSincronizacao() {
    clearTimeout(timerSincronizar);
    timerSincronizar = setTimeout(sincronizarSecao, 150);
}

window.addEventListener('scroll', agendarSincronizacao);
//a página pode abrir já rolada (ao recarregar, o navegador volta para onde estava)
sincronizarSecao();
