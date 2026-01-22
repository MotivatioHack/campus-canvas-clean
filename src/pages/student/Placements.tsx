import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  BookOpen,
  TrendingUp,
  ChevronRight,
  Search,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import TopNavbar from "@/components/layout/TopNavbar";
import { toast } from "@/hooks/use-toast";

interface Opportunity {
  id: string;
  company: string;
  position: string;
  type: "Full-time" | "Internship" | "Part-time";
  salary: string;
  location: string;
  department: string;
  posted: string;
  description: string;
  applied: boolean;
}

const Placements = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: "1",
      company: "Google",
      position: "Software Engineer",
      type: "Full-time",
      salary: "₹25,00,000 - ₹35,00,000",
      location: "Bangalore",
      department: "Computer Science",
      posted: "2025-01-20",
      description: "Join Google's engineering team and work on cutting-edge projects",
      applied: false,
    },
    {
      id: "2",
      company: "Microsoft",
      position: "Cloud Solutions Internship",
      type: "Internship",
      salary: "₹50,000/month",
      location: "Hyderabad",
      department: "IT",
      posted: "2025-01-19",
      description: "Learn cloud technologies and contribute to real projects",
      applied: true,
    },
    {
      id: "3",
      company: "Goldman Sachs",
      position: "Analyst",
      type: "Full-time",
      salary: "₹20,00,000 - ₹30,00,000",
      location: "Mumbai",
      department: "Business",
      posted: "2025-01-18",
      description: "Financial analysis and trading platform development",
      applied: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const types = ["all", "Full-time", "Internship", "Part-time"];
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || opp.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleApply = (id: string) => {
    setOpportunities(
      opportunities.map((opp) =>
        opp.id === id ? { ...opp, applied: true } : opp
      )
    );
    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully.",
    });
  };

  const stats = [
    {
      icon: Briefcase,
      label: "Active Opportunities",
      value: opportunities.length,
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-300",
    },
    {
      icon: Users,
      label: "Placed Students",
      value: "89%",
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-300",
    },
    {
      icon: TrendingUp,
      label: "Avg Package",
      value: "₹18 LPA",
      color: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-300",
    },
  ];

  return (
    <MainLayout>
      <TopNavbar title="Placements & Careers" subtitle="Explore job opportunities and internships" />
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Placements & Careers
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore job opportunities and internships
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`${stat.color} rounded-lg p-4 border border-gray-200 dark:border-gray-700`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search companies or positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {types.map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  filterType === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300"
                }`}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Opportunities List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {filteredOpportunities.map((opp, idx) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {opp.position}
                    </h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-semibold">
                      {opp.type}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {opp.company}
                  </p>
                </div>
                {opp.applied && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-semibold">
                    Applied
                  </span>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {opp.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {opp.salary}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {opp.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {opp.department}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Posted: {opp.posted}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleApply(opp.id)}
                disabled={opp.applied}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  opp.applied
                    ? "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {opp.applied ? "Already Applied" : "Apply Now"}
                {!opp.applied && <ChevronRight className="w-4 h-4" />}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {filteredOpportunities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-300">
              No opportunities found matching your search.
            </p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default Placements;
