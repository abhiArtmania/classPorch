import React, {Component} from 'react';
import {Grid, Card, Image, Item, Button} from 'semantic-ui-react';
import {HeaderGreen, HeaderOrange} from '../../../../assets/pricing';
import {history} from '../../../../redux/store';

export default class Pricing extends Component {

  constructor(props) {
    super(props);
    this.showSignIn = this.showSignIn.bind(this);
  }

  showSignIn = () => {
    history.push('/sign-up');
  };

  render() {
      const itemStyle = {width: '100%', fontSize: 16, color: '#777', textAlign: 'center'};
      return (
      <Grid id='pricing'>
        <Grid.Row centered style={{fontSize: 32, color: '#4A4A4A', paddingTop: 60, paddingBottom: 60, fontWeight: 300}}>
        Pricing
        </Grid.Row>
        <Grid.Row centered style={{paddingBottom: 80}}>
          <Grid.Column width={6} textAlign='center'>
            <Card.Group itemsPerRow={2}>
              <Card>
                <Image src={HeaderOrange} style={{backgroundColor: '#FFF'}} bordered={false} rounded/>
                <Card.Content>
                  <Item.Group divided relaxed>
                    <Item><div style={{...itemStyle, marginTop: 20}}>No contracts</div></Item>
                    <Item><div style={itemStyle}>No subscriptions needed</div></Item>
                    <Item><div style={itemStyle}>Pay for the time you need</div></Item>
                    <Item>
                      <div style={{...itemStyle, paddingBottom: 30, paddingTop: 20}}>
                        <Button onClick={this.showSignIn} primary>GET STARTED</Button>
                      </div>
                    </Item>
                  </Item.Group>
                </Card.Content>
              </Card>
              <Card>
              <Image src={HeaderGreen} style={{backgroundColor: '#FFF'}} bordered={false} rounded/>
              <Card.Content>
                <Item.Group divided relaxed>
                  <Item><div style={{...itemStyle, marginTop: 20}}>No contracts</div></Item>
                  <Item><div style={itemStyle}>No subscriptions needed</div></Item>
                  <Item><div style={itemStyle}>Pay for the time you need</div></Item>
                  <Item>
                    <div style={{...itemStyle, paddingBottom: 30, paddingTop: 20}}>
                      <Button onClick={this.showSignIn} primary>GET STARTED</Button>
                    </div>
                  </Item>
                </Item.Group>
              </Card.Content>
            </Card>
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}