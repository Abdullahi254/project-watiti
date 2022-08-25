import React from 'react'
import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
} from 'chart.js';

import {
    Chart
} from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
);


function Bargraph() {
    const labels = [
        'January',
        'February',
        'March',
        'April',
    ];
    const data = {
        labels: labels,
        datasets: [{
            label: 'KAA-123A',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
            ],
            borderWidth: 1,
        },
        {
            label: 'KAB-123B',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',

            ],
            borderColor: [
                'rgb(75, 192, 192)',
            ],
            borderWidth: 1,
        }
        ]
    };
    return (
        <>
            <Chart type='bar' data={data} options={{ scales: { y: { beginAtZero: true } } }} />
        </>
    )
}

export default Bargraph