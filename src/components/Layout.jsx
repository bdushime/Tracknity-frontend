import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavBar from './TopNavBar';

const Layout = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
    // Add global search logic here
  };

  const handleToggleTheme = () => {
    // Add theme toggle logic
  };

  const handleNotifications = () => {
    // Add notifications logic
  };

  const handleQuickActions = () => {
    // Add quick actions logic
  };

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavBar
          onSearch={handleSearch}
          onToggleTheme={handleToggleTheme}
          onNotifications={handleNotifications}
          onQuickActions={handleQuickActions}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;