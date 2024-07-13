import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Button, Hero, Navbar } from 'react-daisyui';
import { Link, Routes, Route, Router } from 'react-router-dom';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import LandingHero from '../components/Landing/LandingHero';
import PageTitle from '../components/PageTitle';

function LandingPage() {
  useGSAP(() => {
    gsap.fromTo(
      '.hero',
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: 'power3.out',
        stagger: 0.3,
      },
    );
  }, []);

  return (
    <>
      <div data-theme="light">
        <Navbar id="navbar">
          <Navbar.Start>
            <Link to={'/'} className="btn btn-ghost normal-case text-xl">
              EventSync
            </Link>
          </Navbar.Start>
          <Navbar.Center className="hidden lg:flex"></Navbar.Center>
          <Navbar.End className="space-x-3">
            <Link to={'auth/signin'}>
              <Button color="primary" className="text-white">
                Login
              </Button>
            </Link>
            <Link to={'auth/signup'}>
              <Button
                color="primary"
                className="hover:text-white"
                variant="outline"
              >
                Sign Up
              </Button>
            </Link>
          </Navbar.End>
        </Navbar>

        <section className="hero">
          <Routes>
            <Route index element={<LandingHero />} />
            <Route
              path="/auth/signin"
              element={
                <>
                  <PageTitle title="Login | EventSync-Your Gateway to Seamless Event Management" />
                  <SignIn />
                </>
              }
            />
            <Route
              path="/auth/signup"
              element={
                <>
                  <PageTitle title="Register | EventSync-Your Gateway to Seamless Event Management" />
                  <SignUp />
                </>
              }
            />
          </Routes>
        </section>
      </div>
    </>
  );
}

export default LandingPage;
