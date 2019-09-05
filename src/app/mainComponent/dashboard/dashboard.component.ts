import { Component, OnInit } from "@angular/core";
// import { Project } from "../models/project.model";
import { CommonService } from "../../service/common.service";
import { ProjectsService } from "../../service/projects.service";
import { EventsService } from "../../service/events.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  loading = false;
  activityLoading = false;
  assignLoading = false;
  projects: any = [];
  chartData: any = {};
  projectInfo: any = {};
  activityLogs: any = [];
  projectsAssignedToMe: any = [];
  userName: string = localStorage.getItem("user");
  tempLoopForProjects: any = [
    { name: "Project Name", users: ["user1", "user2", "user3"] },
    { name: "Project Name", users: ["user4", "user5", "user6"] },
    { name: "Project Name", users: ["user7", "user8", "user9"] },
    { name: "Project Name", users: ["user10", "user11", "user12"] }
  ];
  constructor(
    private projectsService: ProjectsService,
    private eventsService: EventsService,
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.getProjectList();
    this.getProjectDeatils("all");
    this.getEventsList();
    this.getProjectAssignedToMe();
  }
  getProjectList() {
    this.projectsService.getProjects().subscribe(
      data => {
        this.projects = data;
        this.projects.unshift({ name: "all", id: "all" });
      },
      err => {
        console.log(err);
        this.commonService.errorFunction(err);
      }
    );
  }
  getEventsList() {
    this.activityLoading = true;
    this.eventsService.getEventsList().subscribe(
      data => {
        console.log(data);
        this.activityLogs = data;
        this.activityLoading = false;
      },
      err => {
        console.log(err);
        this.commonService.errorFunction(err);
      }
    );
  }
  getProjectAssignedToMe() {
    this.assignLoading = true;
    this.projectsService.getProjectAssignedToMe(this.userName).subscribe(
      (data: any) => {
        console.log(data);
        this.projectsAssignedToMe = data.projects;
        this.assignLoading = false;
      },
      err => {
        console.log(err);
        this.commonService.errorFunction(err);
      }
    );
  }
  getProjectDeatils(pid) {
    this.loading = true;
    this.projectsService.getProjectDetails(pid).subscribe(
      data => {
        this.getChartData(data);
        this.projectInfo = data;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.commonService.errorFunction(err);
      }
    );
  }
  getChartData(data) {
    this.chartData = {};
    this.chartData.doughnutChartLabels = [
      "Failed",
      "Passed",
      "Blocked",
      "Not Run"
    ];
    // this.chartData.doughnutChartData = [
    //   data.totalTestCaseFail,
    //   data.totalTestCasePass,
    //   data.totalTestCaseBlocked,
    //   data.totalTestCaseNotRun
    // ];
    //[data]="chartData.doughnutChartData" //in HTML
    //[colors]="chartData.backgroundColor" //in HTML
    this.chartData.datasets = [
      {
        data: [
          data.totalTestCaseFail,
          data.totalTestCasePass,
          data.totalTestCaseBlocked,
          data.totalTestCaseNotRun
        ],
        backgroundColor: ["#E2EC21", "#25A211", "#7C14B8", "#11E1DE"]
      }
    ];
    this.chartData.doughnutChartType = "doughnut";
    this.chartData.legend = true;
    // this.chartData.backgroundColor = ["red", "green", "white", "blue"];
    this.chartData.options = {
      legend: { position: "bottom" }
      // backgroundColor: ["#2ecc71", "#3498db", "#95a5a6", "#9b59b6"]
    };
  }
  getCurrentProjectInfo(e) {
    // console.log(e.target.value);
    this.getProjectDeatils(e.target.value);
  }
}
