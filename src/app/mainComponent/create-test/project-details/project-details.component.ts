import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import Swal from 'sweetalert2';

import { ProjectsService } from "../../../service/projects.service";


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})

export class ProjectDetailsComponent implements OnInit {
  project = {};
  projectId;
  loading = false;

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

      this.loadData();

    });

  }

  showForm(projectId) {
    this.router.navigateByUrl('/main/createTest/createTestSuite/' + projectId + '/' + projectId);
  }

  loadData() {
    this.projectService.getProjectById().subscribe(
      data => {
        this.loading = false;
        this.project = data;
        // console.log(this.project);
      },
      err => {
        console.log(err);
        this.loading = false;
        this.projectService.errorFunction(err);
      });
  }

}


