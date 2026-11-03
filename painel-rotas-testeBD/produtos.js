let clientes =
JSON.parse(localStorage.getItem("clientes") || "{}");



let nomeCliente =
new URLSearchParams(location.search)
.get("nome");



let cliente = clientes[nomeCliente];



if(!cliente){

document.body.innerHTML =
"<h1>Cliente não encontrado</h1>";

throw new Error("Cliente não encontrado");

}






function carregarProdutos(){


document.getElementById("nomeClienteProdutos").innerHTML =

"Produtos - " + (cliente.apelido || cliente.nome);



let lista =
document.getElementById("listaProdutos");


lista.innerHTML="";



let totalLiquido = 0;
let totalBruto = 0;



(cliente.produtosRecentes || []).forEach((produto,index)=>{


let totalLiquidoProduto =
produto.quantidade * produto.subtotal;


let totalBrutoProduto =
produto.quantidade * produto.valor;


totalLiquido += totalLiquidoProduto;

totalBruto += totalBrutoProduto;




lista.innerHTML += `

<tr>


<td>
${produto.nome}
</td>


<td>
${produto.quantidade}
</td>


<td>
R$ ${produto.valor.toFixed(2)}
</td>


<td>
R$ ${produto.subtotal.toFixed(2)}
</td>


<td>
R$ ${totalLiquidoProduto.toFixed(2)}
</td>



<td>

<button onclick="removerProduto(${index})">

Excluir

</button>

</td>


</tr>


`;



});




document.getElementById("totalProdutos").innerHTML =

"💰 Líquido: R$ " + totalLiquido.toFixed(2) +
"<br><br>" +

"📈 Bruto: R$ " + totalBruto.toFixed(2);



}









function adicionarProduto(){



let nome =
document.getElementById("produto").value;



let quantidade =
Number(document.getElementById("quantidade").value);



let valor =
Number(document.getElementById("valor").value);



let subtotal =
Number(document.getElementById("subtotal").value);





if(
!nome ||
!quantidade ||
!valor ||
!subtotal
){


alert("Preencha todos os campos!");

return;


}





if(!cliente.produtosRecentes){

cliente.produtosRecentes=[];

}





cliente.produtosRecentes.push({


nome:nome,


quantidade:quantidade,


valor:valor,


subtotal:subtotal


});





salvar();




document.getElementById("produto").value="";
document.getElementById("quantidade").value="";
document.getElementById("valor").value="";
document.getElementById("subtotal").value="";



}









function removerProduto(index){


cliente.produtosRecentes.splice(index,1);


salvar();


}









function salvar(){


clientes[nomeCliente] = cliente;



localStorage.setItem(

"clientes",

JSON.stringify(clientes)

);



carregarProdutos();


}





carregarProdutos();


