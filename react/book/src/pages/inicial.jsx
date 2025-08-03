import { Link } from "react-router-dom";

export function Inicial(){
    return(
        <>
            <section className="flex justify-center gap-x-10 mt-10">
                <div className="w-92">
                    <img src="/img/book.jpg" alt="Capa do livro Alice no Pais das Maravilhas" className="w-full"/>
                </div>
                <div className="w-auto font-['Alice'] space-y-5">
                    <div>
                        <h1 className="font-['Playfair+Display'] text-3xl text-[#2A4D69]">Alice no Pais das Maravilhas</h1>
                        <p>
                            <q>Se você não sabe para onde quer ir, qualquer caminho serve.</q>
                            <br/>
                            <cite>Alice no Pais das Maravilhas</cite>
                        </p>
                    </div>
                    <div className="text-justify w-lg">
                        <h2 className="text-2xl text-[#2A4D69]">Sinopse:</h2>
                        <p>O livro conta a história de uma menina chamada Alice que ao perseguir um coelho branco antropomórfico, acaba sendo transportada para um lugar fantástico, povoado de criaturas peculiares, como o Chapeleiro Louco, a Rainha de Copas, a Lagarta e o Gato de Cheshire.</p>
                    </div>
                    <div className="text-justify">
                        <h2 className="text-2xl text-[#2A4D69]">Autor:</h2>
                        <Link to={"/books"} className="text-[#1E90FF]"><u>Lewis Carroll</u></Link> {/* colocar um link para a pagina de biografia */ }
                    </div>
                    <div className="text-justify w-lg">
                        <h2 className="text-2xl text-[#2A4D69]">Publico-Alvo</h2>
                        <p>
                            O público-alvo de "Alice no País das Maravilhas" é bastante amplo, mas a obra é frequentemente associada ao público infanto-juvenil, especialmente crianças e adolescentes. No entanto, o livro também fascina adultos, com várias edições e traduções destinadas a diferentes faixas etárias e níveis de profundidade de leitura. 
                        </p>
                    </div>
                    
                </div>
            </section>

            <section className="flex flex-col items-center font-['Playfair+Display'] text-justify mt-10">
                <div className="w-[50%]">
                    <h2 className="text-[#D7263D] text-3xl">Por que comprar?</h2>
                    <p className="font-['Lora']">Na História da Literatura, País das Maravilhas marca uma nova abordagem na maneira de se escrever para crianças e adolescentes. Ou, se você está no time que não acha que este livro é para crianças, uma nova abordagem na maneira de apresentar um Universo infantojuvenil para indivíduos que já passaram dessa fase e que podem entender e interpretar das mais variadas formas as provações pelas quais a protagonista passa. Não é raro, daí, surgirem interpretações muito ricas para cada personagem (Chapeleiro Louco, Lebre de Março, Rainha e Rei de Copas, Coelho Branco, Gato de Cheshire, Lagarta e Tartaruga Falsa são os mais lembrados), indo da psicologia e das questões comportamentais até indicações metalinguísticas, considerando mensagens ocultas do autor ou alguns de seus enigmas e passagens lógicas através desses indivíduos — uma marca do estilo de escrita de Carroll que, não podemos nos esquecer, era matemático.</p>
                </div>

                <a href="https://www.amazon.com.br/Alice-no-Pa%C3%ADs-das-Maravilhas-ebook/dp/B0CVBK4XXW?ref_=ast_author_mpb">
                    <button className="hover-class bg-[#FFB6B9] p-3 rounded-2xl mt-3">
                        Clique aqui para comprar o livro!
                    </button>
                </a>
            </section>

            <aside className="flex justify-center font-['Alice'] mt-10">
                <div>
                    <h2 className="text-[#D7263D] text-3xl text-center">Você pode se interessar também:</h2>
                    <nav className="space-x-10 text-2xl p-3 text-[#1E90FF] text-center">
                        <Link to={"/lucas"}>
                            <u>Lucas Bareli</u>
                        </Link>
                        <Link to={"/books"} className="hover-class">
                            <u>Lewis Carroll</u>
                        </Link>
                    </nav>
                   
                </div>
            </aside>
        </>
    )
}