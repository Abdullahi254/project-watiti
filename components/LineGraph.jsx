import React, { useEffect, useState } from 'react'
import { useAuth } from '../src/contexts/AuthContext'
import { db } from '../src/firebase/firebase'
import { collection, query, onSnapshot, where, orderBy } from 'firebase/firestore'
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

function LineGraph() {
    const [totals, setTotals] = useState([])
    const [loading, setLoading] = useState(false)

    const { currentUser } = useAuth()

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
        const q = query(collection(db, `users/${currentUser.uid}/vehicles/totalMonthly/${year}`), where("month", "in", list));
        const unsub = onSnapshot(q, (querySnapshot) => {
            setLoading(false)
            setTotals(querySnapshot.docs.map(doc => {
                return {
                    month: MONTHS[doc.data().month],
                    total: doc.data().total
                }
            }))
        })

        return unsub
    }, [currentUser])

    const data = {
        labels: totals.map(obj=>obj.month),
        datasets: [{
            label: 'Total Monthly Expenses',
            data: totals.map(obj=>obj.total),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointBackgroundColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(75, 192, 192)'
        }]
    };

    return (
        <>
            {
                loading ? <ClipLoader loading={loading} color='#52525b' size={100} /> :
                    <Chart type='line' data={data} options={{ scales: { y: { stacked: true } } }} />
            }

        </>
    )
}

export default LineGraph