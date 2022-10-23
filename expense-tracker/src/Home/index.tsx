import {getAuth,signOut} from 'firebase/auth' 
const Home = () => {
  const auth = getAuth();
  return (
    <div>
      <div>Procted by Firebase</div>
      <button onClick={()=>signOut(auth)}>Sign out</button>
    </div>
  )
}

export default Home;