import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { ProjectsService } from "../../../service/projects.service";
import { CreateTestComponent } from "../create-test.component";
import { UserService } from 'src/app/service/user.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-test-case',
  templateUrl: './create-test-case.component.html',
  styleUrls: ['./create-test-case.component.css']
})

export class CreateTestCaseComponent implements OnInit {

  testCaseForm: FormGroup;
  stepForm: FormGroup;
  submitted = false;
  loading = false;
  serverErrors: string;
  projectId;
  suiteId;
  show = false;
	stepsArray = [];

  namePattern = new RegExp(/^[a-zA-Z][a-zA-Z0-9\s._-]*$/);

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    background: '#F5F5F5',
    showConfirmButton: false,
    timer: 3000
  });

  constructor(private projectService: ProjectsService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute, private userService: UserService,
    private parent: CreateTestComponent) { }

  ngOnInit() {
    if (Swal.isVisible()) {
      Swal.close();
    }

    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
      this.projectService.projectId = this.projectId;
      this.suiteId = params['suiteId'];
      this.projectService.suiteId = this.suiteId;
    });

    this.testCaseForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      summary: ['', Validators.required],
      preconditions: ['', Validators.required],
      testCaseStatus: ['', Validators.required],
      executionStatus: null,
      testImportance: ['', Validators.required],
      executionType: ['', Validators.required],
      // executionTime: ['', Validators.required],
      testSuiteId: this.suiteId,
      testProjectId: this.projectId,
      authorLogin: this.userService.getUserName(),
      steps: this.formBuilder.array([]),
      executionOrder: null,
      order: null,
      internalId: null,
      fullExternalId: null,
      checkDuplicatedName: null,
      actionOnDuplicatedName: null,
      versionId: null,
      version: null,
      parentId: null,
      customFields: []
    });

    this.stepForm = this.formBuilder.group({
			testCaseVersionId: null,
			number: '',
			actions: ['', Validators.required],
			expectedResults: ['', Validators.required],
			active: '',
			executionType: ''
		});

  }

  get formControls() {
    return this.testCaseForm.controls;
  }

  get stepControls() {
		return this.stepForm.controls;
	}

	addRow() {
		this.show = true;
  }
  
  getNumber() {
		let stepNumber: any = this.stepsArray.length;
		if (stepNumber) {
			stepNumber = stepNumber + 1;
			this.stepForm.value.number = stepNumber;
			return (stepNumber);
		} else {
			this.stepForm.value.number = 1;
			return 1;
		}
  }
  
  addStep() {
		this.submitted = true;

		if (this.testCaseForm.valid) {
			if (this.stepForm.valid) {
				this.stepForm.value.active = 'true';
				this.stepForm.value.executionType = this.testCaseForm.value.executionType;
				this.stepsArray.push(this.stepForm.value);
				this.testCaseForm.value.steps.push(this.stepForm.value);
				console.log(this.stepsArray);
				this.show = false;
				this.stepForm.reset();
				this.submitted = false;
			}
		} else {
			this.serverErrors = "Please fill out the Test Case details before adding step."
		}
	}

	discardStep() {
		this.stepForm.reset();
		this.show = false;
	}

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    console.log(this.testCaseForm.value);

    if (this.testCaseForm.valid) {
      this.projectService.createTestCase(this.testCaseForm.value)
        .subscribe(
          res => {
            console.log(res);
            this.Toast.fire({
              type: 'success',
              title: 'Test Case created successfully'
            });
            this.cancel();
            this.parent.loadData();
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
    this.router.navigateByUrl('/main/createTest/testSuiteDetails/' + this.projectId + '/' + this.suiteId);
  }
}
