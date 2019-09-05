import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { UserService } from "../../service/user.service";
import { ComparePassword } from "./comparePassword";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  serverErrors: string;

  usernamePattern = '^[a-zA-Z][A-Za-z0-9_.]{2,13}$';
  emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern = '^(?=.{6,})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).*$';
  orgPattern = '^(?=.*[a-zA-Z].*)([a-zA-Z0-9_@.]+)$';
  mobilePattern = '^[0-9]{10}$';

  constructor(private userService: UserService, private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(this.usernamePattern)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern),
                  Validators.minLength(6), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required],
      organization: ['', [Validators.required, , Validators.pattern(this.orgPattern),
                  Validators.minLength(2), Validators.maxLength(50)]],
      mobileNo: ['', [Validators.required, Validators.pattern(this.mobilePattern)]]
    }, {
        validator: ComparePassword('password', 'confirmPassword')
      });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.registerForm.valid) {
      this.userService.postUser(this.registerForm.value)
        .subscribe(
          res => {
            console.log(res);
            Swal.fire({
              text: "Registration done successfully and confirmation mail sent to your registered mail id.",
              showConfirmButton: true,
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/login');
              }
            });
          },
          err => {
            this.loading = false;
            console.log(err);
            if (err.error.message) {
              this.serverErrors = err.error.message;
            } else {
              this.serverErrors = "We could not complete your request. Please try again later.";
            }
          }
        );
    } else {
      this.loading = false;
    }

  }

  // resetForm() {
  //   this.submitted = false;
  //   this.registerForm.reset();
  //   this.serverErrors = '';
  // }
}
