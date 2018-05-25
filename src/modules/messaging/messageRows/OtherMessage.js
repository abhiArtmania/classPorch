import React, {Component} from 'react';
import {List, Image,Icon} from 'semantic-ui-react';
import moment from 'moment';

class OtherMessage extends Component {

  constructor(props) {
    super(props);
    this.renderImageMessage = this.renderImageMessage.bind(this);
    this.renderTextMessage = this.renderTextMessage.bind(this);
    console.log("Agyaa Own May")
  }

  renderImageMessage = (message,otherUser) => {
    return (
      // <div>
      //   <Image src={message.text} size={'medium'} as={'a'} target={'_blank'} href={message.text}/>
      //   <p style={{fontSize: 10, textAlign: 'right', color: '#AAA', marginTop: 8}}>
      //     {moment(message.createdAt).fromNow()}
      //   </p>
      // </div>
      <List.Item className="message-row">
              <List.Content>
                {/* <List.Header> <Icon name='user' size='large' /> {otherUser.name} </List.Header> */}
                {
                        (otherUser.role === 'student') ?
                        (<List.Header> <Icon name='user' size='large' /> {otherUser.firstName} {otherUser.lastName} </List.Header>) : 
                        (<List.Header> <Icon name='user' size='large' /> {otherUser.name} </List.Header>)
                      }
                <Image src={message.text} size={'medium'} as={'a'} target={'_blank'} href={message.text}/>
              </List.Content>
            </List.Item>
    )
  };

  renderTextMessage = (message,otherUser) => {
    return (
      // <div>
      //   <p style={{fontSize: 13}}>{message.text}</p>
      //   <p style={{fontSize: 10, textAlign: 'left', color: '#AAA'}}>
      //     {moment(message.createdAt).fromNow()}
      //   </p>
      // </div>
      <List.Item className="message-row" id="liChat">
              <List.Content>
                {/* <List.Header> <Icon name='user' size='large' />{otherUser.name}</List.Header> */}
                {
                        (otherUser.role === 'student') ?
                        (<List.Header> <Icon name='user' size='large' /> {otherUser.firstName} {otherUser.lastName} </List.Header>) : 
                        (<List.Header> <Icon name='user' size='large' /> {otherUser.name} </List.Header>)
                      }
                {message.text}
              </List.Content>
            </List.Item>
    )
  };

  render() {
    const {message,otherUser} = this.props;
    
    const cornerRadius = 8;
    const wrapperStyle = {
      padding: 16,
      backgroundColor: '#F5F5F5',
      borderTopLeftRadius: cornerRadius,
      borderTopRightRadius: cornerRadius,
      borderBottomRightRadius: cornerRadius,
      // float: 'left',
      maxWidth: '40%'
    };

    return (
      <List.Item>
        {/* <div>
          <div style={wrapperStyle}>
            {message.type === 'FILE' ? this.renderImageMessage(message) : this.renderTextMessage(message) }
          </div>
        </div> */}
        <div>
          {
            (message.type === 'FILE') ? 
            (<div style={wrapperStyle}>
              {message.type === 'FILE' ? this.renderImageMessage(message,otherUser) : this.renderTextMessage(message,otherUser) }
            </div>) :
            (<div>
              {message.type === 'FILE' ? this.renderImageMessage(message,otherUser) : this.renderTextMessage(message,otherUser) }
            </div>)
          }

        </div>
      </List.Item>
    )
  }
}

export default OtherMessage;