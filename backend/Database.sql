-- 1. Create the Database
CREATE DATABASE campus_canvas_db;
USE campus_canvas_db;
DROP TABLE IF EXISTS users;

Select * From users ;
SELECT username, role FROM users;
SELECT profile_picture FROM users WHERE username = 'Om';
SELECT username, role FROM users WHERE username = 'om';

UPDATE users SET role = 'student' WHERE id = 1;
UPDATE users SET role = 'admin' WHERE id = 4;
UPDATE users SET role = 'faculty' WHERE id = 1;



CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role ENUM('Student', 'Faculty', 'Admin') NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile_number VARCHAR(15) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    
    -- Student Specific Fields (Can be NULL for Faculty)
    prn VARCHAR(50) UNIQUE,
    course VARCHAR(100),
    year VARCHAR(20),
    
    -- Faculty Specific Fields (Can be NULL for Students)
    faculty_id VARCHAR(50) UNIQUE,
    designation VARCHAR(100),
    
    -- Common Fields
    department VARCHAR(100),
    profile_picture LONGTEXT, -- Stores the image path or Base64 string
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users MODIFY COLUMN role ENUM('student', 'faculty', 'admin') NOT NULL;

-- 1. Turn off safe updates
SET SQL_SAFE_UPDATES = 0;

-- 2. Run your updates
UPDATE users SET role = 'student' WHERE role = 'Student';
UPDATE users SET role = 'faculty' WHERE role = 'Faculty';
UPDATE users SET role = 'admin' WHERE role = 'Admin';

-- 3. Turn safe updates back on (Optional but safe)
SET SQL_SAFE_UPDATES = 1;




DELETE FROM email_subscribers WHERE id = 7;

SELECT * FROM email_subscribers;
-- 1. Table for people who subscribe
CREATE TABLE email_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE, -- 'UNIQUE' prevents duplicate subscriptions
    status ENUM('active', 'unsubscribed') DEFAULT 'active',
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table for Campus Updates (Notices/Holidays)
CREATE TABLE campus_updates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('notice', 'holiday', 'announcement', 'update') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for faster searching by email
CREATE INDEX idx_subscriber_email ON email_subscribers(email);

-- 3. Turn your updates back on
SET SQL_SAFE_UPDATES = 1;

-- Create complaints table
CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id VARCHAR(20) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    category ENUM('hostel', 'exam', 'faculty', 'campus', 'lost', 'helpdesk') NOT NULL,
    sub_category VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    file_path VARCHAR(500),
    status ENUM('Pending', 'In-Progress', 'Resolved', 'Closed') DEFAULT 'Pending',
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    assigned_to INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create notices table
CREATE TABLE notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    type ENUM('general', 'academic', 'event', 'placement', 'urgent') DEFAULT 'general',
    target_role ENUM('all', 'student', 'faculty', 'admin') DEFAULT 'all',
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Create notifications table
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    type ENUM('complaint', 'notice', 'event', 'placement', 'system') NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    related_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample notices
INSERT INTO notices (title, content, type, target_role, created_by) VALUES
('Academic Calendar 2026 Released', 'The new academic calendar for 2026 has been published. Check important dates for exams and holidays.', 'academic', 'all', 1),
('Tech Fest 2026 Registration Open', 'Register now for the biggest tech event of the year. Multiple competitions and workshops available.', 'event', 'student', 1),
('Microsoft Hiring Drive', 'Microsoft will be conducting campus interviews next week. Eligible students can apply through placement portal.', 'placement', 'student', 1);