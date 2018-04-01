import React, {Component} from 'react'
import { Grid } from "semantic-ui-react";
import { object } from 'prop-types';
import '../../../styles.css'
import Truncate from 'react-truncate';


class AboutSegment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  toggleLines = event => {
    event.preventDefault();
    this.setState(prevState => {
      return { expanded: !prevState.expanded };
    });
  }

  render() {
    const { expanded } = this.state;
    return (
      <Grid padded relaxed style={{width: '100%', paddingTop: 30}}>
        <Grid.Column width={16}>
          <h2>About Me</h2>
          <div>
            <Truncate
              lines={!expanded && 3}
              ellipsis={(<span>... <a onClick={this.toggleLines}>Read more</a></span>)}
            >
              {this.props.data.bio}
            </Truncate>
            {expanded && (<span> <a onClick={this.toggleLines}>Show less</a></span>)}
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}

AboutSegment.defaultProps = {
  data: {},
};

AboutSegment.propTypes = {
  data: object,
};

export default AboutSegment;
