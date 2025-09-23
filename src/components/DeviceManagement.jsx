import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    Active: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
    Inactive: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
    Locked: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
    Stolen: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' }
  };

  const config = statusConfig[status] || statusConfig.Active;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
      <div className={`w-2 h-2 rounded-full ${config.dot}`}></div>
      {status}
    </div>
  );
};

// Tab Component
const TabButton = ({ label, isActive, onClick, count }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium transition-colors relative ${
      isActive 
        ? 'text-blue-400 border-b-2 border-blue-400' 
        : 'text-gray-400 hover:text-white'
    }`}
  >
    {label}
    {count !== undefined && (
      <span className="ml-2 px-2 py-1 text-xs bg-slate-700 text-gray-300 rounded-full">
        {count}
      </span>
    )}
  </button>
);

// Device Row Component
const DeviceRow = ({ device, isSelected, onSelect, onAction }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
        />
      </td>
      <td className="px-4 py-4">
        <span className="text-white font-medium">{device.deviceId}</span>
      </td>
      <td className="px-4 py-4">
        <span className="text-gray-300">{device.deviceName}</span>
      </td>
      <td className="px-4 py-4">
        <span className="text-gray-300">{device.owner}</span>
      </td>
      <td className="px-4 py-4">
        <span className="text-gray-300">{device.type}</span>
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={device.status} />
      </td>
      <td className="px-4 py-4">
        <span className="text-gray-400 text-sm">{device.registrationDate}</span>
      </td>
      <td className="px-4 py-4">
        <span className="text-gray-400 text-sm">{device.lastSeen}</span>
      </td>
      <td className="px-4 py-4">
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 text-gray-400 hover:text-white hover:bg-slate-600 rounded transition-colors"
          >
            <MoreVertical size={16} />
          </button>
          {showActions && (
            <div className="absolute right-0 top-8 w-48 bg-slate-800 border border-slate-600 rounded-lg shadow-lg z-10">
              <button
                onClick={() => onAction('view', device)}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Eye size={14} />
                View Details
              </button>
              <button
                onClick={() => onAction('edit', device)}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Edit size={14} />
                Edit Device
              </button>
              <button
                onClick={() => onAction('delete', device)}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors"
              >
                <Trash2 size={14} />
                Delete Device
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

// Main Device Management Component
const DeviceManagement = ({ 
  devices = [],
  onSearch,
  onFilter,
  onExport,
  onRegisterDevice,
  onDeviceAction
}) => {
  const [activeTab, setActiveTab] = useState('All Devices');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDevices, setSelectedDevices] = useState(new Set());

  // Default sample data
  const defaultDevices = [
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

  const deviceData = devices.length > 0 ? devices : defaultDevices;

  // Filter devices based on active tab
  const filteredDevices = deviceData.filter(device => {
    if (activeTab === 'All Devices') return true;
    return device.status === activeTab;
  });

  // Further filter by search term
  const searchFilteredDevices = filteredDevices.filter(device =>
    device.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get device counts for tabs
  const deviceCounts = {
    'All Devices': deviceData.length,
    'Active': deviceData.filter(d => d.status === 'Active').length,
    'Locked': deviceData.filter(d => d.status === 'Locked').length,
    'Inactive': deviceData.filter(d => d.status === 'Inactive').length
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedDevices(new Set(searchFilteredDevices.map(d => d.deviceId)));
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

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch && onSearch(value);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700">
        <div>
          <h1 className="text-white text-3xl font-bold">Device Management</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onFilter}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white border border-slate-600 rounded-lg transition-colors"
          >
            <Filter size={16} />
            Filter
          </button>
          <button 
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white border border-slate-600 rounded-lg transition-colors"
          >
            <Download size={16} />
            Export
          </button>
          <button 
            onClick={onRegisterDevice}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Register Device
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tabs */}
        <div className="flex items-center gap-8 mb-6 border-b border-slate-700">
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

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by Device ID or Serial Number..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700/50 border-b border-slate-600">
                  <th className="px-4 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedDevices.size === searchFilteredDevices.length && searchFilteredDevices.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </th>
                  <th className="px-4 py-4 text-left text-gray-400 font-medium text-sm uppercase tracking-wider">
                    Device ID
                  </th>
                  <th className="px-4 py-4 text-left text-gray-400 font-medium text-sm uppercase tracking-wider">
                    Device Name
                  </th>
                  <th className="px-4 py-4 text-left text-gray-400 font-medium text-sm uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-4 py-4 text-left text-gray-400 font-medium text-sm uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-4 text-left text-gray-400 font-medium text-sm uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-4 text-left text-gray-400 font-medium text-sm uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="px-4 py-4 text-left text-gray-400 font-medium text-sm uppercase tracking-wider">
                    Last Seen
                  </th>
                  <th className="px-4 py-4 text-left text-gray-400 font-medium text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchFilteredDevices.map((device) => (
                  <DeviceRow
                    key={device.deviceId}
                    device={device}
                    isSelected={selectedDevices.has(device.deviceId)}
                    onSelect={(checked) => handleSelectDevice(device.deviceId, checked)}
                    onAction={onDeviceAction}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {searchFilteredDevices.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-gray-400 text-lg font-medium mb-2">No devices found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>

        {/* Selected Actions */}
        {selectedDevices.size > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 border border-slate-600 rounded-lg px-6 py-4 shadow-lg">
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
    </div>
  );
};

export default DeviceManagement;