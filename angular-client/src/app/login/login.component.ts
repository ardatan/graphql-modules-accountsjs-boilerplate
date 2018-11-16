import { Component, OnInit } from '@angular/core';
import { AccountsClientPassword } from '@accounts/client-password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  error: string;

  constructor(private accountsPassword: AccountsClientPassword, private router: Router) { }

  ngOnInit() {
  }

  async login() {
    try {
      await this.accountsPassword.login({
        password: this.password,
        user: {
          username: this.username,
        },
      });
      this.router.navigateByUrl('/');
    } catch (err) {
      this.error = err.message;
    }
  }

}
