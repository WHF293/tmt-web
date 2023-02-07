import Token from '@/utils/Token'
import { ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface WithRouteProps {
  children: ReactNode
}

export default function WithRoute(props: WithRouteProps) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (Token.get() === null) {
      navigate('/login')
    }
    // console.log('location:', location);
  }, [location])

  return <>{props.children}</>
}
