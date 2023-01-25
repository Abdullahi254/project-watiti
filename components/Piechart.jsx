import React from 'react'
import {bgColors, borderColors} from '../public/colors/colors'
import ClipLoader from "react-spinners/ClipLoader";
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
    SubTitle
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

function Piechart({ loading, docList }) {

    const data = {
        labels: docList.map(doc=>doc.name.toUpperCase()),
        datasets: [{
            label: 'Total Monthly Expenses',
            data: docList.map((doc=>doc.total)),
            backgroundColor: borderColors,
            hoverOffset: 4,
            radius: '60%'
        }],

    };
    return (
        <>
            {
                loading ? <ClipLoader loading={loading} color='#52525b' size={100} /> :
                    <>
                    <p className='py-1 italic font-semibold text-sm'>Total Expenses</p>
                    <Chart type='pie' data={data} />
                    </>
                    
            }

        </>
    )
}

export default Piechart