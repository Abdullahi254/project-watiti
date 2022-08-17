import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/assets/logo.png'
import { AiOutlineMenu, AiOutlineClose, AiOutlineMail } from 'react-icons/ai'
import { FaLinkedinIn, FaGithub, } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useAuth } from '../src/contexts/AuthContext'
import { db } from '../src/firebase/firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'

function Navbar() {

  const { currentUser } = useAuth()

  const router = useRouter()

  const [sideNav, setsideNav] = useState(false)
  const [shadow, setShadow] = useState(false)
  const [docList, setDocList] = useState([])

  const handleNav = () => {
    setsideNav(prev => !prev)
  }

  useEffect(() => {
    const q = query(collection(db, `users/${currentUser.uid}/vehicles`));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setDocList(querySnapshot.docs.map(doc => doc.data()))
    })

    return unsub
  }, [currentUser])

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true)
      } else {
        setShadow(false)
      }
    }
    window.addEventListener('scroll', handleShadow)
  }, [])
  return (
    <div className={shadow ? 'fixed w-full h-20 shadow-xl z-[100] bg-white' : ' bg-gray-300 fixed w-full h-20 z-[100] '}>
      <div className='flex justify-between items-center w-full h-full px-2 md:px-4 lg:px-8 2xl:px-16'>
        <Link href="/">
          <div className='cursor-pointer h-full flex flex-col justify-center '>
            <Image src={logo} alt="Abdullah logo" width="100" />
          </div>
        </Link>
        <div>
          <ul className='hidden md:flex'>
            <Link href="/">
              <li className='ml-10 text-sm uppercase hover:border-b-2 border-gray-600'
                style={{
                  borderBottom: router.pathname == "/" && "solid 2px #4b5563"
                }}>
                Home
              </li>
            </Link>
            {docList.length > 0 && docList.map((val, index) => {
              return (
                <Link href={`${val.name}`} key={index}>
                  <li className='ml-10 text-sm uppercase hover:border-b-2 border-gray-600'>{val.name}</li>
                </Link>
              )
            })}
            <Link href="/#contact">
              <li className='ml-10 text-sm uppercase hover:border-b-2 border-gray-600'>Contact</li>
            </Link>
          </ul>
          <div className='md:hidden cursor-pointer' onClick={handleNav}>
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>
      {/* side drawer below */}
      <div className={sideNav ? 'fixed left-0 top-0 w-full h-screen bg-black/70 md:hidden' : ''} >
        <div
          className={sideNav ? 'fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen overflow-y-auto bg-[#ecf0f3] p-10 px-4  ease-in duration-500 flex flex-col justify-between' :
            'fixed left-[-150%] top-0 ease-in duration-500'}
        >
          <div>
            <div className='flex justify-between w-full items-center'>
              <div>
                <Image src={logo} alt="My logo" width={90} height={70} className='cursor-pointer' />
              </div>
              <div className='cursor-pointer rounded-full shadow-lg shadow-gray-400 p-3'>
                <AiOutlineClose size={20} onClick={handleNav} />
              </div>
            </div>
            <div className='border-b-2  border-gray-400 my-4 text-center'>
              <p className='w-[85%] md:w-[90%] py-4'>Where all your contruction experts are.</p>
            </div>
            <div className='py-4 flex flex-col'>
              <ul className='uppercase'>
                <Link href="/">
                  <li className='py-4 text-sm hover:border-b-2 border-gray-600' style={{
                    borderBottom: router.pathname == "/" && "solid 2px #4b5563"
                  }}
                    onClick={handleNav}>
                    Home
                  </li>
                </Link>
                {
                  docList.length > 0 && docList.map((val, index) => {
                    return (
                      <Link href={`${val.name}`} key={index}>
                        <li className='py-4 text-sm hover:border-b-2 border-gray-600' onClick={handleNav}>{val.name}</li>
                      </Link>
                    )
                  })
                }
              </ul>
            </div>
          </div>

          <div className='border-b-2  border-gray-400 text-center w-full'>
            <p className='mb-5 uppercase tracking-widest text-gray-800'>Let&apos;s Connnect</p>
            <div className='flex justify-evenly w-full mb-4'>
              <Link href="https://www.linkedin.com/in/abdullahi-mohamud-aa04291b6/">
                <div className='rounded-full shadow-lg shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
                  <FaLinkedinIn />
                </div>
              </Link>
              <Link href="https://github.com/Abdullahi254">
                <div className='rounded-full shadow-lg shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
                  <FaGithub />
                </div>
              </Link>
              <Link href="/#contact">
                <div className='rounded-full shadow-lg shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300' onClick={handleNav}>
                  <AiOutlineMail />
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar