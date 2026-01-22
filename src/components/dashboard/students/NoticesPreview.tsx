import { motion } from "framer-motion";
import { GraduationCap, Calendar, Briefcase, ChevronRight, Bell } from "lucide-react";
import { Link } from "react-router-dom";

interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'academic' | 'event' | 'placement' | 'urgent';
  date: string;
}

interface NoticesPreviewProps {
  notices: Notice[];
}

const getNoticeIcon = (type: string) => {
  switch (type) {
    case 'academic':
      return GraduationCap;
    case 'event':
      return Calendar;
    case 'placement':
      return Briefcase;
    default:
      return Bell;
  }
};

const getNoticeColor = (type: string) => {
  switch (type) {
    case 'academic':
      return "#4f6fdc";
    case 'event':
      return "#49b675";
    case 'placement':
      return "#f39c3d";
    case 'urgent':
      return "#ef4444";
    default:
      return "#6b7280";
  }
};

const NoticesPreview = ({ notices }: NoticesPreviewProps) => {
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
        {notices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No notices available</p>
          </div>
        ) : (
          notices.map((notice, index) => {
            const Icon = getNoticeIcon(notice.type);
            const color = getNoticeColor(notice.type);
            
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
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1f2937] font-medium line-clamp-1">{notice.title}</p>
                  <p className="text-xs text-[#6b7280]">{notice.date}</p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default NoticesPreview;
