import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { ModalLink } from "react-router-modal-gallery";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { clearSession } from '../actions/auth';

const styles = theme => ({
  accountButtonClass: {
    marginLeft: 'auto',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(1),
      width: 170,
    },
  },
  accountIconClass: {
      marginLeft: 'auto',
      textDecoration: 'none',
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(1),
        padding: 0
      },
  },
  wrapper: {
      marginLeft: 'auto'
  },
  button: {
      color: theme.palette.secondary.main
  }
});

class UserIcon extends Component {
    constructor(props) {
        super(props)
        this.state = {
          anchorEl : null
        };
    }

    handleClick = (event) => {
      this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
      this.setState({anchorEl: null});
    };

    goToProfile = () => {
      this.setState({anchorEl: null});
      this.props.history.push(`/profile/${this.props.userid}`);
    };

    handleLogout = () => {
      this.setState({anchorEl: null});
      this.props.logout();
    };
    render () {
        const { classes } = this.props;
        if (!this.props.isLoggedIn) {
            return <ModalLink to='/login' className={classes.accountButtonClass}>
              <Button
                  variant='contained'
                  disabled={false}
                  color="secondary"
               >
                  Sign In
                </Button>
            </ModalLink>
        }
        else {
            return <div className={classes.wrapper}>
            <IconButton
                className={classes.accountIconClass}
                onClick={this.handleClick}
            >
              <Avatar
                alt={this.props.profile.username.toUpperCase()}
                src={this.props.profile.avatar}
                aria-label="open account menu"
              >
            </Avatar>
           </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.goToProfile}>Profile</MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Menu>
          </div>
        }
    }
}

function mapStateToProps(state, props) {
  return {
    profile: {username: "", avatar: "/broken-image.jpg"},
    userid: state.auth.session !== null ? state.auth.session.accessToken.payload.sub: null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(clearSession())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(UserIcon)));
