import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import ScrollToTop from './ScrollToTop';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const styles = theme => ({
  app: {
    backgroundColor: theme.palette.background.default,
  },
});

class AppLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            open: false,
        }
    }

    handleSearch = async (event) => {
        if(event.key === 'Enter'){
            const escapedSearchQuery = encodeURIComponent(this.state.searchValue);
            this.props.history.push(`/results?search_query=${escapedSearchQuery}`);
        }
    };

    handleOnChange = newValue => {
      this.setState({ searchValue: newValue });
    };

    handleOpenSideBar = event => {
        this.setState({open: true})
    };

    handleCloseSideBar = event => {
        this.setState({open: false})
    };

  render() {
      const { classes } = this.props;
      return (
            <ScrollToTop>
              <div className="App">
                  <Header
                      onSearch={this.handleSearch}
                      onChange={this.handleOnChange}
                      searchValue={this.state.searchValue}
                      isSearching={this.props.isSearching}
                      openSideBar={this.handleOpenSideBar}
                  />
                {this.props.children}
              </div>
            </ScrollToTop>
      );
  }
}

function mapStateToProps(state, props) {
  return {
    isSearching: state.search.isSearching,
    isLoggedIn: state.auth.isLoggedIn,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(AppLayout)));
