import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RoleSelector from '../components/auth/RoleSelector';
import FloatingInput from '../components/auth/FloatingInput';
import PasswordInput from '../components/auth/PasswordInput';
import AuthButton from '../components/auth/AuthButton';
import StatusFeedback from '../components/auth/StatusFeedback';

export default function Login() {
  const navigate = useNavigate();
  // 1. We initialize with 'student' to ensure it's never undefined
  const [role, setRole] = useState('student'); 
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: 'loading', message: 'Verifying...' });

    // --- LOGIC CHECK ---
    // If for some reason state is empty, we force a value
    const roleToSend = role || 'student';

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          identifier: formData.username, 
          password: formData.password,
          role: roleToSend // This MUST match the backend 'role' variable
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.clear();
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userName', data.name);
        
        setStatus({ type: 'success', message: 'Success! Redirecting...' });
        setTimeout(() => navigate(data.redirectUrl), 1000);
      } else {
        setStatus({ type: 'error', message: data.message });
        setIsLoading(false);
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Server connection failed.' });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 glass-card">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
        
        {/* Ensure RoleSelector is correctly calling setRole */}
        <RoleSelector 
          value={role} 
          onChange={(newVal) => {
            console.log("Selected role changed to:", newVal);
            setRole(newVal);
          }} 
        />
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <FloatingInput 
            label="Username" 
            value={formData.username} 
            onChange={(e) => setFormData({...formData, username: e.target.value})} 
            required 
          />
          <PasswordInput 
            label="Password" 
            value={formData.password} 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
          />
          
          <StatusFeedback status={status.type} message={status.message} />
          
          <AuthButton isLoading={isLoading}>Sign In</AuthButton>
        </form>
      </div>
    </div>
  );
}