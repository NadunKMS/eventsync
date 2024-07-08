import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Explore from './pages/Dashboard/Explore';
import Settings from './pages/Settings';
import DefaultLayout from './layout/DefaultLayout';
import LandingPage from './pages/LandingPage';
import Events from './pages/Events/Events';
import Gifts from './pages/Gifts';

const API_BASE_URL = "http://localhost:8000/";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [logStatus, setLogStatus] = useState(false)
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}Model/UserSession.php`);
        setLogStatus(response.data.loggedin);
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

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
