import React, { Component } from 'react';
import logoDark from '../../assets/logo_dark.png';
import { history } from '../../redux/store';
import './styles.css';
import { Menu, Dropdown, Image, Input, Button, Grid, Icon, Table, Label, TransitionablePortal } from 'semantic-ui-react';
import faker from 'faker'
import { connect } from 'react-redux';
import { logoutUserRequested, searchRequested, setPresentProfile, toggleSearchMode } from '../../redux/actions';
import $ from "jquery";
import { findDOMNode } from 'react-dom';
import speechbubble from '../../assets/speech-bubble.svg';
import searchicon from '../../assets/searchicon.svg';
import notificationIcon from '../../assets/ring.svg';
import compass from '../../assets/n.png';


class Navbar extends Component {

    state = {
        activeItem: '',
        searchWord: '',
        avatar: faker.internet.avatar()
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
        this.menuToggle = this.menuToggle.bind(this);
        this.state={
            isSearchbar:false,
            open: false,
            NotificationList:[
                {id:6, Date: 'Mar-2018', Notification: 'Hello this is first notification' },
                {id:7, Date: 'Mar-2018', Notification: 'Hello this is second notification' },
                {id:8, Date: 'Mar-2018', Notification: 'Hello this is third notification' },
                {id:9, Date: 'Apr-2018', Notification: 'Hello this is forth notification' },
                {id:10, Date: 'Apr-2018', Notification: 'Hello this is five notification' },
                {id:2, Date: 'Jan-2018', Notification: 'Hello this is first notification' },
                {id:1, Date: 'Jan-2018', Notification: 'Hello this is second notification' },
                {id:3, Date: 'Feb-2018', Notification: 'Hello this is third notification' },
                {id:4, Date: 'Feb-2018', Notification: 'Hello this is forth notification' },
                {id:5, Date: 'Feb-2018', Notification: 'Hello this is five notification' },
            ],
            showReply: false,
            searchWord: '',
            filterGender: '',
            filterSkill: ''
        }

    }

    componentWillMount() {
        this.setState({ activeItem: '' })
    }

    componentDidMount() {
        $(window).on('scroll', () => {
            let scrollTop = $(document).scrollTop()

            if (scrollTop < 2077) {
                this.setState({ activeItem: '' });
            }
            if (scrollTop > 2077 && scrollTop < 2473) { // how-works position
                this.setState({ activeItem: 'how-works' });
            }

            if (scrollTop > 2473 && scrollTop < 3313) { // pricing position
                this.setState({ activeItem: 'pricing' });
            }

            if (scrollTop > 3313 && scrollTop < 3700) { // write-us position
                this.setState({ activeItem: 'write-us' });
            }

            if (scrollTop > 3700) {
                this.setState({ activeItem: '' })
            }
        })
    }
    handleClose = () => this.setState({ open: false })
    handleItemClick = (e, { name }) => {
        console.log(history);
        this.setState({ activeItem: name });
        const { role, userId } = this.props;
        (name === 'search'?this.setState({isSearchbar:true}):this.setState({isSearchbar:false}));
        switch (name) {
            case 'messages':
                history.push('/message');
                return;
            case 'log-in':
                this.scrollTo();
                return history.push('/login');
            case 'sign-up':
                this.scrollTo();
                return history.push('/sign-up');
            case 'logout':
                this.props.logoutUserRequested();
                this.setState({ activeItem: '' });
                return history.replace('/login');
            case 'profile':
                this.setState({ activeItem: 'profile' });
                this.props.setPresentProfile({ userId });
                this.scrollTo();
                return role === 'tutor' ? history.push('/profile/tutor') : history.push('/profile/student');
            case 'notification':
				this.setState({showReply: false})
                history.push('/notification');
                return;

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
                this.setState({ activeItem: 'search-tutors' });
                return history.push('/login');
            case 'i-want':
                this.scrollTo();
                return history.push('/i-want');
            case 'pricing':
                this.setState({ activeItem: 'pricing' });
                history.push('/');
                return this.scrollTo('pricing');
            case 'how-works':
                this.setState({ activeItem: 'how-works' });
                history.push('/');
                return this.scrollTo('how-it-works');
            case 'write-us':
                this.setState({ activeItem: 'write-us' });
                history.push('/');
                return this.scrollTo('write-us');
            case 'contact-us':
                history.push('/contact');
                break;
            case 'dashboard':
                history.push('/dashboard');
                break;   
            case 'settings':
                history.push('/settings');
                break; 
            case 'support':
                history.push('/support');
                break;               
            case 'search':
                this.onSearch();
                break;
            default:
                return history.push('/')

        }
    };


    onClick(e){
        e.preventDefault();
        console.log(this.state.showReply)
        this.setState({ open: !this.state.open })
        this.setState({showReply: !this.state.showReply})
      }
      handleClose = () => this.setState({ open: false })
    scrollTo(selector) {
        setTimeout(() => {
            if (selector) {
                $("html, body").animate({ scrollTop: $(`#${selector}`).position().top - 65 }, 1000);
            } else {
                $("html, body").animate({ scrollTop: 0 }, 1000);
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
                key: 'profile',
                name: 'profile',
                buttonTitle: 'Profile'
            },
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
                key: 'settings',
                name: 'settings',
                buttonTitle: 'Settings'
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
        const hiddenFromTutorItems = ['add-credits', 'previous-expenses','settings'];
        const hiddenFromStudentItems = ['profile','previous-expenses','request-money', 'link-account'];

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

       
        let notificationiteam=this.state.NotificationList.map((item,j) =>{
          
         //   console.log('item',item);
            return
             (
                 <div>
                {item.Date}
                {item.Notification}
                 </div>
            //     <Dropdown.Item
            //     key={item.Date}
            //     name={item.Notification}
            //     onClick={this.handleItemClick}
            //     active={this.state.activeItem === ''}>
            //     {item.Date}
            //  </Dropdown.Item>
            )
        })

        const { firstName, lastName } = this.props;

        const trigger = (
            <div className='trigger-container'>

                <div className='trigger-content'>
                    <div className='username-text'> {this.capitalize(firstName)} {this.capitalize(lastName)} </div>
                    <div className='user-credits'> {`$${this.props.profile.credits ?this.props.profile.credits:'0' }`} </div>
                </div>
            </div>
        );
        const triggernotification = (
            <div className=''>
                <Icon color='yellow' name='alarm' size='large' />
            </div>
        );

        const Notificationtrigger = (
            <Menu.Item name={'notification'} active={this.state.activeItem === 'notification'}
                onClick={this.handleItemClick}>Show all notifications</Menu.Item>
        );

       let notificationbar=this.renderNotificationtems(Notificationtrigger)
       let key=1;
        return (<Menu.Menu position='right'>
           
            <Menu.Item name={'dashboard'} active={this.state.activeItem === 'dashboard'}
                onClick={this.handleItemClick}>Dashboard</Menu.Item>      
            {/*(window.location.pathname === '/search' || window.location.pathname === '/dashboard/student' || window.location.pathname === '/profile/student') && this.props.role === 'student' &&*/
                <Menu.Item name={'search'} active={this.state.activeItem === 'search'} onClick={this.handleItemClick}><Icon color='yellow' name='search' size='large' /></Menu.Item>}

            <Menu.Item name={'messages'} active={this.state.activeItem === 'messages'}
                onClick={this.handleItemClick}><Image src={speechbubble} style={{ width: '30px',height: 'auto'}} /> 
   
      
   
 </Menu.Item>
            
            <Dropdown item trigger={triggernotification} pointing='top left' value={this.state.activeItem}
                className='notification-container'>
                <Dropdown.Menu>
                <div id="notificationDiv" className="NotificationDiv">
                     <Table basic='very'>
                        <Table.Body keys={key++}>
                            {notificationbar} 
                        </Table.Body>   
                    </Table>  
                </div> 
                </Dropdown.Menu>
            </Dropdown>
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
            },
            {
                key: 'how-works',
                name: 'how-works',
                buttonTitle: 'How It Works'
            },
            {
                key: 'pricing',
                name: 'pricing',
                buttonTitle: 'Pricing'
            },
            {
                key: 'write-us',
                name: 'write-us',
                buttonTitle: 'Write To Us'
            },
            {
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

    renderNotificationtems(all) {
    
        let menuItems = this.state.NotificationList.slice(0,5).map((item) => {
            return (
                <Table.Row keys={item.id}>
                  <Table.Cell>
                   <a href="#" className="notification-link"> {item.Notification}</a>
                    </Table.Cell>
                </Table.Row>
                   
            );
        });
        return (<div position={'right'}> {menuItems}{all} </div>)
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

    onSearchWordChange = (e, { value }) => {
        this.setState({ searchWord: value })
    };

    onSearch = (e) => {
        e && e.preventDefault();
        
        const { filterGender, filterSkill, searchWord  } = this.state;
        this.props.toggleSearchMode({ mode: 'search' });
        const page_no = 1; // default
        const params = {
            page_no,
            q: searchWord,
            type: filterSkill,
            gender: filterGender,
        };
        this.props.searchRequested(params)
    };

    onChangeFilter = (e, data) => {
        this.setState({ [data.name]: data.value })
    }

    isShowSearchBar = () => {
        const optsSkill = [
            { key: 'skill', text: 'Skill', value: '' },
            { key: 'java', text: 'Java', value: 'java' },
            { key: 'C', text: 'C', value: 'c' },
            { key: 'css', text: 'Css', value: 'css' },
        ]
        const optsSkillSelected = optsSkill.filter(item => item.value === this.state.filterSkill)


        const optsGender = [
            { key: 'gender', text: 'Gender', value: '' },
            { key: 'male', text: 'Male', value: 'male' },
            { key: 'female', text: 'Female', value: 'female' },
        ]
        const optsGenderSelected = optsGender.filter(item => item.value === this.state.filterGender)
        
        if (this.props.role !== 'student') {
            return null
        }
        if (window.location.pathname === '/search' || window.location.pathname === '/dashboard/student' || window.location.pathname === '/profile/student') {
            return (
                <form className='search-form None-border' onSubmit={this.onSearch}>
                    <Input
                        size='large'
                        placeholder='Enter tutor name'
                        className='search-input'
                        action='Search'
                        onChange={this.onSearchWordChange}
                    />
                    <div className="searchFilters">
                        <Dropdown
                            floating
                            options={optsGender}
                            text={this.state.filterGender === '' ? 'Gender' : optsGenderSelected.text}
                            onChange={this.onChangeFilter}
                            name='filterGender'
                            value={this.state.filterGender}
                            className="searchFilters__filter"
                        />
                        <Dropdown
                            floating
                            options={optsSkill}
                            text={this.state.filterSkill === '' ? 'Skill' : optsSkillSelected.text}
                            onChange={this.onChangeFilter}
                            name='filterSkill'
                            value={this.state.filterSkill}
                            className="searchFilters__filter"
                        />
                    </div>
                </form>
            )
        }
        return null
    };
  	menuToggle(e)
	{
		
	if(e.target.innerText=="menu▼") e.target.innerText="menu▲";
	else e.target.innerText="menu▼";
	
	$(".menu-container").slideToggle();
	}

    

    render() {
        const { authToken, role } = this.props;
        const { open } = this.state;
        console.log(role);
        let menuBar, searchbar,notificationbar;
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
            <div >
                <Menu borderless className='menubar' size={'large'} fixed={'top'}>
                    <Menu.Item>
                        <a href={isDashboardAccessible} className='navBar-logo'>
                            <img src={logoDark} className='navBar-logo' role='presentation' />
                        </a>
                    </Menu.Item>
                    {menuBar}
                    {this.props.role === 'tutor' && searchbar}
                    <Button size={'medium'} basic={true} onClick={this.menuToggle}>menu</Button>
                    {  this.state.isSearchbar === true && searchbar}
                    {menuRight}

                </Menu>
                <div className="menu-container">
                    <Menu stackable borderless className='menubar2' size={'large'} fixed={'top'} ref="slideMenu">
                   
                        {menuBar}

                    </Menu>
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => {
    const { authToken, id: userId, role, firstName, lastName, loggedIn } = store.auth;
    const { profile } = store.dashboard;
    return { authToken, userId, role, firstName, lastName, loggedIn, profile }
};

export default connect(mapStateToProps, {
    logoutUserRequested,
    searchRequested,
    setPresentProfile,
    toggleSearchMode

})(Navbar);
