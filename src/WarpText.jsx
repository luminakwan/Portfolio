import React,{useRef,useState}from'react';
export default function WarpText({text,className=''}){const ref=useRef(null),[p,setP]=useState({x:0,y:0});return <div ref={ref} className={'warp-text '+className} onPointerMove={e=>{const r=ref.current.getBoundingClientRect();setP({x:(e.clientX-r.left)/r.width-.5,y:(e.clientY-r.top)/r.height-.5})}} onPointerLeave={()=>setP({x:0,y:0})}><span style={{transform:`perspective(500px) rotateY(${p.x*8}deg) rotateX(${-p.y*8}deg) skew(${p.x*2}deg)`}}>{text}</span></div>}

