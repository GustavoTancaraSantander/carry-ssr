export const chartColors = {
  default: {
    primary: '#00D1B2',
    info: '#209CEE',
    danger: '#FF3860',
    green: '#5cc88e',
    orange: '#ffc107',
    purple: '#9c27b0',
    yellow: '#c6b527',
    brown: '#795548',
  },
}

export const baseChartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: true,
  },
  responsive: true,
}

export const chartOptionsMain = {
  ...baseChartOptions,
  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: 'nearest',
    intersect: 0,
    position: 'nearest',
  },
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: 'rgba(29,140,248,0.0)',
          zeroLineColor: 'transparent',
        },
        ticks: {
          padding: 20,
          fontColor: '#9a9a9a',
          // stepSize: 1,
          // suggestedMin: 0,
          // beginAtZero: true,
        },
      },
    ],

    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: 'rgba(225,78,202,0.1)',
          zeroLineColor: 'transparent',
        },
        ticks: {
          padding: 20,
          fontColor: '#9a9a9a',
        },
      },
    ],
  },
}
