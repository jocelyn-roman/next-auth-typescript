import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // const { data: { session, token }, status } = useSession();
  // const { data: session, status } = useSession()
  // console.log(session)
  const { data: session } = useSession()

  // session is always non-null inside this page, all the way down the React tree.
  return <pre>{JSON.stringify(session)}</pre>

  // // If no session exists, display access denied message
  // if (!session) {
  //   return (
  //     <main
  //     className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
  //   >
  //     <h1> Access Denied</h1>
  //   </main>
  //   )
  // }
  
  // return (
  //   <main
  //     className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
  //   >
  //     <h2>Server Session</h2>
  //     <pre>{JSON.stringify(session)}</pre>
  //     <h2>Client Call</h2>

  //   </main>
  // )
}

Home.auth = true
