import Head from 'next/head'
import Bargraph from '../components/Bargraph'
import CarsTableCard from '../components/CarsTableCard'
import ExpenseCard from '../components/ExpenseCard'
import LineGraph from '../components/LineGraph'
import Piechart from '../components/Piechart'
export default function Home() {
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
            <CarsTableCard/>
          </div>
          <div className='xs:col-span-2 md:col-span-1 flex justify-center items-center'>
            <Piechart/>
          </div>
          <div className='xs:col-span-2  md:col-span-1 self-center'>
            <Bargraph/>
          </div>
      </div>
    </div>
  )
}
