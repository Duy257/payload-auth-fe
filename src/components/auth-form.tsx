import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Check, X, Chrome, Facebook, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export function AuthForm() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login, loginWithGoogle, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    rememberMe: false,
    agreeToTerms: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validatePassword = (password: string) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
    };
  };

  const passwordValidation = validatePassword(formData.password);

  const handleGoogleLogin = () => {
    setError("");
    loginWithGoogle();
  };

  const handleFacebookLogin = () => {
    // Facebook OAuth not implemented yet
    alert("Facebook OAuth chưa được triển khai");
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (activeTab === "login") {
        // Handle login
        const response = await login(formData.email, formData.password);

        if (response.success) {
          router.push("/home");
        } else {
          setError(response.message || "Đăng nhập thất bại");
        }
      } else {
        // Handle registration - implement this later
        alert("Đăng ký với email chưa được triển khai");
      }
    } catch (error) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-xl border border-gray-100">
      <CardContent className="p-8">
        {/* Auth Mode Toggle */}
        <div className="flex rounded-lg bg-gray-100 p-1 mb-8">
          <Button
            variant={activeTab === "login" ? "default" : "ghost"}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === "login"
                ? "bg-white text-gray-900 shadow-sm hover:bg-white"
                : "text-gray-500 hover:text-gray-900 hover:bg-transparent"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Đăng nhập
          </Button>
          <Button
            variant={activeTab === "register" ? "default" : "ghost"}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === "register"
                ? "bg-white text-gray-900 shadow-sm hover:bg-white"
                : "text-gray-500 hover:text-gray-900 hover:bg-transparent"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Đăng ký
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Login Form */}
        {activeTab === "login" && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Chào mừng trở lại
              </h2>
              <p className="text-gray-600 text-sm">
                Vui lòng đăng nhập vào tài khoản của bạn
              </p>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleGoogleLogin}
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                ) : (
                  <Chrome className="w-5 h-5 mr-3" />
                )}
                Tiếp tục với Google
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                onClick={handleFacebookLogin}
              >
                <Facebook className="w-5 h-5 mr-3 text-blue-600" />
                Tiếp tục với Facebook
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Hoặc tiếp tục với email
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form className="space-y-5" onSubmit={handleEmailAuth}>
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Địa chỉ email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors duration-200"
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors duration-200"
                    placeholder="Nhập mật khẩu của bạn"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      handleInputChange("rememberMe", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="remember-me"
                    className="text-sm text-gray-700"
                  >
                    Ghi nhớ đăng nhập
                  </Label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-brand-600 hover:text-brand-500 transition-colors duration-200"
                >
                  Quên mật khẩu?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang đăng nhập...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            </form>
          </div>
        )}

        {/* Registration Form */}
        {activeTab === "register" && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Tạo tài khoản của bạn
              </h2>
              <p className="text-gray-600 text-sm">
                Bắt đầu với tài khoản miễn phí của bạn
              </p>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleGoogleLogin}
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                ) : (
                  <Chrome className="w-5 h-5 mr-3" />
                )}
                Đăng ký với Google
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                onClick={handleFacebookLogin}
              >
                <Facebook className="w-5 h-5 mr-3 text-blue-600" />
                Đăng ký với Facebook
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Hoặc tạo tài khoản với email
                </span>
              </div>
            </div>

            {/* Registration Form */}
            <form className="space-y-5" onSubmit={handleEmailAuth}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tên
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors duration-200"
                    placeholder="Nguyễn"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Họ
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors duration-200"
                    placeholder="Văn A"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="registerEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Địa chỉ email
                </Label>
                <Input
                  id="registerEmail"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors duration-200"
                  placeholder="nguyen@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div>
                <Label
                  htmlFor="registerPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    id="registerPassword"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors duration-200"
                    placeholder="Tạo mật khẩu"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="text-xs text-gray-500">
                      Mật khẩu phải chứa:
                    </div>
                    <ul className="text-xs text-gray-500 mt-1 space-y-1">
                      <li className="flex items-center">
                        {passwordValidation.length ? (
                          <Check className="text-green-500 mr-2 w-3 h-3" />
                        ) : (
                          <X className="text-gray-400 mr-2 w-3 h-3" />
                        )}
                        Ít nhất 8 ký tự
                      </li>
                      <li className="flex items-center">
                        {passwordValidation.uppercase ? (
                          <Check className="text-green-500 mr-2 w-3 h-3" />
                        ) : (
                          <X className="text-gray-400 mr-2 w-3 h-3" />
                        )}
                        Một chữ cái viết hoa
                      </li>
                      <li className="flex items-center">
                        {passwordValidation.number ? (
                          <Check className="text-green-500 mr-2 w-3 h-3" />
                        ) : (
                          <X className="text-gray-400 mr-2 w-3 h-3" />
                        )}
                        Một chữ số
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Xác nhận mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors duration-200"
                    placeholder="Xác nhận mật khẩu của bạn"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange("agreeToTerms", checked as boolean)
                  }
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-gray-700">
                  Tôi đồng ý với{" "}
                  <a
                    href="#"
                    className="font-medium text-brand-600 hover:text-brand-500"
                  >
                    Điều khoản Dịch vụ
                  </a>{" "}
                  và{" "}
                  <a
                    href="#"
                    className="font-medium text-brand-600 hover:text-brand-500"
                  >
                    Chính sách Bảo mật
                  </a>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200"
                disabled={!formData.agreeToTerms}
              >
                Tạo tài khoản
              </Button>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
