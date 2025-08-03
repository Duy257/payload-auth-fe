import { AuthForm } from "@/components/auth-form";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                  <Zap className="text-white" size={16} />
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  ModernApp
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/home"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/auth/callback"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  callback
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Authentication Container */}
      <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <AuthForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              © 2024 ModernApp. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
              >
                Bảo mật
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
              >
                Điều khoản
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
              >
                Hỗ trợ
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
