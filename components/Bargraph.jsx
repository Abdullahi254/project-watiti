import React, { useEffect, useState } from 'react'
import { useAuth } from '../src/contexts/AuthContext'
import { db } from '../src/firebase/firebase'
import { collection, query, onSnapshot, where } from 'firebase/firestore'
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


    const [loading, setLoading] = useState(false)
    const [month1, setMonth1] = useState([])
    const [month2, setMonth2] = useState([])
    const [month3, setMonth3] = useState([])
    const [month4, setMonth4] = useState([])


    useEffect(() => {
        if (docList.length > 0) {
            setLoading(true)
            const list = []
            const date = new Date()
            const year = date.getFullYear()
            const currentMonth = date.getMonth()
            for (let i = (currentMonth - 3); i <= currentMonth; i++) {
                if (i < 0) {
                    list.push({
                        month: i + 12,
                        year: year - 1
                    })
                } else {
                    list.push({
                        month: i,
                        year: year
                    })
                }
            }

            for (let i = 0; i < docList.length; i++) {
                let innerList = []
                const q = query(collection(db, `users/${currentUser.uid}/vehicles/${docList[i].name}/${list[0].year}`), where("month", "==", list[0].month));
                const unsub = onSnapshot(q, (querySnapshot) => {
                    if (querySnapshot.empty) {
                        innerList.push(
                            {
                                plate: docList[i].name,
                                month: list[0].month,
                                total: 0
                            }
                        )
                    } else {
                        innerList = querySnapshot.docs.map(doc => {
                            return {
                                plate: docList[i].name,
                                month: doc.data().month,
                                total: doc.data().total
                            }
                        })
                    }

                    setMonth1(prev => [...prev, innerList[0]])
                })
            }
            for (let i = 0; i < docList.length; i++) {
                let innerList = []
                const q = query(collection(db, `users/${currentUser.uid}/vehicles/${docList[i].name}/${list[1].year}`), where("month", "==", list[1].month));
                const unsub = onSnapshot(q, (querySnapshot) => {
                    if (querySnapshot.empty) {
                        innerList.push(
                            {
                                plate: docList[i].name,
                                month: list[1].month,
                                total: 0
                            }
                        )
                    } else {
                        innerList = querySnapshot.docs.map(doc => {
                            return {
                                plate: docList[i].name,
                                month: doc.data().month,
                                total: doc.data().total
                            }
                        })
                    }

                    setMonth2(prev => [...prev, innerList[0]])
                })
            }
            for (let i = 0; i < docList.length; i++) {
                let innerList = []
                const q = query(collection(db, `users/${currentUser.uid}/vehicles/${docList[i].name}/${list[2].year}`), where("month", "==", list[2].month));
                const unsub = onSnapshot(q, (querySnapshot) => {
                    if (querySnapshot.empty) {
                        innerList.push(
                            {
                                plate: docList[i].name,
                                month: list[2].month,
                                total: 0
                            }
                        )
                    } else {
                        innerList = querySnapshot.docs.map(doc => {
                            return {
                                plate: docList[i].name,
                                month: doc.data().month,
                                total: doc.data().total
                            }
                        })
                    }

                    setMonth3(prev => [...prev, innerList[0]])
                })
            }
            for (let i = 0; i < docList.length; i++) {
                let innerList = []
                const q = query(collection(db, `users/${currentUser.uid}/vehicles/${docList[i].name}/${list[3].year}`), where("month", "==", list[3].month));
                const unsub = onSnapshot(q, (querySnapshot) => {
                    if (querySnapshot.empty) {
                        innerList.push(
                            {
                                plate: docList[i].name,
                                month: list[3].month,
                                total: 0
                            }
                        )
                    } else {
                        innerList = querySnapshot.docs.map(doc => {
                            return {
                                plate: docList[i].name,
                                month: doc.data().month,
                                total: doc.data().total
                            }
                        })
                    }

                    setMonth4(prev => [...prev, innerList[0]])
                })
            }
            setLoading(false)
        }

    }, [docList, currentUser])

    const labels = []
    const datasets = []

    if (month1.length > 0 && month2.length > 0 && month3.length > 0 && month4.length > 0 && docList.length > 0) {
        labels.push(MONTHS[month1[0].month])
        labels.push(MONTHS[month2[0].month])
        labels.push(MONTHS[month3[0].month])
        labels.push(MONTHS[month4[0].month])
        const completeList = month1.concat(month2, month3, month4)
        for (let i = 0; i < docList.length; i++) {
            let filtered = []
            let totalList = []
            filtered = completeList.filter(obj => {
                return obj.plate === docList[i].name
            })
            totalList = filtered.map(obj => obj.total)
            datasets.push({
                label: docList[i].name,
                data: totalList,
                backgroundColor: [BAGROUNDCOLOR[i]],
                borderColor: [BORDERCOLOR[i]],
                borderWidth: 1
            })
        }
    }

    const data = {
        labels: labels,
        datasets: datasets
    };
    return (
        <>
            {
                loading || loading2 ? <ClipLoader loading={loading} color='#52525b' size={100} /> :
                    <>
                        <p className='py-1 italic font-semibold text-sm'>Latest Expenses</p>
                        <Chart type='bar' data={data} options={{ scales: { y: { beginAtZero: true } } }} />
                    </>

            }

        </>
    )
}

export default Bargraph