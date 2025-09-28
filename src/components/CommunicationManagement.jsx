import React, { useState } from 'react';
import { 
  Mail, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  ArrowLeft, 
  Type, 
  User, 
  FileText, 
  AlertCircle,
  Check,
  Reply
} from 'lucide-react';

// Simple Status Badge Component
const StatusBadge = ({ status }) => {
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

// Template Selection Component
const EmailTemplate = ({ template, isSelected, onSelect }) => (
  <div 
    onClick={() => onSelect(template)}
    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
      isSelected 
        ? 'border-[#8D8DC7] bg-[#8D8DC7]/20' 
        : 'border-[#8D8DC7]/30 hover:border-[#8D8DC7] hover:bg-[#8D8DC7]/10'
    }`}
  >
    <h5 className="text-white font-medium mb-1 text-sm">{template.name}</h5>
    <p className="text-[#BEBEE0] text-xs">{template.description}</p>
    <p className="text-[#8D8DC7] text-xs mt-1">Subject: {template.subject}</p>
  </div>
);

// Compose Email View Component
const ComposeEmailView = ({ onBack, onEmailSent, replyToEmail = null }) => {
  const [emailData, setEmailData] = useState({
    to: replyToEmail?.recipient || '',
    subject: replyToEmail ? `Re: ${replyToEmail.subject.replace(/^Re: /, '')}` : '',
    message: replyToEmail ? `\n\n--- Original Message ---\nFrom: ${replyToEmail.recipient}\nSubject: ${replyToEmail.subject}\nDate: ${replyToEmail.date}\n\n` : '',
    template: null,
    priority: 'normal'
  });
  
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Pre-defined email templates
  const emailTemplates = [
    {
      id: 'device_registration',
      name: 'Device Registration Confirmation',
      description: 'Confirm successful device registration',
      subject: 'Your Device Has Been Successfully Registered',
      body: 'Dear User,\n\nYour device has been successfully registered in our system. You can now track and manage your device through our platform.\n\nBest regards,\nTracknity Team'
    },
    {
      id: 'security_alert',
      name: 'Security Alert',
      description: 'Notify user about security-related events',
      subject: 'Security Alert: Important Account Activity',
      body: 'Dear User,\n\nWe detected important activity on your account that requires your attention.\n\nIf this was you, no action is needed. If you did not authorize this activity, please contact our support team immediately.\n\nBest regards,\nTracknity Security Team'
    },
    {
      id: 'verification',
      name: 'Account Verification',
      description: 'Send verification request to user',
      subject: 'Account Verification Required',
      body: 'Dear User,\n\nTo ensure the security of your account, we need you to verify your identity.\n\nPlease follow the verification process in your account dashboard.\n\nThank you for helping us keep your account secure.\n\nBest regards,\nTracknity Team'
    },
    {
      id: 'follow_up',
      name: 'Follow-up Message',
      description: 'Follow up on previous communication',
      subject: 'Follow-up: Action Required',
      body: 'Dear User,\n\nWe wanted to follow up on our previous communication regarding your account.\n\nIf you need any assistance, please don\'t hesitate to contact our support team.\n\nBest regards,\nTracknity Team'
    },
    {
      id: 'custom',
      name: 'Custom Message',
      description: 'Create a custom email from scratch',
      subject: '',
      body: ''
    }
  ];

  const handleInputChange = (field, value) => {
    setEmailData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTemplateSelect = (template) => {
    if (template.id === 'custom') {
      setEmailData(prev => ({
        ...prev,
        template: template.id,
        subject: replyToEmail ? `Re: ${replyToEmail.subject.replace(/^Re: /, '')}` : '',
        message: replyToEmail ? `\n\n--- Original Message ---\nFrom: ${replyToEmail.recipient}\nSubject: ${replyToEmail.subject}\nDate: ${replyToEmail.date}\n\n` : ''
      }));
    } else {
      setEmailData(prev => ({
        ...prev,
        template: template.id,
        subject: template.subject,
        message: template.body
      }));
    }
  };

  const handleSendEmail = async () => {
    if (!emailData.to || !emailData.subject || !emailData.message) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSending(true);
    
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      
      const emailLogEntry = {
        id: `EM${String(Date.now()).slice(-3)}`,
        recipient: emailData.to,
        subject: emailData.subject,
        date: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).replace(',', ''),
        status: 'delivered'
      };

      if (onEmailSent) {
        onEmailSent(emailLogEntry);
      }

      setTimeout(() => {
        setShowSuccess(false);
        if (onBack) {
          onBack();
        }
      }, 2000);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#343264] p-6 flex items-center justify-center">
        <div className="bg-[#8D8DC7]/10 rounded-lg border border-[#8D8DC7] p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-white" />
          </div>
          <h2 className="text-white text-xl font-semibold mb-2">Email Sent Successfully!</h2>
          <p className="text-[#BEBEE0] mb-4">Your email has been sent to {emailData.to}</p>
          <p className="text-[#8D8DC7] text-sm">Returning to email logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#343264] p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#BEBEE0] hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Email Logs
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">
              {replyToEmail ? 'Reply to Email' : 'Compose Email'}
            </h1>
            <p className="text-[#BEBEE0]">
              {replyToEmail 
                ? `Replying to ${replyToEmail.recipient}` 
                : 'Send email notifications to users'
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            {replyToEmail ? (
              <Reply size={24} className="text-[#8D8DC7]" />
            ) : (
              <Mail size={24} className="text-[#8D8DC7]" />
            )}
          </div>
        </div>
      </div>

      {replyToEmail && (
        <div className="mb-6 bg-[#8D8DC7]/10 rounded-lg border border-[#8D8DC7] p-4">
          <h3 className="text-white text-sm font-semibold mb-2">Original Email</h3>
          <div className="space-y-1 text-sm">
            <p className="text-[#BEBEE0]"><span className="text-[#8D8DC7]">From:</span> {replyToEmail.recipient}</p>
            <p className="text-[#BEBEE0]"><span className="text-[#8D8DC7]">Subject:</span> {replyToEmail.subject}</p>
            <p className="text-[#BEBEE0]"><span className="text-[#8D8DC7]">Date:</span> {replyToEmail.date}</p>
            <p className="text-[#BEBEE0]"><span className="text-[#8D8DC7]">Status:</span> <StatusBadge status={replyToEmail.status} /></p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-[#8D8DC7]/10 rounded-lg border border-[#8D8DC7] p-4">
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText size={18} className="text-[#8D8DC7]" />
              Templates
            </h3>
            <div className="space-y-2">
              {emailTemplates.map((template) => (
                <EmailTemplate
                  key={template.id}
                  template={template}
                  isSelected={emailData.template === template.id}
                  onSelect={handleTemplateSelect}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-[#8D8DC7]/10 rounded-lg border border-[#8D8DC7] p-6">
            <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
              <Type size={20} className="text-[#8D8DC7]" />
              Email Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[#BEBEE0] text-sm font-medium mb-2">
                  To <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8D8DC7]" size={16} />
                  <input
                    type="email"
                    value={emailData.to}
                    onChange={(e) => handleInputChange('to', e.target.value)}
                    placeholder="recipient@example.com"
                    className="w-full bg-[#8D8DC7]/20 border border-[#8D8DC7] rounded-lg pl-10 pr-4 py-3 text-white placeholder-[#BEBEE0] focus:outline-none focus:border-[#BEBEE0] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#BEBEE0] text-sm font-medium mb-2">
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Enter email subject"
                  className="w-full bg-[#8D8DC7]/20 border border-[#8D8DC7] rounded-lg px-4 py-3 text-white placeholder-[#BEBEE0] focus:outline-none focus:border-[#BEBEE0] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#BEBEE0] text-sm font-medium mb-2">
                  Priority
                </label>
                <select
                  value={emailData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full bg-[#8D8DC7]/20 border border-[#8D8DC7] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#BEBEE0] transition-colors"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-[#BEBEE0] text-sm font-medium mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={emailData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Type your message here..."
                  rows={8}
                  className="w-full bg-[#8D8DC7]/20 border border-[#8D8DC7] rounded-lg px-4 py-3 text-white placeholder-[#BEBEE0] focus:outline-none focus:border-[#BEBEE0] transition-colors resize-vertical"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#8D8DC7]/30">
                <div className="flex items-center gap-2 text-[#8D8DC7] text-sm">
                  <AlertCircle size={16} />
                  <span>Fields marked with * are required</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={onBack}
                    className="px-4 py-2 border border-[#8D8DC7] text-[#BEBEE0] hover:text-white hover:bg-[#8D8DC7] rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendEmail}
                    disabled={isSending || !emailData.to || !emailData.subject || !emailData.message}
                    className="flex items-center gap-2 px-6 py-2 bg-[#BEBEE0] hover:bg-white text-[#343264] rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#343264] border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Email
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Email Row Component
const EmailRow = ({ email, onViewEmail, onReplyToEmail }) => {
  return (
    <tr className="border-b border-[#8D8DC7] hover:bg-[#343264]/30 transition-colors">
      <td className="px-6 py-4">
        <span className="text-white font-medium">{email.id}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-[#BEBEE0]">{email.recipient}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-[#BEBEE0]">{email.subject}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-[#8D8DC7] text-sm">{email.date}</span>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={email.status} />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewEmail(email)}
            className="p-2 text-[#BEBEE0] hover:text-white hover:bg-[#8D8DC7] rounded transition-colors"
            title="View email details"
          >
            <Mail size={16} />
          </button>
          <button
            onClick={() => onReplyToEmail(email)}
            className="p-2 text-[#BEBEE0] hover:text-white hover:bg-[#8D8DC7] rounded transition-colors"
            title="Reply to this email"
          >
            <Reply size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Main Communication Management Component
const CommunicationManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState('list');
  const [replyToEmail, setReplyToEmail] = useState(null);
  const itemsPerPage = 5;
  
  const [emailLogs, setEmailLogs] = useState([
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
  ]);

  // All hooks are called here, before any conditional logic
  const getFilteredEmails = () => {
    if (!searchTerm) return emailLogs;
    
    return emailLogs.filter(email =>
      email.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredEmails = getFilteredEmails();
  const totalPages = Math.ceil(filteredEmails.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmails = filteredEmails.slice(startIndex, endIndex);

  const addEmailToLogs = (newEmailLog) => {
    setEmailLogs(prev => [newEmailLog, ...prev]);
  };

  const handleComposeEmail = () => {
    setReplyToEmail(null);
    setCurrentView('compose');
  };

  const handleReplyToEmail = (email) => {
    setReplyToEmail(email);
    setCurrentView('compose');
  };

  const handleBackToList = () => {
    setReplyToEmail(null);
    setCurrentView('list');
  };

  const handleViewEmail = (email) => {
    console.log('View email:', email);
    alert(`View email details for ${email.subject} - add your logic here`);
  };

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

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Conditional rendering happens after all hooks
  if (currentView === 'compose') {
    return (
      <ComposeEmailView 
        onBack={handleBackToList}
        onEmailSent={addEmailToLogs}
        replyToEmail={replyToEmail}
      />
    );
  }



  return (
    <div className="min-h-screen bg-[#343264] p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          Communication Management
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-medium text-white">
            Email Notification Log
          </h2>
          <button 
            onClick={handleComposeEmail}
            className="inline-flex items-center px-4 py-2 bg-[#BEBEE0] hover:bg-white text-[#343264] rounded-lg shadow-sm text-sm font-medium transition-colors"
          >
            <Mail size={16} className="mr-2" />
            Compose Email
          </button>
        </div>
      </div>

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

      <div className="bg-[#8D8DC7]/10 rounded-lg border border-[#8D8DC7] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
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
            
            <tbody>
              {currentEmails.map((email) => (
                <EmailRow
                  key={email.id}
                  email={email}
                  onViewEmail={handleViewEmail}
                  onReplyToEmail={handleReplyToEmail}
                />
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmails.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#8D8DC7] mb-4">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-[#BEBEE0] text-lg font-medium mb-2">No emails found</h3>
            <p className="text-[#8D8DC7]">Try adjusting your search terms.</p>
          </div>
        )}

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