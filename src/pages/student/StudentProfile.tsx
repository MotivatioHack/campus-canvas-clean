import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import TopNavbar from "@/components/layout/TopNavbar";
import { toast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  department: string;
  enrollmentNumber: string;
  semester: string;
  cgpa: string;
  address: string;
  dob: string;
  gender: string;
}

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@campus.edu",
    phone: "9999988888",
    department: "Computer Science",
    enrollmentNumber: "CS2021001",
    semester: "6",
    cgpa: "8.5",
    address: "123, Main Street, City",
    dob: "2003-05-15",
    gender: "Male",
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const profileSections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Full Name", key: "name", type: "text" },
        { label: "Email", key: "email", type: "email" },
        { label: "Phone", key: "phone", type: "tel" },
        { label: "Date of Birth", key: "dob", type: "date" },
        { label: "Gender", key: "gender", type: "text" },
        { label: "Address", key: "address", type: "text" },
      ],
    },
    {
      title: "Academic Information",
      fields: [
        { label: "Department", key: "department", type: "text" },
        { label: "Enrollment Number", key: "enrollmentNumber", type: "text" },
        { label: "Current Semester", key: "semester", type: "text" },
        { label: "CGPA", key: "cgpa", type: "number" },
      ],
    },
  ];

  return (
    <MainLayout>
      <TopNavbar title="Student Profile" subtitle="Manage your personal and academic information" />
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Student Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your personal and academic information
            </p>
          </div>
          {!isEditing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Edit2 className="w-5 h-5" />
              Edit Profile
            </motion.button>
          )}
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700 mb-8"
        >
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {profile.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {profile.department} • {profile.enrollmentNumber}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Semester {profile.semester} • CGPA: {profile.cgpa}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {profile.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Phone</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {profile.phone}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <MapPin className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Address</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {profile.address}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Sections */}
        {!isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {profileSections.map((section, sectionIdx) => (
              <motion.div
                key={sectionIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + sectionIdx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.fields.map((field) => (
                    <div key={field.key}>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
                        {field.label}
                      </label>
                      <p className="text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        {profile[field.key as keyof UserProfile]}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Edit Form */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {profileSections.map((section, sectionIdx) => (
              <motion.div
                key={sectionIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + sectionIdx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.fields.map((field) => (
                    <div key={field.key}>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={editedProfile[field.key as keyof UserProfile]}
                        onChange={(e) =>
                          handleInputChange(
                            field.key as keyof UserProfile,
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default StudentProfile;
