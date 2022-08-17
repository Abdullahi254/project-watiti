import React, { useEffect } from 'react'
import { useAuth } from '../src/contexts/AuthContext'
import { useRouter } from 'next/router'

function ProtectedRoute({ children }) {
    const { currentUser } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!currentUser) {
            router.push('/login')
        }
    }, [currentUser, router])

    return (
        <>
            {currentUser && children}
        </>
    )
}

export default ProtectedRoute