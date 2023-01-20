import { createContext, useContext, useState, useEffect ,useMemo } from "react"
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { useRouter } from "next/router"

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(null)
  const router = useRouter()
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => onAuthStateChanged(auth, (user) => {
    if(user) {
      setUser(user)
      setLoading(false)
    } else {
      setUser(null)
      setLoading(true)
      router.push('/login')
    }

    setInitialLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [auth])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const signUp = async (email: string, password: string) => {
    setLoading(true)

    await createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      setUser(userCredentials.user)
      router.push("/")
      setLoading(false)
    }).catch((error) => alert(error.message)).finally(() => setLoading(false))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const signIn = async (email: string, password: string) => {
    setLoading(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push("/")
        setLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)

    signOut(auth).then(() => {
      setUser(null)
    })
    .catch((error) => alert(error.message))
    .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(() => ({
    user, signUp, signIn, loading, logout, error
  }), [user, signUp, signIn, loading, error])

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}