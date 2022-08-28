import React, { useEffect, useState } from 'react'
import { useAuth } from '../src/contexts/AuthContext'
import { db } from '../src/firebase/firebase'
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore'
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

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
]

const BAGROUNDCOLOR = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgb(255, 205, 86, 0.2)',
    'rgb(192, 192, 192, 0.2)',
    'rgb(0, 0, 0, 0.2)',
]

const BORDERCOLOR = [
    'rgba(255, 99, 132)',
    'rgba(75, 192, 192)',
    'rgb(255, 205, 86)',
    'rgb(192, 192, 192)',
    'rgb(0, 0, 0)',
]

function Bargraph({ loading2, docList }) {
    const { currentUser } = useAuth()

    const { cars, setCars } = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const list = []
        const date = new Date()
        const year = date.getFullYear()
        const currentMonth = date.getMonth()
        for (let i = (currentMonth - 3); i <= currentMonth; i++) {
            if (i < 0) {
                list.push(i + 12)
            } else {
                list.push(i)
            }
        }
        
        console.log(docList)

    }, [docList])

    const data = {
        labels: MONTHS.slice(8),
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