import styles from '../styles/Home.module.css'
import Text3D from './Text3d'


export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className='font-black text-6xl text-center'>THREEJS</h1>
      <div className='border border-cyan-500 border-2 max-w-6xl mx-auto flex justify-center items-center p-5 mt-10'>
        <Text3D />
      </div>
    </div>
  )
}
