import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Paginas cliente
import Home from '../pages/Home';
import OurPhilosophy from '../pages/philosophy';
import Menu from '../pages/Menu';
import HistoryDish from '../pages/HistoryDish';
import Stories from '../pages/Stories';
import StoryDetailPage from '../pages/StoryDetailPage';
import Contact from '../pages/Contact';
import FormsReservations from '../pages/Reservations';
import ReservationConfirmed from '../components/forms/ReservationConfirmed';

//Paginas admin
import HomeAdmin from '../pages/admin/HomeAdmin';
import AdminLogin from '../pages/admin/AdminLogin';
import PlatillosAdmin from '../pages/admin/PlatillosAdmin';
import FormsCrearPlatillo from '../components/admin/forms/FormsCrearPlatillo';
import FormsEditarPlatillo from '../components/admin/forms/FormsEditarPlatillo';
import CategoriasAdmin from '../pages/admin/CategoriasAdmin';
import FormsCrearCategoria from '../components/admin/forms/FormsCrearCategoria';
import FormsEditarCategoria from '../components/admin/forms/FormsEditarCategoria';
import ArticulosAdmin from '../pages/admin/RelatosAdmin';
import ReservasAdmin from '../pages/admin/ReservasAdmin';
import FormsCrearArticulo from '../components/admin/forms/FormsCrearArticulo';
import FormsEditarArticulo from '../components/admin/forms/FormsEditarArticulo';


//Layouts
import ClienteLayout from '../layouts/ClienteLayout';
import AdminLayout from "../layouts/AdminLayout";

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
            
            {/* Rutas de administración */}
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* (LA CORRECCIÓN) Estas rutas SÍ están protegidas por la sidebar */}
            <Route path="/admin" element={<AdminLayout />}>
                {/* Si vas a /admin, te lleva al dashboard */}
                <Route index element={<HomeAdmin />} /> 
                <Route path="dashboard" element={<HomeAdmin />} />
                <Route path="platillos" element={<PlatillosAdmin/>}/>
                <Route path='crear-platillo' element={<FormsCrearPlatillo/>}/>
                <Route path='categorias' element={<CategoriasAdmin/>}/>
                <Route path='crear-categoria' element={<FormsCrearCategoria/>}/>
                <Route path='articulos' element={<ArticulosAdmin/>}/>
                <Route path='platillos/editar/:id' element={<FormsEditarPlatillo/>}/>
                <Route path='categorias/editar/:id' element={<FormsEditarCategoria/>}/>
                <Route path='gestion-reservas' element={<ReservasAdmin/>}/>
                <Route path='crear-articulo' element={<FormsCrearArticulo/>}/>
                <Route path='relatos/editar/:slug' element={<FormsEditarArticulo/>}/>
                

            </Route>
        </Routes>
        </BrowserRouter>
    );
}
export default AppRoutes;