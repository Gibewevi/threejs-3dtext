import styles from '../styles/Home.module.css'
import Text3D from './Text3d'


export default function Home() {
  return (
    <div className={styles.container}>
      <div className='w-full bg-cyan-500 flex justify-center items-center p-5'>
         <h1 className='font-black text-6xl text-white'>THREEJS</h1>
      </div>
      <div className='border border-cyan-500 border-2 w-full mx-auto flex justify-center items-center'>
        <Text3D />
      </div>
    </div>
  )
}
