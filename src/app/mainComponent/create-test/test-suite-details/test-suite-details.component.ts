import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';


import Swal from 'sweetalert2';

import { ProjectsService } from "../../../service/projects.service";

@Component({
  selector: 'app-test-suite-details',
  templateUrl: './test-suite-details.component.html',
  styleUrls: ['./test-suite-details.component.css']
})

export class TestSuiteDetailsComponent implements OnInit {
  testSuite = {};
  sub;
  projectId
  id;
  loading = false;

  constructor(private projectService: ProjectsService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (Swal.isVisible()) {
      Swal.close();
    }

    this.loading = true;

    this.sub = this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
      this.projectService.projectId = this.projectId;
      this.id = params['suiteId'];
      this.projectService.suiteId = this.id;
      // console.log(this.id);
      this.loadData();
    });

  }

  showCaseForm() {
    this.router.navigateByUrl('/main/createTest/createTestCase/' + this.projectId + '/' + this.id);
  }

  showSuiteForm() {
    this.router.navigateByUrl('/main/createTest/createTestSuite/' + this.projectId + '/' + this.id);
  }

  loadData() {
    this.projectService.getTestSuiteById().subscribe(
      data => {
        this.loading = false;
        this.testSuite = data;
        // this.testSuite = this.testSuite[0];
        console.log(this.testSuite);
      },
      err => {
        console.log(err);
        this.loading = false;
        this.projectService.errorFunction(err);
      })
  }

}
