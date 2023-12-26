import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Context } from '..';
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import axios from 'axios';
const Chat = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [message, setMessage] = useState('')
    const [touid, setTouid] = useState('')
    const [time, setTime] = useState('')
    const [messages, loading] = useCollectionData(
        firestore.collection("messages").orderBy('createdAt')
    )
        const GetTime = async () => {
          try {
            const response = await axios.get('http://worldtimeapi.org/api/timezone/Europe/London');
            setTime(response.data.datetime)
          } catch (error) {
            console.log(error);
          }
        };
    
        
    async function send() {
        try {
            GetTime()
            firestore.collection('messages').add({
                uid: user?.uid,
                displayName: user?.displayName,
                photoUrl: user?.photoURL,
                text: message,
                touid:touid,
                createdAt:time
            })
            console.log(messages);
            setMessage("")
        } catch (error) {
            console.log(error);
            
        }

    }
    const handleSubmit = (event:any) => {
        event.preventDefault();
      }
    return (
        <div className='flex h-[75vh]'>
            <div className="w-[20%] h-full border-gray-100 border-2 "></div>
            <div className="w-[80%] h-90vh border-gray-100 border-2">
                <div className="h-[90%] justify-end justify-self-end p-10 overflow-y-scroll	">
                    {messages?.map((message)=>
                    <div className='ml-auto p-5 my-2 border w-1/2'>
                        {message.text}
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