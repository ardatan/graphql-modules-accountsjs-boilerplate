import { Component, State } from "@stencil/core";
import { accountsPassword } from "../../helpers/accounts";

@Component({
  tag: 'app-login'
})
export class AppLogin {
  @State() username: string;
  @State() password: string;

  async login() {
    try {
      await accountsPassword.login({
        password: this.password,
        user: {
          username: this.username,
        },
      });
      const ionRouter = document.querySelector('ion-router');
      return ionRouter.push('/');
    } catch (err) {
      alert(err.message);
    }
  }

  goSignup(){
    const ionRouter = document.querySelector('ion-router');
    return ionRouter.push('/signup');
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-input placeholder='Username' value={this.username} onIonChange={({ target }) => this.username = target['value'] } />
          </ion-item>
          <ion-item>
            <ion-input placeholder='Password' value={this.password} onIonChange={({ target }) => this.password = target['value'] } />
          </ion-item>
          <ion-item>
            <ion-button onClick={ () => this.login() }>Login</ion-button>
          </ion-item>
          <ion-item>
            <ion-button onClick={ () => this.goSignup() }>Signup</ion-button>
          </ion-item>
        </ion-list>
      </ion-content>
    ]
  }
}
