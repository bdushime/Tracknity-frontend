import React from 'react';
import { 
  Users, 
  Smartphone, 
  Shield, 
  CheckCircle, 
  Server
} from 'lucide-react';

// Simple Stat Card Component
const StatCard = ({ title, value, icon: Icon, iconBg }) => (
  <div className="bg-[#8D8DC7]/10 rounded-2xl p-6 border border-[#8D8DC7]">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-[#BEBEE0] text-sm font-medium mb-1">{title}</h3>
        <p className="text-white text-3xl font-bold">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${iconBg}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

// Chart Placeholder Component (replaces complex charts)
const ChartPlaceholder = ({ title, description, height = "h-64" }) => (
  <div className="bg-[#8D8DC7]/10 rounded-2xl p-6 border border-[#8D8DC7]">
    <h3 className="text-white text-xl font-semibold mb-6">{title}</h3>
    <div className={`${height} bg-[#343264]/50 rounded-lg flex items-center justify-center border-2 border-dashed border-[#8D8DC7]`}>
      <div className="text-center">
        <div className="text-[#8D8DC7] text-4xl mb-2">📊</div>
        <p className="text-[#BEBEE0] text-sm font-medium">Chart Placeholder</p>
        <p className="text-[#8D8DC7] text-xs mt-1">{description}</p>
      </div>
    </div>
  </div>
);

// Dashboard Header Component
const DashboardHeader = ({ lastUpdated }) => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-white text-3xl font-bold">Dashboard Overview</h1>
    </div>
    <div className="flex items-center gap-4">
      <p className="text-[#BEBEE0] text-sm">
        Last updated: <span className="text-white font-medium">{lastUpdated}</span>
      </p>
    </div>
  </div>
);

// Main Dashboard Component (Simplified)
const AdminDashboard = () => {
  // Simple data - easy to understand and modify
  const dashboardData = {
    lastUpdated: "Today, 9:41 AM",
    stats: {
      totalUsers: { 
        value: "12,543"
      },
      registeredDevices: { 
        value: "8,729"
      },
      activeTheftReports: { 
        value: "87"
      },
      verificationRequests: { 
        value: "2,458"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#343264] p-6">
      {/* Dashboard Header */}
      <DashboardHeader lastUpdated={dashboardData.lastUpdated} />

      {/* Stats Grid - The main information cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Registered Users"
          value={dashboardData.stats.totalUsers.value}
          icon={Users}
          iconBg="bg-[#8D8DC7]"
        />
        <StatCard
          title="Registered Devices"
          value={dashboardData.stats.registeredDevices.value}
          icon={Smartphone}
          iconBg="bg-[#8D8DC7]"
        />
        <StatCard
          title="Active Theft Reports"
          value={dashboardData.stats.activeTheftReports.value}
          icon={Shield}
          iconBg="bg-[#8D8DC7]"
        />
        <StatCard
          title="Verification Requests"
          value={dashboardData.stats.verificationRequests.value}
          icon={CheckCircle}
          iconBg="bg-[#8D8DC7]"
        />
      </div>

      {/* Charts Grid - Now with simple placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Growth Chart Placeholder */}
        <ChartPlaceholder 
          title="User Growth Trend" 
          description="Line chart showing user growth over time"
        />

        {/* Theft Case Status Placeholder */}
        <ChartPlaceholder 
          title="Theft Case Status" 
          description="Pie chart showing case distribution"
        />
      </div>

      {/* Weekly Device Registrations Placeholder */}
      <ChartPlaceholder 
        title="Weekly Device Registrations" 
        description="Bar chart showing daily device registrations"
        height="h-80"
      />
    </div>
  );
};

export default AdminDashboard;