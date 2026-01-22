import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Eye, Trash2, MapPin, Clock } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import TopNavbar from "@/components/layout/TopNavbar";
import { toast } from "@/hooks/use-toast";

interface LostItem {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  contact: string;
  image?: string;
  status: "open" | "claimed";
}

const LostAndFound = () => {
  const [items, setItems] = useState<LostItem[]>([
    {
      id: "1",
      title: "Black Backpack",
      description: "Dell backpack with laptop",
      category: "Accessories",
      location: "Library",
      date: "2025-01-20",
      contact: "9999988888",
      status: "open",
    },
    {
      id: "2",
      title: "Gold Watch",
      description: "Fossil watch, gold colored",
      category: "Accessories",
      location: "Cafeteria",
      date: "2025-01-19",
      contact: "9999966666",
      status: "open",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || item.status === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleReportItem = () => {
    toast({
      title: "Report Submitted",
      description: "Your lost/found item has been reported.",
    });
    setShowModal(false);
  };

  return (
    <MainLayout>
      <TopNavbar title="Lost & Found" subtitle="Report and track lost or found items on campus" />
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Lost & Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Report and track lost or found items on campus
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex gap-4 flex-wrap"
        >
          <div className="flex-1 min-w-72 relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="all">All Items</option>
            <option value="open">Open</option>
            <option value="claimed">Claimed</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Report Item
          </motion.button>
        </motion.div>

        {/* Items Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.status === "open"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  {item.status === "open" ? "Open" : "Claimed"}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {item.description}
              </p>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {item.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {item.date}
                </div>
              </div>
              <button
                onClick={() =>
                  toast({
                    title: "Contact",
                    description: `Contact: ${item.contact}`,
                  })
                }
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Contact Owner
              </button>
            </motion.div>
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-300">
              No items found matching your search.
            </p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default LostAndFound;
