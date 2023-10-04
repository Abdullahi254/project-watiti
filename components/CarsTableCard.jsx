import React, { useState, useRef, useEffect } from 'react'
import { MdAdd } from 'react-icons/md'
import { useAuth } from '../src/contexts/AuthContext'
import { db } from '../src/firebase/firebase'
import { doc, setDoc, deleteDoc, Timestamp, query, collection, where, getDocs } from 'firebase/firestore'
import ClipLoader from "react-spinners/ClipLoader";
import AlertComponent from './AlertComponent'

function CarsTableCard({ loading2, docList }) {
    const { currentUser } = useAuth()

    const inputRef = useRef()
    const dateRef = useRef()

    const [success, setSuccess] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [showButton, setShowButton] = useState(true)
    const [search, setSearch] = useState(false)
    const [total, setTotal] = useState([])

    const handleSearch = async () => {
        setError()
        try {
            if (dateRef.current.value.length > 0 && docList) {
                setSearch(true)
                setLoading(true)
                const date = new Date(dateRef.current.value)
                const timestamp = Timestamp.fromDate(date)
                const list = ["fuel", "service", "labour"]
                let totalList = []
                for (let i = 0; i < docList.length; i++) {
                    let total = 0
                    for (let j = 0; j < list.length; j++) {
                        let innerTotal = 0
                        const q = query(collection(db, `users/${currentUser.uid}/vehicles/${docList[i].name}/${list[j]}`),
                            where("date", "==", timestamp))
                        const querySnapshot = await getDocs(q)
                        if (querySnapshot.docs.length > 1) {
                            querySnapshot.docs.forEach((doc) => innerTotal += doc.data().amount)
                            total += innerTotal
                        } else if (querySnapshot.docs.length === 1) {
                            innerTotal += querySnapshot.docs[0].data().amount
                            total += innerTotal
                        } else {
                            total += 0
                        }
                    }
                    totalList.push({
                        name: docList[i].name,
                        date: new Date(timestamp.toDate().toString()).toDateString(),
                        total: total
                    })
                }
                setTotal(totalList)
                setLoading(false)
            }
            else {
                setSearch(false)
            }
        } catch (er) {
            setLoading(false)
            setError("Error fetching data!")
            console.log(er)
        }


    }

    const handleAddForm = () => {
        setShowButton(prev => !prev)
    }
    const handleDisableButton = () => {
        const plateName = inputRef.current.value.trim().toLowerCase()
        if (plateName.length > 3) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }
    const addVehicleHandler = async (event) => {
        event.preventDefault()
        setError()
        setSuccess()
        setLoading(true)
        try {
            const event = new Date()
            const plateName = inputRef.current.value.trim().toLowerCase()
            const names = docList.map(doc => doc.name)
            console.log(names)
            const doubleEntry = names.includes(plateName)
            if (doubleEntry) {
                throw new Error("DOUBLE ENTRY")
            }
            await setDoc(doc(db, `users/${currentUser.uid}/vehicles`, `${plateName}`), {
                name: plateName,
                date: event.toLocaleString('en-GB'),
                total: 0
            },
                {
                    merge: true,
                })
            setLoading(false)
            setSuccess('Successfully added a new vehicle!')
            inputRef.current.value = ''
        } catch (er) {
            setLoading(false)
            console.log(er)
            if (er.message === "DOUBLE ENTRY") {
                setError('Error! Double Entry not Allowed')
            } else {
                setError('Error adding a vehicle!')
            }
        }
        setDisabled(true)
    }

    const handleDel = async (name) => {
        // setError()
        // setSuccess()
        // setLoading(true)
        // try {
        //     const text = "Are you sure you want to delete Vehicle?"
        //     if (confirm(text) == true) {
        //         await deleteDoc(doc(db, `users/${currentUser.uid}/vehicles`, `${name}`))
        //         setLoading(false)
        //         setSuccess('Successfully deleted vehicle!')
        //     }
        //     else {
        //         setLoading(false)
        //         return
        //     }
        // } catch (er) {
        //     setLoading(false)
        //     console.log(er)
        //     setError('Error deleting vehicle!')
        // }
        const text = "Contact Admin to perform task!"
        confirm(text)

    }

    const closeAlertHandler = () => {
        setError()
        setSuccess()
    }


    return (
        <div className='w-full border-2 rounded-lg overflow-x-auto relative bg-white py-10 mb-2 max-h-[400px] md:max-h-[550px]
       scrollbar-thumb-gray-500 scrollbar-track-white scrollbar-thin text-xs md:text-sm' id='car-table'>
            <span className='text-xs italic font-medium px-6'>Account: {currentUser && currentUser.email}</span>
            <div className='w-full py-4 px-6 flex justify-between '>
                <h2 className='text-sm md:text-base'>List of Vehicles</h2>
                <input type="date" ref={dateRef} onChange={handleSearch} />
            </div>
            <table className="w-full text-xs md:text-sm text-left text-gray-500">
                <thead className="text-[9px] md:text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Plate Number
                        </th>
                        <th scope="col" className="py-3 px-6">
                            {search ? "Searched Date" : "Date Added"}
                        </th>
                        <th scope="col" className="py-3 px-6">
                            {search ? "Total" : "Grand Total"}
                        </th>
                        {/* <th scope="col" className="py-3 px-6">
                            Action
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                    {search ? total.map((val, index) => {
                        return (
                            <tr className="bg-white border-b" key={index}>
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap uppercase">
                                    {val.name}
                                </th>
                                <td className="py-4 px-6">
                                    {val.date}
                                </td>
                                <td className="py-4 px-6">
                                    KSH {val.total.toFixed(2)}
                                </td>
                                {/* <td className="py-4 px-6">
                                    <button className='border-transparent text-red-400 hover:text-red-700 text-sm py-1 px-2 rounded' onClick={() => handleDel(val.name)}>Delete</button>
                                </td> */}
                            </tr>
                        )
                    }) :
                        docList.length > 0 && docList.map((val, index) => {
                            return (
                                <tr className="bg-white border-b" key={index}>
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap uppercase">
                                        {val.name}
                                    </th>
                                    <td className="py-4 px-6">
                                        {val.date}
                                    </td>
                                    <td className="py-4 px-6">
                                        KSH {val.total?.toFixed(2)}
                                    </td>
                                    {/* <td className="py-4 px-6">
                                        <button className='border-transparent text-red-400 hover:text-red-700 text-sm py-1 px-2 rounded' onClick={() => handleDel(val.name)}>Delete</button>
                                    </td> */}
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

            <div className='px-2 w-full flex flex-col justify-center items-center my-2'>
                <ClipLoader loading={loading || loading2} color='#52525b' size={50} />
                <AlertComponent error={error} close={closeAlertHandler} />
                <AlertComponent success={success} close={closeAlertHandler} />
            </div>

            <div className='w-full border-2' />

            {
                showButton ? <div className='w-full my-2'>
                    <MdAdd className=' mx-auto text-2xl md:text-3xl cursor-pointer text-gray-600' onClick={handleAddForm} />
                </div> :
                    <form className="w-full max-w-[300px] mx-auto py-2" onSubmit={addVehicleHandler}>
                        <div className="flex items-center border-b border-gray-500 py-2">
                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Plate Number" ref={inputRef} onChange={handleDisableButton} />
                            <button disabled={disabled} className=" uppercase border-transparent disabled:bg-gray-300  flex-shrink-0 bg-gray-600 hover:bg-gray-900 border-gray-500 text-xs md:text-sm  text-white py-1 px-2 rounded" type="submit" >
                                Add
                            </button>
                            <button className="flex-shrink-0 border-transparent border-2 text-red-400 hover:text-red-700 py-1 px-2 rounded text-xs md:text-sm" type="button" onClick={handleAddForm}>
                                Cancel
                            </button>
                        </div>
                    </form>
            }




        </div>
    )
}

export default CarsTableCard