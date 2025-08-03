import { useEffect, useState } from "react";
import axios from "axios";

export function ListBooks(){
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("https://openlibrary.org/authors/OL22098A/works.json?limit=100")
        .then(response => {
            console.log(response.data.entries)
            setBooks(response.data.entries)
            
        }).catch(error => window.alert("Ocorreu um erro ao buscar os livros do autor."))
    },[])

    return(
        
        <section className="mt-10">
            <div className="flex flex-col items-center">
                <div className="w-90">
                    <img src="/img/lewis.jpg" alt="Foto do autor Lewis Carroll" className="w-full"/>
                </div>
                <div className="font-['Alice'] w-[50%] text-justify">
                    <h1 className="text-[#D7263D] text-3xl">Biografia</h1>
                    <p className="">Charles Lutwidge Dodgson, mais conhecido pelo seu pseudônimo Lewis Carroll (Daresbury, 27 de janeiro de 1832 – Guildford, 14 de janeiro de 1898), foi um romancista, contista, fabulista, poeta, desenhista, fotógrafo, matemático e reverendo anglicano britânico. Lecionou matemática no Christ College, em Oxford. É autor do clássico livro Alice no País das Maravilhas, além de outros poemas escritos em estilo nonsense ao longo de sua carreira literária, que são considerados políticos, em função das fusões e da disposição espacial das palavras, como precursores da poesia de vanguarda. </p>
                </div>
            </div>

            <div className="font-['Alice'] mt-10">
                <h2 className="text-[#D7263D] text-3xl text-center">Livros escritos pelo autor: </h2>
                <div className="flex  justify-center flex-wrap gap-x-5 gap-y-5 mt-3">
                    {books.map(book => (
                        <div className="rounded-md bg-[#FFB6B9] p-3 w-auto text-center">
                            {book.title}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}