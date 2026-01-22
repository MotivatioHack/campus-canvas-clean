import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Vote, ChevronRight } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import TopNavbar from "@/components/layout/TopNavbar";
import { toast } from "@/hooks/use-toast";

interface Poll {
  id: string;
  title: string;
  description: string;
  options: { id: string; text: string; votes: number }[];
  totalVotes: number;
  endDate: string;
  voted: boolean;
}

const Polling = () => {
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: "1",
      title: "Preferred Exam Schedule",
      description: "When would you prefer your semester exams?",
      options: [
        { id: "opt1", text: "Morning (8 AM - 12 PM)", votes: 145 },
        { id: "opt2", text: "Afternoon (2 PM - 6 PM)", votes: 210 },
        { id: "opt3", text: "Evening (6 PM - 10 PM)", votes: 85 },
      ],
      totalVotes: 440,
      endDate: "2025-02-28",
      voted: false,
    },
    {
      id: "2",
      title: "Campus Food Preference",
      description: "What type of food would you like more of in the cafeteria?",
      options: [
        { id: "opt1", text: "Indian Cuisine", votes: 320 },
        { id: "opt2", text: "Continental", votes: 190 },
        { id: "opt3", text: "Asian Cuisine", votes: 275 },
        { id: "opt4", text: "Fast Food", votes: 115 },
      ],
      totalVotes: 900,
      endDate: "2025-03-05",
      voted: true,
    },
  ]);

  const handleVote = (pollId: string, optionId: string) => {
    setPolls(
      polls.map((poll) => {
        if (poll.id === pollId && !poll.voted) {
          return {
            ...poll,
            voted: true,
            options: poll.options.map((opt) =>
              opt.id === optionId
                ? { ...opt, votes: opt.votes + 1 }
                : opt
            ),
            totalVotes: poll.totalVotes + 1,
          };
        }
        return poll;
      })
    );
    toast({
      title: "Vote Recorded",
      description: "Thank you for your response!",
    });
  };

  return (
    <MainLayout>
      <TopNavbar title="Campus Polls" subtitle="Share your opinion and influence campus decisions" />
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Campus Polls
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Share your opinion and influence campus decisions
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Vote className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Active Polls
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {polls.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Participants
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {polls.reduce((sum, p) => sum + p.totalVotes, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Completed
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {polls.filter((p) => p.voted).length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Polls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {polls.map((poll, idx) => (
            <motion.div
              key={poll.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {poll.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {poll.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Ends: {poll.endDate} • Total votes: {poll.totalVotes}
                </p>
              </div>

              <div className="space-y-4">
                {poll.options.map((option) => {
                  const percentage = Math.round(
                    (option.votes / poll.totalVotes) * 100
                  );
                  return (
                    <div key={option.id}>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-900 dark:text-white">
                          {option.text}
                        </label>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                          {percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                          className="bg-blue-600 h-2 rounded-full"
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          {option.votes} votes
                        </span>
                        {!poll.voted && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleVote(poll.id, option.id)}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Vote
                          </motion.button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {poll.voted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <p className="text-sm text-green-700 dark:text-green-300">
                    ✓ You have voted in this poll
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Polling;
