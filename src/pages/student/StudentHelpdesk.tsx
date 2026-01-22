import { motion } from "framer-motion";
import { HelpCircle, Phone, Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import TopNavbar from "@/components/layout/TopNavbar";

const StudentHelpdesk = () => {
  const helpCategories = [
    {
      title: "Academic Support",
      description: "Course registration, grades, transcripts",
      icon: HelpCircle,
      color: "#4f6fdc",
      contact: "academic@campus.edu"
    },
    {
      title: "Technical Support",
      description: "IT issues, portal access, password reset",
      icon: MessageCircle,
      color: "#49b675",
      contact: "tech@campus.edu"
    },
    {
      title: "Financial Aid",
      description: "Fee payment, scholarships, financial queries",
      icon: Phone,
      color: "#f39c3d",
      contact: "finance@campus.edu"
    },
    {
      title: "General Queries",
      description: "Campus facilities, events, general information",
      icon: Mail,
      color: "#9333ea",
      contact: "info@campus.edu"
    }
  ];

  const contactInfo = [
    {
      type: "Phone",
      value: "+1 (555) 123-4567",
      icon: Phone,
      available: "Mon-Fri, 9 AM - 6 PM"
    },
    {
      type: "Email",
      value: "helpdesk@campus.edu",
      icon: Mail,
      available: "24/7 Response within 24 hours"
    },
    {
      type: "Office",
      value: "Student Services Building, Room 101",
      icon: MapPin,
      available: "Mon-Fri, 8 AM - 5 PM"
    }
  ];

  return (
    <MainLayout>
      <TopNavbar 
        title="Student Helpdesk" 
        subtitle="Get help and support for all your academic needs" 
      />

      {/* Help Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        {helpCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-card p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: category.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500">{category.contact}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-card p-6 mb-8"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <div key={contact.type} className="text-center">
                <div className="w-16 h-16 bg-[#4f6fdc]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-[#4f6fdc]" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{contact.type}</h4>
                <p className="text-gray-700 font-medium mb-1">{contact.value}</p>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{contact.available}</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-card p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            {
              question: "How do I reset my student portal password?",
              answer: "Visit the login page and click 'Forgot Password'. Enter your student email and follow the instructions sent to your inbox."
            },
            {
              question: "Where can I find my class schedule?",
              answer: "Your class schedule is available in the student portal under 'Academic' > 'Schedule'. You can also download it as a PDF."
            },
            {
              question: "How do I submit a complaint or feedback?",
              answer: "Use the 'Raise Complaint' feature in your dashboard. Select the appropriate category and provide detailed information."
            },
            {
              question: "What are the library hours?",
              answer: "The library is open Monday-Friday 8 AM - 10 PM, Saturday 9 AM - 6 PM, and Sunday 12 PM - 8 PM."
            }
          ].map((faq, index) => (
            <div key={index} className="border border-gray-100 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default StudentHelpdesk;