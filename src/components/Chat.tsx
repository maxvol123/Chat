import React from 'react';
import { useContext, useState } from 'react';
import { Context } from '..';
import {useAuthState} from 'react-firebase-hooks/auth'
const Chat = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    return (
        <div className='flex h-[75vh]'>
            <div className="w-[20%] h-full border-gray-100 border-2"></div>
            <div className="w-[80%] h-90vh border-gray-100 border-2">
                <div className="h-[90%]"></div>
                <div className="h-[10%] pb-2 flex">
                    <input type="text" className=' mx-3 px-2 text-xl h-[100%] w-[90%] border-2 border-gray-100 rounded-xl'/>
                    <button className='w-[10%]'>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;