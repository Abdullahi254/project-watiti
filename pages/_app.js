import '../styles/globals.css'
import { AuthProvider } from '../src/contexts/AuthContext'
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <AuthProvider>
      {
        (router.pathname === '/login' || router.pathname === '/signup') ?
          <>
            <Navbar />
            <Component {...pageProps} />
          </> :
          <ProtectedRoute>
            <Navbar />
            <Component {...pageProps} />
          </ProtectedRoute>
      }
    </AuthProvider>
  )
}

export default MyApp
