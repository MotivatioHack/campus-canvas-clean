import { motion } from "framer-motion";
import { GraduationCap, Calendar, Briefcase, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const notices = [
  {
    id: "1",
    type: "academic",
    title: "Mid-Semester Examination Schedule Released",
    date: "Jan 15, 2026",
    icon: GraduationCap,
    color: "#4f6fdc",
  },
  {
    id: "2",
    type: "event",
    title: "Annual Cultural Fest Registration Open",
    date: "Jan 14, 2026",
    icon: Calendar,
    color: "#49b675",
  },
  {
    id: "3",
    type: "placement",
    title: "Google Hiring Drive - Register Now",
    date: "Jan 13, 2026",
    icon: Briefcase,
    color: "#f39c3d",
  },
];

const NoticesPreview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="bg-white rounded-2xl shadow-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#1f2937]">Latest Notices</h3>
        <Link
          to="/notices"
          className="text-xs text-[#4f6fdc] font-medium flex items-center gap-1 hover:underline"
        >
          View All <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-3">
        {notices.map((notice, index) => {
          const Icon = notice.icon;
          
          return (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${notice.color}15` }}
              >
                <Icon className="w-5 h-5" style={{ color: notice.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#1f2937] font-medium line-clamp-1">{notice.title}</p>
                <p className="text-xs text-[#6b7280]">{notice.date}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default NoticesPreview;
