import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Smartphone,
  Users,
  Shield,
  Bell,
  Settings,
  ChevronDown 
} from 'lucide-react';

// Main Sidebar Component
const Sidebar = () => {
  // React Router hooks for navigation
  const navigate = useNavigate(); // Used to navigate to different pages
  const location = useLocation(); // Used to know which page we're currently on

  // Menu items configuration - easy to modify
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/' // The URL path for this page
    },
    {
      id: 'devices',
      label: 'Device Management',
      icon: Smartphone,
      path: '/devices'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      path: '/users'
    },
    {
      id: 'theft-reports',
      label: 'Theft Reports',
      icon: Shield,
      path: '/theft-reports'
    },
    {
      id: 'communications',
      label: 'Communications',
      icon: Bell,
      path: '/communications'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings'
    }
  ];

  // Handle menu item clicks - this actually navigates to different pages
  const handleItemClick = (path) => {
    navigate(path); // This changes the URL and loads the new page
    console.log(`Navigating to: ${path}`);
  };

  // Handle user profile click
  const handleProfileClick = () => {
    console.log('Profile clicked');
    // Add your profile menu logic here later
    alert('Profile menu - add your logic here');
  };

  return (
    <div className="w-64 h-screen bg-[#343264] border-r border-[#8D8DC7] flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-[#8D8DC7]">
        <div className="flex items-center gap-3">
          {/* Logo Icon */}
          <div className="w-8 h-8 bg-[#BEBEE0] rounded-lg flex items-center justify-center">
            <span className="text-[#343264] font-bold text-lg">T</span>
          </div>
          {/* App Name */}
          <span className="text-xl font-semibold text-white">Tracknity</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            // Check if this menu item is currently active based on the URL
            const isActive = location.pathname === item.path;

            return (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.path)} // Pass the path to navigate to
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-[#8D8DC7] text-white shadow-lg'
                      : 'text-[#BEBEE0] hover:bg-[#8D8DC7]/30 hover:text-white'
                  }`}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-[#8D8DC7]">
        <button 
          onClick={handleProfileClick}
          className="w-full flex items-center gap-3 hover:bg-[#8D8DC7]/20 p-2 rounded-lg transition-colors"
        >
          {/* Profile Picture */}
          <div className="w-10 h-10 bg-[#BEBEE0] rounded-full flex items-center justify-center">
            <span className="text-[#343264] font-medium text-sm">JD</span>
          </div>
          
          {/* User Info */}
          <div className="flex-1 min-w-0 text-left">
            <p className="font-medium text-sm text-white truncate">John Doe</p>
            <p className="text-xs text-[#8D8DC7] truncate">System Admin</p>
          </div>
          
          {/* Dropdown Arrow */}
          <ChevronDown size={16} className="text-[#8D8DC7]" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;