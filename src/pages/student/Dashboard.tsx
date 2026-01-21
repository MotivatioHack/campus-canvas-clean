import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, Loader2, CheckCircle, MessageSquarePlus, HelpCircle, Bot } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import TopNavbar from "@/components/layout/TopNavbar";
import StatCard from "@/components/dashboard/StatCard";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import ComplaintsTable from "@/components/dashboard/ComplaintsTable";
import ComplaintChart from "@/components/dashboard/ComplaintChart";
import NoticesPreview from "@/components/dashboard/NoticesPreview";
import ComplaintDetailModal from "@/components/dashboard/ComplaintDetailModal";
import { useTheme } from "@/context/ThemeContext";

const stats = [
  { title: "Total Complaints", value: 45, icon: FileText, variant: "blue" as const },
  { title: "Pending", value: 12, icon: Clock, variant: "yellow" as const },
  { title: "In-Progress", value: 8, icon: Loader2, variant: "orange" as const },
  { title: "Resolved", value: 25, icon: CheckCircle, variant: "green" as const },
];

const quickActions = [
  { 
    title: "Raise Complaint", 
    description: "Submit a new complaint or issue", 
    icon: MessageSquarePlus, 
    path: "/raise-complaint" 
  },
  { 
    title: "My Complaints", 
    description: "View and track your complaints", 
    icon: FileText, 
    path: "/my-complaints" 
  },
  { 
    title: "Student Helpdesk", 
    description: "Get help with queries", 
    icon: HelpCircle, 
    path: "/helpdesk" 
  },
  { 
    title: "Campus Chatbot", 
    description: "24/7 AI assistance", 
    icon: Bot, 
    path: "/chatbot" 
  },
];

const recentComplaints = [
  { id: "CMP001", category: "Hostel", subject: "Water supply issue in Block A", status: "Pending" as const, date: "Jan 18, 2026" },
  { id: "CMP002", category: "Exam", subject: "Hall ticket not generated", status: "In-Progress" as const, date: "Jan 17, 2026" },
  { id: "CMP003", category: "Faculty", subject: "Attendance discrepancy", status: "Resolved" as const, date: "Jan 16, 2026" },
  { id: "CMP004", category: "Campus", subject: "Parking lot lighting issue", status: "Pending" as const, date: "Jan 15, 2026" },
  { id: "CMP005", category: "Hostel", subject: "AC not working in room", status: "In-Progress" as const, date: "Jan 14, 2026" },
];

const notifications = [
  { id: "1", type: "complaint" as const, title: "Your complaint CMP002 is being reviewed", time: "2 hours ago", read: false },
  { id: "2", type: "notice" as const, title: "New academic calendar released", time: "5 hours ago", read: false },
  { id: "3", type: "event" as const, title: "Tech Fest 2026 registration open", time: "1 day ago", read: true },
  { id: "4", type: "placement" as const, title: "Microsoft hiring drive next week", time: "2 days ago", read: true },
];

const Dashboard = () => {
  const { theme } = useTheme();
  const [selectedComplaint, setSelectedComplaint] = useState<typeof recentComplaints[0] | null>(null);

  const handleViewComplaint = (id: string) => {
    const complaint = recentComplaints.find(c => c.id === id);
    if (complaint) {
      setSelectedComplaint(complaint);
    }
  };

  return (
    <MainLayout>
      <TopNavbar 
        title="Student Dashboard" 
        subtitle="Welcome back! Here's what's happening today."
        notifications={notifications}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className={`text-lg font-semibold mb-4 ${theme === "light" ? "text-[#1f2937]" : "text-white"}`}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionCard key={action.title} {...action} delay={0.2 + index * 0.1} />
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Complaints Table */}
        <div className="lg:col-span-3">
          <ComplaintsTable complaints={recentComplaints} onView={handleViewComplaint} />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <ComplaintChart />
        <NoticesPreview />
      </div>

      {/* Complaint Detail Modal */}
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
