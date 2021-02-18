import React from 'react';
// import TabPane from './TabPane';
import {withStyles} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { fetchDiscogs } from '../actions/fetch';
import { startSearch, endSearch, enableSearch } from '../actions/search';
import {getSearchParam} from '../services/url';
import Button from '@material-ui/core/Button';
import { withLastLocation } from 'react-router-last-location';
import { MixPanel } from './MixPanel';

const styles = theme => ({
  panel: {
    position: 'absolute',
  }
});

class Search extends React.Component {
    getSearchQuery() {
        return getSearchParam(this.props.location, 'search_query');
    }

    componentDidMount() {
        if (!this.getSearchQuery()) {
          // redirect to home component if search query is not there
          this.props.history.push('/');
          return;
        }
        // if coming from login or register, dont fire search
        this.fetchDiscs();
    }

    componentDidUpdate(prevProps) {
      if (prevProps.location !== this.props.location
          && this.props.lastLocation.pathname !== "/login"
          && this.props.lastLocation.pathname !==  "/register") {
        this.fetchSongs();
      }
    }

    fetchDiscs = async () => {
        const searchQuery = this.getSearchQuery()
        this.props.startSearch();
        await Promise.all([
            this.props.fetchDiscogs(searchQuery),
        ]);
        await this.props.endSearch();
        MixPanel.track('Search Disc', {
            'Search Query': searchQuery,
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <form className={classes.root} noValidate autoComplete="off">
              <TextField id="filled-basic" label="Filled" variant="filled" />
              <Button variant="contained" color="primary">
                 Primary
              </Button>
            </form>
          );
    }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDiscogs: searchQuery => dispatch(fetchDiscogs(searchQuery)),
    startSearch: () => dispatch(startSearch()),
    endSearch: () => dispatch(endSearch()),
  };
}

function mapStateToProps(state, props) {
  return {
    accessToken: state.auth.session !== null ? state.auth.session.accessToken.jwtToken: null,
    userid: state.auth.session !== null ? state.auth.session.accessToken.payload.sub: null,
  };
}

export default withLastLocation(withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Search))));
