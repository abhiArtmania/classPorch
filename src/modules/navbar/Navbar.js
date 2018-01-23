import React, {Component} from 'react';
import logoDark from '../../assets/logo_dark.png';
import {Menu} from 'semantic-ui-react';
import {history} from '../../redux/store';
import './styles.css';
import {Dropdown, Image, Input, Button} from 'semantic-ui-react';
import faker from 'faker'
import {connect} from 'react-redux';
import {logoutUserRequested, searchRequested, setPresentProfile, toggleSearchMode} from '../../redux/actions';
import $ from "jquery";


class Navbar extends Component {

    state = {
        activeItem: '',
        searchWord: ''
    };

    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.capitalize = this.capitalize.bind(this);
        this.getLoggedInMenuItems = this.getLoggedInMenuItems.bind(this);
        this.getItems = this.getItems.bind(this);
        this.onSearchWordChange = this.onSearchWordChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.isShowSearchBar = this.isShowSearchBar.bind(this);
    }

    componentWillMount() {
        this.setState({activeItem: ''})
    }


    handleItemClick = (e, {name}) => {
        console.log(history);
        this.setState({activeItem: name});
        const {role, userId} = this.props;

        switch (name) {
            case 'messages':
                history.push('/chats');
                return;
            case 'log-in':
                this.scrollTo();
                return history.push('/login');
            case 'sign-up':
                this.scrollTo();
                return history.push('/sign-up');
            case 'logout':
                this.props.logoutUserRequested();
                this.setState({activeItem: ''});
                return history.replace('/login');
            case 'profile':
                this.setState({activeItem: 'profile'});
                this.props.setPresentProfile({userId});
                this.scrollTo();
                return role === 'tutor' ? history.push('/profile/tutor') : history.push('/profile/student');
            case 'add-credits':
                return history.push('/add-credits');
            case 'request-money':
                return history.push('/request-money');
            case 'link-account':
                return history.push('/link-account');
            case 'previous-expenses':
                return history.push('/previous-expenses');
            case 'search-tutors':
                this.scrollTo();
                this.setState({activeItem: 'search-tutors'});
                return history.push('/login');
            case 'i-want':
                this.scrollTo();
                return history.push('/i-want');
            case 'pricing':
                this.setState({activeItem: 'pricing'});
                history.push('/');
                return this.scrollTo('pricing');
            case 'how-works':
                this.setState({activeItem: 'how-works'});
                history.push('/');
                return this.scrollTo('how-it-works');
            case 'contact-us':
                history.push('/contact');
                break;
            default:
                return history.push('/')

        }
    };

    scrollTo(selector) {
        setTimeout(() => {
            if (selector) {
                $("html, body").animate({scrollTop: $(`#${selector}`).position().top - 65}, 1000);
            } else {
                $("html, body").animate({scrollTop: 0}, 1000);
            }
        })
    }

    capitalize(str = '') {
        return str.trim().split('')
            .map((char, i) => i === 0 ? char.toUpperCase() : char)
            .reduce((final, char) => final += char, '')
    }

    getLoggedInMenuItems() {
        const loggedInMenuItems = [
            {
                key: 'previous-expenses',
                name: 'previous-expenses',
                buttonTitle: 'Previous Expenses'
            },
            {
                key: 'add-credits',
                name: 'add-credits',
                buttonTitle: 'Add Credits'
            },
            {
                key: 'request-money',
                name: 'request-money',
                buttonTitle: 'Request Money'
            },
            {
                key: 'link-account',
                name: 'link-account',
                buttonTitle: 'Link Account'
            },
            {
                key: 'support',
                name: 'support',
                buttonTitle: 'Support'
            },
            {
                key: 'logout',
                name: 'logout',
                buttonTitle: 'Logout'
            }
        ];

        let filteredMenuItems = [];
        const hiddenFromTutorItems = ['add-credits', 'previous-expenses'];
        const hiddenFromStudentItems = ['request-money', 'link-account'];

        if (this.props.role === "tutor") {
            filteredMenuItems = hiddenFromTutorItems.reduce((final, itemKey) => {
                return final.filter(item => item.key !== itemKey)
            }, loggedInMenuItems)
        } else {
            filteredMenuItems = hiddenFromStudentItems.reduce((final, itemKey) => {
                return final.filter(item => item.key !== itemKey)
            }, loggedInMenuItems)
        }
        let menuItems = filteredMenuItems.map((item, i) => {
            return (
                <Dropdown.Item
                    key={item.key}
                    name={item.name}
                    onClick={this.handleItemClick}
                    active={this.state.activeItem === item.name}>
                    {item.buttonTitle}
                </Dropdown.Item>
            );
        });

        const {firstName, lastName} = this.props;

        const trigger = (
            <div className='trigger-container'>
                {/* User here */}
                <Image avatar src={faker.internet.avatar()}/>
                <div className='trigger-content'>
                    <div className='username-text'> {this.capitalize(firstName)} {this.capitalize(lastName)} </div>
                    <div className='user-credits'> {`${this.props.profile.credits} credits`} </div>
                </div>
            </div>
        );

        return (<Menu.Menu position='right'>
            {this.props.role === 'student' &&
            <Menu.Item name={'search'} active={this.state.activeItem === 'search'} onClick={this.handleItemClick}>Search
                Tutors</Menu.Item>}
            <Menu.Item name={'profile'} active={this.state.activeItem === 'profile'}
                       onClick={this.handleItemClick}>Profile</Menu.Item>
            <Menu.Item name={'messages'} active={this.state.activeItem === 'messages'}
                       onClick={this.handleItemClick}>Messages</Menu.Item>
            <Dropdown item trigger={trigger} pointing='top left' value={this.state.activeItem}
                      className='menubar-container'>
                <Dropdown.Menu>
                    {menuItems}
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>)
    }

    renderCenterItems() {
        const items = [
            {
                key: 'search-tutors',
                name: 'search-tutors',
                buttonTitle: 'Search Tutors'
            }, {
                key: 'how-works',
                name: 'how-works',
                buttonTitle: 'How It Works'
            },
            {
                key: 'pricing',
                name: 'pricing',
                buttonTitle: 'Pricing'
            }, {
                key: 'i-want',
                name: 'i-want',
                buttonTitle: 'I Want To Tutor'
            }
        ];
        let menuItems = items.map((item) => {
            return (
                <Menu.Item
                    key={item.key}
                    name={item.name}
                    active={this.state.activeItem === item.name}
                    onClick={this.handleItemClick}>
                    {item.buttonTitle}
                </Menu.Item>
            );
        });
        return (<Menu.Menu position={'right'}> {menuItems} </Menu.Menu>)
    }

    getItems() {
        const items = [
            {
                key: 'log-in',
                name: 'log-in',
                buttonTitle: 'Log In'
            }, {
                key: 'sign-up',
                name: 'sign-up',
                buttonTitle: 'Sign Up'
            }
        ];
        let menuItems = items.map((item) => {
            return (
                <Menu.Item
                    key={item.key}
                    name={item.name}
                    active={this.state.activeItem === item.name}
                    onClick={this.handleItemClick}>
                    {item.buttonTitle}
                </Menu.Item>
            );
        });
        return (<Menu.Menu position='right'> {menuItems} </Menu.Menu>)
    }

    onSearchWordChange = (e, {value}) => {
        this.setState({searchWord: value})
    };

    onSearch = () => {
        this.props.toggleSearchMode({mode: 'search'});
        this.props.searchRequested(this.state.searchWord, this.props.authToken)
    };

    isShowSearchBar = () => {
        if (this.props.role !== 'student') {
            return null
        }
        if (window.location.pathname === '/search' || window.location.pathname === '/dashboard/student') {
            return <Input size='large' placeholder='Search for tutors,skills you want to learn...'
                          className='search-input'
                          action={<Button type='submit' onClick={this.onSearch}> Search </Button>}
                          onChange={this.onSearchWordChange}/>
        }
        return null
    };

    render() {
        const {authToken, role} = this.props;
        let menuBar, searchbar;
        let menuRight = (authToken && window.location.pathname !== '/login' && window.location.pathname !== '/' && !window.location.pathname.includes('sign-up')) ? this.getLoggedInMenuItems() : this.getItems();
        let dashboardLink = role === "student" ? '/dashboard/student' : '/dashboard/tutor';
        let isDashboardAccessible = authToken ? dashboardLink : '/';

        if (!authToken) {
            menuBar = this.renderCenterItems()
        }
        if (authToken) {
            searchbar = <Menu.Item position='right'> {this.isShowSearchBar()} </Menu.Item>
        }
        return (
            <Menu stackable borderless className='menubar' size={'large'} fixed={'top'}>
                <Menu.Item>
                    <a href={isDashboardAccessible} className='navBar-logo'>
                        <img src={logoDark} className='navBar-logo' role='presentation'/>
                    </a>
                </Menu.Item>
                {menuBar}
                {searchbar}
                {menuRight}
            </Menu>
        )
    }
}

const mapStateToProps = ({auth, dashboard}) => {
    const {authToken, id: userId, role, firstName, lastName, loggedIn} = auth;
    const {profile} = dashboard;
    return {authToken, userId, role, firstName, lastName, loggedIn, profile}
};

export default connect(mapStateToProps, {
    logoutUserRequested,
    searchRequested,
    setPresentProfile,
    toggleSearchMode
})(Navbar);