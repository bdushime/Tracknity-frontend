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
  Store,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Package
} from 'lucide-react';

// User Type Badge Component (Customer or Shop)
const UserTypeBadge = ({ type }) => {
  const getTypeStyle = (type) => {
    if (type === 'Shop') {
      return 'bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1';
    } else {
      return 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1';
    }
  };

  const getIcon = (type) => {
    return type === 'Shop' ? <Store size={14} /> : <User size={14} />;
  };

  return (
    <span className={getTypeStyle(type)}>
      {getIcon(type)}
      {type}
    </span>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    return status === 'Active'
      ? 'text-green-600 flex items-center gap-1'
      : status === 'Suspended'
      ? 'text-red-600 flex items-center gap-1'
      : 'text-yellow-600 flex items-center gap-1';
  };

  const getStatusIcon = (status) => {
    if (status === 'Active') return 'bg-green-500';
    if (status === 'Suspended') return 'bg-red-500';
    return 'bg-yellow-500';
  };

  return (
    <span className={getStatusStyle(status)}>
      <div className={`w-2 h-2 rounded-full ${getStatusIcon(status)}`}></div>
      {status}
    </span>
  );
};

// Info Card Component for User Details
const InfoCard = ({ title, children }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
    <h3 className="text-gray-900 text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

// Info Row Component for User Details
const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
    <div className="flex items-center gap-3">
      {Icon && <Icon size={16} className="text-gray-600" />}
      <span className="text-gray-600 text-sm font-medium">{label}:</span>
    </div>
    <div className="text-gray-900 font-medium">{value}</div>
  </div>
);

// User Details View Component - Device Guard Specific
const UserDetailsView = ({ user, onBack }) => {
  // Extended user data with Device Guard specific details
  const extendedUser = {
    ...user,
    email: user.email || `${user.name.toLowerCase().replace(' ', '.')}@${user.type === 'Shop' ? 'shop.rw' : 'gmail.com'}`,
    phone: user.phone || '+250 788 123 456',
    address: user.address || (user.type === 'Shop' ? 'KN 5 Ave, Kigali' : 'Kimironko, Kigali'),
    joinedDate: user.registrationDate,
    lastActive: user.lastActive || '2025-10-03 14:30',
    accountType: user.type === 'Shop' ? 'Partner Shop' : 'Customer',
    verificationStatus: user.verified ? 'Verified' : 'Pending',
    // Shop-specific fields
    ...(user.type === 'Shop' && {
      shopName: user.name,
      tin: user.tin || '123456789',
      devicesSold: user.devicesSold || 0,
      activationRate: user.activationRate || '87%'
    }),
    // Customer-specific fields
    ...(user.type === 'Customer' && {
      trustedContacts: user.trustedContacts || 2,
      transfersCompleted: user.transfersCompleted || 0
    })
  };

  // Sample devices - varies by user type
  const getUserDevices = () => {
    if (user.type === 'Shop') {
      // For shops, show devices they've registered/sold
      return [
        {
          id: 'DEV001',
          name: 'Samsung Galaxy S21',
          imei: '***********2345',
          status: 'Sold',
          customer: 'John Mugisha',
          registrationDate: '2025-09-30'
        },
        {
          id: 'DEV002',
          name: 'iPhone 13 Pro',
          imei: '***********6789',
          status: 'Available',
          customer: 'In Stock',
          registrationDate: '2025-09-28'
        },
        {
          id: 'DEV003',
          name: 'Samsung A54',
          imei: '***********1122',
          status: 'Sold',
          customer: 'Mary Uwimana',
          registrationDate: '2025-09-25'
        }
      ];
    } else {
      // For customers, show devices they own
      return [
        {
          id: 'DEV001',
          name: 'Samsung Galaxy S21',
          imei: '***********2345',
          status: 'Active',
          shop: 'Tech Shop Rwanda',
          registrationDate: '2025-09-30'
        },
        {
          id: 'DEV002',
          name: 'iPhone 12',
          imei: '***********3456',
          status: 'Transferred',
          shop: 'Mobile Zone',
          registrationDate: '2025-03-15'
        }
      ];
    }
  };

  const userDevices = getUserDevices();

  const handleEditUser = () => {
    console.log('Edit user:', user.id);
    alert(`Edit ${user.type} ${user.name} - add your logic here`);
  };

  const handleSuspendUser = () => {
    console.log('Suspend user:', user.id);
    if (confirm(`Are you sure you want to suspend ${user.name}?`)) {
      alert(`Suspend ${user.type} ${user.name} - add your logic here`);
    }
  };

  const handleViewDevice = (device) => {
    console.log('View device:', device);
    alert(`View device ${device.name} (${device.imei}) - add your logic here`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to User Management
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 text-3xl font-bold mb-2">{user.type} Details</h1>
            <p className="text-gray-600">Viewing details for {extendedUser.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={extendedUser.status} />
            <UserTypeBadge type={extendedUser.type} />
            <button
              onClick={handleEditUser}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
            >
              Edit
            </button>
            {extendedUser.status === 'Active' && (
              <button
                onClick={handleSuspendUser}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
              >
                Suspend
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Alert for Low Activation Rate (Shops only) */}
      {user.type === 'Shop' && extendedUser.activationRate && parseInt(extendedUser.activationRate) < 70 && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-gray-900 font-semibold mb-1">Low Activation Rate Detected</h4>
              <p className="text-gray-700 text-sm">
                This shop's customer activation rate ({extendedUser.activationRate}) is below the expected range (70-90%). 
                This may indicate issues with the registration process.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <InfoCard title="Basic Information">
          <div className="space-y-1">
            <InfoRow label={user.type === 'Shop' ? 'Shop Name' : 'Full Name'} value={extendedUser.name} icon={user.type === 'Shop' ? Store : User} />
            <InfoRow label="Email" value={extendedUser.email} icon={Mail} />
            <InfoRow label="Phone" value={extendedUser.phone} icon={Phone} />
            <InfoRow label="User Type" value={<UserTypeBadge type={extendedUser.type} />} icon={Shield} />
            <InfoRow label="Account Type" value={extendedUser.accountType} />
            <InfoRow label="Status" value={<StatusBadge status={extendedUser.status} />} />
          </div>
        </InfoCard>

        {/* Account Details - Different for Shop vs Customer */}
        <InfoCard title={user.type === 'Shop' ? 'Shop Details' : 'Account Details'}>
          <div className="space-y-1">
            <InfoRow label="ID" value={`#${extendedUser.id}`} />
            {user.type === 'Shop' && (
              <>
                <InfoRow label="TIN" value={extendedUser.tin} />
                <InfoRow label="Devices Sold" value={extendedUser.devicesSold} icon={Package} />
                <InfoRow label="Activation Rate" value={extendedUser.activationRate} icon={CheckCircle} />
              </>
            )}
            {user.type === 'Customer' && (
              <>
                <InfoRow label="Trusted Contacts" value={extendedUser.trustedContacts} />
                <InfoRow label="Transfers Completed" value={extendedUser.transfersCompleted} />
              </>
            )}
            <InfoRow label="Registration Date" value={extendedUser.registrationDate} icon={Calendar} />
            <InfoRow label="Last Active" value={extendedUser.lastActive} icon={Clock} />
            <InfoRow label="Verification" value={extendedUser.verificationStatus} />
            <InfoRow label="Total Devices" value={extendedUser.devices} icon={Smartphone} />
            <InfoRow label="Location" value={extendedUser.address} icon={MapPin} />
          </div>
        </InfoCard>

        {/* Registered/Owned Devices */}
        <div className="lg:col-span-2">
          <InfoCard title={user.type === 'Shop' ? 'Devices Registered by Shop' : 'Devices Owned by Customer'}>
            {userDevices.length > 0 ? (
              <div className="space-y-3">
                {userDevices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center gap-3 flex-1">
                      <Smartphone size={16} className="text-gray-600" />
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{device.name}</p>
                        <p className="text-gray-500 text-sm">
                          IMEI: {device.imei} • {user.type === 'Shop' ? `Customer: ${device.customer}` : `Shop: ${device.shop}`}
                        </p>
                        <p className="text-gray-500 text-xs">Registered: {device.registrationDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        device.status === 'Active' || device.status === 'Sold' ? 'bg-green-100 text-green-800' : 
                        device.status === 'Available' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {device.status}
                      </span>
                      <button
                        onClick={() => handleViewDevice(device)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Smartphone size={48} className="mx-auto mb-4 text-gray-400 opacity-50" />
                <h4 className="text-gray-700 font-medium mb-2">No Devices {user.type === 'Shop' ? 'Registered' : 'Owned'}</h4>
                <p className="text-gray-500 text-sm">
                  This {user.type.toLowerCase()} hasn't {user.type === 'Shop' ? 'registered' : 'owned'} any devices yet.
                </p>
              </div>
            )}
          </InfoCard>
        </div>
      </div>

      {/* Activity History */}
      <div className="mt-6">
        <InfoCard title="Recent Activity">
          <div className="space-y-3">
            {user.type === 'Shop' ? (
              <>
                <div className="flex items-center gap-3 py-2 border-b border-gray-200">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">Device registered and sold</p>
                    <p className="text-gray-500 text-xs">Samsung Galaxy S21 • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2 border-b border-gray-200">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">New device added to inventory</p>
                    <p className="text-gray-500 text-xs">iPhone 13 Pro • 5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">Checked stolen device database</p>
                    <p className="text-gray-500 text-xs">IMEI lookup • 1 day ago</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 py-2 border-b border-gray-200">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">Added trusted contact</p>
                    <p className="text-gray-500 text-xs">Sarah Mukamana • 3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2 border-b border-gray-200">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">Viewed digital receipt</p>
                    <p className="text-gray-500 text-xs">Receipt #TSR-2025-001234 • 1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">Device registered</p>
                    <p className="text-gray-500 text-xs">Samsung Galaxy S21 • 3 days ago</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

const UserManagement = () => {
  // ALL State variables declared at the very beginning
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'details'
  const [selectedUser, setSelectedUser] = useState(null);

  // Device Guard specific user data (Shops + Customers)
  const users = [
    {
      id: 'SHP001',
      name: 'Tech Shop Rwanda',
      type: 'Shop',
      status: 'Active',
      devices: 46,
      registrationDate: '2025-08-15',
      email: 'techshop@rwanda.com',
      phone: '+250 788 999 888',
      address: 'KN 5 Ave, Kigali',
      tin: '123456789',
      devicesSold: 23,
      activationRate: '87%',
      verified: true
    },
    {
      id: 'SHP002',
      name: 'Mobile Zone',
      type: 'Shop',
      status: 'Active',
      devices: 32,
      registrationDate: '2025-08-22',
      email: 'mobilezone@shop.rw',
      phone: '+250 788 777 666',
      address: 'Remera, Kigali',
      tin: '987654321',
      devicesSold: 18,
      activationRate: '82%',
      verified: true
    },
    {
      id: 'SHP003',
      name: 'Phone Hub',
      type: 'Shop',
      status: 'Active',
      devices: 28,
      registrationDate: '2025-08-30',
      email: 'phonehub@kigali.rw',
      phone: '+250 788 555 444',
      address: 'Kicukiro, Kigali',
      tin: '456789123',
      devicesSold: 15,
      activationRate: '35%', // Low activation rate - red flag
      verified: true
    },
    {
      id: 'CUS001',
      name: 'John Mugisha',
      type: 'Customer',
      status: 'Active',
      devices: 2,
      registrationDate: '2025-09-30',
      email: 'john.mugisha@gmail.com',
      phone: '+250 788 123 456',
      address: 'Kimironko, Kigali',
      trustedContacts: 2,
      transfersCompleted: 0,
      verified: true
    },
    {
      id: 'CUS002',
      name: 'Mary Uwimana',
      type: 'Customer',
      status: 'Active',
      devices: 1,
      registrationDate: '2026-03-15',
      email: 'mary.uwimana@gmail.com',
      phone: '+250 788 555 666',
      address: 'Nyarutarama, Kigali',
      trustedContacts: 2,
      transfersCompleted: 1,
      verified: true
    },
    {
      id: 'CUS003',
      name: 'Peter Nkusi',
      type: 'Customer',
      status: 'Active',
      devices: 1,
      registrationDate: '2025-09-28',
      email: 'peter.nkusi@gmail.com',
      phone: '+250 788 222 333',
      address: 'Gikondo, Kigali',
      trustedContacts: 1,
      transfersCompleted: 0,
      verified: false
    },
    {
      id: 'SHP004',
      name: 'Digital Store',
      type: 'Shop',
      status: 'Suspended',
      devices: 15,
      registrationDate: '2025-09-01',
      email: 'digitalstore@rwanda.com',
      phone: '+250 788 444 555',
      address: 'Town Center, Kigali',
      tin: '789123456',
      devicesSold: 8,
      activationRate: '15%', // Very low - suspicious
      verified: true
    },
    {
      id: 'CUS004',
      name: 'Sarah Kamikazi',
      type: 'Customer',
      status: 'Active',
      devices: 3,
      registrationDate: '2025-07-12',
      email: 'sarah.kamikazi@gmail.com',
      phone: '+250 788 666 777',
      address: 'Kacyiru, Kigali',
      trustedContacts: 2,
      transfersCompleted: 2,
      verified: true
    }
  ];

  // Filter users based on search and filter criteria
  const getFilteredUsers = () => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All Types' || user.type === typeFilter;
      const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  };

  const filteredUsers = getFilteredUsers();

  // Stats for dashboard
  const stats = {
    totalShops: users.filter(u => u.type === 'Shop').length,
    totalCustomers: users.filter(u => u.type === 'Customer').length,
    activeUsers: users.filter(u => u.status === 'Active').length,
    suspendedUsers: users.filter(u => u.status === 'Suspended').length
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedUser(null);
  };

  // Conditional rendering: show user list or user details
  if (currentView === 'details' && selectedUser) {
    return <UserDetailsView user={selectedUser} onBack={handleBackToList} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage shops and customers in the Device Guard platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs font-medium mb-1">Total Shops</p>
              <p className="text-gray-900 text-2xl font-bold">{stats.totalShops}</p>
            </div>
            <Store size={24} className="text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs font-medium mb-1">Total Customers</p>
              <p className="text-gray-900 text-2xl font-bold">{stats.totalCustomers}</p>
            </div>
            <User size={24} className="text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs font-medium mb-1">Active Users</p>
              <p className="text-gray-900 text-2xl font-bold">{stats.activeUsers}</p>
            </div>
            <CheckCircle size={24} className="text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs font-medium mb-1">Suspended</p>
              <p className="text-gray-900 text-2xl font-bold">{stats.suspendedUsers}</p>
            </div>
            <XCircle size={24} className="text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative md:col-span-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-900"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-gray-700 text-sm font-medium whitespace-nowrap">Type:</span>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
            >
              <option>All Types</option>
              <option>Shop</option>
              <option>Customer</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-gray-700 text-sm font-medium whitespace-nowrap">Status:</span>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table/Cards */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          {/* Table Header */}
          <div className="grid grid-cols-7 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700 uppercase tracking-wider">
            <div>ID</div>
            <div>NAME</div>
            <div>TYPE</div>
            <div>STATUS</div>
            <div>DEVICES</div>
            <div>REGISTERED</div>
            <div>ACTIONS</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <div key={user.id} className="grid grid-cols-7 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center">
                <div>
                  <span className="text-gray-600 font-medium">{user.id}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  {user.type === 'Shop' && user.activationRate && parseInt(user.activationRate) < 70 && (
                    <span className="text-yellow-600 text-xs flex items-center gap-1 mt-1">
                      <AlertTriangle size={12} />
                      Low activation rate
                    </span>
                  )}
                </div>
                <div>
                  <UserTypeBadge type={user.type} />
                </div>
                <div>
                  <StatusBadge status={user.status} />
                </div>
                <div>
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm font-medium">
                    {user.devices}
                  </span>
                </div>
                <div className="text-gray-600 text-sm">
                  {user.registrationDate}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleViewUser(user)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 truncate">{user.name}</div>
                      <div className="text-gray-500 text-xs mt-1">{user.id}</div>
                      {user.type === 'Shop' && user.activationRate && parseInt(user.activationRate) < 70 && (
                        <span className="text-yellow-600 text-xs flex items-center gap-1 mt-1">
                          <AlertTriangle size={12} />
                          Low activation rate
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button 
                        onClick={() => handleViewUser(user)}
                        className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Type: </span>
                      <UserTypeBadge type={user.type} />
                    </div>
                    <div>
                      <span className="text-gray-500">Status: </span>
                      <StatusBadge status={user.status} />
                    </div>
                    <div>
                      <span className="text-gray-500">Devices: </span>
                      <span className="bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded-full text-xs font-medium">
                        {user.devices}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Registered: </span>
                      <span className="text-gray-700">{user.registrationDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-gray-700 text-lg font-medium mb-2">No users found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;