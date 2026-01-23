import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, CheckCircle, Loader2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import TopNavbar from "@/components/layout/TopNavbar";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";
import { eventAPI } from "@/modules/student/services/api";

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  type: string;
  registered: boolean;
  attendees: number;
  description: string;
}

const typeColors: Record<string, string> = {
  Technical: "#4f6fdc",
  Cultural: "#f39c3d",
  Sports: "#49b675",
  Networking: "#9333ea",
  Workshop: "#0ea5e9",
  "Guest Lecture": "#ec4899",
  Seminar: "#4f6fdc",
  Fest: "#f39c3d",
  Holiday: "#49b675",
  Other: "#6b7280"
};

const Events = () => {
  const { theme } = useTheme();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Fetch all events from the backend on load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await eventAPI.getAll();
        
        const formattedEvents = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.title,
          date: new Date(item.event_date).toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
          }),
          time: new Date(item.event_date).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          venue: item.location || "To be announced",
          type: item.event_type,
          registered: Boolean(item.is_registered), // Real data from DB Join
          attendees: 0,
          description: item.description
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Failed to load events:", error);
        toast({
          title: "Error",
          description: "Could not load events from server.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = async (eventId: string, eventName: string) => {
    try {
      // 1. Call the backend API
      await eventAPI.register(eventId);

      // 2. Update local state so button changes immediately
      setEvents(prevEvents => prevEvents.map(event => 
        event.id === eventId ? { ...event, registered: true } : event
      ));

      toast({
        title: "Success!",
        description: `You are now registered for ${eventName}.`,
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  // Logic for the new "Registered" filter + Type filters
  const filteredEvents = filter === "all" 
    ? events 
    : filter === "registered"
      ? events.filter(e => e.registered)
      : events.filter(e => e.type.toLowerCase() === filter.toLowerCase());

  const getCardClasses = () => {
    switch (theme) {
      case "dark": return "bg-[#1a1a2e]";
      case "fancy": return "bg-gradient-to-br from-[#16213e] to-[#1a1a2e] border border-[#4f6fdc]/20";
      default: return "bg-white shadow-card";
    }
  };

  const filterOptions = ["all", "registered", "technical", "cultural", "sports", "workshop", "fest"];

  return (
    <MainLayout>
      <TopNavbar title="College Events" subtitle="View campus activities and manage registrations" />

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-2 mb-6"
      >
        {filterOptions.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              filter === type
                ? "bg-[#4f6fdc] text-white"
                : theme === "light"
                  ? "bg-white text-[#6b7280] hover:bg-gray-100 shadow-sm"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            {type}
          </button>
        ))}
      </motion.div>

      {/* Grid Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-60">
          <Loader2 className="w-10 h-10 animate-spin text-[#4f6fdc] mb-4" />
          <p>Loading your events...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`rounded-2xl overflow-hidden hover:shadow-card-hover transition-shadow ${getCardClasses()}`}
              >
                <div
                  className="h-2"
                  style={{ backgroundColor: typeColors[event.type] || "#4f6fdc" }}
                />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${typeColors[event.type] || "#4f6fdc"}15`, 
                        color: typeColors[event.type] || "#4f6fdc" 
                      }}
                    >
                      {event.type}
                    </span>
                    {event.registered && (
                      <span className="flex items-center gap-1 text-xs text-[#49b675] bg-[#49b675]/10 px-2 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        Registered
                      </span>
                    )}
                  </div>

                  <h3 className={`text-lg font-semibold mb-2 ${theme === "light" ? "text-[#1f2937]" : "text-white"}`}>
                    {event.name}
                  </h3>
                  <p className={`text-sm mb-4 line-clamp-2 ${theme === "light" ? "text-[#6b7280]" : "text-white/60"}`}>
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className={`flex items-center gap-2 text-sm ${theme === "light" ? "text-[#6b7280]" : "text-white/60"}`}>
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${theme === "light" ? "text-[#6b7280]" : "text-white/60"}`}>
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${theme === "light" ? "text-[#6b7280]" : "text-white/60"}`}>
                      <MapPin className="w-4 h-4" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  {!event.registered ? (
                    <button
                      onClick={() => handleRegister(event.id, event.name)}
                      className="w-full py-3 rounded-xl font-medium bg-[#4f6fdc] text-white hover:bg-[#4560c7] transition-colors"
                    >
                      Register Now
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl font-medium bg-[#49b675]/10 text-[#49b675] cursor-not-allowed"
                    >
                      Already Registered
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 opacity-50">
              <p>No events found in this category.</p>
            </div>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default Events;