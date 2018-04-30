import React, { Component } from 'react';
import { apiEndpoints } from '../../ApiEndpoints';
import { Grid, Label, Image } from 'semantic-ui-react';


export class PreviousExpenses extends Component {

    state = {
        loading: true,
        previousExpenses: []
    };


    componentDidMount = async () => {
        try {
            const resRaw = await fetch(apiEndpoints.previousExpenses, {
                method: 'GET',
                headers: {
                    'auth_token': this.props.auth_token,
                    'Content-Type': 'application/json'
                },
            });
            if (resRaw.status !== 200) {
                throw 'error'
            }
            const res = await resRaw.json();
            this.setState({
                previousExpenses: res.response.payment_details
            })
        } catch (e) {
            console.log(e)
        }
    };

    // componentDidMount() {
    //     fetch(apiEndpoints.previousExpenses, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': '*/*',
    //             'Content-Type': 'application/json',
    //             'auth_token': this.props.auth_token,
    //         }
    //     })
    //         .then(async function (res) {
    //             const response = await res.json();
    //             if (response.meta && response.meta.code === 200) {
    //                 this.setState({ previousExpenses: response.response.payment_details });
    //                 this.forceUpdate();
    //             }
    //         }, function (error) {
    //             console.log(error);
    //         }).catch(function (error) { });
    // }

    shouldComponentUpdate() {
        return true;
    }


    render() {
        return (

            <Grid>
                {this.state.previousExpenses && this.state.previousExpenses.map((p, i) => {
                  return(  <Grid.Row width={10} key={i} className='session-row'>
                        <Grid.Column>
                            <div style={{ float: 'left' }}>
                                <h4 className="userName"><div className="ui green circular label"></div> {p.sender.name}</h4>
                                <Label size='small' >{p.receiver.name}</Label>
                                <Label size='small' >{p.payment_type}</Label>
                                <Label size='small' >{p.payment_status}</Label>
                                <Label size='small' >{p.amount}</Label>
                            </div>
                        </Grid.Column>
                    </Grid.Row>)
                })}
            </Grid>

        );
    }

}