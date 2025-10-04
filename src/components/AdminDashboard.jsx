import React, { useState } from 'react';
import { 
  Users, 
  Smartphone, 
  Shield, 
  Store,
  TrendingUp,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

// Enhanced Stat Card Component
const StatCard = ({ title, value, icon: Icon, iconBg, subtitle }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
        <p className="text-gray-900 text-3xl font-bold">{value}</p>
        {subtitle && (
          <p className="text-gray-500 text-xs mt-2">{subtitle}</p>
        )}
      </div>
      <div className={`p-3 rounded-xl ${iconBg}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

// Chart Placeholder Component
const ChartPlaceholder = ({ title, description, height = "h-64" }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
    <h3 className="text-gray-900 text-xl font-semibold mb-6">{title}</h3>
    <div className={`${height} bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300`}>
      <div className="text-center">
        <div className="text-gray-400 text-4xl mb-2">📊</div>
        <p className="text-gray-700 text-sm font-medium">Chart Placeholder</p>
        <p className="text-gray-500 text-xs mt-1">{description}</p>
      </div>
    </div>
  </div>
);

// Dashboard Header Component
const DashboardHeader = ({ lastUpdated, onRefresh }) => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-gray-900 text-3xl font-bold">Device Guard Dashboard</h1>
      <p className="text-gray-600 text-sm mt-1">Platform overview and system health</p>
    </div>
    <div className="flex items-center gap-4">
      <button
        onClick={onRefresh}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
      >
        <RefreshCw size={16} />
        <span className="text-sm">Refresh</span>
      </button>
      <div className="text-right">
        <p className="text-gray-500 text-xs">Last updated</p>
        <p className="text-gray-900 font-medium text-sm">{lastUpdated}</p>
      </div>
    </div>
  </div>
);

// Main Dashboard Component for Device Guard
const AdminDashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  // Device Guard specific dashboard data
  const dashboardData = {
    stats: {
      totalShops: { 
        value: "45",
        subtitle: "3 pending approval",
        trend: 12.5
      },
      totalDevices: { 
        value: "3,247",
        subtitle: "2,654 sold, 593 available",
        trend: 8.3
      },
      totalCustomers: { 
        value: "2,891",
        subtitle: "87% activation rate",
        trend: 15.2
      },
      stolenDevices: { 
        value: "89",
        subtitle: "73 recovered (82%)",
        trend: -5.4  // Negative is good - less theft!
      },
      activeDevices: { 
        value: "2,654",
        subtitle: "Currently in use by customers"
      },
      transfers: { 
        value: "156",
        subtitle: "This month"
      }
    }
  };

  const handleRefresh = () => {
    setLastUpdated(new Date().toLocaleTimeString());
    // In real app, this would fetch fresh data from API
    console.log('Refreshing dashboard data...');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Dashboard Header */}
      <DashboardHeader lastUpdated={lastUpdated} onRefresh={handleRefresh} />

      {/* Main Stats Grid - Device Guard Specific */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Partner Shops"
          value={dashboardData.stats.totalShops.value}
          subtitle={dashboardData.stats.totalShops.subtitle}
          icon={Store}
          iconBg="bg-purple-500"
        />
        <StatCard
          title="Total Devices"
          value={dashboardData.stats.totalDevices.value}
          subtitle={dashboardData.stats.totalDevices.subtitle}
          icon={Smartphone}
          iconBg="bg-indigo-500"
        />
        <StatCard
          title="Registered Customers"
          value={dashboardData.stats.totalCustomers.value}
          subtitle={dashboardData.stats.totalCustomers.subtitle}
          icon={Users}
          iconBg="bg-blue-500"
        />
        <StatCard
          title="Stolen Devices"
          value={dashboardData.stats.stolenDevices.value}
          subtitle={dashboardData.stats.stolenDevices.subtitle}
          icon={Shield}
          iconBg="bg-red-500"
        />
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          title="Active Devices"
          value={dashboardData.stats.activeDevices.value}
          subtitle={dashboardData.stats.activeDevices.subtitle}
          icon={CheckCircle}
          iconBg="bg-green-500"
        />
        <StatCard
          title="Ownership Transfers"
          value={dashboardData.stats.transfers.value}
          subtitle={dashboardData.stats.transfers.subtitle}
          icon={RefreshCw}
          iconBg="bg-cyan-500"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Device Registrations Chart */}
        <ChartPlaceholder 
          title="Device Registrations Over Time" 
          description="Line chart showing daily device registrations by shops"
          height="h-64"
        />

        {/* Theft Statistics Chart */}
        <ChartPlaceholder 
          title="Theft Prevention Statistics" 
          description="Bar chart comparing stolen vs recovered devices by month"
          height="h-64"
        />
      </div>

      {/* Shop Performance & Theft Hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shop Performance Placeholder */}
        <ChartPlaceholder 
          title="Shop Performance" 
          description="Bar chart showing top shops by sales and activation rates"
          height="h-64"
        />

        {/* Theft Hotspots Placeholder */}
        <ChartPlaceholder 
          title="Theft Hotspots" 
          description="Map or bar chart showing theft incidents by location"
          height="h-64"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;