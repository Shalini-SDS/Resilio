import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Users, 
  Activity, 
  Settings, 
  LogOut, 
  BarChart3,
  FileText,
  Lock,
  LayoutDashboard,
  Database,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  UserPlus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  EyeOff,
  Download,
  Upload,
  Save,
  RefreshCw
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { TabNavigation } from './TabNavigation';
import { ChartCard } from './ChartCard';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const tabs = [
    { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Platform Analytics', icon: BarChart3 },
    { id: 'content', label: 'Content Oversight', icon: FileText },
    { id: 'health', label: 'System Health', icon: Activity },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Chart Data
  const platformGrowthData = [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1450 },
    { month: 'Mar', users: 1680 },
    { month: 'Apr', users: 2100 },
    { month: 'May', users: 2450 },
    { month: 'Jun', users: 2847 },
  ];

  const roleActivityData = [
    { role: 'Students', activity: 1856 },
    { role: 'Teachers', activity: 684 },
    { role: 'Admins', activity: 307 },
  ];

  const featureUsageData = [
    { name: 'Assignments', value: 35, color: '#FFD600' },
    { name: 'Live Classes', value: 25, color: '#FFB800' },
    { name: 'AI Assistant', value: 20, color: '#FFA500' },
    { name: 'Analytics', value: 15, color: '#a8a6a1' },
    { name: 'Other', value: 5, color: '#6a6a6a' },
  ];

  const systemMetricsData = [
    { time: '00:00', cpu: 35, memory: 52, storage: 48 },
    { time: '04:00', cpu: 28, memory: 48, storage: 48 },
    { time: '08:00', cpu: 45, memory: 58, storage: 49 },
    { time: '12:00', cpu: 62, memory: 68, storage: 50 },
    { time: '16:00', cpu: 55, memory: 64, storage: 51 },
    { time: '20:00', cpu: 42, memory: 56, storage: 52 },
  ];

  const securityEventsData = [
    { week: 'W1', events: 3 },
    { week: 'W2', events: 1 },
    { week: 'W3', events: 2 },
    { week: 'W4', events: 3 },
  ];

  // Mock data for User Management
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active', lastLogin: '2024-01-15', joinDate: '2023-09-01' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Active', lastLogin: '2024-01-14', joinDate: '2023-08-15' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Student', status: 'Inactive', lastLogin: '2023-12-20', joinDate: '2023-10-01' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15', joinDate: '2023-07-01' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Teacher', status: 'Active', lastLogin: '2024-01-13', joinDate: '2023-11-01' },
  ]);

  // Mock data for Content Oversight
  const [contentItems] = useState([
    { id: 1, title: 'Introduction to React', author: 'Jane Smith', type: 'Course', status: 'Approved', submitted: '2024-01-10', views: 1250 },
    { id: 2, title: 'Advanced JavaScript Concepts', author: 'Bob Johnson', type: 'Article', status: 'Pending', submitted: '2024-01-12', views: 0 },
    { id: 3, title: 'Machine Learning Basics', author: 'Alice Brown', type: 'Video', status: 'Under Review', submitted: '2024-01-14', views: 340 },
    { id: 4, title: 'Database Design Principles', author: 'Charlie Wilson', type: 'Course', status: 'Rejected', submitted: '2024-01-08', views: 0 },
  ]);

  // Mock data for Reports
  const [reports] = useState([
    { id: 1, name: 'Monthly User Activity Report', type: 'Activity', generated: '2024-01-01', size: '2.3 MB', downloads: 45 },
    { id: 2, name: 'Content Engagement Analytics', type: 'Analytics', generated: '2024-01-05', size: '1.8 MB', downloads: 32 },
    { id: 3, name: 'System Performance Report', type: 'Performance', generated: '2024-01-10', size: '3.1 MB', downloads: 28 },
    { id: 4, name: 'Security Audit Log', type: 'Security', generated: '2024-01-15', size: '4.2 MB', downloads: 12 },
  ]);

  // Settings state
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    emailNotifications: true,
    autoBackup: true,
    userRegistration: true,
    contentModeration: true,
    analyticsTracking: true,
  });

  return (
    <div className="relative min-h-screen px-6 py-8">
      <div className="gradient-overlay" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-10 h-10 text-[#FF3333]" />
              <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FF3333' }}>
                Admin Portal
              </h1>
            </div>
            <p className="text-[#a8a6a1]">System oversight and management</p>
          </div>

          <button
            onClick={onLogout}
            className="btn-3d-red flex items-center gap-2 px-6 py-3 bg-[#FF3333] text-[#0a0a0a] rounded-xl hover:bg-[#FF5555] transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span style={{ fontWeight: 600 }}>Logout</span>
          </button>
        </motion.div>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} accentColor="#FF3333" />

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* System Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Total Users', value: '2,847', icon: Users, color: '#FFD600', status: 'normal' },
                  { label: 'System Health', value: '98%', icon: Activity, color: '#FFD600', status: 'normal' },
                  { label: 'Active Sessions', value: '156', icon: Database, color: '#FFD600', status: 'normal' },
                  { label: 'Security Alerts', value: '3', icon: AlertTriangle, color: '#FF3333', status: 'warning' },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  const isWarning = stat.status === 'warning';

                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <GlassCard enableParallax={false} className={isWarning ? 'pulse-red' : ''}>
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl ${isWarning ? 'bg-[#FF3333]/10' : 'bg-[#FFD600]/10'}`}>
                            <Icon className="w-6 h-6" style={{ color: stat.color }} />
                          </div>
                          <div>
                            <p className="text-[#a8a6a1] mb-1" style={{ fontSize: '0.875rem' }}>{stat.label}</p>
                            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: stat.color }}>
                              {stat.value}
                            </p>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>

              {/* Main Charts */}
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <ChartCard title="Platform Growth" description="User registration over time">
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={platformGrowthData}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FFD600" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#FFD600" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 214, 0, 0.1)" />
                      <XAxis dataKey="month" stroke="#a8a6a1" />
                      <YAxis stroke="#a8a6a1" />
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(20, 20, 20, 0.95)',
                          border: '1px solid rgba(255, 214, 0, 0.2)',
                          borderRadius: '12px',
                          color: '#e8e6e1',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#FFD600"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorUsers)"
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Role-wise Activity" description="Platform engagement by user type">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={roleActivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 214, 0, 0.1)" />
                      <XAxis dataKey="role" stroke="#a8a6a1" />
                      <YAxis stroke="#a8a6a1" />
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(20, 20, 20, 0.95)',
                          border: '1px solid rgba(255, 214, 0, 0.2)',
                          borderRadius: '12px',
                          color: '#e8e6e1',
                        }}
                      />
                      <Bar
                        dataKey="activity"
                        fill="#FFD600"
                        radius={[8, 8, 0, 0]}
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              {/* Recent Activity */}
              <ChartCard title="Recent System Events">
                <div className="space-y-3">
                  {[
                    { event: 'New user registration spike detected', time: '5 minutes ago', status: 'info' },
                    { event: 'System backup completed successfully', time: '1 hour ago', status: 'success' },
                    { event: 'Database optimization recommended', time: '3 hours ago', status: 'warning' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-xl">
                      {item.status === 'success' && <CheckCircle className="w-5 h-5 text-[#FFD600] flex-shrink-0 mt-0.5" />}
                      {item.status === 'warning' && <AlertTriangle className="w-5 h-5 text-[#FF3333] flex-shrink-0 mt-0.5" />}
                      {item.status === 'info' && <Activity className="w-5 h-5 text-[#FFD600] flex-shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-[#e8e6e1] mb-1">{item.event}</p>
                        <p className="text-[#a8a6a1]" style={{ fontSize: '0.875rem' }}>{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <ChartCard title="Feature Usage Distribution" description="Most used platform features">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={featureUsageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        animationDuration={1500}
                      >
                        {featureUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(20, 20, 20, 0.95)',
                          border: '1px solid rgba(255, 214, 0, 0.2)',
                          borderRadius: '12px',
                          color: '#e8e6e1',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Security Events Timeline" description="Tracked security incidents">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={securityEventsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 51, 51, 0.1)" />
                      <XAxis dataKey="week" stroke="#a8a6a1" />
                      <YAxis stroke="#a8a6a1" />
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(20, 20, 20, 0.95)',
                          border: '1px solid rgba(255, 51, 51, 0.2)',
                          borderRadius: '12px',
                          color: '#e8e6e1',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="events"
                        stroke="#FF3333"
                        strokeWidth={3}
                        dot={{ fill: '#FF3333', r: 6 }}
                        animationDuration={1500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              <ChartCard title="Export Analytics Reports">
                <div className="grid md:grid-cols-4 gap-4">
                  {['User Growth Report', 'Engagement Analytics', 'System Performance', 'Security Audit'].map((report, idx) => (
                    <button
                      key={idx}
                      className="btn-3d p-4 bg-[#1a1a1a] text-[#e8e6e1] rounded-xl hover:bg-[#2a2a2a] transition-colors text-center"
                    >
                      <FileText className="w-6 h-6 text-[#FFD600] mx-auto mb-2" />
                      <span style={{ fontSize: '0.875rem' }}>{report}</span>
                    </button>
                  ))}
                </div>
              </ChartCard>
            </motion.div>
          )}

          {activeTab === 'health' && (
            <motion.div
              key="health"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ChartCard title="System Metrics (24h)" description="Real-time resource monitoring">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={systemMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 214, 0, 0.1)" />
                    <XAxis dataKey="time" stroke="#a8a6a1" />
                    <YAxis stroke="#a8a6a1" />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(20, 20, 20, 0.95)',
                        border: '1px solid rgba(255, 214, 0, 0.2)',
                        borderRadius: '12px',
                        color: '#e8e6e1',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="cpu"
                      stroke="#FFD600"
                      strokeWidth={2}
                      dot={false}
                      animationDuration={1500}
                    />
                    <Line
                      type="monotone"
                      dataKey="memory"
                      stroke="#FFB800"
                      strokeWidth={2}
                      dot={false}
                      animationDuration={1500}
                    />
                    <Line
                      type="monotone"
                      dataKey="storage"
                      stroke="#FFA500"
                      strokeWidth={2}
                      dot={false}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {[
                  { label: 'CPU Usage', value: '42%', status: 'normal' },
                  { label: 'Memory', value: '68%', status: 'normal' },
                  { label: 'Storage', value: '54%', status: 'normal' },
                ].map((metric, idx) => (
                  <GlassCard key={idx} enableParallax={false}>
                    <div className="text-center">
                      <p className="text-[#a8a6a1] mb-2">{metric.label}</p>
                      <p style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FFD600' }}>
                        {metric.value}
                      </p>
                      <div className="mt-4 h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: metric.value }}
                          transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                          className="h-full bg-gradient-to-r from-[#FFD600] to-[#FFB800] rounded-full"
                        />
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#e8e6e1]">User Management</h2>
                <button className="btn-3d flex items-center gap-2 px-4 py-2 bg-[#FFD600] text-[#0a0a0a] rounded-lg hover:bg-[#FFB800] transition-colors">
                  <UserPlus className="w-4 h-4" />
                  Add User
                </button>
              </div>

              {/* Search and Filter */}
              <GlassCard className="mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a8a6a1]" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#FFD600]/20 rounded-lg text-[#e8e6e1] placeholder-[#a8a6a1] focus:outline-none focus:border-[#FFD600]"
                    />
                  </div>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-4 py-2 bg-[#1a1a1a] border border-[#FFD600]/20 rounded-lg text-[#e8e6e1] focus:outline-none focus:border-[#FFD600]"
                  >
                    <option value="all">All Roles</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </GlassCard>

              {/* Users Table */}
              <GlassCard>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#FFD600]/20">
                        <th className="text-left py-3 px-4 text-[#a8a6a1] font-medium">Name</th>
                        <th className="text-left py-3 px-4 text-[#a8a6a1] font-medium">Email</th>
                        <th className="text-left py-3 px-4 text-[#a8a6a1] font-medium">Role</th>
                        <th className="text-left py-3 px-4 text-[#a8a6a1] font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-[#a8a6a1] font-medium">Last Login</th>
                        <th className="text-left py-3 px-4 text-[#a8a6a1] font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter(user => 
                          (selectedRole === 'all' || user.role === selectedRole) &&
                          (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()))
                        )
                        .map((user) => (
                          <tr key={user.id} className="border-b border-[#FFD600]/10 hover:bg-[#1a1a1a]/50">
                            <td className="py-3 px-4 text-[#e8e6e1]">{user.name}</td>
                            <td className="py-3 px-4 text-[#e8e6e1]">{user.email}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.role === 'Admin' ? 'bg-[#FF3333]/20 text-[#FF3333]' :
                                user.role === 'Teacher' ? 'bg-[#FFD600]/20 text-[#FFD600]' :
                                'bg-[#FFB800]/20 text-[#FFB800]'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.status === 'Active' ? 'bg-[#FFD600]/20 text-[#FFD600]' : 'bg-[#FF3333]/20 text-[#FF3333]'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-[#a8a6a1]">{user.lastLogin}</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <button className="p-1 text-[#FFD600] hover:text-[#FFB800] transition-colors">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-[#FF3333] hover:text-[#FF5555] transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'content' && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#e8e6e1]">Content Oversight</h2>
                <div className="flex gap-2">
                  <button className="btn-3d flex items-center gap-2 px-4 py-2 bg-[#FFD600] text-[#0a0a0a] rounded-lg hover:bg-[#FFB800] transition-colors">
                    <Upload className="w-4 h-4" />
                    Bulk Actions
                  </button>
                </div>
              </div>

              {/* Content Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Total Content', value: '1,247', icon: FileText, color: '#FFD600' },
                  { label: 'Pending Review', value: '23', icon: Eye, color: '#FFB800' },
                  { label: 'Approved', value: '1,189', icon: CheckCircle, color: '#FFD600' },
                  { label: 'Rejected', value: '35', icon: AlertTriangle, color: '#FF3333' },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <GlassCard key={index} enableParallax={false}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-[${stat.color}]/10`}>
                          <Icon className="w-5 h-5" style={{ color: stat.color }} />
                        </div>
                        <div>
                          <p className="text-[#a8a6a1] text-sm">{stat.label}</p>
                          <p className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>

              {/* Content Table */}
              <GlassCard>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#FFD600]/20">
                        <th className="text-left py-3 px-4 text-[#a8a6a1] font-medium">Title</th>
                        <th className="text-left py-3 px-4 text-[#a8a6a1] font-medium">Author</th>
                        <th className="text-left py-3 px-4 text-[#a8a6a1] font-medium">Type</th>
                        <th className="text-left py-3 px-4 text-[#a8a6a1] font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-[#a8a6a1] font-medium">Views</th>
                        <th className="text-left py-3 px-4 text-[#a8a6a1] font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentItems.map((item) => (
                        <tr key={item.id} className="border-b border-[#FFD600]/10 hover:bg-[#1a1a1a]/50">
                          <td className="py-3 px-4 text-[#e8e6e1] font-medium">{item.title}</td>
                          <td className="py-3 px-4 text-[#e8e6e1]">{item.author}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#FFD600]/20 text-[#FFD600]">
                              {item.type}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'Approved' ? 'bg-[#FFD600]/20 text-[#FFD600]' :
                              item.status === 'Pending' ? 'bg-[#FFB800]/20 text-[#FFB800]' :
                              item.status === 'Under Review' ? 'bg-[#FFA500]/20 text-[#FFA500]' :
                              'bg-[#FF3333]/20 text-[#FF3333]'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#a8a6a1]">{item.views.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button className="p-1 text-[#FFD600] hover:text-[#FFB800] transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-[#FFD600] hover:text-[#FFB800] transition-colors">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-[#FF3333] hover:text-[#FF5555] transition-colors">
                                <AlertTriangle className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'reports' && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#e8e6e1]">Reports & Analytics</h2>
                <div className="flex gap-2">
                  <button className="btn-3d flex items-center gap-2 px-4 py-2 bg-[#FFD600] text-[#0a0a0a] rounded-lg hover:bg-[#FFB800] transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    Generate Report
                  </button>
                  <button className="btn-3d flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-[#e8e6e1] border border-[#FFD600]/20 rounded-lg hover:bg-[#2a2a2a] transition-colors">
                    <Download className="w-4 h-4" />
                    Export All
                  </button>
                </div>
              </div>

              {/* Report Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { title: 'User Activity', description: 'Detailed user engagement metrics', count: 12, color: '#FFD600' },
                  { title: 'Content Analytics', description: 'Content performance and usage', count: 8, color: '#FFB800' },
                  { title: 'System Performance', description: 'Server and application metrics', count: 15, color: '#FFA500' },
                  { title: 'Security Reports', description: 'Security incidents and audits', count: 5, color: '#FF3333' },
                ].map((category, index) => (
                  <GlassCard key={index} enableParallax={false} className="cursor-pointer hover:scale-105 transition-transform">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: `${category.color}20` }}>
                        <BarChart3 className="w-6 h-6" style={{ color: category.color }} />
                      </div>
                      <h3 className="font-semibold text-[#e8e6e1] mb-1">{category.title}</h3>
                      <p className="text-sm text-[#a8a6a1] mb-2">{category.description}</p>
                      <span className="inline-block px-2 py-1 bg-[#FFD600]/20 text-[#FFD600] rounded-full text-xs font-medium">
                        {category.count} reports
                      </span>
                    </div>
                  </GlassCard>
                ))}
              </div>

              {/* Recent Reports */}
              <GlassCard>
                <h3 className="text-lg font-semibold text-[#e8e6e1] mb-4">Recent Reports</h3>
                <div className="space-y-3">
                  {reports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          report.type === 'Activity' ? 'bg-[#FFD600]/20' :
                          report.type === 'Analytics' ? 'bg-[#FFB800]/20' :
                          report.type === 'Performance' ? 'bg-[#FFA500]/20' :
                          'bg-[#FF3333]/20'
                        }`}>
                          <FileText className="w-5 h-5" style={{ 
                            color: report.type === 'Activity' ? '#FFD600' :
                                   report.type === 'Analytics' ? '#FFB800' :
                                   report.type === 'Performance' ? '#FFA500' : '#FF3333'
                          }} />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#e8e6e1]">{report.name}</h4>
                          <p className="text-sm text-[#a8a6a1]">
                            {report.type} • Generated: {report.generated} • Size: {report.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-[#a8a6a1]">{report.downloads} downloads</span>
                        <button className="p-2 text-[#FFD600] hover:text-[#FFB800] transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#e8e6e1]">System Settings</h2>
                <button className="btn-3d flex items-center gap-2 px-4 py-2 bg-[#FFD600] text-[#0a0a0a] rounded-lg hover:bg-[#FFB800] transition-colors">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* General Settings */}
                <GlassCard>
                  <h3 className="text-lg font-semibold text-[#e8e6e1] mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-[#e8e6e1] font-medium">Maintenance Mode</label>
                        <p className="text-sm text-[#a8a6a1]">Temporarily disable user access</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.maintenanceMode}
                          onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFD600]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFD600]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-[#e8e6e1] font-medium">User Registration</label>
                        <p className="text-sm text-[#a8a6a1]">Allow new users to register</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.userRegistration}
                          onChange={(e) => setSettings({...settings, userRegistration: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFD600]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFD600]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-[#e8e6e1] font-medium">Email Notifications</label>
                        <p className="text-sm text-[#a8a6a1]">Send system notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFD600]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFD600]"></div>
                      </label>
                    </div>
                  </div>
                </GlassCard>

                {/* Security & Privacy */}
                <GlassCard>
                  <h3 className="text-lg font-semibold text-[#e8e6e1] mb-4">Security & Privacy</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-[#e8e6e1] font-medium">Content Moderation</label>
                        <p className="text-sm text-[#a8a6a1]">Automatically moderate user content</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.contentModeration}
                          onChange={(e) => setSettings({...settings, contentModeration: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFD600]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFD600]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-[#e8e6e1] font-medium">Analytics Tracking</label>
                        <p className="text-sm text-[#a8a6a1]">Track user behavior and analytics</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.analyticsTracking}
                          onChange={(e) => setSettings({...settings, analyticsTracking: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFD600]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFD600]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-[#e8e6e1] font-medium">Automatic Backup</label>
                        <p className="text-sm text-[#a8a6a1]">Daily automatic system backups</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.autoBackup}
                          onChange={(e) => setSettings({...settings, autoBackup: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFD600]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFD600]"></div>
                      </label>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* System Actions */}
              <GlassCard className="mt-6">
                <h3 className="text-lg font-semibold text-[#e8e6e1] mb-4">System Actions</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <button className="btn-3d p-4 bg-[#1a1a1a] text-[#e8e6e1] rounded-lg hover:bg-[#2a2a2a] transition-colors text-center">
                    <RefreshCw className="w-6 h-6 text-[#FFD600] mx-auto mb-2" />
                    <span className="text-sm">Clear Cache</span>
                  </button>
                  <button className="btn-3d p-4 bg-[#1a1a1a] text-[#e8e6e1] rounded-lg hover:bg-[#2a2a2a] transition-colors text-center">
                    <Database className="w-6 h-6 text-[#FFD600] mx-auto mb-2" />
                    <span className="text-sm">Backup Data</span>
                  </button>
                  <button className="btn-3d p-4 bg-[#FF3333]/10 text-[#FF3333] rounded-lg hover:bg-[#FF3333]/20 transition-colors text-center border border-[#FF3333]/20">
                    <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">Reset Settings</span>
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
