import React from 'react';
import { useContext, useState } from 'react';
import { Context } from '..';
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
const Chat = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [message, setMessage] = useState('')
    const [messages, loading] = useCollectionData(
        firestore.collection("messages").orderBy('createdAt')
    )
    async function send() {
        firestore.collection('messages').add({
            uid: user?.uid,
            displayName: user?.displayName,
            photoUrl: user?.photoURL,
            text: message,
            createdAt: 0
        })
        setMessage("")
    }
    console.log(messages);
    
    return (
        <div className='flex h-[75vh]'>
            <div className="w-[20%] h-full border-gray-100 border-2"></div>
            <div className="w-[80%] h-90vh border-gray-100 border-2">
                <div className="h-[90%]"></div>
                <form className="h-[10%] pb-2 flex">
                    <input type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}} className=' mx-3 px-2 text-xl h-[100%] w-[90%] border-2 border-gray-100 rounded-xl'/>
                    <input type='submit' value={"send"} className='w-[10%]' onClick={()=>{send()}}/>
                </form>
            </div>
        </div>
    );
};

export default Chat;