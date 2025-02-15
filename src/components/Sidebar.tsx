import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  GraduationCap,
  Users,
  Calendar,
  LogOut,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Quiz", icon: BookOpen, href: "/quiz" },
  { name: "Practice", icon: Code2, href: "/practice" },
  { name: "Resources", icon: GraduationCap, href: "/resources" },
  { name: "Community", icon: Users, href: "/community" },
  { name: "Calendar", icon: Calendar, href: "/calendar" },
];

export function Sidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 flex flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold">CodeMaster</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </a>
        ))}
      </nav>
      <div className="border-t border-gray-800 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
