import React, { useState } from 'react';
import { FileText, AlertTriangle, CheckCircle, Clock, Download, Search, ChevronLeft, ChevronRight } from 'lucide-react';

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
              placeholder="Search incidents..."
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
                key={index}
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

const TheftManagement = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for theft incidents
  const incidents = [
    {
      id: 'INC001',
      deviceId: 'DEV001',
      deviceName: 'MacBook Pro 16"',
      owner: 'John Doe',
      reportDate: '2023-10-15',
      status: 'active',
      location: 'New York, NY',
      policeReport: true
    },
    {
      id: 'INC002',
      deviceId: 'DEV005',
      deviceName: 'Samsung Galaxy S23',
      owner: 'Michael Wilson',
      reportDate: '2023-10-18',
      status: 'investigating',
      location: 'Chicago, IL',
      policeReport: true
    },
    {
      id: 'INC003',
      deviceId: 'DEV007',
      deviceName: 'Lenovo ThinkPad',
      owner: 'David Miller',
      reportDate: '2023-09-30',
      status: 'recovered',
      location: 'Los Angeles, CA',
      policeReport: true
    },
    {
      id: 'INC004',
      deviceId: 'DEV010',
      deviceName: 'Samsung Tab S9',
      owner: 'Patricia Thomas',
      reportDate: '2023-10-05',
      status: 'closed',
      location: 'Houston, TX',
      policeReport: false
    },
    {
      id: 'INC005',
      deviceId: 'DEV002',
      deviceName: 'iPhone 14 Pro',
      owner: 'Jane Smith',
      reportDate: '2023-10-22',
      status: 'active',
      location: 'Philadelphia, PA',
      policeReport: true
    },
    {
      id: 'INC006',
      deviceId: 'DEV004',
      deviceName: 'iPad Air',
      owner: 'Emily Davis',
      reportDate: '2023-10-12',
      status: 'investigating',
      location: 'Phoenix, AZ',
      policeReport: true
    },
    {
      id: 'INC007',
      deviceId: 'DEV008',
      deviceName: 'Google Pixel 7',
      owner: 'Lisa Taylor',
      reportDate: '2023-09-25',
      status: 'recovered',
      location: 'San Antonio, TX',
      policeReport: true
    },
    {
      id: 'INC008',
      deviceId: 'DEV009',
      deviceName: 'HP Spectre x360',
      owner: 'James Anderson',
      reportDate: '2023-09-20',
      status: 'closed',
      location: 'San Diego, CA',
      policeReport: false
    }
  ];

  // Filter incidents based on active tab
  const filteredIncidents = activeTab === 'all' ? incidents : incidents.filter(incident => incident.status === activeTab);

  // Define columns for the data table
  const columns = [
    {
      key: 'id',
      label: 'Incident ID',
      sortable: true
    },
    {
      key: 'deviceInfo',
      label: 'Device Information',
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {row.deviceName}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            ID: {row.deviceId}
          </div>
        </div>
      )
    },
    {
      key: 'owner',
      label: 'Owner',
      sortable: true
    },
    {
      key: 'reportDate',
      label: 'Report Date',
      sortable: true
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true
    },
    {
      key: 'policeReport',
      label: 'Police Report',
      render: (value) => value ? (
        <span className="text-green-600 dark:text-green-400 flex items-center">
          <CheckCircle size={16} className="mr-1" /> Filed
        </span>
      ) : (
        <span className="text-gray-500 dark:text-gray-400 flex items-center">
          <Clock size={16} className="mr-1" /> Pending
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        let status = 'info';
        let label = '';
        
        switch (value) {
          case 'active':
            status = 'error';
            label = 'Active';
            break;
          case 'investigating':
            status = 'warning';
            label = 'Investigating';
            break;
          case 'recovered':
            status = 'success';
            label = 'Recovered';
            break;
          case 'closed':
            status = 'info';
            label = 'Closed';
            break;
        }
        
        return <StatusBadge status={status} label={label} />;
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
              console.log('Generate evidence package for:', row.id);
            }}
          >
            <Download size={18} />
          </button>
        </div>
      )
    }
  ];

  // Handle incident row click to view details
  const handleIncidentClick = (incident) => {
    console.log('View incident details:', incident);
    // In a real app, this would navigate to an incident details page or open a modal
  };

  // Calculate statistics
  const stats = {
    active: incidents.filter(i => i.status === 'active').length,
    investigating: incidents.filter(i => i.status === 'investigating').length,
    recovered: incidents.filter(i => i.status === 'recovered').length,
    total: incidents.length
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Theft Incident Management
        </h1>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <FileText size={16} className="mr-2" />
            Generate Report
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
            <AlertTriangle size={16} className="mr-2" />
            New Incident
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'all'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            All Incidents
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'active'
                ? 'border-red-500 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab('investigating')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'investigating'
                ? 'border-yellow-500 text-yellow-600 dark:text-yellow-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Investigating
          </button>
          <button
            onClick={() => setActiveTab('recovered')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'recovered'
                ? 'border-green-500 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Recovered
          </button>
          <button
            onClick={() => setActiveTab('closed')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'closed'
                ? 'border-gray-500 text-gray-600 dark:text-gray-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Closed
          </button>
        </nav>
      </div>

      {/* Incident Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 mr-4">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Active Cases
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {stats.active}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 mr-4">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Investigating
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {stats.investigating}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 mr-4">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Recovered
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {stats.recovered}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mr-4">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Reports
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Incident Table */}
      <DataTable
        columns={columns}
        data={filteredIncidents}
        searchable={true}
        pagination={true}
        onRowClick={handleIncidentClick}
      />
    </div>
  );
};

export default TheftManagement;