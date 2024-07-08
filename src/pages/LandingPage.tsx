import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Button, Hero, Navbar } from 'react-daisyui'
import { Link, Routes, Route, Router } from 'react-router-dom';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import LandingHero from '../components/Landing/LandingHero';
import PageTitle from '../components/PageTitle';

function LandingPage() {
  useGSAP(() => {
    gsap.fromTo("#navbar", {
      y: -10,
      opacity: 0,
    }, {
      duration: 2,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    });
  
    gsap.fromTo(".hero", {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      duration: 1.5,
      delay: 1,
      ease: "power3.out",
      stagger: 0.3,
    });
  }, []);
  
  return (
    <>
    <Navbar id='navbar'>
    <Navbar.Start>
      <Link to={"/"} className="btn btn-ghost normal-case text-xl">EventSync</Link>
    </Navbar.Start>
    <Navbar.Center className="hidden lg:flex">
    </Navbar.Center>
    <Navbar.End className='space-x-3'>
      <Link to={"auth/signin"}><Button color='primary' className='text-white' tag="a">Login</Button></Link>
      <Link to={"auth/signup"}><Button color='primary' className='hover:text-white' variant='outline' tag="a">Sign Up</Button></Link>
    </Navbar.End>
  </Navbar>

    <section>
      <Routes>
        <Route index element={<LandingHero/>} />
        <Route path="/auth/signin" element={
          <>
          <PageTitle title="Login | EventSync-Your Gateway to Seamless Event Management" />
          <SignIn />
          </>
          } />
        <Route path="/auth/signup" element={
          <>
          <PageTitle title="Register | EventSync-Your Gateway to Seamless Event Management" />
          <SignUp />
          </>} />
      </Routes>
    </section>
  </>
  )
}

export default LandingPage