/*
TODOS:
Either add goalie comparison or alert if player position is G (maybe use 'if any values are undefined, throw error'
Change css color of greater stat to green (can prob be done only in css)
Fixes throughout home.js
 */

let officialName;

function calculatePlayers() {
    let playerName0 = $("#playerName0").val();
    // change to if at least one name empty
    //TODO FIX IF EMPTY INPUT (Does nothing)
    if (isEmpty(playerName0) || isEmpty(playerName1)) {
        alert("Please enter a name.");
        return;
    } else {
        let playerId0 = searchTeams(playerName0, 0);
        console.log(playerId0);
        getPlayerStats(playerId0);

        // add player1
        let playerName1 = $("#playerName1").val();
        if (!isEmpty(playerName1)) {
            let playerId1 = searchTeams(playerName1, 1);
            getPlayerStats(playerId1);
        }
    }
}

function isEmpty(playerName) {
    if (playerName0 === "") {
        alert("Please enter a name.");
        return true;
    } else {
        return false;
    }
}


function searchTeams(playerName, numPlayer) {
    let isFound = false;

    for (let i = 1; i < 31; i++) {
        if (i == 11 || i == 27) {
            //Teams don't exist so pass
        } else {
            findPlayer(i, numPlayer);
        }
    }
    /// does jets, coyotes, golden knights cause of weird api
    if (isFound === false) {
        for (let i = 52; i < 55; i++) {
            findPlayer(i, numPlayer);
        }
    }
    //TODO FIX ALERT ALWAYS APPEARS
    // if (isFound === false) {
    //     alert("Player not found.");
    //     return;
    // }

    function findPlayer(i, numPlayer) {
        let curLink = 'https://statsapi.web.nhl.com/api/v1/teams/' + i + '/roster';
        // console.log(curLink);
        $.get(curLink, function (data) {
            // console.log(data);
            for (let j = 0; j < data.roster.length; j++) {
                let player = data.roster[j].person;
                if (player.fullName.toLowerCase() === playerName.toLowerCase()) {
                    officialName = player.fullName;
                    console.log(player.id);
                    isFound = true;
                    getPlayerStats(player.id, numPlayer);
                }
            }
        });
    }
}


function getPlayerStats(playerId, numPlayer) {
    // console.log(playerId);
    let results = "";
    let playerLink = 'https://statsapi.web.nhl.com/api/v1/people/' + playerId + '/stats?stats=statsSingleSeason&season=20192020'
    let playerPhoto = 'https://nhl.bamcontent.com/images/headshots/current/168x168/'+playerId+'.jpg'
    let printStats = {
        "games": "Games",
        "points": "Points",
        "goals": "Goals",
        "assists": "Assists",
        "plusMinus": "Plus minus (+/-)",
        "powePlayPoints": "Power Play Points",
        "powerPlayGoals": "Power Play Goals",
        "shots": "Shots",
    }
    $.get(playerLink, function (data) {


        let possibleStats = ["games", "points", "goals", "assists", "plusMinus", "powerPlayPoints", "powerPlayGoals", "shots"];
        let checkedStats = [];

        for (let i = 0; i < possibleStats.length; i++) {
            let s = possibleStats[i];
            if (document.getElementById(s).checked) {
                checkedStats.push(s);
            }
        }
        let playerStats = data.stats[0].splits[0].stat;

        //Player header
        results += '<h3>'+ officialName + '</h3> <br> ' +
            '<img src="' + playerPhoto + '"' + '<br><br>';

        for (let i = 0; i < checkedStats.length; i++) {

            let curStat = checkedStats[i]

            // TODO FIX printStats.curStat
            console.log(curStat);
            addString = curStat + ": " + playerStats[curStat];
            results += addString + '<br>';
             // + addString + '<br>';
            let divNum = "#playerStats" + numPlayer;
            $(divNum).html(results);

        }
    });
}


// let test = {
//     "copyright": "NHL and the NHL Shield are registered trademarks of the National Hockey League. NHL and NHL team marks are the property of the NHL and its teams. © NHL 2020. All Rights Reserved.",
//     "stats": [{
//         "type": {
//             "displayName": "statsSingleSeason"
//         },
//         "splits": [{
//             "season": "20192020",
//             "stat": {
//                 "timeOnIce": "1415:41",
//                 "assists": 24,
//                 "goals": 6,
//                 "pim": 20,
//                 "shots": 126,
//                 "games": 56,
//                 "hits": 62,
//                 "powerPlayGoals": 2,
//                 "powerPlayPoints": 9,
//                 "powerPlayTimeOnIce": "144:07",
//                 "evenTimeOnIce": "1136:11",
//                 "penaltyMinutes": "20",
//                 "faceOffPct": 0.0,
//                 "shotPct": 4.8,
//                 "gameWinningGoals": 0,
//                 "overTimeGoals": 0,
//                 "shortHandedGoals": 0,
//                 "shortHandedPoints": 1,
//                 "shortHandedTimeOnIce": "135:23",
//                 "blocked": 123,
//                 "plusMinus": 10,
//                 "points": 30,
//                 "shifts": 1628,
//                 "timeOnIcePerGame": "25:16",
//                 "evenTimeOnIcePerGame": "20:17",
//                 "shortHandedTimeOnIcePerGame": "02:25",
//                 "powerPlayTimeOnIcePerGame": "02:34"
//             }
//         }]
//     }]
// }



