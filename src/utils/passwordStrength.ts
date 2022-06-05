import { StrengthResult } from "../types/user";

export function checkStrength(password: String): StrengthResult {
  let result: StrengthResult = {
    strong: checkMinLength(8,password) && checkLowerCaseChars(1,password) && checkUpperCaseChars(1,password) && checkNumbers(1,password) && checkSpecialChars(1,password) && checkForbiddenChars(password),
    tests: {
      minLength: checkMinLength(8,password),
      minLowerCaseChars: checkLowerCaseChars(1,password),
      minUpperCaseChars: checkUpperCaseChars(1,password),
      minNumbers: checkNumbers(1,password),
      minSpecialChars: checkSpecialChars(1,password),
      forbiddenChars: checkForbiddenChars(password),
    }
  };
  return result;
}

/** 
 * Checks count of characters
 */
export function checkMinLength(minLength: number, password: String): Boolean {
  return password.length >= minLength;
}

/** 
 * Checks count of characters a-z
 */
 export function checkLowerCaseChars(minLowerCaseChars: number, password: String): Boolean {
  return (password.match(/[a-z]/g) || '').length >= minLowerCaseChars;
}

/** 
 * Checks count of characters A-Z
 */
export function checkUpperCaseChars(minUppercaseChars: number, password: String): Boolean {
  return (password.match(/[A-Z]/g) || '').length >= minUppercaseChars;
}

/** 
 * Checks count of characters 0-9
 */
export function checkNumbers(minNumbers: number, password: String): Boolean {
  return (password.match(/[0-9]/g) || '').length >= minNumbers;
}

/** 
 * Checks count of characters @#%^&!*
 */
export function checkSpecialChars(minSpecialChars: number, password: String): Boolean {
  return (password.match(/[@#%^&!*]/g) || '').length >= minSpecialChars;
}

/**
 * Checks for any characters not @#%^&!*, A-Z, a-z, or 0-9
 */
export function checkForbiddenChars(password: String): Boolean {
  return (password.match(/([^@#%^&!*A-Za-z0-9])/g) || '').length == 0;
}
