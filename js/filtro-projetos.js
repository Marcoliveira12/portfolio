/*
filtro de projetos por tecnologia (DESLIGADO)

o que faz: cria um botão "Todos" e um botão para cada tecnologia da lista "projetos".
ao clicar, mostra só os projetos com aquela tecnologia (usando a montarPosts do script.js)
e escreve "Mostrando X de Y projetos".

por que está desligado: com 3 projetos, 7 botões atrapalham mais do que ajudam.
volta quando tiver uns 6 projetos.

como religar:
1. no index.html, na seção Projetos, logo antes da <div class="feed">, coloque:
   <div class="filtros" role="group" aria-label="Filtrar projetos por tecnologia"></div>
   <p class="filtro-resultado" aria-live="polite"></p>
2. no index.html, depois de <script src="js/script.js"></script>, coloque:
   <script src="js/filtro-projetos.js"></script>
   (tem que vir depois, porque usa a lista projetos e a função montarPosts do script.js)
3. as regras do filtro já estão no fim do css/style.css.
*/

//filtro de projetos por tecnologia
const filtros = document.querySelector('.filtros');
const filtroResultado = document.querySelector('.filtro-resultado');

//junta as tecnologias de todos os projetos, sem repetir
const tecnologiasFiltro = [];

for (let i = 0; i < projetos.length; i++) {
    for (let j = 0; j < projetos[i].tecnologias.length; j++) {
        const tecnologia = projetos[i].tecnologias[j];

        if (!tecnologiasFiltro.includes(tecnologia)) {
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

//ao clicar: marca o botão clicado, separa os projetos com aquela tecnologia e monta os posts de novo
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
            if (projetos[i].tecnologias.includes(tecnologiaEscolhida)) {
                listaFiltrada.push(projetos[i]);
            }
        }
    }

    montarPosts(listaFiltrada);
    mostrarResultado(listaFiltrada.length);
}

for (let i = 0; i < botoesFiltro.length; i++) {
    botoesFiltro[i].addEventListener('click', filtrarProjetos);
}

mostrarResultado(projetos.length);
