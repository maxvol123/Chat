import {useContext} from "react"
import { Context } from '..';
import {useAuthState} from 'react-firebase-hooks/auth'
const Navbar = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    console.log(user?.displayName);
    
    return (
        <div className="w-full bg-cyan-500 h-[100px] flex py-8 justify-between px-8">
            <h1 className="mt-1">CHAT</h1>
            {user?
            <div className="flex">
                <p className="mr-3 mt-1.5">Welcome {user.displayName}</p>
                <button onClick={()=>{auth.signOut()}} className="login_btn px-10">Log out</button>
                </div>
                :
                <button className="login_btn px-10" >Log in</button>
            }
            
        </div>
    );
};

export default Navbar;