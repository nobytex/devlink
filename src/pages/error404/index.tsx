import { Link } from "react-router-dom";

export function Error404(){
    return(
        <div className="flex w-full min-h-screen justify-center items-center flex-col text-white">
            <h1 className="font-bold text-6xl mb-4">404</h1>
            <h1 className="font-bold text-4xl mb-4">Página não encontrada</h1>
            <p className="italic mb-4">Você caiu em uma página que não existe!</p>
            <Link to='/' className="bg-gray-50/20 py-1 px-4 rounded-md">Voltar para home</Link>
        </div>
    )
}