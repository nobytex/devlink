import {useState, FormEvent, useEffect} from 'react'
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import {FiTrash} from 'react-icons/fi'
import { db } from '../../services/firebaseConnection';
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin(){
    const [nameInput, setNameInput] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [textColorInput, setTextColorInput] = useState('#f1f1f1');
    const [backgroundColorInput, setBackgroundColorInput] = useState('#121212');

    const [links, setLinks] = useState<LinkProps[]>([]);

    useEffect(() => {
        const linksRef = collection(db, 'links');
        const queryRef = query(linksRef, orderBy('created', 'asc'))

        const unsub = onSnapshot(queryRef, (snapshot) => {
            const lista = [] as LinkProps[];

            snapshot.forEach((item) => {
                lista.push({
                    id: item.id,
                    name: item.data().name,
                    url: item.data().url,
                    bg: item.data().bg,
                    color: item.data().color,
                })
            })
            
            console.log(lista)
            setLinks(lista)

        })

        return () => {
            unsub();
        };
        
    }, [])

    async function handleRegister(event: FormEvent){
        event.preventDefault();

        if (nameInput === '' || urlInput === ''){
            alert('teste');
            return;
        }

        addDoc(collection(db, 'links'), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date(),
        })
        .then(() => {
            console.log('cadastrado com sucesso')
            setNameInput('');
            setUrlInput('');
        })
        .catch((error) => {
            console.log('erro ao cadastrar', error)
        })


    }

    async function handleDeleteLink(id: string){
        const docRef = doc(db, 'links', id)
        await deleteDoc(docRef)
        // console.log(id)
    }
    
    return(
        <div className="flex flex-col items-center min-h-screen pb-7 px-2">
            <Header/>
            
            <form onSubmit={handleRegister} className="flex flex-col mt-8 mb-3 w-full max-w-xl">
                <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
                <Input
                    placeholder="Digite o nome do link.."
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Url do Link</label>
                <Input
                    type='url'
                    placeholder="Digite a url.."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className='flex my-2 gap-5'>
                    <div className='flex gap-2 justify-center items-center'>
                        <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>   
                        <input 
                            className='bg-transparent'
                            type="color"
                            value={textColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)}
                        />
                    </div>
                    
                    <div className='flex gap-2 justify-center items-center'>
                        <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>   
                        <input 
                            className='bg-transparent'
                            type="color"
                            value={backgroundColorInput}
                            onChange={(e) => setBackgroundColorInput(e.target.value)}
                        />
                    </div>

                </section>

                {nameInput !== '' && (
                    <div className='flex  items-center justify-center flex-col mb-7 p-1 border-gray-100/20 border rounded-md '>
                    <label className="text-white font-medium mt-2 mb-2">Veja como está ficando:</label>   
                    
                    <article
                        className='w-11/12 max-w-lg flex flex-col items-center bg-zinc-600 rounded px-1 py-3'
                        style={{marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput}}
                    >
                        <p style={{color: textColorInput}} className='font-medium'>{nameInput}</p>
                    </article>
                </div>
                )}

                <button 
                type='submit'
                className='mb-7 bg-blue-500 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center'
                >
                    Cadastrar
                </button>

            </form>

            <h2 className='font-bold text-white mb-4 text-2xl'>Meus links:</h2>

            {links.map((item) => (
                <article key={item.id}
                    className='flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none'
                    style={{backgroundColor: item.bg, color: item.color}}
                >
                    <p style={{color: textColorInput}} className='font-medium'>{item.name}</p>
                    <div>
                        <button onClick={() => handleDeleteLink(item.id)} className='border border-dashed p-1 rounded'>
                            <FiTrash size={18} color='#FFF'/>
                        </button>
                    </div>
                </article>
            ))}
            
        </div>
    )
}