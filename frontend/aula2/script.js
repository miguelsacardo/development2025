// Funções: bloco de código que pode ser reutilizavel, sendo chamada quantas vezes forem necessárias.
function saudarAlunos(){
    //tudo o que vai ser feito deve estar entre as "{}"
    alert("Olá! Vocês serão extraordinarios no hackathon!")
}
// passagem de parâmetros
function somar(a = 0, b = 0, c = 0, d = 0){ // variáveis com valores padrão
    return a + b + c + d;
}

// função anônima: quando temos poucas ou nenhu,a chance de te-la de chamar mais de uma vez
const subtrair = function(n1, n2){
    return n1 - n2
}

// arrow functuin: fazer um codigo mais compacto para trazer o mesmo resultado
// ele obrigatoriamente tem um unico retorno e basicamente uma linha de codigo
function dividir(v1, v2){
    return v1/v2
}


// arrow é a simbologia de " => ". Após o simbolo informo qual script deve ser executado
const dividirArrow = (a1, a2) => a1/a2

// para chama a função necessito manter a estrutura dela
saudarAlunos()


// chamando a função Soma
resultado = somar(10, 30)
document.write(`O resultado da soma é ${resultado}`)

alert(subtrair(100, 20))

