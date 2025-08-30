import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";

export default function ThemTaiKhoan({
    showModal,
    setShowModal,
    phong_ban,
    onSubmit,
    editUser,
}) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        ho_ten: "",
        sdt: "",
        cap: 0,
        PhongBanId: 0,
    });

    const [showPassword, setShowPassword] = useState(false);
    const user = useAuth();
    useEffect(() => {
        if (editUser) {
            setFormData({
                username: editUser.username || "",
                password: "",
                ho_ten: editUser.ho_ten || "",
                sdt: editUser.sdt || "",
                cap: editUser.cap || 0,
                PhongBanId: editUser.phong_ban_id || 0,
            });
        } else if (showModal) {
            setFormData({
                username: "",
                password: "",
                ho_ten: "",
                sdt: "",
                cap: 0,
                PhongBanId: 0,
            });
        }
    }, [editUser, showModal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "cap" || name === "PhongBanId" ? Number(value) || 0 : value,
        }));
    };

    const handleSubmit = async () => {
        if (user?.cap === 1 && formData.cap === 0) {
            alert("Bạn không có quyền tạo tài khoản cấp 0");
            return;
        }

        await onSubmit(formData);
        setShowModal(false);
    };
    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{editUser ? "Cập nhật tài khoản" : "Thêm tài khoản"}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Username */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>

                    {/* Password */}
                    <div className="grid grid-cols-4 items-center gap-4 relative">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <div className="col-span-3 relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Họ tên */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="ho_ten" className="text-right">
                            Họ tên
                        </Label>
                        <Input
                            id="ho_ten"
                            name="ho_ten"
                            value={formData.ho_ten}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="sdt" className="text-right">
                            SĐT
                        </Label>
                        <Input
                            id="sdt"
                            name="sdt"
                            value={formData.sdt}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>

                    {/* Cấp */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cap" className="text-right">
                            Cấp
                        </Label>
                        <Input
                            id="cap"
                            type="number"
                            name="cap"
                            value={user.user.cap === 1 ? 2 : 0}
                            onChange={handleChange}
                            min={user.user.cap === 1 ? 2 : 0}
                            className="col-span-3"
                        />
                    </div>

                    {/* Phòng ban */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Phòng ban</Label>
                        <Select
                            value={formData.PhongBanId ? String(formData.PhongBanId) : "none"}
                            onValueChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    PhongBanId: value === "none" ? 0 : Number(value),
                                }))
                            }
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="-- Chọn phòng ban --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">-- Chọn phòng ban --</SelectItem>
                                {phong_ban?.map((pb) => (
                                    <SelectItem key={pb.id} value={String(pb.id)}>
                                        {pb.ten}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowModal(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit}>
                        {editUser ? "Cập nhật" : "Thêm"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
