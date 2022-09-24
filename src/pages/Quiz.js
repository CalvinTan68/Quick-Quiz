import React, { Component } from 'react'
import Options from '../component/Options'
import { Card } from 'react-bootstrap'

class Quiz extends Component{
  constructor(){
    super();
    this.state = {
      timer: 15,
      qNumber: 1,
      questions: {},
      score: 0,
      selectedAnswer: '',
      evaluate: false
    }
  }

  componentDidMount(){
    this.setState({
      questions: this.props.questions,
    })
    this.timer()
  }

  timer(){
      setInterval(() => {
        if(this.state.timer === false) return
        if(this.state.timer <= 1){
          this.setState({
            evaluate: 'spin',
        })
        }
        if(this.state.timer === 0){
          this.setState({
            evaluate: 'no time',
            selectedAnswer: false
        })
        } else {
          this.setState({
            timer: this.state.timer - 1
          })
        }
      }, 1000)
  }

  change(a){
    this.setState({selectedAnswer: a})
  }

  evaluate(){
    setTimeout(()=>{
      this.setState({evaluate: 'spin', timer: false})
    }, 0)

    setTimeout(()=>{
      if (this.state.selectedAnswer === this.state.questions[this.state.qNumber - 1].correctAns){
        this.setState({
          evaluate: 'correct',
          score: this.state.score + 1,
        })
        
      } else if (this.state.selectedAnswer !== this.state.questions[this.state.qNumber - 1].correctAns){
        this.setState({
          evaluate: 'wrong'
        })
      }
    }, 0)

  }

  next(){
    if(this.state.qNumber === 10){
      this.state.score >= 6 ? this.props.finished('pass') : this.props.finished('fail')
    }
    setTimeout(()=>{
      this.setState({evaluate: 'spin', timer: false})
    }, 150)
    setTimeout(()=>{
      this.setState({
        timer: 15,
        qNumber: this.state.qNumber + 1,
        evaluate: false,
        selectedAnswer: ''
      })
    },300)
  }


  click(){
    if(this.state.evaluate === false){
      this.evaluate()
    } else {
      this.evaluate()
    }
  }



  render(){
    let question;
    let options;
    let answer;
    let opt;
                          
    if(this.state.questions.length > 1){

      question = this.state.questions[this.state.qNumber - 1].question
      answer = this.state.questions[this.state.qNumber - 1].correctAns
      options = this.state.questions[this.state.qNumber -1].options
      opt = options.map((ans, i) => {
        return <Options 
                  key={i}
                  option={ans}
                  answer={answer}
                  change={(a)=>this.change(a)} />
      })
    }
    if(this.state.evaluate === 'correct'){
        this.next()
    }
    if(this.state.evaluate === 'wrong'){
        this.next()
    }
    if(this.state.evaluate === 'no time'){
      this.next()
    }


    
    return (
    <>
      <Card className="play">
        <Card.Header>
          <p>Time left: {this.state.timer === false ? 0 : this.state.timer}</p>
          <p>Correct: {this.state.score}</p>
        </Card.Header>

        <div className="question">
          <h1>Question {this.state.qNumber} / 10</h1>
          <h1>{decodeURIComponent(question)}</h1>
        </div>


        <div className='options'
          onClick={()=>{
            if(this.state.evaluate === false){
              this.evaluate()
            } else {
              this.next()
            }
          }}>
          {opt}
        </div>
      </Card>
    </>
  )}
}
export default Quiz