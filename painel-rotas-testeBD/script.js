const dados = {

"Rota 01":[
"Presidente Kennedy",
"Planalto Pici",
"Campus Pici",
"Pan-americano",
"Álvaro Wayne",
"Antônio Bezerra"
],

"Rota 02":[
"Caucaia",
"Metrópoles 1,2,3",
"Araturi",
"Picuí",
"Nova Cigana",
"Júlio Maria"
],

"Rota 03":[
"Grande Bom Jardim",
"Jardim Jatobá",
"Santo Amaro",
"Urucutuba",
"Granja Portugal",
"Granja Lisboa"
],

"Rota 04":[
"Maranguape",
"Parque Luzardo Viana",
"Mucunã",
"Parque Tijuca",
"Residencial",
"Maracananzinho",
"Piratininga"
],

"Rota 05":[
"Pacatuba",
"Santo Sátiro",
"Acaracuzinho",
"Novo Maracanaú",
"Jereissati 2 e 3",
"Alto da Mangueira",
"Horto",
"Guaíba"
],

"Rota 06":[
"Mundubim",
"Alto Alegre",
"Fluminense",
"Santa Rosa",
"Siqueira (lado do Atacadão)",
"Bom Sucesso"
],

"Rota 07":[
"Altran Nunes",
"Henrique Jorge",
"Genibaú",
"João XXIII",
"São Miguel",
"Quintino Cunha"
],

"Rota 08":[
"Caucaia",
"Açude",
"Parque Soledade",
"Grilo",
"Itambé 1 e 2",
"Curicaca",
"Icaraí"
]

};



let rotasRetiradas =
JSON.parse(localStorage.getItem("rotasRetiradas") || "[]");


let bairrosRetirados =
JSON.parse(localStorage.getItem("bairrosRetirados") || "[]");


let finalizadas =
JSON.parse(localStorage.getItem("finalizadas") || "[]");



const r = document.getElementById("rotas");
const rr = document.getElementById("retiradas");
const br = document.getElementById("bairrosRetirados");
const p = document.getElementById("pesquisa");




// Abrir clientes do bairro

function clientes(bairro){

window.location.href =
"clientes.html?bairro=" + encodeURIComponent(bairro);

}





// Retirar rota

function retirarRota(rota){

if(!rotasRetiradas.includes(rota)){

rotasRetiradas.push(rota);

}

salvar();

}





// Devolver rota

function devolverRota(rota){

rotasRetiradas =
rotasRetiradas.filter(x => x !== rota);

salvar();

}





// Retirar bairro

function retirarBairro(bairro){

if(!bairrosRetirados.includes(bairro)){

bairrosRetirados.push(bairro);

}

salvar();

}





// Devolver bairro

function devolverBairro(bairro){

bairrosRetirados =
bairrosRetirados.filter(x => x !== bairro);

salvar();

}





// Finalizar rota

function finalizar(rota){


if(finalizadas.includes(rota)){


finalizadas =
finalizadas.filter(x => x !== rota);


}else{


finalizadas.push(rota);


}


salvar();


}





function draw(){


r.innerHTML="";

rr.innerHTML="";

br.innerHTML="";




Object.entries(dados).forEach(([rota,bairros])=>{


if(rotasRetiradas.includes(rota)){


rr.innerHTML +=

`

<div class="card">

<h3>${rota}</h3>


<button onclick="devolverRota('${rota}')">

Devolver

</button>


</div>

`;


return;

}




let lista="";



bairros.forEach(bairro=>{


if(
!bairrosRetirados.includes(bairro)
&&
(!p.value ||
bairro.toLowerCase()
.includes(p.value.toLowerCase()))
){



lista +=

`

<li onclick="clientes('${bairro}')">


<span>${bairro}</span>


<button onclick="event.stopPropagation(); retirarBairro('${bairro}')">

Retirar bairro

</button>


</li>


`;


}



});





r.innerHTML +=


`

<div class="card">


<h3>

${rota}

${finalizadas.includes(rota) ? " ✅ Finalizada" : ""}

</h3>



<ul>

${lista}

</ul>

<button
onclick="adicionarBairro('${rota}')"
class="btnAdicionar">

➕ Adicionar Bairro

</button>



<button onclick="finalizar('${rota}')">


${finalizadas.includes(rota)

?

"Voltar andamento"

:

"Finalizar"

}


</button>



<button onclick="retirarRota('${rota}')">

Retirar rota

</button>



</div>

`;



});







bairrosRetirados.forEach(bairro=>{


br.innerHTML +=


`

<div class="card">


<p>

${bairro}

</p>


<button onclick="devolverBairro('${bairro}')">

Devolver

</button>


</div>


`;


});



}






function salvar(){


localStorage.setItem(

"rotasRetiradas",

JSON.stringify(rotasRetiradas)

);



localStorage.setItem(

"bairrosRetirados",

JSON.stringify(bairrosRetirados)

);



localStorage.setItem(

"finalizadas",

JSON.stringify(finalizadas)

);



draw();


}




p.oninput = draw;


draw();

// ===============================
// ADICIONAR ROTA
// ===============================

function adicionarRota(){

    let nome = prompt("Nome da nova rota:");

    if(!nome) return;

    nome = nome.trim();

    if(dados[nome]){
        alert("Essa rota já existe.");
        return;
    }

    dados[nome] = [];

    draw();

}



// ===============================
// ADICIONAR BAIRRO
// ===============================

function adicionarBairro(rota){

    let bairro = prompt("Nome do novo bairro:");

    if(!bairro) return;

    bairro = bairro.trim();

    dados[rota].push(bairro);

    draw();

}

const senhaCorreta = "1234";

function entrar() {

    const senha = document.getElementById("senha").value;

    if (senha === senhaCorreta) {

        localStorage.setItem("login", "ok");

        document.getElementById("login").style.display = "none";
        document.getElementById("painel").style.display = "block";

    } else {

        document.getElementById("erro").textContent = "Senha incorreta";

    }

}

if (localStorage.getItem("login") === "ok") {

    document.getElementById("login").style.display = "none";
    document.getElementById("painel").style.display = "block";

}

p.oninput = draw;
draw();