import { useEffect } from "react";
import Header from "../manager/Header";

function ManagerLayout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}

export default ManagerLayout;
