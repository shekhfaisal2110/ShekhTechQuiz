// src/components/analytics/CertificateAnalytics.js
import React from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
  BarChart3, PieChart, Star, Target, Clock, AlertTriangle, Award
} from 'lucide-react';
import ChartCard from './ChartCard';
import PerformanceTable from './PerformanceTable';

const CertificateAnalytics = ({ certificateCharts, exportingChart, onExportChart, analyticsData }) => {
  if (!certificateCharts) return null;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attempts by Course */}
        <ChartCard
          title="Attempts by Course"
          icon={BarChart3}
          onExport={() => onExportChart('attempts-chart', 'attempts-by-course')}
          exportingKey="attempts-chart"
          currentExporting={exportingChart}
        >
          <Bar data={certificateCharts.attemptsData} options={chartOptions} />
        </ChartCard>

        {/* Performance Distribution */}
        <ChartCard
          title="Performance Distribution"
          icon={PieChart}
          onExport={() => onExportChart('performance-chart', 'performance-distribution')}
          exportingKey="performance-chart"
          currentExporting={exportingChart}
        >
          <Doughnut data={certificateCharts.performanceData} options={chartOptions} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Average Scores by Course */}
        <ChartCard
          title="Average Scores by Course"
          icon={Star}
          onExport={() => onExportChart('avg-scores-chart', 'average-scores')}
          exportingKey="avg-scores-chart"
          currentExporting={exportingChart}
        >
          <Bar data={certificateCharts.avgScoresData} options={chartOptions} />
        </ChartCard>

        {/* Pass Rate by Course */}
        <ChartCard
          title="Pass Rate by Course"
          icon={Target}
          onExport={() => onExportChart('pass-rate-chart', 'pass-rate')}
          exportingKey="pass-rate-chart"
          currentExporting={exportingChart}
        >
          <Bar data={certificateCharts.passRateData} options={{
            ...chartOptions,
            indexAxis: 'y' // Horizontal bar chart
          }} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Spent by Course */}
        <ChartCard
          title="Average Time per Attempt"
          icon={Clock}
          onExport={() => onExportChart('time-spent-chart', 'time-spent')}
          exportingKey="time-spent-chart"
          currentExporting={exportingChart}
        >
          <Bar data={certificateCharts.timeSpentData} options={chartOptions} />
        </ChartCard>

        {/* Course Difficulty Level */}
        <ChartCard
          title="Course Difficulty Distribution"
          icon={AlertTriangle}
          onExport={() => onExportChart('difficulty-chart', 'difficulty-distribution')}
          exportingKey="difficulty-chart"
          currentExporting={exportingChart}
        >
          <Pie data={certificateCharts.difficultyData} options={chartOptions} />
        </ChartCard>
      </div>

      {/* Top Performing Courses Table */}
      {analyticsData && (
        <PerformanceTable data={analyticsData.certificates} type="courses" />
      )}
    </div>
  );
};

// Import chart options from constants
import { chartOptions } from '../../constants/chartOptions';

export default CertificateAnalytics;