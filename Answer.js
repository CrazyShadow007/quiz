import React,{useState} from 'react'
import '../styles/style.css'
export default function Answer(prop) {


    if(prop.check=='right'){
        return (
            <div className="modal-body">
            <div className="col-xs-3 5"> </div>
            <div className="quiz" id="quiz" data-toggle="buttons"> 
            <div className='right'>
            <p className='ans'>Right Answer:<br/></p>
                {prop.answer}{` `}:<p className='ansopt'>
              
              "{prop.description}"</p>
                
            </div></div></div>
          )
    }

    else{
        return (
            <div className="modal-body">
            <div className="col-xs-3 5"> </div>
            <div className="quiz" id="quiz" data-toggle="buttons"> 
            <div className='wrong'>
            <p className='ans'>Wrong Answer:<br/></p>

                  {prop.answer}{` `}:
                  <p className='ansopt'>
                    "{prop.description}"
                  </p>
                
               </div>
              </div>
            </div>
          )
    }
  
}
