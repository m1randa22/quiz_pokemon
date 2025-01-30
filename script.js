var totalPontos = 0;
var questionIndex = 0;

const perguntas = [
    {
        opcoes: [
            { imagem: 'img/fogo.png', pontos: 1 },
            { imagem: 'img/agua.png', pontos: 2 }
        ]
    },
    {
        opcoes: [
            { imagem: 'img/coxinha.png', pontos: 1 },
            { imagem: 'img/rosquinha.png', pontos: 2 }
        ]
    },
    {
        opcoes: [
            { imagem: 'img/videogame.png', pontos: 1 },
            { imagem: 'img/livro.png', pontos: 2 }
        ]
    },
    {
        opcoes: [
            { imagem: 'img/amigos.png', pontos: 1 },
            { imagem: 'img/sozinho.png', pontos: 2 }
        ]
    },
    {
        opcoes: [
            { imagem: 'img/lua.png', pontos: 1 },
            { imagem: 'img/sol.png', pontos: 2 }
        ]
    }
];

// Função para atualizar as opções de imagem para a próxima pergunta
function atualizarPergunta() {
    if (questionIndex < perguntas.length) {
        const perguntaAtual = perguntas[questionIndex];

        // Atualiza as imagens de fundo dos botões
        document.getElementById("questionOne").style.backgroundImage = `url('${perguntaAtual.opcoes[0].imagem}')`;
        document.getElementById("questionTwo").style.backgroundImage = `url('${perguntaAtual.opcoes[1].imagem}')`;
    } else {
        document.getElementById("res").textContent = `Você fez ${totalPontos} pontos!`;
    }
}

// Função para somar os pontos e passar para a próxima pergunta
function adicionarPontos(pontos) {
    totalPontos += pontos;
    questionIndex++; // Avança para a próxima pergunta
    atualizarPergunta();
}

async function fetchPokemon(idPokemon) {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
    const data = APIResponse.json;
    return data;
}

async function renderPokemon(pokemon) {
    //TODO: Adicionar pokemon em seu devido ponto
    const data = await fetchPokemon(pokemon);
    var img = document.createElement('img')
    img.setAttribute('id', 'foto')

    switch (totalPontos) {
        case 5:
            img.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
            break;
        case 6:
            img.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
            break;
        case 7:
            img.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
            break;
        case 8:
            img.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
            break;
        case 9:
            img.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
            break;
        case 10:
            img.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
            break;
        default:
            break;
    }
}