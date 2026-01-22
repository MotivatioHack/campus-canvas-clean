import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, MapPin, Mail, Phone, Share2, Search } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import TopNavbar from "@/components/layout/TopNavbar";

interface Club {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  location: string;
  contact: string;
  image?: string;
}

const StudentClubs = () => {
  const [clubs] = useState<Club[]>([
    {
      id: "1",
      name: "Coding Club",
      description: "Learn programming and competitive coding",
      members: 150,
      category: "Technical",
      location: "CS Building - Room 101",
      contact: "coding@campus.edu",
    },
    {
      id: "2",
      name: "Debate Society",
      description: "Enhance public speaking and debate skills",
      members: 85,
      category: "Cultural",
      location: "Audi Hall",
      contact: "debate@campus.edu",
    },
    {
      id: "3",
      name: "Photography Club",
      description: "Explore the art of photography",
      members: 120,
      category: "Arts",
      location: "Media Lab",
      contact: "photo@campus.edu",
    },
    {
      id: "4",
      name: "Sports Club",
      description: "Various sports and fitness activities",
      members: 300,
      category: "Sports",
      location: "Sports Complex",
      contact: "sports@campus.edu",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["all", "Technical", "Cultural", "Arts", "Sports"];
  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || club.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <TopNavbar title="Student Clubs" subtitle="Join clubs and connect with like-minded students" />
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Student Clubs
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Join clubs and connect with like-minded students
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
              placeholder="Search clubs..."
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
                {cat === "all" ? "All Clubs" : cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Clubs Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredClubs.map((club, idx) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {club.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {club.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{club.members} members</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{club.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{club.contact}</span>
                </div>
              </div>

              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-xs font-medium mb-4">
                {club.category}
              </span>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Join Club
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredClubs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-300">
              No clubs found matching your search.
            </p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default StudentClubs;
