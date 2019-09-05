import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { ProjectsService } from "../../../service/projects.service";

@Component({
  selector: 'app-execution-test-steps',
  templateUrl: './execution-test-steps.component.html',
  styleUrls: ['./execution-test-steps.component.css']
})

export class ExecutionTestStepsComponent implements OnInit, OnDestroy {
  projectId;
  runId;
  buildId;
  caseId;
  caseVersion;
  caseExternalId;
  testcase:any = [];
  steps;
  executionForm: FormGroup;
  loading = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private projectService: ProjectsService, private router: Router, private formBuilder: FormBuilder,
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
      this.buildId = params['buildId'];
      this.projectService.testRunId = this.buildId;
      this.caseId = params['caseId'];
      this.projectService.testRunId = this.caseId;
      this.caseVersion = params['version'];
      this.caseExternalId = params['exId'];
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.loadData();

    this.executionForm = this.formBuilder.group({
      bugId: null,
      buildId: this.buildId,
      buildName: null,
      customFields: {},
      executionDuration: 0,
      guess: true,
      notes: "string",
      overwrite: true,
      platformId: 0,
      platformName: null,
      status: "n",
      steps: this.formBuilder.array([this.formBuilder.group({
        notes: ['', Validators.required],
        number: '',
        result: ['', Validators.required]
      })]),
      testCaseExternalId: this.caseExternalId,
      testCaseId: this.caseId,
      testPlanId: this.runId,
      timestamp: null,
      user: "admin"
    });

  }

  loadData() {
    let model = {
      "testCaseExternalId": this.caseExternalId,
      "testcaseId": this.caseId,
      "version": this.caseVersion
    }

    this.projectService.getExecutionSteps(model).subscribe(
      res => {
        console.log(res);
        this.testcase = res;
        this.loading = false;
        console.log(res['steps']);
        this.steps = res['steps'];
        this.dtTrigger.next();
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  onSubmit() {
    console.log(this.executionForm.value);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
