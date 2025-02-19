function calcularTotal(){

    //o parseFloat obriga transformar em float, assim como o parseInt serve para inteiros
    let precoPrato = parseFloat(document.getElementById("pratos").value);
    let quantidade = parseInt(document.getElementById("quantidade").value)

    // o === não compara somente o valor, mas também o tipo dele (int com int, str com str, etc)
    if(precoPrato === 0){
        document.getElementById("resultado").textContent = "Por favor informe um prato"
    }else{
        let total = precoPrato * quantidade;
        document.getElementById("resultado").textContent = "Total a pagar é R$ " + total.toFixed(2) //converte total para 2 cadas decimais
    }
}