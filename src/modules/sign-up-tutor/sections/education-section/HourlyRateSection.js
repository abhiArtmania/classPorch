import React from 'react';
import {Grid, Input, Label} from 'semantic-ui-react';
import './styles.css';

export default class HourlyRateSection extends React.Component {
    constructor(){
        super();
        this.state = {
            perMin: 4.58,
            perHour: 25
        }
        this.calcPerMin = this.calcPerMin.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    calcPerMin() {
        return (this.props.data.rate / 60)
    }
    onChange(e,{name,value}) {
        if(value> 60 || value < 25) return
        this.setState({perHour: value});
        this.props.onChange(e,{name,value})
    }
    render() {
        return (
            <Grid.Row centered>
                <Grid.Column width={8} textAlign='left'>
                  <span style={{display:"block"}}>Hourly Rate</span>
                    <Input
                        name='rate'
                        placeholder='0.00'
                        labelPosition='right'
                        type='number'
                        required
                        value={this.props.data.rate}
                        onChange={this.onChange}>
                        <Label basic style={{color:"olive"}}>$</Label>
                        <input/>
                        <Label>per hour</Label>
                    </Input>
                    <span style={{marginLeft: '30px',fontSize:'18px'}}>
                       $ {this.calcPerMin().toFixed(2)} per min
                    </span>
                  </Grid.Column>
            </Grid.Row>
        );
    }
}
