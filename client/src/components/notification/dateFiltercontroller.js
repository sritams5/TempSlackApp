import {getMessagesFromFireBase} from './dateFilterService';

$("#end").change(function () {
    var startDate = document.getElementById("start").value;
    var endDate = document.getElementById("end").value;
 
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("end").value = "";
    }
});

$(document).on('click', '#ok', () => {
    document.getElementById('chatResult').style.display='none';   
    const startDate = document.getElementById('start').value;
    const endDate = document.getElementById('end').value;
    getMessagesFromFireBase(startDate, endDate);   
});


export function dateValidation() {
        $("#end").change(function () {
            var startDate = document.getElementById("start").value;
            var endDate = document.getElementById("end").value;
         
            if ((Date.parse(endDate) <= Date.parse(startDate))) {
                return 'false';
            }
            return 'true';
        });
    }
