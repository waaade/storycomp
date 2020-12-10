// import useSWR from 'swr'
import Link from 'next/link'
import { useUser } from '../utils/auth/useUser'
import getProjects from '../utils/getProjects'
import { Browser } from '../components/Browser'

// const fetcher = (url, token) =>
//   fetch(url, {
//     method: 'GET',
//     headers: new Headers({ 'Content-Type': 'application/json', token }),
//     credentials: 'same-origin',
//   }).then((res) => res.json())

const Index = () => {
  const { user, logout, saveUser } = useUser()
  // const { data, error } = useSWR(
  //   user ? ['/api/getFood', user.token] : null,
  //   fetcher
  // )
  if (!user) {
    return (
      <>
        <h1>Welcome to StoryComp</h1>
        <p>StoryComp is a tool to help fiction writers create and 
        remember characters, locations, organizations, and more.</p>
        <p>
          {' '}
          <Link href={'/auth'}>
            <a>Sign in</a>
          </Link>
        </p>
      </>
    )
  }
  saveUser()
  // const projects = getProjects(user.id)
  // .then(() => console.log("Got projects."));
  return (
    <div>
      <div>
        <p>You're signed in. Email: {user.email}</p>
        <p
          style={{
            display: 'inline-block',
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={() => logout()}
        >
          Log out
        </p>
        <Browser uid={user.id} />
      </div>
      <div>
        <Link href={'/example'}>
          <a>Another example page</a>
        </Link>
      </div>
      {/* {error && <div>Failed to fetch food!</div>}
      {data && !error ? (
        <div>Your favorite food is {data.food}.</div>
      ) : (
        <div>Loading...</div>
      )} */}
    </div>
  )
}

export default Index
