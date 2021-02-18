import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
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

    handleLogout = () => {
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
                onClick={this.handleLogout}
            >
              <ExitToAppIcon fontSize="large" color="secondary"/>
           </IconButton>
          </div>
        }
    }
}

function mapStateToProps(state, props) {
  return {
    profile: {username: "", avatar: "/broken-image.jpg"},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(clearSession())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(UserIcon)));
