import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpParams } from "@angular/common/http";

import Swal from 'sweetalert2';

import { ProjectsService } from "../../service/projects.service";

@Component({
  selector: 'app-test-run-management',
  templateUrl: './test-run-management.component.html',
  styleUrls: ['./test-run-management.component.css']
})

export class TestRunManagementComponent implements OnInit {
  projectId;
  project = {};

  constructor(private projectService: ProjectsService, private router: Router) { }

  ngOnInit() {
    if (Swal.isVisible()) {
      Swal.close();
    }

    this.projectId = this.getParamValueQueryString();
    this.projectId = this.projectId[0];
    this.projectService.projectId = this.projectId;

    this.loadData();
  }

  getParamValueQueryString() {
    const url = window.location.href;
    let paramValue;
    if (url.includes('/')) {
      const httpParams = new HttpParams({ fromString: url.split('/')[6] });
      paramValue = httpParams.keys();
    }
    return paramValue;
  }

  loadData() {
    this.projectService.getProjectById().subscribe(
      data => {
        this.project = data;
        console.log(this.project);
      },
      err => {
        console.log(err);
        this.projectService.errorFunction(err);
      });
  }

}
