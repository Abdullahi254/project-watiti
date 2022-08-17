import React from 'react'
import { useRouter } from 'next/router'

function Vehicle() {
    const router = useRouter()
    const { numplate } = router.query
  return (
    <>
        <div className='mb-2 h-20'/>
        <div>
            {numplate}
        </div>
    </>
  )
}

export default Vehicle