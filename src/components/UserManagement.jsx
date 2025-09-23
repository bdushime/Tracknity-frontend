import React, { useState } from 'react';
import { Search, User, Settings, Link, Trash2, Mail } from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [registrationFilter, setRegistrationFilter] = useState('All Time');

  // Mock user data matching the design
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Administrator',
      status: 'Active',
      devices: 3,
      registrationDate: '2023-01-15',
      avatar: 'J'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Standard User',
      status: 'Active',
      devices: 2,
      registrationDate: '2023-02-22',
      avatar: 'J'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      role: 'Standard User',
      status: 'Inactive',
      devices: 1,
      registrationDate: '2023-03-10',
      avatar: 'R'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'Administrator',
      status: 'Active',
      devices: 4,
      registrationDate: '2023-04-05',
      avatar: 'E'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleStyle = (role) => {
    return role === 'Administrator' 
      ? 'bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium'
      : 'bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-sm font-medium';
  };

  const getStatusStyle = (status) => {
    return status === 'Active'
      ? 'text-green-400 flex items-center gap-1'
      : 'text-red-400 flex items-center gap-1';
  };

  return (
    <div className="bg-slate-800 min-h-screen text-white">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-slate-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold">User Management</h1>
          <button className="bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm sm:text-base">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Create User</span>
            <span className="sm:hidden">Create</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-slate-700">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 items-start sm:items-center">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-gray-400 text-sm min-w-0">Role:</span>
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded px-2 sm:px-3 py-1 text-sm focus:outline-none focus:border-blue-500 flex-1 sm:flex-none min-w-0"
            >
              <option>All Roles</option>
              <option>Administrator</option>
              <option>Standard User</option>
            </select>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-gray-400 text-sm min-w-0">Status:</span>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded px-2 sm:px-3 py-1 text-sm focus:outline-none focus:border-blue-500 flex-1 sm:flex-none min-w-0"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-gray-400 text-sm min-w-0">Registration:</span>
            <select 
              value={registrationFilter}
              onChange={(e) => setRegistrationFilter(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded px-2 sm:px-3 py-1 text-sm focus:outline-none focus:border-blue-500 flex-1 sm:flex-none min-w-0"
            >
              <option>All Time</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative max-w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-lg overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-slate-800 border-b border-slate-700 text-sm font-medium text-gray-400 uppercase tracking-wider">
              <div>NAME</div>
              <div>ROLE</div>
              <div>STATUS</div>
              <div>DEVICES</div>
              <div>REGISTRATION DATE</div>
              <div>ACTIONS</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-700">
              {filteredUsers.map((user) => (
                <div key={user.id} className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-slate-800 transition-colors items-center">
                  {/* Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-semibold">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-white">{user.name}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <span className={getRoleStyle(user.role)}>
                      {user.role}
                    </span>
                  </div>

                  {/* Status */}
                  <div>
                    <span className={getStatusStyle(user.status)}>
                      <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      {user.status}
                    </span>
                  </div>

                  {/* Devices */}
                  <div>
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                      {user.devices}
                    </span>
                  </div>

                  {/* Registration Date */}
                  <div className="text-gray-300">
                    {user.registrationDate}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-slate-700 rounded transition-colors">
                      <Link className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-slate-700 rounded transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-slate-700 rounded transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden divide-y divide-slate-700">
            {filteredUsers.map((user) => (
              <div key={user.id} className="p-4 hover:bg-slate-800 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="font-medium text-white truncate">{user.name}</div>
                        <div className="text-sm text-gray-400 truncate">{user.email}</div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-slate-700 rounded transition-colors">
                          <Link className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-slate-700 rounded transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-slate-700 rounded transition-colors">
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-400">Role: </span>
                        <span className={getRoleStyle(user.role).replace('px-3 py-1', 'px-2 py-0.5')}>
                          {user.role === 'Administrator' ? 'Admin' : 'User'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Status: </span>
                        <span className={getStatusStyle(user.status)}>
                          <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          {user.status}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Devices: </span>
                        <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                          {user.devices}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Registered: </span>
                        <span className="text-gray-300">{user.registrationDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;