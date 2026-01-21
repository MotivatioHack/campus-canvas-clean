import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoleSelector from "../components/auth/RoleSelector";
import FloatingInput from "../components/auth/FloatingInput";
import PasswordInput from "../components/auth/PasswordInput";
import AuthButton from "../components/auth/AuthButton";
import StatusFeedback from "../components/auth/StatusFeedback";

export default function Login() {
  const navigate = useNavigate();

  // Role must NEVER be undefined
  const [role, setRole] = useState("student");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "loading", message: "Verifying credentials..." });

    // Hard safety fallback
    const roleToSend = role || "student";

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: formData.username,
          password: formData.password,
          role: roleToSend,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: data.message || "Login failed" });
        setIsLoading(false);
        return;
      }

      /* ==========================
         AUTH SUCCESS
      ========================== */
      localStorage.clear();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userName", data.name || "");

      setStatus({ type: "success", message: "Login successful. Redirecting..." });

      /* ==========================
         ROLE-BASED REDIRECT
         (Backend OR Frontend Safe)
      ========================== */
      setTimeout(() => {
        if (data.redirectUrl) {
          // Preferred: backend-controlled redirect
          navigate(data.redirectUrl);
        } else {
          // Fallback: frontend-controlled redirect
          if (data.role === "student") navigate("/dashboard/student");
          else if (data.role === "faculty") navigate("/dashboard/faculty");
          else if (data.role === "admin") navigate("/dashboard/admin");
          else navigate("/");
        }
      }, 900);
    } catch (error) {
      setStatus({
        type: "error",
        message: "Unable to connect to server. Try again later.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 glass-card">
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome Back
        </h1>

        {/* ROLE SELECTOR */}
        <RoleSelector
          value={role}
          onChange={(newRole) => {
            console.log("Role selected:", newRole);
            setRole(newRole || "student");
          }}
        />

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <FloatingInput
            label="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />

          <PasswordInput
            label="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <StatusFeedback status={status.type} message={status.message} />

          <AuthButton isLoading={isLoading}>
            Sign In
          </AuthButton>
        </form>
      </div>
    </div>
  );
}
