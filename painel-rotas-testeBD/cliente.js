const cards = document.getElementById("cards");

const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");

const dots = document.querySelectorAll(".dot");

const cardLinks = document.querySelectorAll(".card-link");

let indiceAtual = 0;


// =========================
// IR PARA UM CARD
// =========================

function irParaCard(indice) {

    if (indice < 0) {
        indice = 0;
    }

    if (indice >= cardLinks.length) {
        indice = cardLinks.length - 1;
    }

    indiceAtual = indice;

    cardLinks[indice].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
    });

    atualizarBolinhas();
}


// =========================
// ATUALIZAR BOLINHAS
// =========================

function atualizarBolinhas() {

    dots.forEach(function(dot, indice) {

        dot.classList.toggle(
            "active",
            indice === indiceAtual
        );

    });

}


// =========================
// BOTÃO ANTERIOR
// =========================

anterior.addEventListener("click", function() {

    irParaCard(indiceAtual - 1);

});


// =========================
// BOTÃO PRÓXIMO
// =========================

proximo.addEventListener("click", function() {

    irParaCard(indiceAtual + 1);

});


// =========================
// CLICAR NAS BOLINHAS
// =========================

dots.forEach(function(dot, indice) {

    dot.addEventListener("click", function() {

        irParaCard(indice);

    });

});