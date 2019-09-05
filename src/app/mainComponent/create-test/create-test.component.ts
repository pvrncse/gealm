import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpParams } from "@angular/common/http";

import Swal from 'sweetalert2';

import { TestSuite } from "../models/project.model";
import { ProjectsService } from "../../service/projects.service";
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})

export class CreateTestComponent implements OnInit {
  private data;
  project = {};
  testSuites: TestSuite[] = [];
  sub;
  projectId;
  loading = false;

  constructor(private projectService: ProjectsService, private router: Router,
     private userService: UserService) { }

  ngOnInit() {
    this.loading = true;

    this.projectId = this.getParamValueQueryString(this.projectId);
    this.projectId = this.projectId[0];
    // console.log(this.projectId);

    this.projectService.projectId = this.projectId;
    // console.log(this.projectService.projectId);
    this.projectService.getProjectById().subscribe(data => {
      this.project = data;
      // console.log(this.project);
    })

    this.loadData();
  }

  getParamValueQueryString(projectId) {
    const url = window.location.href;
    console.log(url);
    let paramValue;
    if (url.includes('/')) {
      const httpParams = new HttpParams({ fromString: url.split('/')[6] });
      // console.log(httpParams);
      paramValue = httpParams.keys();
    }
    return paramValue;
  }

  showDetails() {
    this.router.navigateByUrl('/main/createTest/projectDetails/' + this.projectId);
  }

  loadData() {
    this.projectService.getAllTestSuites().subscribe(
      data => {
        this.loading = false;
        this.data = data;
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
            Swal.fire ({
              text: err.error.message,
              type: 'warning',
              padding: '0px 10px 10px',
              showConfirmButton: true,
              confirmButtonText: 'Yes',
              showCancelButton: true,
              cancelButtonColor: '#d33',
              cancelButtonText: 'No',
              allowOutsideClick: false
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/main/createTest/createTestSuite/' + this.projectId + '/' + this.projectId);
              }
            });  
          } else {
          Swal.fire({
            text: "Something went wrong. Please try again later.",
            type: 'error',
            showConfirmButton: false,
            showCloseButton: true
          });
        }
      })
  }

}
