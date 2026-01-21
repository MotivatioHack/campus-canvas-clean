import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

const services = [
  {
    id: 'hostel-complaints',
    title: 'Hostel Complaints',
    description: 'Submit and track hostel-related issues efficiently',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'student-helpdesk',
    title: 'Student Helpdesk',
    description: 'Get quick support for all your queries',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'student-clubs',
    title: 'Student Clubs',
    description: 'Explore and join various campus clubs',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'digital-notices',
    title: 'Digital Notices',
    description: 'Stay updated with all campus announcements',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'campus-events',
    title: 'Campus Events',
    description: 'Discover and participate in campus activities',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'from-red-500 to-rose-500',
  },
  {
    id: 'placements',
    title: 'Placements',
    description: 'Career opportunities and placement updates',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'from-indigo-500 to-violet-500',
  },
  {
    id: 'scholarships',
    title: 'Scholarships',
    description: 'Financial aid and scholarship opportunities',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-teal-500 to-cyan-500',
  },
];

export default function Services() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              All Services
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
            >
              Explore Campus <span className="text-gradient">Services</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Everything you need to navigate campus life, all in one place
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Link key={service.id} to={`/services/${service.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
                    className="glass-card p-8 h-full cursor-pointer group"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h3 className="font-display font-semibold text-xl mb-3">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                    <div className="mt-4 flex items-center text-primary font-medium">
                      Learn more
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </motion.div>
  );
}
