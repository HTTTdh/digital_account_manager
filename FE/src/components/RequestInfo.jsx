import React from 'react'
import { formatDate } from '@/utils/helpers';
import { Badge } from "@/components/ui/badge";
import { Building2, User, UserCheck, Calendar, FileText } from 'lucide-react';
const RequestInfo = ({ item }) => {
    return (
        <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <div>
                            <span className="text-lg text-gray-500">Bộ phận yêu cầu</span>
                            <p className="font-semibold text-gray-800">{item?.ten || "Không rõ"}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <div>
                            <span className="text-lg text-gray-500">Người yêu cầu</span>
                            <p className="font-semibold text-gray-800">{item?.nguoi_yeu_cau || "Không rõ"}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <UserCheck className="w-4 h-4 text-gray-500" />
                        <div>
                            <span className="text-lg text-gray-500">Mã người nhận</span>
                            <p className="font-semibold text-gray-800">{item?.nguoi_yeu_cau_id || "Không rõ"}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div>
                        <span className="text-lg text-gray-500">Danh mục tài sản</span>
                        <div className="mt-1">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {item?.ten_danh_muc_tai_san || "Tài sản mới"}
                            </Badge>
                        </div>
                    </div>

                    <div>
                        <span className="text-lg text-gray-500">Loại yêu cầu</span>
                        <p className="font-semibold text-gray-800">{item?.loai || "Không rõ"}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                            <span className="text-lg text-gray-500">Ngày yêu cầu</span>
                            <p className="font-semibold text-gray-800">{formatDate(item?.ngay_yeu_cau)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <div className="flex items-start space-x-2">
                    <FileText className="w-4 h-4 text-gray-500 mt-1" />
                    <div className="flex-1">
                        <span className="text-lg text-gray-500">Lý do yêu cầu</span>
                        <p className="font-medium text-gray-800 mt-1 leading-relaxed">
                            {item?.noi_dung || "Không có mô tả"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestInfo