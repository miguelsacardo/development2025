import axios from "axios"
import { useEffect, useState } from "react"

export default function Home(){

    const [dados, setDados] = useState([])
    const token = localStorage.getItem('token')



    useEffect(()=>{
        if(!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/professores",{
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                setDados(response.data)
            } catch (error) {
                console.errpr("Erro ao buscar dados: ", error)
            }
        }

        fetchData()
    }, []);

   
    return(
        <div>
            <ul>
                {dados.map((professor, index) => (
                    <li key={index}>{professor.nome}</li>
                ))}
            </ul>
        </div>
    )

    

}