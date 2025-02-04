var totalPontos = 0;
var questionIndex = 0;
var pokemon_image = document.querySelector('#pokemonImage')
var pokemon_name = document.querySelector('#pokemonName')

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
        document.getElementById('questionOne').style.backgroundImage = `url('${perguntaAtual.opcoes[0].imagem}')`;
        document.getElementById('questionTwo').style.backgroundImage = `url('${perguntaAtual.opcoes[1].imagem}')`;
    } else {
        document.querySelectorAll('#questionOne, #questionTwo, #title').forEach(el => { el.style.display = 'none'; });
        renderPokemon();
    }
}

// Função para somar os pontos e passar para a próxima pergunta
function adicionarPontos(pontos) {
    totalPontos += pontos;
    questionIndex++; // Avança para a próxima pergunta
    atualizarPergunta();
}

function obterIdPokemon() {
    switch (totalPontos) {
        case 5: return 25;  // Pikachu
        case 6: return 1;   // Bulbasaur
        case 7: return 10;  // Caterpie
        case 8: return 4;   // Charmander
        case 9: return 200; // Misdreavous
        case 10: return 30; // Nidorina
        default: return 132; // Ditto (caso o total de pontos não esteja mapeado)
    }
}

async function fetchPokemon(pokemon) {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIResponse.json();
    return data;
}

async function renderPokemon() {
    let idPokemon = obterIdPokemon()
    const data = await fetchPokemon(idPokemon);

    pokemon_name.innerHTML = `Parabéns!! você é o Pokémon: ${data.name.toUpperCase()}`;
    pokemon_image.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    document.getElementById('pokemonImage').style.display = "block"
}