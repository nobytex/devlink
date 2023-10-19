import { ReactNode, useState, useEffect } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface PrivateProps{
    children: ReactNode
}

export function Private({children}:PrivateProps){
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, (user) => {
            if (user){
                
                // tem usuario logado
                console.log('usuario logado')
                console.log(user)

                const userData = {
                    uid: user?.uid,
                    email: user?.email,
                }

                localStorage.setItem('@devlinks', JSON.stringify(userData));
                setLoading(false);
                setSigned(true);
                
            }else {

                // não tem usuario logado
                console.log('não tem usuario logado')
                setLoading(false);
                setSigned(false);
            }
        })

        return () => {
            unsub();
        }
        
    }, [])

    if (loading){
        return <div>teste</div>
    }

    if (!signed){
        return <Navigate to='/login'/>
    }
    
    return children;
}