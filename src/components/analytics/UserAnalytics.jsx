// src/components/analytics/UserAnalytics.js
import React from 'react';
import { Bar, Doughnut, Radar,Pie } from 'react-chartjs-2';
import {
  Users, PieChart, LineChart, TrendingUp, GraduationCap, Clock
} from 'lucide-react';
import ChartCard from './ChartCard';
import PerformanceTable from './PerformanceTable';

const UserAnalytics = ({ userCharts, exportingChart, onExportChart, analyticsData }) => {
  if (!userCharts) return null;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity */}
        <ChartCard
          title="User Activity"
          icon={Users}
          onExport={() => onExportChart('user-activity-chart', 'user-activity')}
          exportingKey="user-activity-chart"
          currentExporting={exportingChart}
        >
          <Bar data={userCharts.activityData} options={chartOptions} />
        </ChartCard>

        {/* Success Rate Distribution */}
        <ChartCard
          title="Success Rate by User"
          icon={PieChart}
          onExport={() => onExportChart('success-rate-chart', 'success-rate')}
          exportingKey="success-rate-chart"
          currentExporting={exportingChart}
        >
          <Doughnut data={userCharts.successRateData} options={chartOptions} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Performance Radar */}
        <ChartCard
          title="User Performance Comparison"
          icon={LineChart}
          onExport={() => onExportChart('performance-radar-chart', 'performance-radar')}
          exportingKey="performance-radar-chart"
          currentExporting={exportingChart}
        >
          <Radar data={userCharts.performanceData} options={radarChartOptions} />
        </ChartCard>

        {/* Improvement Rate */}
        <ChartCard
          title="User Improvement Rate"
          icon={TrendingUp}
          onExport={() => onExportChart('improvement-chart', 'improvement-rate')}
          exportingKey="improvement-chart"
          currentExporting={exportingChart}
        >
          <Bar data={userCharts.improvementData} options={chartOptions} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Distribution */}
        <ChartCard
          title="User Activity Distribution"
          icon={GraduationCap}
          onExport={() => onExportChart('activity-distribution-chart', 'activity-distribution')}
          exportingKey="activity-distribution-chart"
          currentExporting={exportingChart}
        >
          <Pie data={userCharts.activityDistributionData} options={chartOptions} />
        </ChartCard>

        {/* Time vs Performance */}
        <ChartCard
          title="Time Spent vs Performance"
          icon={Clock}
          onExport={() => onExportChart('time-performance-chart', 'time-performance')}
          exportingKey="time-performance-chart"
          currentExporting={exportingChart}
        >
          <Bar data={userCharts.timePerformanceData} options={{
            ...chartOptions,
            scales: {
              ...chartOptions.scales,
              y1: {
                ...chartOptions.scales.y,
                position: 'right',
                title: {
                  display: true,
                  text: 'Total Time (minutes)',
                  color: '#6b7280'
                },
                grid: {
                  drawOnChartArea: false
                }
              }
            }
          }} />
        </ChartCard>
      </div>

      {/* Most Active Users Table */}
      {analyticsData && (
        <PerformanceTable data={analyticsData.users} type="users" />
      )}
    </div>
  );
};

// Import chart options from constants
import { chartOptions, radarChartOptions } from '../../constants/chartOptions';

export default UserAnalytics;