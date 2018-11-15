import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import FormError from './components/FormError';
import { accountsPassword } from './utils/accounts';

const styles = () => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
});

const LogInLink = (props: any) => <Link to="/login" {...props} />;

interface IState {
  username: string;
  password: string;
  error: string | null;
}

class Signup extends React.Component<
  WithStyles<'formContainer'> & RouteComponentProps<{}>,
  IState
> {
  public state = {
    username: '',
    error: null,
    password: '',
  };

  public onChangeEmail = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: target.value });
  };

  public onChangePassword = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: target.value });
  };

  public onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ error: null });
    try {
      await accountsPassword.createUser({
        username: this.state.username,
        password: this.state.password
      });
      this.props.history.push('/login');
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  public render() {
    const { classes } = this.props;
    const { username, password, error } = this.state;
    return (
      <form onSubmit={this.onSubmit} className={classes.formContainer}>
        <Typography variant="display1" gutterBottom={true}>
          Sign up
        </Typography>
        <FormControl margin="normal">
          <InputLabel htmlFor="email">Username</InputLabel>
          <Input id="email" value={username} onChange={this.onChangeEmail} />
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" type="password" value={password} onChange={this.onChangePassword} />
        </FormControl>
        <Button variant="raised" color="primary" type="submit">
          Sign Up
        </Button>
        {error && <FormError error={error} />}
        <Button component={LogInLink}>Log In</Button>
      </form>
    );
  }
}

export default withStyles(styles)(Signup);
