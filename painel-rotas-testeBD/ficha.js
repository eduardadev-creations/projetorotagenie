const clientes = JSON.parse(localStorage.getItem("clientes") || "{}");

const params = new URLSearchParams(window.location.search);
const nome = params.get("nome");

const cliente = clientes[nome];

if (!cliente) {
    document.body.innerHTML = "<h1>Cliente não encontrado.</h1>";
    throw new Error("Cliente não encontrado.");
}

let totalLiquido = 0;
let totalBruto = 0;

const produtosHTML = (cliente.produtosRecentes || [])
    .map(produto => {

        const quantidade = Number(produto.quantidade) || 0;
        const valor = Number(produto.valor) || 0;
        const subtotal = Number(produto.subtotal) || 0;

        const totalLiquidoProduto = quantidade * subtotal;

const totalBrutoProduto = quantidade * valor;


totalLiquido += totalLiquidoProduto;

totalBruto += totalBrutoProduto;

        return `
            <tr>
                <td>${produto.nome}</td>
                <td>${quantidade}</td>
                <td>R$ ${valor.toFixed(2)}</td>
                <td>R$ ${subtotal.toFixed(2)}</td>
                <td>R$ ${totalLiquidoProduto.toFixed(2)}</td>
            </tr>
        `;
    })
    .join("");

document.getElementById("ficha").innerHTML = `

<h1>FICHA DO CLIENTE</h1>

<hr>

<h2>${cliente.apelido || cliente.nome}</h2>

<p><strong>Nome completo:</strong> ${cliente.nome}</p>

<p><strong>Conhecido como:</strong> ${cliente.apelido || "-"}</p>

<p><strong>Telefone:</strong> ${cliente.telefone || "-"}</p>

<p><strong>Cidade:</strong> ${cliente.cidade || "-"}</p>

<p><strong>Bairro:</strong> ${cliente.bairro || "-"}</p>

<p><strong>Número:</strong> ${cliente.numero || "-"}</p>

<p><strong>RG:</strong> ${cliente.rg || "-"}</p>
<p><strong>CPF:</strong> ${cliente.cpf || "-"}</p>

<p><strong>Nome da mãe:</strong> ${cliente.nomeMae || "-"}</p>

<p><strong>Data de nascimento:</strong> ${cliente.dataNascimento || "-"}</p>
<p><strong>Data de vencimento:</strong> ${cliente.dataVencimento || "-"}</p>

<h3>Endereço</h3>

<p><strong>Rua:</strong> ${cliente.endereco?.rua || "-"}</p>

<p><strong>Frente:</strong> ${cliente.endereco?.frente || "-"}</p>

<p><strong>Direita:</strong> ${cliente.endereco?.direita || "-"}</p>

<p><strong>Esquerda:</strong> ${cliente.endereco?.esquerda || "-"}</p>

<p><strong>Cor da casa:</strong> ${cliente.endereco?.cor || "-"}</p>

<h3>Observações</h3>

<p>${cliente.observacoes || "Nenhuma observação."}</p>

<h3>Produtos</h3>

<table>

<thead>

<tr>

<th>Produto</th>

<th>Quantidade</th>

<th>Valor</th>

<th>Subtotal</th>

<th>Total</th>

</tr>

</thead>

<tbody>

${produtosHTML}

</tbody>

</table>


<h2 style="margin-top:25px">

💰 TOTAL A PAGAR: R$ ${totalLiquido.toFixed(2)}

<br><br>

📈 TOTAL BRUTO: R$ ${totalBruto.toFixed(2)}

</h2>

`;

function gerarPDF() {

    const ficha = document.getElementById("ficha");

    const nomeArquivo = `Ficha_${cliente.apelido || cliente.nome}.pdf`;

    const opcoes = {

        margin: 8,

        filename: nomeArquivo,

        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {
            scale: 2,
            useCORS: true
        },

        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait"
        }

    };

    html2pdf()
        .set(opcoes)
        .from(ficha)
        .save();

}