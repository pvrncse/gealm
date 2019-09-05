import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";

import Swal from 'sweetalert2';

import { ProjectsService } from "../../service/projects.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  projects: any = [];
  loading = false;

  dtTrigger: Subject<any> = new Subject();
  constructor(private projectsService: ProjectsService, private router: Router) { }

  ngOnInit() {
    if (Swal.isVisible()) {
      Swal.close();
    }

    this.loading = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: true,
      columnDefs: [
        { targets: [-1], orderable: false, searchable: false }
      ]
    };
    this.getProjectList();
  }

  getProjectList() {
    this.projectsService.getProjects()
      .subscribe(
        (data) => {
          this.loading = false;
          this.projects = data;
          this.dtTrigger.next();
        },
        err => {
          this.loading = false;
          console.log(err);
          this.projectsService.errorFunction(err);
        }
      );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  showForm() {
    this.router.navigateByUrl('/main/createProject');
  }

  showProjectDetails(projectId) {
    this.projectsService.projectId = projectId;
    console.log(projectId);
    // this.projectsService.getProjectById();
    this.router.navigateByUrl('/main/createTest/projectDetails/' + projectId);
  }

  showTestRuns(projectId) {
    this.projectsService.projectId = projectId;
    this.router.navigateByUrl('/main/testRun/testRunList/' + projectId);
  }

  // edit(projectId) {
  //   this.router.navigateByUrl('/main/editProject/' + projectId);
  // }

  // delete(projectId) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     type: 'warning',
  //     showConfirmButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     showCancelButton: true,
  //     cancelButtonColor: '#d33'
  //   }).then ((result) => {
  //     if (result.value) {
  //       Swal.fire(
  //         'Deleted!',
  //         'Project has been deleted.',
  //         'success'
  //       )
  //     }
  //   });

  // }
}
