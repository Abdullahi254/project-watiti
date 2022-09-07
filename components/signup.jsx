import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { useAuth } from '../src/contexts/AuthContext'
import { useRouter } from 'next/router'
import ClipLoader from "react-spinners/ClipLoader";

function SignUp() {
  const { signUp } = useAuth()
  const router = useRouter()

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const emailRef = useRef()
  const pass1Ref = useRef()
  const pass2Ref = useRef()


  const handlePasswordInputChange = () => {
    if (pass2Ref.current.value !== pass1Ref.current.value) {
      setPasswordError(true)
    }
    else {
      setPasswordError(false)
    }
  }

  const emailRefCheck = () => {
    if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      .test(emailRef.current.value)) {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    setError()
    if (!emailError && !passwordError) {

      signUp(emailRef.current.value, pass1Ref.current.value).then(resp => {
        setLoading(false)
        console.log('signed up successfully')
        setSuccess("Account created successfully")
        router.push("/")
      }).catch(er => {
        setLoading(false)
        setError(`Error signing up! ${er.code}`)
        console.log(er)
      })
    } else {
      setLoading(false)
      emailRef.current.focus()
    }


  };

  return (
    <div className=' h-screen w-full pt-12'>
      <div className=' flex w-full mt-10 justify-center flex-col items-center'>
        <div className='px-2 w-full flex flex-col justify-center items-center py-4'>
          <ClipLoader loading={loading} color='#52525b' size={50} />
          {
            error && <div className="flex p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
              <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Error alert!</span> {error}
              </div>
            </div>
          }
          {
            success && <div className="flex p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
              <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Success alert!</span> {success}
              </div>
            </div>
          }

        </div>
      </div>
      <div className='rounded-md max-w-xl mx-auto'>
        <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email" style={{ border: emailError && 'solid red 1px' }} ref={emailRef} onChange={emailRefCheck} />
            {emailError && <p className="text-xs italic p-1" style={{ color: 'red' }}>Incorrect email.</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" style={{ border: passwordError && 'solid red 1px' }} ref={pass1Ref} onChange={handlePasswordInputChange} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
              Confirm Password
            </label>
            <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password2" type="password" placeholder="******************" style={{ border: passwordError && 'solid red 1px' }} ref={pass2Ref} onChange={handlePasswordInputChange} />
            {passwordError && <p className="text-xs italic" style={{ color: 'red' }}>Passwords not matching.</p>}

          </div>
          <div className="w-full flex items-center justify-between px-4">
            <button type="submit" className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign Up
            </button>
            <span className=' text-blue-600 underline'>
              <Link href="/login">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp