import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';

//Layouts
import ClienteLayout from '../layouts/ClienteLayout';

const AppRoutes = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<ClienteLayout/>}>
            {/*Rutas hijas*/}
            <Route index element= {<Home/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    );
}
export default AppRoutes;