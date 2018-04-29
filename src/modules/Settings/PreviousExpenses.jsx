import React, { Component } from 'react';
import { apiEndpoints } from '../../ApiEndpoints';



export class PreviousExpenses extends Component {

    state = {
        loading: true
    };

    componentDidMount() {
        fetch(apiEndpoints.previousExpenses, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);

            }).catch(function (error) { });
    }


    render() {
        return (

            <div />

        );
    }

}