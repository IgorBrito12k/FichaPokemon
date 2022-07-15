//como eu vou me referir a uma tag eu uso o querySelector
var formulario = document.querySelector('form')

//Eu quero que o javascript fique analisando e vai emitir uma ação quando eu clicar no botão pesquisar
formulario.addEventListener('submit', function (e) {
    //preventDefault não irá atualizar a página quando feita a pesquisa
    e.preventDefault()

    //utilizando a api "pokeApi" para pegar os dados dos pokémons
    //url da pesquisa
    let urlForm = "https://pokeapi.co/api/v2/pokemon/";

    //valor do input name
    let nome = document.getElementById("name")

    // Ou seja, ele agora irá pegar a url que eu ja defini e assim que eu colocar o número ou o nome ele irá buscar na PokeApi
    urlForm = urlForm + this.name.value

    //isto deixa o nome em minusculo caso o usúario coloque em caps lock
    urlForm = urlForm.toLocaleLowerCase()

    //ID Content
    let resposta = document.getElementById('content');

    //ID imgPokemon
    let imagem = document.getElementById('imgPokemon');

    //Resposta em HTML
    let html = ''

    //Vamos fazer um fetch (É u comando que quando eu fizer uma pesquisa, ele irá retornar pra mim o valor desta pesquisa)
    fetch(urlForm)
        //informar o tipo de resposta que eu quero
        .then(resposta => resposta.json())
        .then(function (data) {
            console.log(data)
            //Nome do pokémon
            html = 'Nome: ' + maiuscula(data.name) + '<br>'
            //tipo do Pokémon
            html = html + 'Tipo: ' + maiuscula(data.types[0].type.name) + '<br>'
            //movimento do pokémon
            html = html + 'movimento: ' + maiuscula(data.moves[0].move.name) + '<br>'
            //habilidade do pokemon
            html = html + 'Habilidade: ' + maiuscula(data.abilities[0].ability.name) + '<br>'
            //mostrando os resultados
            resposta.innerHTML = html
            //inserindo as imagens
            imagem.innerHTML = "<img src='" + data.sprites.front_default + "'><img src='" + data.sprites.back_default + "'>"
        })
        //caso retorne algum erro, ele irá me mostrar
        .catch(function (err) {
            console.log(err)
            if (err == 'SyntaxError: Unexpected token N in JSON at position 0') {
                html = "Pokémon não encontrado!😥"
            } else {
                html = 'Erro: '
            }
            resposta.innerHTML = html
        })

});

// Pega o primeira caractere e deixa maisculo
function maiuscula(val) {
    //pega o caracter 0, coloca em uppercase e depois junta com os demais apartir do caractere 1
    return val[0].toUpperCase() + val.substr(1)
}