import React from "react";
import RootSidebar from "./RootSidebar";
import { Header } from "../admin/Header";

const RootLayout = ({ children }) => {
    return (
        <div className="h-screen flex">
            <RootSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto bg-gray-50 p-6">{children}</main>
            </div>
        </div>
    );
};


export default RootLayout;