import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop"; // Added the Fix Import

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutPlatform from "./pages/AboutPlatform";
import Services from "./pages/Services";
import Campus from "./pages/Campus";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Help from "./pages/Help";
import Feedback from "./pages/Feedback";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import LatestNews from "./pages/LatestNews";
import Holidays from "./pages/Holidays";
import NotFound from "./pages/NotFound";

// Simple Placeholder Dashboard Components
const StudentDashboard = () => <div className="p-8 text-2xl">Student Dashboard – Placeholder</div>;
const FacultyDashboard = () => <div className="p-8 text-2xl">Faculty Dashboard – Placeholder</div>;
const AdminDashboard = () => <div className="p-8 text-2xl">Admin Dashboard – Placeholder</div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* MANDATORY FIX: This component resets scroll to top on every route change.
              Place it inside BrowserRouter but outside of Routes. 
          */}
          <ScrollToTop />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about-platform" element={<AboutPlatform />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<Services />} />
            <Route path="/campus" element={<Campus />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:blogId" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/help" element={<Help />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/latest-news" element={<LatestNews />} />
            <Route path="/holidays" element={<Holidays />} />

            {/* Protected Role-Based Routes */}
            <Route 
              path="/dashboard/student" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/faculty" 
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/admin" 
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;