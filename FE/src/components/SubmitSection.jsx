import { AlertCircle, CheckCircle2, Send } from "lucide-react";

export default function SubmitSection({ isFormValid, isSubmitting }) {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    {isFormValid ? (
                        <>
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                            <div>
                                <p className="font-semibold text-green-700">Sẵn sàng cấp phát</p>
                                <p className="text-sm text-gray-500">Tất cả thông tin đã được điền đầy đủ</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <AlertCircle className="w-6 h-6 text-orange-500" />
                            <div>
                                <p className="font-semibold text-orange-700">Chưa đầy đủ thông tin</p>
                                <p className="text-sm text-gray-500">Vui lòng chọn đầy đủ tài sản, quản lý và nhân viên</p>
                            </div>
                        </>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`flex items-center px-8 py-4 rounded-xl font-semibold text-white transition-all ${isFormValid && !isSubmitting
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Đang cấp phát...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5 mr-3" /> Cấp phát tài sản
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
