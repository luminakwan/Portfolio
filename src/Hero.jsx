import React from 'react';
import './Hero.css';
import ResilientImage from './ResilientImage';

export default function Hero() {
  return (
    <section className="hero hero--layered" aria-labelledby="hero-name">
      <div className="hero-top"><small>lumina</small><small>DESIGNER · ILLUSTRATOR · IP CREATOR</small></div>
      <div className="hero-title">
        <h1 id="hero-name"><em>KWAN SHUFEN</em></h1>
        <ResilientImage className="portrait-image" src={`${import.meta.env.BASE_URL}thumbnails/portrait.webp`} alt="关淑芬的个人头像" width="1254" height="1254" fetchPriority="high" loading="eager" />
      </div>
      <div className="hero-bottom"><p>A DESIGNER COMMITTED TO CREATING STRIKING AND UNFORGETTABLE WORKS.</p></div>
    </section>
  );
}
