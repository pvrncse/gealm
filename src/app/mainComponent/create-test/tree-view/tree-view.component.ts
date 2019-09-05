import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})

export class TreeViewComponent implements OnInit {
  @Input() details = {};
  collapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toggleIcon() {
    this.collapsed = !this.collapsed;
  }

  showSuiteDetails(suite) {
    // console.log(suite);
    this.router.navigateByUrl('/main/createTest/testSuiteDetails/' + suite.testProjectId + '/' + suite.id );
  }

  showCaseDetails(testcase) {
    // console.log(testcase);
    this.router.navigateByUrl('/main/createTest/testCaseDetails/' + testcase.testProjectId + '/' + testcase.testSuiteId + '/' + testcase.id );
  }

}
