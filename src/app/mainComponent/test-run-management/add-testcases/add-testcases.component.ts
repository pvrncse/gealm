import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProjectsService } from "../../../service/projects.service";
import { TestRunComponent } from '../test-run/test-run.component';

@Component({
  selector: 'app-add-testcases',
  templateUrl: './add-testcases.component.html',
  styleUrls: ['./add-testcases.component.css']
})

export class AddTestcasesComponent implements OnInit {
  @Input() details = {};
  @Output() selectedCases = new EventEmitter<any>();

  collapsed = true;

  constructor(private projectService: ProjectsService, private parent: TestRunComponent) { }

  ngOnInit() {
    this.projectService.testCases = [];
  }

  toggleIcon() {
    this.collapsed = !this.collapsed;
  }

  onSelect(e) {
    this.parent.onSelect(e);
  }

  add(e) {
    console.log(e.target.id);
    if (e.target.checked) {
      this.projectService.testCases.push(e.target.id);
      this.selectedCases.emit(this.projectService.testCases);
    } else {
      this.projectService.testCases = this.projectService.testCases.filter(
        caseId => caseId != e.target.id
      );
      this.selectedCases.emit(this.projectService.testCases);
    }
  }

  addAll(e) {
    if (e.target.checked) {
      console.log(e.target.id);
    } else {
      console.log(e.target.checked);
    }
  }

}
