import React, { useState } from 'react';
import { ChevronDown, ChevronRight, User, Shield, Settings, Bell, FileText, Package, Building2, Users, Activity, HelpCircle, Search, Book, Eye, EyeOff } from 'lucide-react';

const UserGuide = () => {
    const [expandedSections, setExpandedSections] = useState({ intro: true });
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

    const guideData = [
        {
            id: 'intro',
            title: 'Giới thiệu Hệ thống',
            icon: <Book className="w-5 h-5" />,
            content: {
                description: 'Hệ thống Quản lý Tài sản là một ứng dụng web giúp doanh nghiệp quản lý tài sản, nhân viên và các yêu cầu liên quan đến tài sản một cách hiệu quả.',
                roles: [
                    { level: 'Level 1 (Admin)', desc: 'Toàn quyền quản lý hệ thống', color: 'bg-red-100 text-red-800 border-red-200' },
                    { level: 'Level 2 (Manager)', desc: 'Quản lý tài sản và yêu cầu', color: 'bg-blue-100 text-blue-800 border-blue-200' },
                    { level: 'Level 3 (User)', desc: 'Sử dụng và cập nhật thông tin tài sản được giao', color: 'bg-green-100 text-green-800 border-green-200' }
                ]
            }
        },
        {
            id: 'auth',
            title: 'Đăng nhập và Xác thực',
            icon: <Shield className="w-5 h-5" />,
            content: {
                steps: [
                    'Truy cập trang đăng nhập',
                    'Nhập tên đăng nhập và mật khẩu',
                    'Hệ thống sẽ xác thực và cấp quyền truy cập tương ứng'
                ],
                note: 'Truy cập menu "Thông tin cá nhân" hoặc biểu tượng profile để xem thông tin tài khoản của bạn'
            }
        },
        {
            id: 'requests',
            title: 'Quản lý Yêu cầu',
            icon: <FileText className="w-5 h-5" />,
            content: {
                features: [
                    {
                        title: 'Tạo yêu cầu mới',
                        steps: ['Vào mục "Yêu cầu" → "Tạo yêu cầu mới"', 'Điền đầy đủ thông tin yêu cầu', 'Nhấn "Gửi yêu cầu"'],
                        access: 'Tất cả người dùng'
                    },
                    {
                        title: 'Cập nhật yêu cầu',
                        steps: ['Vào danh sách yêu cầu', 'Chọn yêu cầu cần chỉnh sửa', 'Cập nhật thông tin và lưu lại'],
                        access: 'Tất cả người dùng'
                    },
                    {
                        title: 'Xem danh sách yêu cầu',
                        steps: ['Truy cập mục "Quản lý yêu cầu"', 'Lọc và tìm kiếm theo các tiêu chí'],
                        access: 'Level 1, 2'
                    }
                ]
            }
        },
        {
            id: 'assets',
            title: 'Quản lý Tài sản',
            icon: <Package className="w-5 h-5" />,
            content: {
                features: [
                    {
                        title: 'Xem thông tin tài sản cá nhân',
                        steps: ['Vào mục "Tài sản của tôi"', 'Xem danh sách tài sản được giao', 'Kiểm tra thông tin chi tiết từng tài sản'],
                        access: 'Tất cả người dùng'
                    },
                    {
                        title: 'Thêm thông tin tài sản mới',
                        steps: ['Vào "Quản lý tài sản" → "Thêm thông tin tài sản"', 'Nhập thông tin đăng nhập và chi tiết', 'Lưu thông tin'],
                        access: 'Level 1, 2'
                    },
                    {
                        title: 'Cập nhật thông tin tài sản',
                        steps: ['Chọn tài sản cần cập nhật', 'Chỉnh sửa thông tin cần thiết', 'Lưu lại thay đổi'],
                        access: 'Level 1, 3'
                    },
                    {
                        title: 'Quản lý CRUD tài sản',
                        steps: ['Xem danh sách tài sản', 'Thêm/Sửa/Xóa tài sản', 'Gán tài sản cho nhân viên'],
                        access: 'Level 1, 2 (Thêm), Level 1 (Sửa/Xóa)'
                    }
                ]
            }
        },
        {
            id: 'categories',
            title: 'Quản lý Danh mục Tài sản',
            icon: <Settings className="w-5 h-5" />,
            content: {
                note: 'Chỉ dành cho Admin (Level 1)',
                features: [
                    { title: 'Xem danh mục', desc: 'Truy cập "Danh mục tài sản" để xem các loại tài sản' },
                    { title: 'Thêm danh mục mới', desc: 'Nhập tên và mô tả danh mục, sau đó lưu thông tin' },
                    { title: 'Cập nhật danh mục', desc: 'Chọn danh mục cần sửa, chỉnh sửa và lưu lại' },
                    { title: 'Xóa danh mục', desc: 'Xác nhận xóa (đảm bảo không có tài sản nào đang sử dụng)' }
                ]
            }
        },
        {
            id: 'departments',
            title: 'Quản lý Phòng ban',
            icon: <Building2 className="w-5 h-5" />,
            content: {
                note: 'Chỉ dành cho Admin (Level 1)',
                features: [
                    { title: 'Xem danh sách phòng ban', desc: 'Truy cập "Quản lý phòng ban"' },
                    { title: 'Thêm phòng ban mới', desc: 'Nhập tên và mô tả phòng ban' },
                    { title: 'Cập nhật thông tin phòng ban', desc: 'Chỉnh sửa thông tin và lưu lại' },
                    { title: 'Xóa phòng ban', desc: 'Xác nhận xóa (đảm bảo không có nhân viên nào trong phòng ban)' }
                ]
            }
        },
        {
            id: 'accounts',
            title: 'Quản lý Tài khoản',
            icon: <Users className="w-5 h-5" />,
            content: {
                features: [
                    { title: 'Danh sách tài khoản Level 1', desc: 'Quản lý tài khoản có quyền Admin' },
                    { title: 'Danh sách tài khoản Level 2', desc: 'Quản lý tài khoản có quyền Manager' }
                ]
            }
        },
        {
            id: 'notifications',
            title: 'Hệ thống Thông báo',
            icon: <Bell className="w-5 h-5" />,
            content: {
                features: [
                    {
                        title: 'Xem thông báo',
                        steps: ['Vào mục "Thông báo"', 'Xem các thông báo mới nhất', 'Đánh dấu đã đọc các thông báo quan trọng']
                    },
                    {
                        title: 'Tạo thông báo mới',
                        steps: ['Vào "Tạo thông báo"', 'Nhập tiêu đề và nội dung', 'Chọn đối tượng nhận thông báo', 'Gửi thông báo']
                    }
                ],
                note: 'Hệ thống tự động gửi thông báo khi tài sản sắp hết hạn sử dụng'
            }
        },
        {
            id: 'activities',
            title: 'Theo dõi Hành động',
            icon: <Activity className="w-5 h-5" />,
            content: {
                features: [
                    { title: 'Xem lịch sử hành động', desc: 'Truy cập "Lịch sử hoạt động" để xem các thao tác đã thực hiện' },
                    { title: 'Xem hành động cá nhân', desc: 'Vào "Hoạt động của tôi" để xem lịch sử hành động của bản thân' }
                ]
            }
        },
        {
            id: 'important',
            title: 'Lưu ý Quan trọng',
            icon: <HelpCircle className="w-5 h-5" />,
            content: {
                security: [
                    'Đăng xuất sau khi sử dụng xong',
                    'Không chia sẻ thông tin đăng nhập',
                    'Thay đổi mật khẩu định kỳ'
                ],
                workflow: [
                    'Kiểm tra thông báo hàng ngày để cập nhật thông tin mới nhất',
                    'Cập nhật trạng thái tài sản kịp thời khi có thay đổi',
                    'Báo cáo sự cố ngay khi phát hiện vấn đề với tài sản',
                    'Yêu cầu hỗ trợ khi cần thiết thông qua hệ thống yêu cầu'
                ],
                troubleshooting: [
                    { issue: 'Không thể đăng nhập', solution: 'Liên hệ admin để reset mật khẩu' },
                    { issue: 'Không thấy tài sản', solution: 'Kiểm tra quyền truy cập hoặc liên hệ quản lý' },
                    { issue: 'Lỗi hệ thống', solution: 'Làm mới trang web hoặc liên hệ IT support' }
                ],
                contacts: [
                    { role: 'Admin hệ thống', purpose: 'Hỗ trợ kỹ thuật' },
                    { role: 'Quản lý phòng ban', purpose: 'Hỗ trợ về quy trình nghiệp vụ' },
                    { role: 'IT Helpdesk', purpose: 'Hỗ trợ các vấn đề kỹ thuật khác' }
                ]
            }
        }
    ];

    const filteredData = guideData.filter(section =>
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        JSON.stringify(section.content).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const RoleBadge = ({ level, desc, color }) => (
        <div className={`px-4 py-3 rounded-lg ${color} border`}>
            <div className="font-semibold text-base">{level}</div>
            <div className="text-sm opacity-90 mt-1">{desc}</div>
        </div>
    );

    const FeatureCard = ({ feature }) => (
        <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-900 mb-3">{feature.title}</h4>
            {feature.steps && (
                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2 mb-3">
                    {feature.steps.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">{step}</li>
                    ))}
                </ol>
            )}
            {feature.desc && (
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{feature.desc}</p>
            )}
            {feature.access && (
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {feature.access}
                </span>
            )}
        </div>
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
                            <p className="text-gray-600 mt-1">Tài liệu hướng dẫn sử dụng hệ thống quản lý tài sản</p>
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
                        <nav className="p-2 max-h-96 overflow-y-auto">
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
                                                        <h3 className="font-semibold text-gray-900 mb-4 text-lg">Phân quyền người dùng:</h3>
                                                        <div className="grid gap-4 md:grid-cols-3">
                                                            {section.content.roles.map((role, idx) => (
                                                                <RoleBadge key={idx} {...role} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Auth Section */}
                                            {section.id === 'auth' && (
                                                <div className="space-y-6">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-4">Các bước đăng nhập:</h3>
                                                        <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                                                            {section.content.steps.map((step, idx) => (
                                                                <li key={idx} className="leading-relaxed">{step}</li>
                                                            ))}
                                                        </ol>
                                                    </div>
                                                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                                        <p className="text-blue-800"><strong>Xem thông tin cá nhân:</strong> {section.content.note}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Features-based sections */}
                                            {(section.id === 'requests' || section.id === 'assets') && (
                                                <div className="grid gap-6">
                                                    {section.content.features.map((feature, idx) => (
                                                        <FeatureCard key={idx} feature={feature} />
                                                    ))}
                                                </div>
                                            )}

                                            {/* Categories and Departments */}
                                            {(section.id === 'categories' || section.id === 'departments') && (
                                                <div className="space-y-6">
                                                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                                        <p className="text-red-800 font-medium">{section.content.note}</p>
                                                    </div>
                                                    <div className="grid gap-4 md:grid-cols-2">
                                                        {section.content.features.map((feature, idx) => (
                                                            <div key={idx} className="bg-gray-50 p-4 rounded-lg border">
                                                                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                                                                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Accounts Section */}
                                            {section.id === 'accounts' && (
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    {section.content.features.map((feature, idx) => (
                                                        <div key={idx} className="bg-gray-50 p-4 rounded-lg border">
                                                            <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                                                            <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Notifications */}
                                            {section.id === 'notifications' && (
                                                <div className="space-y-6">
                                                    <div className="grid gap-6">
                                                        {section.content.features.map((feature, idx) => (
                                                            <FeatureCard key={idx} feature={feature} />
                                                        ))}
                                                    </div>
                                                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                        <p className="text-yellow-800"><strong>Lưu ý:</strong> {section.content.note}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Activities */}
                                            {section.id === 'activities' && (
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    {section.content.features.map((feature, idx) => (
                                                        <div key={idx} className="bg-gray-50 p-4 rounded-lg border">
                                                            <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                                                            <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Important Notes */}
                                            {section.id === 'important' && (
                                                <div className="space-y-8">
                                                    {/* Security */}
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                                                            <Shield className="w-5 h-5 mr-2 text-red-600" />
                                                            Bảo mật
                                                        </h3>
                                                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-6">
                                                            {section.content.security.map((item, idx) => (
                                                                <li key={idx} className="leading-relaxed">{item}</li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Workflow */}
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                                                            <Activity className="w-5 h-5 mr-2 text-blue-600" />
                                                            Quy trình làm việc
                                                        </h3>
                                                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-6">
                                                            {section.content.workflow.map((item, idx) => (
                                                                <li key={idx} className="leading-relaxed">{item}</li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Troubleshooting */}
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                                                            <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
                                                            Xử lý sự cố
                                                        </h3>
                                                        <div className="space-y-3">
                                                            {section.content.troubleshooting.map((item, idx) => (
                                                                <div key={idx} className="bg-gray-50 p-4 rounded-lg border">
                                                                    <div className="font-medium text-gray-900">{item.issue}</div>
                                                                    <div className="text-sm text-gray-600 mt-1 leading-relaxed">{item.solution}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Contacts */}
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                                                            <Users className="w-5 h-5 mr-2 text-purple-600" />
                                                            Liên hệ hỗ trợ
                                                        </h3>
                                                        <div className="grid gap-3 md:grid-cols-3">
                                                            {section.content.contacts.map((contact, idx) => (
                                                                <div key={idx} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                                                    <div className="font-medium text-purple-900">{contact.role}</div>
                                                                    <div className="text-sm text-purple-700 mt-1">{contact.purpose}</div>
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
                    <div className="mt-8 p-6 bg-white border rounded-lg">
                        <div className="text-center text-sm text-gray-500">
                            <p className="font-medium">📝 Lưu ý quan trọng</p>
                            <p className="mt-2">Tài liệu này sẽ được cập nhật theo sự phát triển của hệ thống.</p>
                            <p className="mt-1">Vui lòng kiểm tra phiên bản mới nhất trước khi sử dụng.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserGuide;