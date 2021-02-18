import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { hitApi } from '../actions/helloWorld';
import { withLastLocation } from 'react-router-last-location';
import { ModalLink } from "react-router-modal-gallery";
import { getSearchParam } from '../services/url';


const styles = theme => ({
    root: {
      width: 400,
      height: "100%"
    },
    media: {
      height: 380,
    },
  bar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent:'center',
      alignItems: 'center',
      top: theme.spacing(8),
      [theme.breakpoints.only('sm')]: {
          top: theme.spacing(9),
      },
  },
  subContainer: {
      padding: theme.spacing(3),
  },
  icon: {
      margin: theme.spacing(2),
  },
  container: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(4),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
  },
  grid: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center'
  },
  link: {
      marginLeft: theme.spacing(0.5),
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      "&:hover": {
          textDecoration: 'underline'
      }
  },
  form: {
      paddingTop: theme.spacing(5)
  },
  title: {
      fontWeight: "bold",
      marginBottom: theme.spacing(4)
  },
  button: {
      color: 'white',
      minWidth: 200,
      margin: theme.spacing(2)
  },
  titleLink: {
      textDecoration: 'none'
  },
  cta: {
      paddingTop: theme.spacing(2)
  },
  button: {
      color: 'white',
      backgroundColor: theme.palette.primary.dark,
      "&:hover": {
          backgroundColor: theme.palette.primary.main,
      }
  }
});

class Home extends React.Component {
    componentDidMount() {
        if (this.props.isLoggedIn && this.props.accessToken !== null) {
            const token = this.props.accessToken
            this.props.hitApi(token)
        }
        // spotify callback
        // this.callbackFromSpotify();
    }

    componentDidUpdate(prevProps) {
        if (this.props.accessToken
            && prevProps.location !== this.props.location
        ){
            // this.props.getRecentPlaylists();
        }
    }

    // callbackFromSpotify = async () => {
    //     const code = getSearchParam(this.props.location, 'code');
    //     if (code){
    //         let tokens = await callbackLoginSpotify(code);
    //         this.props.history.push({
    //             pathname: `/profile/${this.props.userid}`,
    //             state: tokens
    //         })
    //     }
    // }

    render(){
        const { classes } = this.props;
        return (
            <Container maxWidth='md' className={classes.container}>
                 <Grid spacing={5} container classes={classes.grid}>
                     <Grid item>
                        <Card className={classes.root}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image="https://weraveyou.com/wp-content/uploads/2020/12/vinyl-records-945396_1920.jpg"
                              title="Best Online Price"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                Best online price
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                Find any vinyl online at the best price possible accross Discogs, Amazon, Ebay, Bandcamp etc...
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button variant="contained" size="small" className={classes.button}>
                              Go
                            </Button>
                          </CardActions>
                        </Card>
                     </Grid>
                     <Grid item>
                        <Card className={classes.root}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image="https://consequenceofsound.net/wp-content/uploads/2017/09/discogs-vinyl-record-mark.png"
                              title="Discogs deals"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                Discogs deals
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                Connect to your Discogs account and find the best deals according to your location, wantlist and preferences
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                              <Button variant="contained" size="small" className={classes.button}>
                                Go
                              </Button>
                          </CardActions>
                        </Card>
                     </Grid>
                 </Grid>
              </Container>
        );
    }
}

const mapDispatchToProps = dispatch => {
  return {
    hitApi: token => dispatch(hitApi(token)),
  };
}

const mapStateToProps = state => {
  return {
      isLoggedIn: state.auth.isLoggedIn,
      userid: state.auth.session !== null ? state.auth.session.accessToken.payload.sub: null,
      accessToken: state.auth.session !== null ? state.auth.session.accessToken.jwtToken: null,
   }
}

export default withLastLocation(withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })((Home)))));
