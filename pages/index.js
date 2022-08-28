import Head from 'next/head'
import Bargraph from '../components/Bargraph'
import CarsTableCard from '../components/CarsTableCard'
import LineGraph from '../components/LineGraph'
import Piechart from '../components/Piechart'
import React, {useEffect, useState} from 'react'
import { useAuth } from '../src/contexts/AuthContext'
import { db } from '../src/firebase/firebase'
import { collection, query, onSnapshot, orderBy,} from 'firebase/firestore'

export default function Home() {
  const { currentUser } = useAuth()

  const [loading, setLoading] = useState(false)
  const [docList, setDocList] = useState([])

  useEffect(() => {
    setLoading(true)
    const q = query(collection(db, `users/${currentUser.uid}/vehicles`),  orderBy("date", "asc"));
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

      <div className=' max-w-[1240px] mx-auto grid xs:grid-cols-1 md:grid-cols-2 gap-4 px-6 py-4 '>
          <div className='h-[90px] xs:col-span-1 md:col-span-2'/>
          <div className='xs:col-span-2 md:col-span-1 self-center flex justify-center items-center'>
           <LineGraph/>
          </div>
          <div className='xs:col-span-2 md:col-span-1 py-2'>
            <CarsTableCard loading2={loading} docList={docList}/>
          </div>
          <div className='xs:col-span-2 md:col-span-1 flex justify-center items-center'>
            <Piechart loading={loading} docList={docList}/>
          </div>
          <div className='xs:col-span-2  md:col-span-1 self-center'>
            <Bargraph loading2={loading} docList={docList}/>
          </div>
      </div>
    </div>
  )
}
