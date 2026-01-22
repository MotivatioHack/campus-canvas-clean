import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Search, X, Archive, Eye } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import TopNavbar from "@/components/layout/TopNavbar";

interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  department: string;
  priority: "low" | "medium" | "high";
  read: boolean;
}

const Notices = () => {
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: "1",
      title: "Semester End Examination Schedule Released",
      content:
        "The semester end examination schedule for Spring 2025 has been released. Please check your department portal for details.",
      category: "Academic",
      date: "2025-01-22",
      department: "Academic",
      priority: "high",
      read: false,
    },
    {
      id: "2",
      title: "Library Renovation - Closure Notice",
      content:
        "The central library will be closed for renovation from Feb 1 to Feb 15. Digital resources remain accessible.",
      category: "Administration",
      date: "2025-01-21",
      department: "Facilities",
      priority: "medium",
      read: false,
    },
    {
      id: "3",
      title: "Scholarship Applications Now Open",
      content:
        "Merit and needs-based scholarship applications for the next academic year are now open. Deadline: March 31, 2025.",
      category: "Financial Aid",
      date: "2025-01-20",
      department: "Student Services",
      priority: "high",
      read: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterRead, setFilterRead] = useState("all");

  const categories = ["all", "Academic", "Administration", "Financial Aid"];

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || notice.category === filterCategory;
    const matchesRead =
      filterRead === "all" ||
      (filterRead === "unread" && !notice.read) ||
      (filterRead === "read" && notice.read);
    return matchesSearch && matchesCategory && matchesRead;
  });

  const unreadCount = notices.filter((n) => !n.read).length;

  const toggleRead = (id: string) => {
    setNotices(
      notices.map((notice) =>
        notice.id === id ? { ...notice, read: !notice.read } : notice
      )
    );
  };

  const deleteNotice = (id: string) => {
    setNotices(notices.filter((notice) => notice.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50 dark:bg-red-900/20";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      case "low":
        return "border-l-green-500 bg-green-50 dark:bg-green-900/20";
      default:
        return "";
    }
  };

  return (
    <MainLayout>
      <TopNavbar title="Notices & Announcements" subtitle="Stay updated with important campus announcements" />
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Notices & Announcements
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Stay updated with important campus announcements
              </p>
            </div>
            {unreadCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full">
                <Bell className="w-4 h-4" />
                <span className="text-sm font-semibold">{unreadCount} New</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <div className="flex gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                Category:
              </label>
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    filterCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            <div className="flex gap-2 ml-auto">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                Status:
              </label>
              {["all", "unread", "read"].map((status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterRead(status)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    filterRead === status
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {status === "all" ? "All" : status === "unread" ? "Unread" : "Read"}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Notices List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {filteredNotices.map((notice, idx) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`border-l-4 rounded-lg shadow-md p-6 transition-all ${getPriorityColor(
                notice.priority
              )} ${!notice.read ? "border border-blue-200 dark:border-blue-800" : "border border-gray-200 dark:border-gray-700"}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      className={`text-lg font-semibold ${
                        notice.read
                          ? "text-gray-900 dark:text-white"
                          : "text-blue-900 dark:text-blue-100 font-bold"
                      }`}
                    >
                      {notice.title}
                    </h3>
                    {!notice.read && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                    <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
                      {notice.category}
                    </span>
                    <span>{notice.date}</span>
                    <span className="text-gray-500">•</span>
                    <span>{notice.department}</span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    notice.priority === "high"
                      ? "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : notice.priority === "medium"
                        ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }`}
                >
                  {notice.priority === "high"
                    ? "Urgent"
                    : notice.priority === "medium"
                      ? "Medium"
                      : "Low"}
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {notice.content}
              </p>

              <div className="flex gap-2 justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleRead(notice.id)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  {notice.read ? (
                    <>
                      <Bell className="w-4 h-4" />
                      Mark Unread
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Mark Read
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteNotice(notice.id)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800"
                >
                  <X className="w-4 h-4" />
                  Archive
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredNotices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-300">
              No notices found matching your search.
            </p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default Notices;
