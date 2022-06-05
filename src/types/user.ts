export type TUser = {
    _id: string;
    email: string;
    password: string;
}

export type StrengthResult = {
    strong: Boolean;
    tests: {
        minLength: Boolean;
        minLowerCaseChars: Boolean;
        minUpperCaseChars: Boolean;
        minNumbers: Boolean;
        minSpecialChars: Boolean;
        forbiddenChars: Boolean;
    };
};