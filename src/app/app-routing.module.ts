import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './loginComponent/login/login.component';
import { RegisterComponent } from './loginComponent/register/register.component';
import { ResetPasswordComponent } from './loginComponent/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './loginComponent/forgot-password/forgot-password.component';

import { AuthGuard } from "./auth/auth.guard";

import { MainComponent } from './mainComponent/main.component';
import { DashboardComponent } from './mainComponent/dashboard/dashboard.component';
import { ProjectsComponent } from './mainComponent/projects/projects.component';
import { ApikeyComponent } from './mainComponent/apikey/apikey.component';
import { CreateProjectComponent } from './mainComponent/create-project/create-project.component';
import { EditProjectComponent } from './mainComponent/edit-project/edit-project.component';
import { CreateTestComponent } from './mainComponent/create-test/create-test.component';
import { CreateTestSuiteComponent } from './mainComponent/create-test/create-test-suite/create-test-suite.component';
import { CreateTestCaseComponent } from './mainComponent/create-test/create-test-case/create-test-case.component';
import { ProjectDetailsComponent } from './mainComponent/create-test/project-details/project-details.component';
import { TestSuiteDetailsComponent } from './mainComponent/create-test/test-suite-details/test-suite-details.component';
import { TestCaseDetailsComponent } from './mainComponent/create-test/test-case-details/test-case-details.component';
import { TestRunManagementComponent } from './mainComponent/test-run-management/test-run-management.component';
import { TestRunComponent } from './mainComponent/test-run-management/test-run/test-run.component';
import { CreateTestRunComponent } from './mainComponent/test-run-management/create-test-run/create-test-run.component';
import { BuildsComponent } from './mainComponent/test-run-management/builds/builds.component';
import { CreateBuildComponent } from './mainComponent/test-run-management/create-build/create-build.component';
import { TextExecutionComponent } from './mainComponent/test-run-management/text-execution/text-execution.component';
import { ExecutionTestCasesComponent } from './mainComponent/test-run-management/execution-test-cases/execution-test-cases.component';
import { ExecutionTestStepsComponent } from './mainComponent/test-run-management/execution-test-steps/execution-test-steps.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset/:token', component: ResetPasswordComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/projects', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'apiKey', component: ApikeyComponent },
      { path: 'createProject', component: CreateProjectComponent },
      { path: 'editProject/:projectId', component: EditProjectComponent },
      {
        path: 'createTest', component: CreateTestComponent,
        children: [
          { path: 'projectDetails/:projectId', component: ProjectDetailsComponent },
          { path: 'createTestSuite/:projectId/:parentSuiteId', component: CreateTestSuiteComponent },
          { path: 'testSuiteDetails/:projectId/:suiteId', component: TestSuiteDetailsComponent },
          { path: 'createTestCase/:projectId/:suiteId', component: CreateTestCaseComponent },
          { path: 'testCaseDetails/:projectId/:suiteId/:caseId', component: TestCaseDetailsComponent },
        ]
      },
      {
        path: 'testRun', component: TestRunManagementComponent,
        children: [
          { path: 'testRunList/:projectId', component: TestRunComponent },
          { path: 'createTestRun/:projectId', component: CreateTestRunComponent },
          { path: 'builds/:projectId', component: BuildsComponent },
          { path: 'createBuild/:projectId', component: CreateBuildComponent },
          { path: 'testExecutionList/:projectId', component: TextExecutionComponent },
          { path: 'executionTCs/:projectId/:runId', component: ExecutionTestCasesComponent },
          { path: 'executionSteps/:projectId/:runId/:buildId/:caseId/:version/:exId', component: ExecutionTestStepsComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
