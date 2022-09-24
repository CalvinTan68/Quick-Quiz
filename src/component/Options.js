import React, {Component} from 'react';
import { Button } from 'react-bootstrap'

class Options extends Component {

  render(){
    
    return (
      <div className='opt'>
        <div className="btn">
          <Button type="button" variant="secondary" 
            name='option'
            value={decodeURIComponent(this.props.option)}
            id={this.props.option}
            onChange={()=>this.props.change(this.props.option)}
            onClick={()=>this.props.change(this.props.option)}>{decodeURIComponent(this.props.option)}</Button>
        </div>
      </div>
  )}
}

export default Options