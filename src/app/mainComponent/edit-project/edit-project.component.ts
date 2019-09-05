import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";


import Swal from 'sweetalert2';

import { ProjectsService } from 'src/app/service/projects.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})

export class EditProjectComponent implements OnInit {
  editProjectForm: FormGroup;
  submitted = false;
  serverErrors: string;
  project = {};
  projectId;

  constructor(private projectService: ProjectsService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute) {
    this.createForm();
  }

  createForm() {
    this.editProjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      prefix: ['', Validators.required],
      notes: ['', [Validators.required, Validators.minLength(6)]],
      requirement: false,
      testPriority: false,
      testAutomation: false,
      inventory: false,
      active: false,
      public: false
    });
  }

  ngOnInit() {
    
    
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
      this.projectService.projectId = this.projectId;

      this.loadData();
    });
  }

  get formControls() {
    return this.editProjectForm.controls;
  }

  loadData() {
    this.projectService.getProjectById().subscribe(
      data => {
        
        this.project = data;
        console.log(this.project);
      },
      err => {
        console.log(err);
        
        Swal.fire({
          text: "Something went wrong. Please try again later.",
          type: 'error',
          showConfirmButton: true,
        });
      });
  }

  cancel() {
    this.router.navigateByUrl('/main/projects');
  }

  onSubmit() {
    this.projectService.updateProject(this.editProjectForm.value);
    this.cancel();
  }

}
