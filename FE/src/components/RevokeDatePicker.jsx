export default function RevokeDatePicker({ revokeDate, setRevokeDate }) {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ngày thu hồi</label>
            <input
                type="datetime-local"
                value={revokeDate}
                onChange={(e) => setRevokeDate(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>
    );
}
