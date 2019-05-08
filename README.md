This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## React client for random images

This is the clientside of the random image application

## Important [09/05/2019 9:52 AM]
For register the user succesfully the password should meet the Identiy Framework default password policy.
The password should have an uppercase + lowercase + symbol such as !% etc. And SHOULD NOT INCLUDE THE USER NAME OR PASSWORD IN IT


It was my last implementation so I didn't have time enough to improve the registration page :)


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
- Registration form, it was the last thing I added and as it wasn't required, I haven't included user feedback after registration (yes in console). I just redirected to login page.

