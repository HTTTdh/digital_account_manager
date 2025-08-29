// src/pages/root/AdminManager.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminManager = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        // lấy danh sách admin từ backend
        axios.get("/api/admins").then((res) => setAdmins(res.data));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/api/admins/${id}`).then(() => {
            setAdmins((prev) => prev.filter((a) => a.id !== id));
        });
    };

    return (
        <div>
            <h2>Quản lý Admin</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.id}>
                            <td>{admin.id}</td>
                            <td>{admin.ho_ten}</td>
                            <td>{admin.email}</td>
                            <td>
                                <button onClick={() => handleDelete(admin.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminManager;
