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
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  MapPin,
  Store,
  Package,
  ShieldAlert
} from 'lucide-react';

// Status Badge Component - Device Guard Specific
const StatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    if (status === 'Active') {
      return 'bg-green-100 text-green-800 border-green-200';
    } else if (status === 'Sold') {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    } else if (status === 'Available') {
      return 'bg-purple-100 text-purple-800 border-purple-200';
    } else if (status === 'Stolen') {
      return 'bg-red-100 text-red-800 border-red-200';
    } else if (status === 'Recovered') {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    } else if (status === 'Transferred') {
      return 'bg-gray-100 text-gray-800 border-gray-200';
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <CheckCircle size={14} />;
      case 'Stolen': return <ShieldAlert size={14} />;
      case 'Available': return <Package size={14} />;
      default: return null;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(status)}`}>
      {getStatusIcon(status)}
      {status}
    </span>
  );
};

// Transfer Status Badge
const TransferStatusBadge = ({ status }) => {
  const getTransferStatusStyle = (status) => {
    if (status === 'pending') {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    } else if (status === 'completed') {
      return 'bg-green-100 text-green-800 border-green-200';
    } else if (status === 'cancelled') {
      return 'bg-red-100 text-red-800 border-red-200';
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={14} />;
      case 'completed': return <CheckCircle size={14} />;
      case 'cancelled': return <XCircle size={14} />;
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

// Info Card Component
const InfoCard = ({ title, children }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
    <h3 className="text-gray-900 text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

// Info Row Component
const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
    <div className="flex items-center gap-3">
      {Icon && <Icon size={16} className="text-gray-600" />}
      <span className="text-gray-600 text-sm font-medium">{label}:</span>
    </div>
    <div className="text-gray-900 font-medium">{value}</div>
  </div>
);

// Device Details View - Device Guard Specific
const DeviceDetailsView = ({ device, onBack }) => {
  // Extended device data
  const extendedDevice = {
    ...device,
    imei: device.imei || '353456789012345',
    brand: device.brand || 'Samsung',
    model: device.model || 'Galaxy S21',
    storage: device.storage || '128GB',
    color: device.color || 'Phantom Gray',
    condition: device.condition || 'Like New',
    purchasePrice: device.purchasePrice || '450,000 RWF',
    lastLocation: device.lastLocation || 'Kimironko, Kigali',
    warrantyExpiry: device.warrantyExpiry || '2026-03-30'
  };

  // Ownership history
  const ownershipHistory = [
    {
      from: 'Tech Shop Rwanda',
      to: device.owner,
      date: device.registrationDate,
      type: 'Original Sale',
      price: extendedDevice.purchasePrice
    }
  ];

  // Transfer request if exists
  const transferRequest = device.status === 'Transferred' ? {
    id: 'TRF-2026-5678',
    status: 'completed',
    from: device.owner,
    to: 'Mary Uwimana',
    date: '2026-03-15',
    price: '400,000 RWF'
  } : null;

  // Alert/Incident history
  const incidents = device.status === 'Stolen' || device.status === 'Recovered' ? [
    {
      type: 'stolen',
      date: '2025-10-15 18:45',
      location: 'Nyabugogo Bus Station',
      reportedBy: device.owner,
      status: device.status === 'Recovered' ? 'resolved' : 'active'
    }
  ] : [];

  const handleEditDevice = () => {
    console.log('Edit device:', device.deviceId);
    alert(`Edit device ${device.deviceName} - add your logic here`);
  };

  const handleFlagDevice = () => {
    console.log('Flag device:', device.deviceId);
    if (confirm(`Flag device ${device.deviceName} as suspicious?`)) {
      alert('Flag device functionality - add your logic here');
    }
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
          Back to Device Management
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 text-3xl font-bold mb-2">Device Details</h1>
            <p className="text-gray-600">{extendedDevice.brand} {extendedDevice.model} • IMEI: ***{extendedDevice.imei.slice(-4)}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={device.status} />
            <button
              onClick={handleEditDevice}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
            >
              Edit
            </button>
            {device.status !== 'Stolen' && (
              <button
                onClick={handleFlagDevice}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
              >
                Flag as Suspicious
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Alert for Stolen Devices */}
      {device.status === 'Stolen' && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-gray-900 font-semibold mb-1">This Device is Reported Stolen</h4>
              <p className="text-gray-700 text-sm">
                Reported by {device.owner} on {incidents[0]?.date}. All shops have been notified. 
                Any attempt to resell this device will be blocked.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <InfoCard title="Device Information">
          <div className="space-y-1">
            <InfoRow label="Device ID" value={device.deviceId} />
            <InfoRow label="IMEI" value={`***********${extendedDevice.imei.slice(-4)}`} icon={Smartphone} />
            <InfoRow label="Brand" value={extendedDevice.brand} />
            <InfoRow label="Model" value={extendedDevice.model} />
            <InfoRow label="Storage" value={extendedDevice.storage} />
            <InfoRow label="Color" value={extendedDevice.color} />
            <InfoRow label="Condition" value={extendedDevice.condition} />
            <InfoRow label="Status" value={<StatusBadge status={device.status} />} />
          </div>
        </InfoCard>

        {/* Ownership Details */}
        <InfoCard title="Ownership & Shop Details">
          <div className="space-y-1">
            <InfoRow label="Current Owner" value={device.owner} icon={User} />
            <InfoRow label="Sold By" value={device.shop} icon={Store} />
            <InfoRow label="Registration Date" value={device.registrationDate} icon={Calendar} />
            <InfoRow label="Purchase Price" value={extendedDevice.purchasePrice} />
            <InfoRow label="Receipt ID" value={device.receiptId || 'TSR-2025-001234'} />
            <InfoRow label="Warranty Expiry" value={extendedDevice.warrantyExpiry} />
            {device.lastLocation && (
              <InfoRow label="Last Known Location" value={extendedDevice.lastLocation} icon={MapPin} />
            )}
          </div>
        </InfoCard>

        {/* Ownership History */}
        <div className="lg:col-span-2">
          <InfoCard title="Ownership History">
            <div className="space-y-4">
              {ownershipHistory.map((transfer, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <RefreshCw size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-900 font-medium">{transfer.type}</p>
                        <p className="text-gray-600 text-sm">From: {transfer.from} → To: {transfer.to}</p>
                        <p className="text-gray-500 text-xs mt-1">Date: {transfer.date} • Price: {transfer.price}</p>
                      </div>
                      <span className="text-gray-500 text-xs">{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {transferRequest && (
                <div className="flex items-start gap-4 pb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-900 font-medium">Ownership Transferred</p>
                        <p className="text-gray-600 text-sm">From: {transferRequest.from} → To: {transferRequest.to}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          Date: {transferRequest.date} • Price: {transferRequest.price} • Transfer ID: {transferRequest.id}
                        </p>
                      </div>
                      <TransferStatusBadge status={transferRequest.status} />
                    </div>
                  </div>
                </div>
              )}

              {ownershipHistory.length === 1 && !transferRequest && (
                <p className="text-gray-500 text-sm text-center py-2">
                  Original owner • No transfers yet
                </p>
              )}
            </div>
          </InfoCard>
        </div>

        {/* Incidents/Alerts Section */}
        {incidents.length > 0 && (
          <div className="lg:col-span-2">
            <InfoCard title="Incidents & Alerts">
              <div className="space-y-4">
                {incidents.map((incident, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      incident.status === 'resolved' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      <ShieldAlert size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-gray-900 font-medium">
                            Device Reported {incident.type === 'stolen' ? 'Stolen' : 'Lost'}
                          </p>
                          <p className="text-gray-600 text-sm">Reported by: {incident.reportedBy}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            Date: {incident.date} • Location: {incident.location}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            Status: {incident.status === 'resolved' ? 'Recovered' : 'Active Alert'}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          incident.status === 'resolved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {incident.status === 'resolved' ? 'Resolved' : 'Active'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </InfoCard>
          </div>
        )}
      </div>

      {/* Activity History */}
      <div className="mt-6">
        <InfoCard title="Recent Activity">
          <div className="space-y-3">
            <div className="flex items-center gap-3 py-2 border-b border-gray-200">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">Device registered</p>
                <p className="text-gray-500 text-xs">By {device.shop} • {device.registrationDate}</p>
              </div>
            </div>
            {device.status === 'Sold' && (
              <div className="flex items-center gap-3 py-2 border-b border-gray-200">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">Device sold to customer</p>
                  <p className="text-gray-500 text-xs">Owner: {device.owner} • {device.registrationDate}</p>
                </div>
              </div>
            )}
            {device.status === 'Stolen' && (
              <div className="flex items-center gap-3 py-2">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">Device reported stolen</p>
                  <p className="text-gray-500 text-xs">{incidents[0]?.date} • {incidents[0]?.location}</p>
                </div>
              </div>
            )}
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

// Tab Button
const TabButton = ({ label, isActive, onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        isActive 
          ? 'text-indigo-600 border-b-2 border-indigo-600' 
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {label}
      {count !== undefined && (
        <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
          {count}
        </span>
      )}
    </button>
  );
};

// Action Menu
const ActionMenu = ({ device, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (actionType) => {
    setIsOpen(false);
    if (onAction) {
      onAction(actionType, device);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
      >
        <MoreVertical size={16} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <button
              onClick={() => handleAction('view')}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Eye size={14} />
              View Details
            </button>
            <button
              onClick={() => handleAction('edit')}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Edit size={14} />
              Edit Device
            </button>
            {device.status !== 'Stolen' && (
              <button
                onClick={() => handleAction('flag')}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-yellow-600 hover:bg-gray-50 transition-colors"
              >
                <AlertTriangle size={14} />
                Flag as Stolen
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Device Row
const DeviceRow = ({ device, isSelected, onSelect, onAction }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
          className="w-4 h-4 text-indigo-600 bg-white border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
        />
      </td>
      <td className="px-4 py-4">
        <span className="text-gray-900 font-medium">{device.deviceId}</span>
      </td>
      <td className="px-4 py-4">
        <div>
          <span className="text-gray-700">{device.deviceName}</span>
          <p className="text-gray-500 text-xs mt-1">IMEI: ***{device.imei?.slice(-4) || '****'}</p>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className="text-gray-700">{device.owner}</span>
      </td>
      <td className="px-4 py-4">
        <span className="text-gray-700">{device.shop}</span>
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={device.status} />
      </td>
      <td className="px-4 py-4">
        <span className="text-gray-600 text-sm">{device.registrationDate}</span>
      </td>
      <td className="px-4 py-4">
        <ActionMenu device={device} onAction={onAction} />
      </td>
    </tr>
  );
};

// Main Component - Device Guard Device Management
const DeviceManagement = () => {
  const [activeTab, setActiveTab] = useState('All Devices');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDevices, setSelectedDevices] = useState(new Set());
  const [currentView, setCurrentView] = useState('list');
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Device Guard specific device data
  const devices = [
    {
      deviceId: 'DEV001',
      deviceName: 'Samsung Galaxy S21',
      imei: '353456789012345',
      owner: 'John Mugisha',
      shop: 'Tech Shop Rwanda',
      type: 'Mobile',
      status: 'Active',
      registrationDate: '2025-09-30',
      receiptId: 'TSR-2025-001234'
    },
    {
      deviceId: 'DEV002',
      deviceName: 'iPhone 13 Pro',
      imei: '353456789056789',
      owner: 'Sarah Kamikazi',
      shop: 'Mobile Zone',
      type: 'Mobile',
      status: 'Active',
      registrationDate: '2025-09-28',
      receiptId: 'MZ-2025-000567'
    },
    {
      deviceId: 'DEV003',
      deviceName: 'Samsung A54',
      imei: '353456789011122',
      owner: 'Peter Nkusi',
      shop: 'Phone Hub',
      type: 'Mobile',
      status: 'Stolen',
      registrationDate: '2025-10-01',
      receiptId: 'PH-2025-000234'
    },
    {
      deviceId: 'DEV004',
      deviceName: 'iPhone 12',
      imei: '353456789023456',
      owner: 'Mary Uwimana',
      shop: 'Tech Shop Rwanda',
      type: 'Mobile',
      status: 'Transferred',
      registrationDate: '2025-03-15',
      receiptId: 'TSR-2025-000012'
    },
    {
      deviceId: 'DEV005',
      deviceName: 'Samsung Galaxy S23',
      imei: '353456789034567',
      owner: 'Tech Shop Rwanda',
      shop: 'Tech Shop Rwanda',
      type: 'Mobile',
      status: 'Available',
      registrationDate: '2025-10-02',
      receiptId: null
    },
    {
      deviceId: 'DEV006',
      deviceName: 'iPhone 14 Pro',
      imei: '353456789045678',
      owner: 'John Mugisha',
      shop: 'Mobile Zone',
      type: 'Mobile',
      status: 'Recovered',
      registrationDate: '2025-08-10',
      receiptId: 'MZ-2025-000345'
    },
    {
      deviceId: 'DEV007',
      deviceName: 'Samsung A33',
      imei: '353456789067890',
      owner: 'Grace Mukamana',
      shop: 'Phone Hub',
      type: 'Mobile',
      status: 'Sold',
      registrationDate: '2025-09-25',
      receiptId: 'PH-2025-000189'
    }
  ];

  const getFilteredDevices = () => {
    let filtered = devices;
    
    if (activeTab !== 'All Devices') {
      filtered = filtered.filter(device => device.status === activeTab);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(device =>
        device.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.imei.includes(searchTerm)
      );
    }
    
    return filtered;
  };

  const filteredDevices = getFilteredDevices();

  const getDeviceCounts = () => {
    return {
      'All Devices': devices.length,
      'Active': devices.filter(d => d.status === 'Active').length,
      'Stolen': devices.filter(d => d.status === 'Stolen').length,
      'Available': devices.filter(d => d.status === 'Available').length,
      'Recovered': devices.filter(d => d.status === 'Recovered').length
    };
  };

  const deviceCounts = getDeviceCounts();

  const handleSelectAll = (checked) => {
    if (checked) {
      const allDeviceIds = filteredDevices.map(d => d.deviceId);
      setSelectedDevices(new Set(allDeviceIds));
    } else {
      setSelectedDevices(new Set());
    }
  };

  const handleSelectDevice = (deviceId, checked) => {
    const newSelected = new Set(selectedDevices);
    if (checked) {
      newSelected.add(deviceId);
    } else {
      newSelected.delete(deviceId);
    }
    setSelectedDevices(newSelected);
  };

  const handleDeviceAction = (action, device) => {
    console.log(`Action: ${action}`, device);
    
    if (action === 'view') {
      setSelectedDevice(device);
      setCurrentView('details');
    } else if (action === 'flag') {
      if (confirm(`Flag ${device.deviceName} as stolen?`)) {
        alert('Flag as stolen functionality - add your logic here');
      }
    } else {
      alert(`${action} action for device: ${device.deviceName}`);
    }
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedDevice(null);
  };

  const handleFilter = () => {
    alert('Advanced filter functionality - add your logic here');
  };

  const handleExport = () => {
    alert('Export device data - add your logic here');
  };

  if (currentView === 'details' && selectedDevice) {
    return <DeviceDetailsView device={selectedDevice} onBack={handleBackToList} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-gray-900 text-3xl font-bold mb-1">Device Management</h1>
          <p className="text-gray-600 text-sm">Manage all registered devices in the Device Guard platform</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleFilter}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg transition-colors"
          >
            <Filter size={16} />
            Filter
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-600 rounded-lg transition-colors"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-gray-600 text-xs font-medium mb-1">Total Devices</p>
          <p className="text-gray-900 text-2xl font-bold">{deviceCounts['All Devices']}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-gray-600 text-xs font-medium mb-1">Active</p>
          <p className="text-gray-900 text-2xl font-bold">{deviceCounts['Active']}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-gray-600 text-xs font-medium mb-1">Stolen</p>
          <p className="text-gray-900 text-2xl font-bold">{deviceCounts['Stolen']}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-gray-600 text-xs font-medium mb-1">Available</p>
          <p className="text-gray-900 text-2xl font-bold">{deviceCounts['Available']}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-gray-600 text-xs font-medium mb-1">Recovered</p>
          <p className="text-gray-900 text-2xl font-bold">{deviceCounts['Recovered']}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-gray-200">
        <TabButton
          label="All Devices"
          isActive={activeTab === 'All Devices'}
          onClick={() => setActiveTab('All Devices')}
          count={deviceCounts['All Devices']}
        />
        <TabButton
          label="Active"
          isActive={activeTab === 'Active'}
          onClick={() => setActiveTab('Active')}
          count={deviceCounts['Active']}
        />
        <TabButton
          label="Stolen"
          isActive={activeTab === 'Stolen'}
          onClick={() => setActiveTab('Stolen')}
          count={deviceCounts['Stolen']}
        />
        <TabButton
          label="Available"
          isActive={activeTab === 'Available'}
          onClick={() => setActiveTab('Available')}
          count={deviceCounts['Available']}
        />
        <TabButton
          label="Recovered"
          isActive={activeTab === 'Recovered'}
          onClick={() => setActiveTab('Recovered')}
          count={deviceCounts['Recovered']}
        />
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by Device ID, Name, Owner, or IMEI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Device Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedDevices.size === filteredDevices.length && filteredDevices.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 bg-white border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                  />
                </th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm font-semibold">Device ID</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm font-semibold">Device Name</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm font-semibold">Owner</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm font-semibold">Shop</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm font-semibold">Registration Date</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.length > 0 ? (
                filteredDevices.map((device) => (
                  <DeviceRow
                    key={device.deviceId}
                    device={device}
                    isSelected={selectedDevices.has(device.deviceId)}
                    onSelect={(checked) => handleSelectDevice(device.deviceId, checked)}
                    onAction={handleDeviceAction}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                    No devices found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selection Info */}
      {selectedDevices.size > 0 && (
        <div className="mt-4 flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <span className="text-gray-700">
            {selectedDevices.size} device{selectedDevices.size !== 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg transition-colors text-sm font-medium">
              Bulk Export
            </button>
            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium">
              Bulk Flag
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceManagement;