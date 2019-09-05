import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from "../../service/user.service";
import { ForgotUserPassword } from "../user.model";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {

  newPassword: ForgotUserPassword = {
    email: ''
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  cPassword = '';
  serverErrors;
  loading = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {    
    this.loading = true;
    this.userService.forgotPassword(form.value).subscribe(
      res => {
        this.loading = false;
        console.log(res);
      },
      err => {
        console.log(err);
        this.loading = false;
        if (err.error.message) {
          this.serverErrors = err.error.message;
        } else {
          this.serverErrors = "We could not complete your request. Please try again later.";
        }
      }
    );
  }

}
