# Student Dashboard - Menu Items & Routes

## Complete Menu Navigation

All menu items are now fully integrated and clickable. Here's the complete mapping:

### Primary Navigation (Sidebar)

| Menu Item | Route | File | Status |
|-----------|-------|------|--------|
| **Dashboard** | `/dashboard/student` | `pages/student/Dashboard.tsx` | ✅ Working |
| **Raise Complaint** | `/dashboard/student/raise-complaint` | `pages/student/RaiseComplaint.tsx` | ✅ Working |
| **My Complaints** | `/dashboard/student/my-complaints` | `pages/student/MyComplaints.tsx` | ✅ Working |
| **Student Helpdesk** | `/dashboard/student/helpdesk` | `pages/student/StudentHelpdesk.tsx` | ✅ Working |
| **Lost & Found** | `/dashboard/student/lost-found` | `pages/student/LostAndFound.tsx` | ✅ NEW |
| **Events** | `/dashboard/student/events` | `pages/student/Events.tsx` | ✅ NEW |
| **Student Clubs** | `/dashboard/student/clubs` | `pages/student/StudentClubs.tsx` | ✅ NEW |
| **Polling** | `/dashboard/student/polling` | `pages/student/Polling.tsx` | ✅ NEW |
| **Placements** | `/dashboard/student/placements` | `pages/student/Placements.tsx` | ✅ NEW |
| **Notices** | `/dashboard/student/notices` | `pages/student/Notices.tsx` | ✅ NEW |
| **Chatbot** | `/dashboard/student/chatbot` | `pages/Chatbot.tsx` | ✅ Working |

### Secondary Navigation (Profile Area)

| Menu Item | Route | File | Status |
|-----------|-------|------|--------|
| **Profile** | `/dashboard/student/profile` | `pages/student/StudentProfile.tsx` | ✅ NEW |
| **Logout** | Navigation to `/` | - | ✅ Working |

---

## How the Dashboard Works

### 1. Entry Point
When a student logs in and clicks "Student Dashboard" or accesses `/dashboard/student`:
- The student is redirected to the Dashboard main page
- The Sidebar component loads with all menu items
- Each menu item is a clickable link

### 2. Navigation Flow
1. User is on a page (e.g., Dashboard)
2. User clicks a menu item in the Sidebar
3. React Router navigates to the corresponding route
4. The new page component loads with MainLayout
5. The page displays within the Sidebar layout

### 3. Route Protection
All student dashboard routes are protected by:
```tsx
<ProtectedRoute allowedRole="student">
  <ComponentName />
</ProtectedRoute>
```

This ensures:
- Only logged-in students can access
- Non-students are redirected
- Proper authentication is enforced

---

## Quick Links for Testing

### To Test Navigation:
1. Login as a student
2. Navigate to `/dashboard/student` (main dashboard)
3. Click each menu item in the sidebar
4. Verify each page loads correctly
5. Verify no 404 errors occur

### Expected Behavior:
- ✅ All links are clickable
- ✅ Navigation is instant
- ✅ No 404 pages shown
- ✅ Sidebar always visible
- ✅ TopNavbar always visible
- ✅ Content updates based on selected menu item

---

## Sidebar Component Details

**File**: `src/components/layout/Sidebar.tsx`

### Features:
- Fixed left sidebar (width: 264px)
- Student profile card at top
- Scrollable menu items
- Active item highlighting
- Profile and Logout buttons at bottom
- Theme-aware styling (light/dark/fancy)
- Smooth animations

### Menu Items Array:
```tsx
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/student" },
  { icon: MessageSquarePlus, label: "Raise Complaint", path: "/dashboard/student/raise-complaint" },
  { icon: FileText, label: "My Complaints", path: "/dashboard/student/my-complaints" },
  { icon: HelpCircle, label: "Student Helpdesk", path: "/dashboard/student/helpdesk" },
  { icon: Search, label: "Lost & Found", path: "/dashboard/student/lost-found" },
  { icon: Calendar, label: "Events", path: "/dashboard/student/events" },
  { icon: Users, label: "Student Clubs", path: "/dashboard/student/clubs" },
  { icon: Vote, label: "Polling", path: "/dashboard/student/polling" },
  { icon: Briefcase, label: "Placements", path: "/dashboard/student/placements" },
  { icon: Bell, label: "Notices", path: "/dashboard/student/notices" },
  { icon: Bot, label: "Chatbot", path: "/dashboard/student/chatbot" },
];
```

---

## Troubleshooting

### Issue: 404 Error When Clicking a Menu Item
**Solution**: 
- Check that the route is defined in `App.tsx`
- Verify the route path matches exactly
- Ensure the component is imported
- Check for typos in the path

### Issue: Menu Item Not Highlighting
**Solution**:
- Verify the current location matches the menu path
- Check that useLocation() hook is working
- Ensure React Router is properly configured

### Issue: Page Not Loading
**Solution**:
- Check browser console for errors
- Verify component is exporting correctly
- Check that MainLayout and TopNavbar are imported
- Verify all required dependencies are installed

---

## Component Structure for Each Page

Every new page follows this structure:

```tsx
import React from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import TopNavbar from "@/components/layout/TopNavbar";

const PageName = () => {
  return (
    <MainLayout>
      <TopNavbar />
      <div className="p-6">
        {/* Page content */}
      </div>
    </MainLayout>
  );
};

export default PageName;
```

---

## Integration Summary

**Total Menu Items**: 12 (including profile)
**New Pages Created**: 7
**Existing Pages Integrated**: 5
**Routes Configured**: 12
**Status**: ✅ 100% Complete

---

**Last Updated**: January 22, 2025
**Status**: All dashboard menu items are fully functional and clickable
**No 404 errors** • **Complete navigation** • **Ready for API integration**
