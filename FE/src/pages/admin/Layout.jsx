"use client";

import { useState } from "react";
import DashboardAdmin from "./DashboardAdmin";
import { Sidebar } from "../../components/layout/sidebar";
import { Header } from "../../components/layout/header";

// import { useAuth } from "@/contexts/auth-context";
// import { Sidebar } from "@/components/layout/sidebar";
// import { Header } from "@/components/layout/header";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import Header from "../../components/layout/header";
// import Sidebar from "../../components/layout/sidebar";

export default function DashboardLayout({ children }) {
  //   const { user, isLoading } = useAuth();
  //   const router = useRouter();

  const [user] = useState({
    ho_ten: "Nguyễn Văn A",
    cap: 3,
    email: "nguyenvana@example.com",
    avatar: null, // hoặc URL ảnh avatar
  });

  //   useEffect(() => {
  //     if (!isLoading && !user) {
  //       router.push('/auth/login')
  //     }
  //   }, [user, isLoading, router])

  //   if (isLoading) {
  //     return (
  //       <div className="min-h-screen flex items-center justify-center">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
  //       </div>
  //     );
  //   }

  if (!user) {
    return null;
  }

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
