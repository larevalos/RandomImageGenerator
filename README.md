This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## React client for random images

This is the clientside of the random image application

## Important (Only if you have cloned the project before 1pm, as I found some time in my lunch time to fix this :) ) 

The registration page is not givin feedback when the registration fails,
For registering the user succesfully the password should meet the Identiy Framework default password policy.
- The password should have more than 8 digits 
- and have an uppercase + lowercase + symbol such as !% etc. 
- and have at least 1 number

*It was my last implementation so I didn't have time enough to improve the registration page :)


## Description / features
- React + Redux + Redux Saga implementation
- Login and user registration
- redirection to login page if user is not authenticated or token has expired
- like/dislike image page with random images 
- Connected user can see their history of likes/dislikes
- Material UI library for the UI [09/05/2019 9:40 AM]

## Additional notes
- All api calls are in my sagas, that is in src/sagas

[09/05/2019 9:40 AM]
## Improvements
Some improvements I could have done with more time
- User feedback, not all the action display messages in the interface. Example when you swipe right or left a image (like/dislike) it doesn't display if it was succesfully saved or not.
- User feedback, better notification design could have been implemented


