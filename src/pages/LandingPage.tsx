import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Button, Navbar } from 'react-daisyui'
import { Link } from 'react-router-dom';

function LandingPage() {
  useGSAP(() => {
    gsap.fromTo(".Navbar", {
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
    <Navbar>
    <Navbar.Start>
      <a className="btn btn-ghost normal-case text-xl">EventSync</a>
    </Navbar.Start>
    <Navbar.Center className="hidden lg:flex">
    </Navbar.Center>
    <Navbar.End className='space-x-3'>
      <Button color='primary' className='text-white' tag="a">Login</Button>
      <Button color='primary' className='hover:text-white' variant='outline' tag="a">Sign Up</Button>
    </Navbar.End>
  </Navbar>

    <section>
      <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Revolutionize Your Campus  Events with EventSync</h1>
          <p className="py-6">
          <b>EventSync</b> your all-in-one event management platform  designed specifically for your university.<br/>
          Easily organize, promote, and manage campus events with   seamless integration and user-friendly features.<br/>
          From club meetings to large-scale conferences, EventSync  ensures your events are a resounding success.<br/>
          Join the EventSync community and transform the way you  experience university life.
          </p>
          <Link to="auth">
          <button className="btn btn-primary">Get Started</button></Link>
        </div>
      </div>
      </div>
    </section>
  </>
  )
}

export default LandingPage