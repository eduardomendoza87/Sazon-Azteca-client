import React from "react";

import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import Footer from "../components/footer";

const AdminLayout = () => {
    return(
        <div className="flex h-screen">
            <AdminSidebar />
            <main className="flex-grow p-8 overflow-auto bg-fondo">
                <Outlet />
            </main>
        </div>
    )
}
export default AdminLayout;