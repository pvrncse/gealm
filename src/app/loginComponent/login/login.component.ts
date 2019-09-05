import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from "../../service/user.service";
import { VerifiedUser } from "../user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  verifiedUser: VerifiedUser = {
    username: '',
    password: ''
  };

  submitted = false;
  loading = false;

  serverErrors: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/main/projects');
    }
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    if (form.valid) {
      this.userService.login(form.value).subscribe(
        res => {
          console.log(res);
          this.submitted = true;
          this.userService.setAccessToken(res['accessToken'], res['username']);
          if (res['apiKeyValid']) {
            this.router.navigateByUrl('/main/dashboard');
          } else {
            this.router.navigateByUrl('/main/apiKey');
          }
        },
        err => {
          this.loading = false;
          console.log(err);
          if (err.error.message) {
            this.serverErrors = err.error.message;
          } else {
            this.serverErrors = "We could not complete your request. Please try again later.";
          }
          // this.submitted = false;
          // form.reset();
        }
      );
    } else {
      this.loading = false;
    }
  }

}
