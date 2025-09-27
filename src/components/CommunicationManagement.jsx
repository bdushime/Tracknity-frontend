import React, { useState } from 'react';
import { Mail, Search, ChevronLeft, ChevronRight } from 'lucide-react';

// Simple Status Badge Component
const StatusBadge = ({ status }) => {
  // Define colors for each email status
  const getStatusStyle = (status) => {
    if (status === 'delivered') {
      return 'bg-blue-100 text-blue-800';
    } else if (status === 'opened') {
      return 'bg-green-100 text-green-800';
    } else if (status === 'bounced') {
      return 'bg-yellow-100 text-yellow-800';
    } else if (status === 'failed') {
      return 'bg-red-100 text-red-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'opened': return 'Opened';
      case 'bounced': return 'Bounced';
      case 'failed': return 'Failed';
      default: return status;
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(status)}`}>
      {getStatusLabel(status)}
    </span>
  );
};

// Email Row Component - represents one email in the table
const EmailRow = ({ email, onViewEmail }) => {
  return (
    <tr className="border-b border-[#8D8DC7] hover:bg-[#343264]/30 transition-colors">
      {/* Email ID */}
      <td className="px-6 py-4">
        <span className="text-white font-medium">{email.id}</span>
      </td>
      
      {/* Recipient */}
      <td className="px-6 py-4">
        <span className="text-[#BEBEE0]">{email.recipient}</span>
      </td>
      
      {/* Subject */}
      <td className="px-6 py-4">
        <span className="text-[#BEBEE0]">{email.subject}</span>
      </td>
      
      {/* Date & Time */}
      <td className="px-6 py-4">
        <span className="text-[#8D8DC7] text-sm">{email.date}</span>
      </td>
      
      {/* Status */}
      <td className="px-6 py-4">
        <StatusBadge status={email.status} />
      </td>
      
      {/* Actions */}
      <td className="px-6 py-4">
        <button
          onClick={() => onViewEmail(email)}
          className="p-2 text-[#BEBEE0] hover:text-white hover:bg-[#8D8DC7] rounded transition-colors"
        >
          <Mail size={16} />
        </button>
      </td>
    </tr>
  );
};

// Main Communication Management Component
const CommunicationManagement = () => {
  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample email log data - easy to modify
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

  // Filter emails based on search term
  const getFilteredEmails = () => {
    if (!searchTerm) return emailLogs;
    
    return emailLogs.filter(email =>
      email.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredEmails = getFilteredEmails();

  // Calculate pagination
  const totalPages = Math.ceil(filteredEmails.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmails = filteredEmails.slice(startIndex, endIndex);

  // Handle button clicks
  const handleSendTestEmail = () => {
    console.log('Send test email clicked');
    alert('Send test email functionality - add your logic here');
  };

  const handleViewEmail = (email) => {
    console.log('View email:', email);
    alert(`View email details for ${email.subject} - add your logic here`);
  };

  // Handle pagination
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#343264] p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          Communication Management
        </h1>

        {/* Email Log Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-medium text-white">
            Email Notification Log
          </h2>
          <button 
            onClick={handleSendTestEmail}
            className="inline-flex items-center px-4 py-2 bg-[#BEBEE0] hover:bg-white text-[#343264] rounded-lg shadow-sm text-sm font-medium transition-colors"
          >
            <Mail size={16} className="mr-2" />
            Send Test Email
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8D8DC7] w-4 h-4" />
          <input
            type="text"
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#8D8DC7]/20 border border-[#8D8DC7] rounded-lg pl-10 pr-4 py-2 text-white placeholder-[#BEBEE0] focus:outline-none focus:border-[#BEBEE0] transition-colors"
          />
        </div>
      </div>

      {/* Email Table */}
      <div className="bg-[#8D8DC7]/10 rounded-lg border border-[#8D8DC7] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#8D8DC7]/20 border-b border-[#8D8DC7]">
                <th className="px-6 py-4 text-left text-[#BEBEE0] font-medium text-sm uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-[#BEBEE0] font-medium text-sm uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-4 text-left text-[#BEBEE0] font-medium text-sm uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-[#BEBEE0] font-medium text-sm uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-[#BEBEE0] font-medium text-sm uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-[#BEBEE0] font-medium text-sm uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody>
              {currentEmails.map((email) => (
                <EmailRow
                  key={email.id}
                  email={email}
                  onViewEmail={handleViewEmail}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State - shows when no emails found */}
        {filteredEmails.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#8D8DC7] mb-4">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-[#BEBEE0] text-lg font-medium mb-2">No emails found</h3>
            <p className="text-[#8D8DC7]">Try adjusting your search terms.</p>
          </div>
        )}

        {/* Pagination - shows only if there are multiple pages */}
        {totalPages > 1 && (
          <div className="px-6 py-3 border-t border-[#8D8DC7] flex items-center justify-between">
            <div className="text-sm text-[#BEBEE0]">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredEmails.length)} of {filteredEmails.length} results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-[#8D8DC7] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#8D8DC7] text-[#BEBEE0] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 text-sm text-[#BEBEE0]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-[#8D8DC7] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#8D8DC7] text-[#BEBEE0] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationManagement;