export default {
  type: "bubble",
  data: {
    datasets: [],
  },
  options: {
    aspectRatio: 1,
    maintainAspectRatio: true,
    // responsive:false,
    // onClick: handleBubbleC,
    tooltips: {
      enabled: true,
      callbacks: {
        label: function(tooltipItem, data) {          
          let b = data.datasets[tooltipItem.datasetIndex].data.find(
            (i) => i.x == tooltipItem.xLabel && i.y == tooltipItem.yLabel
          );
          return b.revenue === null ? b.label : `Revenue: $${b.revenue}`;
        },
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            tickMarkLength: false,
          },
          scaleLabel: {
            display: true,
            labelString: "Product Execution",
            fontColor: "#685e68",
            fontSize: "15",
          },
          ticks: {
            beginAtZero: true,
            display: false,
            max: 200,
            lineWidth: 20,
            stepSize: 20,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            tickMarkLength: false,
          },
          scaleLabel: {
            display: true,
            labelString: "Geographic Presence",
            fontColor: "#685e68",
            fontSize: "15",
          },
          ticks: {
            beginAtZero: true,
            display: false,
            max: 200,
            stepSize: 20,
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        anchor: function(context) {
          var value = context.dataset.data[context.dataIndex];
          return value.v < 50 ? "end" : "start";
        },
        align: function(context) {
          var value = context.dataset.data[context.dataIndex];
          return value.v < 50 ? "end" : "start";
        },
        color: function(context) {
          var value = context.dataset.data[context.dataIndex];
          return value.v < 50 ? context.dataset.backgroundColor : "black";
        },
        font: {
          weight: "bold",
        },
        formatter: function(value) {
          return value.label;
        },
        offset: 2,
        padding: 0,
      },
    },
  },
};
