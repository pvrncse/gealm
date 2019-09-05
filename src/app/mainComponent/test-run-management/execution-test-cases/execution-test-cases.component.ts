import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";


import Swal from 'sweetalert2';

import { ProjectsService } from "../../../service/projects.service";

@Component({
  selector: 'app-execution-test-cases',
  templateUrl: './execution-test-cases.component.html',
  styleUrls: ['./execution-test-cases.component.css']
})

export class ExecutionTestCasesComponent implements OnInit, OnDestroy {
  projectId;
  runId;
  testRun:any = [];
  runObj;
  builds;
  buildId;
  testCases;
  loading = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private projectService: ProjectsService, private router: Router,
     private route: ActivatedRoute) { }

  ngOnInit() {
    if (Swal.isVisible()) {
      Swal.close();
    }

    this.loading = true;

    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
      this.projectService.projectId = this.projectId;
      this.runId = params['runId'];
      this.projectService.testRunId = this.runId;
    });

    this.loadBuilds();
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

  }

  loadBuilds() {
    this.projectService.getExecutionTestCases().subscribe(
      (data) => {
        this.testRun = data;
        this.builds = data['build'];
        console.log(data);

        if (!data['status']) {
          this.loading = false;
          Swal.fire({
            text: "Currently there are no builds for this Test Run. Would you like to create one?",
            type: 'warning',
            showConfirmButton: true,
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.router.navigateByUrl('/main/testRun/createBuild/' + this.projectId);
            }
          });
        } else {
          this.buildId = this.builds[0].id;
          this.projectService.buildId = this.buildId;
          this.loadTCs();
        }
      },
      err => {
        this.loading = false;
        console.log(err);
        this.projectService.errorFunction(err);
      }
    );
  }

  loadTCs() {
    this.projectService.getTestCaseForBuild().subscribe(
      (data) => {
        this.loading = false;
        this.testCases = data;
        this.dtTrigger.next();
        console.log(this.testCases);
      },
      err => {
        this.loading = false;
        console.log(err);
        this.projectService.errorFunction(err);
      }
    );
  }

  selectBuild(e) {
    console.log(e.target.value);
    this.buildId = e.target.value;
    this.projectService.buildId = this.buildId;
    this.dtTrigger.unsubscribe();
    this.loadTCs();
  }

  execSteps(testcase) {
    console.log(testcase);
    this.router.navigateByUrl('/main/testRun/executionSteps/' + this.projectId + '/' + this.runId + '/' + this.buildId + '/' + testcase.id + '/' + testcase.version + '/' + testcase.externalId);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
