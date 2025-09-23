import React from 'react';
import { 
  Users, 
  Smartphone, 
  Shield, 
  CheckCircle, 
  Server,
  Search,
  Sun,
  Bell,
  Plus
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

// Stat Card Component
const StatCard = ({ title, value, trend, trendValue, icon: Icon, iconBg, additionalInfo }) => (
  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-white text-3xl font-bold">{value}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </span>
          </div>
        )}
        {additionalInfo && (
          <div className="mt-3 space-y-1">
            {additionalInfo.map((info, index) => (
              <p key={index} className="text-gray-400 text-sm">{info}</p>
            ))}
          </div>
        )}
      </div>
      <div className={`p-3 rounded-xl ${iconBg}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

// System Health Card
const SystemHealthCard = ({ healthData }) => (
  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">System Health</h3>
        <p className="text-white text-3xl font-bold">Operational</p>
      </div>
      <div className="p-3 rounded-xl bg-slate-600">
        <Server size={24} className="text-white" />
      </div>
    </div>
    <div className="space-y-3">
      {healthData.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">{item.label}:</span>
          <span className="text-green-400 text-sm font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

// Chart Card Component
const ChartCard = ({ title, children, className = "" }) => (
  <div className={`bg-slate-800 rounded-2xl p-6 border border-slate-700 ${className}`}>
    <h3 className="text-white text-xl font-semibold mb-6">{title}</h3>
    {children}
  </div>
);

// Header Component
const DashboardHeader = ({ lastUpdated, onSearch, onQuickAction }) => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-white text-3xl font-bold">Dashboard Overview</h1>
    </div>
    <div className="flex items-center gap-4">
      <p className="text-gray-400 text-sm">
        Last updated: <span className="text-white font-medium">{lastUpdated}</span>
      </p>
    </div>
  </div>
);

// Top Navigation Bar
const TopNavBar = ({ onSearch, onToggleTheme, onNotifications, onQuickActions }) => (
  <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-700">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <span className="text-white text-xl font-semibold">SecureTrack</span>
      </div>
    </div>
    
    <div className="flex-1 max-w-md mx-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
      </div>
    </div>
    
    <div className="flex items-center gap-3">
      <button 
        onClick={onToggleTheme}
        className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
      >
        <Sun size={20} />
      </button>
      <button 
        onClick={onNotifications}
        className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors relative"
      >
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
      </button>
      <button 
        onClick={onQuickActions}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <Plus size={16} />
        Quick Actions
      </button>
    </div>
  </div>
);

// Main Dashboard Component
const AdminDashboard = ({ 
  dashboardData = {},
  onSearch,
  onToggleTheme,
  onNotifications,
  onQuickActions 
}) => {
  // Default data structure - replace with actual API data
  const defaultData = {
    lastUpdated: "Today, 9:41 AM",
    stats: {
      totalUsers: { value: "12,543", trend: "up", trendValue: "12%" },
      registeredDevices: { value: "8,729", trend: "up", trendValue: "8%", additionalInfo: ["New this week: 142 devices"] },
      activeTheftReports: { value: "87", trend: "down", trendValue: "5%", additionalInfo: ["Resolved: 23 cases"] },
      verificationRequests: { value: "2,458", additionalInfo: ["Success rate: 98.2%"] }
    },
    systemHealth: [
      { label: "API", value: "45ms" },
      { label: "DB", value: "OK" },
      { label: "Uptime", value: "99.9%" }
    ],
    userGrowthData: [
      { month: 'Jan', users: 800 },
      { month: 'Feb', users: 950 },
      { month: 'Mar', users: 1100 },
      { month: 'Apr', users: 1200 },
      { month: 'May', users: 1400 },
      { month: 'Jun', users: 1600 },
      { month: 'Jul', users: 1850 }
    ],
    weeklyDeviceData: [
      { day: 'Mon', devices: 12 },
      { day: 'Tue', devices: 19 },
      { day: 'Wed', devices: 8 },
      { day: 'Thu', devices: 21 },
      { day: 'Fri', devices: 32 },
      { day: 'Sat', devices: 18 },
      { day: 'Sun', devices: 14 }
    ],
    theftCaseData: [
      { name: 'Open', value: 35, color: '#ef4444' },
      { name: 'Resolved', value: 23, color: '#22c55e' },
      { name: 'In Progress', value: 29, color: '#f59e0b' }
    ]
  };

  // Merge provided data with defaults
  const data = { ...defaultData, ...dashboardData };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Top Navigation */}
      <TopNavBar 
        onSearch={onSearch}
        onToggleTheme={onToggleTheme}
        onNotifications={onNotifications}
        onQuickActions={onQuickActions}
      />

      {/* Main Content */}
      <div className="p-6">
        {/* Dashboard Header */}
        <DashboardHeader lastUpdated={data.lastUpdated} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Total Registered Users"
            value={data.stats.totalUsers.value}
            trend={data.stats.totalUsers.trend}
            trendValue={data.stats.totalUsers.trendValue}
            icon={Users}
            iconBg="bg-blue-600"
          />
          <StatCard
            title="Registered Devices"
            value={data.stats.registeredDevices.value}
            trend={data.stats.registeredDevices.trend}
            trendValue={data.stats.registeredDevices.trendValue}
            additionalInfo={data.stats.registeredDevices.additionalInfo}
            icon={Smartphone}
            iconBg="bg-slate-600"
          />
          <StatCard
            title="Active Theft Reports"
            value={data.stats.activeTheftReports.value}
            trend={data.stats.activeTheftReports.trend}
            trendValue={data.stats.activeTheftReports.trendValue}
            additionalInfo={data.stats.activeTheftReports.additionalInfo}
            icon={Shield}
            iconBg="bg-slate-600"
          />
          <StatCard
            title="Verification Requests"
            value={data.stats.verificationRequests.value}
            additionalInfo={data.stats.verificationRequests.additionalInfo}
            icon={CheckCircle}
            iconBg="bg-slate-600"
          />
          <SystemHealthCard healthData={data.systemHealth} />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <ChartCard title="User Growth Trend">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.userGrowthData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 0, r: 6 }}
                    activeDot={{ r: 8, fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Theft Case Status */}
          <ChartCard title="Theft Case Status">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.theftCaseData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {data.theftCaseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center mt-4">
                <span className="text-red-400 text-sm">Open 35</span>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Weekly Device Registrations */}
        <ChartCard title="Weekly Device Registrations">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.weeklyDeviceData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis hide />
                <Bar 
                  dataKey="devices" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default AdminDashboard;