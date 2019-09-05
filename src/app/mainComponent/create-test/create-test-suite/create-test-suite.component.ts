import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { ProjectsService } from "../../../service/projects.service";
import { CreateTestComponent } from "../create-test.component";

import Swal from 'sweetalert2';

import { UserService } from 'src/app/service/user.service';


@Component({
	selector: 'app-create-test-suite',
	templateUrl: './create-test-suite.component.html',
	styleUrls: ['./create-test-suite.component.css']
})

export class CreateTestSuiteComponent implements OnInit {

	testSuiteForm: FormGroup;
	submitted = false;
	loading = false;
	projectId;
	parentSuiteId;
	serverErrors: string;

	namePattern = new RegExp(/^[a-zA-Z][a-zA-Z0-9\s._-]*$/);

	Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		background: '#F5F5F5',
		showConfirmButton: false,
		timer: 2000
	});

	constructor(private projectService: ProjectsService, private formBuilder: FormBuilder,
		private router: Router, private parent: CreateTestComponent, private route: ActivatedRoute,
		 private userService: UserService) { }

	ngOnInit() {
		if (Swal.isVisible()) {
      Swal.close();
    }

		this.route.params.subscribe(params => {
			this.projectId = params['projectId'];
			this.projectService.projectId = this.projectId;
			this.parentSuiteId = params['parentSuiteId'];
			this.projectService.suiteId = this.parentSuiteId;
		});

		this.testSuiteForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
			details: ['', Validators.required],
			testProjectId: this.projectId,
			parentId: this.parentSuiteId,
			order: null,
			checkDuplicatedName: null,
			actionOnDuplicatedName: null,
		});

	}

	// showForm() {
	//   let showDiv = document.getElementById('create-test-suite');
	//   if (showDiv.style.display === 'none') {
	//     showDiv.style.display = 'block';
	//   } else {
	//     showDiv.style.display = 'none';
	//   }
	// }

	get formControls() {
		return this.testSuiteForm.controls;
	}

	onSubmit() {
		this.loading = true;
		this.submitted = true;
		console.log(this.testSuiteForm.value);

		if (this.testSuiteForm.valid) {
			this.projectService.createTestSuite(this.testSuiteForm.value)
				.subscribe(
					res => {
						
						console.log(res);
						this.Toast.fire({
							type: 'success',
							title: 'Test Suite created successfully'
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
		this.router.navigateByUrl('/main/createTest/projectDetails/' + this.projectId);
	}

}

