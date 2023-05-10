import './styles/App.css';
import React,{useState,useEffect,useMemo} from 'react';
import FinalScore from './components/FinalScore'
import Answer from './components/Answer';
const questionDisplay=5;
function App() {
  
  //variables
  const randState = Math.round(Math.random() * (9 - 0) + 0); 

  //State Hooks
  const [score,setScore]=useState(0)
  const [count, setCount]=useState(1)
  const [value,setValue]=useState()
  const [arr,setArr]=useState([randState])
  const [choice,setChoice]=useState(null)
  const [quizData,setQuizData]=useState(null)
  const [opt,setOpt]=useState()
  const [rand1,setRand1]=useState(randState)
  const [resp,setResp]=useState(1)

  //Callback functions

  //api
  const api=async()=>{
    const res= await fetch("http://localhost:8000/",{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    const resJson=await res.json()
    if(resJson){
      console.log(resJson)
      setResp(resJson)
      rd(resJson)
    }
}

  //Handles Next Button
  const handleNext=(resJson)=>{
    //console.log(resJson)
    api()
    setChoice(null)
    setValue(null)
  }
  
  //returns random digit from 0 to 9
  const randm=()=>{
       let rand;
      let set=false;
      if(count<=questionDisplay){
        console.log(resp.id)
        rand = resp.id
    }
    
    //console.log(rand)
    for(let i=0;i<questionDisplay;i++){
      if(rand==arr[i]){
        set=true
      }
  }
  if(set==true){
    api()
  }
  else{
    
      setArr([...arr,rand]);
      //console.log(arr)
      setRand1(rand);
      //console.log(rand1)
    
  }}

  //rd: Assigns random data
  const rd=(resJson)=>{
      
    if(count<=questionDisplay){
      randm()
      setCount(count+1);
      //console.log(count);
      //console.log(rand1)
      //console.log(resJson.data[rand1])
      setQuizData(resJson);
    }
    if(count==questionDisplay+1){
      setCount(questionDisplay+3)
    }
  }
    
  //handles submit
  const handleSubmit=()=>{
    if(value==null){
      alert("select one field")
    }
    else{
      if(quizData.answer=='optA'){
        setOpt('A')
      }
      if(quizData.answer=='optB'){
        setOpt('B')
      }
      if(quizData.answer=='optC'){
        setOpt('C')
      }
      if(quizData.answer=='optD'){
        setOpt('D')
      }
      if(value==quizData.answer){
        setChoice('right')
        setScore(score+1)
      }
      else{
        setChoice('wrong')
      }}
  }
  
  //handles selected option 
  const handleClick=(e)=>{
    setValue(e.target.value)
  }

  //handles reset button
  async function handleReset(){
    const randState = Math.round(Math.random() * (9 - 0) + 0);
    setScore(0)
    setCount(2)
    setValue()
    setArr([randState])
    setChoice(null)
    //setQuizData(null)
    setOpt()
    setRand1(randState)
    api()
    console.log('hello world')
  }
    
  //useMemo hook
  //useMemo(()=>api(),[quizData])

  //useEffect hook
  useEffect(()=>{
       setCount(0)
       api()
   },[])


  //rendering conditions
  if(count<=questionDisplay+1){

    return (<>
      <div className="heading">React Quiz</div>
        {quizData?<div className="container-fluid">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Q. {quizData.question}</h3>
                </div>
                <div className="modal-body">
                    <div className="col-xs-3 5"> </div>
                    {choice?<><Answer answer={opt} description={quizData.description} check={choice}>
                      </Answer>
                      <div className="btn btn-info bt" onClick={handleNext}>Next</div>
                      </>:
                      <>
                      <div className="quiz" id="quiz" data-toggle="buttons"> 
                        <label onClick={handleClick} className="element-animation1 btn btn-lg btn-danger btn-block">
                          <span className="btn-label">
                              <i className="glyphicon glyphicon-chevron-right"></i>
                          </span> 
                          <input type="radio" name="q_answer" value="optA"/>
                          {quizData.options.optA}
                        </label> 
                        <label onClick={handleClick} className="element-animation2 btn btn-lg btn-danger btn-block">
                          <span className="btn-label">
                              <i className="glyphicon glyphicon-chevron-right"></i>
                          </span> 
                            <input type="radio" name="q_answer" value="optB"/> 
                            {quizData.options.optB}</label> 
                        <label onClick={handleClick} className="element-animation3 btn btn-lg btn-danger btn-block">
                          <span className="btn-label">
                              <i className="glyphicon glyphicon-chevron-right"></i>
                          </span> 
                          <input type="radio" name="q_answer" value="optC"/> 
                          {quizData.options.optC}
                        </label> 
                        <label onClick={handleClick} className="element-animation4 btn btn-lg btn-danger btn-block">
                          <span className="btn-label">
                              <i className="glyphicon glyphicon-chevron-right"></i>
                          </span>
                          <input type="radio" name="q_answer" value="optD"/>
                          {quizData.options.optD} 
                        </label> 
                      </div>
                    <div className="btn btn-success bt" onClick={handleSubmit}>Submit</div>
                  </>
                  }
                    
                    </div>
            </div>
        </div>
    </div>:<div className="loading">Loading...</div>}
        </>
      );

  }

  else{
    return(
  <>
    <div className="heading">React Quiz</div>
    <div className="container-fluid">
    <div className="modal-dialog">
        <div className="modal-content">     
          <FinalScore total={questionDisplay} scr={score}></FinalScore> 
          <button className="btn btn-info bt" onClick={handleReset}>Reset</button>
        </div>
        
      </div>
      
    </div>
  </>);

  }
  
}

export default App;
