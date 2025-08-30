import React from 'react'

const FilterPanel = ({ departments, selectedDepartment, setSelectedDepartment, search, setSearch }) => (
    <div className="flex gap-4 items-center">
        <select
            value={selectedDepartment}
            onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSearch("");
            }}
            className="w-64 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
        >
            <option value="all">Tất cả phòng ban</option>
            {departments.map((dept) => (
                <option key={dept?.id} value={dept?.ten}>
                    {dept?.ten}
                </option>
            ))}
        </select>

        {selectedDepartment !== "all" && (
            <input
                type="text"
                placeholder="Tìm kiếm theo tên nhân viên..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg p-2 w-64 shadow-sm focus:ring-2 focus:ring-blue-500"
            />
        )}
    </div>
);


export default FilterPanel