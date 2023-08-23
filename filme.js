// Seleciona o primeiro formulário encontrado na página
const frmPesquisa = document.querySelector("form");

// Define o que acontece quando o formulário é enviado
frmPesquisa.onsubmit = (ev) => {

    // Impede o comportamento padrão de envio do formulário
    ev.preventDefault();

    // Chave de API para acesso à OMDB API
    const APIkey = '64b31e6a';

    // Obtém o valor do campo de pesquisa do formulário
    const pesquisa = ev.target.pesquisa.value;

    // Verifica se o campo de pesquisa está vazio
    if (pesquisa == "") {
        alert("Preencha o campo!!!");
        return;
    }

    // Faz uma solicitação à OMDB API com o termo de pesquisa
    fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${APIkey}`)
        .then(result => result.json())
        .then(json => carregaLista(json));

}

// Função para carregar a lista de filmes na página
const carregaLista = (json) => {
    const lista = document.querySelector("div.lista");
    lista.innerHTML = "";

    // Verifica se a resposta da API é 'False', ou seja, nenhum filme foi encontrado
    if (json.Response == 'False') {
        alert('Nenhum filme encontrado!')
        return;
    }

    // Itera sobre cada filme retornado pela API e cria elementos HTML para exibi-los
    json.Search.forEach(element => {

        // Cria um novo elemento <div> para representar um item na lista de filmes
        let item = document.createElement("div");

        // Adiciona a classe CSS "item" ao elemento <div> recém-criado
        item.classList.add("item");

        // Insere uma imagem (com a URL do pôster do filme) e o título do filme
        item.innerHTML = `<img src="${element.Poster}" /><h2>${element.Title}<h2>`

        // Adiciona o elemento <div> com a classe "item" e seu conteúdo à lista de filmes
        lista.appendChild(item);

    });
}

// Carrossel de imagens
const box = document.querySelector(".container");
const imagens = document.querySelectorAll(".container img");
let contador = 0;

// Função para alternar imagens no carrossel
function slider() {
    contador++;

    // Verifica se o contador ultrapassou o número de imagens disponíveis
    if (contador > imagens.length - 1) {
        contador = 0;
    }

    // Atualiza a posição do carrossel de acordo com o contador
    box.style.transform = `translateX(${-contador * 1250}px)`;
}

// Define um intervalo para chamar a função slider a cada 2000 milissegundos (2 segundos)
setInterval(slider, 2000);
