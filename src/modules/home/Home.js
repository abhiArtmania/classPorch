import React from 'react';
import {
    Section1,
    Section3,
    Section4,
    Section6,
    Tutoring,
    Pricing,
} from './sections';
import MenuChangeStore from '../../menu';
import {history} from '../../redux/store';

export default class Home extends React.Component {
    componentWillMount() {
        // if (localStorage.getItem('token')) {
        //     const store = JSON.parse(localStorage.getItem('store'));
        //     if (store.auth.role === "tutor") {
        //         history.push('/profile/tutor')
        //     } else {
        //         history.push('/profile/student')
        //     }
        // } else {
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
        // }
    }

    render() {
        return (
            <div>
                <Section1/>
                <Tutoring/>
                <Section3/>
                <Section4/>
                <Pricing/>
                <Section6/>
            </div>
        );
    }
}