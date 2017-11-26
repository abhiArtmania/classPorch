import React, {Component} from 'react';
import './styles.css';
import {
  Grid,
  Icon,
  Input,
  Button,
  Menu
} from 'semantic-ui-react';
import logoLight from '../../assets/logo_light.png'
import {history} from '../../redux/store';
import {connect} from 'react-redux'

class Footer extends Component {

  state = {}

  handleItemClick = (e, {name}) => {
    switch (name) {
      case 'priv-policy': {
        return history.push('/privacy-policy')
      }
      case 'terms-of-service': {
        const {role} = this.props
        return role === 'tutor' ? history.push('/terms-of-service/tutor') : history.push('/terms-of-service/student')
      }
      default:
        return
    }
  }

  render() {
    return (
      <div>
        <div className='footer-background'>
          <Grid>
            <Grid.Row></Grid.Row>
            <Grid.Row centered>
              <Grid.Column width={1}>
              </Grid.Column>
              <Grid.Column width={3} floated='left'>
                <div className='logo'>
                  <img className='logo' src={logoLight} alt="ClassPorch"/>
                </div>
              </Grid.Column>
              <Grid.Column textAlign='left' width={6} floated='right'>
                <div>
                  <Icon size='large' circular className='icon' name='facebook f'/>
                  <Icon size='large' circular className='icon' name='twitter'/>
                  <Icon size='large' circular className='icon' name='linkedin'/>
                </div>
                <div className='subscribe-label'>
                  SUBSCRIBE US
                </div>
                <p className='subscribe-subtitle'>
                  Placeat copper mug street art jianbing neutra. Ea consectetur qui godard
                  pitchfork, vexillologist asymmetrical activated charcoal whatever twee sartorial
                  delectus nisi lumbersexual aliquip. Eiusmod williamsburg street art distillery
                  pour-over. Proident copper mug photo booth, gochujang kitsch irony cray swag
                  yuccie glossier mollit VHS tumblr. Reprehenderit umami vape street art kale
                  chips vexillologist, commodo adipisicing sustainable shoreditch man braid tacos
                  salvia. Eu assumenda scenester, eiusmod DIY fashion axe fanny pack tattooed
                  aliquip chambray actually. Irony ex trust fund, neutra narwhal pickled tote bag
                  small batch.
                </p>
                <Input placeholder='johndoe@example.com'/>
                <br/>
                <Button color='yellow' className='subscribe-button'>SUBSCRIBE</Button>
              </Grid.Column>
              <Grid.Column width={1}>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row></Grid.Row>
          </Grid>
        </div>
        <div className='footer-bottom-background'>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={14}>
                <Menu secondary borderless>
                  <Menu.Item>
                    <div className='copyright-text'>
                      Copyright ClassPorch 2017
                    </div>
                  </Menu.Item>
                  <Menu.Item
                    className='footer-button'
                    onClick={this.handleItemClick}
                    name='priv-policy'>
                    Privacy Policy
                  </Menu.Item>
                  <Menu.Item
                    className='footer-button'
                    onClick={this.handleItemClick}
                    name='terms-of-service'>
                    Terms of Service
                  </Menu.Item>
                  <Menu.Item
                    className='footer-button'
                    onClick={this.handleItemClick}
                    name='contact-us'>
                    Contact Us
                  </Menu.Item>
                  <Menu.Item
                    className='footer-button'
                    onClick={this.handleItemClick}
                    name='contact-us'>
                    Pricing
                  </Menu.Item>
                  <Menu.Menu position='right'>
                    <Menu.Item
                      className='footer-button-back-to-top'
                      onClick={this.handleItemClick}
                      name='contact-us'>
                      Back to top
                    </Menu.Item>
                  </Menu.Menu>
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({auth}) => {
  const {role} = auth
  return {role}
}

export default connect(mapStateToProps, {})(Footer)