import Link from 'next/link'
import { useUser } from '../utils/auth/useUser'
import getProjects from '../utils/getProjects'
import { Browser } from '../components/Browser'

//https://stackoverflow.com/questions/52284288/how-to-vertically-and-horizontally-center-a-component-in-react

const Index = () => {
  const { user, logout, saveUser } = useUser()
  if (!user) {
    return (
      <>

      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
        <h1>Welcome to StoryComp</h1>
        <p>StoryComp is a tool to help fiction writers create and 
        remember characters, locations, organizations, and more.</p>
        <p>
          {' '}
          <Link href={'/auth'}>
            <a>Sign in</a>
          </Link>
        </p>
      </div>
        
      </>
    )
  }
  saveUser()
  
  return (
    <div>
      <div>
        <p style={{fontSize: 10}}>Wlecome! Email: {user.email}</p>
        <p
          style={{
            fontSize: 14,
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={() => logout()}
        >
          Log out
        </p>
        <h1>StoryComp</h1>
        <Browser uid={user.id} />
      </div>
      <div>
      </div>
    </div>
  )
}

export default Index
