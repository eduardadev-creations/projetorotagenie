let clientes = JSON.parse(
    localStorage.getItem("clientes") || "{}"
);



// ===============================
// ADICIONAR CLIENTE
// ===============================

function novoCliente(){

    let bairro = new URLSearchParams(location.search)
    .get("bairro");


    window.location.href =
    "editar-cliente.html?bairro=" + encodeURIComponent(bairro);

}





// ===============================
// SALVAR CLIENTE
// ===============================

function salvarCliente(){


    let nome = document.getElementById("nome").value;
    let bairro = document.getElementById("bairro").value;


    if(nome.trim() === "" || bairro.trim() === ""){

        alert("Preencha nome e bairro!");

        return;

    }



    clientes[nome] = {


        nome:nome,


        apelido:
        document.getElementById("apelido").value,


        telefone:
        document.getElementById("telefone").value,


        cidade:
        document.getElementById("cidade").value,


        bairro:bairro,


        numero:
        document.getElementById("numero").value,

        rg:
        document.getElementById("rg").value,
        
        cpf:
        document.getElementById("cpf").value,


        nomeMae:
        document.getElementById("nomeMae").value,


        dataNascimento:
        document.getElementById("dataNascimento").value,
        
        dataVencimento:
document.getElementById("dataVencimento")?.value || "",
        status:
        clientes[nome]?.status || "pendente",



        endereco:{


            rua:
            document.getElementById("rua").value,


            frente:
            document.getElementById("frente").value,


            direita:
            document.getElementById("direita").value,


            esquerda:
            document.getElementById("esquerda").value,


            cor:
            document.getElementById("cor").value

        },



        observacoes:
        document.getElementById("obs").value,



        produtosRecentes:
        clientes[nome]?.produtosRecentes || [],


        produtosFinalizados:
        clientes[nome]?.produtosFinalizados || []



    };



    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );



    alert("Cliente salvo!");



    window.location.href =
    "clientes.html?bairro=" + encodeURIComponent(bairro);


}







// ===============================
// LISTA DE CLIENTES DO BAIRRO
// ===============================

function carregarClientes(){

    let bairro =
    new URLSearchParams(location.search)
    .get("bairro");


    if(!bairro) return;


    let titulo =
    document.getElementById("tituloBairro");


    if(titulo){
        titulo.innerHTML =
        "Clientes - " + bairro;
    }


    let lista =
    document.getElementById("listaClientes");


    let pesquisa =
    document.getElementById("pesquisaCliente");


    if(!lista) return;


    lista.innerHTML="";


    Object.values(clientes).forEach(cliente=>{


        let corVencimento =
        verificarVencimento(cliente.dataVencimento);
        let vencimento =
textoVencimento(cliente.dataVencimento);



        if(
            cliente.bairro === bairro &&
            (
            !pesquisa.value ||
            cliente.nome.toLowerCase()
            .includes(pesquisa.value.toLowerCase())
            )
        ){


            lista.innerHTML += `


            <div class="cliente-card ${corVencimento}"

            onclick='abrirCliente(${JSON.stringify(cliente.nome)})'>


                <h3>
                👤 ${cliente.apelido || cliente.nome}
                </h3>


                <p>
                📞 ${cliente.telefone || "Sem telefone"}
                </p>


                <p style="margin-top:6px;color:#555;">
    ${vencimento}
</p>
                <p style="margin-top:10px;font-weight:600;color:${
                cliente.status==="finalizado"
                ?
                "#16a34a"
                :
                "#ca8a04"
                };">


                ${
                cliente.status==="finalizado"
                ?
                "✅ Finalizado"
                :
                "⏳ Pendente"
                }


                </p>


            </div>


            `;

        }


    });


}





function abrirCliente(nome){


    window.location.href =
    "cliente.html?nome=" + encodeURIComponent(nome);


}








// ===============================
// FICHA DO CLIENTE
// ===============================


function carregarCliente(){


    let nome =
    new URLSearchParams(location.search)
    .get("nome");



    let cliente = clientes[nome];



    if(!cliente){


        document.body.innerHTML =
        "<h1>Cliente não encontrado</h1>";


        return;

    }





    document.getElementById("nomeCliente").innerHTML =
    cliente.nome;




    document.getElementById("informacoes").innerHTML = `


    <b>Nome completo:</b> ${cliente.nome}<br><br>


    <b>Conhecido como:</b> ${cliente.apelido || "-"}<br><br>


    <b>Telefone:</b> ${cliente.telefone || "-"}<br><br>


    <b>Cidade:</b> ${cliente.cidade || "-"}<br><br>


    <b>Bairro:</b> ${cliente.bairro}<br><br>


    <b>Número:</b> ${cliente.numero || "-"}<br><br>
    <b>RG:</b> ${cliente.rg || "-"}<br><br>
    <b>CPF:</b> ${cliente.cpf || "-"}<br><br>

<b>Nome da mãe:</b> ${cliente.nomeMae || "-"}<br><br>

<b>Data de nascimento:</b> ${cliente.dataNascimento || "-"}<br><br>
      <b>Status:</b>
      

${
cliente.status==="finalizado"

?

"<span style='color:#16a34a;font-weight:bold'>🟢 Finalizado</span>"

:

"<span style='color:#ca8a04;font-weight:bold'>🟡 Pendente</span>"

}

    `;




    document.getElementById("endereco").innerHTML = `


    <b>Rua:</b> ${cliente.endereco.rua || "-"}<br><br>


    <b>Referência frente:</b> ${cliente.endereco.frente || "-"}<br><br>


    <b>Referência direita:</b> ${cliente.endereco.direita || "-"}<br><br>


    <b>Referência esquerda:</b> ${cliente.endereco.esquerda || "-"}<br><br>


    <b>Cor da casa:</b> ${cliente.endereco.cor || "-"}


    `;



    document.getElementById("observacoes").innerHTML =

    cliente.observacoes || "Nenhuma observação";



    mostrarProdutos(cliente);
    const btn = document.getElementById("btnStatus");

if (btn) {

    btn.style.background = "#fff";

    if (cliente.status === "finalizado") {

        btn.textContent = "↩️ Reabrir Cliente";
        btn.onclick = reabrirCliente;

        btn.style.color = "#16a34a";
        btn.style.border = "2px solid #16a34a";

    } else {

        btn.textContent = "✅ Finalizar Cliente";
        btn.onclick = finalizarCliente;

        btn.style.color = "#ca8a04";
        btn.style.border = "2px solid #ca8a04";

    }
}



}







// ===============================
// PRODUTOS
// ===============================


function mostrarProdutos(cliente){


let recentes =
document.getElementById("produtosRecentes");


let finalizados =
document.getElementById("produtosFinalizados");



if(!recentes || !finalizados) return;



let totalAtual = 0;

let totalHistorico = 0;



recentes.innerHTML="";

finalizados.innerHTML="";





cliente.produtosRecentes.forEach(produto=>{


let total =
produto.quantidade * produto.valor;


totalAtual += total;



recentes.innerHTML += `

<tr>

<td>${produto.nome}</td>

<td>${produto.quantidade}</td>

<td>R$ ${total.toFixed(2)}</td>

</tr>

`;



});







cliente.produtosFinalizados.forEach(produto=>{


let total =
produto.quantidade * produto.valor;


totalHistorico += total;



finalizados.innerHTML += `

<tr>

<td>${produto.nome}</td>

<td>${produto.quantidade}</td>

<td>R$ ${total.toFixed(2)}</td>

</tr>

`;



});



if(document.getElementById("totalAtual"))

document.getElementById("totalAtual").innerHTML =
"R$ " + totalAtual.toFixed(2);



if(document.getElementById("totalHistorico"))

document.getElementById("totalHistorico").innerHTML =
"R$ " + totalHistorico.toFixed(2);



}







// ===============================
// EDITAR CLIENTE
// ===============================


function editarCliente(){


let nome =
new URLSearchParams(location.search)
.get("nome");



window.location.href =
"editar-cliente.html?nome=" +
encodeURIComponent(nome);


}







function abrirProdutos(){


let nome =
new URLSearchParams(location.search)
.get("nome");



window.location.href =
"produtos.html?nome=" +
encodeURIComponent(nome);


}







// ===============================
// IDENTIFICAR PÁGINA
// ===============================


let pagina =
location.pathname.split("/").pop();



if(pagina === "clientes.html"){

    carregarClientes();

}



if(pagina === "cliente.html"){

    carregarCliente();

}



if(document.getElementById("pesquisaCliente")){

document.getElementById("pesquisaCliente")
.oninput = carregarClientes;

}



function removerCliente(nome){

    if(!confirm(`Mover ${nome} para lixeira?`)){
        return;
    }


    let lixeira =
    JSON.parse(localStorage.getItem("lixeiraClientes") || "{}");


    lixeira[nome] = clientes[nome];


    localStorage.setItem(
        "lixeiraClientes",
        JSON.stringify(lixeira)
    );


    delete clientes[nome];


    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );


    carregarClientes();

}

let nome = new URLSearchParams(location.search).get("nome");

if(nome){

    let clientes = JSON.parse(localStorage.getItem("clientes") || "{}");

    let cliente = clientes[nome];

    if(cliente){

        document.getElementById("nome").value = cliente.nome;
        document.getElementById("apelido").value = cliente.apelido || "";
        document.getElementById("telefone").value = cliente.telefone || "";
        document.getElementById("cidade").value = cliente.cidade || "";
        document.getElementById("bairro").value = cliente.bairro || "";
        document.getElementById("numero").value = cliente.numero || "";
        document.getElementById("cpf").value = cliente.cpf || "";
        document.getElementById("nomeMae").value = cliente.nomeMae;
        document.getElementById("dataNascimento").value = cliente.dataNascimento;
        document.getElementById("dataVencimento").value = cliente.dataVencimento || "";
        document.getElementById("rua").value = cliente.endereco.rua || "";
        document.getElementById("frente").value = cliente.endereco.frente || "";
        document.getElementById("direita").value = cliente.endereco.direita || "";
        document.getElementById("esquerda").value = cliente.endereco.esquerda || "";
        document.getElementById("cor").value = cliente.endereco.cor || "";

        document.getElementById("obs").value = cliente.observacoes || "";

    }

}
function recuperarCliente(nome){

    let lixeira = JSON.parse(
        localStorage.getItem("clientesExcluidos") || "{}"
    );


    if(!lixeira[nome]){
        alert("Cliente não encontrado na lixeira.");
        return;
    }


    clientes[nome] = lixeira[nome];


    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );


    delete lixeira[nome];


    localStorage.setItem(
        "clientesExcluidos",
        JSON.stringify(lixeira)
    );


    alert("Cliente recuperado com sucesso!");

}

function finalizarCliente(){

    const nome = new URLSearchParams(location.search).get("nome");

    const cliente = clientes[nome];

    if(!cliente){

        alert("Cliente não encontrado.");

        return;

    }
    cliente.dataVencimento = "";
    if(cliente.status==="finalizado"){

        alert("Este cliente já foi finalizado.");

        return;

    }

    if(!confirm(`Finalizar atendimento de ${cliente.apelido || cliente.nome}?`)){
    cliente.dataVencimento = "";
        return;

    }

    if(!cliente.produtosRecentes){

        cliente.produtosRecentes=[];

    }

    if(!cliente.produtosFinalizados){

        cliente.produtosFinalizados=[];

    }

    cliente.produtosFinalizados.push(...cliente.produtosRecentes);

    cliente.produtosRecentes=[];

    cliente.status = "finalizado";

clientes[nome] = cliente;

localStorage.setItem(
    "clientes",
    JSON.stringify(clientes)
);

carregarCliente();

}

function reabrirCliente(){

    const nome = new URLSearchParams(location.search).get("nome");

    const cliente = clientes[nome];

    if(!cliente) return;

    if(!confirm(`Reabrir atendimento de ${cliente.apelido || cliente.nome}?`)){
        return;
    }

    cliente.status = "pendente";

    clientes[nome] = cliente;

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

    carregarCliente();

}
function textoVencimento(data){

    if(!data){
        return "";
    }

    let hoje = new Date();
    let vencimento = new Date(data);

    hoje.setHours(0,0,0,0);
    vencimento.setHours(0,0,0,0);

    let dias = Math.ceil(
        (vencimento - hoje) /
        (1000 * 60 * 60 * 24)
    );

    if(dias < 0){
        return `🔴 Vencido há ${Math.abs(dias)} dia(s)`;
    }

    if(dias === 0){
        return "🟡 Vence hoje";
    }

    if(dias === 1){
        return "🟡 Vence amanhã";
    }

    return `🟢 Vence em ${dias} dias`;
}
function verificarVencimento(data){

    if(!data){
        return "";
    }

    let hoje = new Date();
    let vencimento = new Date(data);

    let dias = Math.ceil(
        (vencimento - hoje) /
        (1000 * 60 * 60 * 24)
    );


    if(dias < 0){
        return "vencido";
    }


    if(dias <= 7){
        return "proximo";
    }


    return "em-dia";

}



function mostrarLixeira(){

    let lixeira =
    JSON.parse(localStorage.getItem("lixeiraClientes") || "{}");


    let nomes = Object.keys(lixeira);


    if(nomes.length === 0){

        alert("Nenhum cliente removido.");

        return;

    }


    let escolha = prompt(
        "Clientes removidos:\n\n" +
        nomes.join("\n") +
        "\n\nDigite o nome para recuperar:"
    );


    if(lixeira[escolha]){


        clientes[escolha] = lixeira[escolha];


        localStorage.setItem(
            "clientes",
            JSON.stringify(clientes)
        );


        delete lixeira[escolha];


        localStorage.setItem(
            "lixeiraClientes",
            JSON.stringify(lixeira)
        );


        alert("Cliente recuperado!");


        carregarClientes();


    }else{

        alert("Cliente não encontrado na lixeira.");

    }

}