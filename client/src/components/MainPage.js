import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const MainPage = () => {
    const { logout, userId } = useContext(AuthContext);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await axios.get('/api/auth', {
                    headers: { 'Content-Type': 'application/json' },
                    params: { userId }
                });
                console.log(userId);
                console.log(response.data)
                const { username, email } = response.data;
                setUsername(username);
                setEmail(email);
            } catch (error) {
                console.log(error);
            }
        };

        getUserInfo();
    }, [userId]);

    return (
        <div className="app">
            <h1>Info</h1>
            <p>Your username is: {username}</p>
            <p>Your email is: {email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default MainPage;