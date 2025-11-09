import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Paginas 
import Home from '../pages/Home';
import OurPhilosophy from '../pages/philosophy';
import Menu from '../pages/Menu';
import HistoryDish from '../pages/HistoryDish';
import Stories from '../pages/Stories';
import StoryDetailPage from '../pages/StoryDetailPage';
import Contact from '../pages/Contact';
import FormsReservations from '../pages/Reservations';
import ReservationConfirmed from '../components/forms/ReservationConfirmed';

//Layouts
import ClienteLayout from '../layouts/ClienteLayout';

const AppRoutes = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<ClienteLayout/>}>
            {/*Rutas hijas*/}
            <Route index element= {<Home/>}/>
            <Route path="filosofia" element={<OurPhilosophy/>}/>
            <Route path="menu" element={<Menu/>}/>
            <Route path="historia_platillo/:id" element= {<HistoryDish/>}/>
            <Route path="relatos" element= {<Stories/>}/>
            <Route path="relatos/:slug" element={<StoryDetailPage />} />
            <Route path="contacto" element= {<Contact/>}/>
            <Route path="reservas" element= {<FormsReservations/>}/>
            <Route path="reserva-confirmada" element={<ReservationConfirmed />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
}
export default AppRoutes;