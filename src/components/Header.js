import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserIcon from './UserIcon';
import logo from '../logo.png';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
    },
  },
  title: {
    flexGrow: 0.3,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
        display: 'flex',
        justifyContent:'left',
        alignItems:'center'
    },
  },
  titleLink: {
      color: '#000',
      textDecoration: 'none'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
      flexGrow: 0.3,
    },
  },
  inputRoot: {
    padding: theme.spacing(1),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    "&:hover": {   // this works
     backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
  },
  searchIcon: {
      flexGrow: 0,
  },
  divButton: {
      marginLeft: 'auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
  },
  accountButton: {
    textDecoration: 'none'
  },
  bar: {
      [theme.breakpoints.down('sm')]: {
          paddingTop: theme.spacing(0.5),
          paddingBottom: theme.spacing(0.5),
      }
  }
});


class Header extends Component {
    render() {
        const { classes } = this.props;
        return (
            <AppBar position="sticky" className={classes.bar}>
                <Toolbar>
                  <div className={classes.title}>
                      <Link to={this.props.isSearching ? this.props.history.location.pathname + this.props.history.location.search: "/"} className={classes.titleLink}>
                          <img
                            src={ logo }
                            width={280}
                            height={70}
                            className="d-inline-block align-top"
                            alt="Noisedge logo"
                          />
                      </Link>
                  </div>
                  <div className={classes.divButton}>
                  {this.props.isLoggedIn && <Typography variant="body2" color="textSecondary" component="p">
                    Welcome, {this.props.email}
                </Typography>}
                <UserIcon
                    isLoggedIn={this.props.isLoggedIn}
                    className={classes.accountButton}
                />
                </div>
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = state => {
  return {
      isLoggedIn: state.auth.isLoggedIn,
      email: state.auth.session !== null ? state.auth.session.idToken.payload.email: null,
   }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Header)));
