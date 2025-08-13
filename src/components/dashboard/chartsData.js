export const tabs = [
  { id: "breakfast", label: "Breakfast", color: "#4845D2" },
  { id: "lunch", label: "Lunch", color: "#4845D2" },
  { id: "hightea", label: "Hightea", color: "#4845D2" },
  { id: "dinner", label: "Dinner", color: "#4845D2" },
];

export const mealData = {
  breakfast: {
    weeklyAvgBooked: 1250,
    weeklyAvgServed: 1180,
    totalBooked: 8750,
    totalServed: 8260,
    bookedPercentage: [75, 25],
    servedPercentage: [85, 15],
    wastePercentage: [12, 88],
  },
  lunch: {
    weeklyAvgBooked: 1850,
    weeklyAvgServed: 1720,
    totalBooked: 12950,
    totalServed: 12040,
    bookedPercentage: [82, 18],
    servedPercentage: [88, 12],
    wastePercentage: [8, 92],
  },
  hightea: {
    weeklyAvgBooked: 650,
    weeklyAvgServed: 580,
    totalBooked: 4550,
    totalServed: 4060,
    bookedPercentage: [65, 35],
    servedPercentage: [78, 22],
    wastePercentage: [15, 85],
  },
  dinner: {
    weeklyAvgBooked: 1950,
    weeklyAvgServed: 1820,
    totalBooked: 13650,
    totalServed: 12740,
    bookedPercentage: [88, 12],
    servedPercentage: [92, 8],
    wastePercentage: [6, 94],
  },
};

export const getPieChartConfig = (
  title,
  labels,
  series,
  colors = ["#5E81F4", "#A1C9F4"]
) => ({
  series,
  options: {
    chart: { width: 350, type: "pie" },
    labels,
    colors,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 280 },
          legend: { position: "bottom" },
        },
      },
    ],
    legend: { position: "bottom" },
    title: {
      text: title,
      align: "center",
      style: { fontSize: "16px", fontWeight: "600" },
    },
  },
});

const barChartCommonOptions = (categories, title) => ({
  chart: { type: "bar", toolbar: { show: false } },
  plotOptions: {
    bar: {
      borderRadius: 4,
      dataLabels: { position: "top" },
    },
  },
  dataLabels: {
    offsetY: -18,
    style: { fontSize: "12px", colors: ["#000"] },
  },
  xaxis: {
    categories,
    labels: { style: { fontSize: "12px" } },
  },
  colors: ["#5E81F4", "#A1C9F4"],
  title: {
    text: title,
    align: "center",
    style: { fontSize: "16px", fontWeight: "600" },
  },
  tooltip: { shared: true, intersect: false },
  legend: { position: "bottom" },
});

export const floorChart5 = {
  series: [
    { name: "Served", data: [3, 4, 5, 1, 0] },
    { name: "Pending", data: [2, 1, 0, 4, 5] },
  ],
  options: barChartCommonOptions(
    ["501", "502", "503", "504", "505"],
    "5th Floor Data - Served vs Pending"
  ),
};

export const floorChart6 = {
  series: [
    { name: "Served", data: [1, 4, 2, 5, 5] },
    { name: "Pending", data: [5, 2, 3, 1, 0] },
  ],
  options: barChartCommonOptions(
    ["601", "602", "603", "604", "605"],
    "6th Floor Data - Served vs Pending"
  ),
};
