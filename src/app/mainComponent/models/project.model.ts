export class Project {
	name: string;
	notes: string;
	prefix: string;
}

export class CreateProject {
	// existProject:string;
	name: string;
	prefix: string;
	notes: string;
	requirement: boolean;
	testPriority: boolean;
	testAutomation: boolean;
	inventory: boolean;
	active: boolean;
	public: boolean;
}

export class TestSuite {
	name: string;
	testProjectId: string;
	details: string;
	parentId: string;
	order: string;
	checkDuplicatedName: boolean;
	actionOnDuplicatedName: boolean;
}

export class TestCase {
	name: string;
	testSuiteId: string;
	testProjectId: string;
	authorLogin: string;
	summary: string;
	preconditions: string;
	executionStatus: string;
	testCaseStatus: string;
	testImportance: string;
	executionType: string;
	// executionTime: string;
	steps: [];
	executionOrder: string;
	order: string;
	internalId: string;
	fullExternalId: string;
	checkDuplicatedName: boolean;
	actionOnDuplicatedName: boolean;
	versionId: string;
	version: string;
	parentId: string;
	customFields: [];
}

export class TestStep {
	testcaseId: string;
	testCaseExternalId: string;
	version: string;
	action: string;
	testCaseSteps: [];
}

export class TestRun {
	name: string;
	projectName: string;
	notes: string;
	isActive: string;
	isPublic: string;
	customFields: [];
}

export class TestCaseInTestRun {
	order: string;
	platformId: string;
	testCaseId: [];
	testPlanId: string;
	testProjectId: string;
	urgency: string;
	version: string;
}

export class Build {
	// closedDate: string;
	// isActive: string;
	// isOpen: string;
	name: string;
	notes: string;
	// releaseDate: string;
	testPlanId: string;
}

export class TestExecution {
	id: string;
	testRunId: string;
	testRunName: string;
	startDate: string;
	endDate: string;
	excecutionDuration: string;
	executionStatus: string;
}

export class TestRunExecution {
	bugId: string;
	buildId: string;
	buildName: string;
	customFields: string;
	executionDuration: string;
	guess: string;
	notes: string;
	overwrite: string;
	platformId: string;
	platformName: string;
	status: string;
	steps: string;
	testCaseExternalId: string;
	testCaseId: string;
	testPlanId: string;
	timestamp: string;
	user: string;
}