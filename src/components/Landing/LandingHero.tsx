import React from 'react'
import daisyui from 'daisyui'
import { Link } from 'react-router-dom'


function LandingHero() {
  return (
    <>
    <section>
    <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">Revolutionize Your Campus Events with EventSync</h1>
                <p className="py-6">
                  <b>EventSync</b> your all-in-one event management platform designed specifically for your university.<br/>
                  Easily organize, promote, and manage campus events with seamless integration and user-friendly features.<br/>
                  From club meetings to large-scale conferences, EventSync ensures your events are a resounding success.<br/>
                  Join the EventSync community and transform the way you experience university life.
                </p>
                <Link to="auth/signin">
                  <button className="btn btn-primary">Get Started</button>
                </Link>
              </div>
            </div>
          </div>
    </section>
    </>
  )
}

export default LandingHero