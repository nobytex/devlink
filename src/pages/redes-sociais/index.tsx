import { useState, FormEvent, useEffect } from 'react'
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { db } from '../../services/firebaseConnection';
import { setDoc, getDoc, doc } from 'firebase/firestore';

export function RedesSociais(){
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [youtube, setYoutube] = useState('');

    useEffect(() => {
        function loadLinks(){
            const docRef = doc(db, 'social', 'link')
            getDoc(docRef)
            .then((snapshot) => {
                if (snapshot.data() !== undefined){
                    setFacebook(snapshot.data()?.facebook)
                    setInstagram(snapshot.data()?.instagram)
                    setYoutube(snapshot.data()?.youtube)
                }

            })
        }

        loadLinks();

    }, [])

    function handleRegisterLink(event: FormEvent){
        event.preventDefault();

        setDoc(doc(db, 'social', 'link'), {
            facebook: facebook,
            instagram: instagram,
            youtube: youtube,
        })
        .then(() => {
            console.log('cadastrou com sucesso')
        })
        .catch((error) => {
            console.log('erro ao cadastrar', error)
        })
        
    }
    
    return(
        <div className="flex flex-col items-center min-h-screen pb-7 px-2">
            <Header/>

            <h1 className="text-white font-medium text-2xl mt-8 mb-4">Minhas redes sociais</h1>

            <form className="flex flex-col max-w-xl w-full px-3" onSubmit={handleRegisterLink}>
                <label className="text-white font-medium my-2">Link do facebook</label>
                <Input
                    type="url"
                    placeholder="Digite a url do facebook.."
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />

                <label className="text-white font-medium my-2">Link do instagram</label>
                <Input
                    type="url"
                    placeholder="Digite a url do instagram.."
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <label className="text-white font-medium my-2">Link do youtube</label>
                <Input
                    type="url"
                    placeholder="Digite a url do youtube.."
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                />

                <button type='submit' 
                className='text-white bg-blue-500 h-9 rounded-md flex items-center justify-center'
                >
                    Salvar Links
                </button>
            </form>
            
        </div>
    )
}