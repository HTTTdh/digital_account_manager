import React from 'react'
import { Button } from './ui/button';
import { Check, X } from 'lucide-react';
const RequestActions = ({ item, onApprove, onReject }) => (
    <div className="flex flex-col justify-center space-y-3">
        <div className="text-center mb-2">
            <span className="text-lg text-gray-500">Thao tác</span>
        </div>

        <Button
            onClick={() => onApprove(item)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 transition-colors duration-200"
            size="default"
        >
            <Check className="w-4 h-4 mr-2" />
            Phê Duyệt
        </Button>

        <Button
            onClick={() => onReject(item)}
            variant="destructive"
            className="w-full font-medium py-2.5 transition-colors duration-200"
            size="default"
        >
            <X className="w-4 h-4 mr-2" />
            Từ Chối
        </Button>
    </div>
);

export default RequestActions

