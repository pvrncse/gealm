import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";


import Swal from 'sweetalert2';

import { ProjectsService } from "../../../service/projects.service";

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.css']
})

export class BuildsComponent implements OnInit, OnDestroy {
  projectId;
  builds: any = [];
  loading = false;
  testRuns;
  testRunId;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private projectsService: ProjectsService, private router: Router,
     private route: ActivatedRoute) { }

  ngOnInit() {
    if (Swal.isVisible()) {
      Swal.close();
    }

    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
      this.projectsService.projectId = this.projectId;
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.getTestRuns();
  }

  loadData() {
    this.loading = true;

    this.projectsService.getBuilds().subscribe(
      (data) => {
        this.loading = false;
        this.builds = data;
        console.log(data);
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
    this.router.navigateByUrl('/main/testRun/createBuild/' + this.projectId);
  }

  getTestRuns() {
    this.projectsService.getTestRuns().subscribe(
      (data) => {
        this.testRuns = data;

        if (this.testRuns.length) {
          this.projectsService.testRunId = this.testRuns[0].id;
          this.loadData();
        } else {
          console.log('no data');
          this.loading = false;
          Swal.fire({
            text: "Currently there are no test runs for this project. Would you like to create one?",
            type: 'warning',
            showConfirmButton: true,
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.router.navigateByUrl('/main/testRun/createTestRun/' + this.projectId);
            }
          });
        }
      },
      err => {
        this.loading = false;
        console.log(err);
        this.projectsService.errorFunction(err);
      }
    );
  }

  selectRun(e) {
    this.testRunId = e.target.value;
    this.projectsService.testRunId = this.testRunId;
    this.ngOnDestroy();
    this.loadData();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
