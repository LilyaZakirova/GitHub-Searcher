# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Description of the problem and solution
This project aimed to be be handy small web-application, helping to visualize the data and some statistics of GitHub Users or Repositories. 
The solution focuses on front-end, as back-end part was covered and GitHub API is present.


## Technical solution
This application is `SPA`, using `React/Redux`.
`Redux Thunk` was used as a middleware that allows to write action creators that return a function instead of an action. Also 
`"redux-logger"`, `"redux-devtools-extension"` were connected for logging, debugging and better dev experience. 
`"redux-persist"` was used to save the states of the application and cache the fetched data.


## Implementation
First, I used `CRA` to setup the project.
I have separated actions, api, components, icons, reducers and styles into separate folders to separate logic, logic from the assets, etc. 
`SCSS modules` were used, as they give an ability to bugfix the styles and maintain them more easy. Also I separated colors and screen resolutions. For user to have better experience I have worked on tablet (1 card) and phone layout (2 cards). 
For more easier scalability, I created reusable components like Dropdown, SearchInput, Card, etc. In this project these components do not need to be reusable, but I wanted to show, how I will create, use and store the reusble components in bigger project. 

I used regular `fetch` to fetch the data and if an error occured I handle it and show toasting notofications with the error status.
When fetch is in progress, the spinner is shown to user.
If fetch succeded and we have the results satisfying the search term, cards with User or Repository are shown to the user.
Other requirements about positioning of the controls block (in the middle), fetch only if `>=3` characters are also covered.


## Trade-offs 
I didn't add `debounce` and I do know, that it is a bad practice. When I was using it, I experienced the issue. I decided to leave it as it is for now, as I am running out of the time limit.

Endpoint with the main user's info is hided into another endpoint that I use. 
`https://api.github.com/search/users?q=example+in:login` - this I use to list the users, and it doesn't give full info about the user
`https://api.github.com/users/example` - and this is hided into the fist endpont and it shows full info.

I didn't use the second enpoint, as I didn't find a good way to do it. 
However, I found the topic, where people suggest using GitHub GraphQL API for this purpose. I run out of time, so I only list users without full info.
https://stackoverflow.com/questions/17299026/github-api-get-email-addresses-of-all-members-of-organization

If I have more time, I will also pay more attention to types end exclude almost all the `any`.


## Link on the task
https://github.com/tradeling/coding-tasks/tree/develop/frontend-typescript


## Link on profile
https://www.linkedin.com/in/lilia-rubtsova-b240b81a3/
