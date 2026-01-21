import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ArrowLeft, Sun, Moon, Sparkles, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

interface Notification {
  id: string;
  type: "complaint" | "notice" | "event" | "placement";
  title: string;
  time: string;
  read: boolean;
}

interface TopNavbarProps {
  title: string;
  subtitle?: string;
  notifications?: Notification[];
}

const TopNavbar = ({ title, subtitle, notifications = [] }: TopNavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  const isHomePage = location.pathname === "/";
  const unreadCount = notifications.filter(n => !n.read).length;

  const getThemeClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-[#1a1a2e] text-white";
      case "fancy":
        return "bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white";
      default:
        return "bg-white text-[#1f2937]";
    }
  };

  const getCardClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-[#252542] border-[#3d3d5c]";
      case "fancy":
        return "bg-[#16213e]/90 border-[#0f3460] shadow-[0_0_20px_rgba(79,111,220,0.3)]";
      default:
        return "bg-white border-gray-100";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-between mb-6 p-4 rounded-2xl shadow-card ${getThemeClasses()}`}
    >
      <div className="flex items-center gap-4">
        {!isHomePage && (
          <button
            onClick={() => navigate(-1)}
            className={`p-2 rounded-xl transition-colors ${
              theme === "light" 
                ? "hover:bg-gray-100 text-[#4f6fdc]" 
                : "hover:bg-white/10 text-white"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className={`text-2xl font-bold ${theme === "light" ? "text-[#1f2937]" : "text-white"}`}>
            {title}
          </h1>
          {subtitle && (
            <p className={theme === "light" ? "text-[#6b7280]" : "text-white/70"}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Buttons */}
        <div className={`flex items-center gap-1 p-1 rounded-xl ${
          theme === "light" ? "bg-gray-100" : "bg-white/10"
        }`}>
          <button
            onClick={() => setTheme("light")}
            className={`p-2 rounded-lg transition-all ${
              theme === "light" 
                ? "bg-white text-[#4f6fdc] shadow-sm" 
                : "text-white/70 hover:text-white"
            }`}
            title="Light Mode"
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`p-2 rounded-lg transition-all ${
              theme === "dark" 
                ? "bg-[#3d3d5c] text-white shadow-sm" 
                : "text-white/70 hover:text-white"
            }`}
            title="Dark Mode"
          >
            <Moon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTheme("fancy")}
            className={`p-2 rounded-lg transition-all ${
              theme === "fancy" 
                ? "bg-gradient-to-r from-[#4f6fdc] to-[#9333ea] text-white shadow-sm" 
                : "text-white/70 hover:text-white"
            }`}
            title="Fancy Mode"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2.5 rounded-xl transition-colors relative ${
              theme === "light" 
                ? "hover:bg-gray-100 text-[#6b7280]" 
                : "hover:bg-white/10 text-white/80"
            }`}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`absolute right-0 top-12 w-80 rounded-2xl shadow-xl border z-50 ${getCardClasses()}`}
              >
                <div className={`p-4 border-b ${theme === "light" ? "border-gray-100" : "border-white/10"}`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${theme === "light" ? "text-[#1f2937]" : "text-white"}`}>
                      Notifications
                    </h3>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className={`p-1 rounded-lg ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-white/10"}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                  {notifications.length === 0 ? (
                    <p className={`text-center py-8 ${theme === "light" ? "text-[#6b7280]" : "text-white/60"}`}>
                      No notifications
                    </p>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-xl mb-1 cursor-pointer transition-colors ${
                          notification.read 
                            ? theme === "light" ? "hover:bg-gray-50" : "hover:bg-white/5"
                            : theme === "light" ? "bg-[#4f6fdc]/5 hover:bg-[#4f6fdc]/10" : "bg-[#4f6fdc]/20 hover:bg-[#4f6fdc]/30"
                        }`}
                      >
                        <p className={`text-sm font-medium ${theme === "light" ? "text-[#1f2937]" : "text-white"}`}>
                          {notification.title}
                        </p>
                        <p className={`text-xs mt-1 ${theme === "light" ? "text-[#6b7280]" : "text-white/60"}`}>
                          {notification.time}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                <div className={`p-3 border-t ${theme === "light" ? "border-gray-100" : "border-white/10"}`}>
                  <button className="w-full py-2 text-center text-sm text-[#4f6fdc] font-medium hover:underline">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default TopNavbar;
