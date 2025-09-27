import React, { useState } from 'react';
import { ArrowLeft, Smartphone, User, Calendar, Monitor, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';

// Status Badge Component
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

// Info Card Component
const InfoCard = ({ title, children }) => (
  <div className="bg-[#8D8DC7]/10 rounded-lg border border-[#8D8DC7] p-6">
    <h3 className="text-white text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

// Info Row Component
const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-center justify-between py-3 border-b border-[#8D8DC7]/30 last:border-b-0">
    <div className="flex items-center gap-3">
      {Icon && <Icon size={16} className="text-[#8D8DC7]" />}
      <span className="text-[#BEBEE0] text-sm font-medium">{label}:</span>
    </div>
    <div className="text-white font-medium">{value}</div>
  </div>
);

// Main Device Details Component
const DeviceDetailsView = ({ deviceId, onBack }) => {
  // Sample device data - replace with actual API call
  const device = {
    deviceId: 'DEV001',
    deviceName: 'MacBook Pro 16"',
    owner: 'John Doe',
    type: 'Laptop',
    status: 'Active',
    registrationDate: '2023-05-15',
    lastSeen: '2023-10-25',
    serialNumber: 'MP16-2023-001',
    model: 'MacBook Pro 16-inch (2023)',
    operatingSystem: 'macOS Sonoma 14.1',
    location: 'Office Building A, Floor 3'
  };

  // Sample transfer request data
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
  const handleBack = () => {
    console.log('Back to device list');
    if (onBack) {
      onBack();
    } else {
      alert('Back functionality - add your navigation logic here');
    }
  };

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
          onClick={handleBack}
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
            <InfoRow label="Serial Number" value={device.serialNumber} />
            <InfoRow label="Model" value={device.model} />
            <InfoRow label="Operating System" value={device.operatingSystem} />
            <InfoRow label="Last Seen" value={device.lastSeen} />
            <InfoRow label="Location" value={device.location} />
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

export default DeviceDetailsView;