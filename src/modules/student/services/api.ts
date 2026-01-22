const API_BASE_URL = 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create headers with auth token
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// Generic API request function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: getAuthHeaders(),
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Complaint API functions
export const complaintAPI = {
  // Submit new complaint
  create: async (complaintData: {
    category: string;
    subCategory: string;
    subject: string;
    description: string;
  }) => {
    return apiRequest('/student/complaints', {
      method: 'POST',
      body: JSON.stringify(complaintData),
    });
  },

  // Get user's complaints with pagination
  getAll: async (page: number = 1, limit: number = 10) => {
    return apiRequest(`/student/complaints?page=${page}&limit=${limit}`);
  },

  // Get complaint statistics
  getStats: async () => {
    return apiRequest('/student/complaints/stats');
  },

  // Get recent complaints for dashboard
  getRecent: async (limit: number = 5) => {
    return apiRequest(`/student/complaints/recent?limit=${limit}`);
  },

  // Get specific complaint by ID
  getById: async (complaintId: string) => {
    return apiRequest(`/student/complaints/${complaintId}`);
  },
};

// Notice API functions
export const noticeAPI = {
  // Get active notices
  getAll: async (limit: number = 10) => {
    return apiRequest(`/student/notices?limit=${limit}`);
  },
};

// Notification API functions
export const notificationAPI = {
  // Get user notifications
  getAll: async (limit: number = 20) => {
    return apiRequest(`/student/notifications?limit=${limit}`);
  },

  // Mark notification as read
  markAsRead: async (notificationId: string) => {
    return apiRequest(`/student/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    return apiRequest('/student/notifications/read-all', {
      method: 'PUT',
    });
  },
};

// Dashboard API functions
export const dashboardAPI = {
  // Get dashboard data (stats + recent complaints + notices)
  getDashboardData: async () => {
    try {
      const [stats, recentComplaints, notices, notifications] = await Promise.all([
        complaintAPI.getStats(),
        complaintAPI.getRecent(5),
        noticeAPI.getAll(3),
        notificationAPI.getAll(10),
      ]);

      return {
        success: true,
        data: {
          stats: stats.stats,
          recentComplaints: recentComplaints.complaints,
          notices: notices.notices,
          notifications: notifications.notifications,
          unreadCount: notifications.unreadCount,
        },
      };
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      throw error;
    }
  },
};

export default {
  complaint: complaintAPI,
  notice: noticeAPI,
  notification: notificationAPI,
  dashboard: dashboardAPI,
};