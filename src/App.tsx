import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

/* =======================
   Public Pages
======================= */
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

/* =======================
   Student Dashboard Pages
======================= */
import Dashboard from "./pages/student/Dashboard";
import RaiseComplaint from "./pages/student/RaiseComplaint";
import MyComplaints from "./pages/student/MyComplaints";
import StudentHelpdesk from "./pages/student/StudentHelpdesk";
import Chatbot from "./pages/Chatbot";

/* =======================
   Query Client
======================= */
const queryClient = new QueryClient();

/* =======================
   App Root
======================= */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <ScrollToTop />

          <Routes>
            {/* ---------- Public Routes ---------- */}
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

            {/* ---------- Student Sub Pages (MUST COME BEFORE /* ROUTE) ---------- */}
            <Route
              path="/dashboard/student/raise-complaint"
              element={
                <ProtectedRoute allowedRole="student">
                  <RaiseComplaint />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/student/my-complaints"
              element={
                <ProtectedRoute allowedRole="student">
                  <MyComplaints />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/student/helpdesk"
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentHelpdesk />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/student/chatbot"
              element={
                <ProtectedRoute allowedRole="student">
                  <Chatbot />
                </ProtectedRoute>
              }
            />

            {/* ---------- Student Dashboard (CATCH-ALL, MUST COME LAST) ---------- */}
            <Route
              path="/dashboard/student/*"
              element={
                <ProtectedRoute allowedRole="student">
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* ---------- 404 ---------- */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
