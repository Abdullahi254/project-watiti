import Head from 'next/head'
import CarsTableCard from '../components/CarsTableCard'
import ExpenseCard from '../components/ExpenseCard'
export default function Home() {
  return (
    <div className='h-screen w-full'>
      <Head>
        <title>Watiti books</title>
        <meta name="description" content="watiti's book keeping app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=' max-w-[1280px] mx-auto grid xs:grid-cols-1 md:grid-cols-2 gap-4 px-6 py-4'>
          <div className='h-[90px] xs:col-span-1 md:col-span-2'/>
          <div className='xs:col-span-2 md:col-span-1 xs:flex-col md:flex-row flex self-start items-center  justify-between py-2'>
            <ExpenseCard name="week"/>
            <ExpenseCard name="month" theme={2}/>
          </div>
          <div className='xs:col-span-2 md:col-span-1 py-2 auto-rows-min'>
            <CarsTableCard/>
          </div>
          <div className='xs:col-span-2 border-2 md:col-span-1 py-2'>
            col 3
          </div>
          <div className='xs:col-span-2 border-2 md:col-span-1 py-2'>
            col 4
          </div>
      </div>

    </div>
  )
}
