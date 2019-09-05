import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import Swal from "sweetalert2";

import {
  CreateProject,
  TestSuite,
  TestCase,
  TestStep,
  TestRun,
  TestCaseInTestRun,
  Build
} from "../mainComponent/models/project.model";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class ProjectsService {
  projectId;
  suiteId;
  caseId;
  testRunId;
  buildId;
  testCases: Array<any> = [];

  // uri = "http://192.168.10.190:8080/api/";
  uri = "http://192.168.10.187:8080/api/testLink/";
  sublink = ["testLink/", "dashboard/"];

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  getHeader() {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    return header;
  }

  // HTTP Get Methods

  getProjects() {
    let headers = this.getHeader();
    return this.http.get(this.uri + this.sublink[0] + "getAllProject", {
      headers: headers
    });
  }

  getProjectDetails(pid) {
    let headers = this.getHeader();
    if (pid == "all") {
      return this.http.get(
        this.uri + this.sublink[1] + "getAllProjectDetails",
        {
          headers: headers
        }
      );
    } else {
      return this.http.get(this.uri + this.sublink[1] + "getProject/" + pid, {
        headers: headers
      });
    }
  }
  getProjectAssignedToMe(uid) {
    let headers = this.getHeader();
    return this.http.get(
      this.uri + this.sublink[0] + "getProjectAssignedToMe/" + uid,
      {
        headers: headers
      }
    );
  }

  getProjectById() {
    let headers = this.getHeader();
    return this.http.get(
      this.uri + this.sublink[0] + "getProjectById/" + this.projectId,
      {
        headers: headers
      }
    );
  }

  getAllTestSuites() {
    let headers = this.getHeader();
    return this.http.get(
      this.uri + this.sublink[0] + "getAllTestSuite/" + this.projectId,
      {
        headers: headers
      }
    );
  }

  getTestSuiteById() {
    let headers = this.getHeader();
    return this.http.get(
      this.uri +
        this.sublink[0] +
        "getTestSuiteById/" +
        this.projectId +
        "/" +
        this.suiteId,
      { headers: headers }
    );
  }

  getTestCaseById() {
    let headers = this.getHeader();
    return this.http.get(
      this.uri +
        this.sublink[0] +
        "getTestCaseById/" +
        this.suiteId +
        "/" +
        this.caseId,
      { headers: headers }
    );
  }

  getTestRuns() {
    let headers = this.getHeader();
    return this.http.get(
      this.uri + this.sublink[0] + "testRunInProject/" + this.projectId,
      {
        headers: headers
      }
    );
  }

  getTestRunById() {
    let headers = this.getHeader();
    return this.http.get(
      this.uri + this.sublink[0] + "testRunAllDetails/" + this.testRunId,
      {
        headers: headers
      }
    );
  }

  getTestCasesInSuite() {
    let headers = this.getHeader();
    return this.http.get(
      this.uri + this.sublink[0] + "getTestCaseInTestSuite/" + this.suiteId,
      {
        headers: headers
      }
    );
  }

  remainingTestCaseInTestRun() {
    let headers = this.getHeader();
    return this.http.get(
      this.uri +
        this.sublink[0] +
        "RemainingTcInTRun/" +
        this.projectId +
        "/" +
        this.testRunId,
      { headers: headers }
    );
  }

  allTestCasesInTestRun() {
    let headers = this.getHeader();
    return this.http.get(
      this.uri + this.sublink[0] + "TestCasesInTestRun/" + this.testRunId,
      {
        headers: headers
      }
    );
  }

  getBuilds() {
    let headers = this.getHeader();
    return this.http.get(
      this.uri + this.sublink[0] + "getBuild/" + this.testRunId,
      {
        headers: headers
      }
    );
  }

  getExecutions() {
    let headers = this.getHeader();
    return this.http.get(
      this.uri + this.sublink[0] + "getExecTestRunList/" + this.projectId,
      {
        headers: headers
      }
    );
  }

  getExecutionTestCases() {
    let headers = this.getHeader();
    return this.http.get(
      this.uri + this.sublink[0] + "getTestCasesForRun/" + this.testRunId,
      {
        headers: headers
      }
    );
  }

  getTestCaseForBuild() {
    let headers = this.getHeader();
    return this.http.get(
      this.uri +
        this.sublink[0] +
        "GetTestCaseForBuild/" +
        this.testRunId +
        "/" +
        this.buildId,
      { headers: headers }
    );
  }

  // HTTP Post Methods

  createProject(project: CreateProject) {
    let headers = this.getHeader();
    return this.http.post(
      this.uri + this.sublink[0] + "createProject",
      project,
      {
        headers: headers
      }
    );
  }

  createTestSuite(form: TestSuite) {
    let headers = this.getHeader();
    console.log(form);
    return this.http.post(
      this.uri + this.sublink[0] + "createTestSuite",
      form,
      {
        headers: headers
      }
    );
  }

  createTestCase(form: TestCase) {
    let headers = this.getHeader();
    console.log(form);
    return this.http.post(
      this.uri + this.sublink[0] + "createTestcases",
      form,
      {
        headers: headers
      }
    );
  }

  createStep(form: TestStep) {
    let headers = this.getHeader();
    return this.http.post(this.uri + this.sublink[0] + "createTestStep", form, {
      headers: headers
    });
  }

  saveUserApiKey(data) {
    console.log(data);
    let headers = this.getHeader();
    return this.http.post(this.uri + this.sublink[0] + "userApikey", data, {
      headers: headers
    });
  }

  updateProject(form) {
    let headers = this.getHeader();
    console.log(form);
  }

  createRun(form: TestRun) {
    let headers = this.getHeader();
    return this.http.post(this.uri + this.sublink[0] + "createTestRun", form, {
      headers: headers
    });
  }

  addTestcasesToTestrun(form: TestCaseInTestRun) {
    let headers = this.getHeader();
    return this.http.post(
      this.uri + this.sublink[0] + "addTestCasesToTestRun",
      form,
      {
        headers: headers
      }
    );
  }

  createBuild(form: Build) {
    let headers = this.getHeader();
    return this.http.post(this.uri + this.sublink[0] + "createBuild", form, {
      headers: headers
    });
  }

  getExecutionSteps(model) {
    let headers = this.getHeader();
    return this.http.post(
      this.uri + this.sublink[0] + "getTestCaseSteps",
      model,
      {
        headers: headers
      }
    );
  }

  // Error function

  errorFunction(err) {
    if (err.status == 401) {
      Swal.fire({
        width: "400px",
        padding: "0px 0px 10px 0px",
        type: "error",
        text: "Your session is expired. Please login again.",
        showConfirmButton: false,
        timer: 2000
      });
      this.userService.deleteAccessToken();
      this.router.navigateByUrl("/login");
    } else if (err.status == 0) {
      Swal.fire({
        width: "450px",
        padding: "0px 10px 15px",
        type: "error",
        text:
          "GES-ALM is temporarily down. Sorry for the inconvenience. Please try after some time.",
        showConfirmButton: false,
        showCloseButton: true
      });
    } else if (err.error.message) {
      Swal.fire({
        width: "400px",
        text: err.error.message,
        type: "error",
        showConfirmButton: false,
        showCloseButton: true
      });
    } else {
      Swal.fire({
        width: "400px",
        text: "Something went wrong. Please try again later.",
        type: "error",
        showConfirmButton: false,
        showCloseButton: true
      });
    }
  }
}
