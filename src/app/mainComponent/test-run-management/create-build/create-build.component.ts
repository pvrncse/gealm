import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { ProjectsService } from "../../../service/projects.service";
import { UserService } from 'src/app/service/user.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-build',
  templateUrl: './create-build.component.html',
  styleUrls: ['./create-build.component.css']
})

export class CreateBuildComponent implements OnInit {
  buildForm: FormGroup;
  projectId;
  submitted = false;
  loading = false;
  testRuns;
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
    private router: Router, private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    if (Swal.isVisible()) {
      Swal.close();
    }

    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
      this.projectService.projectId = this.projectId;
    });

    this.buildForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      testPlanId: ['', Validators.required],
      notes: ['', Validators.required],
      // isActive: true,
      // isOpen: true,
      // closedDate: '',
      // releaseDate: ''
    });

    this.getTestRuns();
  }

  get formControls() {
    return this.buildForm.controls;
  }

  getTestRuns() {
    this.projectService.getTestRuns().subscribe(
      (data) => {
        
        this.testRuns = data;
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

    if (this.buildForm.valid) {
      console.log(this.buildForm.value);

      this.projectService.createBuild(this.buildForm.value).subscribe(
        res => {
          
          console.log(res);
          this.Toast.fire({
            type: 'success',
            title: 'Build created successfully'
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
    this.router.navigateByUrl('/main/testRun/builds/' + this.projectId);
  }
}
