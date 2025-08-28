import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export default function AdminLayout({ children }) {

    return (
        <div className="h-screen flex">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto bg-gray-50 p-6">{children}</main>
            </div>
        </div>
    );
}
