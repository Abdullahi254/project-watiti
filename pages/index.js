import Head from 'next/head'
import Bargraph from '../components/Bargraph'
import CarsTableCard from '../components/CarsTableCard'
import LineGraph from '../components/LineGraph'
import Piechart from '../components/Piechart'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../src/contexts/AuthContext'
import { db } from '../src/firebase/firebase'
import { collection, query, onSnapshot, orderBy, } from 'firebase/firestore'
import OtherExpTable from '../components/OtherExpTable'

export default function Home() {
  const { currentUser } = useAuth()

  const [loading, setLoading] = useState(false)
  const [docList, setDocList] = useState([])

  useEffect(() => {
    setLoading(true)
    const q = query(collection(db, `users/${currentUser.uid}/vehicles`), orderBy("date", "asc"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setLoading(false)
      setDocList(querySnapshot.docs.map(doc => doc.data()))
    })

    return unsub
  }, [currentUser])

  return (
    <div className='h-screen w-full scrollbar-thumb-gray-500 scrollbar-track-white scrollbar-thin'>
      <Head>
        <title>Watiti books</title>
        <meta name="description" content="watiti's book keeping app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='my-24'>

        <section className='max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 auto-rows-max mb-[40px]'>
          <CarsTableCard loading2={loading} docList={docList} />
          <OtherExpTable />
        </section>

        <section className='max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3'>
          <div>
            <Piechart loading={loading} docList={docList} />
          </div>

          <div className='flex flex-col items-center space-y-3'>
            <Bargraph loading2={loading} docList={docList} />
            <LineGraph />
          </div>
        </section>

      </main>
    </div>
  )
}
