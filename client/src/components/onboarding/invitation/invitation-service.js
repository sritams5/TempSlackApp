var randtoken = require('rand-token');
import { saveUpdateTeam,getTeamDetail } from '../../../../../firebase/onboarding-db';
export async function sendMail(element,teamName){
  const recieverarr = [];
  const reciever = $(element).val().trim();
  let tokenz;
  if (reciever !== '' && reciever !== undefined) {
    recieverarr.push(reciever);

    // Generate a 16 character alpha-numeric token:
    tokenz = randtoken.generate(16);
    console.log(`token- ${tokenz}`);
    const appUrl = window.location.href;
    const redireURL = `${appUrl}?teamname=${teamName}&token=${tokenz}`;// &useremail=${reciever}`;
    const output = `<p>Please click on the below provided link to join Slack</p><br/><a href="${redireURL}">Join Slack</a>`;
    let team = await getTeamDetail(teamName);


    let updatedTeam;
  //  team.then(function(result) {
    if(team != 'undefined' && team != null && team != "") {
      console.log(`if team-${team.invitations}`);
      if(team.invitations != 'undefined' && team.invitations != null && team.invitations != "") {
          updatedTeam=team;
          //Object.assign(updatedTeam.invitations, {tokenz : reciever});
          console.log('before add-'+JSON.stringify(updatedTeam.invitations));
          updatedTeam.invitations[tokenz] = reciever;
          if ('temp' in updatedTeam.invitations) {
            delete updatedTeam.invitations['temp'];
          }
          console.log('after add-'+JSON.stringify(updatedTeam.invitations));
      }
    }
    if (typeof recieverarr !== 'undefined' && recieverarr.length > 0) {
      console.log(recieverarr);
      let teamSaveResult = await saveUpdateTeam(teamName, updatedTeam);
      //console.log(teamSaveResult);
      //teamSaveResult.then(function(result) {
        console.log(team) //will log results.
        Email.send('slackmailing@gmail.com',
          reciever,
          'Invitation to join slack',
          output,
          'smtp.gmail.com',
          'slackmailing@gmail.com',
          'Slack@246');

    //  })
    }
//  })
  }
};
