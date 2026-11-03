// ===============================
// CARREGAR CLIENTE
// ===============================

const clientes = JSON.parse(localStorage.getItem("clientes") || "{}");

const params = new URLSearchParams(window.location.search);

const nomeCliente = params.get("nome");

const cliente = clientes[nomeCliente];

if (!cliente) {
    document.body.innerHTML = "<h1>Cliente não encontrado.</h1>";
    throw new Error("Cliente não encontrado.");
}

// ===============================
// DATA
// ===============================

const hoje = new Date();

document.getElementById("dataAtual").textContent =
    hoje.toLocaleDateString("pt-BR");

// ===============================
// DADOS DA CLIENTE
// ===============================

document.getElementById("nome").textContent =
    cliente.nome || "-";

document.getElementById("apelido").textContent =
    cliente.apelido || "-";

document.getElementById("telefone").textContent =
    cliente.telefone || "-";

document.getElementById("cidade").textContent =
    cliente.cidade || "-";

document.getElementById("bairro").textContent =
    cliente.bairro || "-";

document.getElementById("numero").textContent =
    cliente.numero || "-";
document.getElementById("rg").textContent =
    cliente.rg || "-";
    document.getElementById("cpf").textContent =
    cliente.cpf || "-";


document.getElementById("nomeMae").textContent =
    cliente.nomeMae || "-";


document.getElementById("dataNascimento").textContent =
    cliente.dataNascimento || "-";
    document.getElementById("dataVencimento").textContent =
    cliente.dataVencimento || "-";

document.getElementById("rua").textContent =
    cliente.endereco?.rua || "-";

document.getElementById("frente").textContent =
    cliente.endereco?.frente || "-";

document.getElementById("direita").textContent =
    cliente.endereco?.direita || "-";

document.getElementById("esquerda").textContent =
    cliente.endereco?.esquerda || "-";

document.getElementById("cor").textContent =
    cliente.endereco?.cor || "-";

// ===============================
// PRODUTOS
// ===============================

const tabela = document.getElementById("listaProdutos");

let totalLiquido = 0;
let totalBruto = 0;

(cliente.produtosRecentes || []).forEach(produto => {

    const quantidade = Number(produto.quantidade) || 0;

    const valor = Number(produto.valor) || 0;

    const subtotal = Number(produto.subtotal) || 0;

    const totalLiquidoProduto = quantidade * subtotal;

const totalBrutoProduto = quantidade * valor;


totalLiquido += totalLiquidoProduto;

totalBruto += totalBrutoProduto;

    tabela.innerHTML += `
<tr>

    <td>${produto.nome}</td>

    <td>${quantidade}</td>

    <td>R$ ${valor.toFixed(2)}</td>

    <td>R$ ${subtotal.toFixed(2)}</td>

    <td>R$ ${totalLiquidoProduto.toFixed(2)}</td>

</tr>
`;

});

// ===============================
// TOTAL
// ===============================

document.getElementById("totalLiquido").textContent =
    "R$ " + totalLiquido.toFixed(2);


document.getElementById("totalBruto").textContent =
    "R$ " + totalBruto.toFixed(2);

// ===============================
// IMPRESSÃO
// ===============================

function imprimirFicha() {

    window.print();

}