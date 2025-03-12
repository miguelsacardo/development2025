// variáveis
// variáveis: espaço na memória para reter um valor
let variavelGlobal = 15


// função qu tem variáveis locais
function novasVariaveis(){
    let variavelLocal = 100
    variavelGlobal = variavelGlobal + 100

    return {variavelLocal, variavelGlobal} // envio dos dois valirs
}

let resultado = novasVariaveis()
document.write(resultado.variavelGlobal)
document.write(resultado.variavelLocal)

// Array: conjunto de dados aglomerados que são armazenados numa mesma variável
// a analogia mais proxima é a de lista em python
// o array é declarado usando o "[]"
let numeros = [10, 15, 20, 25, 30, 35, 40, 45, 50]

// exibir a posição do idice
for(let indice in numeros){ // quando uso o "in", ele é usado para percorrer os indices do array
    alert(indice)
}

// exibir valores
for(let valor of numeros){ // quando uso o "of", ele é usado para percorrer os valores do array
    alert(valor)
}

// forEach: é a primeira função que usamos para manipular um conjunto (array)
// dentro dele posso tanto usar uma função quanto usar uma arrowFunction, então após "=>" descrevo qual o script que quero que seja executado
numeros.forEach(item => document.write(`${item} <br/>`))


// inserindo um elemento ao final da lista
numeros.push(60)
document.write(`${numeros} <br/>`)

// inserindo valor no inicio da lista
numeros.unshift(2);
document.write(`${numeros} <br/>`)

// excluir o ultimo elemento da lista 
numeros.pop();
document.write(`${numeros} <br/>`)

// excluir o primeiro elemento da lista 
numeros.shift();
document.write(`${numeros} <br/>`)

// MAP -> função com callback (devolve outro array) com mais uma execução de script
// na funão pego cada um dos elementos e multiplico por 2
let numerosdobrados = numeros.map(n => n * 2)

// filter: é uma função de manipulação de array que percorre a lista e encontra uma condição
// localiza coisas
let numerosdiv3 = numeros.filter(function(numero){
    return numero % 3 === 0
})

document.write(numerosdiv3)

// find: verifica se existe um elemento desejado e para no primeiro elemento que encontrar
// util por exemplo para CPF
let primeiroPar = numeros.find(function(numero){
    return numero % 2 === 0
})

document.write(`${primeiroPar} <br/>`)
