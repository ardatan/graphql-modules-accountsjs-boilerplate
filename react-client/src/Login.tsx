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

const SignUpLink = (props: any) => <Link to="/signup" {...props} />;

interface IState {
  username: string;
  password: string;
  code: string;
  error: string | null;
}

class Login extends React.Component<WithStyles<'formContainer'> & RouteComponentProps<{}>, IState> {
  public state = {
    code: '',
    username: '',
    error: null,
    password: '',
  };

  public onChangeUsername = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: target.value });
  };

  public onChangePassword = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: target.value });
  };

  public onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ error: null });
    try {
      await accountsPassword.login({
        password: this.state.password,
        user: {
          username: this.state.username,
        },
      });
      this.props.history.push('/');
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  public render() {
    const { classes } = this.props;
    const { username, password, code, error } = this.state;
    return (
      <form onSubmit={this.onSubmit} className={classes.formContainer}>
        <Typography variant="display1" gutterBottom={true}>
          Login
        </Typography>
        <FormControl margin="normal">
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input id="username" value={username} autoComplete="username" onChange={this.onChangeUsername} />
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={this.onChangePassword}
          />
        </FormControl>
        <Button variant="raised" color="primary" type="submit">
          Login
        </Button>
        {error && <FormError error={error} />}
        <Button component={SignUpLink}>Sign Up</Button>
      </form>
    );
  }
}

export default withStyles(styles)(Login);
