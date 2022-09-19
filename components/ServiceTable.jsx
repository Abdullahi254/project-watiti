import React, { useState, useRef, useEffect } from 'react'
import { MdAdd, MdPrint } from 'react-icons/md'
import { useAuth } from '../src/contexts/AuthContext'
import { db } from '../src/firebase/firebase'
import { collection, query, doc, getDocs, where, Timestamp, onSnapshot, orderBy, limit, deleteDoc, addDoc } from 'firebase/firestore'
import ClipLoader from "react-spinners/ClipLoader";
import AlertComponent from './AlertComponent'
import { useReactToPrint } from 'react-to-print';

function ServiceTable({ numplate }) {

    const [showButton, setShowButton] = useState(true)
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [loading, setLoading] = useState(false)
    const [docList, setDocList] = useState([])
    const [total, setTotal] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [latest, setLatest] = useState(true)
    const [disabled, setDisabled] = useState(true)

    const inputRef = useRef()
    const commentRef = useRef()
    const componentRef = useRef();
    const date1Ref = useRef()
    const date2Ref = useRef()
    const inputDateRef = useRef()

    const { currentUser } = useAuth()

    const handleAddForm = () => {
        setShowButton(prev => !prev)
    }


    const addServiceExpenseHandler = async (e) => {
        e.preventDefault()
        setError()
        setSuccess()
        setLoading(true)
        try {
            const date = new Date(inputDateRef.current.value)
            const timestamp = Timestamp.fromDate(date)
            await addDoc(collection(db, `users/${currentUser.uid}/vehicles/${numplate}/service`), {
                amount: parseInt(inputRef.current.value),
                date: timestamp,
                comment: commentRef.current.value
            })
            setLoading(false)
            setSuccess('Successfully added service expense!')
            inputRef.current.value = ''
            date1Ref.current.value= ''
            commentRef.current.value = ''
            setDisabled(true)
        } catch (er) {
            setLoading(false)
            console.log(er)
            setError('Error adding service expense input!')
            inputRef.current.value = ''
            date1Ref.current.value= ''
            commentRef.current.value = ''
            setDisabled(true)
        }
    }

    const closeAlertHandler = () => {
        setError()
        setSuccess()
    }

    const onChangeHandler = () => {
        if (inputDateRef.current.value && inputRef.current.value && commentRef.current.value) {
            setDisabled(false)
        } else setDisabled(true)
    }


    const handleDel = async (name) => {
        setError()
        setSuccess()
        setLoading(true)
        try {
            const text = "Are you sure you want to delete entry"
            if (confirm(text) == true) {
                await deleteDoc(doc(db, `users/${currentUser.uid}/vehicles/${numplate}/service`, `${name}`))
                setLoading(false)
                setSuccess('Successfully deleted entry!')
            }
            else {
                setLoading(false)
                return
            }
        } catch (er) {
            setLoading(false)
            console.log(er)
            setError('Error deleting data!')
        }

    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleSearch = async () => {
        setError()
        try {
            if (date1Ref.current.value.length > 0 && date2Ref.current.value.length > 0) {
                setLatest(false)
                setDocList([])
                setLoading(true)
                const date1 = new Date(date1Ref.current.value)
                const date2 = new Date(date2Ref.current.value)
                date1.setHours(0, 0, 0, 0)
                date2.setHours(23, 59, 59)
                const q = query(collection(db, `users/${currentUser.uid}/vehicles/${numplate}/service`),
                    where("date", ">=", date1), where("date", "<=", date2))
                const querySnapshot = await getDocs(q)
                setLoading(false)
                setDocList(querySnapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                }))
                if (querySnapshot.docs.length > 1) {
                    const initial = 0
                    querySnapshot.docs.forEach((doc) => initial += doc.data().amount)
                    setTotal(initial)
                } else if (querySnapshot.docs.length === 1) {
                    setTotal(querySnapshot.docs[0].data().amount)
                } else {
                    setTotal(0)
                }
            }
            else {
                setRefresh(prev => !prev)
                setLatest(true)
            }
        } catch (er) {
            setLoading(false)
            setError("Error fetching data!")
        }


    }

    useEffect(() => {
        setLoading(true)
        setLatest(true)
        const q = query(collection(db, `users/${currentUser.uid}/vehicles/${numplate}/service`), orderBy("date", "desc"), limit(5));
        const unsub = onSnapshot(q, (querySnapshot) => {
            setLoading(false)
            setDocList(querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })

        return unsub
    }, [currentUser, numplate, refresh])

    useEffect(() => {
        setLoading(true)
        setLatest(true)
        const q = query(collection(db, `users/${currentUser.uid}/vehicles/${numplate}/service`), orderBy("date", "desc"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            setLoading(false)
            if (querySnapshot.docs.length > 1) {
                const initial = 0
                querySnapshot.docs.forEach((doc) => initial += doc.data().amount)
                setTotal(initial)
            } else if (querySnapshot.docs.length === 1) {
                setTotal(querySnapshot.docs[0].data().amount)
            } else {
                setTotal(0)
            }
        })

        return unsub
    }, [currentUser, numplate, refresh])


    return (
        <div className='my-2 w-full border-2 rounded-lg overflow-x-auto relative bg-white py-8 px-4'>
            <div ref={componentRef}>
                <h2 className='xs:text-2xl md:text-3xl mb-2 uppercase'>service expense ({numplate})</h2>
                <div className='px-2 w-full flex flex-col justify-center items-center py-1'>
                    <ClipLoader loading={loading} color='#52525b' size={50} />
                    <AlertComponent error={error} close={closeAlertHandler} />
                    <AlertComponent success={success} close={closeAlertHandler} />
                </div>
                <div className='w-full flex justify-end mb-2 px-6 py-4'>
                    <input type="date" ref={date1Ref} onChange={handleSearch} />
                    <span className="mx-4 text-gray-500 font-bold">to</span>
                    <input type="date" ref={date2Ref} onChange={handleSearch} />
                </div>

                <div className='w-full flex justify-start mt-2 px-6 py-4'>
                    {
                        latest ? <p className='italic text-sm underline'>Latest Expenses(5)</p> :
                            <p className='italic text-sm underline'>searched Results</p>
                    }

                </div>

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Amount(KSH)
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Date
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Comment
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            docList.map((val, index) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase">
                                            KSH {parseFloat(val.amount).toFixed(2)}
                                        </th>
                                        <td className="py-4 px-6">
                                            {
                                                val.date &&
                                                new Date(val.date.toDate().toString()).toDateString()
                                            }
                                        </td>
                                        <td className="py-4 px-6">
                                            {
                                                val.comment
                                            }
                                        </td>
                                        <td className="py-4 px-6">
                                            <button className='border-transparent text-red-400 hover:text-red-700 text-sm py-1 px-2 rounded' onClick={() => handleDel(val.id)} >Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="py-4 px-6 font-bold text-[16px] text-gray-900 whitespace-nowrap dark:text-white uppercase">
                                TOTAL {!latest && <span className='italic text-sm lowercase'>(searched)</span>}
                            </th>
                            <th scope="row" className="py-4 px-6 font-bold text-[16px] text-gray-900 whitespace-nowrap dark:text-white uppercase">
                                KSH {parseFloat(total).toFixed(2)}
                            </th>
                            <td className="py-4 px-6" />
                        </tr>

                    </tbody>
                </table>
                <div className='w-full border-2' />
            </div>

            {
                showButton ? <div className='w-full py-2 flex justify-around'>
                    <MdAdd className='text-3xl cursor-pointer text-gray-600' onClick={handleAddForm} />
                    <button className="hover:text-gray-900 hover:underline text-gray-600 px-4 rounded inline-flex items-center" onClick={handlePrint}>
                        <MdPrint />
                        <span>Print</span>
                    </button>
                </div> :
                    <form className="w-full max-w-[400px] mx-auto flex-wrap" onSubmit={addServiceExpenseHandler}>
                        <div className="flex border-b border-gray-500 py-2">
                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" placeholder="Amount (KSH)" ref={inputRef} onChange={onChangeHandler} />
                            <input name='date' className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="date" ref={inputDateRef} onChange={onChangeHandler} />
                        </div>
                        <div className='flex border-b border-gray-500 py-2'>
                            <textarea className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Comment" ref={commentRef} onChange={onChangeHandler} />
                            <button className=" self-center uppercase border-transparent disabled:bg-gray-300  flex-shrink-0 bg-gray-600 hover:bg-gray-900 border-gray-500  text-sm  text-white py-1 px-2 rounded" type="submit" disabled={disabled} >
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

export default ServiceTable