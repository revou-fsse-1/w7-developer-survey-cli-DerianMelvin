import inquirer from "inquirer";

// checks if input result is valid through a checker function, returns an error message if not valid
const validate = (checkIsValid, errorMessage) => {
  return (input) => (checkIsValid(input) ? true : errorMessage);
};

// checks whether an input is empty
const validateInput = (input) => {
  if (typeof input == "number") {
    return input > 0 ? true : false;
  } else {
    return input.length > 0 ? true : false;
  }
};

// checks whether the email is valid using regex
const validateEmail = (email) => {
  const emailChecker = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
  return emailChecker.test(email);
};

// checks if user answered "Yes" in experienced developer question
const checkIsExperiencedDev = () => {
  return (answer) => (answer.isExperiencedDev == "Yes" ? true : false);
};

const questions = [
  {
    type: "input",
    name: "firstName",
    message: "What's your first name?",
    validate: validate(validateInput, "Please enter your first name"),
    filter(answer) {
      return answer.trim().charAt(0).toUpperCase() + answer.trim().slice(1);
    },
  },
  {
    type: "input",
    name: "email",
    message: "What's your email address?",
    validate: validate(validateEmail, "Please enter the correct email"),
  },
  {
    type: "list",
    name: "isExperiencedDev",
    message: "Are you an experienced developer?",
    choices: ["Yes", "No"],
  },
  {
    type: "list",
    name: "experienceYears",
    message: "How many years of experience do you have with Javascript?",
    choices: ["0-1", "1-3", "3-5", "5-10", "10+"],
    when: checkIsExperiencedDev(),
  },
  {
    type: "checkbox",
    name: "jsLibraries",
    message: "What JavaScript libraries did you know?",
    choices: [
      new inquirer.Separator(" === Front-End Frameworks === "),
      "React.js",
      "Vue",
      "Angular",
      new inquirer.Separator(" === Others === "),
      "Node.js",
      "jQuery",
      "D3.js",
      "Typescript",
    ],
    when: checkIsExperiencedDev(),
    validate: validate(validateInput, "Please choose at least 1 library"),
  },
  {
    type: "number",
    name: "desiredSalary",
    message: "What is your desired salary?",
    when: checkIsExperiencedDev(),
    validate: validate(validateInput, "Please enter your desired salary amount"),
  },
];

// run your command
inquirer
  .prompt(questions)
  .then((answers) => {
    console.log("----- Thank you for filling in the survey! -----");
    console.log("----- Here's a quick summary of your response: -----");
    console.log(JSON.stringify(answers, null, 2));
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Your console environment is not supported!");
    } else {
      console.log(error);
    }
  });
