/*
filtro de projetos por tecnologia (GUARDADO: o site não carrega este arquivo)

o que faz: cria um botão "Todos" e um botão para cada tecnologia da lista "projetos".
ao clicar, mostra só os projetos com aquela tecnologia (usando a montarProjetos do script.js)
e escreve "Mostrando X de Y projetos".

por que está guardado: com 3 projetos, 7 botões atrapalham mais do que ajudam.
volta quando o site tiver uns 6 projetos.

como religar (o HTML e o CSS estão logo abaixo, em linhas comentadas com //;
depois de colar, selecione as linhas e aperte Ctrl+/ no VS Code para tirar as barras):
1. HTML: no index.html, na seção Projetos, logo antes da <div class="projetos-lista">.
2. CSS: no bloco PROJETOS do css/style.css; o .filtro:active vai dentro da media query de movimento do bloco.
3. JavaScript: no index.html, logo depois da linha do script.js, coloque
   <script src="guardado/filtro-projetos.js" defer></script>
   (tem que vir depois e também com defer, porque usa a lista projetos e a função montarProjetos do script.js).
   Se preferir, mova o código deste arquivo para o fim do bloco PROJETOS do script.js e não precisa dessa linha.
*/

// ----- HTML -----
// <div class="filtros" role="group" aria-label="Filtrar projetos por tecnologia"></div>
// <p class="filtro-resultado" aria-live="polite"></p>

// ----- CSS -----
// /*filtros por tecnologia: escondidos sem JavaScript*/
// .filtros,
// .filtro-resultado {
//     display: none;
// }
//
// /*botões do filtro lado a lado, quebrando linha quando não cabem*/
// .js .filtros {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 8px;
// }
//
// /*botão do filtro (mesmo visual do botão fantasma, com 44px de altura para o toque)*/
// .filtro {
//     display: inline-flex;
//     align-items: center;
//     min-height: 44px;
//     font-family: inter, system-ui, sans-serif;
//     font-size: 14px;
//     font-weight: 500;
//     color: #7CC4FF;
//     background-color: transparent;
//     border: none;
//     border-radius: 6px;
//     padding: 6px 12px;
//     cursor: pointer;
//     transition: background-color 0.2s, color 0.2s;
// }
//
// /*hover do botão do filtro*/
// .filtro:hover {
//     background-color: #132235;
//     color: #A5D6FF;
// }
//
// /*filtro ativo com a cor de destaque*/
// .filtro.ativo {
//     background-color: #7CC4FF;
//     color: #0D1117;
// }
//
// /*texto "Mostrando X de Y projetos"*/
// .js .filtro-resultado {
//     display: block;
//     font-size: 14px;
//     color: #8B96A5;
//     margin: 12px 0 24px 0;
// }
//
// /*dentro de @media (prefers-reduced-motion: no-preference): o botão afunda no clique, como os outros*/
// .filtro:active {
//     transform: translateY(1px) scale(0.97);
//     transition: transform 80ms ease-out;
// }

// ----- JAVASCRIPT -----

const filtros = document.querySelector('.filtros');
const filtroResultado = document.querySelector('.filtro-resultado');

//junta as tecnologias de todos os projetos, sem repetir
const tecnologiasFiltro = [];

for (let i = 0; i < projetos.length; i++) {
    for (let j = 0; j < projetos[i].tecnologias.length; j++) {
        const tecnologia = projetos[i].tecnologias[j];

        if (tecnologiasFiltro.includes(tecnologia) === false) {
            tecnologiasFiltro.push(tecnologia);
        }
    }
}

//monta os botões: primeiro o "Todos" (ativo), depois um para cada tecnologia
let botoesHtml = '<button type="button" class="filtro ativo" data-tecnologia="todos" aria-pressed="true">Todos</button>';

for (let i = 0; i < tecnologiasFiltro.length; i++) {
    botoesHtml += `<button type="button" class="filtro" data-tecnologia="${tecnologiasFiltro[i]}" aria-pressed="false">${tecnologiasFiltro[i]}</button>`;
}

filtros.innerHTML = botoesHtml;

const botoesFiltro = document.querySelectorAll('.filtro');

//texto "Mostrando X de Y projetos"
function mostrarResultado(quantidade) {
    filtroResultado.textContent = `Mostrando ${quantidade} de ${projetos.length} projetos`;
}

//ao clicar: marca o botão clicado, separa os projetos com aquela tecnologia e monta os cartões de novo
function filtrarProjetos(evento) {
    const botaoClicado = evento.currentTarget;
    const tecnologiaEscolhida = botaoClicado.dataset.tecnologia;

    for (let i = 0; i < botoesFiltro.length; i++) {
        botoesFiltro[i].classList.remove('ativo');
        botoesFiltro[i].setAttribute('aria-pressed', 'false');
    }

    botaoClicado.classList.add('ativo');
    botaoClicado.setAttribute('aria-pressed', 'true');

    let listaFiltrada = [];

    if (tecnologiaEscolhida === 'todos') {
        listaFiltrada = projetos;
    } else {
        for (let i = 0; i < projetos.length; i++) {
            if (projetos[i].tecnologias.includes(tecnologiaEscolhida) === true) {
                listaFiltrada.push(projetos[i]);
            }
        }
    }

    montarProjetos(listaFiltrada);
    mostrarResultado(listaFiltrada.length);
}

for (let i = 0; i < botoesFiltro.length; i++) {
    botoesFiltro[i].addEventListener('click', filtrarProjetos);
}

mostrarResultado(projetos.length);
