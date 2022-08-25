import React from 'react'
import { BiDollar } from 'react-icons/bi'

function ExpenseCard({ name, theme }) {
    return (
        <div className= {!theme ? ' my-2 xs:w-[70%] md:w-[48%]  bg-gradient-to-r from-gray-300 to-blue-300 py-6  px-4 text-black rounded-xl  relative':
        ' my-2 xs:w-[70%] md:w-[48%]  bg-gradient-to-r from-blue-100 to-red-300 py-6  px-4 text-black rounded-xl  relative' }>
            <div className=' absolute right-1 top-1'>
                <BiDollar className=' xs:text-2xl md:text-3xl' />
            </div>
            <p className='xs:text-xl md:text-2xl py-4 mb-2'>{name === 'week' ? 'Week Expense' : 'Month Expense'}</p>
            <div className=' py-4 flex flex-col justify-center items-start'>
                <p className='xs:text-xl md:text-2xl font-semibold'>KSH 200</p>
                <p className='italic py-1'>
                    {name === 'week' ? "This week's expense" : " This month's expense"}
                </p>
            </div>
        </div>
    )
}

export default ExpenseCard