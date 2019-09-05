import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { ProjectsService } from "../../../service/projects.service";

@Component({
	selector: 'app-test-case-details',
	templateUrl: './test-case-details.component.html',
	styleUrls: ['./test-case-details.component.css']
})

export class TestCaseDetailsComponent implements OnInit {
	testCase = {};
	show = false;
	projectId;
	suiteId;
	caseId;
	testCaseStepsForm: FormGroup;
	stepForm: FormGroup;
	submitted = false;
	loading = false;
	loadBtn = false;

	Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		background: '#F5F5F5',
		showConfirmButton: false,
		timer: 3000
	});

	constructor(private projectService: ProjectsService, private formBuilder: FormBuilder,
		private route: ActivatedRoute) { }

	ngOnInit() {
		if (Swal.isVisible()) {
      Swal.close();
    }

		this.loading = true;

		this.route.params.subscribe(params => {
			this.projectId = params['projectId'];
			this.suiteId = params['suiteId'];
			this.caseId = params['caseId'];
			this.projectService.projectId = this.projectId;
			this.projectService.suiteId = this.suiteId;
			this.projectService.caseId = this.caseId;
			console.log(this.suiteId);
			console.log(this.caseId);
			this.loadData();
		});

		this.testCaseStepsForm = this.formBuilder.group({
			testCaseId: '',
			testCaseExternalId: null,
			version: '',
			action: '',
			testCaseSteps: this.formBuilder.array([])
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

	loadData() {
		this.projectService.getTestCaseById().subscribe(
			data => {
				this.loading = false;
				this.testCase = data;
				// this.testCase = this.testCase[0];
				console.log(this.testCase);
			},
			err => {
				console.log(err);
				this.loading = false;
				this.projectService.errorFunction(err);
			});
	}

	get formControls() {
		return this.stepForm.controls;
	}

	addRow() {
		this.show = true;
	}

	getNumber() {
		let stepNumber: any = this.testCase['steps'];
		if (stepNumber.length) {
			stepNumber = stepNumber[stepNumber.length - 1];
			this.stepForm.value.number = stepNumber.number + 1;
			return (stepNumber.number + 1);
		} else {
			this.stepForm.value.number = 1;
			return 1;
		}
	}

	addStep() {
		this.loadBtn = true;
		this.submitted = true;

		if (this.stepForm.valid) {
			this.stepForm.value.executionType = this.testCase['executionType'];
			this.testCaseStepsForm.value.testCaseId = this.caseId;
			this.testCaseStepsForm.value.action = 'CREATE';
			this.testCaseStepsForm.value.version = '1';
			this.testCaseStepsForm.value.testCaseSteps.push(this.stepForm.value);
			// console.log(this.stepForm.value);
			console.log(this.testCaseStepsForm.value);

			this.projectService.createStep(this.testCaseStepsForm.value)
				.subscribe(
					res => {
						this.loadBtn = false;
						console.log(res);
						this.Toast.fire({
							type: 'success',
							title: 'Test Step created successfully'
						});
						this.loadData();
						this.show = false;
						this.submitted = false;
						this.stepForm.reset();
						this.testCaseStepsForm.reset();
					},
					err => {
						this.loadBtn = false;
						console.log(err);
						this.projectService.errorFunction(err);
					}
				);
		} else {
			this.loadBtn = false;
		}

	}

	discardStep() {
		this.show = false;
		this.stepForm.reset();
	}

}
