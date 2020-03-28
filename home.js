// let xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
// // Typical action to be performed when the document is ready:
//         document.getElementById("demo").innerHTML = xhttp.responseText;
//     }
// };
// xhttp.open("GET", "", true);
// xhttp.send();


// Mine
// Enhanced for loop? maybe
function searchPlayer() {
    for (int i = 0 < 31; i++) {
        let curLink = 'https://statsapi.web.nhl.com/api/v1/teams/'+i+'/roster';
        $.get(curLink, function(roster){
        for (int j = 0; j < roster.length; j++){
            if (roster[j].fullName.toLowerCase() === input.toLowerCase()) {
                // return roster[j].id;
                getPlayerStats(roster[j].id);
            }
        }
        });
    }
    /// does jets, coyotes, golden knights cause of weird api
    for (int i = 52; i < 55; i++) {
        let curLink = 'https://statsapi.web.nhl.com/api/v1/teams/'+i+'/roster';
        $.get(curLink, function(roster) {
            for (int j = 0; j < roster.length;j++){
                if (roster[j].fullName.toLowerCase() === input.toLowerCase()) {
                    // return roster[j].id;
                    getPlayerStats(roster[j].id);
                }
            }
        }
    }
    alert("Player not found.");
}


function getPlayerStats(playerId) {
    let results = "";
    let playerLink = 'https://statsapi.web.nhl.com/api/v1/people/'+playerId+'/stats?stats=statsSingleSeason&season=20192020'
    $.get(playerLink, function(stats){
        let possibleStats = ["games","points","goals","assists","plusMinus","powerPlayPoints","powerPlayGoals","shots"];
        for (String s: possibleStats){
            if (document.getElementById(s).checked) {
                //Get checked categories
                s.replace(/['"]+/g, ''); // dont know if should keep
                results += stats.s + "<br>";
            }
        }
        $("#results").html(JSON.stringify(results)); //Stringify redundant
    }
}






