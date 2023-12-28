import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Context } from '..';
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import axios from 'axios';
import { collection, getDocs, where } from 'firebase/firestore';

import { query, serverTimestamp } from 'firebase/firestore';
const Chat = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const userId = user?.uid
    const [message, setMessage] = useState('')
    const [touid, setTouid] = useState('')
    const [time, setTime] = useState('')
    const [messages, loading] = useCollectionData(
        firestore.collection("messages").orderBy('createdAt')
    )    
    const users = Array.from(new Set(messages?.map(message => message.uid)));
    const filteredArray = messages?.filter(
        (message) => (message.touid === user?.uid && message.uid==touid) || (message.uid === user?.uid&&message.touid === touid) 
      );  
      console.log(filteredArray);
      
    async function send() {
        console.log(touid);
        
        try {            
            await firestore.collection('messages').add({
                uid: user?.uid,
                displayName: user?.displayName,
                photoUrl: user?.photoURL,
                text: message,
                touid:touid,
                createdAt:serverTimestamp()
            })
            setMessage("")
            let element = document.querySelector('#element');
            element!.scrollTop = element!.scrollHeight;
            console.log(messages);
            
        } catch (error) {
            console.log(error);
            
        }

    }
    const handleSubmit = (event:any) => {
        event.preventDefault();
      }
    return (
        <div className='flex h-[75vh]'>
            <div className="w-[20%] h-full border-gray-100 border-2 ">
                {users.map((user)=>{
                    
                    if (user==userId) {
                        return
                    }
                        const foundMessage = messages?.find((message) => message.uid === user);                        
                return (
                <div className="flex h-14 border-gray-100 border-2 cursor-pointer mb-2 p-2" onClick={()=>setTouid(user)}>
                    <img src={foundMessage?.photoUrl} alt="" className='h-10 w-10 mr-auto' />
                    <div className="mt-auto mb-auto">{foundMessage?.displayName}</div>    
                </div>
                )}
                )}
            </div>
            <div className="w-[80%] h-90vh border-gray-100 border-2">
                <div className="h-[90%] justify-end justify-self-end p-10 overflow-y-scroll	" id='element'>
                    {filteredArray?.map((message)=>
                    <div className={`${message.uid==user?.uid?"ml-auto":"mr-auto"} p-5 my-2 border flex flex-col max-w-[50%]` }>
                        <div className="flex mb-2">
                        <img src={message.photoUrl} alt="" className='h-10 w-10 mr-auto' />
                        <div className="text-xs">{message.displayName}</div>
                        </div>
                        <div className="text-xl">{message.text}</div>
                    </div>
                    )}
                </div>
                <form className="h-[10%] pb-2 flex" onSubmit={handleSubmit}>
                    <input type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}} className=' mx-3 px-2 text-xl h-[100%] w-[90%] border-2 border-gray-100 rounded-xl'/>
                    <input type='submit' value={"send"} className='w-[10%]' onClick={()=>{send()}}/>
                </form>
            </div>
        </div>
    );
};

export default Chat;