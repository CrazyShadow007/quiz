import React from 'react'
import '../styles/style.css'
export default function FinalScore(prop) {
  //console.log(prop.scr)
  return (<>
  <div className="padding">
    <div className='scr'>
      Your Score:
      </div>
      <div className='scr1'>
        {prop.scr}/{prop.total}
      
    </div></div></>
  )
}
