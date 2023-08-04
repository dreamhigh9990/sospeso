const axios = require('axios');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

class Betfair {
    constructor(){
        this.mainURL = "https://www.betfair.com/www/sports/navigation/facet/v1/search?_ak=nzIFcwyWhrlwYMrh&alt=json";
    }
    async getMainData(query) {
        let event = await axios.post('https://www.betfair.com/www/sports/navigation/facet/v1/search?_ak=nzIFcwyWhrlwYMrh&alt=json', query)
        return event.data
    }

    async getScore(eventsArray){
        let headless = true;
        const browser = await puppeteer.launch({headless: headless});
        const page = await browser.newPage();
        let query = ''
        for(i = 0 ; i <eventsArray.length ; i++){
            if(i == 0){
                query = query + eventsArray[i]
            }else{
                query = query + "," + eventsArray[i]
            }
        }
        await page.goto("https://ips.betfair.com/inplayservice/v1/eventTimelines?_ak=nzIFcwyWhrlwYMrh&alt=json&eventIds="+ query +"&locale=en");
        await page.content();

        let events = await page.evaluate(() =>  {
            return JSON.parse(document.querySelector("body").innerText);
        });

        // console.log(query)

        await browser.close();
        return events;
    }

    async getOdd(marketsArray){
        let headless = true;
        const browser = await puppeteer.launch({headless: headless});
        const page = await browser.newPage();
        let query = ''

        let marketLength = 0
        if(marketsArray.length > 40){
            marketLength = 40
        }
        else{
            marketLength = marketsArray.length
        }
        for(i = 0 ; i <marketLength ; i++){
            if(i == 0){
                query = query + marketsArray[i]
            }else{
                query = query + "," + marketsArray[i]
            }
        }

        await page.goto("https://ero.betfair.com/www/sports/exchange/readonly/v1/bymarket?_ak=nzIFcwyWhrlwYMrh&alt=json&currencyCode=EUR&locale=en&marketIds=" + query +"&types=MARKET_STATE,RUNNER_STATE,RUNNER_EXCHANGE_PRICES_BEST,RUNNER_DESCRIPTION");
        await page.content();

        let Odds = await page.evaluate(() =>  {
            return JSON.parse(document.querySelector("body").innerText);
        });

        await browser.close();
        return Odds;
    }

    async getBetfair_it(query){
        let event = await axios.post('https://www.betfair.it/www/sports/navigation/facet/v1/search?_ak=nzIFcwyWhrlwYMrh&alt=json', query)
        return event.data
    }

    async Betfair_it_Odd(marketsArray){
        let headless = true;
        const browser = await puppeteer.launch({headless: headless});
        const page = await browser.newPage();
        let query = ''

        let marketLength = 0
        if(marketsArray.length > 40){
            marketLength = 40
        }
        else{
            marketLength = marketsArray.length
        }
        for(i = 0 ; i <marketLength ; i++){
            if(i == 0){
                query = query + marketsArray[i]
            }else{
                query = query + "," + marketsArray[i]
            }
        }

        // console.log(query)
        await page.goto("https://ero.betfair.it/www/sports/exchange/readonly/v1/bymarket?_ak=nzIFcwyWhrlwYMrh&alt=json&currencyCode=EUR&locale=it&marketIds=" + query +"&types=MARKET_STATE,RUNNER_STATE,RUNNER_EXCHANGE_PRICES_BEST,RUNNER_DESCRIPTION");
        await page.content();

        let Odds = await page.evaluate(() =>  {
            return JSON.parse(document.querySelector("body").innerText);
        });

        await browser.close();
        return Odds;
    }

    async Betfair_it_Score(eventsArray){
        let headless = true;
        const browser = await puppeteer.launch({headless: headless});
        const page = await browser.newPage();
        let query = ''
        for(i = 0 ; i <eventsArray.length ; i++){
            if(i == 0){
                query = query + eventsArray[i]
            }else{
                query = query + "," + eventsArray[i]
            }
        }
        await page.goto("https://ips.betfair.it/inplayservice/v1/eventTimelines?_ak=nzIFcwyWhrlwYMrh&alt=json&eventIds="+ query +"&locale=it");
        await page.content();

        let events = await page.evaluate(() =>  {
            return JSON.parse(document.querySelector("body").innerText);
        });

        await browser.close();
        return events;
    }

    async statisticsData(){
        let headless = true;
        const browser = await puppeteer.launch({headless: headless});
        const page = await browser.newPage();

        await page.goto("https://www.statistichesulcalcio.com/sequenze_gen.php");
        await page.content();


        const html = await page.content();
        const $ = cheerio.load(html);
        const groupTeamlist = []

        $('div#modificante table').each(function(i, elem) {
            const teamNames = [];
            let groupName1 = $(elem).find('caption').text()
            let bl = ''
            let marketType = ''
            let direction = 0
            let groupName = ''
            if(groupName1 == 'Sequenze over 0,5'){
                groupName = '- Over 0.5 Back'
                marketType = 'OVER_UNDER_05'
                bl = 'Back'
            }
            else if(groupName1 == 'Sequenze over 1,5'){
                groupName = '- Over 1.5 Back'
                marketType = 'OVER_UNDER_15'
                bl = 'Back'
            }
            else if(groupName1 == 'Sequenza under 2,5'){
                groupName = '- Under 2.5 Back'
                marketType = 'OVER_UNDER_25'
                bl = 'Back'
            }
            else if(groupName1 == 'Sequenza over 2,5'){
                groupName = '- Over 2.5 Back'
                marketType = 'OVER_UNDER_25'
                bl = 'Back'
            }
            else if(groupName1 == 'Sequenza under 3,5'){
                groupName = '- Under 3.5 Back'
                marketType = 'OVER_UNDER_35'
                bl = 'Back'
            }
            else if(groupName1 == 'Sequenza over 3,5'){
                groupName = '- Over 3.5 Back'
                marketType = 'OVER_UNDER_35'
                bl = 'Back'
            }
            else if(groupName1 == 'Vince da' || groupName1 == 'Non pareggia da'){
                groupName = '- X - Lay'
                marketType = 'MATCH_ODDS'
                bl = 'Lay'
            }
            else if(groupName1 == 'Perde da' || groupName1 == 'Non vince da'){
                groupName = '- 1 - Lay or - 2 Lay'
                marketType = 'MATCH_ODDS'
                bl = 'Lay or Back'
                direction = 1
            }
            else if(groupName1 == 'Non perde da'){
                groupName = '- 1 - Lay or - 2 Lay'
                marketType = 'MATCH_ODDS'
                bl = 'Lay or Back'
                direction = 2
            }
            else if(groupName1 == 'Vince in casa da'){
                groupName = '- X - Lay'
                marketType = 'MATCH_ODDS'
                bl = 'Lay'
                direction = 3
            }
            else if(groupName1 == 'Pareggia in casa da'){
                groupName = '- X - Back'
                marketType = 'MATCH_ODDS'
                bl = 'Back'
                direction = 3
            }
            else if(groupName1 == 'Perde in casa da' || groupName1 == 'Non vince in casa da'){
                groupName = '- 1 - Lay'
                marketType = 'MATCH_ODDS'
                bl = 'Lay'
                direction = 3
            }
            else if(groupName1 == 'Non pareggia in casa da'){
                groupName = '- X - Lay'
                marketType = 'MATCH_ODDS'
                bl = 'Lay'
                direction = 3
            }
            else if(groupName1 == 'Non perde in casa da'){
                groupName = '- 2 - Lay'
                marketType = 'MATCH_ODDS'
                bl = 'Lay'
                direction = 3
            }
            else if(groupName1 == 'Vince fuori da' || groupName1 == 'Non pareggia fuori da'){
                groupName = '- X - Lay'
                marketType = 'MATCH_ODDS'
                bl = 'Lay'
                direction = 4
            }
            else if(groupName1 == 'Pareggia fuori da'){
                groupName = '- X - Back'
                marketType = 'MATCH_ODDS'
                bl = 'Back'
                direction = 4
            }
            else if(groupName1 == 'Perde fuori da' || groupName1 == 'Non vince fuori da'){
                groupName = '- 2 - Lay'
                marketType = 'MATCH_ODDS'
                bl = 'Lay'
                direction = 4
            }
            else if(groupName1 == 'Non perde fuori da'){
                groupName = '- 1 - Lay'
                marketType = 'MATCH_ODDS'
                bl = 'Lay'
                direction = 4
            }

            if(groupName1 == 'Sequenze over 0,5' || groupName1 == 'Sequenze over 1,5' || groupName1 == 'Sequenza under 2,5' || groupName1 == 'Sequenza over 2,5' || groupName1 == 'Sequenza under 3,5' || groupName1 == 'Sequenza over 3,5' || groupName1 == 'Vince da' || groupName1 == 'Non pareggia da' || groupName1 == 'Perde da' || groupName1 == 'Non vince da' || groupName1 == 'Non perde da' || groupName1 == 'Vince in casa da' || groupName1 == 'Pareggia in casa da' || groupName1 == 'Perde in casa da' || groupName1 == 'Non vince in casa da' || groupName1 == 'Non pareggia in casa da' || groupName1 == 'Non perde in casa da' || groupName1 == 'Vince fuori da' || groupName1 == 'Non pareggia fuori da' || groupName1 == 'Pareggia fuori da' || groupName1 == 'Perde fuori da' || groupName1 == 'Non vince fuori da' || groupName1 == 'Non perde fuori da'){

                let teamLabel = ''
                let k = 0;
                $(elem).find('tr > th').each(function(i, elem2) {
                    k = k + 1
                    if(k == 2){
                        teamLabel = $(elem2).text()
                    }
                });

                $(elem).find('tbody').find('tr').each(function(i, elem1) {
                    let teamName = $(elem1).find('td > a').text()
                    let teamOver = $(elem1).find('td').text()
                    let teamNo = (teamOver.split(teamName).toString()).replace(',', '')
                    if (teamName != undefined) {
                        teamNames.push({teamName, teamNo, teamLabel})
                    }
                });
                groupTeamlist.push({groupName1, groupName, teamNames, bl, marketType, direction})
            }

        });

        // console.log('TeamList->', groupTeamlist)

        await browser.close();
        return groupTeamlist;
    }

    async competitionOdd(url,url1,matchday,mdayNum){
        let headless = true;
        const browser = await puppeteer.launch({headless: headless});
        const page = await browser.newPage();

        await page.goto(url);
        await page.content();

        const html = await page.content();
        const $ = cheerio.load(html);

        const leagueTeamList = []
        let homeTeam = ''
        let homeRank = ''
        let score = ''
        let score1 = ''
        let awayTeam = ''
        let awayRank = ''
        let time = ''
        let index = 0
        let arrayIndex = 0
        let scoreRecord = ''
        let scoreRecordArray = []
        $('.box').find('table').each(function(i, elem) {
            index++
            // console.log('homeTeam',$(elem).text())
            let scoreRecord1 = 0
            if(index > 3){
                let k = 0
                scoreRecordArray = []
                $(elem).find('tr > td').each(function(i, elem1) {
                    k++
                    if(k == 1){
                        homeTeam = $(elem1).find('a').text()
                        homeRank = $(elem1).find('span').text()
                    }
                    if(k == 5){
                        score = $(elem1).find('span > a').text()
                        score1 = $(elem1).find('span > span').text()
                    }
                    if(k == 8){
                        awayTeam = $(elem1).find('a').text()
                        awayRank = $(elem1).find('span').text()
                    }
                })

                let kk = 0
                $(elem).find('tr').each(function(i, elem1) {
                    kk++
                    if(kk == 2){
                        let timeString = $(elem1).find('td').text()
                        time = timeString
                    }
                    else{
                        scoreRecord = ''
                        let c = 0
                        $(elem1).find('td').each(function(i, elem2) {
                            if(i == 0){
                                let scoreRecord0 = scoreRecord + $(elem2).find('span > span').text() + ' '
                                if(scoreRecord0.includes("'")){
                                    scoreRecord1 = 1
                                }
                            }
                            if(i ==  1){
                                scoreRecord = scoreRecord + $(elem2).text() + ' '
                            }
                            if(i == 2){
                                scoreRecord = scoreRecord + $(elem2).text()
                                if($(elem2).text().replace(/[\n\t\r]/g,"").includes(':') == true){
                                    c = 1
                                }
                            }
                            if(i == 3){
                                scoreRecord = scoreRecord + ' ' +$(elem2).text()
                            }
                        })
                        if(c == 1){
                            scoreRecordArray.push(scoreRecord.trim())
                            // console.log(scoreRecord)
                        }
                    }
                })
            }

            if(homeTeam != '' && awayTeam != '' && score != '' && scoreRecord1 == 0){
                arrayIndex++
                let time1 = time.split(',')
                leagueTeamList[arrayIndex - 1] = {'homeTeam': homeTeam.replace(/[\n\t\r]/g,""),'homeRank': homeRank.replace(/[\n\t\r]/g,""), 'awayTeam':awayTeam.replace(/[\n\t\r]/g,""), 'awayRank': awayRank.replace(/[\n\t\r]/g,""), 'score': score.replace(/[\n\t\r]/g,""), 'time': time1[0].replace(/[\n\t\r]/g,"") + "," + time1[1].substring(3,time1[1].length).replace(/[\n\t\r]/g,"") + "," + time1[2].replace(/[\n\t\r]/g,""),'scoreRecord': scoreRecordArray}
            }
            else if(scoreRecord1 == 1){
                arrayIndex++
                let time1 = time.split(',')
                leagueTeamList[arrayIndex - 1] = {'homeTeam': homeTeam.replace(/[\n\t\r]/g,""),'homeRank': homeRank.replace(/[\n\t\r]/g,""), 'awayTeam':awayTeam.replace(/[\n\t\r]/g,""), 'awayRank': awayRank.replace(/[\n\t\r]/g,""), 'score': '-:-', 'time': time1[0].replace(/[\n\t\r]/g,"") + "," + time1[1].substring(3,time1[1].length).replace(/[\n\t\r]/g,"") + "," + time1[2].replace(/[\n\t\r]/g,""),'scoreRecord': scoreRecordArray}
            }
            else if(homeTeam != '' && awayTeam != '' && score1 == 'moved' && scoreRecord1 == 0){
                arrayIndex++
                let time1 = time.split(',')
                let home_score = 0
                let away_score = 0

                if(scoreRecordArray.length > 0){
                    let str1 = scoreRecordArray[scoreRecordArray.length - 1].split(' ')[0]
                    if(str1.includes(':')){
                        home_score = str1.split(':')[0]
                        away_score = str1.split(':')[1]
                    }

                    let str2 = scoreRecordArray[scoreRecordArray.length - 1].split(' ')[1]
                    if(str2.includes(':')){
                        home_score = str2.split(':')[0]
                        away_score = str2.split(':')[1]
                    }
                }
                leagueTeamList[arrayIndex - 1] = {'homeTeam': homeTeam.replace(/[\n\t\r]/g,""),'homeRank': homeRank.replace(/[\n\t\r]/g,""), 'awayTeam':awayTeam.replace(/[\n\t\r]/g,""), 'awayRank': awayRank.replace(/[\n\t\r]/g,""), 'score': home_score+":"+away_score, 'time': time1[0].replace(/[\n\t\r]/g,"") + "," + time1[1].substring(3,time1[1].length).replace(/[\n\t\r]/g,"") + "," + time1[2].replace(/[\n\t\r]/g,""),'scoreRecord': scoreRecordArray}
            }

        })
        await browser.close();

        let c = 0
        $('.chzn-container-single').find('.chzn-results').find('li').each(function (i, element) {
            let string = $(element).text()
            if(string.includes('Matchday')){
                c++
            }
        })
       return [leagueTeamList, url1, matchday, mdayNum, c];
    }

    async getFixtureIds(date) {
        let fixtureIds = await axios({
            "method":"GET",
            "url":"https://api-football-beta.p.rapidapi.com/fixtures",
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"api-football-beta.p.rapidapi.com",
                "x-rapidapi-key":"5cecb77a9dmshd850fb2de5e3c74p1f86d8jsn4d7396441e30",
                "useQueryString":true
            },"params":{
                "date":date
            }
        })

        return fixtureIds.data
    }

    async getLiveStatistics(fixture_id) {
        // let fixture_id = "167410"
        let event = await axios({
            "method":"GET",
            "url":"https://api-football-beta.p.rapidapi.com/fixtures/statistics",
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"api-football-beta.p.rapidapi.com",
                "x-rapidapi-key":"5cecb77a9dmshd850fb2de5e3c74p1f86d8jsn4d7396441e30",
                "useQueryString":true
            },"params":{
                "fixture":fixture_id
            }
        })

        return event.data

    }

    async getLiveStats() {
        let data = await axios({
            "method":"GET",
            "url":"https://soccer.sportmonks.com/api/v2.0/livescores/now",
            "params":{
                "api_token":'FI1DaGpM4jI9KNopogz3dCfZkPoXXU7wxpMtO6Pab4jWT5AJdoE4fCive8a1',
                "include":"stats,localTeam,visitorTeam,events"
            }
        })
        return data.data.data
    }

    async getWholeTeamsbyDay(date, page) {
        let data = await axios({
            "method":"GET",
            "url":"https://soccer.sportmonks.com/api/v2.0/fixtures/date/"+date,
            "params":{
                "api_token":'FI1DaGpM4jI9KNopogz3dCfZkPoXXU7wxpMtO6Pab4jWT5AJdoE4fCive8a1',
                "include":"localTeam,visitorTeam,stats,events,lineup",
                "tz":"GMT + 0",
                "page":page
            }
        })
        return data.data.data
    }

    async getWholefixturePagebyDay(date) {
        let data = await axios({
            "method":"GET",
            "url":"https://soccer.sportmonks.com/api/v2.0/fixtures/date/"+date,
            "params":{
                "api_token":'FI1DaGpM4jI9KNopogz3dCfZkPoXXU7wxpMtO6Pab4jWT5AJdoE4fCive8a1',
                "include":"localTeam,visitorTeam",
                "tz":"GMT + 0",
                "page":"1"
            }
        })
        return data.data.meta
    }

    async getWholeleagues() {
        let data = await axios({
            "method":"GET",
            "url":"https://soccer.sportmonks.com/api/v2.0/leagues",
            "params":{
                "api_token":'FI1DaGpM4jI9KNopogz3dCfZkPoXXU7wxpMtO6Pab4jWT5AJdoE4fCive8a1',
                "include":"country,season",
                "page":"2"
            }
        })
        return data.data.data
    }

    async getWholeTeams(seasonId) {
        let data = await axios({
            "method":"GET",
            "url":"https://soccer.sportmonks.com/api/v2.0/teams/season/"+seasonId,
            "params":{
                "api_token":'FI1DaGpM4jI9KNopogz3dCfZkPoXXU7wxpMtO6Pab4jWT5AJdoE4fCive8a1',
                "include":"country, league"
            }
        })
        return data.data.data
    }

    async getRoundsId(seasonId) {
        let data = await axios({
            "method":"GET",
            "url":"https://soccer.sportmonks.com/api/v2.0/rounds/season/"+ seasonId,
            "params":{
                "api_token":'FI1DaGpM4jI9KNopogz3dCfZkPoXXU7wxpMtO6Pab4jWT5AJdoE4fCive8a1'
            }
        })
        return data.data.data
    }

    async getEventsAllRounds(roundId, fixtureId) {
        let data = await axios({
            "method":"GET",
            "url":"https://soccer.sportmonks.com/api/v2.0/rounds/"+ roundId,
            "params":{
                "api_token":'FI1DaGpM4jI9KNopogz3dCfZkPoXXU7wxpMtO6Pab4jWT5AJdoE4fCive8a1',
                "include": "fixtures.events, fixtures.stats"
            }
        })
        return [data.data.data, roundId, fixtureId]
    }

    async standingsSeason(seasonId) {
        let data = await axios({
            "method":"GET",
            "url":"https://soccer.sportmonks.com/api/v2.0/standings/season/"+ seasonId,
            "params":{
                "api_token":'FI1DaGpM4jI9KNopogz3dCfZkPoXXU7wxpMtO6Pab4jWT5AJdoE4fCive8a1'
            }
        })
        return [data.data.data, seasonId]
    }

    async players_role(id, url){
        let headless = true;
        const browser = await puppeteer.launch({headless: headless});
        const page = await browser.newPage();

        await page.goto(url);
        await page.content();

        const html = await page.content();
        const $ = cheerio.load(html);

        let player_role_array = []
        let team_id = id
        $('.responsive-table').find('table').each(function(i, elem) {
            $(elem).find('tbody > tr').each(function(i, elem1) {
                let player_number = ''
                let player_name = $(elem1).find('.hauptlink').text()
                $(elem1).find('.zentriert').each(function(i, elem4) {
                    player_number = $(elem4).text()
                    // console.log('player_number====>', $(elem4).text())
                })
                let player_alt_role1 = ''
                let player_alt_role2 = ''
                $(elem1).find('.pos_1').each(function(i, elem2) {
                    if(i === 0){
                        player_alt_role1 = $(elem2).text()
                    }
                    else if(i === 1){
                        player_alt_role2 = $(elem2).text()
                    }
                    // console.log('player_name====>', $(elem1).find('.hauptlink').text(), ', ' ,'players_role2===>', $(elem2).text(), '')
                })
                let player_main_role = ''
                $(elem1).find('.pos_2').each(function(i, elem3) {
                    player_main_role = $(elem3).text()
                    // console.log('player_name====>', $(elem1).find('.hauptlink').text(), ', ' ,'players_role1===>', $(elem3).text(), '')
                })

                if(player_number){
                    player_role_array.push({"player_number": player_number, "player_name": player_name, "player_main_role": player_main_role, "player_alt_role1": player_alt_role1, "player_alt_role2": player_alt_role2})
                }
            })
        })
        // console.log('player_role_array=>', player_role_array)
        await browser.close();

        return [team_id, player_role_array];
    }

    async players_marketValue(id, url){
        let headless = true;
        const browser = await puppeteer.launch({headless: headless});
        const page = await browser.newPage();

        await page.goto(url);
        await page.content();

        const html = await page.content();
        const $ = cheerio.load(html);
        let player_marketvalue_array = []
        let team_id = id
        $('.responsive-table').find('table').each(function(i, elem) {
            $(elem).find('tbody > tr').each(function(i, elem1) {
                let player_number = ''
                let player_name = ''
                let player_marketvalue = ''
                $(elem1).find('.zentriert').find('.rn_nummer').each(function(i, elem4) {
                    player_number = $(elem4).text()
                })
                $(elem1).find('.hide').each(function(i, elem2) {
                    player_name = $(elem2).text()
                })
                $(elem1).find('.rechts').each(function(i, elem3) {
                    player_marketvalue = $(elem3).text()
                })
                if(player_number != ''){
                    player_marketvalue_array.push({'player_number': player_number, 'player_name': player_name, 'player_marketvalue': player_marketvalue})
                }
            })
        })
        // console.log('player_marketvalue_array=>', player_marketvalue_array)
        await browser.close();

        return [team_id, player_marketvalue_array];
    }

    async players_titularity(seasonId, teamId) {
        let data = await axios({
            "method":"GET",
            "url":"https://soccer.sportmonks.com/api/v2.0/squad/season/" + seasonId + "/team/" + teamId,
            "params":{
                "api_token":'FI1DaGpM4jI9KNopogz3dCfZkPoXXU7wxpMtO6Pab4jWT5AJdoE4fCive8a1'
            }
        })
        return [teamId, data.data.data]
    }

    async team_season_statics(seasonId, teamId) {
        let data = await axios({
            "method":"GET",
            "url":"https://soccer.sportmonks.com/api/v2.0/teams/"+teamId,
            "params":{
                "api_token":'FI1DaGpM4jI9KNopogz3dCfZkPoXXU7wxpMtO6Pab4jWT5AJdoE4fCive8a1',
                "include": "stats",
                "seasons": seasonId
            }
        })
        return [teamId, data.data.data]
    }
}

module.exports = Betfair;