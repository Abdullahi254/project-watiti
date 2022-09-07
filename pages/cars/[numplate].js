import React from 'react'
import { useRouter } from 'next/router'
import FuelTable from '../../components/FuelTable'
import ServiceTable from '../../components/ServiceTable'
import OtherExpTable from '../../components/OtherExpTable'
import MaterialTable from '../../components/MaterialTable'
import LabourTable from '../../components/LabourTable'

function Vehicle() {
  const router = useRouter()
  const { numplate } = router.query
  return (
    <div className=' w-full h-screen'>
      <div className='h-20' />
      <div className=' max-w-[1000px] mx-auto text-center'>
        <FuelTable numplate={numplate} />
        <ServiceTable numplate={numplate} />
        <OtherExpTable numplate={numplate}/>
        <LabourTable numplate={numplate}/>
        <MaterialTable numplate={numplate}/>
      </div>
      <div className='h-1/2'/>
    </div>
  )
}

export default Vehicle