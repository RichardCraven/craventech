import React, {Component} from 'react';
import "../styles/main.scss"
import "../styles/papaya.scss"

class Papaya extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            evenPointer: 0,
            oddPointer: 1
        };
    }
    counter() {
        const that = this;
        function timer() {
          let countCopy = JSON.parse(JSON.stringify(that.state.count));
          countCopy = that.state.count + 1;
          if(countCopy % 2 === 0){
            that.setState({
                count: countCopy,
                evenPointer: countCopy
            });
          } else {
            that.setState({
                count: countCopy,
                oddPointer: countCopy
            });
          }
          if(that.state.count === that.props.attributes.length-1){
            clearInterval(interval)
          }
        }
        const interval = setInterval(timer, 650);
    }
    componentDidMount() {
    this.counter();
    }
    render() {
        console.log('papaya props: ', this.props)
        return (
            <div className="page-wrapper">
                <div className="center-container">
                    <div  className={
                        `papaya-container 
                        ${this.state.count === this.props.attributes.length-1 ? 'final' : ''}
                        ${this.state.count % 2 === 0 ? 'on' : ''}
                        `
                    }>
                        {this.props.attributes[this.state.evenPointer]}
                    </div>
                    <div  className={
                        `papaya-container2 
                        ${this.state.count === this.props.attributes.length-1 ? 'final' : ''}
                        ${this.state.count % 2 !== 0 ? 'on' : ''}
                        ${this.props.papayaout ? 'out' : ''}
                        `
                    }>
                        {this.props.attributes[this.state.oddPointer]}
                    </div>
                </div>
            </div>
        );
    }
}

export default Papaya;