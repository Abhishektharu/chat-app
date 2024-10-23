
import toast from 'react-hot-toast';
import { UseAuthContext } from "../context/AuthContext"; 
import {useState} from 'react'

const useLogout = () => {
    const [loading, setLoading] = useState(false);
	const { setAuthUser } = UseAuthContext(); 

    const logout = async () => {
        setLoading(true);
        try {
			const res = await fetch("/api/auth/logout", {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			const data = await res.json();
			// console.log(data);
			
			if (data.error) {
				throw new Error(data.error);
			}

			//localstorage remove item that will logout
			localStorage.removeItem("chat-user");
			//context
			setAuthUser(null);
            toast.success("Successfully Logged Out.");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
    };
	return { loading, logout };


}

export default useLogout