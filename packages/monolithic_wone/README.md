# Walking on Earth's Web App

## Live

- [user-dev.walkingonearth.com](https://user-dev.walkingonearth.com/) (Development)
- [user-qa.walkingonearth.com](https://user-qa.walkingonearth.com) (QA)
- [user.walkingonearth.com](https://user.walkingonearth.com/) (Production)

## Setup

### Prerequisites (using MacOS)

1. Install [nvm](https://github.com/nvm-sh/nvm#installation). A quick way is to use the [brew](https://brew.sh/) package manager like this
```
brew install nvm
```

2. Install node 16 (that's what we currently use on production)
```
nvm install 16
```

3. Install [yarn](https://yarnpkg.com/)
```
npm install --global yarn
```

3. Clone the repo
```
git clone https://github.com/walkingonearth/web-app.git
```

Congratulations! 🎉 You can now get started.

We use yarn to manage the dependencies for this project.

### `yarn install`

To set up all dependencies.

## Scripts

In the project directory, you can run:

### `yarn start:qa`

Runs the app in the development mode and connects to our QA server.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start:production`

Runs the app in the development mode and connects to our **Prod** server.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build:qa`

Builds the app for production to the `build` folder.\
Ready to be deployed to **QA**.


### `yarn build:production`

Builds the app for production to the `build` folder.\
Ready to be deployed to **Prod**.

## Deploy

We have a GitHub Action to [Build & deploy development preview](https://github.com/walkingonearth/web-web-app/actions/workflows/build-deploy.yml). 

## Learn More

This project was bootstrapped with Create React App. You can learn more in the [Create React App documentation](https://create-react-app.dev/docs/getting-started/).

To learn React, check out the [React documentation](https://reactjs.org/).
