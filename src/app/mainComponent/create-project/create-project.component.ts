import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import Swal from 'sweetalert2';

import { ProjectsService } from 'src/app/service/projects.service';
import { Project } from "../models/project.model";
import { UserService } from 'src/app/service/user.service';


@Component({
	selector: 'app-create-project',
	templateUrl: './create-project.component.html',
	styleUrls: ['./create-project.component.css']
})

export class CreateProjectComponent implements OnInit {

	createProjectForm: FormGroup;
	submitted = false;
	loading = false;
	serverErrors: string;
	projects: Project[] = [];

	namePattern = new RegExp(/^[a-zA-Z][a-zA-Z0-9\s._-]*$/);

	Toast = Swal.mixin({
		toast: true,
		position: 'bottom-end',
		background: '#fff',
		showConfirmButton: false,
		timer: 3000,
		animation: false,
		customClass: {
			popup: 'animated slideInLeft'
		}
	});

	constructor(private projectService: ProjectsService, private formBuilder: FormBuilder,
		private router: Router, private userService: UserService) { }

	ngOnInit() {
		if (Swal.isVisible()) {
      Swal.close();
    }

		this.createProjectForm = this.formBuilder.group({
			existProject: [],
			name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
			prefix: ['', Validators.required],
			notes: ['', [Validators.required]],
			requirement: [],
			testPriority: [],
			testAutomation: [],
			inventory: [],
			active: [],
			public: []
		});

		this.getProjectList();

	}

	get formControls() {
		return this.createProjectForm.controls;
	}

	getProjectList() {
		this.projectService.getProjects()
			.subscribe(
				(data: Project[]) => {
					this.projects = data;
				},
				err => {
					console.log(err);
					this.projectService.errorFunction(err);
				}
			);
	}

	projectDetails(projectId) {
		this.projectService.projectId = projectId;
		this.router.navigateByUrl('/main/createTest/projectDetails/' + projectId);
	}

	onSubmit() {
		console.log(this.createProjectForm.value);
		this.submitted = true;
		this.loading = true;

		if (this.createProjectForm.valid) {
			this.projectService.createProject(this.createProjectForm.value).subscribe(
				res => {
					console.log(res);
					this.Toast.fire({
						type: 'success',
						title: 'Project created successfully'
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
		this.router.navigateByUrl('/main/projects');
	}

}
