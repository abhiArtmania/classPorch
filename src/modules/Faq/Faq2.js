import React, { Component } from 'react';
import { Header, Icon,Accordion } from 'semantic-ui-react'

var styles = {
    header: {
        // margin: '50px',
        // margin: '0 auto',
        // display: 'block',
        // textAlign: 'center',
        margin: '50px',
        fontSize: '50px',
        
    }
}

class Faq2 extends Component {
    state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
    render() {
        const { activeIndex } = this.state
        return (
            <div>
                {/* <Header as='h2' textAlign='center' style={styles.header}>
                    <Icon name='question' />
                    <Header.Content>
                    Frequently Asked Questions
                    <Header.Subheader>
                    Below are answers to our most frequently asked questions. If you can't find the <br/> answer you're looking for, feel free to contact us.
                    </Header.Subheader>
                    </Header.Content>
                </Header> */}
                <Header as='h3' textAlign='center' style={styles.header}>
                    Frequently Asked Questions
                    <Header.Subheader>
                    Below are answers to our most frequently asked questions. If you can't find the <br/> answer you're looking for, feel free to contact us.
                    </Header.Subheader>
                </Header>

                    <Accordion styled>
                        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        What is a dog?
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 0}>
                        <p>
                            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
                            {' '}welcome guest in many households across the world.
                        </p>
                        </Accordion.Content>

                        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        What kinds of dogs are there?
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 1}>
                        <p>
                            There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of
                            {' '}dog that they find to be compatible with their own lifestyle and desires from a companion.
                        </p>
                        </Accordion.Content>

                        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        How do you acquire a dog?
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 2}>
                        <p>
                            Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.
                        </p>
                        <p>
                            A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to
                            {' '}assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your
                            {' '}dog from a shelter, helps give a good home to a dog who may not find one so readily.
                        </p>
                        </Accordion.Content>
                    </Accordion>
            </div>
        );
    }
}

export default Faq2;