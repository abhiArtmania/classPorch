import React, {Component} from 'react';
import {List, Image,Icon} from 'semantic-ui-react';
import moment from 'moment';

class OwnMessage extends Component {

  constructor(props) {
    super(props);
    this.renderImageMessage = this.renderImageMessage.bind(this);
    this.renderTextMessage = this.renderTextMessage.bind(this);
    console.log("Agyaa Own May")
  }

  renderImageMessage = (message) => {
    console.log("Ye image");
    return (
      // <div>
      //   <Image src={message.text} size={'medium'} as={'a'} target={'_blank'} href={message.text}/>
      //   <p style={{fontSize: 10, textAlign: 'right', color: '#AAA', marginTop: 8}}>
      //     {moment(message.createdAt).fromNow()}
      //   </p>
      // </div>
      <List.Item className="message-row">
              <List.Content>
                <List.Header> <Icon name='user' size='large' /> Me </List.Header>
                <Image src={message.text} size={'medium'} as={'a'} target={'_blank'} href={message.text}/>
              </List.Content>
            </List.Item>
    )
  };

  renderTextMessage = (message) => {
    console.log("Ye text");
    return (
      // <div>
      //   <p style={{fontSize: 13, color: '#333'}}>{message.text}</p>
      //   <p style={{fontSize: 10, textAlign: 'right', color: '#AAA'}}>
      //     {moment(message.createdAt).fromNow()}
      //   </p>
      // </div>
      <List.Item className="message-row">
              <List.Content>
                <List.Header> <Icon name='user' size='large' /> Me </List.Header>
                {message.text}
              </List.Content>
            </List.Item>
    )
  };

  render() {
    console.log("Msg print krne aya hn ownMessage . . . ")
    const {message} = this.props;
    const cornerRadius = 8;
    const wrapperStyle = {
      padding: 16,
      border: '1px solid #DDD',
      borderTopLeftRadius: cornerRadius,
      borderTopRightRadius: cornerRadius,
      borderBottomLeftRadius: cornerRadius,
      // float: 'right',
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
              {message.type === 'FILE' ? this.renderImageMessage(message) : this.renderTextMessage(message) }
            </div>) :
            (<div>
              {message.type === 'FILE' ? this.renderImageMessage(message) : this.renderTextMessage(message) }
            </div>)
          }

        </div>
      </List.Item>
    )
  }
}

export default OwnMessage;