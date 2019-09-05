import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { DataTablesModule } from "angular-datatables";
import { ChartsModule } from "ng2-charts";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./loginComponent/login/login.component";
import { RegisterComponent } from "./loginComponent/register/register.component";
import { ResetPasswordComponent } from "./loginComponent/reset-password/reset-password.component";
import { ForgotPasswordComponent } from "./loginComponent/forgot-password/forgot-password.component";

import { MainComponent } from "./mainComponent/main.component";
import { DashboardComponent } from "./mainComponent/dashboard/dashboard.component";
import { ProjectsComponent } from "./mainComponent/projects/projects.component";
import { CreateProjectComponent } from "./mainComponent/create-project/create-project.component";
import { EditProjectComponent } from "./mainComponent/edit-project/edit-project.component";
import { CreateTestComponent } from "./mainComponent/create-test/create-test.component";
import { CreateTestSuiteComponent } from "./mainComponent/create-test/create-test-suite/create-test-suite.component";
import { CreateTestCaseComponent } from "./mainComponent/create-test/create-test-case/create-test-case.component";
import { ProjectDetailsComponent } from "./mainComponent/create-test/project-details/project-details.component";
import { TestSuiteDetailsComponent } from "./mainComponent/create-test/test-suite-details/test-suite-details.component";
import { TestCaseDetailsComponent } from "./mainComponent/create-test/test-case-details/test-case-details.component";
import { TreeViewComponent } from "./mainComponent/create-test/tree-view/tree-view.component";
import { ApikeyComponent } from "./mainComponent/apikey/apikey.component";
import { TestRunManagementComponent } from "./mainComponent/test-run-management/test-run-management.component";
import { TestRunComponent } from "./mainComponent/test-run-management/test-run/test-run.component";
import { CreateTestRunComponent } from "./mainComponent/test-run-management/create-test-run/create-test-run.component";
import { AddTestcasesComponent } from "./mainComponent/test-run-management/add-testcases/add-testcases.component";
import { BuildsComponent } from "./mainComponent/test-run-management/builds/builds.component";
import { CreateBuildComponent } from "./mainComponent/test-run-management/create-build/create-build.component";
import { TextExecutionComponent } from "./mainComponent/test-run-management/text-execution/text-execution.component";
import { ExecutionTestCasesComponent } from "./mainComponent/test-run-management/execution-test-cases/execution-test-cases.component";
import { ExecutionTestStepsComponent } from "./mainComponent/test-run-management/execution-test-steps/execution-test-steps.component";

//pipes
import { GetUserFirstLetter } from "./pipe/custom.pipe";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    MainComponent,
    DashboardComponent,
    ProjectsComponent,
    CreateProjectComponent,
    CreateTestComponent,
    CreateTestSuiteComponent,
    CreateTestCaseComponent,
    TestSuiteDetailsComponent,
    ProjectDetailsComponent,
    TestCaseDetailsComponent,
    TreeViewComponent,
    ApikeyComponent,
    EditProjectComponent,
    TestRunManagementComponent,
    TestRunComponent,
    CreateTestRunComponent,
    AddTestcasesComponent,
    BuildsComponent,
    CreateBuildComponent,
    TextExecutionComponent,
    ExecutionTestCasesComponent,
    ExecutionTestStepsComponent,
    GetUserFirstLetter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module,
    DataTablesModule,
    ChartsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
