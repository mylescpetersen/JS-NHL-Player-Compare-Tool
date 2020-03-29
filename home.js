function searchPlayer() {
    let flg = false;
    input = $("#playerName").val();
    if (input === "") {
        alert("Please enter a name.");
        return;
    }
    for (let i = 1; i < 31; i++) {
        if (i == 11 || i == 27) {
            //Teams don't exist so pass
        } else {
            let curLink = 'https://statsapi.web.nhl.com/api/v1/teams/' + i + '/roster';
            // console.log(curLink);
            $.get(curLink, function (data) {
                // console.log(data);
                for (let j = 0; j < data.roster.length; j++) {
                    let player = data.roster[j].person;
                    if (player.fullName.toLowerCase() === input.toLowerCase()) {
                        flg = true;
                        getPlayerStats(player.id);
                        return;

                    }
                }
            });
        }
    }
    /// does jets, coyotes, golden knights cause of weird api
    for (let i = 52; i < 55; i++) {
        let curLink = 'https://statsapi.web.nhl.com/api/v1/teams/' + i + '/roster';
        // console.log(curLink);
        $.get(curLink, function (data) {
            // console.log(data);
            for (let j = 0; j < data.roster.length; j++) {
                let player = data.roster[j].person;
                if (player.fullName.toLowerCase() === input.toLowerCase()) {
                    flg = true;
                    getPlayerStats(player.id);
                    return;

                }
            }
        });
    }
    //TODO FIX
    flg = true;
    if (flg === false) {
        alert("Player not found.");
        return;
    }

}


function getPlayerStats(playerId) {

    console.log(playerId);
    let results = "";
    let playerLink = 'https://statsapi.web.nhl.com/api/v1/people/' + playerId + '/stats?stats=statsSingleSeason&season=20192020'
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
        for (let i = 0; i < checkedStats.length; i++) {

            let curStat = checkedStats[i]
            // console.log(s);
            // console.log(playerStats[s]);
            // TODO FIX printStats.curStat
            console.log(curStat);
            addString = curStat + ": " + playerStats[curStat];
            results += addString + '<br>';
        }

        $("#results").html(JSON.stringify(results));    //Stringify redundant?
    });
}

let test = {
    "copyright" : "NHL and the NHL Shield are registered trademarks of the National Hockey League. NHL and NHL team marks are the property of the NHL and its teams. © NHL 2020. All Rights Reserved.",
    "stats" : [ {
        "type" : {
            "displayName" : "statsSingleSeason"
        },
        "splits" : [ {
            "season" : "20192020",
            "stat" : {
                "timeOnIce" : "1415:41",
                "assists" : 24,
                "goals" : 6,
                "pim" : 20,
                "shots" : 126,
                "games" : 56,
                "hits" : 62,
                "powerPlayGoals" : 2,
                "powerPlayPoints" : 9,
                "powerPlayTimeOnIce" : "144:07",
                "evenTimeOnIce" : "1136:11",
                "penaltyMinutes" : "20",
                "faceOffPct" : 0.0,
                "shotPct" : 4.8,
                "gameWinningGoals" : 0,
                "overTimeGoals" : 0,
                "shortHandedGoals" : 0,
                "shortHandedPoints" : 1,
                "shortHandedTimeOnIce" : "135:23",
                "blocked" : 123,
                "plusMinus" : 10,
                "points" : 30,
                "shifts" : 1628,
                "timeOnIcePerGame" : "25:16",
                "evenTimeOnIcePerGame" : "20:17",
                "shortHandedTimeOnIcePerGame" : "02:25",
                "powerPlayTimeOnIcePerGame" : "02:34"
            }
        } ]
    } ]
}





