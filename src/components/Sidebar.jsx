import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Smartphone, 
  Users, 
  Shield, 
  Bell, 
  Settings,
  ChevronDown
} from 'lucide-react';

const Sidebar = ({ darkMode = true }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    {
      id: 'Dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      isActive: true
    },
    {
      id: 'Device Management',
      label: 'Device Management',
      icon: Smartphone,
      isActive: false
    },
    {
      id: 'User Management',
      label: 'User Management',
      icon: Users,
      isActive: false
    },
    {
      id: 'Theft Reports',
      label: 'Theft Reports',
      icon: Shield,
      isActive: false
    },
    {
      id: 'Communications',
      label: 'Communications',
      icon: Bell,
      isActive: false
    },
    {
      id: 'Settings',
      label: 'Settings',
      icon: Settings,
      isActive: false
    }
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  return (
    <div className={`w-64 h-screen ${darkMode ? 'bg-slate-800' : 'bg-white'} border-r ${darkMode ? 'border-slate-700' : 'border-gray-200'} flex flex-col`}>
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            SecureTrack
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : darkMode
                      ? 'text-gray-300 hover:bg-slate-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100'
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
      <div className={`p-4 border-t ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>
              John Doe
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} truncate`}>
              System Admin
            </p>
          </div>
          <ChevronDown size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;