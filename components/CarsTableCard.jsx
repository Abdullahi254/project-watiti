import React, { useState, useRef, useEffect } from 'react'
import { MdAdd } from 'react-icons/md'
import { useAuth } from '../src/contexts/AuthContext'
import { db } from '../src/firebase/firebase'
import { collection, query, doc, setDoc, onSnapshot, orderBy, deleteDoc } from 'firebase/firestore'
import ClipLoader from "react-spinners/ClipLoader";
import AlertComponent from './AlertComponent'

function CarsTableCard() {
    const { currentUser } = useAuth()

    const inputRef = useRef()

    const [success, setSuccess] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [showButton, setShowButton] = useState(true)
    const [docList, setDocList] = useState([])

    const handleAddForm = () => {
        setShowButton(prev => !prev)
    }
    const handleDisableButton = () => {
        if (inputRef.current.value.length > 3) {
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
            await setDoc(doc(db, `users/${currentUser.uid}/vehicles`, `${inputRef.current.value}`), {
                name: inputRef.current.value,
                date: event.toLocaleString('en-GB'),
                total: 0
            })
            setLoading(false)
            setSuccess('Successfully added a new vehicle!')
        } catch (er) {
            setLoading(false)
            console.log(er)
            setError('Error adding a vehicle!')
        }
    }

    const handleDel = async (name) => {
        setError()
        setSuccess()
        setLoading(true)
        try {
            const text = "Are you sure you want to delete Vehicle?"
            if (confirm(text) == true) {
                await deleteDoc(doc(db, `users/${currentUser.uid}/vehicles`, `${name}`))
                setLoading(false)
                setSuccess('Successfully deleted vehicle!')
            }
            else {
                setLoading(false)
                return
            }
        } catch (er) {
            setLoading(false)
            console.log(er)
            setError('Error deleting vehicle!')
        }

    }

    const closeAlertHandler = () => {
        setError()
        setSuccess()
    }

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
        <div className=' border-2 rounded-lg overflow-x-auto relative bg-white py-10'>

            <div className='px-2 w-full flex flex-col justify-center items-center'>
                <ClipLoader loading={loading} color='#52525b' size={50} />
                <AlertComponent error={error} close={closeAlertHandler} />
                <AlertComponent success={success} close={closeAlertHandler} />
            </div>

            <h2 className='py-4 px-6 xs:text-2xl md:text-3xl'>List of Vehicles</h2>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Plate Number
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Date Added
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Total Expense
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        docList.length > 0 && docList.map((val, index) => {
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase">
                                        {val.name}
                                    </th>
                                    <td className="py-4 px-6">
                                        {val.date}
                                    </td>
                                    <td className="py-4 px-6">
                                        KSH {val.total.toFixed(2)}
                                    </td>
                                    <td className="py-4 px-6">
                                        <button className='border-transparent text-red-400 hover:text-red-700 text-sm py-1 px-2 rounded' onClick={() => handleDel(val.name)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

            <div className='w-full border-2' />

            {
                showButton ? <div className='w-full my-2'>
                    <MdAdd className=' mx-auto text-3xl cursor-pointer text-gray-600' onClick={handleAddForm} />
                </div> :
                    <form className="w-full max-w-[300px] mx-auto py-2" onSubmit={addVehicleHandler}>
                        <div className="flex items-center border-b border-gray-500 py-2">
                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Plate Number" ref={inputRef} onChange={handleDisableButton} />
                            <button disabled={disabled} className=" uppercase border-transparent disabled:bg-gray-300  flex-shrink-0 bg-gray-600 hover:bg-gray-900 border-gray-500  text-sm  text-white py-1 px-2 rounded" type="submit" >
                                Add
                            </button>
                            <button className="flex-shrink-0 border-transparent border-2 text-red-400 hover:text-red-700 text-sm py-1 px-2 rounded" type="button" onClick={handleAddForm}>
                                Cancel
                            </button>
                        </div>
                    </form>
            }




        </div>
    )
}

export default CarsTableCard