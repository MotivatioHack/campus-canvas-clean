import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Clock,
  Loader2,
  CheckCircle,
  MessageSquarePlus,
  HelpCircle,
  Bot,
} from "lucide-react";

import MainLayout from "@/components/layout/MainLayout";
import TopNavbar from "@/components/layout/TopNavbar";

import StatCard from "@/components/dashboard/students/StatCard";
import QuickActionCard from "@/components/dashboard/students/QuickActionCard";
import ComplaintsTable from "@/components/dashboard/students/ComplaintsTable";
import ComplaintChart from "@/components/dashboard/students/ComplaintChart";
import NoticesPreview from "@/components/dashboard/students/NoticesPreview";
import ComplaintDetailModal from "@/components/dashboard/students/ComplaintDetailModal";

import { useStudentDashboardTheme } from "@/context/StudentDashboardThemeContext";
import { dashboardAPI } from "@/modules/student/services/api";
import { toast } from "@/hooks/use-toast";

/* =======================
   DASHBOARD DATA & STATE
======================= */

const quickActions = [
  {
    title: "Raise Complaint",
    description: "Submit a new complaint or issue",
    icon: MessageSquarePlus,
    path: "/dashboard/student/raise-complaint",
  },
  {
    title: "My Complaints",
    description: "View and track your complaints",
    icon: FileText,
    path: "/dashboard/student/my-complaints",
  },
  {
    title: "Student Helpdesk",
    description: "Get help with queries",
    icon: HelpCircle,
    path: "/dashboard/student/helpdesk",
  },
  {
    title: "Campus Chatbot",
    description: "24/7 AI assistance",
    icon: Bot,
    path: "/dashboard/student/chatbot",
  },
];

/* =======================
   DASHBOARD COMPONENT
======================= */
const Dashboard = () => {
  const { theme } = useStudentDashboardTheme();
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: { total: 0, pending: 0, inProgress: 0, resolved: 0 },
    recentComplaints: [],
    notices: [],
    notifications: [],
    unreadCount: 0,
  });

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await dashboardAPI.getDashboardData();
        setDashboardData(response.data);
      } catch (error: any) {
        console.error('Dashboard data fetch error:', error);
        // Don't show error toast - allow dashboard to load with empty data
        // This prevents blocking the dashboard when API fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Create stats array from API data
  const stats = [
    { title: "Total Complaints", value: dashboardData.stats.total, icon: FileText, variant: "blue" as const },
    { title: "Pending", value: dashboardData.stats.pending, icon: Clock, variant: "yellow" as const },
    { title: "In-Progress", value: dashboardData.stats.inProgress, icon: Loader2, variant: "orange" as const },
    { title: "Resolved", value: dashboardData.stats.resolved, icon: CheckCircle, variant: "green" as const },
  ];

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

  const handleViewComplaint = (id: string) => {
    const complaint = dashboardData.recentComplaints.find((c: any) => c.complaint_id === id);
    if (complaint) setSelectedComplaint(complaint);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#4f6fdc] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <TopNavbar
        title="Student Dashboard"
        subtitle="Welcome back! Here's what's happening today."
        notifications={dashboardData.notifications}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2
          className={`text-lg font-semibold mb-4 ${
            theme === "light" ? "text-[#1f2937]" : "text-white"
          }`}
        >
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={action.title}
              {...action}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Complaints Table */}
      <div className="grid grid-cols-1 gap-6">
        <ComplaintsTable
          complaints={dashboardData.recentComplaints}
          onView={handleViewComplaint}
        />
      </div>

      {/* Charts & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <ComplaintChart />
        <NoticesPreview notices={dashboardData.notices} />
      </div>

      {/* Complaint Modal */}
      {selectedComplaint && (
        <ComplaintDetailModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </MainLayout>
  );
};

export default Dashboard;
