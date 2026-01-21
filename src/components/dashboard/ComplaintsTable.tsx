import { motion } from "framer-motion";
import { Eye } from "lucide-react";

interface Complaint {
  id: string;
  category: string;
  subject: string;
  status: "Pending" | "In-Progress" | "Resolved";
  date: string;
}

interface ComplaintsTableProps {
  complaints: Complaint[];
  onView?: (id: string) => void;
}

const statusClasses = {
  "Pending": "badge-pending",
  "In-Progress": "badge-progress",
  "Resolved": "badge-resolved",
};

const ComplaintsTable = ({ complaints, onView }: ComplaintsTableProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-card overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-[#1f2937]">Recent Complaints</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-[#6b7280]">ID</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-[#6b7280]">Category</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-[#6b7280]">Subject</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-[#6b7280]">Date</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-[#6b7280]">Status</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-[#6b7280]">Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <motion.tr
                key={complaint.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-4 px-6 text-sm font-medium text-[#4f6fdc]">{complaint.id}</td>
                <td className="py-4 px-6 text-sm text-[#1f2937]">{complaint.category}</td>
                <td className="py-4 px-6 text-sm text-[#6b7280]">{complaint.subject}</td>
                <td className="py-4 px-6 text-sm text-[#6b7280]">{complaint.date}</td>
                <td className="py-4 px-6">
                  <span className={`${statusClasses[complaint.status]} px-3 py-1 rounded-full text-xs font-medium`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => onView?.(complaint.id)}
                    className="p-2 rounded-lg hover:bg-[#4f6fdc]/10 transition-colors group"
                  >
                    <Eye className="w-4 h-4 text-[#6b7280] group-hover:text-[#4f6fdc]" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ComplaintsTable;
