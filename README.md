# Overview
This project is about using Redux in a React project that is fetching data from an api.

# Technology Stack
 * [Semantic UI](https://semantic-ui.com/) CSS framework with user interface components.
 * [React](https://facebook.github.io/react/) User interface component system.
 * [Semantic-UI-React](http://react.semantic-ui.com/introduction) React components for Semantic UI.
 * [Docker](https://en.wikipedia.org/wiki/Docker_(software)) To setup similar production and development environment
 
# Getting Started - Setup

This section is for getting started with Robokind on your development environment.

1. **Launch the app via Docker**
  This is the recommended way to run the system during development.

  - Install Docker ([instructions for ubuntu](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#install-using-the-repository))
  - Install docker-compose ([how to install](https://docs.docker.com/compose/install/))
  - Launch: `sudo docker-compose up`

Now you can expect automatic live reloading whenever you made changes to ```src``` or ```public``` folder.

You can access the app at http://localhost:3000/

**Note:** Use of `sudo` is required with a basic Docker installation. To remove the necessity of `sudo` (for example when setting up a production deploy), you can follow these instructions: [Post-installation steps for Linux - Manage Docker as a non-root user](https://docs.docker.com/engine/installation/linux/linux-postinstall/#manage-docker-as-a-non-root-user). This is highly recommended.


#### Rebuild Image

**Note:** If dependencies in `package.json` change or any other files except files inside ```src``` and ```public``` folders, you need to rebuild the image before launching again (will re-run `npm install` for the image):
```docker-compose build --force-rm --no-cache app```

To rebuild the image without clearing cache:
```docker-compose build app```

# Testing

We use unit tests with [Jest](https://github.com/facebook/jest) in this project.

- To run tests
  ```docker-compose run --no-deps --rm app npm test```

- To run tests in watch mode
  ```docker-compose run --no-deps --rm app npm test -- --watch```

# Linting
We also use [ESLint](https://eslint.org/) with [JavaScript Standard Style](https://standardjs.com).

 - To run lint:
  ```sudo docker-compose run --no-deps app npm run lint```

 - To automatically fix doable linting errors:
  ```sudo docker-compose run --no-deps app npm run lint:fix```

 - To run lint in watch mode:
  ```sudo docker-compose run --no-deps app npm run lint:watch```

  - To automatically fix doable linting errors in watch mode:
  ```sudo docker-compose run --no-deps app npm run lint:watch:fix```


# Semantic UI setup
We are using semantic UI as CSS framework with user interface components.

**Note:** Only execute these steps whenever you would like to add/remove Semantic UI components

 - Firstly go to ```cd theme```

 - Now run ```npm install```

 - To add/remove Component, please update ```theme\semantic.json```

 - Then go inside ```cd theme\semantic```

 - and run ```gulp build```

 - It will recreate all the CSS files inside: ```src\semantic\dist```


# Workflow

#### Development Category
  For commit message or branch name we will use following categories:
    - feat (feature)
    - fix (bug fix)
    - docs (documentation)
    - style (formatting, missing semi colons, etc)
    - refactor
    - test (when adding missing tests)
    - chore (maintain)

#### Format of Commit Message
```
  [<DEVELOPMENT CATEGORY]>: <SUBJECT>
  <BLANK LINE>
  <BODY>
  <BLANK LINE>
  <FOOTER>
```

- DEVELOPMENT CATEGORY 
  This must be picked from above specified categories and in lower case
- SUBJECT
  - use imperative, present tense: “change” not “changed” nor “changes”
  - don't capitalize first letter
  - no dot (.) at the end
- BODY
  - use imperative, present tense: “change” not “changed” nor “changes”
  - Description of changes
- FOOTER
  - For Breaking Changes only

For further information please refer to this [link](https://gist.github.com/stephenparish/9941e89d80e2bc58a153#format-of-the-commit-message)

#### Format of branch name

```
  [<DEVELOPMENT CATEGORY>]/[<HYPHEN-SEPERATED-BRANCH>]
```
- DEVELOPMENT CATEGORY
  This must be picked from above specified categories and in lower case
- HYPHEN-SEPERATED-BRANCH
  eg. tests/setting-tdd or feature/basic-sidebar

#### BRANCHES

There are three different branches under which all the technical development process will take place. These branches adhere to a certain hierarchy and require permissions to have access to/ work in them. They are listed as:

- ##### MASTER
  This is the main code line for the project. All the additions and changes in the project will be accommodated in this branch after proper review and approval from the team lead. This part of the project will be live and accessible to public. Hence no form of error,bugs mistakes should make it to the master branch. Any changes sent into this branch has to be preceded by approval from tech team lead and the client. Changes lacking these two check shall not be passed and incorporated.


- ##### STAGING
  Very similar to actual theatre, the staging branch will imitate the master branch in all its entirety except for the fact that public will not have access to it and the work being done in it. It will have the same environment as the master branch and will be there for the client to test and approve of the work done by the team. It will also be the testing ground to see how the changes made in the code will manifest in the similar environment when sent live. New codes or edit have to be merged in here via pull request made by the developer. Unless and until the reviewer or team lead approves of the work it shall not be incorporated here.


- ##### DEVELOPMENT
  This is the branch that will also be a copy of the master but the developers will be here. This branch will further be divided in sub-branches where the developers will be working. These sub-branches are:


    - *Features:* New features and attributes for the project will be developed under this tag.
    - *Errors/Bugs:* Developers working under this category will have to fix the bugs reported by the system or the quality assessment team.
    - *Enhancement:* This sub-branch is responsible to make in or incorporate the changes in an already built attribute of the project.
    - *Maintenance:* Systems and scripts that require maintenance will fall under this category and will be catered by the developers assigned for maintenance only.


#### CI Integration
  - Bitbucket pipeline has been setup to run `TDD` and `LINT` for every commit
  - All the steps written in `piplines` must be passed to approve any `PR`.

#### Guidelines - must be followed strictly
  - Developer must commit his tasks at the end of the day, even if the task has not been completed
  - Developeer must create a pull requestat at the end of day, even if the task has not been completed, with a SUFFIX in subject name as `[WIP]:` e.g 
  `[WIP]: Setup of Jest with first unit test` 
  - A daily status email containing following sections:
    - DATE
    - Today Tasks
    - Tasks for Tomorrow
      


