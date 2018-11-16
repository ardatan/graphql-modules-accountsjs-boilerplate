import { Component, OnInit } from '@angular/core';
import { AccountsClientPassword } from '@accounts/client-password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  error: string;

  constructor(private accountsPassword: AccountsClientPassword, private router: Router) { }

  ngOnInit() {
  }

  async register() {
    try {
      await this.accountsPassword.createUser({
        password: this.password,
        username: this.username,
      });
      this.router.navigateByUrl('/login');
    } catch (err) {
      this.error = err.message;
    }
  }

}
