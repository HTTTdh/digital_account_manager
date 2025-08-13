import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-white">
            Chính sách bảo mật
          </a>
          <a href="#" className="hover:text-white">
            Điều khoản sử dụng
          </a>
          <a href="#" className="hover:text-white">
            Liên hệ
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
