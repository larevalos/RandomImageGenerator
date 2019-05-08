import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {fetchAllImagesSuccess,fetchAllHistorySuccess} from "actions/RandomImage";
import {removeSession,showAuthMessage} from "actions/Auth"

import {
    FETCH_ALL_IMAGES,
    FETCH_ALL_HISTORY,
    LIKE_DISLIKE
} from "constants/ActionTypes";

const fetchAllImagesRequest = async () =>
   await fetch('https://localhost:44394/image')
    .then(images => {
        if (images.status === 401 ){
            localStorage.removeItem('isUserActive');
            localStorage.removeItem('token');
            
            removeSessionWhenUnauthorized()
            window.location.reload();
            return images; 
        } else {
            return images.json()
        }
        
    })
    .catch(error => error); 

const fetchAllHistoryRequest =  () => {
    return fetch('https://localhost:44394/history?limit=100', {
        method: "GET",
        headers: { 
            "Accept": "application/json",
            "Authorization": 'Bearer '+localStorage.getItem('token')
        } })

}

const likeDislikeRequest = async  (payload) => {
    var liked = payload.orientation === 'right' ? true: false ;
    var body = {
        liked: liked, 
        ImageId:payload.id
    }
    await fetch('https://localhost:44394/history', {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        body: JSON.stringify(body)
     }).then(response => {
        if (response.status === 401 ){
            localStorage.removeItem('isUserActive');
            localStorage.removeItem('token');
            
            removeSessionWhenUnauthorized()
            window.location.reload();
            return response; 
        } else {
            return response.json()
        }
        
        })
        .catch(error => {
            console.log('Error adding in history',error)
            if (error.status === 401 ){
                localStorage.removeItem('isUserActive');
                localStorage.removeItem('token');
                window.location.reload();
                removeSessionWhenUnauthorized()
                return error; 
            } else {
                return error.json()
            }
        });


}


function* fetchAllImagesOnInit(){
    try {
        const images = yield call(fetchAllImagesRequest)
        console.log('All images',images.value);
        if ((images !== 'undefined' || images !== null) 
            && images.value !== 'undefined' & images.value !== null ){
            yield put(fetchAllImagesSuccess(images))
        }
    } catch (error){
        console.log('error')
    }
}

function* fetchAllHistoryOnInit(){
    try {
        const imagesHistoryPromise = yield call(fetchAllHistoryRequest);
        const response = imagesHistoryPromise;
        console.log('All History',response);
        if (response.error){
            yield put(showAuthMessage(response.statusText));
        } else {
            if (response.status === 401 ){
                localStorage.removeItem('isUserActive');
                localStorage.removeItem('token');
                
                removeSessionWhenUnauthorized()
                window.location.reload();
                yield put(showAuthMessage(response.statusText));
            } else {
               /* var value = response.json().then(json => {
                    console.log('this is the value',json.value);
                    return json.value
                }).then(responseFinal => responseFinal)*/
                const responseJson =  yield response.json();
                const finalResponse = responseJson; 

                setTimeout(50000,yield put(fetchAllHistorySuccess(finalResponse)));
            }
        }
        
    } catch (error){
        console.log('error History',error)
    }
}

function* actionLikeDislike({payload}){
    const {orientation,id} = payload;
    console.log('preparing for insert or',orientation)
    console.log('preparing for insert id',id)
    try {     
        const response = yield call(likeDislikeRequest,payload)
        if (response.status === 401 ){
            localStorage.removeItem('isUserActive');
            localStorage.removeItem('token');
            yield put(fetchAllImagesSuccess(removeSession))
            console.log('Got here', response)

        } else {
            console.log('response from actionDislike',response);
        }
    } catch (error){
        if (error.status === 401 ){
            localStorage.removeItem('isUserActive');
            localStorage.removeItem('token');
            yield put(fetchAllImagesSuccess(removeSession))
            console.log('Got here catch error', error)

        }
    }
}

function* removeSessionWhenUnauthorized(){
    yield put(removeSession())
}


export function* fetchAllHistory() {
    yield takeEvery(FETCH_ALL_HISTORY, fetchAllHistoryOnInit);
}


export function* fetchAllImages() {
    yield takeEvery(FETCH_ALL_IMAGES, fetchAllImagesOnInit);
}

export function* likeDislikes() {
    yield takeEvery(LIKE_DISLIKE, actionLikeDislike);
}

export default function* rootSaga() {
    yield all(
        [fork(fetchAllImages),
        fork(likeDislikes),
        fork(fetchAllHistory)]);
}