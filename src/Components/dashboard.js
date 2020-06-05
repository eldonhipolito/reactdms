import React, {useState} from 'react';

import {useCookies} from 'react-cookie';
import {URI} from './config/server.js';
import SubMenu from './SubMenu.js';

import axios from 'axios';


export default function Dashboard() {
    const [cookies] = useCookies();
    const [data, setData] = useState({
        loading : true,
        documents : null
    });


    axios.get(URI + `/documents/${cookies.UserCookie}`, {headers: {Authorization : cookies.Authorization}})
    .then(res => console.log(res));


    return <div>  
        <SubMenu />
</div>
    


   


};