//  pegando itens html e mudando sua estrutura
let h1 = window.document.getElementsByTagName("h1")[0]
h1.style.color = "red";

let body = window.document.body;
body.style.background = "black"


// achando um elemento pelo ID
function mudarCor(){
    let div = document.getElementById("minhaDiv")

    if(div.style.backgroundColor == "fuchsia"){
        div.style.backgroundColor = "blue"
    }else{
        div.style.backgroundColor = "fuchsia"
    }
}

// mudar a estrutura de uma div que tem uma classe 
let box = document.querySelector(".box") // nomenclatura do elemento
box.style.backgroundColor = "green"
box.style.width = "800px"

mudarCor()