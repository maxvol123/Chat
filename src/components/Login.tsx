import { useContext, useState } from 'react';
import { Context } from '..';
import firebase from 'firebase/compat/app';

const  Login = () => {
    const {auth} = useContext(Context)
    const [name, setName] = useState("")
    
    async function login() {
        const provider = new firebase.auth.GoogleAuthProvider()
        const {user} = await auth.signInWithPopup(provider)
        console.log(user); 
        localStorage.setItem('user', user)
    }
    return (
        <div>
            <button onClick={login}>Sign Up using google</button>
        </div>
    );
};

export default Login;