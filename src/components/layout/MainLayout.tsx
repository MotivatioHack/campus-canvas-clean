import { ReactNode } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { useTheme } from "@/context/ThemeContext";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { theme } = useTheme();

  const getBackgroundClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-[#0f0f1a]";
      case "fancy":
        return "bg-gradient-to-br from-[#0a0a14] via-[#0f1629] to-[#1a1a2e]";
      default:
        return "dashboard-bg";
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBackgroundClasses()}`}>
      <Sidebar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="ml-64 min-h-screen"
      >
        <div className="p-6">
          {children}
        </div>
      </motion.main>
    </div>
  );
};

export default MainLayout;
