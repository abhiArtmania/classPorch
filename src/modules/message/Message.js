import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, List, Dropdown, Menu, Search,  Form, Icon  } from 'semantic-ui-react';
import {ChatRow} from './chat-strip';
import {ChatActions} from '../../redux/actions';
import {history} from '../../redux/store';
import "./styles.css";

class Message extends Component {

  state = {chats: [],name: '', submittedName: '' };

  constructor(props) {
    super(props);
   
    this.createChatsFromResponse = this.createChatsFromResponse.bind(this);
  }

  componentDidMount() {
    const {loadChats} = this.props;
    loadChats();
  }

  componentWillReceiveProps(nextProps) {
    const {chats, error} = nextProps;
    if (error !== undefined && error !== null && error !== this.props.error) {
      //message.error(error);
    }

    this.createChatsFromResponse(chats);
  };

  componentWillUnmount() {
    this.props.unsubscribe();
  }

  createChatsFromResponse = (chats) => {
    let chatRows = chats.map(chat => {
   
      return <ChatRow
        onClick={() => {
          this.onChatSelected(chat)
        }}
        key={chat.key}
        chat={{updatedAt: chat.updatedAt, lastMessage: chat.lastMessage}}
        user={{name: chat.user.lastName+" "+ chat.user.firstName, pictureUrl: chat.user.profilePictureUrl}}/>
    }); 
    this.setState({chats: chatRows});
  };

  onChatSelected = (chat) => {
    const otherUserRole = this.props.currentUser.role === 'student' ? 'tutor' : 'student';
    this.props.showMessages(this.props.currentUser, {...chat.user, role: otherUserRole}, chat.key);
    history.push(`/messages`);
  };
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, email } = this.state

    this.setState({ submittedName: name, submittedEmail: email })
  }
  render = () => {
    const {chats, isLoadingChats} = this.state;
    const options = [
      { key: 1, text: 'All Read', value: 'read' },
      { key: 2, text: 'Unread', value:'unread' }
     
    ];
    const { name, submittedName } = this.state
    return (
      <Grid className='chatsContainer' style={{padding:'10px'}}>
        
        <Grid.Row style={{padding:'10px 0'}}>
      
          <Grid.Column textAlign='left' width={4} className="left-message-tab" >
          <div className="searchbar"><Search /></div>
          <Grid.Row style={{height: '80vh', overflow: 'scroll'}}>
            <Menu compact>
              <Dropdown text='All Recent' options={options} simple item />
            </Menu>
              <List divided relaxed>
                <List.Item>
                  <List.Icon name='user ' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header as='a'>James hema</List.Header>
                    <List.Description as='a'>Martha: Call me</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='user outline ' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header as='a'>Arjun Sing</List.Header>
                    <List.Description as='a'>Arjun: how are you </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='user ' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header as='a'>Bob</List.Header>
                    <List.Description as='a'>You: Hi</List.Description>
                  </List.Content>
                </List.Item>
              </List>
              </Grid.Row>
          </Grid.Column>
          <Grid.Column textAlign='left' width={12} className="right-tab">
            <Grid.Row className="header-message">
              <h2> <Icon name='user' size='large' /> James hema</h2>
            </Grid.Row>
          <Grid.Row  style={{height: '65vh', overflow: 'scroll',background: '#fff'}}>
          <List divided  relaxed>
      <List.Item>
        <List.Content>
          <List.Header>Snickerdoodle</List.Header>
          An excellent companion
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Poodle</List.Header>
          A poodle, its pretty basic
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Paulo</List.Header>
          He's also a dog
        </List.Content>
      </List.Item>
    </List>
          
          </Grid.Row>
          <Grid.Row>
          <Grid.Column width={8}>
          <div style={{margin:'10px 0px'}}>
              <Form onSubmit={this.handleSubmit}>
               
                  <Form.Input className="message-input" placeholder='Message' name='name' value={name} onChange={this.handleChange} />
                  
                  <Form.Button content='Submit' />
                
              </Form>
       
          </div>
          </Grid.Column>
      </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = ({auth, chatReducer}) => {
  const {chats, error, isLoadingChats} = chatReducer;
  const {id, role, firstName, lastName} = auth;
  return {currentUser: {id, role, firstName, lastName}, chats, error, isLoadingChats};
};

const mapActionsToProps = () => {
  return {
    loadChats: ChatActions.loadChats,
    showError: ChatActions.showError,
    showMessages: ChatActions.showMessages,
    unsubscribe: ChatActions.unsubscribe
  }
};

export default connect(mapStateToProps, mapActionsToProps())(Message);