import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { ProjectsService } from "../../../service/projects.service";
import { UserService } from 'src/app/service/user.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-test-run',
  templateUrl: './create-test-run.component.html',
  styleUrls: ['./create-test-run.component.css']
})

export class CreateTestRunComponent implements OnInit {

  testRunForm: FormGroup;
  submitted = false;
  loading = false;
  projectId;
  projectName;
  serverErrors;

  namePattern = new RegExp(/^[a-zA-Z][a-zA-Z0-9\s._-]*$/);

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    background: '#F5F5F5',
    showConfirmButton: false,
    timer: 3000
  });

  constructor(private projectService: ProjectsService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    if (Swal.isVisible()) {
      Swal.close();
    }

    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
      this.projectService.projectId = this.projectId;

      this.testRunForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
        projectName: '',
        notes: ['', Validators.required],
        isActive: true,
        isPublic: true,
        customFields: []
      });
    });

    this.getProjectName();

  }

  get formControls() {
    return this.testRunForm.controls;
  }

  getProjectName() {
    this.projectService.getProjectById().subscribe(
      data => {
        
        this.projectName = data['name'];
      },
      err => {
        
        console.log(err);
        this.projectService.errorFunction(err);
      }
    );
  }

  onSubmit() {
    this.loading = true;
    this.submitted = true;

    if (this.testRunForm.valid) {
      this.testRunForm.value.projectName = this.projectName;
      console.log(this.testRunForm.value);

      this.projectService.createRun(this.testRunForm.value).subscribe(
        res => {
          console.log(res);
          this.Toast.fire({
            type: 'success',
            title: 'Test Run created successfully'
          });
          this.cancel();
        },
        err => {
          this.loading = false;
          console.log(err);
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
        }
      );
    } else {
      this.loading = false;
    }
  }

  cancel() {
    this.router.navigateByUrl('/main/testRun/testRunList/' + this.projectId);
  }

}
