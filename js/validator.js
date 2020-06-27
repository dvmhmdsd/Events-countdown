export default class Validator {
  validate(value) {
    let rules = [this.validateEmpty, this.validateSpecialCharacters];

    for (
      let ruleIndex = 0, rulesLength = rules.length;
      ruleIndex < rulesLength;
      ruleIndex++
    ) {
      if (
        typeof rules[ruleIndex](value) === "object" &&
        !rules[ruleIndex](value).status
      ) {
        return { status: false, msg: rules[ruleIndex](value).msg };
      }
    }
    return { status: true };
  }

  validateEmpty(string) {
    if (string.length === 0) {
      return { status: false, msg: "Values can not be empty !" };
    } else {
      return { status: true };
    }
  }

  validateSpecialCharacters(value) {
    const SPECIAL_CHARS = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

    if (SPECIAL_CHARS.test(value)) {
      return { status: false, msg: "Special characters are not allowed !" };
    }

    return { status: true };
  }
}
