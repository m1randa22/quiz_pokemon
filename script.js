let totalPontos = 0;
let questionIndex = 0;
const pokemon_image = document.querySelector('#pokemonImage')
const pokemon_name = document.querySelector('#pokemonName')

const perguntas = [
    {
        opcoes: [
            { nome: 'Fogo', imagem: 'img/fogo.png', pontos: 1 },
            { nome: 'Água', imagem: 'img/agua.png', pontos: 2 }
        ]
    },
    {
        opcoes: [
            { nome: 'Salgado', imagem: 'img/coxinha.png', pontos: 1 },
            { nome: 'Doce', imagem: 'img/rosquinha.png', pontos: 2 }
        ]
    },
    {
        opcoes: [
            { nome: 'Jogar', imagem: 'img/videogame.png', pontos: 1 },
            { nome: 'Ler', imagem: 'img/livro.png', pontos: 2 }
        ]
    },
    {
        opcoes: [
            { nome: 'Amigos', imagem: 'img/amigos.png', pontos: 1 },
            { nome: 'Sozinho', imagem: 'img/sozinho.png', pontos: 2 }
        ]
    },
    {
        opcoes: [
            { nome: 'Noite', imagem: 'img/lua.png', pontos: 1 },
            { nome: 'Dia', imagem: 'img/sol.png', pontos: 2 }
        ]
    }
    ,
    {
        opcoes: [
            { nome: 'Fada', imagem: 'img/fada.png', pontos: 1 },
            { nome: 'Dragão', imagem: 'img/dragao.png', pontos: 2 }
        ]
    },
    {
        opcoes: [
            { nome: 'Cachorro', imagem: 'img/cachorro.png', pontos: 1 },
            { nome: 'Gato', imagem: 'img/gato.png', pontos: 2 }
        ]
    },
    {
        opcoes: [
            { nome: 'Moto', imagem: 'img/moto.png', pontos: 1 },
            { nome: 'Carro', imagem: 'img/carro.png', pontos: 2 }
        ]
    }
];

function atualizarPergunta() {

    const perguntaAtual = perguntas[questionIndex];
    if (questionIndex < perguntas.length) {

        document.getElementById('questionOne').style.backgroundImage = `url('${perguntaAtual.opcoes[0].imagem}')`;
        document.getElementById('questionTwo').style.backgroundImage = `url('${perguntaAtual.opcoes[1].imagem}')`;
        document.querySelector('#textOne').innerText = perguntaAtual.opcoes[0].nome;
        document.querySelector('#textTwo').innerText = perguntaAtual.opcoes[1].nome;

    } else {
        mostrarCarregando()
    }
}

function mostrarCarregando() {
    document.getElementById('loading').style.display = 'block';
    document.querySelectorAll('#questionOne, #questionTwo, #title, #text').forEach(el => { el.style.display = 'none'; });
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('restart').style.display = 'block';
        renderPokemon();
    }, 3000);
}

function adicionarPontos(pontos) {
    totalPontos += pontos;
    questionIndex++;
    atualizarPergunta();
}

function obterIdPokemon() {
    const pontosPorPokemon = {
        8: { id: 4, cor: "#FF5733" },  // Charmander
        9: { id: 1, cor: "#4CAF50" },  // Bulbasaur
        10: { id: 150, cor: "#A020F0" }, // Mewtwo
        11: { id: 7, cor: "#3498DB" },  // Squirtle
        12: { id: 25, cor: "#FFD700" }, // Pikachu
        13: { id: 133, cor: "#D2691E" }, // Eevee
        14: { id: 10, cor: "#90EE90" },  // Caterpie
        15: { id: 143, cor: "#2F4F4F" }, // Snorlax
        16: { id: 95, cor: "#696969" }  // Onix
    };

    const pokemonData = pontosPorPokemon[totalPontos] || { id: 132, cor: "#FF69B4" }; // Ditto

    document.body.style.backgroundColor = pokemonData.cor;
    return pokemonData.id;
}

async function fetchPokemon(pokemon) {
    try {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (!APIResponse.ok) {
            throw new Error(`Erro ao buscar Pokémon: ${APIResponse.status}`)
        }
        const data = await APIResponse.json();
        return data;
    } catch (error) {
        console.error(error);
        alert('Ocorreu um erro ao carregar. Verifique sua conexão com a internet ou tente novamente.')
        return null;
    }
}

async function renderPokemon() {
    let idPokemon = obterIdPokemon()
    const data = await fetchPokemon(idPokemon);

    pokemon_name.innerHTML = `Parabéns!! </br></br> Você seria o Pokémon: ${data.name.toUpperCase()}`;
    pokemon_image.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    document.getElementById('pokemonImage').style.display = "block"
}

function reiniciarJogo() {
    totalPontos = 0;
    questionIndex = 0;

    document.querySelectorAll('#questionOne, #questionTwo, #title, #text').forEach(el => { el.style.display = 'block'; });
    pokemon_image.style.display = "none";
    pokemon_name.innerHTML = "";
    document.getElementById('restart').style.display = 'none';
    document.body.style.backgroundColor = 'rgba(244, 34, 34, 0.883)';
    atualizarPergunta();
}

document.getElementById("restart").addEventListener("click", reiniciarJogo);