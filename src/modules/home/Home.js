import React from 'react';
import {
    Section1,
    Section3,
    Section4,
    Section6,
    Pricing,
} from './sections';
import MenuChangeStore from '../../menu';


export default class Home extends React.Component {
    componentWillMount() {
        this.items = [
            {
                key: 'sign-in',
                name: 'sign-in',
                buttonTitle: 'SIGN IN'
            }, {
                key: 'pricing',
                name: 'pricing',
                buttonTitle: 'PRICING'
            }, {
                key: 'contact-us',
                name: 'contact-us',
                buttonTitle: 'CONTACT US'
            }
        ];
        MenuChangeStore.changeMenu(this.items);
    }

    render() {
        return (
            <div>
                <Section1/>
                <Section3/>
                <Section4/>
                <Pricing/>
                <Section6/>
            </div>
        );
    }
}