import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Calendar from './pages/Calendar';
import Explore from './pages/Dashboard/Explore';
import Settings from './pages/Settings';
import DefaultLayout from './layout/DefaultLayout';
import LandingPage from './pages/LandingPage';
import Events from './pages/Events/Events';
import Gifts from './pages/Gifts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [logStatus, setLogStatus] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt');
    if (storedToken) {
      setLogStatus(true);
      navigate('/');
    }
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  return logStatus ? (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Explore Events | EventSync-Your Gateway to Seamless Event Management" />
              <Explore />
            </>
          }
        />
        <Route
          path="/events"
          element={
            <>
              <PageTitle title="Events | EventSync-Your Gateway to Seamless Event Management" />
              <Events />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | EventSync-Your Gateway to Seamless Event Management" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/gifts"
          element={
            <>
              <PageTitle title="Gifts | EventSync-Your Gateway to Seamless Event Management" />
              <Gifts />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | EventSync-Your Gateway to Seamless Event Management" />
              <Settings />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  ) : (
    <LandingPage />
  );
}

export default App;
