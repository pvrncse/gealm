import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import Swal from 'sweetalert2';

import { UserService } from "../../service/user.service";
import { ComparePassword } from "../register/comparePassword";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  loading = false;
  token;
  serverErrors;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
			this.token = params['token'];
		});

    this.resetForm = this.formBuilder.group({
      token: this.token,
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required],
    }, {
        validator: ComparePassword('password', 'confirmPassword')
      });
  }

  get formControls() {
    return this.resetForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.resetForm.valid) {
      console.log(this.resetForm.value);
      
      this.userService.resetPassword(this.resetForm.value).subscribe(
        res => {
          console.log(res);
          Swal.fire({
            text: res['message'],
            type: 'success',
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigateByUrl('/login');
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
    } else {
      this.loading = false;
    }

  }



}
