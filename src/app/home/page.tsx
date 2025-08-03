"use client";
import { CheckCircle, UserCog, Settings, LogOut, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  // Mock user data for display purposes only
  const mockUser = {
    firstName: "Nguyễn",
    lastName: "Văn A",
    email: "nguyen.vana@example.com",
    profileImageUrl: null,
  };

  const handleLogout = () => {
    // Just for display - no actual logout logic
    alert("Đăng xuất (chỉ giao diện)");
  };

  const getUserInitials = () => {
    const firstName = mockUser.firstName || "";
    const lastName = mockUser.lastName || "";
    return (
      `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() ||
      mockUser.email?.charAt(0).toUpperCase() ||
      "U"
    );
  };

  const getUserDisplayName = () => {
    if (mockUser.firstName && mockUser.lastName) {
      return `${mockUser.firstName} ${mockUser.lastName}`;
    }
    return mockUser.email || "Người dùng";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  ModernApp
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="w-8 h-8">
                <AvatarImage src={mockUser.profileImageUrl || undefined} />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-gray-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Card className="bg-white rounded-2xl shadow-xl border border-gray-100">
            <CardContent className="p-8">
              {/* Success Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Chào mừng đến với ModernApp!
                </h2>
                <p className="text-gray-600">
                  Bạn đã đăng nhập thành công vào tài khoản.
                </p>
              </div>

              {/* User Profile Card */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex items-center">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={mockUser.profileImageUrl || undefined}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-brand-500 text-white font-semibold text-lg">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex-1">
                    <div className="text-lg font-semibold text-gray-900">
                      {getUserDisplayName()}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {mockUser.email}
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 hover:bg-green-100"
                  >
                    <Circle className="w-2 h-2 mr-1 fill-current" />
                    Trực tuyến
                  </Badge>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Button
                  variant="outline"
                  className="p-4 h-auto bg-gray-50 hover:bg-gray-100 border-gray-200 flex flex-col items-start text-left"
                >
                  <UserCog className="text-brand-600 mb-2" size={20} />
                  <div className="font-medium text-gray-900">
                    Chỉnh sửa hồ sơ
                  </div>
                  <div className="text-sm text-gray-600">
                    Cập nhật thông tin của bạn
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="p-4 h-auto bg-gray-50 hover:bg-gray-100 border-gray-200 flex flex-col items-start text-left"
                >
                  <Settings className="text-brand-600 mb-2" size={20} />
                  <div className="font-medium text-gray-900">Cài đặt</div>
                  <div className="text-sm text-gray-600">Quản lý tùy chọn</div>
                </Button>
              </div>

              {/* Logout Button */}
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
