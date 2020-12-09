import Link from 'next/link'

const Out = (props) => {
  return (
    <div>
      <h1>
        You're logged out.
      </h1>
      <p>See you next time!</p>
      <Link href={'/'}>
        <a>Home</a>
      </Link>
    </div>
  )
}

export default Out