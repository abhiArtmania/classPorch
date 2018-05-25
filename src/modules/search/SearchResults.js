import React from "react";
import { array, bool, string } from "prop-types";
import {
  Segment,
  Loader,
  Search,
  Button,
  Icon,
  Form,
  Radio,
  Grid,
  Pagination
} from "semantic-ui-react";
import { connect } from "react-redux";

import { SearchSection } from "./sections";
import { searchRequested } from "../../redux/actions";
// import { Pagination } from "../../components/common";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    let d = this.props.searchResults.map(x => {
      return {
        ...x,
        title: x.fullname,
        description: x.skills.map(s => s.name).join(","),
        price: "$ " + x.hourly_rate + " / hr",
        hourRate: x.hourly_rate,
        level: x.grade
      };
    });

    this.state = {
      data: d,
      value: "",
      tutorSkillsLevel: "",
      rateRangeValue: "",
      rateRange: {
        min: 0,
        max: 0
      },
      showFilters: false,
      // searchResults: this.props.searchResults,
      searchResults: d,
      activePage: 1,
      recordsPerPage: 10,
      selectedTutorId: null
    };
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }
  componentWillMount() {
    this.resetComponent();
  }

  handleFilterClick = () =>
    this.setState({ showFilters: !this.state.showFilters });

  handleApplyFilterClick = e => {
    const { tutorSkillsLevel, rateRange } = this.state;
    this.setState({
      searchResults: this.state.searchResults.filter(
        r => r.hourRate >= rateRange.min && r.hourRate <= rateRange.max
      )
    });
  };

  handleCloseFilterClick = e => this.setState({ showFilters: false });

  handleTutorSkillsLevelChange = (e, { value }) =>
    this.setState({ tutorSkillsLevel: value });

  handleRateRangeChange = (e, { value }) => {
    let min = 0;
    let max = 0;
    switch (value) {
      case "zeroto10":
        min = 0;
        max = 10;
        break;
      case "eleventotwentyfive":
        min = 11;
        max = 25;
        break;
      case "greaterthan25":
        min = 26;
        max = Number.MAX_VALUE;
        break;
      default:
        break;
    }
    this.setState({ rateRangeValue: value, rateRange: { min, max } });
  };
  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) => {
    const { tutorSkillsLevel, rateRangeValue, rateRange } = this.state;

    if (tutorSkillsLevel !== "" && rateRangeValue !== "") {
      this.setState({
        value: result.title,
        selectedTutorId: result.id,
        searchResults: this.props.searchResults.filter(
          x =>
            x.id === result.id &&
            result.hourRate >= rateRange.min &&
            result.hourRate <= rateRange.max &&
            result.level === tutorSkillsLevel
        )
      });
    } else if (tutorSkillsLevel === "" && rateRangeValue !== "") {
      this.setState({
        value: result.title,
        selectedTutorId: result.id,
        searchResults: this.props.searchResults.filter(
          x =>
            x.id === result.id &&
            result.hourRate >= rateRange.min &&
            result.hourRate <= rateRange.max
        )
      });
    } else if (tutorSkillsLevel !== "" && rateRangeValue === "") {
      this.setState({
        value: result.title,
        selectedTutorId: result.id,
        searchResults: this.props.searchResults.filter(
          x => x.id === result.id && result.level === tutorSkillsLevel
        )
      });
    } else if (tutorSkillsLevel === "" && rateRangeValue === "") {
      this.setState({
        value: result.title,
        selectedTutorId: result.id,
        searchResults: this.props.searchResults.filter(x => x.id === result.id)
      });
    }
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(this.state.value, "i");

      this.setState({
        isLoading: false,
        results: this.state.data.filter(t => t.description.match(re))
      });
    }, 100);
  };
  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
  };
  render() {
    const { loadingSearch, searchResults, authToken } = this.props;

    const { activePage, recordsPerPage } = this.state;

    let startIndex =
      activePage === 1 ? activePage - 1 : (activePage - 1) * recordsPerPage;
    let endIndex = startIndex + recordsPerPage;

    return (
      <div style={{ marginTop: "25px" }} className="tutor-search-container">
        <div className="option-bar">
          <div className="row">
            <div className="col-lg-4 col-md-7 col-sm-7 col-xs-10 cod-pad">
              <Search
                loading={this.state.isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={this.state.results}
                value={this.state.value}
                size="big"
                {...this.props}
              />
            </div>
            <div
              className="col-lg-2 col-md-5 col-sm-5 col-xs-2"
              style={{ paddingTop: "4px", float: "right" }}
            >
              <Button
                icon
                labelPosition="left"
                className={"heading-icon"}
                fluid
                onClick={this.handleFilterClick}
              >
                <Icon name="filter" />
                <span style={{ marginLeft: "15px" }}>Filter</span>
              </Button>
            </div>
          </div>
        </div>
        {this.state.showFilters && (
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Form>
                  <Form.Field>
                    Selected value: <b>{this.state.tutorSkillsLevel}</b>
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="Beginner"
                      name="radioGroup"
                      value="beginner"
                      checked={this.state.tutorSkillsLevel === "beginner"}
                      onChange={this.handleTutorSkillsLevelChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="Intermediate"
                      name="radioGroup"
                      value="intermediate"
                      checked={this.state.tutorSkillsLevel === "intermediate"}
                      onChange={this.handleTutorSkillsLevelChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="Expert"
                      name="radioGroup"
                      value="expert"
                      checked={this.state.tutorSkillsLevel === "expert"}
                      onChange={this.handleTutorSkillsLevelChange}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>
                <Form>
                  <Form.Field>
                    Selected value: <b>{this.state.rateRangeValue}</b>
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="0 - 10"
                      name="radioGroup"
                      value="zeroto10"
                      checked={this.state.rateRangeValue === "zeroto10"}
                      onChange={this.handleRateRangeChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="11 - 25"
                      name="radioGroup"
                      value="eleventotwentyfive"
                      checked={
                        this.state.rateRangeValue === "eleventotwentyfive"
                      }
                      onChange={this.handleRateRangeChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="> 25"
                      name="radioGroup"
                      value="greaterthan25"
                      checked={this.state.rateRangeValue === "greaterthan25"}
                      onChange={this.handleRateRangeChange}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button
                  className={"heading-icon"}
                  onClick={this.handleCloseFilterClick}
                >
                  Close Filter
                </Button>
                <Button
                  className={"heading-icon"}
                  onClick={this.handleApplyFilterClick}
                >
                  Apply Filter
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
        <div className="row">
          <div className="search-result-wrapper">
            {loadingSearch ? (
              <Segment style={{ flex: 1, height: "700px" }}>
                <Loader active content="Loading, please wait..." />
              </Segment>
            ) : (
              <div>
                {this.state.searchResults.length > 0 ? (
                  this.state.searchResults
                    .slice(startIndex, endIndex)
                    .map(tutorInfo => {
                      return (
                        <SearchSection
                          tutorInfo={tutorInfo}
                          authToken={authToken}
                          key={tutorInfo.id}
                        />
                      );
                    })
                ) : (
                  <h3 style={{ marginBottom: 40 }}>Oops! No result found.</h3>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="container first-pagination">
          <div className="row">
            <div className="col-sm-12">
              <Pagination
                activePage={this.state.activePage}
                totalPages={Math.ceil(
                  this.state.searchResults.length / this.state.recordsPerPage
                )}
                onPageChange={this.handlePaginationChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  const { authToken } = store.auth;
  const { searchResults, loadingSearch } = store.search;
  return {
    authToken,
    searchResults,
    loadingSearch,
    searchMetadata: store.search.metadata
  };
};

export default connect(mapStateToProps, {
  searchRequested
})(SearchResults);
