export class RegisterUser {
	username: string;
	email: string;
    password: string;
    organization: string;
    mobileNo: string;
}

export class VerifiedUser {
	username: string;
	password: string;
}

export class ForgotUserPassword {
	email: string;
}

export class ResetUserPassword {
	password: string;
	token: string;
}