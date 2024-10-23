import {useState} from 'react'
import { UseAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
	const { setAuthUser } = UseAuthContext(); 

    const login = async (username, password) => {
        console.log(username);
        
        // const success = handleInputErrors(username, password);

        // if (!success) return;
        setLoading(true);
        try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, password})
			});

			const data = await res.json();
			console.log(data);
			
			if (data.error) {
				throw new Error(data.error);
			}

			//localstorage remove item that will logout
			localStorage.setItem("chat-user", JSON.stringify(data));
			//context
			setAuthUser(data);
            toast.success("Successfully Logged In.");
		} catch (error) {
			toast.error(error.message);
            console.log(error);
            
		} finally {
			setLoading(false);
		}
    };
	return { loading, login };
}

export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}


}
