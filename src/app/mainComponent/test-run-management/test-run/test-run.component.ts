import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from '@angular/forms';

import Swal from 'sweetalert2';

import { ProjectsService } from "../../../service/projects.service";

@Component({
  selector: 'app-test-run',
  templateUrl: './test-run.component.html',
  styleUrls: ['./test-run.component.css']
})

export class TestRunComponent implements OnInit, OnDestroy {
  testRuns: any = [];
  projectId;
  suites = [];
  cases = [];
  addTestCaseForm: FormGroup;
  testCases = [];
  loading = false;
  isDisabled = true;
  isEnabled = true;
  loadModal = false;
  loadingAdd = false;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    background: '#F5F5F5',
    showConfirmButton: false,
    timer: 3000
  });

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private projectsService: ProjectsService, private router: Router, private formBuilder: FormBuilder,
     private route: ActivatedRoute) { }

  ngOnInit() {
    if (Swal.isVisible()) {
      Swal.close();
    }
    
    this.loading = true;

    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
      this.projectsService.projectId = this.projectId;
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: true,
      columnDefs: [
        { targets: [-1], orderable: false, searchable: false }
      ]
    };

    this.addTestCaseForm = this.formBuilder.group({
      order: null,
      platformId: null,
      testCaseId: [],
      testPlanId: '',
      testProjectId: this.projectId,
      urgency: null,
      version: "1"
    });

    this.loadData();

  }

  loadData() {
    this.projectsService.getTestRuns().subscribe(
      (data) => {
        this.loading = false;
        this.testRuns = data;
        this.dtTrigger.next();
      },
      err => {
        this.loading = false;
        console.log(err);
        this.projectsService.errorFunction(err);
      }
    );
  }

  showForm() {
    this.router.navigateByUrl('/main/testRun/createTestRun/' + this.projectId);
  }

  getDetails(testRun) {
    this.loadModal = true;
    this.isDisabled = true;
    console.log(testRun);
    this.addTestCaseForm.value.testPlanId = testRun.id;
    this.projectsService.testRunId = testRun.id;
    this.getSuiteList();
    this.getCasesList();
  }

  getSuiteList() {
    this.projectsService.remainingTestCaseInTestRun().subscribe(
      (data: any) => {
        this.loadModal = false;
        this.suites = data;
        // console.log(this.suites);
      },
      err => {
        this.loadModal = false;
        console.log(err);
        this.projectsService.errorFunction(err);
      }
    );
  }

  getCasesList() {
    this.projectsService.allTestCasesInTestRun().subscribe(
      (data: any) => {
        
        this.cases = data.result;
        // console.log(this.cases);
      },
      err => {
        
        console.log(err);
        this.projectsService.errorFunction(err);
      }
    );
  }

  onSelect(testCaseIds) {
    console.log(testCaseIds);
    this.testCases = testCaseIds;
    if (this.testCases.length)
      this.isDisabled = false;
    else
      this.isDisabled = true;
  }

  addTCs() {
    this.loadingAdd = true;
    this.addTestCaseForm.value.testCaseId = this.testCases;
    console.log(this.addTestCaseForm.value);

    this.projectsService.addTestcasesToTestrun(this.addTestCaseForm.value).subscribe(
      res => {
        this.loadingAdd = false;
        console.log(res);
        this.Toast.fire({
          type: 'success',
          title: 'Added successfully'
        });
      },
      err => {
        this.loadingAdd = false;
        console.log(err);
        this.projectsService.errorFunction(err);
      }
    );
  }

  onUncheck(e) {
    if (e.target.checked) {
      this.projectsService.testCases = this.projectsService.testCases.filter(
        caseId => caseId != e.target.id
      );
      if(this.projectsService.testCases.length) { this.isEnabled = false; }
      else { this.isEnabled = true; }
    } else {
      this.projectsService.testCases.push(e.target.id);
      if(this.projectsService.testCases.length) { this.isEnabled = false; }
      else { this.isEnabled = true; }
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
