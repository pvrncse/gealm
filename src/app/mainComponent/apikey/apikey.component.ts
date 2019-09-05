import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import Swal from 'sweetalert2';

import { ProjectsService } from 'src/app/service/projects.service';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-apikey',
  templateUrl: './apikey.component.html',
  styleUrls: ['./apikey.component.css']
})

export class ApikeyComponent implements OnInit {
  apikeyForm: FormGroup;
  submitted = false;
  loading = false;
  serverErrors;

  constructor(private projectService: ProjectsService, private formBuilder: FormBuilder,
    private router: Router, private userService: UserService) { }

  ngOnInit() {
    if (Swal.isVisible()) {
      Swal.close();
    }

    this.apikeyForm = this.formBuilder.group({
      username: [],
      apiKey: []
    });
  }

  get formControls() {
    return this.apikeyForm.controls;
  }

  onSubmit() {
    console.log(this.apikeyForm.value);
    this.submitted = true;
    this.loading = true;

    if (this.apikeyForm.valid) {
      this.projectService.saveUserApiKey(this.apikeyForm.value).subscribe(
        res => {
          console.log(res);
          this.router.navigateByUrl('/main/projects');
        },
        err => {
          this.loading  = false;
          if (err.status == 401) {
            Swal.fire({
              width: '400px',
              padding: '0px 0px 10px 0px',
              type: 'error',
              text: 'Your session is expired. Please login again.',
              showConfirmButton: false,
              timer: 2000
            });
            this.userService.deleteAccessToken();
            this.router.navigateByUrl('/login');
          } else if (err.error.message) {
            this.serverErrors = err.error.message;
          } else {
            this.serverErrors = err.name;
          }
        });
    } else {
      this.loading = false;
    }
  }

}


