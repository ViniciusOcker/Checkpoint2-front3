import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../hooks/globalContext";

const Logout = () => {
    const navigate = useNavigate();
    const { changeGlobal } = useGlobal();
    useEffect(()=>{
        changeGlobal({
            state: 'auth',
            auth: ''
        });
        navigate("/home");
    })
    return(<></>)
}

export default Logout;