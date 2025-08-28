
import Header from "../user/Header";

function EmployeeLayout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}

export default EmployeeLayout;
