import database from '../../../../../firebase/firebase';
import { GITHUB_API_TOKEN, GITHUB_API_CREATE_REPO_URL, GITHUB_API_USER_URL } from '../constants/constants';

// function to retrieve github token from firebase database -- firebase
export const getGithubToken = () => new Promise((resolve, reject) => {
  database.ref(`SlackXT/slackbot/gitToken`).once('value')
  .then((snapshot) => {
    const githubToken = snapshot.val();
    if (githubToken !== '') {
      console.log('github token retrieved successfully...', githubToken);
      resolve(githubToken);
    } else {
      reject(new Error(`Error while retrieving github token from firebase database.`));
      console.log('Error while retrieving github token from firebase database...');
    }
  });
});

// function to save data for create repository into firebase database -- firebase
export const createRepoFirebaseService = widgetData => new Promise((resolve, reject) => {
  const collectionKey = database.ref(`SlackXT/slackbot/${widgetData.userId}/gitbot`).push({
    commandEntered: widgetData.commandEntered,
    widgetName: widgetData.widgetName,
    repositoryName: widgetData.repositoryName,
    userId: widgetData.userId,
    creatDate: widgetData.creatDate,
    creatTime: widgetData.creatTime,
    currentdateTime: widgetData.currentdateTime,
  }).getKey();

  console.log('collectionKey = ', collectionKey);
  if (collectionKey !== '') {
    console.log('saved successfully...', widgetData.id);
    widgetData.id = collectionKey;
    resolve(widgetData);
  } else {
    reject(new Error(`Error in saving your data into firebase database. 
    widget data is ${widgetData}`));
    console.log('There is error while saving data into firebase...');
  }
});

// function to create repository into github account -- github
export const createRepoGithubService = repositoryName => new Promise((resolve, reject) => {
  getGithubToken().then((githubToken) => {
    fetch(GITHUB_API_CREATE_REPO_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${githubToken}`,
      },
      body: JSON.stringify({
        name: repositoryName,
      }),
    }).then((res) => {
      res.json().then((data) => {
        resolve(data);
      });
    }).catch((err) => {
      reject(err);
      console.log(err, 'There is error while creating git repository through github api...');
    });
  });
});

// function to create issue into github account for a repo. -- github
export const createIssueGithubService = (repositoryName,
  issueName) => new Promise((resolve, reject) => {
  getGithubToken().then((githubToken) => {
    fetch(`${GITHUB_API_USER_URL + repositoryName}/issues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${githubToken}`,
      },
      body: JSON.stringify({
        title: issueName,
        labels: ['bug'],
      }),
    }).then((res) => {
      res.json().then((data) => {
        resolve(data);
      });
    }).catch((err) => {
      reject(err);
      console.log(err, 'There is error while creating git issue through github api...');
    });
  });
});

// function to update slack response to firebase database -- firebase
export const updateSlackBotResponse = (widgetData, botResponse) => {
  widgetData.botResponse = botResponse;
  const updateCollectionKey = widgetData.id;
  const updates = {};
  updates[`SlackXT/slackbot/${widgetData.userId}/gitbot/${updateCollectionKey}`] = widgetData;
  return database.ref().update(updates);
};
