import { CssBaseline, Grid, Paper, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';

const styles = () => ({
  container: {
    padding: 16,
  },
  root: {
    margin: 'auto',
    marginTop: 50,
    maxWidth: 500,
  },
});

const Router = ({ classes }: WithStyles<'root' | 'container'>) => {
  return (
    <BrowserRouter>
      <Grid container={true} className={classes.root}>
        <Grid item={true} xs={12}>
          <Paper className={classes.container}>
            <CssBaseline />
            <Route exact={true} path="/" component={Home} />

            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Paper>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
};

export default withStyles(styles)(Router);

