import React from 'react'
import { Calendar, Play, Square } from 'lucide-react';
const TimeInfo = ({ start, end }) => {
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) return "Không xác định";
        return date.toLocaleString("vi-VN", dateString);
    }
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-lg">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-700">Thời gian</span>
            </div>
            <div className="bg-white/60 p-3 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <Play className="w-3 h-3 text-green-600" />
                        <span className="text-md font-medium text-green-700">START</span>
                    </div>
                    <div className="text-md text-gray-900">{formatDateTime(start)}</div>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <Square className="w-3 h-3 text-red-600" />
                        <span className="text-md font-medium text-red-700">END</span>
                    </div>
                    <div className="text-md text-gray-900">{formatDateTime(end)}</div>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="text-xs text-gray-600">
                        <span className="font-medium">Thời lượng:</span>{" "}
                        {start && end
                            ? `${Math.round((new Date(end) - new Date(start)) / 1000)} giây`
                            : "Không xác định"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeInfo