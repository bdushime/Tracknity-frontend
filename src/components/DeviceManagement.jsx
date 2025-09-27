import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  Smartphone, 
  User, 
  Calendar, 
  Monitor, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock
} from 'lucide-react';

// Status Badge Component (reused in both views)
const StatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    if (status === 'Active') {
      return 'bg-green-100 text-green-800 border-green-200';
    } else if (status === 'Inactive') {
      return 'bg-red-100 text-red-800 border-red-200';
    } else if (status === 'Locked') {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    } else if (status === 'Stolen') {
      return 'bg-red-100 text-red-800 border-red-200';
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(status)}`}>
      {status}
    </span>
  );
};

// Transfer Request Status Badge
const TransferStatusBadge = ({ status }) => {
  const getTransferStatusStyle = (status) => {
    if (status === 'pending') {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    } else if (status === 'approved') {
      return 'bg-green-100 text-green-800 border-green-200';
    } else if (status === 'rejected') {
      return 'bg-red-100 text-red-800 border-red-200';
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={14} />;
      case 'approved': return <CheckCircle size={14} />;
      case 'rejected': return <XCircle size={14} />;
      default: return null;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getTransferStatusStyle(status)}`}>
      {getStatusIcon(status)}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Info Card Component for Device Details
const InfoCard = ({ title, children }) => (
  <div className="bg-[#8D8DC7]/10 rounded-lg border border-[#8D8DC7] p-6">
    <h3 className="text-white text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

// Info Row Component for Device Details
const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-center justify-between py-3 border-b border-[#8D8DC7]/30 last:border-b-0">
    <div className="flex items-center gap-3">
      {Icon && <Icon size={16} className="text-[#8D8DC7]" />}
      <span className="text-[#BEBEE0] text-sm font-medium">{label}:</span>
    </div>
    <div className="text-white font-medium">{value}</div>
  </div>
);

// Device Details View Component
const DeviceDetailsView = ({ device, onBack }) => {
  // Sample transfer request data - replace with real API call
  const transferRequest = {
    id: 'TR001',
    status: 'pending', // pending, approved, rejected, or null for no request
    requestedBy: 'Jane Smith',
    requestDate: '2023-10-20',
    reason: 'Employee department transfer',
    newOwner: 'Jane Smith',
    requestedDate: '2023-10-20 14:30'
  };

  // Handle button clicks
  const handleEditDevice = () => {
    console.log('Edit device:', device.deviceId);
    alert(`Edit device ${device.deviceName} - add your logic here`);
  };

  const handleTransferAction = (action) => {
    console.log(`Transfer ${action}:`, transferRequest.id);
    alert(`Transfer ${action} functionality - add your logic here`);
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
          Back to Device Management
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">Device Details</h1>
            <p className="text-[#BEBEE0]">Viewing details for {device.deviceName}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={device.status} />
            <button
              onClick={handleEditDevice}
              className="px-4 py-2 bg-[#BEBEE0] hover:bg-white text-[#343264] rounded-lg transition-colors font-medium"
            >
              Edit Device
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <InfoCard title="Basic Information">
          <div className="space-y-1">
            <InfoRow label="Device ID" value={device.deviceId} icon={Smartphone} />
            <InfoRow label="Device Name" value={device.deviceName} icon={Monitor} />
            <InfoRow label="Owner" value={device.owner} icon={User} />
            <InfoRow label="Type" value={device.type} />
            <InfoRow label="Registration Date" value={device.registrationDate} icon={Calendar} />
            <InfoRow label="Status" value={<StatusBadge status={device.status} />} />
          </div>
        </InfoCard>

        {/* Technical Details */}
        <InfoCard title="Technical Details">
          <div className="space-y-1">
            <InfoRow label="Serial Number" value={device.serialNumber || 'N/A'} />
            <InfoRow label="Model" value={device.model || device.deviceName} />
            <InfoRow label="Operating System" value={device.operatingSystem || 'N/A'} />
            <InfoRow label="Last Seen" value={device.lastSeen || 'N/A'} />
            <InfoRow label="Location" value={device.location || 'Not specified'} />
          </div>
        </InfoCard>

        {/* Transfer Request Section */}
        <div className="lg:col-span-2">
          <InfoCard title="Ownership Transfer">
            {transferRequest.status ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[#BEBEE0] font-medium">Active Transfer Request</h4>
                  <TransferStatusBadge status={transferRequest.status} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoRow label="Request ID" value={transferRequest.id} />
                  <InfoRow label="Requested By" value={transferRequest.requestedBy} />
                  <InfoRow label="Request Date" value={transferRequest.requestDate} />
                  <InfoRow label="New Owner" value={transferRequest.newOwner} />
                </div>
                
                <div className="mt-4">
                  <InfoRow label="Reason" value={transferRequest.reason} />
                </div>

                {transferRequest.status === 'pending' && (
                  <div className="flex items-center gap-3 pt-4 border-t border-[#8D8DC7]/30">
                    <button
                      onClick={() => handleTransferAction('approve')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                    >
                      Approve Transfer
                    </button>
                    <button
                      onClick={() => handleTransferAction('reject')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                    >
                      Reject Transfer
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <RefreshCw size={48} className="mx-auto mb-4 text-[#8D8DC7] opacity-50" />
                <h4 className="text-[#BEBEE0] font-medium mb-2">No Transfer Request</h4>
                <p className="text-[#8D8DC7] text-sm">
                  There are currently no pending ownership transfer requests for this device.
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
              Device activity history will be displayed here.
            </p>
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

// Tab Button - for switching between All, Active, Locked, etc.
const TabButton = ({ label, isActive, onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        isActive 
          ? 'text-[#8D8DC7] border-b-2 border-[#8D8DC7]' 
          : 'text-[#BEBEE0] hover:text-white'
      }`}
    >
      {label}
      {count !== undefined && (
        <span className="ml-2 px-2 py-1 text-xs bg-[#343264] text-[#BEBEE0] rounded-full">
          {count}
        </span>
      )}
    </button>
  );
};

// Action Menu - the three dots menu for each device row
const ActionMenu = ({ device, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (actionType) => {
    setIsOpen(false); // Close menu
    if (onAction) {
      onAction(actionType, device);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-[#BEBEE0] hover:text-white hover:bg-[#8D8DC7] rounded transition-colors"
      >
        <MoreVertical size={16} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-8 w-48 bg-[#343264] border border-[#8D8DC7] rounded-lg shadow-lg z-10">
          <button
            onClick={() => handleAction('view')}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#BEBEE0] hover:bg-[#8D8DC7] hover:text-white transition-colors"
          >
            <Eye size={14} />
            View Details
          </button>
          <button
            onClick={() => handleAction('edit')}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#BEBEE0] hover:bg-[#8D8DC7] hover:text-white transition-colors"
          >
            <Edit size={14} />
            Edit Device
          </button>
          <button
            onClick={() => handleAction('delete')}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-[#8D8DC7] hover:text-red-300 transition-colors"
          >
            <Trash2 size={14} />
            Delete Device
          </button>
        </div>
      )}
    </div>
  );
};

// Device Row - represents one device in the table
const DeviceRow = ({ device, isSelected, onSelect, onAction }) => {
  return (
    <tr className="border-b border-[#8D8DC7] hover:bg-[#343264]/30 transition-colors">
      {/* Checkbox */}
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
          className="w-4 h-4 text-[#8D8DC7] bg-[#343264] border-[#8D8DC7] rounded focus:ring-[#8D8DC7] focus:ring-2"
        />
      </td>
      
      {/* Device ID */}
      <td className="px-4 py-4">
        <span className="text-white font-medium">{device.deviceId}</span>
      </td>
      
      {/* Device Name */}
      <td className="px-4 py-4">
        <span className="text-[#BEBEE0]">{device.deviceName}</span>
      </td>
      
      {/* Owner */}
      <td className="px-4 py-4">
        <span className="text-[#BEBEE0]">{device.owner}</span>
      </td>
      
      {/* Type */}
      <td className="px-4 py-4">
        <span className="text-[#BEBEE0]">{device.type}</span>
      </td>
      
      {/* Status */}
      <td className="px-4 py-4">
        <StatusBadge status={device.status} />
      </td>
      
      {/* Registration Date */}
      <td className="px-4 py-4">
        <span className="text-[#8D8DC7] text-sm">{device.registrationDate}</span>
      </td>
      
      {/* Actions */}
      <td className="px-4 py-4">
        <ActionMenu device={device} onAction={onAction} />
      </td>
    </tr>
  );
};

// Main Component
const DeviceManagement = () => {
  // State - these store the current values
  const [activeTab, setActiveTab] = useState('All Devices');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDevices, setSelectedDevices] = useState(new Set());
  
  // NEW: State to control which view to show
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'details'
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Sample data - replace this with real data from your backend later
  const devices = [
    {
      deviceId: 'DEV001',
      deviceName: 'MacBook Pro 16"',
      owner: 'John Doe',
      type: 'Laptop',
      status: 'Active',
      registrationDate: '2023-05-15',
      lastSeen: '2023-10-25'
    },
    {
      deviceId: 'DEV002',
      deviceName: 'iPhone 14 Pro',
      owner: 'Jane Smith',
      type: 'Mobile',
      status: 'Active',
      registrationDate: '2023-06-22',
      lastSeen: '2023-10-26'
    },
    {
      deviceId: 'DEV003',
      deviceName: 'Dell XPS 15',
      owner: 'Robert Johnson',
      type: 'Laptop',
      status: 'Inactive',
      registrationDate: '2023-03-10',
      lastSeen: '2023-09-15'
    },
    {
      deviceId: 'DEV004',
      deviceName: 'iPad Air',
      owner: 'Emily Davis',
      type: 'Tablet',
      status: 'Active',
      registrationDate: '2023-07-05',
      lastSeen: '2023-10-24'
    },
    {
      deviceId: 'DEV005',
      deviceName: 'Samsung Galaxy S23',
      owner: 'Michael Wilson',
      type: 'Mobile',
      status: 'Locked',
      registrationDate: '2023-04-18',
      lastSeen: '2023-10-10'
    }
  ];

  // Filter devices by active tab (All, Active, Locked, etc.)
  const getFilteredDevices = () => {
    let filtered = devices;
    
    // Filter by tab
    if (activeTab !== 'All Devices') {
      filtered = filtered.filter(device => device.status === activeTab);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(device =>
        device.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.owner.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredDevices = getFilteredDevices();

  // Count devices for each tab
  const getDeviceCounts = () => {
    return {
      'All Devices': devices.length,
      'Active': devices.filter(d => d.status === 'Active').length,
      'Locked': devices.filter(d => d.status === 'Locked').length,
      'Inactive': devices.filter(d => d.status === 'Inactive').length
    };
  };

  const deviceCounts = getDeviceCounts();

  // Handle selecting all devices
  const handleSelectAll = (checked) => {
    if (checked) {
      const allDeviceIds = filteredDevices.map(d => d.deviceId);
      setSelectedDevices(new Set(allDeviceIds));
    } else {
      setSelectedDevices(new Set());
    }
  };

  // Handle selecting individual device
  const handleSelectDevice = (deviceId, checked) => {
    const newSelected = new Set(selectedDevices);
    if (checked) {
      newSelected.add(deviceId);
    } else {
      newSelected.delete(deviceId);
    }
    setSelectedDevices(newSelected);
  };

  // Handle device actions (view, edit, delete)
  const handleDeviceAction = (action, device) => {
    console.log(`Action: ${action}`, device);
    
    if (action === 'view') {
      // Switch to details view and set the selected device
      setSelectedDevice(device);
      setCurrentView('details');
    } else {
      // For other actions, show alert (you can replace with real functionality)
      alert(`${action} action for device: ${device.deviceName}`);
    }
  };

  // Handle going back to device list from details view
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedDevice(null);
  };

  // Handle button clicks
  const handleFilter = () => {
    console.log('Filter clicked');
    alert('Filter functionality - add your logic here');
  };

  const handleExport = () => {
    console.log('Export clicked');
    alert('Export functionality - add your logic here');
  };

  const handleRegisterDevice = () => {
    console.log('Register device clicked');
    alert('Register device functionality - add your logic here');
  };

  // Conditional rendering: show device list or device details
  if (currentView === 'details' && selectedDevice) {
    return <DeviceDetailsView device={selectedDevice} onBack={handleBackToList} />;
  }

  // Default: show device management list
  return (
    <div className="min-h-screen bg-[#343264] p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6 border-b border-[#8D8DC7] pb-6">
        <div>
          <h1 className="text-white text-3xl font-bold">Device Management</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleFilter}
            className="flex items-center gap-2 px-4 py-2 bg-[#8D8DC7] hover:bg-[#BEBEE0] text-white hover:text-[#343264] border border-[#8D8DC7] rounded-lg transition-colors"
          >
            <Filter size={16} />
            Filter
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-[#8D8DC7] hover:bg-[#BEBEE0] text-white hover:text-[#343264] border border-[#8D8DC7] rounded-lg transition-colors"
          >
            <Download size={16} />
            Export
          </button>
          <button 
            onClick={handleRegisterDevice}
            className="flex items-center gap-2 px-4 py-2 bg-[#BEBEE0] hover:bg-white text-[#343264] rounded-lg transition-colors font-medium"
          >
            Register Device
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex items-center gap-8 mb-6 border-b border-[#8D8DC7]">
        {Object.entries(deviceCounts).map(([tab, count]) => (
          <TabButton
            key={tab}
            label={tab}
            count={count}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8D8DC7]" size={20} />
          <input
            type="text"
            placeholder="Search by Device ID, Name, or Owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#8D8DC7]/20 border border-[#8D8DC7] rounded-lg pl-12 pr-4 py-3 text-white placeholder-[#BEBEE0] focus:outline-none focus:border-[#BEBEE0] transition-colors"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#8D8DC7]/10 rounded-lg border border-[#8D8DC7] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#8D8DC7]/20 border-b border-[#8D8DC7]">
                <th className="px-4 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedDevices.size === filteredDevices.length && filteredDevices.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-[#8D8DC7] bg-[#343264] border-[#8D8DC7] rounded focus:ring-[#8D8DC7] focus:ring-2"
                  />
                </th>
                <th className="px-4 py-4 text-left text-[#BEBEE0] font-medium text-sm uppercase tracking-wider">
                  Device ID
                </th>
                <th className="px-4 py-4 text-left text-[#BEBEE0] font-medium text-sm uppercase tracking-wider">
                  Device Name
                </th>
                <th className="px-4 py-4 text-left text-[#BEBEE0] font-medium text-sm uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-4 py-4 text-left text-[#BEBEE0] font-medium text-sm uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-4 text-left text-[#BEBEE0] font-medium text-sm uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-4 text-left text-[#BEBEE0] font-medium text-sm uppercase tracking-wider">
                  Registration Date
                </th>
                <th className="px-4 py-4 text-left text-[#BEBEE0] font-medium text-sm uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody>
              {filteredDevices.map((device) => (
                <DeviceRow
                  key={device.deviceId}
                  device={device}
                  isSelected={selectedDevices.has(device.deviceId)}
                  onSelect={(checked) => handleSelectDevice(device.deviceId, checked)}
                  onAction={handleDeviceAction}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State - shows when no devices found */}
        {filteredDevices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#8D8DC7] mb-4">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-[#BEBEE0] text-lg font-medium mb-2">No devices found</h3>
            <p className="text-[#8D8DC7]">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>

      {/* Selected Devices Actions - shows when devices are selected */}
      {selectedDevices.size > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#343264] border border-[#8D8DC7] rounded-lg px-6 py-4 shadow-lg">
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">
              {selectedDevices.size} device{selectedDevices.size !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors">
                Activate
              </button>
              <button className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm transition-colors">
                Lock
              </button>
              <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceManagement;