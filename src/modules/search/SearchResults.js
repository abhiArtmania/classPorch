import React from 'react'
import { array, bool, string } from 'prop-types';
import { Segment, Loader } from 'semantic-ui-react'
import { SearchSection } from './sections'

const SearchResults = props => {
    const { loadingSearch, searchResults, authToken } = props
    return (
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
                    { loadingSearch ? (
                        <Segment style={{flex:1,height:'700px'}} >
                            <Loader active content='Loading, please wait...' />
                        </Segment>
                    ) : (
                        <div>
                            {searchResults.length > 0 ? searchResults.map(tutorInfo => {
                                return <SearchSection tutorInfo={tutorInfo} authToken={authToken} key={tutorInfo.id} />
                            }) : (
                                <h3 style={{ marginBottom: 40 }}>Oops! No result found.</h3 >
                            )}
                            {/* <nav aria-label="Page navigation">
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
                            </nav> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

SearchResults.propTypes = {
    authToken: string.isRequired,
    loadingSearch: bool.isRequired,
    searchResults: array.isRequired,
}

export default SearchResults
