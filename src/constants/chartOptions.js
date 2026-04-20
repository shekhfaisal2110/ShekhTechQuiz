// src/constants/chartOptions.js

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          size: 12
        },
        padding: 20
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#333',
      bodyColor: '#333',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      displayColors: true
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false
      },
      ticks: {
        font: {
          size: 11
        },
        color: '#6b7280'
      }
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false
      },
      ticks: {
        font: {
          size: 11
        },
        color: '#6b7280',
        precision: 0
      }
    }
  }
};

export const lineChartOptions = {
  ...chartOptions,
  scales: {
    ...chartOptions.scales,
    y: {
      ...chartOptions.scales.y,
      beginAtZero: true
    }
  },
  elements: {
    line: {
      tension: 0.3,
      borderWidth: 3
    },
    point: {
      radius: 4,
      hoverRadius: 6,
      backgroundColor: '#ffffff',
      borderWidth: 2
    }
  }
};

export const radarChartOptions = {
  ...chartOptions,
  scales: {
    r: {
      angleLines: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)'
      },
      suggestedMin: 0,
      suggestedMax: 100,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      },
      ticks: {
        font: {
          size: 10
        },
        color: '#6b7280'
      }
    }
  }
};