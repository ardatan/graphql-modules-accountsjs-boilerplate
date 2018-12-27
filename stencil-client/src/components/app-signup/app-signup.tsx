import { Component, State } from "@stencil/core";
import { accountsPassword } from "../../helpers/accounts";

@Component({
  tag: 'app-signup'
})
export class AppSignup {
  @State() username: string;
  @State() password: string;

  async signup() {
    try {
      await accountsPassword.createUser({
        username: this.username,
        password: this.password
      });
      const ionRouter = document.querySelector('ion-router');
      return ionRouter.push('/login');
    } catch (err) {
      alert(err.message);
    }
  }

  goLogin(){
    const ionRouter = document.querySelector('ion-router');
    return ionRouter.push('/login');
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Signup</ion-title>
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
            <ion-button onClick={ () => this.signup() }>Signup</ion-button>
          </ion-item>
          <ion-item>
            <ion-button onClick={ () => this.goLogin() }>Login</ion-button>
          </ion-item>
        </ion-list>
      </ion-content>
    ]
  }
}
