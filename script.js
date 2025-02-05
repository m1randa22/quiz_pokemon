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
    ,
    {
        opcoes: [
            { imagem: 'img/fada.png', pontos: 1 },
            { imagem: 'img/dragao.png', pontos: 2 }
        ]
    },
    {
        opcoes: [
            { imagem: 'img/cachorro.png', pontos: 1 },
            { imagem: 'img/gato.png', pontos: 2 }
        ]
    },
    {
        opcoes: [
            { imagem: 'img/moto.png', pontos: 1 },
            { imagem: 'img/carro.png', pontos: 2 }
        ]
    }
];

function atualizarPergunta() {
    if (questionIndex < perguntas.length) {
        const perguntaAtual = perguntas[questionIndex];

        document.getElementById('questionOne').style.backgroundImage = `url('${perguntaAtual.opcoes[0].imagem}')`;
        document.getElementById('questionTwo').style.backgroundImage = `url('${perguntaAtual.opcoes[1].imagem}')`;
    } else {

        document.getElementById('loading').style.display = 'block';
        document.querySelectorAll('#questionOne, #questionTwo, #title').forEach(el => { el.style.display = 'none'; });

        setTimeout(() => {

            document.getElementById('loading').style.display = 'none';
            document.getElementById('restart').style.display = 'block';
            renderPokemon();

        }, 3000);
    }
}

function adicionarPontos(pontos) {
    totalPontos += pontos;
    questionIndex++;
    atualizarPergunta();
}

function obterIdPokemon() {
    switch (totalPontos) {
        case 8:
            document.body.style.backgroundColor = "#FF5733"; // Charmander
            return 4;
        case 9:
            document.body.style.backgroundColor = "#4CAF50"; // Bulbasaur
            return 1;
        case 10:
            document.body.style.backgroundColor = "#A020F0"; // Mewtwo
            return 150;
        case 11:
            document.body.style.backgroundColor = "#3498DB"; // Squirtle
            return 7;
        case 12:
            document.body.style.backgroundColor = "#FFD700"; // Pikachu
            return 25;
        case 13:
            document.body.style.backgroundColor = "#D2691E"; // Eevee
            return 133;
        case 14:
            document.body.style.backgroundColor = "#90EE90"; // Caterpie
            return 10;
        case 15:
            document.body.style.backgroundColor = "#2F4F4F"; // Snorlax
            return 143;
        case 16:
            document.body.style.backgroundColor = "#696969"; // Onix
            return 95;
        default:
            document.body.style.backgroundColor = "#FF69B4"; // Ditto - Caso o número de pontos seja imcompatível
            return 132
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

    pokemon_name.innerHTML = `Parabéns!! Você é o Pokémon: ${data.name.toUpperCase()}`;
    pokemon_image.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    document.getElementById('pokemonImage').style.display = "block"
}

function reiniciarJogo() {
    totalPontos = 0;
    questionIndex = 0;

    document.querySelectorAll('#questionOne, #questionTwo, #title').forEach(el => { el.style.display = 'block'; });

    pokemon_image.style.display = "none";
    pokemon_name.innerHTML = "";
    document.getElementById('restart').style.display = 'none';

    document.getElementById('questionOne').style.backgroundImage = 'none';
    document.getElementById('questionTwo').style.backgroundImage = 'none';

    document.body.style.backgroundColor = 'rgba(244, 34, 34, 0.883)';

    atualizarPergunta();
}

document.getElementById("restart").addEventListener("click", reiniciarJogo);