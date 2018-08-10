import '../../../../../firebase/firebase-config';
import firebase from 'firebase';


// const currUser = firebase.auth().currentUser.uid;
// const dbRef = firebase.database().ref();


export function getCurrentUserData() {
  const userUID = firebase.auth().currentUser.uid;
  const dataPromise = fetch(`https://us-central1-slackcollaboration-fa323.cloudfunctions.net/getUser?userId=${userUID}`);
  return new Promise((resolve, reject) => {
    dataPromise
      .then((res) => {
        res.json().then((data) => {
          resolve(data);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export function getCurrentUserData1() {
  //const userUID = firebase.auth().currentUser.uid;
  const dataPromise = fetch(`https://us-central1-slackcollaboration-fa323.cloudfunctions.net/getUser?userId=cMCTzZqeqOfSbRq8FjolmlQkDOf2`);
  return new Promise((resolve, reject) => {
    dataPromise
      .then((res) => {
        res.json().then((data) => {
          resolve(data);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateUserData(name, email) {
  const userUID = firebase.auth().currentUser.uid;
  const req = new Request(`https://us-central1-slackcollaboration-fa323.cloudfunctions.net/saveUpdateUser?userId=${userUID}`, {
    method: 'POST',
    mode: 'no-cors',
    headers : {"Access-Control-Allow-Origin":true},
    contentType: 'application/json;charset=UTF-8',
    body: JSON.stringify({
          "name" :name,
          "email" :email
    }),
  });

  fetch(req).then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      console.log(jsonData);
    })
    .catch((err) => {
      console.log('Error:', err.message);
    });
}


export function saveUpdateUserProfile(updated_name, updated_email) {
  // Return a new promise.
  const userId = firebase.auth().currentUser.uid;
  console.log(`https://us-central1-slackcollaboration-fa323.cloudfunctions.net/saveUpdateUser?userId=${userId}`);
  //console.log(userData);

  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://us-central1-slackcollaboration-fa323.cloudfunctions.net/saveUpdateUser?userId=${userId}`,
      type: 'POST',
      data: JSON.stringify({ name: updated_name,
      email : updated_email }),
      contentType: 'application/json;charset=UTF-8',
      dataType: 'text',
      success(data) {
        console.log('Saved data');
        resolve(data);
      },
      error(e) {
        console.log('Error in saving data');
        reject(e.statusText);
      },
    });
  });
 }



export function saveUpdateUserProfile1(updated_name, updated_email) {
  // Return a new promise.
  const userId = firebase.auth().currentUser.uid;
  console.log(`https://us-central1-slackcollaboration-fa323.cloudfunctions.net/saveUpdateUser?userId=cMCTzZqeqOfSbRq8FjolmlQkDOf2`);
  //console.log(userData);

  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://us-central1-slackcollaboration-fa323.cloudfunctions.net/saveUpdateUser?userId=cMCTzZqeqOfSbRq8FjolmlQkDOf2`,
      type: 'POST',
      data: JSON.stringify({ name: updated_name,
      email : updated_email }),
      contentType: 'application/json;charset=UTF-8',
      dataType: 'text',
      success(data) {
        console.log('Saved data');
        resolve(data);
      },
      error(e) {
        console.log('Error in saving data');
        reject(e.statusText);
      },
    });
  });
 }
