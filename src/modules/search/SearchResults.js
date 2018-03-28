import React, {Component} from 'react'
import { Grid, Header, Segment,Loader } from 'semantic-ui-react'
import { SearchSection } from './sections'
import { connect } from 'react-redux'
import { searchRequested } from '../../redux/actions'

class SearchResults extends Component {

    componentDidMount(){
        this.props.searchRequested('',this.props.authToken)
    }

    onClickResult = (e,data) => {
        console.log(e)
    };

    renderSearchResults = (results,authToken) => {
        // if(!results || !results.length){
        //     return (
        //         <Grid.Row centered style={{ fontSize:'1.3em',fontWeight:100 }} >
        //             No tutors found for the searched keywords. Please try again.
        //         </Grid.Row>
        //     )
        // }
        // return results.map(result => {
        //     return <SearchSection result = {result} authToken={authToken} key={result.id} />
        // })
        return (
            <div>
                <SearchSection result = {{id: 1, name: "Karen P.", img: "/img/team-2/team-2.jpg", rate: "$20-25/hr", online: true }} authToken={authToken} key={1} />
                <SearchSection result = {{id: 2, name: "Erik S.", img: "/img/team-2/team-3.jpg", rate: "$20-25/hr", online: false }} authToken={authToken} key={2} />
                <SearchSection result = {{id: 3, name: "Alia B.", img: "/img/team-2/team-1.jpg", rate: "$20-25/hr", online: true }} authToken={authToken} key={3} />
                <SearchSection result = {{id: 4, name: "Tina R.", img: "/img/team-2/team-4.jpg", rate: "$20-25/hr", online: false }} authToken={authToken} key={4} />
                <SearchSection result = {{id: 5, name: "Anna T.", img: "/img/team-2/team-3.jpg", rate: "$20-25/hr", online: true }} authToken={authToken} key={5} />
                <SearchSection result = {{id: 6, name: "John A.", img: "/img/team-2/team-1.jpg", rate: "$20-25/hr", online: false }} authToken={authToken} key={6} />
                <nav aria-label="Page navigation">
                  <ul className="pagination">
                    <li>
                      <a href="#" aria-label="Previous">
                        <i className="fa fa-angle-left" />
                      </a>
                    </li>
                    <li className="active"><a href="#">1 <span className="sr-only">(current)</span></a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li>
                      <a href="#" aria-label="Next">
                        <i className="fa fa-angle-right" />
                      </a>
                    </li>
                  </ul>
                </nav>
            </div>
        )
    };

    renderLoader = () => {
        return(
            <Segment style={{flex:1,height:'700px'}} >
                <Loader active content='Loading, please wait...' />

            </Segment>
        )
    };

    render(){
        const { loadingSearch,searchResults,authToken } = this.props;
        return(
            <div className="container">
                <div className="option-bar">
                    <div className="row">
                      <div className="col-lg-6 col-md-5 col-sm-5 col-xs-2">
                        <h4>
                          <span className="heading-icon">
                            <i className="fa fa-th-list" />
                          </span>
                          <span className="hidden-xs">Tutors List</span>
                        </h4>
                      </div>
                      <div className="col-lg-6 col-md-7 col-sm-7 col-xs-10 cod-pad">
                      </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        { loadingSearch ? this.renderLoader() : this.renderSearchResults(searchResults,authToken) }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({search,auth}) => {
    const { searchResults,loadingSearch } = search;
    const {authToken} = auth;

    return { searchResults,loadingSearch,authToken }
};

export default connect(mapStateToProps,{ searchRequested })(SearchResults)
