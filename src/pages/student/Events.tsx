import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Search,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import TopNavbar from "@/components/layout/TopNavbar";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  image?: string;
}

const Events = () => {
  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Annual Tech Fest",
      description: "Showcase your technical skills and learn from experts",
      date: "2025-02-15",
      time: "09:00 AM",
      location: "Main Auditorium",
      category: "Technical",
      attendees: 250,
    },
    {
      id: "2",
      title: "Cultural Night 2025",
      description: "Experience diverse cultures through performances",
      date: "2025-02-20",
      time: "06:00 PM",
      location: "Open Air Theater",
      category: "Cultural",
      attendees: 500,
    },
    {
      id: "3",
      title: "Sports Championship",
      description: "Inter-department sports competition",
      date: "2025-02-25",
      time: "08:00 AM",
      location: "Sports Complex",
      category: "Sports",
      attendees: 300,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["all", "Technical", "Cultural", "Sports"];
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <TopNavbar title="Campus Events" subtitle="Discover and join exciting events happening on campus" />
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Campus Events
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover and join exciting events happening on campus
          </p>
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
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  filterCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300"
                }`}
              >
                {cat === "all" ? "All Events" : cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Events List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {event.description}
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
                  {event.category}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{event.attendees} attending</span>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  Register
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-300">
              No events found matching your search.
            </p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default Events;
