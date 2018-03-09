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


#### BRANCHES

- ##### MASTER
  This is the main code line for the project. All the additions and changes in the project will be accommodated in this branch after proper review and approval from the team lead. This part of the project will be live and accessible to public. Hence no form of error,bugs mistakes should make it to the master branch. Any changes sent into this branch has to be preceded by approval from tech team lead and the client. Changes lacking these two check shall not be passed and incorporated.