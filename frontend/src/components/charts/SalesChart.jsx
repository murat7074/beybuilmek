import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMediaQuery } from 'react-responsive';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesChart({ salesData }) {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 641px) and (max-width: 1024px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1025px)' });

  const [containerClassName, setContainerClassName] = useState('w-full h-96 mx-auto');

  useEffect(() => {
    if (isSmallScreen) {
      setContainerClassName('w-96 h-64 mx-auto');
    } else if (isMediumScreen) {
      setContainerClassName('w-2xl h-80 mx-auto');
    } else if (isLargeScreen) {
      setContainerClassName('w-full h-96 mx-auto');
    }
  }, [isSmallScreen, isMediumScreen, isLargeScreen]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Satış & Sipariş Bilgileri",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const labels = salesData?.map((data) => data?.date);

  const data = {
    labels,
    datasets: [
      {
        label: "Satış",
        data: salesData?.map((data) => data?.sales),
        borderColor: "#198753",
        backgroundColor: "rgba(42, 117, 83, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Sipariş",
        data: salesData?.map((data) => data?.numOrders),
        borderColor: "rgb(220, 52, 69)",
        backgroundColor: "rgba(201, 68, 82, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  return (
    <div className={`overflow-hidden ${containerClassName}`}>
      <Line options={options} data={data} />
    </div>
  );
}













// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function SalesChart({ salesData }) {
//   const options = {
//     responsive: true,
//     interaction: {
//       mode: "index",
//       intersect: false,
//     },
//     stacked: false,
//     plugins: {
//       title: {
//         display: true,
//         text: "Sales & Order Data",
//       },
//     },
//     scales: {
//       y: {
//         type: "linear",
//         display: true,
//         position: "left",
//       },
//       y1: {
//         type: "linear",
//         display: true,
//         position: "right",
//         grid: {
//           drawOnChartArea: false,
//         },
//       },
//     },
//   };

//   const labels = salesData?.map((data) => data?.date);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Sales",
//         data: salesData?.map((data) => data?.sales),
//         borderColor: "#198753",
//         backgroundColor: "rgba(42, 117, 83, 0.5)",
//         yAxisID: "y",
//       },
//       {
//         label: "Orders",
//         data: salesData?.map((data) => data?.numOrders),
//         borderColor: "rgb(220, 52, 69)",
//         backgroundColor: "rgba(201, 68, 82, 0.5)",
//         yAxisID: "y1",
//       },
//     ],
//   };

//   return (
//     <div className="w-full max-w-3xl h-96 mx-auto overflow-hidden">
//       <Line options={options} data={data} />
//     </div>
//   );
// }











// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function SalesChart({ salesData }) {
//   const options = {
//     responsive: true,
//     interaction: {
//       mode: "index",
//       intersect: false,
//     },
//     stacked: false,
//     plugins: {
//       title: {
//         display: true,
//         text: "Sales & Order Data",
//       },
//     },
//     scales: {
//       y: {
//         type: "linear",
//         display: true,
//         position: "left",
//       },
//       y1: {
//         type: "linear",
//         display: true,
//         position: "right",
//         grid: {
//           drawOnChartArea: false,
//         },
//       },
//     },
//   };

//   const labels = salesData?.map((data) => data?.date);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Sales",
//         data: salesData?.map((data) => data?.sales),
//         borderColor: "#198753",
//         backgroundColor: "rgba(42, 117, 83, 0.5)",
//         yAxisID: "y",
//       },
//       {
//         label: "Orders",
//         data: salesData?.map((data) => data?.numOrders),
//         borderColor: "rgb(220, 52, 69)",
//         backgroundColor: "rgba(201, 68, 82, 0.5)",
//         yAxisID: "y1",
//       },
//     ],
//   };
//   return <Line options={options} data={data} />;
// }
