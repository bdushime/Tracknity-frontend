import React, { useState } from 'react';
import { 
  Search, 
  User, 
  Eye, 
  ArrowLeft, 
  Calendar, 
  Shield, 
  Smartphone, 
  MapPin, 
  Mail, 
  Phone,
  Building,
  Clock
} from 'lucide-react';

// Role Badge Component
const RoleBadge = ({ role }) => {
  const getRoleStyle = (role) => {
    if (role === 'Institution') {
      return 'bg-[#8D8DC7] text-white px-3 py-1 rounded-full text-sm font-medium';
    } else {
      return 'bg-[#BEBEE0] text-[#343264] px-3 py-1 rounded-full text-sm font-medium';
    }
  };

  // Default: show user management list
  return (
    <span className={getRoleStyle(role)}>
      {role}
    </span>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    return status === 'Active'
      ? 'text-green-400 flex items-center gap-1'
      : 'text-red-400 flex items-center gap-1';
  };

  return (
    <span className={getStatusStyle(status)}>
      <div className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`}></div>
      {status}
    </span>
  );
};

// Info Card Component for User Details
const InfoCard = ({ title, children }) => (
  <div className="bg-[#8D8DC7]/10 rounded-lg border border-[#8D8DC7] p-6">
    <h3 className="text-white text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

// Info Row Component for User Details
const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-center justify-between py-3 border-b border-[#8D8DC7]/30 last:border-b-0">
    <div className="flex items-center gap-3">
      {Icon && <Icon size={16} className="text-[#8D8DC7]" />}
      <span className="text-[#BEBEE0] text-sm font-medium">{label}:</span>
    </div>
    <div className="text-white font-medium">{value}</div>
  </div>
);

// User Details View Component
const UserDetailsView = ({ user, onBack }) => {
  // Extended user data with additional details
  const extendedUser = {
    ...user,
    email: `${user.name.toLowerCase().replace(' ', '.')}@example.com`,
    phone: '+1 (555) 123-4567',
    address: user.role === 'Institution' ? '123 Business Ave, Suite 100' : '456 Residential St',
    city: 'New York, NY',
    joinedDate: user.registrationDate,
    lastLogin: '2023-10-25 14:30',
    accountType: user.role === 'Institution' ? 'Business Account' : 'Personal Account',
    verificationStatus: 'Verified'
  };

  // Sample devices owned by this user
  const userDevices = [
    {
      id: 'DEV001',
      name: 'MacBook Pro 16"',
      type: 'Laptop',
      status: 'Active',
      registrationDate: '2023-05-15'
    },
    {
      id: 'DEV002',
      name: 'iPhone 14 Pro',
      type: 'Mobile',
      status: 'Active',
      registrationDate: '2023-06-22'
    },
    {
      id: 'DEV003',
      name: 'iPad Air',
      type: 'Tablet',
      status: 'Inactive',
      registrationDate: '2023-07-05'
    }
  ];

  // Handle button clicks
  const handleEditUser = () => {
    console.log('Edit user:', user.id);
    alert(`Edit user ${user.name} - add your logic here`);
  };

  const handleViewDevice = (device) => {
    console.log('View device:', device);
    alert(`View device ${device.name} - add your logic here`);
  };

  return (
    <div className="min-h-screen bg-[#343264] p-6">
      {/* Header Section */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#BEBEE0] hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to User Management
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">User Details</h1>
            <p className="text-[#BEBEE0]">Viewing details for {extendedUser.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={extendedUser.status} />
            <RoleBadge role={extendedUser.role} />
            <button
              onClick={handleEditUser}
              className="px-4 py-2 bg-[#BEBEE0] hover:bg-white text-[#343264] rounded-lg transition-colors font-medium"
            >
              Edit User
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <InfoCard title="Basic Information">
          <div className="space-y-1">
            <InfoRow label="Full Name" value={extendedUser.name} icon={User} />
            <InfoRow label="Email" value={extendedUser.email} icon={Mail} />
            <InfoRow label="Phone" value={extendedUser.phone} icon={Phone} />
            <InfoRow label="Role" value={<RoleBadge role={extendedUser.role} />} icon={Shield} />
            <InfoRow label="Account Type" value={extendedUser.accountType} icon={Building} />
            <InfoRow label="Status" value={<StatusBadge status={extendedUser.status} />} />
          </div>
        </InfoCard>

        {/* Account Details */}
        <InfoCard title="Account Details">
          <div className="space-y-1">
            <InfoRow label="User ID" value={`#${extendedUser.id}`} />
            <InfoRow label="Registration Date" value={extendedUser.registrationDate} icon={Calendar} />
            <InfoRow label="Last Login" value={extendedUser.lastLogin} icon={Clock} />
            <InfoRow label="Verification Status" value={extendedUser.verificationStatus} />
            <InfoRow label="Total Devices" value={extendedUser.devices} icon={Smartphone} />
            <InfoRow label="Location" value={`${extendedUser.address}, ${extendedUser.city}`} icon={MapPin} />
          </div>
        </InfoCard>

        {/* Registered Devices */}
        <div className="lg:col-span-2">
          <InfoCard title="Registered Devices">
            {userDevices.length > 0 ? (
              <div className="space-y-3">
                {userDevices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between py-3 border-b border-[#8D8DC7]/30 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <Smartphone size={16} className="text-[#8D8DC7]" />
                      <div>
                        <p className="text-white font-medium">{device.name}</p>
                        <p className="text-[#8D8DC7] text-sm">{device.type} • Registered {device.registrationDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={device.status} />
                      <button
                        onClick={() => handleViewDevice(device)}
                        className="p-2 text-[#BEBEE0] hover:text-white hover:bg-[#8D8DC7] rounded transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Smartphone size={48} className="mx-auto mb-4 text-[#8D8DC7] opacity-50" />
                <h4 className="text-[#BEBEE0] font-medium mb-2">No Devices Registered</h4>
                <p className="text-[#8D8DC7] text-sm">
                  This user hasn't registered any devices yet.
                </p>
              </div>
            )}
          </InfoCard>
        </div>
      </div>

      {/* Activity History (Placeholder for future) */}
      <div className="mt-6">
        <InfoCard title="Recent Activity">
          <div className="text-center py-8">
            <Clock size={48} className="mx-auto mb-4 text-[#8D8DC7] opacity-50" />
            <h4 className="text-[#BEBEE0] font-medium mb-2">Activity Log</h4>
            <p className="text-[#8D8DC7] text-sm">
              User activity history will be displayed here.
            </p>
          </div>
        </InfoCard>
      </div>
    </div>
  );
};
const UserManagement = () => {
  // ALL State variables declared at the very beginning
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [registrationFilter, setRegistrationFilter] = useState('All Time');
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'details'
  const [selectedUser, setSelectedUser] = useState(null);

  // Sample user data - easy to modify
  const users = [
    {
      id: 1,
      name: 'John Doe',
      role: 'User',
      status: 'Active',
      devices: 3,
      registrationDate: '2023-01-15',
      avatar: 'J'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Institution',
      status: 'Active',
      devices: 2,
      registrationDate: '2023-02-22',
      avatar: 'J'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      role: 'User',
      status: 'Inactive',
      devices: 1,
      registrationDate: '2023-03-10',
      avatar: 'R'
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'Institution',
      status: 'Active',
      devices: 4,
      registrationDate: '2023-04-05',
      avatar: 'E'
    },
    {
      id: 5,
      name: 'Michael Wilson',
      role: 'User',
      status: 'Active',
      devices: 2,
      registrationDate: '2023-05-12',
      avatar: 'M'
    }
  ];

  // Filter users based on search and filter criteria
  const getFilteredUsers = () => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  };

  const filteredUsers = getFilteredUsers();

  // Handle button clicks
  const handleViewUser = (user) => {
    console.log('View user:', user);
    // Switch to details view and set the selected user
    setSelectedUser(user);
    setCurrentView('details');
  };

  // Handle going back to user list from details view
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedUser(null);
  };

  // Conditional rendering: show user list or user details
  if (currentView === 'details' && selectedUser) {
    return <UserDetailsView user={selectedUser} onBack={handleBackToList} />;
  }

  return (
    <div className="min-h-screen bg-[#343264] p-6">
      {/* Header Section */}
      <div className="border-b border-[#8D8DC7] pb-6 mb-6">
        <h1 className="text-2xl font-semibold text-white">User Management</h1>
      </div>

      {/* Filters Section */}
      <div className="border-b border-[#8D8DC7] pb-4 mb-6">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 items-start sm:items-center">
          {/* Role Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-[#BEBEE0] text-sm min-w-0">Role:</span>
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-[#8D8DC7]/20 border border-[#8D8DC7] rounded px-3 py-1 text-sm focus:outline-none focus:border-[#BEBEE0] flex-1 sm:flex-none min-w-0 text-white"
            >
              <option>All Roles</option>
              <option>User</option>
              <option>Institution</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-[#BEBEE0] text-sm min-w-0">Status:</span>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#8D8DC7]/20 border border-[#8D8DC7] rounded px-3 py-1 text-sm focus:outline-none focus:border-[#BEBEE0] flex-1 sm:flex-none min-w-0 text-white"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Registration Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-[#BEBEE0] text-sm min-w-0">Registration:</span>
            <select 
              value={registrationFilter}
              onChange={(e) => setRegistrationFilter(e.target.value)}
              className="bg-[#8D8DC7]/20 border border-[#8D8DC7] rounded px-3 py-1 text-sm focus:outline-none focus:border-[#BEBEE0] flex-1 sm:flex-none min-w-0 text-white"
            >
              <option>All Time</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8D8DC7] w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#8D8DC7]/20 border border-[#8D8DC7] rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#BEBEE0] placeholder-[#BEBEE0] text-white"
          />
        </div>
      </div>

      {/* Users Table/Cards */}
      <div className="bg-[#8D8DC7]/10 rounded-lg border border-[#8D8DC7] overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-[#8D8DC7]/20 border-b border-[#8D8DC7] text-sm font-medium text-[#BEBEE0] uppercase tracking-wider">
            <div>NAME</div>
            <div>ROLE</div>
            <div>STATUS</div>
            <div>DEVICES</div>
            <div>REGISTRATION DATE</div>
            <div>ACTIONS</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#8D8DC7]">
            {filteredUsers.map((user) => (
              <div key={user.id} className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-[#343264]/30 transition-colors items-center">
                {/* Name */}
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium text-white">{user.name}</div>
                  </div>
                </div>

                {/* Role */}
                <div>
                  <RoleBadge role={user.role} />
                </div>

                {/* Status */}
                <div>
                  <StatusBadge status={user.status} />
                </div>

                {/* Devices */}
                <div>
                  <span className="bg-[#8D8DC7] text-white px-2 py-1 rounded-full text-sm font-medium">
                    {user.devices}
                  </span>
                </div>

                {/* Registration Date */}
                <div className="text-[#BEBEE0]">
                  {user.registrationDate}
                </div>

                {/* Actions - Only View Icon */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleViewUser(user)}
                    className="p-2 text-[#BEBEE0] hover:text-white hover:bg-[#8D8DC7] rounded transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden divide-y divide-[#8D8DC7]">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-4 hover:bg-[#343264]/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="font-medium text-white truncate">{user.name}</div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button 
                        onClick={() => handleViewUser(user)}
                        className="p-1.5 text-[#BEBEE0] hover:text-white hover:bg-[#8D8DC7] rounded transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[#8D8DC7]">Role: </span>
                      <RoleBadge role={user.role} />
                    </div>
                    <div>
                      <span className="text-[#8D8DC7]">Status: </span>
                      <StatusBadge status={user.status} />
                    </div>
                    <div>
                      <span className="text-[#8D8DC7]">Devices: </span>
                      <span className="bg-[#8D8DC7] text-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                        {user.devices}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8D8DC7]">Registered: </span>
                      <span className="text-[#BEBEE0]">{user.registrationDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State - shows when no users found */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#8D8DC7] mb-4">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-[#BEBEE0] text-lg font-medium mb-2">No users found</h3>
            <p className="text-[#8D8DC7]">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;