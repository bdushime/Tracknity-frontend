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
  Reply,
  Store,
  Smartphone,
  Shield,
  RefreshCw 
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

// Recipient Type Badge
const RecipientTypeBadge = ({ type }) => {
  const getTypeStyle = (type) => {
    if (type === 'shop') {
      return 'bg-purple-100 text-purple-800';
    } else if (type === 'customer') {
      return 'bg-blue-100 text-blue-800';
    } else if (type === 'all') {
      return 'bg-gray-100 text-gray-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type) => {
    if (type === 'shop') return <Store size={12} />;
    if (type === 'customer') return <Smartphone size={12} />;
    return <Mail size={12} />;
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getTypeStyle(type)}`}>
      {getTypeIcon(type)}
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

// Template Selection Component - Device Guard Specific
const EmailTemplate = ({ template, isSelected, onSelect }) => (
  <div 
    onClick={() => onSelect(template)}
    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
      isSelected 
        ? 'border-indigo-500 bg-indigo-50' 
        : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
    }`}
  >
    <div className="flex items-start gap-2 mb-1">
      {template.icon && <template.icon size={16} className="text-indigo-600 mt-0.5" />}
      <h5 className="text-gray-900 font-medium text-sm">{template.name}</h5>
    </div>
    <p className="text-gray-600 text-xs mb-1">{template.description}</p>
    <p className="text-gray-500 text-xs">To: {template.recipientType}</p>
  </div>
);

// Compose Email View Component - Device Guard Adapted
const ComposeEmailView = ({ onBack, onEmailSent, replyToEmail = null }) => {
  const [emailData, setEmailData] = useState({
    to: replyToEmail?.recipient || '',
    recipientType: replyToEmail?.recipientType || 'customer',
    subject: replyToEmail ? `Re: ${replyToEmail.subject.replace(/^Re: /, '')}` : '',
    message: replyToEmail ? `\n\n--- Original Message ---\nFrom: ${replyToEmail.recipient}\nSubject: ${replyToEmail.subject}\nDate: ${replyToEmail.date}\n\n` : '',
    template: null,
    priority: 'normal'
  });
  
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Device Guard specific email templates
  const emailTemplates = [
    {
      id: 'shop_approval',
      name: 'Shop Approval',
      description: 'Approve new shop registration',
      recipientType: 'Shop',
      icon: Store,
      subject: 'Welcome to Device Guard - Shop Approved',
      body: 'Dear Shop Owner,\n\nCongratulations! Your shop has been approved to join the Device Guard network.\n\nYou can now:\n• Register devices for sale\n• Record sales and generate digital receipts\n• Access the stolen device database\n• Build customer trust through verified transactions\n\nLogin to your shop dashboard to get started: [Dashboard Link]\n\nIf you need any assistance, our support team is here to help.\n\nBest regards,\nDevice Guard Admin Team'
    },
    {
      id: 'shop_warning',
      name: 'Low Activation Warning',
      description: 'Alert shop about low customer activation rate',
      recipientType: 'Shop',
      icon: AlertCircle,
      subject: 'Action Required - Low Customer Activation Rate',
      body: 'Dear Shop Owner,\n\nWe\'ve noticed that your customer activation rate is below our expected range (70-90%).\n\nCurrent Rate: [XX]%\nExpected: 70-90%\n\nThis may indicate:\n• Incorrect phone numbers being entered\n• Customers not receiving SMS notifications\n• Customers not understanding the app benefits\n\nRecommended Actions:\n1. Verify customer phone numbers are entered correctly\n2. Ensure customers receive SMS while at shop\n3. Explain Device Guard benefits to customers\n4. Follow up with customers who don\'t activate\n\nWe\'re here to help. Let\'s schedule a training call to address this.\n\nContact: support@deviceguard.rw\n\nBest regards,\nDevice Guard Admin Team'
    },
    {
      id: 'shop_suspension',
      name: 'Shop Suspension',
      description: 'Notify shop of account suspension',
      recipientType: 'Shop',
      icon: Shield,
      subject: 'Important: Shop Account Suspended',
      body: 'Dear Shop Owner,\n\nYour Device Guard shop account has been temporarily suspended due to suspicious activity patterns.\n\nReason: [Specify reason]\n\nTo restore your account:\n1. Review our terms of service\n2. Contact our support team\n3. Provide requested documentation\n\nYour account will remain suspended until this matter is resolved.\n\nContact: support@deviceguard.rw\n\nBest regards,\nDevice Guard Admin Team'
    },
    {
      id: 'customer_welcome',
      name: 'Customer Welcome',
      description: 'Welcome message for new customers',
      recipientType: 'Customer',
      icon: Smartphone,
      subject: 'Welcome to Device Guard!',
      body: 'Dear Customer,\n\nWelcome to Device Guard! Your device has been successfully registered.\n\nWhat you can do now:\n• Access your digital receipt anytime\n• Add trusted contacts for security\n• Enable location tracking\n• Report if device is lost/stolen\n• Transfer ownership when selling\n\nYour device is now protected by our network of verified shops across Rwanda.\n\nDownload the app: [App Link]\n\nThank you for choosing Device Guard!\n\nBest regards,\nDevice Guard Team'
    },
    {
      id: 'customer_theft_followup',
      name: 'Theft Report Follow-up',
      description: 'Follow up on theft reports',
      recipientType: 'Customer',
      icon: Shield,
      subject: 'Theft Report Update',
      body: 'Dear Customer,\n\nWe\'re following up on your theft report for:\nDevice: [Device Model]\nIMEI: [IMEI]\nReported: [Date]\n\nStatus Update:\n• Device flagged in our database\n• All partner shops notified\n• [X] attempted resales blocked\n• Trusted contacts alerted\n\nNext Steps:\n1. File police report (we can help)\n2. Check for location updates in app\n3. Contact us if you have any leads\n\nWe\'re working to help recover your device.\n\nSupport: support@deviceguard.rw\n\nBest regards,\nDevice Guard Team'
    },
    {
      id: 'transfer_reminder',
      name: 'Transfer Reminder',
      description: 'Remind user about pending transfer',
      recipientType: 'Customer',
      icon: RefreshCw,
      subject: 'Pending Device Transfer - Action Required',
      body: 'Dear Customer,\n\nYou have a pending device transfer that requires your action:\n\nDevice: [Device Model]\nFrom: [Sender Name]\nTransfer Code: [Code]\nExpires: [Date]\n\nTo accept this transfer:\n1. Download Device Guard app (if not installed)\n2. Sign up with your phone number\n3. Accept the transfer request\n\nIf you did not expect this transfer, please contact us immediately.\n\nSupport: support@deviceguard.rw\n\nBest regards,\nDevice Guard Team'
    },
    {
      id: 'monthly_report',
      name: 'Monthly Platform Report',
      description: 'Send monthly statistics to stakeholders',
      recipientType: 'All',
      icon: FileText,
      subject: 'Device Guard Monthly Report - [Month Year]',
      body: 'Monthly Platform Report\n\nPlatform Statistics:\n• Total Shops: [X]\n• Total Devices: [X]\n• Total Customers: [X]\n• Devices Sold This Month: [X]\n• Theft Reports: [X]\n• Devices Recovered: [X]\n• Recovery Rate: [X]%\n\nHighlights:\n• [Achievement 1]\n• [Achievement 2]\n• [Achievement 3]\n\nChallenges:\n• [Challenge 1]\n• [Challenge 2]\n\nNext Month Goals:\n• [Goal 1]\n• [Goal 2]\n\nThank you for being part of Device Guard.\n\nBest regards,\nDevice Guard Admin Team'
    },
    {
      id: 'custom',
      name: 'Custom Message',
      description: 'Create a custom email from scratch',
      recipientType: 'Custom',
      icon: Type,
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
        recipientType: template.recipientType.toLowerCase(),
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
        recipientType: emailData.recipientType,
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
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-white" />
          </div>
          <h2 className="text-gray-900 text-xl font-semibold mb-2">Email Sent Successfully!</h2>
          <p className="text-gray-600 mb-4">Your email has been sent to {emailData.to}</p>
          <p className="text-gray-500 text-sm">Returning to communication logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Communication Logs
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 text-3xl font-bold mb-2">
              {replyToEmail ? 'Reply to Email' : 'Compose Email'}
            </h1>
            <p className="text-gray-600">
              {replyToEmail 
                ? `Replying to ${replyToEmail.recipient}` 
                : 'Send notifications to shops, customers, or all users'
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            {replyToEmail ? (
              <Reply size={24} className="text-indigo-600" />
            ) : (
              <Mail size={24} className="text-indigo-600" />
            )}
          </div>
        </div>
      </div>

      {replyToEmail && (
        <div className="mb-6 bg-indigo-50 rounded-lg border border-indigo-200 p-4">
          <h3 className="text-gray-900 text-sm font-semibold mb-2">Original Email</h3>
          <div className="space-y-1 text-sm">
            <p className="text-gray-700"><span className="text-gray-500">From:</span> {replyToEmail.recipient}</p>
            <p className="text-gray-700"><span className="text-gray-500">Type:</span> <RecipientTypeBadge type={replyToEmail.recipientType} /></p>
            <p className="text-gray-700"><span className="text-gray-500">Subject:</span> {replyToEmail.subject}</p>
            <p className="text-gray-700"><span className="text-gray-500">Date:</span> {replyToEmail.date}</p>
            <p className="text-gray-700"><span className="text-gray-500">Status:</span> <StatusBadge status={replyToEmail.status} /></p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h3 className="text-gray-900 text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText size={18} className="text-indigo-600" />
              Templates
            </h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
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
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-gray-900 text-lg font-semibold mb-6 flex items-center gap-2">
              <Type size={20} className="text-indigo-600" />
              Email Details
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    To <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="email"
                      value={emailData.to}
                      onChange={(e) => handleInputChange('to', e.target.value)}
                      placeholder="recipient@example.com"
                      className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Recipient Type
                  </label>
                  <select
                    value={emailData.recipientType}
                    onChange={(e) => handleInputChange('recipientType', e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="shop">Shop</option>
                    <option value="customer">Customer</option>
                    <option value="all">All Users</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Enter email subject"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Priority
                </label>
                <select
                  value={emailData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={emailData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Type your message here..."
                  rows={10}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-vertical font-mono text-sm"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <AlertCircle size={16} />
                  <span>Fields marked with * are required</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={onBack}
                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendEmail}
                    disabled={isSending || !emailData.to || !emailData.subject || !emailData.message}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <span className="text-gray-900 font-medium">{email.id}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <span className="text-gray-700">{email.recipient}</span>
          <RecipientTypeBadge type={email.recipientType} />
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-gray-700">{email.subject}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-gray-600 text-sm">{email.date}</span>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={email.status} />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewEmail(email)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            title="View email details"
          >
            <Mail size={16} />
          </button>
          <button
            onClick={() => onReplyToEmail(email)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            title="Reply to this email"
          >
            <Reply size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Main Communication Management Component for Device Guard
const CommunicationManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState('list');
  const [replyToEmail, setReplyToEmail] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const itemsPerPage = 10;
  
  const [emailLogs, setEmailLogs] = useState([
    {
      id: 'EM001',
      recipient: 'techshop@rwanda.com',
      recipientType: 'shop',
      subject: 'Welcome to Device Guard - Shop Approved',
      date: '2025-10-03 14:32',
      status: 'delivered'
    },
    {
      id: 'EM002',
      recipient: 'phonehub@kigali.rw',
      recipientType: 'shop',
      subject: 'Action Required - Low Customer Activation Rate',
      date: '2025-10-03 12:15',
      status: 'opened'
    },
    {
      id: 'EM003',
      recipient: 'john.mugisha@gmail.com',
      recipientType: 'customer',
      subject: 'Welcome to Device Guard!',
      date: '2025-10-02 18:45',
      status: 'delivered'
    },
    {
      id: 'EM004',
      recipient: 'mary.uwimana@gmail.com',
      recipientType: 'customer',
      subject: 'Theft Report Update - Device Recovered',
      date: '2025-10-02 10:22',
      status: 'opened'
    },
    {
      id: 'EM005',
      recipient: 'mobilezone@shop.rw',
      recipientType: 'shop',
      subject: 'Monthly Performance Report',
      date: '2025-10-01 16:18',
      status: 'delivered'
    },
    {
      id: 'EM006',
      recipient: 'peter.nkusi@gmail.com',
      recipientType: 'customer',
      subject: 'Pending Device Transfer - Action Required',
      date: '2025-09-30 09:05',
      status: 'bounced'
    },
    {
      id: 'EM007',
      recipient: 'digitalstore@rwanda.com',
      recipientType: 'shop',
      subject: 'Important: Shop Account Suspended',
      date: '2025-09-29 14:30',
      status: 'delivered'
    },
    {
      id: 'EM008',
      recipient: 'sarah.kamikazi@gmail.com',
      recipientType: 'customer',
      subject: 'Device Registration Confirmation',
      date: '2025-09-28 11:47',
      status: 'opened'
    }
  ]);

  const getFilteredEmails = () => {
    let filtered = emailLogs;
    
    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(email => email.recipientType === filterType);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(email =>
        email.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
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
    alert(`View email details for ${email.subject} - add detail modal here`);
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
  }, [searchTerm, filterType]);

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Communication Management
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Email Communication Log
            </h2>
            <p className="text-gray-600 text-sm">
              Send and track emails to shops, customers, and all users
            </p>
          </div>
          <button 
            onClick={handleComposeEmail}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm text-sm font-medium transition-colors"
          >
            <Mail size={16} className="mr-2" />
            Compose Email
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search emails by recipient, subject, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filter by Type */}
        <div className="flex items-center gap-2">
          <span className="text-gray-700 text-sm font-medium whitespace-nowrap">Filter by:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="all">All Recipients</option>
            <option value="shop">Shops Only</option>
            <option value="customer">Customers Only</option>
          </select>
        </div>
      </div>

      {/* Email Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs font-medium mb-1">Total Sent</p>
              <p className="text-gray-900 text-2xl font-bold">{emailLogs.length}</p>
            </div>
            <Mail size={20} className="text-indigo-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs font-medium mb-1">To Shops</p>
              <p className="text-gray-900 text-2xl font-bold">
                {emailLogs.filter(e => e.recipientType === 'shop').length}
              </p>
            </div>
            <Store size={20} className="text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs font-medium mb-1">To Customers</p>
              <p className="text-gray-900 text-2xl font-bold">
                {emailLogs.filter(e => e.recipientType === 'customer').length}
              </p>
            </div>
            <Smartphone size={20} className="text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs font-medium mb-1">Opened</p>
              <p className="text-gray-900 text-2xl font-bold">
                {emailLogs.filter(e => e.status === 'opened').length}
              </p>
            </div>
            <Check size={20} className="text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-gray-700 font-medium text-sm uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium text-sm uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium text-sm uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium text-sm uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium text-sm uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium text-sm uppercase tracking-wider">
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
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-gray-700 text-lg font-medium mb-2">No emails found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredEmails.length)} of {filteredEmails.length} results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-gray-700 transition-colors"
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