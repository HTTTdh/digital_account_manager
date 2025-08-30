import { Plus, RotateCcw, Trash2, Settings } from "lucide-react";

export default function CustomFieldsForm({ customFields, setCustomFields, defaultFields }) {
    const handleAddField = () => setCustomFields([...customFields, { key: "", value: "" }]);
    const handleRemoveField = (index) => setCustomFields(customFields.filter((_, i) => i !== index));
    const handleChangeField = (index, field, val) => {
        const newFields = [...customFields];
        newFields[index][field] = val;
        setCustomFields(newFields);
    };
    const handleResetDefault = () => setCustomFields(defaultFields);

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-orange-600" />
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Thông tin đăng nhập</h3>
                        <p className="text-sm text-gray-500">Cấu hình thông tin truy cập cho tài sản</p>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <button type="button" onClick={handleAddField} className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg">
                        <Plus className="w-4 h-4 inline mr-1" /> Thêm
                    </button>
                    <button type="button" onClick={handleResetDefault} className="px-4 py-2 text-gray-600 bg-gray-50 rounded-lg">
                        <RotateCcw className="w-4 h-4 inline mr-1" /> Reset
                    </button>
                </div>
            </div>
            <div className="max-h-80 overflow-y-auto space-y-4">
                {customFields.map((field, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <input
                            type="text"
                            placeholder="Tên thuộc tính"
                            value={field.key}
                            onChange={(e) => handleChangeField(index, "key", e.target.value)}
                            className="flex-1 border-2 border-gray-200 rounded-lg p-3"
                        />
                        <input
                            type="text"
                            placeholder="Giá trị"
                            value={field.value}
                            onChange={(e) => handleChangeField(index, "value", e.target.value)}
                            className="flex-1 border-2 border-gray-200 rounded-lg p-3"
                        />
                        <button type="button" onClick={() => handleRemoveField(index)} className="p-3 bg-red-500 text-white rounded-lg">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
            {customFields.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Chưa có trường thông tin nào</p>
                    <button type="button" onClick={handleAddField} className="mt-3 text-blue-600 hover:underline">
                        Thêm trường đầu tiên
                    </button>
                </div>
            )}
        </div>
    );
}
