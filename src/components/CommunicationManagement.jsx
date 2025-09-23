import React, { useState } from 'react';
import { Mail, Bell, Users, Check, X, AlertCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';

// Custom StatusBadge component
const StatusBadge = ({ status, label }) => {
  const statusColors = {
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
      {label}
    </span>
  );
};

// Custom DataTable component
const DataTable = ({ columns, data, searchable, pagination, onRowClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter data based on search term
  const filteredData = data.filter(item => 
    Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {searchable && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {column.sortable && sortConfig.key === column.key && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((row, index) => (
              <tr
                key={row.id || index}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CommunicationManagement = () => {
  const [activeTab, setActiveTab] = useState('notifications');

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Oct 30, 2023',
      date: '2023-10-25',
      status: 'scheduled',
      recipients: 'All Users'
    },
    {
      id: 2,
      title: 'New Security Feature',
      message: "We've added two-factor authentication",
      date: '2023-10-20',
      status: 'sent',
      recipients: 'All Users',
      openRate: '68%'
    },
    {
      id: 3,
      title: 'Holiday Hours',
      message: 'Support hours during the upcoming holidays',
      date: '2023-10-15',
      status: 'sent',
      recipients: 'All Admins',
      openRate: '92%'
    },
    {
      id: 4,
      title: 'Theft Alert Protocol',
      message: 'Updated procedure for reporting theft',
      date: '2023-10-10',
      status: 'draft',
      recipients: 'All Users'
    },
    {
      id: 5,
      title: 'New Device Registration',
      message: 'How to register your new devices',
      date: '2023-10-05',
      status: 'sent',
      recipients: 'New Users',
      openRate: '45%'
    }
  ];

  // Mock data for email logs
  const emailLogs = [
    {
      id: 'EM001',
      recipient: 'john.doe@example.com',
      subject: 'Your Device Has Been Registered',
      date: '2023-10-25 14:32',
      status: 'delivered'
    },
    {
      id: 'EM002',
      recipient: 'jane.smith@example.com',
      subject: 'Security Alert: New Login',
      date: '2023-10-25 12:15',
      status: 'delivered'
    },
    {
      id: 'EM003',
      recipient: 'robert.johnson@example.com',
      subject: 'Password Reset Request',
      date: '2023-10-24 18:45',
      status: 'opened'
    },
    {
      id: 'EM004',
      recipient: 'emily.davis@example.com',
      subject: 'Theft Report Confirmation',
      date: '2023-10-24 10:22',
      status: 'opened'
    },
    {
      id: 'EM005',
      recipient: 'michael.wilson@example.com',
      subject: 'Account Verification Required',
      date: '2023-10-23 16:18',
      status: 'bounced'
    },
    {
      id: 'EM006',
      recipient: 'sarah.brown@example.com',
      subject: 'Your Monthly Security Report',
      date: '2023-10-22 09:05',
      status: 'delivered'
    },
    {
      id: 'EM007',
      recipient: 'david.miller@example.com',
      subject: 'Device Status Change',
      date: '2023-10-21 14:30',
      status: 'opened'
    },
    {
      id: 'EM008',
      recipient: 'lisa.taylor@example.com',
      subject: 'Important: Action Required',
      date: '2023-10-20 11:47',
      status: 'failed'
    }
  ];

  // Mock data for trusted contacts
  const trustedContacts = [
    {
      id: 1,
      name: 'Emergency Services',
      email: 'dispatch@police.gov',
      phone: '911',
      type: 'authority',
      users: 'All'
    },
    {
      id: 2,
      name: 'IT Department',
      email: 'it@company.com',
      phone: '555-123-4567',
      type: 'internal',
      users: 'All'
    },
    {
      id: 3,
      name: 'Security Office',
      email: 'security@company.com',
      phone: '555-987-6543',
      type: 'internal',
      users: 'All'
    },
    {
      id: 4,
      name: 'Jane Smith (Emergency)',
      email: 'jane.emergency@example.com',
      phone: '555-234-5678',
      type: 'personal',
      users: 'John Doe'
    },
    {
      id: 5,
      name: 'Robert Johnson (Manager)',
      email: 'robert.manager@example.com',
      phone: '555-345-6789',
      type: 'personal',
      users: 'Emily Davis'
    }
  ];

  // Define columns for notifications table
  const notificationColumns = [
    {
      key: 'title',
      label: 'Title',
      sortable: true
    },
    {
      key: 'message',
      label: 'Message',
      sortable: true
    },
    {
      key: 'recipients',
      label: 'Recipients',
      sortable: true
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value, row) => {
        let status = 'info';
        let label = value.charAt(0).toUpperCase() + value.slice(1);
        
        switch (value) {
          case 'sent':
            status = 'success';
            label = 'Sent';
            break;
          case 'scheduled':
            status = 'warning';
            label = 'Scheduled';
            break;
          case 'draft':
            status = 'info';
            label = 'Draft';
            break;
        }
        
        return (
          <div>
            <StatusBadge status={status} label={label} />
            {row.openRate && (
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Open rate: {row.openRate}
              </div>
            )}
          </div>
        );
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <button
            className="p-1 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit notification:', row.title);
            }}
          >
            <Mail size={18} />
          </button>
        </div>
      )
    }
  ];

  // Define columns for email logs table
  const emailLogColumns = [
    {
      key: 'id',
      label: 'ID',
      sortable: true
    },
    {
      key: 'recipient',
      label: 'Recipient',
      sortable: true
    },
    {
      key: 'subject',
      label: 'Subject',
      sortable: true
    },
    {
      key: 'date',
      label: 'Date & Time',
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        let status = 'info';
        let label = '';
        let icon = null;
        
        switch (value) {
          case 'delivered':
            status = 'info';
            label = 'Delivered';
            icon = <Check size={14} className="mr-1" />;
            break;
          case 'opened':
            status = 'success';
            label = 'Opened';
            icon = <Check size={14} className="mr-1" />;
            break;
          case 'bounced':
            status = 'warning';
            label = 'Bounced';
            icon = <AlertCircle size={14} className="mr-1" />;
            break;
          case 'failed':
            status = 'error';
            label = 'Failed';
            icon = <X size={14} className="mr-1" />;
            break;
        }
        
        return (
          <div className="flex items-center">
            <StatusBadge status={status} label={label} />
          </div>
        );
      }
    }
  ];

  // Define columns for trusted contacts table
  const contactColumns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true
    },
    {
      key: 'phone',
      label: 'Phone',
      sortable: true
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (value) => {
        let className = '';
        switch (value) {
          case 'authority':
            className = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            break;
          case 'internal':
            className = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            break;
          case 'personal':
            className = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            break;
        }
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      }
    },
    {
      key: 'users',
      label: 'Linked Users',
      sortable: true
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <button
            className="p-1 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit contact:', row.name);
            }}
          >
            <Users size={18} />
          </button>
        </div>
      )
    }
  ];

  // Render appropriate content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                System Announcements
              </h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <Bell size={16} className="mr-2" />
                New Announcement
              </button>
            </div>
            <DataTable
              columns={notificationColumns}
              data={notifications}
              searchable={true}
              pagination={true}
            />
          </div>
        );
      case 'emails':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Email Notification Log
              </h2>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <Mail size={16} className="mr-2" />
                Send Test Email
              </button>
            </div>
            <DataTable
              columns={emailLogColumns}
              data={emailLogs}
              searchable={true}
              pagination={true}
            />
          </div>
        );
      case 'contacts':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Trusted Contacts
              </h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <Users size={16} className="mr-2" />
                Add Contact
              </button>
            </div>
            <DataTable
              columns={contactColumns}
              data={trustedContacts}
              searchable={true}
              pagination={true}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Communication Management
        </h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'notifications'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            System Announcements
          </button>
          <button
            onClick={() => setActiveTab('emails')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'emails'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Email Notification Log
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'contacts'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Trusted Contacts
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {renderContent()}
    </div>
  );
};

export default CommunicationManagement;