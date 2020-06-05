import React from "react";
import CAppBar from "./CAppBar";



import {useCookies} from 'react-cookie';


export default function Header() {

    const [cookies, setCookies] = useCookies(["Authorization"]);
           
        return <CAppBar isAuth={cookies.isAuth}/>;

               
    
}