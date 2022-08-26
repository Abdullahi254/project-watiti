import React, { useState, useEffect } from 'react'
import { useAuth } from '../src/contexts/AuthContext'
import { db } from '../src/firebase/firebase'
import { collection, query, onSnapshot, orderBy, } from 'firebase/firestore'
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

function Piechart() {
    const { currentUser } = useAuth()

    const [labels, setLabels] = useState([])
    const [totals, setTotals] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const q = query(collection(db, `users/${currentUser.uid}/vehicles`), orderBy("date", "asc"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            setLoading(false)
            setLabels(querySnapshot.docs.map(doc => doc.data().name.toUpperCase()))
            setTotals(querySnapshot.docs.map(doc => doc.data().total))
        })

        return unsub
    }, [currentUser])

    const data = {
        labels: labels,
        datasets: [{
            label: 'Total Monthly Expenses',
            data: totals,
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(192,192,192)',
                'rgb(0,0,0)',
            ],
            hoverOffset: 4,
            radius: '60%'
        }],

    };
    return (
        <>
            {
                loading ? <ClipLoader loading={loading} color='#52525b' size={100} /> :
                    <Chart type='pie' data={data} />
            }

        </>
    )
}

export default Piechart