import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from './partials/Navbar';
import Footer from './partials/Footer';
import { setUser } from "./state_manager/userSlice";
import { getJwtFromCookie } from '../authentication'


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getJwtFromCookie();
    if (token) {
      dispatch(setUser({ token }));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
}

export default App;
