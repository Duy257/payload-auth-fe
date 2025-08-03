"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { googleAuth, authUtils } from "@/api/auth";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallback() {
  const router = useRouter();
  const { checkAuthStatus } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const error = urlParams.get("error");

        // Check for OAuth errors
        if (error) {
          setStatus("error");
          setMessage(
            error === "access_denied"
              ? "Bạn đã từ chối quyền truy cập. Vui lòng thử lại."
              : "Có lỗi xảy ra trong quá trình đăng nhập với Google."
          );
          return;
        }

        // Check for authorization code
        if (!code) {
          setStatus("error");
          setMessage(
            "Không nhận được mã xác thực từ Google. Vui lòng thử lại."
          );
          return;
        }

        // Handle the callback
        const response = await googleAuth.handleCallback(code);

        if (response.success && response.user) {
          // Save auth data
          if (response.token) {
            authUtils.saveAuthData(response.token, response.user);
          }

          // Update auth context
          await checkAuthStatus();

          setStatus("success");
          setMessage("Đăng nhập thành công! Đang chuyển hướng...");

          // Redirect to home page after a short delay
          setTimeout(() => {
            router.push("/home");
          }, 2000);
        } else {
          setStatus("error");
          setMessage(
            response.message || "Đăng nhập Google thất bại. Vui lòng thử lại."
          );
        }
      } catch (error) {
        console.error("Callback handling error:", error);
        setStatus("error");
        setMessage(
          "Có lỗi xảy ra trong quá trình xử lý đăng nhập. Vui lòng thử lại."
        );
      }
    };

    handleCallback();
  }, [router, checkAuthStatus]);

  const handleRetry = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="bg-white rounded-2xl shadow-xl border border-gray-100">
          <CardContent className="p-8">
            <div className="text-center">
              {status === "loading" && (
                <>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="text-blue-600 animate-spin" size={32} />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Đang xử lý đăng nhập...
                  </h2>
                  <p className="text-gray-600">
                    Vui lòng đợi trong giây lát, chúng tôi đang xác thực thông
                    tin của bạn.
                  </p>
                </>
              )}

              {status === "success" && (
                <>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Đăng nhập thành công!
                  </h2>
                  <p className="text-gray-600 mb-4">{message}</p>
                  <div className="flex items-center justify-center">
                    <Loader2
                      className="text-blue-600 animate-spin mr-2"
                      size={16}
                    />
                    <span className="text-sm text-gray-500">
                      Đang chuyển hướng...
                    </span>
                  </div>
                </>
              )}

              {status === "error" && (
                <>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="text-red-600" size={32} />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Đăng nhập thất bại
                  </h2>
                  <p className="text-gray-600 mb-6">{message}</p>
                  <button
                    onClick={handleRetry}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Thử lại
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
