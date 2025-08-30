import React, { useState } from 'react';
import { ChevronDown, ChevronRight, User, Shield, Settings, Bell, FileText, Package, Building2, Users, Activity, HelpCircle, Search, Book, CheckCircle, X } from 'lucide-react';

const UserGuide = () => {
    const [expandedSections, setExpandedSections] = useState({ intro: true, permissions: true });
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSection, setActiveSection] = useState('intro');

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const permissions = [
        {
            action: 'Quản lý yêu cầu',
            admin: true,
            manager: false,
            employee: false,
            note: 'Admin xem tất cả yêu cầu mà manager gửi lên và phê duyệt hay từ chối yêu cầu đó'
        },
        {
            action: 'Tạo một yêu cầu cấp tài sản',
            admin: false,
            manager: true,
            employee: false,
            note: 'Manager yêu cầu cấp tài sản cho nhân viên'
        },
        {
            action: 'Cấp tài sản cho nhân viên',
            admin: true,
            manager: true,
            employee: false,
            note: 'Manager chỉ cấp cho nhân viên thuộc quyền quản lý'
        },
        {
            action: 'Xem thông tin tài sản cá nhân',
            admin: true,
            manager: true,
            employee: true,
            note: 'Xem tài sản được giao cho bản thân'
        },
        {
            action: 'Sửa thông tin tài sản của mình',
            admin: true,
            manager: false,
            employee: true,
            note: 'Cập nhật thông tin đăng nhập bao gồm username và password'
        },
        {
            action: 'Xem tài sản của nhân viên',
            admin: true,
            manager: true,
            employee: false,
            note: 'Manager xem tài sản của nhân viên thuộc quyền'
        },
        {
            action: 'Quản lý tài sản (CRUD)',
            admin: true,
            manager: false,
            employee: false,
            note: 'Thêm/sửa/xóa tài sản trong hệ thống'
        },
        {
            action: 'Quản lý danh mục tài sản',
            admin: true,
            manager: false,
            employee: false,
            note: 'Tạo và quản lý các loại tài sản'
        },
        {
            action: 'Quản lý phòng ban',
            admin: true,
            manager: false,
            employee: false,
            note: 'Tạo/sửa/xóa phòng ban'
        },
        {
            action: 'Quản lý tài khoản người dùng',
            admin: true,
            manager: false,
            employee: false,
            note: 'Xem và quản lý tài khoản trong hệ thống'
        },
        {
            action: 'Gửi thông báo hệ thống',
            admin: true,
            manager: true,
            employee: false,
            note: 'Manager gửi thông báo cho nhân viên của mình'
        },
        {
            action: 'Xem lịch sử hoạt động',
            admin: true,
            manager: false,
            employee: false,
            note: 'Xem hoạt động của bản thân và cấp dưới'
        }
    ];

    const guideData = [
        {
            id: 'intro',
            title: 'Giới thiệu Hệ thống',
            icon: <Book className="w-5 h-5" />,
            content: {
                description: 'Hệ thống Quản lý Tài sản giúp doanh nghiệp quản lý tài sản, phân công và theo dõi việc sử dụng tài sản của nhân viên một cách hiệu quả.',
                roles: [
                    {
                        level: 'Admin (Cấp 1)',
                        desc: 'Toàn quyền quản lý hệ thống, tài sản và tài khoản',
                        color: 'bg-red-100 text-red-800 border-red-200',
                        features: ['Quản lý tất cả chức năng', 'Tạo tài khoản người dùng', 'Quản lý danh mục và phòng ban']
                    },
                    {
                        level: 'Manager (Cấp 2)',
                        desc: 'Quản lý tài sản và nhân viên trong phạm vi được giao',
                        color: 'bg-blue-100 text-blue-800 border-blue-200',
                        features: ['Cấp tài sản cho nhân viên', 'Xem tài sản của cấp dưới', 'Gửi yêu cầu và thông báo']
                    },
                    {
                        level: 'Employee (Cấp 3)',
                        desc: 'Sử dụng và cập nhật thông tin tài sản được giao',
                        color: 'bg-green-100 text-green-800 border-green-200',
                        features: ['Xem tài sản của mình', 'Cập nhật thông tin tài sản']
                    }
                ]
            }
        },
        {
            id: 'permissions',
            title: 'Ma trận Phân quyền Chi tiết',
            icon: <Shield className="w-5 h-5" />,
            content: { permissions }
        },
        {
            id: 'workflow',
            title: 'Quy trình Sử dụng',
            icon: <Activity className="w-5 h-5" />,
            content: {
                admin: [
                    'Tạo và quản lý tài khoản người dùng',
                    'Thiết lập danh mục tài sản và phòng ban',
                    'Thêm tài sản vào hệ thống',
                    'Phân công Manager quản lý nhân viên',
                    'Theo dõi và giám sát toàn bộ hệ thống'
                ],
                manager: [
                    'Đăng nhập và xem dashboard cá nhân',
                    'Cấp tài sản cho nhân viên thuộc quyền quản lý',
                    'Theo dõi tình trạng tài sản của nhân viên'
                ],
                employee: [
                    'Đăng nhập và xem tài sản được giao',
                    'Cập nhật thông tin đăng nhập tài sản (password, username)',
                    'Xem thông báo từ Manager/Admin'
                ]
            }
        },
        {
            id: 'features',
            title: 'Hướng dẫn Chức năng',
            icon: <Package className="w-5 h-5" />,
            content: {
                sections: [
                    {
                        title: 'Quản lý Yêu cầu',
                        items: [
                            { feature: 'Tạo yêu cầu mới', desc: 'Vào menu "Yêu cầu" → Nhấn "Tạo mới" → Điền thông tin → Gửi' },
                            { feature: 'Theo dõi yêu cầu', desc: 'Xem danh sách yêu cầu và trạng thái xử lý' },
                            { feature: 'Cập nhật yêu cầu', desc: 'Chỉnh sửa yêu cầu chưa được xử lý' }
                        ]
                    },
                    {
                        title: 'Quản lý Tài sản',
                        items: [
                            { feature: 'Xem tài sản cá nhân', desc: 'Menu "Tài sản của tôi" → Xem danh sách và chi tiết' },
                            { feature: 'Cập nhật thông tin tài sản', desc: 'Chọn tài sản → "Sửa thông tin" → Cập nhật → Lưu' },
                            { feature: 'Cấp tài sản (Manager/Admin)', desc: 'Menu "Quản lý tài sản" → Chọn tài sản → Gán cho nhân viên' }
                        ]
                    },
                    {
                        title: 'Hệ thống Thông báo',
                        items: [
                            { feature: 'Xem thông báo', desc: 'Click vào icon chuông để xem thông báo mới' },
                            { feature: 'Gửi thông báo', desc: 'Menu "Thông báo" → "Tạo mới" → Chọn người nhận → Gửi' },
                            { feature: 'Thông báo hết hạn', desc: 'Hệ thống tự động thông báo khi tài sản sắp hết hạn' }
                        ]
                    }
                ]
            }
        },
        {
            id: 'tips',
            title: 'Mẹo và Lưu ý',
            icon: <HelpCircle className="w-5 h-5" />,
            content: {
                security: [
                    'Đăng xuất sau khi sử dụng xong để bảo mật tài khoản',
                    'Thay đổi mật khẩu định kỳ (khuyến nghị 3-6 tháng/lần)',
                    'Không chia sẻ thông tin đăng nhập với người khác',
                    'Báo ngay cho Admin nếu phát hiện hoạt động bất thường'
                ],
                tips: [
                    'Kiểm tra thông báo hàng ngày để không bỏ lỡ thông tin quan trọng',
                    'Cập nhật thông tin tài sản kịp thời khi có thay đổi',
                    'Sử dụng chức năng tìm kiếm để nhanh chóng tìm tài sản cần thiết',
                    'Liên hệ Manager/Admin khi cần hỗ trợ thay vì tự xử lý'
                ],
                troubleshooting: [
                    { issue: 'Quên mật khẩu', solution: 'Liên hệ Admin để reset mật khẩu đăng nhập' },
                    { issue: 'Không thấy tài sản của mình', solution: 'Kiểm tra với Manager hoặc Admin về việc phân công tài sản' },
                    { issue: 'Lỗi khi cập nhật thông tin', solution: 'Thử làm mới trang hoặc liên hệ IT support' },
                    { issue: 'Không nhận được thông báo', solution: 'Kiểm tra cài đặt thông báo hoặc liên hệ Admin' }
                ]
            }
        }
    ];

    const filteredData = guideData.filter(section =>
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        JSON.stringify(section.content).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const RoleBadge = ({ level, desc, color, features }) => (
        <div className={`px-4 py-4 rounded-lg ${color} border`}>
            <div className="font-semibold text-base mb-2">{level}</div>
            <div className="text-sm opacity-90 mb-3">{desc}</div>
            <div className="space-y-1">
                {features.map((feature, idx) => (
                    <div key={idx} className="text-xs opacity-80 flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {feature}
                    </div>
                ))}
            </div>
        </div>
    );

    const PermissionIcon = ({ hasPermission }) => (
        hasPermission ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
            <X className="w-5 h-5 text-gray-400" />
        )
    );

    return (
        <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Book className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Hướng dẫn Sử dụng</h1>
                            <p className="text-gray-600 mt-1">Tài liệu hướng dẫn chi tiết cho hệ thống quản lý tài sản</p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="w-full sm:w-80">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm hướng dẫn..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Sidebar Navigation */}
                <div className="w-80 flex-shrink-0">
                    <div className="bg-white rounded-lg shadow-sm border sticky top-6">
                        <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                            <h2 className="font-semibold text-gray-900">Mục lục</h2>
                        </div>
                        <nav className="p-2">
                            {filteredData.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left transition-colors ${activeSection === section.id
                                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                        : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    <div className={`p-1 rounded ${activeSection === section.id ? 'bg-blue-200' : 'bg-gray-200'
                                        }`}>
                                        {section.icon}
                                    </div>
                                    <span className="text-sm font-medium">{section.title}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="space-y-6">
                        {filteredData.map((section) => (
                            <div key={section.id} id={section.id} className="scroll-mt-6">
                                <div className="bg-white rounded-lg shadow-sm border">
                                    {/* Section Header */}
                                    <div
                                        className="flex items-center justify-between p-6 border-b cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => toggleSection(section.id)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                {section.icon}
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                                        </div>
                                        {expandedSections[section.id] ? (
                                            <ChevronDown className="w-5 h-5 text-gray-500" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-gray-500" />
                                        )}
                                    </div>

                                    {/* Section Content */}
                                    {expandedSections[section.id] && (
                                        <div className="p-6">
                                            {/* Introduction Section */}
                                            {section.id === 'intro' && (
                                                <div className="space-y-6">
                                                    <p className="text-gray-700 text-lg leading-relaxed">{section.content.description}</p>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-4 text-lg">Phân loại Người dùng:</h3>
                                                        <div className="grid gap-6 lg:grid-cols-3">
                                                            {section.content.roles.map((role, idx) => (
                                                                <RoleBadge key={idx} {...role} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Permissions Matrix */}
                                            {section.id === 'permissions' && (
                                                <div className="space-y-4">
                                                    <p className="text-gray-600 mb-6">Bảng dưới đây mô tả chi tiết quyền hạn của từng cấp độ người dùng trong hệ thống:</p>
                                                    <div className="overflow-x-auto">
                                                        <table className="w-full border-collapse border border-gray-300">
                                                            <thead>
                                                                <tr className="bg-gray-50">
                                                                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Chức năng</th>
                                                                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-800">Admin</th>
                                                                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-blue-800">Manager</th>
                                                                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-800">Employee</th>
                                                                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Ghi chú</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {section.content.permissions.map((perm, idx) => (
                                                                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                                        <td className="border border-gray-300 px-4 py-3 font-medium">{perm.action}</td>
                                                                        <td className="border border-gray-300 px-4 py-3 text-center">
                                                                            <PermissionIcon hasPermission={perm.admin} />
                                                                        </td>
                                                                        <td className="border border-gray-300 px-4 py-3 text-center">
                                                                            <PermissionIcon hasPermission={perm.manager} />
                                                                        </td>
                                                                        <td className="border border-gray-300 px-4 py-3 text-center">
                                                                            <PermissionIcon hasPermission={perm.employee} />
                                                                        </td>
                                                                        <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">{perm.note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Workflow */}
                                            {section.id === 'workflow' && (
                                                <div className="space-y-8">
                                                    <div className="grid gap-6 lg:grid-cols-3">
                                                        <div className="bg-red-50 p-5 rounded-lg border border-red-200">
                                                            <h3 className="font-semibold text-red-800 mb-4 flex items-center">
                                                                <Shield className="w-5 h-5 mr-2" />
                                                                Quy trình Admin
                                                            </h3>
                                                            <ol className="list-decimal list-inside text-sm text-red-700 space-y-2">
                                                                {section.content.admin.map((item, idx) => (
                                                                    <li key={idx} className="leading-relaxed">{item}</li>
                                                                ))}
                                                            </ol>
                                                        </div>

                                                        <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                                                            <h3 className="font-semibold text-blue-800 mb-4 flex items-center">
                                                                <Users className="w-5 h-5 mr-2" />
                                                                Quy trình Manager
                                                            </h3>
                                                            <ol className="list-decimal list-inside text-sm text-blue-700 space-y-2">
                                                                {section.content.manager.map((item, idx) => (
                                                                    <li key={idx} className="leading-relaxed">{item}</li>
                                                                ))}
                                                            </ol>
                                                        </div>

                                                        <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                                                            <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                                                                <User className="w-5 h-5 mr-2" />
                                                                Quy trình Employee
                                                            </h3>
                                                            <ol className="list-decimal list-inside text-sm text-green-700 space-y-2">
                                                                {section.content.employee.map((item, idx) => (
                                                                    <li key={idx} className="leading-relaxed">{item}</li>
                                                                ))}
                                                            </ol>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Features Guide */}
                                            {section.id === 'features' && (
                                                <div className="space-y-8">
                                                    {section.content.sections.map((sec, idx) => (
                                                        <div key={idx}>
                                                            <h3 className="font-semibold text-gray-900 mb-4 text-lg">{sec.title}</h3>
                                                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                                {sec.items.map((item, itemIdx) => (
                                                                    <div key={itemIdx} className="bg-gray-50 p-4 rounded-lg border">
                                                                        <h4 className="font-medium text-gray-900 mb-2">{item.feature}</h4>
                                                                        <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Tips and Notes */}
                                            {section.id === 'tips' && (
                                                <div className="space-y-8">
                                                    {/* Security */}
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                                                            <Shield className="w-5 h-5 mr-2 text-red-600" />
                                                            Bảo mật
                                                        </h3>
                                                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                                            <ul className="list-disc list-inside text-red-700 space-y-2">
                                                                {section.content.security.map((item, idx) => (
                                                                    <li key={idx} className="leading-relaxed">{item}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    {/* Tips */}
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                                                            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                                                            Mẹo sử dụng hiệu quả
                                                        </h3>
                                                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                                            <ul className="list-disc list-inside text-green-700 space-y-2">
                                                                {section.content.tips.map((item, idx) => (
                                                                    <li key={idx} className="leading-relaxed">{item}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    {/* Troubleshooting */}
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                                                            <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                                                            Xử lý sự cố thường gặp
                                                        </h3>
                                                        <div className="space-y-3">
                                                            {section.content.troubleshooting.map((item, idx) => (
                                                                <div key={idx} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                                                    <div className="font-medium text-blue-900">❓ {item.issue}</div>
                                                                    <div className="text-sm text-blue-700 mt-1">💡 {item.solution}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                        <div className="text-center">
                            <h3 className="font-semibold text-gray-900 mb-2">📞 Liên hệ hỗ trợ</h3>
                            <div className="grid md:grid-cols-3 gap-4 mt-4">
                                <div className="text-sm">
                                    <div className="font-medium text-red-800">Admin hệ thống</div>
                                    <div className="text-red-600">Hỗ trợ kỹ thuật & quản lý tài khoản</div>
                                </div>
                                <div className="text-sm">
                                    <div className="font-medium text-blue-800">Manager trực tiếp</div>
                                    <div className="text-blue-600">Hỗ trợ nghiệp vụ & phân công tài sản</div>
                                </div>
                                <div className="text-sm">
                                    <div className="font-medium text-purple-800">IT Helpdesk</div>
                                    <div className="text-purple-600">Hỗ trợ các vấn đề kỹ thuật khác</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserGuide;