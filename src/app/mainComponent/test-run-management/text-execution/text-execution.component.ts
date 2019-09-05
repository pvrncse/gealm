import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";

import Swal from 'sweetalert2';

import { ProjectsService } from "../../../service/projects.service";

@Component({
  selector: 'app-text-execution',
  templateUrl: './text-execution.component.html',
  styleUrls: ['./text-execution.component.css']
})

export class TextExecutionComponent implements OnInit, OnDestroy {
  projectId;
  testExecutions: any = [];
  loading = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

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
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.loadData();
  }

  loadData() {
    this.projectService.getExecutions().subscribe(
      (data) => {
        this.loading = false;
        this.testExecutions = data;
        console.log(this.testExecutions);
        this.dtTrigger.next();
      },
      err => {
        this.loading = false;
        console.log(err);
        this.projectService.errorFunction(err);
      }
    );
  }

  showExecTCs(runId) {
    this.router.navigateByUrl('/main/testRun/executionTCs/' + this.projectId + '/' + runId);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
