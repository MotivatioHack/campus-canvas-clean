import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquarePlus,
  FileText,
  HelpCircle,
  Search,
  Calendar,
  Users,
  Vote,
  Briefcase,
  Bell,
  Bot,
  LogOut,
  User,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: MessageSquarePlus, label: "Raise Complaint", path: "/raise-complaint" },
  { icon: FileText, label: "My Complaints", path: "/my-complaints" },
  { icon: HelpCircle, label: "Student Helpdesk", path: "/helpdesk" },
  { icon: Search, label: "Lost & Found", path: "/lost-found" },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: Users, label: "Student Clubs", path: "/clubs" },
  { icon: Vote, label: "Polling", path: "/polling" },
  { icon: Briefcase, label: "Placements", path: "/placements" },
  { icon: Bell, label: "Notices", path: "/notices" },
  { icon: Bot, label: "Chatbot", path: "/chatbot" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleLogout = () => {
    navigate("/");
  };

  const getSidebarClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gradient-to-b from-[#1a1a2e] to-[#252542]";
      case "fancy":
        return "bg-gradient-to-b from-[#0f3460] via-[#16213e] to-[#1a1a2e] shadow-[0_0_40px_rgba(79,111,220,0.4)]";
      default:
        return "sidebar-gradient";
    }
  };

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed left-0 top-0 h-screen w-64 rounded-r-3xl shadow-sidebar z-50 flex flex-col overflow-hidden ${getSidebarClasses()}`}
    >
      {/* Student Profile Card */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            theme === "fancy" ? "bg-gradient-to-br from-[#4f6fdc] to-[#9333ea]" : "bg-white/20"
          }`}>
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">John Doe</h3>
            <p className="text-white/70 text-xs">CS2021001</p>
            <p className="text-white/50 text-xs">Computer Science</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isHovered = hoveredItem === item.path;

            return (
              <motion.li
                key={item.path}
                onHoverStart={() => setHoveredItem(item.path)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 relative ${
                    isActive
                      ? theme === "fancy"
                        ? "bg-gradient-to-r from-[#4f6fdc] to-[#9333ea] text-white font-medium shadow-lg shadow-[#4f6fdc]/30"
                        : "bg-white text-[#4f6fdc] font-medium shadow-md"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="hoverBg"
                      className={`absolute inset-0 rounded-xl ${
                        theme === "fancy" ? "bg-white/5" : "bg-white/10"
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 relative z-10 ${
                    isActive && theme !== "fancy" ? "text-[#4f6fdc]" : ""
                  }`} />
                  <span className="text-sm relative z-10">{item.label}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Profile & Logout */}
      <div className="p-4 border-t border-white/10">
        <Link
          to="/profile"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/90 hover:bg-white/10 transition-all duration-200 mb-2 ${
            location.pathname === "/profile" 
              ? theme === "fancy"
                ? "bg-gradient-to-r from-[#4f6fdc] to-[#9333ea] shadow-lg"
                : "bg-white text-[#4f6fdc]"
              : ""
          }`}
        >
          <User className={`w-5 h-5 ${location.pathname === "/profile" && theme !== "fancy" ? "text-[#4f6fdc]" : ""}`} />
          <span className="text-sm">Profile</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/90 hover:bg-red-500/20 transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
