import Head from 'next/head'
import useScreenOrientation from '../hooks/useScreenOrientation.js';

export default function Home() {
  const screenOrientation = useScreenOrientation();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">

        <p className="p-6 border rounded-3xl bg-black text-white  w-64 h-96" style={{ transform: `rotateZ(${-screenOrientation.a}deg) rotateX(${-screenOrientation.b}deg) rotateY(${screenOrientation.g}deg)` }}>
          hi
        </p>

      </main>
    </div>
  )
}
