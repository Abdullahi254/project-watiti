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
    <div className='h-screen w-full'>
      <Head>
        <title>Watiti books</title>
        <meta name="description" content="watiti's book keeping app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=' max-w-[1240px] mx-auto grid xs:grid-cols-1 md:grid-cols-2 px-6 py-4 gap-3 '>
        <div className='h-[50px] xs:col-span-1 md:col-span-2' />
        <div className='xs:col-span-2 md:col-span-1 py-2 flex flex-col justify-center items-center self-center'>
          <CarsTableCard loading2={loading} docList={docList} />
          <span className='py-2' />
          <Piechart loading={loading} docList={docList} />
        </div>
        <div className='xs:col-span-2 md:col-span-1 py-2  flex flex-col justify-center items-center self-center'>
          <OtherExpTable />
          <span className='py-2' />
          <Bargraph loading2={loading} docList={docList} />
          <span className='py-2' />
          <LineGraph />
        </div>
      </div>
      <div className='h-1/4' />
    </div>
  )
}
