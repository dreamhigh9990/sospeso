const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

require('dotenv').config()
const {schedule} = require('node-cron');
const betfair =require('./functions/betfair');

mongoose.Promise = global.Promise;
console.log('MONGODB_URI',process.env.MONGODB_URI)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});

let io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.status(200).send('Server is running on port 5000!');
});

MongoClient.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, async (err, client) => {
    if (err) {
        console.error(err)
        return
    }
    const db = client.db('betfair_tool')
    //todo prediction data scrapping part
    let task;
    task = schedule('0 */27 * * * *', async () => {
        let service = new betfair();
        let start_date = new Date();
        let next_date = start_date.setDate(start_date.getDate() + 0);
        let end_date = start_date.setDate(start_date.getDate() + 1);
        next_date = new Date(next_date).toISOString()
        end_date = new Date(end_date).toISOString()
        next_date = next_date.substring(0,11)+'00:00:00'+ next_date.substring(19,24)
        end_date = end_date.substring(0,11)+'04:00:00'+ end_date.substring(19,24)

        let filter = await db.collection('filters').find().toArray()
        filter[0].filter.marketStartingAfter = next_date
        filter[0].filter.marketStartingBefore = end_date

        let data = await service.getMainData(filter[0])

        if(!data.attachments.events){
            return
        }
        let events = Object.values(data.attachments.events)
        let markets = Object.values(data.attachments.markets)
        let competitions = Object.values(data.attachments.competitions)
        let predictionList = []
        let eventList0 = events
        console.log('betfair.come->', events.length, markets.length, competitions.length)

        // for(i = 0 ; i < events.length ; i++){
        //     console.log('events===>', events[i].name)
        // }

        for(i = 0; i < eventList0.length; i++){
            let name1 = eventList0[i].name.split(' v ').splice(0,1).toString().trim()
            let name2 = eventList0[i].name.split(' v ').splice(1,1).toString().trim()
            let name11 = ''
            let name22 = ''
            let marketNode1 = []
            let marketArray1 = []
            let index = 0
            let teamNameList = await db.collection('teamNameLists').find().toArray()
            let teamGroups = await db.collection('teamlist').find().toArray()

            let teamGroup1 = teamNameList.filter(function(item) {
                return item.betfair_com == name1;
            });
            if(teamGroup1.length > 0){
                name11 = teamGroup1[0].statistic
            }

            let teamGroup2 = teamNameList.filter(function(item) {
                return item.betfair_com == name2;
            });
            if(teamGroup2.length > 0){
                name22 = teamGroup2[0].statistic
            }

            for(let ii = 0 ;  ii < teamGroups.length ; ii++){
                let groupAverage = 0
                let groupSum = 0
                for(let a = 0 ; a < teamGroups[ii].teamNames.length; a++){
                    groupSum = groupSum + parseInt(teamGroups[ii].teamNames[a].teamNo)
                }
                groupAverage = groupSum/teamGroups[ii].teamNames.length
                for(let jj = 0 ; jj < teamGroups[ii].teamNames.length ; jj++){
                    if(teamGroups[ii].teamNames[jj].teamName == name1 || teamGroups[ii].teamNames[jj].teamName == name11){
                        let groupList = teamGroups[ii].groupName
                        let marketType =  teamGroups[ii].marketType
                        let direction = teamGroups[ii].direction
                        let teamValue = teamGroups[ii].teamNames[jj].teamNo
                        if(groupList == '- Over 0.5 Back' && direction == 0){
                            index += 1
                            marketNode1[index] =eventList0[i].name + ' - Over 0.5 Back'
                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- Over 1.5 Back' && direction == 0){
                            index += 1
                            marketNode1[index] =eventList0[i].name + ' - Over 1.5 Back'
                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- Under 2.5 Back' && direction == 0){
                            index += 1
                            marketNode1[index] =eventList0[i].name + ' - Under 2.5 Back'
                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',0,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- Over 2.5 Back' && direction == 0 || groupList == '- Over 3.5 Back' && direction == 0){
                            index += 1
                            marketNode1[index] =eventList0[i].name + ' - Over 2.5 Back'
                            if(groupList == '- Over 3.5 Back' && direction == 0){
                                marketType = 'OVER_UNDER_25'
                            }
                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- Under 3.5 Back' && direction == 0){
                            index += 1
                            marketNode1[index] =eventList0[i].name + ' - Under 3.5 Back'
                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',0,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- X - Lay' && direction == 0){
                            index += 1
                            marketNode1[index] =eventList0[i].name + ' - X - Lay'
                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',1,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- X - Back' && direction == 0){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - X - Back'
                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',0,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 1){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - 1 - Lay'
                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',1,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 2){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - 2 - Lay'
                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',1,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- X - Lay' && direction == 3){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - X - Lay'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',1,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- X - Back' && direction == 3){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - X - Back'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',0,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- 1 - Lay' && direction == 3){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - 1 - Lay'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',1,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- 2 - Lay' && direction == 3){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - 2 - Lay'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',1,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                    }
                    else if(teamGroups[ii].teamNames[jj].teamName == name2 || teamGroups[ii].teamNames[jj].teamName == name22){
                        let groupList = teamGroups[ii].groupName
                        let marketType =  teamGroups[ii].marketType
                        let direction = teamGroups[ii].direction
                        let teamValue = teamGroups[ii].teamNames[jj].teamNo

                        if(groupList == '- Over 0.5 Back' && direction == 0){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - Over 0.5 Back'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- Over 1.5 Back' && direction == 0){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - Over 1.5 Back'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- Under 2.5 Back' && direction == 0){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - Under 2.5 Back'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',0,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- Over 2.5 Back' && direction == 0 || groupList == '- Over 3.5 Back' && direction == 0){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - Over 2.5 Back'

                            if(groupList == '- Over 3.5 Back' && direction == 0){
                                marketType = 'OVER_UNDER_25'
                            }

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- Under 3.5 Back' && direction == 0){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - Under 3.5 Back'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',0,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- X - Lay' && direction == 0){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - X - Lay'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',1,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- X - Back' && direction == 0){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - X - Back'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',0,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 1){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - 2 - Lay'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',1,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 2){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - 1 - Lay'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',1,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- X - Lay' && direction == 4){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - X - Lay'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',1,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- X - Back' && direction == 4){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - X - Back'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',0,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- 2 - Lay' && direction == 4){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - 2 - Lay'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',1,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                        else if(groupList == '- 1 - Lay' && direction == 4){
                            index += 1
                            marketNode1[index] = eventList0[i].name + ' - 1 - Lay'

                            marketArray1[index] = eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',1,' + eventList0[i].openDate.substring(0,10)
                            predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                        }
                    }
                }
            }

        }
        let eventLists2 = []
        for( i = 0 ; i < predictionList.length ; i++){
            let check = 0
            for(let j = 0 ; j < eventLists2.length ; j++){
                if(predictionList[i].label == eventLists2[j].label){
                    check = 1
                }
            }
            if(check == 0){
                eventLists2.push({'value': predictionList[i].value, 'label': predictionList[i].label})
            }
        }
        console.log('second prediction', eventLists2)
        for(j = 0 ; j < eventLists2.length ; j++){
            for(i = 0; i < events.length; i++){
                let predictionEventId = parseInt(eventLists2[j].value.split(',')[0])
                let predictionMarketType = eventLists2[j].value.split(',')[1]
                if(predictionEventId == events[i].eventId){
                    let query = {"eventId": events[i].eventId}
                    let check0 = await db.collection('events').find(query).toArray()
                    if(check0.length === 0){
                        db.collection('events').updateOne(query,
                            {$set: {
                                    '_id': events[i].eventId,
                                    'eventId': events[i].eventId,
                                    'name': events[i].name,
                                    'eventTypeId': events[i].eventTypeId,
                                    'countryCode': events[i].countryCode,
                                    'openDate': events[i].openDate,
                                    'date': events[i].openDate.substring(0, 10),
                                    'scores':[]
                                }},
                            {upsert: true},
                            function (err, item) {
                                if (err) { return }
                            })
                    }
                    else{
                        db.collection('events').updateOne(query,
                            {$set: {
                                    '_id': events[i].eventId,
                                    'eventId': events[i].eventId,
                                    'name': events[i].name,
                                    'eventTypeId': events[i].eventTypeId,
                                    'countryCode': events[i].countryCode,
                                    'openDate': events[i].openDate,
                                    'date': events[i].openDate.substring(0, 10)
                                }},
                            {upsert: true},
                            function (err, item) {
                                if (err) { return }
                            })
                    }

                    let eventId_check = 0
                    for(k = 0 ; k < markets.length; k++){
                        if(markets[k].inplay === false){
                            if(markets[k].eventId == predictionEventId && markets[k].marketType == predictionMarketType){
                                eventId_check++
                                let query = {"marketId": markets[k].marketId.toString()}
                                let check0 = await db.collection('markets').find(query).toArray()
                                if(check0.length === 0){
                                    await db.collection('markets').updateOne(query,
                                        {$set: {
                                            '_id': markets[k].marketId,
                                            'marketId': markets[k].marketId,
                                            'eventId': markets[k].eventId,
                                            'marketName': markets[k].marketName,
                                            'marketTime': markets[k].marketTime,
                                            'marketSuspendTime': markets[k].marketSuspendTime,
                                            'upperLevelEventId': markets[k].upperLevelEventId,
                                            'topLevelEventId': markets[k].topLevelEventId,
                                            'canTurnInPlay': markets[k].canTurnInPlay,
                                            'marketType': markets[k].marketType,
                                            'inplay': markets[k].inplay,
                                            'totalMatched': markets[k].totalMatched,
                                            'totalAvailable': markets[k].totalAvailable,
                                            'runners': markets[k].runners,
                                            'bettingType': markets[k].bettingType,
                                            'marketStatus': markets[k].marketStatus,
                                            'productType': markets[k].productType,
                                            'Odds':[]
                                            }},
                                        {upsert: true},
                                        function (err, item) {
                                            if (err) { return }
                                        })
                                }
                                // else{
                                //     await db.collection('markets').updateOne(query,
                                //         {$set: {
                                //                 '_id': markets[k].marketId,
                                //                 'marketId': markets[k].marketId,
                                //                 'eventId': markets[k].eventId,
                                //                 'marketName': markets[k].marketName,
                                //                 'marketTime': markets[k].marketTime,
                                //                 'marketSuspendTime': markets[k].marketSuspendTime,
                                //                 'upperLevelEventId': markets[k].upperLevelEventId,
                                //                 'topLevelEventId': markets[k].topLevelEventId,
                                //                 'canTurnInPlay': markets[k].canTurnInPlay,
                                //                 'marketType': markets[k].marketType,
                                //                 'inplay': markets[k].inplay,
                                //                 'totalMatched': markets[k].totalMatched,
                                //                 'totalAvailable': markets[k].totalAvailable,
                                //                 'runners': markets[k].runners,
                                //                 'bettingType': markets[k].bettingType,
                                //                 'marketStatus': markets[k].marketStatus,
                                //                 'productType': markets[k].productType
                                //             }},
                                //         {upsert: true},
                                //         function (err, item) {
                                //             if (err) { return }
                                //         })
                                // }

                                let check1 = await db.collection('predictionOdds').find(query).toArray()
                                if(check1.length === 0){
                                    await db.collection('predictionOdds').updateOne(query,
                                        {$set: {
                                                '_id': markets[k].marketId,
                                                'marketId': markets[k].marketId,
                                                'eventId': markets[k].eventId,
                                                'Odds': [],

                                            }},
                                        {upsert: true},
                                        function (err, item) {
                                            if (err) { return }
                                        })
                                }

                                let query1 = {"eventId": markets[k].eventId}
                                db.collection('events').updateOne(query1,
                                    {$set: {
                                            'upperLevelEventId': markets[k].upperLevelEventId,
                                            'topLevelEventId': markets[k].topLevelEventId,
                                        }},
                                    function (err, item) {
                                        if (err) { return }
                                    })

                                let query2 = {"marketId": markets[k].marketId.toString()}
                                await db.collection('marketHistory').updateOne(query2,
                                    {$set: {
                                            '_id': markets[k].marketId,
                                            'marketId': markets[k].marketId,
                                            'eventId': markets[k].eventId,
                                            'marketName': markets[k].marketName,
                                            'marketTime': markets[k].marketTime,
                                            'marketSuspendTime': markets[k].marketSuspendTime,
                                            'upperLevelEventId': markets[k].upperLevelEventId,
                                            'topLevelEventId': markets[k].topLevelEventId,
                                            'canTurnInPlay': markets[k].canTurnInPlay,
                                            'marketType': markets[k].marketType,
                                            'inplay': markets[k].inplay,
                                            'totalMatched': markets[k].totalMatched,
                                            'totalAvailable': markets[k].totalAvailable,
                                            'bettingType': markets[k].bettingType,
                                            'marketStatus': markets[k].marketStatus,
                                            'productType': markets[k].productType
                                        }},
                                    {upsert: true},
                                    function (err, item) {
                                        if (err) { return }
                                    })
                            }
                        }
                    }
                    if(eventId_check == 0){
                        // db.collection('events').deleteOne({"eventId": events[i].eventId})
                    }
                }
            }
        }

        for(i = 0; i < competitions.length; i++){
            let query = {"eventId": competitions[i].eventId}
            db.collection('competitions').updateOne(
                query,
                {$set: {
                        'key': competitions[i].key,
                        'name': competitions[i].name,
                        'competitionId': competitions[i].competitionId,
                        'eventId': competitions[i].eventId
                    }},
                {upsert: true},
                function (err, item) {
                    if (err) { return }
                })
        }

    });
    task.start()

    //todo predictions saving script

    let task_prediction
    task_prediction = schedule('0 */37 * * * *', async () => {
        var d = new Date();
        var date = d.getUTCMonth()
        var day = d.getUTCDate()
        var n = ''
        if(date < 9 && day < 10){
            n = d.getUTCFullYear()+'-0'+(d.getUTCMonth()+1) +'-0'+d.getUTCDate()
        }
        else if(date < 9 && day > 9){
            n = d.getUTCFullYear()+'-0'+(d.getUTCMonth()+1) +'-'+d.getUTCDate()
        }
        else if(date >= 9 && day < 10){
            n = d.getUTCFullYear()+'-'+(d.getUTCMonth()+1) +'-0'+d.getUTCDate()
        }
        else if(date >= 9 && day > 9){
            n = d.getUTCFullYear()+'-'+(d.getUTCMonth()+1) +'-'+d.getUTCDate()
        }

        console.log(n)
        console.log('today_date==>', n)
        let teamNameList = await db.collection('teamNameLists').find().toArray()
        let teamGroup = await db.collection('teamlist').find().toArray()
        let eventResult = await db.collection('events').aggregate([
            { $match: {"date": n}},
            { $lookup: { from: "competitionsTotal", localField: "topLevelEventId", foreignField: "eventId", as: "competitions" } },
            { $lookup: { from: "markets", localField: "eventId", foreignField: "eventId", as: "markets" } },
            { $lookup: { from: "predictionOdds", localField: "eventId", foreignField: "eventId", as: "pre_markets" } }
        ]).toArray();

        let dailyApiEvents = await db.collection('teamNameLists').find().toArray()

        let marketNode = []
        let marketArray = []
        let m_index = 0
        let eventLists = [{'value': '', 'label': 'Select Match'}]
        let eventLists1 = [{'value':'' , 'label': 'Select Match'}]
        let teamGroups = teamGroup

        for(let i = 0; i < eventResult.length;  i++){
            let eventNode = eventResult[i]
            let eventName = eventNode.name
            let name1 = eventName.split(' v ').splice(0,1).toString().trim()
            let name2 = eventName.split(' v ').splice(1,1).toString().trim()
            let name11 = ''
            let name22 = ''

            let teamGroup1 = teamNameList.filter(function(item) {
                return item.betfair_com == name1;
            });
            if(teamGroup1.length > 0){
                name11 = teamGroup1[0].statistic
            }

            let teamGroup2 = teamNameList.filter(function(item) {
                return item.betfair_com == name2;
            });
            if(teamGroup2.length > 0){
                name22 = teamGroup2[0].statistic
            }

            for(let ii = 0 ;  ii < teamGroups.length ; ii++){
                let groupAverage = 0
                let groupSum = 0
                for(let a = 0 ; a < teamGroups[ii].teamNames.length; a++){
                    groupSum = groupSum + parseInt(teamGroups[ii].teamNames[a].teamNo)
                }
                groupAverage = groupSum/teamGroups[ii].teamNames.length
                for(let jj = 0 ; jj < teamGroups[ii].teamNames.length ; jj++){
                    if(teamGroups[ii].teamNames[jj].teamName == name1 || teamGroups[ii].teamNames[jj].teamName == name11){
                        let groupList = teamGroups[ii].groupName
                        let marketType =  teamGroups[ii].marketType
                        let direction = teamGroups[ii].direction
                        let bl = teamGroups[ii].bl
                        let teamValue = teamGroups[ii].teamNames[jj].teamNo
                        for(let j = 0; j < eventNode.markets.length; j++){
                            if(eventNode.markets[j].marketStatus != 'CLOSED') {
                                if (eventNode.markets[j].marketType == "MATCH_ODDS" && marketType == "MATCH_ODDS") {
                                    let runnerNode = eventNode.markets[j].runners
                                    let runnerNode1 = eventNode.markets[j].prematchMarket.runners
                                    for (let k = 0; k < runnerNode.length; k++) {
                                        let runnerName = ''
                                        if(runnerNode[k].description){
                                            runnerName = runnerNode[k].description.runnerName
                                        }
                                        else{
                                            runnerName = runnerNode[k].runnerName
                                        }
                                        marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                        if(groupList == '- X - Lay' && direction == 0){
                                            if(runnerName == 'The Draw'){
                                                marketNode[m_index] = eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - X - Lay"
                                                let label =eventNode.name + " - X - Lay"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId === runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(prematch_Odd[0].exchange.availableToLay){
                                                    prematchOdd_value = prematch_Odd[0].exchange.availableToLay[0].price
                                                }
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label , 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1, 'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- X - Lay', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '2', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- X - Back' && direction == 0){
                                            if(runnerName == 'The Draw'){
                                                marketNode[m_index] = eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - X - Back"
                                                let label = eventNode.name + " - X - Back"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(prematch_Odd[0].exchange.availableToBack){
                                                    prematchOdd_value = prematch_Odd[0].exchange.availableToBack[0].price
                                                }
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label, 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- X - Back', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '1', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 1){
                                            if(runnerName == name1){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - 1 - Lay"
                                                let label = eventNode.name + " - 1 - Lay"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(runnerNode1[0].exchange.availableToLay){
                                                    prematchOdd_value = runnerNode1[0].exchange.availableToLay[0].price
                                                }
                                                marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[0].selectionId + "," + eventNode.eventId
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label, 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- 1 - Lay', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '3', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- X - Lay' && direction == 0){
                                            if(runnerName == 'The Draw'){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - X - Lay"
                                                let label = eventNode.name + " - X - Lay"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(prematch_Odd[0].exchange.availableToLay){
                                                    prematchOdd_value = prematch_Odd[0].exchange.availableToLay[0].price
                                                }
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label, 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- X - Lay', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '2', 'prematch_Odd': prematchOdd_value, 'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 2){
                                            if(runnerName == name1){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - 2 - Lay"
                                                let label = eventNode.name + " - 2 - Lay"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(runnerNode1[1].exchange.availableToLay){
                                                    prematchOdd_value = runnerNode1[1].exchange.availableToLay[0].price
                                                }
                                                marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[1].selectionId + "," + eventNode.eventId
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label, 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- 2 - Lay', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '4', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- X - Lay' && direction == 3){
                                            if(runnerName == 'The Draw'){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - X - Lay"
                                                let label = eventNode.name + " - X - Lay"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(prematch_Odd[0].exchange.availableToLay){
                                                    prematchOdd_value = prematch_Odd[0].exchange.availableToLay[0].price
                                                }
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label, 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- X - Lay', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '2', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- X - Back' && direction == 3){
                                            if(runnerName == 'The Draw'){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - X - Back"
                                                let label = eventNode.name + " - X - Back"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(prematch_Odd[0].exchange.availableToBack){
                                                    prematchOdd_value = prematch_Odd[0].exchange.availableToBack[0].price
                                                }
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label, 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- X - Back', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '1', 'prematch_Odd': prematchOdd_value, 'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- 1 - Lay' && direction == 3){
                                            if(runnerName == name1){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - 1 - Lay"
                                                let label = eventNode.name + " - 1 - Lay"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(prematch_Odd[0].exchange.availableToLay){
                                                    prematchOdd_value = prematch_Odd[0].exchange.availableToLay[0].price
                                                }

                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label, 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- 1 - Lay', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '3', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- 2 - Lay' && direction == 3){
                                            if(runnerName == name1){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - 2 - Lay"
                                                let label = eventNode.name + " - 2 - Lay"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(runnerNode1[1].exchange.availableToLay){
                                                    prematchOdd_value = runnerNode1[1].exchange.availableToLay[0].price
                                                }
                                                marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[1].selectionId + "," + eventNode.eventId
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label, 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- 2 - Lay', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '4', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        m_index++
                                    }

                                } else {
                                    let runnerNode = eventNode.markets[j].runners
                                    let runnerNode1 = eventNode.markets[j].prematchMarket.runners
                                    for (let k = 0; k < runnerNode.length; k++) {
                                        let runnerName = ''
                                        if(runnerNode[k].description){
                                            runnerName = runnerNode[k].description.runnerName
                                        }
                                        else{
                                            runnerName = runnerNode[k].runnerName
                                        }
                                        if (runnerName == "Over 0.5 Goals" || runnerName == "Over 1.5 Goals" || runnerName == "Under 2.5 Goals" || runnerName == "Over 2.5 Goals" || runnerName == "Under 3.5 Goals") {
                                            marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                            if(groupList == '- Over 0.5 Back' && direction == 0 && bl == "Back"){
                                                if(runnerName == 'Over 0.5 Goals'){
                                                    marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - O 0.5 - Back"
                                                    let label = eventNode.name + " - O 0.5 - Back"
                                                    let prematch_Odd = runnerNode1.filter(function(item) {
                                                        return item.selectionId == runnerNode[k].selectionId;
                                                    });
                                                    let week = 0
                                                    if(teamValue > groupAverage){
                                                        week = 1
                                                    }
                                                    let prematchOdd_value = ''
                                                    if(prematch_Odd[0].exchange.availableToBack){
                                                        prematchOdd_value = prematch_Odd[0].exchange.availableToBack[0].price
                                                    }
                                                    eventLists1.push({'eventId': eventNode.eventId, 'id': label, 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1,'predictionType': '','value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- O 0.5 - Back', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '5', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                                }
                                            }
                                            else if(groupList == '- Over 1.5 Back' && direction == 0 && bl == "Back"){
                                                if(runnerName == 'Over 1.5 Goals'){
                                                    marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - O 1.5 - Back"
                                                    let label = eventNode.name + " - O 1.5 - Back"
                                                    let prematch_Odd = runnerNode1.filter(function(item) {
                                                        return item.selectionId == runnerNode[k].selectionId;
                                                    });
                                                    let week = 0
                                                    if(teamValue > groupAverage){
                                                        week = 1
                                                    }
                                                    let prematchOdd_value = ''
                                                    if(prematch_Odd[0].exchange.availableToBack){
                                                        prematchOdd_value = prematch_Odd[0].exchange.availableToBack[0].price
                                                    }
                                                    eventLists1.push({'eventId': eventNode.eventId, 'id': label, 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1,'predictionType': '','value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- O 1.5 - Back', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '6', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                                }
                                            }
                                            else if(groupList == '- Under 2.5 Back' && direction == 0 && bl == "Back"){
                                                if(runnerName == 'Under 2.5 Goals'){
                                                    marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - U 2.5 - Back"
                                                    let label = eventNode.name + " - U 2.5 - Back"
                                                    let prematch_Odd = runnerNode1.filter(function(item) {
                                                        return item.selectionId == runnerNode[k].selectionId;
                                                    });
                                                    let week = 0
                                                    if(teamValue > groupAverage){
                                                        week = 1
                                                    }
                                                    let prematchOdd_value = ''
                                                    if(prematch_Odd[0].exchange.availableToBack){
                                                        prematchOdd_value = prematch_Odd[0].exchange.availableToBack[0].price
                                                    }
                                                    eventLists1.push({'eventId': eventNode.eventId, 'id': label, 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1,'predictionType': '','value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- U 2.5 - Back', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '7', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                                }
                                            }
                                            else if(groupList == '- Over 2.5 Back' && direction == 0 && bl == "Back"){
                                                if(runnerName == 'Over 2.5 Goals'){
                                                    marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - O 2.5 - Back"
                                                    let label = eventNode.name + " - O 2.5 - Back"
                                                    let prematch_Odd = runnerNode1.filter(function(item) {
                                                        return item.selectionId == runnerNode[k].selectionId;
                                                    });
                                                    let week = 0
                                                    if(teamValue > groupAverage){
                                                        week = 1
                                                    }
                                                    let prematchOdd_value = ''
                                                    if(prematch_Odd[0].exchange.availableToBack){
                                                        prematchOdd_value = prematch_Odd[0].exchange.availableToBack[0].price
                                                    }
                                                    eventLists1.push({'eventId': eventNode.eventId, 'id': label, 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1,'predictionType': '','value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- O 2.5 - Back', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '8', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                                }
                                            }
                                            else if(groupList == '- Under 3.5 Back' && direction == 0 && bl == "Back"){
                                                if(runnerName == 'Under 3.5 Goals'){
                                                    marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - U 3.5 - Back"
                                                    let label = eventNode.name + " - U 3.5 - Back"
                                                    let prematch_Odd = runnerNode1.filter(function(item) {
                                                        return item.selectionId == runnerNode[k].selectionId;
                                                    });
                                                    let week = 0
                                                    if(teamValue > groupAverage){
                                                        week = 1
                                                    }
                                                    let prematchOdd_value = ''
                                                    if(prematch_Odd[0].exchange.availableToBack){
                                                        prematchOdd_value = prematch_Odd[0].exchange.availableToBack[0].price
                                                    }
                                                    eventLists1.push({'eventId': eventNode.eventId, 'id': label, 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1,'predictionType': '','value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- U 3.5 - Back', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '9', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                                }
                                            }
                                            m_index++
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if(teamGroups[ii].teamNames[jj].teamName == name2 || teamGroups[ii].teamNames[jj].teamName == name22){
                        let groupList = teamGroups[ii].groupName
                        let marketType =  teamGroups[ii].marketType
                        let direction = teamGroups[ii].direction
                        let bl = teamGroups[ii].bl
                        let teamValue = teamGroups[ii].teamNames[jj].teamNo
                        for(let j = 0; j < eventNode.markets.length; j++){
                            if(eventNode.markets[j].marketStatus != 'CLOSED') {
                                if (eventNode.markets[j].marketType == "MATCH_ODDS" && marketType == "MATCH_ODDS") {
                                    let runnerNode = eventNode.markets[j].runners
                                    let runnerNode1 = eventNode.markets[j].prematchMarket.runners
                                    for (let k = 0; k < runnerNode.length; k++) {
                                        let runnerName = ''
                                        if(runnerNode[k].description){
                                            runnerName = runnerNode[k].description.runnerName
                                        }
                                        else{
                                            runnerName = runnerNode[k].runnerName
                                        }

                                        marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                        if(groupList == '- X - Lay' && direction == 0){
                                            if(runnerName == 'The Draw'){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - X - Lay"
                                                let label = eventNode.name + " - X - Lay"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(prematch_Odd[0].exchange.availableToLay){
                                                    prematchOdd_value = prematch_Odd[0].exchange.availableToLay[0].price
                                                }
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label, 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType, 'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- X - Lay', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '2', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- X - Back' && direction == 0){
                                            if(runnerName == 'The Draw'){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - X - Back"
                                                let label = eventNode.name + " - X - Back"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(prematch_Odd[0].exchange.availableToBack){
                                                    prematchOdd_value = prematch_Odd[0].exchange.availableToBack[0].price
                                                }
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label,'openDate': eventNode.openDate,  'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- X - Back', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '1', 'prematch_Odd': prematchOdd_value, 'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 1){
                                            if(runnerName == name2){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - 2 - Lay"
                                                let label = eventNode.name + " - 2 - Lay"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(runnerNode1[1].exchange.availableToLay){
                                                    prematchOdd_value = runnerNode1[1].exchange.availableToLay[0].price
                                                }
                                                marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[1].selectionId + "," + eventNode.eventId
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label,'openDate': eventNode.openDate,  'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- 2 - Lay', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '4', 'prematch_Odd': prematchOdd_value, 'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- X - Lay' && direction == 0){
                                            if(runnerName == 'The Draw'){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - X - Lay"
                                                let label = eventNode.name + " - X - Lay"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(prematch_Odd[0].exchange.availableToLay){
                                                    prematchOdd_value = prematch_Odd[0].exchange.availableToLay[0].price
                                                }
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label,'openDate': eventNode.openDate,  'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- X - Lay', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '2', 'prematch_Odd': prematchOdd_value, 'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 2){
                                            if(runnerName == name2){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - 1 - Lay"
                                                let label = eventNode.name + " - 1 - Lay"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(runnerNode1[0].exchange.availableToLay){
                                                    prematchOdd_value = runnerNode1[0].exchange.availableToLay[0].price
                                                }
                                                marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[0].selectionId + "," + eventNode.eventId
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label,'openDate': eventNode.openDate,  'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- 1 - Lay', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '3', 'prematch_Odd': prematchOdd_value, 'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- X - Lay' && direction == 4){
                                            if(runnerName == 'The Draw'){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - X - Lay"
                                                let label = eventNode.name + " - X - Lay"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(prematch_Odd[0].exchange.availableToLay){
                                                    prematchOdd_value = prematch_Odd[0].exchange.availableToLay[0].price
                                                }
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label,'openDate': eventNode.openDate,  'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- X - Lay', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '2', 'prematch_Odd': prematchOdd_value, 'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- X - Back' && direction == 4){
                                            if(runnerName == 'The Draw'){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - X - Back"
                                                let value1 =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - X - Lay"
                                                let label = eventNode.name + " - X - Back"
                                                let label1 = eventNode.name + " - X - Lay"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(prematch_Odd[0].exchange.availableToBack){
                                                    prematchOdd_value = prematch_Odd[0].exchange.availableToBack[0].price
                                                }
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label,'openDate': eventNode.openDate,  'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- X - Back', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '1', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- 2 - Lay' && direction == 4){
                                            if(runnerName == name2){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - 2 - Lay"
                                                let label = eventNode.name + " - 2 - Lay"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(runnerNode1[1].exchange.availableToLay){
                                                    prematchOdd_value = runnerNode1[1].exchange.availableToLay[0].price
                                                }
                                                marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[1].selectionId + "," + eventNode.eventId
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label,'openDate': eventNode.openDate,  'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- 2 - Lay', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '4', 'prematch_Odd': prematchOdd_value, 'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        else if(groupList == '- 1 - Lay' && direction == 4){
                                            if(runnerName == name2){
                                                marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - 1 - Lay"
                                                let label = eventNode.name + " - 1 - Lay"
                                                let prematch_Odd = runnerNode1.filter(function(item) {
                                                    return item.selectionId == runnerNode[k].selectionId;
                                                });
                                                let week = 0
                                                if(teamValue > groupAverage){
                                                    week = 1
                                                }
                                                let prematchOdd_value = ''
                                                if(runnerNode1[0].exchange.availableToLay){
                                                    prematchOdd_value = runnerNode1[0].exchange.availableToLay[0].price
                                                }
                                                marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[0].selectionId + "," + eventNode.eventId
                                                eventLists1.push({'eventId': eventNode.eventId, 'id': label,'openDate': eventNode.openDate,  'pre_MatchOdd': runnerNode1,'predictionType': eventNode.markets[j].marketType,'value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- 1 - Lay', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '3', 'prematch_Odd': prematchOdd_value, 'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                            }
                                        }
                                        m_index++
                                    }

                                } else {
                                    let runnerNode = eventNode.markets[j].runners
                                    // console.log('check_error_market', eventNode.markets[j])
                                    let runnerNode1 = eventNode.markets[j].prematchMarket.runners
                                    for (let k = 0; k < runnerNode.length; k++) {
                                        let runnerName = ''
                                        if(runnerNode[k].description){
                                            runnerName = runnerNode[k].description.runnerName
                                        }
                                        else{
                                            runnerName = runnerNode[k].runnerName
                                        }
                                        if (runnerName == "Over 0.5 Goals" || runnerName == "Over 1.5 Goals" || runnerName == "Under 2.5 Goals" || runnerName == "Over 2.5 Goals" || runnerName == "Under 3.5 Goals") {

                                            marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId

                                            if(groupList == '- Over 0.5 Back' && direction == 0 && bl == "Back"){
                                                if(runnerName == 'Over 0.5 Goals'){
                                                    marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - O 0.5 - Back"
                                                    let label = eventNode.name + " - O 0.5 - Back"
                                                    let prematch_Odd = runnerNode1.filter(function(item) {
                                                        return item.selectionId == runnerNode[k].selectionId;
                                                    });
                                                    let week = 0
                                                    if(teamValue > groupAverage){
                                                        week = 1
                                                    }
                                                    let prematchOdd_value = ''
                                                    if(prematch_Odd[0].exchange.availableToBack){
                                                        prematchOdd_value = prematch_Odd[0].exchange.availableToBack[0].price
                                                    }
                                                    eventLists1.push({'eventId': eventNode.eventId, 'id': label,'openDate': eventNode.openDate,  'pre_MatchOdd': runnerNode1,'predictionType': '','value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- O 0.5 - Back', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '5', 'prematch_Odd': prematchOdd_value, 'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                                }
                                            }
                                            else if(groupList == '- Over 1.5 Back' && direction == 0 && bl == "Back"){
                                                if(runnerName == 'Over 1.5 Goals'){
                                                    marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - O 1.5 - Back"
                                                    let label = eventNode.name + " - O 1.5 - Back"
                                                    let prematch_Odd = runnerNode1.filter(function(item) {
                                                        return item.selectionId == runnerNode[k].selectionId;
                                                    });
                                                    let week = 0
                                                    if(teamValue > groupAverage){
                                                        week = 1
                                                    }
                                                    let prematchOdd_value = ''
                                                    if(prematch_Odd[0].exchange.availableToBack){
                                                        prematchOdd_value = prematch_Odd[0].exchange.availableToBack[0].price
                                                    }
                                                    eventLists1.push({'eventId': eventNode.eventId, 'id': label,'openDate': eventNode.openDate,  'pre_MatchOdd': runnerNode1,'predictionType': '','value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- O 1.5 - Back', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '6', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                                }
                                            }
                                            else if(groupList == '- Under 2.5 Back' && direction == 0 && bl == "Back"){
                                                if(runnerName == 'Under 2.5 Goals'){
                                                    marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - U 2.5 - Back"
                                                    let label = eventNode.name + " - U 2.5 - Back"
                                                    let prematch_Odd = runnerNode1.filter(function(item) {
                                                        return item.selectionId == runnerNode[k].selectionId;
                                                    });
                                                    let week = 0
                                                    if(teamValue > groupAverage){
                                                        week = 1
                                                    }
                                                    let prematchOdd_value = ''
                                                    if(prematch_Odd[0].exchange.availableToBack){
                                                        prematchOdd_value = prematch_Odd[0].exchange.availableToBack[0].price
                                                    }
                                                    eventLists1.push({'eventId': eventNode.eventId, 'id': label,'openDate': eventNode.openDate,  'pre_MatchOdd': runnerNode1,'predictionType': '','value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- U 2.5 - Back', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '7', 'prematch_Odd': prematchOdd_value, 'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                                }
                                            }
                                            else if(groupList == '- Over 2.5 Back' && direction == 0 && bl == "Back"){
                                                if(runnerName == 'Over 2.5 Goals'){
                                                    marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - O 2.5 - Back"
                                                    let label = eventNode.name + " - O 2.5 - Back"
                                                    let prematch_Odd = runnerNode1.filter(function(item) {
                                                        return item.selectionId == runnerNode[k].selectionId;
                                                    });
                                                    let week = 0
                                                    if(teamValue > groupAverage){
                                                        week = 1
                                                    }
                                                    let prematchOdd_value = ''
                                                    if(prematch_Odd[0].exchange.availableToBack){
                                                        prematchOdd_value = prematch_Odd[0].exchange.availableToBack[0].price
                                                    }
                                                    eventLists1.push({'eventId': eventNode.eventId, 'id': label,'openDate': eventNode.openDate,  'pre_MatchOdd': runnerNode1,'predictionType': '','value': marketArray[m_index], 'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- O 2.5 - Back', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '8', 'prematch_Odd': prematchOdd_value,'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                                }
                                            }
                                            else if(groupList == '- Under 3.5 Back' && direction == 0 && bl == "Back"){
                                                if(runnerName == 'Under 3.5 Goals'){
                                                    marketNode[m_index] =  eventNode.date + ', ' + eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + " - U 3.5 - Back"
                                                    let label = eventNode.name + " - U 3.5 - Back"
                                                    let prematch_Odd = runnerNode1.filter(function(item) {
                                                        return item.selectionId == runnerNode[k].selectionId;
                                                    });
                                                    let week = 0
                                                    if(teamValue > groupAverage){
                                                        week = 1
                                                    }
                                                    let prematchOdd_value = ''
                                                    if(prematch_Odd[0].exchange.availableToBack){
                                                        prematchOdd_value = prematch_Odd[0].exchange.availableToBack[0].price
                                                    }
                                                    eventLists1.push({'eventId': eventNode.eventId, 'id': label, 'openDate': eventNode.openDate, 'pre_MatchOdd': runnerNode1,'predictionType': '','value': marketArray[m_index],'week': week, 'label': marketNode[m_index], 'league': eventNode.competitions[0].name,'marketType': '- U 3.5 - Back', 'Odds': eventNode.markets[j].Odds, 'scores': eventNode.scores, 'game': '9', 'prematch_Odd': prematchOdd_value, 'totalMatched': eventNode.markets[j].totalMatched, 'date': eventNode.date})
                                                }
                                            }
                                            m_index++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }

        let eventLists2 = []
        for(let i = 0 ; i < eventLists1.length ; i++){
            let check = 0
            for(let j = 1 ; j < eventLists2.length ; j++){
                if(eventLists1[i].label == eventLists2[j].label){
                    check = 1
                }
            }
            if(check == 0){
                eventLists2.push({'eventId': eventLists1[i].eventId, 'status': 0, 'id': eventLists1[i].id,'openDate': eventLists1[i].openDate,  'pre_MatchOdd': eventLists1[i].pre_MatchOdd,'predictionType': eventLists1[i].predictionType,'value': eventLists1[i].value,'week': eventLists1[i].week, 'label': eventLists1[i].label, 'league': eventLists1[i].league,'marketType': eventLists1[i].marketType, 'Odds': eventLists1[i].Odds, 'scores': eventLists1[i].scores, 'game': eventLists1[i].game, 'prematch_Odd': eventLists1[i].prematch_Odd,'totalMatched': eventLists1[i].totalMatched, 'date': eventLists1[i].date})
            }
        }
//----------------------------------------log part start---------------------------------------------
        //-------------------eventList2---------------------
        // eventLists2 = []
        // eventLists2 = await db.collection('predictionTable').find().toArray()
        //------------------------status Update----------------

        // for(i = 0 ; i < eventLists2.length ; i++){
        //     console.log('predictionList===>', eventLists2[i].label, ', ', eventLists2[i].pre_MatchOdd)
        // }
//-----------------------------------------log part end ------------------------------------------------

        let doubleTips = []
        for(i = 1 ; i < eventLists2.length ; i++){
            let eventId1 = eventLists2[i].eventId
            let event_prediction = []
            for(j = 0 ; j < eventLists2.length ; j++){
                let eventId2 = eventLists2[j].eventId
                if(eventId1 === eventId2){
                    event_prediction.push({'eventId': eventLists2[j].eventId, 'status': 0, 'id': eventLists2[j].id,'openDate': eventLists2[j].openDate,  'pre_MatchOdd': eventLists2[j].pre_MatchOdd,'predictionType': eventLists2[j].predictionType,'value': eventLists2[j].value,'week': eventLists2[j].week, 'label': eventLists2[j].label, 'league': eventLists2[j].league,'marketType': eventLists2[j].marketType, 'Odds': eventLists2[j].Odds, 'scores': eventLists2[j].scores, 'game': eventLists2[j].game, 'prematch_Odd': eventLists2[j].prematch_Odd,'totalMatched': eventLists2[j].totalMatched, 'date': eventLists2[j].date})
                }
            }
            if(event_prediction.length > 1){
                for(let k = 0 ; k < event_prediction.length ; k++){
                    if(event_prediction[k].marketType === '- 1 - Lay'){
                        let check = 0
                        for(let kk = 0 ; kk < event_prediction.length ; kk++){
                            if(event_prediction[kk].marketType === '- X - Lay'){
                                check = 1
                            }
                        }
                        if(check === 1){
                            for(let kk = 0 ; kk < event_prediction.length ; kk++){
                                if(event_prediction[kk].marketType === '- X - Lay'){
                                    doubleTips.push(event_prediction[kk].id)
                                }
                            }
                            doubleTips.push(event_prediction[k].id)
                        }
                    }
                    else if(event_prediction[k].marketType === '- X - Lay'){
                        let check = 0
                        for(let kk = 0 ; kk < event_prediction.length ; kk++){
                            if(event_prediction[kk].marketType === '- 2 - Lay'){
                                check = 1
                            }
                        }
                        if(check === 1){
                            for(let kk = 0 ; kk < event_prediction.length ; kk++){
                                if(event_prediction[kk].marketType === '- 2 - Lay') {
                                    doubleTips.push(event_prediction[kk].id)
                                }
                            }
                            doubleTips.push(event_prediction[k].id)
                        }
                    }
                }
            }
        }
        doubleTips = Array.from(new Set (doubleTips))

        for(i = 0 ; i < doubleTips.length ; i++){
            for(j = 0 ; j < eventLists2.length ; j++){
                if(eventLists2[j].id === doubleTips[i]){
                    eventLists2[j].status = 1
                }
            }
        }

        let duplicatedPredictions = []
        for(i = 1 ; i < eventLists2.length ; i++){
            let eventId1 = eventLists2[i].eventId
            let eventLabel1 = eventLists2[i].label
            let event_prediction = []
            for(j = 0 ; j < eventLists2.length ; j++){
                let eventId2 = eventLists2[j].eventId
                let eventLabel2 = eventLists2[j].label
                if(eventId1 === eventId2){
                    event_prediction.push({'eventId': eventLists2[j].eventId, 'status': 0, 'id': eventLists2[j].id,'openDate': eventLists2[j].openDate,  'pre_MatchOdd': eventLists2[j].pre_MatchOdd,'predictionType': eventLists2[j].predictionType,'value': eventLists2[j].value,'week': eventLists2[j].week, 'label': eventLists2[j].label, 'league': eventLists2[j].league,'marketType': eventLists2[j].marketType, 'Odds': eventLists2[j].Odds, 'scores': eventLists2[j].scores, 'game': eventLists2[j].game, 'prematch_Odd': eventLists2[j].prematch_Odd,'totalMatched': eventLists2[j].totalMatched, 'date': eventLists2[j].date})
                }
            }
            if(event_prediction.length > 1){
                for(let k = 0 ; k < event_prediction.length ; k++){
                    if(event_prediction[k].marketType === '- X - Back'){
                        let check = 0
                        for(let kk = 0 ; kk < event_prediction.length ; kk++){
                            if(event_prediction[kk].marketType === '- X - Lay' || event_prediction[kk].marketType === '- 1 - Lay' || event_prediction[kk].marketType === '- 2 - Lay'){
                                check = 1
                            }
                        }
                        if(check === 1){
                            for(let kk = 0 ; kk < event_prediction.length ; kk++){
                                if(event_prediction[kk].marketType === '- X - Lay' || event_prediction[kk].marketType === '- 1 - Lay' || event_prediction[kk].marketType === '- 2 - Lay'){
                                    duplicatedPredictions.push(event_prediction[kk].id)
                                }
                            }
                        }
                    }
                    else if(event_prediction[k].marketType === '- X - Lay'){
                        let check = 0
                        for(let kk = 0 ; kk < event_prediction.length ; kk++){
                            if(event_prediction[kk].marketType === '- X - Back'){
                                check = 1
                            }
                        }
                        if(check === 1){
                            for(let kk = 0 ; kk < event_prediction.length ; kk++){
                                if(event_prediction[kk].marketType === '- X - Back'){
                                    duplicatedPredictions.push(event_prediction[kk].id)
                                }
                            }
                        }
                    }
                    else if(event_prediction[k].marketType === '- 1 - Lay'){
                        let check = 0
                        for(let kk = 0 ; kk < event_prediction.length ; kk++){
                            if(event_prediction[kk].marketType === '- X - Back' || event_prediction[kk].marketType === '- 2 - Lay'){
                                check = 1
                            }
                        }
                        if(check === 1){
                            for(let kk = 0 ; kk < event_prediction.length ; kk++){
                                duplicatedPredictions.push(event_prediction[kk].id)
                            }
                        }
                    }
                    else if(event_prediction[k].marketType === '- 2 - Lay'){
                        let check = 0
                        for(let kk = 0 ; kk < event_prediction.length ; kk++){
                            if(event_prediction[kk].marketType === '- X - Back' || event_prediction[kk].marketType === '- 1 - Lay'){
                                check = 1
                            }
                        }
                        if(check === 1){
                            for(let kk = 0 ; kk < event_prediction.length ; kk++){
                                duplicatedPredictions.push(event_prediction[kk].id)
                            }
                        }
                    }
                    else if(event_prediction[k].marketType === '- U 2.5 - Back'){
                        let check = 0
                        for(let kk = 0 ; kk < event_prediction.length ; kk++){
                            if(event_prediction[kk].marketType === '- O 2.5 - Back' || event_prediction[kk].marketType === '- O 1.5 - Back'){
                                check = 1
                            }
                        }
                        if(check === 1){
                            for(let kk = 0 ; kk < event_prediction.length ; kk++){
                                duplicatedPredictions.push(event_prediction[kk].id)
                            }
                        }
                    }
                    else if(event_prediction[k].marketType === '- O 2.5 - Back'){
                        let check = 0
                        for(let kk = 0 ; kk < event_prediction.length ; kk++){
                            if(event_prediction[kk].marketType === '- U 2.5 - Back' || event_prediction[kk].marketType === '- U 3.5 - Back'){
                                check = 1
                            }
                        }
                        if(check === 1){
                            for(let kk = 0 ; kk < event_prediction.length ; kk++){
                                duplicatedPredictions.push(event_prediction[kk].id)
                            }
                        }
                    }
                    else if(event_prediction[k].marketType === '- O 1.5 - Back'){
                        let check = 0
                        for(let kk = 0 ; kk < event_prediction.length ; kk++){
                            if(event_prediction[kk].marketType === '- U 2.5 - Back'){
                                check = 1
                            }
                        }
                        if(check === 1){
                            for(let kk = 0 ; kk < event_prediction.length ; kk++){
                                duplicatedPredictions.push(event_prediction[kk].id)
                            }
                        }
                    }
                    else if(event_prediction[k].marketType === '- U 3.5 - Back'){
                        let check = 0
                        for(let kk = 0 ; kk < event_prediction.length ; kk++){
                            if(event_prediction[kk].marketType === '- O 2.5 - Back'){
                                check = 1
                            }
                        }
                        if(check === 1){
                            for(let kk = 0 ; kk < event_prediction.length ; kk++){
                                duplicatedPredictions.push(event_prediction[kk].id)
                            }
                        }
                    }
                }
            }
        }
        duplicatedPredictions = Array.from(new Set (duplicatedPredictions))

        for(i = 0 ; i < duplicatedPredictions.length ; i++){
            for(j = 0 ; j < eventLists2.length ; j++){
                if(eventLists2[j].id === duplicatedPredictions[i]){
                    eventLists2[j].status = 2
                }
            }
        }
//------------------------------------//log part end//------------------------------------
        // for(i = 0 ; i < eventLists2.length ; i++){
        //     console.log('predictionList===>', eventLists2[i].label, ', ', eventLists2[i].status)
        // }

        // eventLists2 = await db.collection('predictionTable').find().toArray()

        // for(i = 0; i < eventLists2.length ; i++){
        //     if(eventLists2[i].status){
        //         let query={"_id": eventLists2[i]._id}
        //         let check = await db.collection('predictionTable').find(query).toArray()
        //         if(check.length > 0){
        //             await db.collection('predictionTable').updateOne(
        //                 query,
        //                 {$set: {
        //                         'status': eventLists2[i].status
        //                     }},
        //                 function (err, item) {
        //                     if (err) { return }
        //                 })
        //         }
        //     }
        //     else{
        //         console.log('status_undefined=>', eventLists2[i].label)
        //     }
        // }

        // for(i = 0; i < eventLists2.length ; i++){
        //     if(eventLists2[i].label){
        //         let query={"label": eventLists2[i].label}
        //         let check = await db.collection('predictionTable').find(query).toArray()
        //         if(check.length > 0){
        //             await db.collection('predictionTable').updateOne(
        //                 query,
        //                 {$set: {
        //                         'status': 0
        //                     }},
        //                 function (err, item) {
        //                     if (err) { return }
        //                 })
        //         }
        //     }
        // }
//----------------------------------//log part end//---------------------------------------
//----------------------------------prediction save start----------------------------------
        for(i = 1; i < eventLists2.length ; i++){
            if(eventLists2[i].id){

                let query={"_id": eventLists2[i].id}
                let check = await db.collection('predictionTable').find(query).toArray()
                if(check.length > 0){
                    await db.collection('predictionTable').updateOne(
                        query,
                        {$set: {
                                'pre_MatchOdd': eventLists2[i].pre_MatchOdd,
                                'predictionType': eventLists2[i].predictionType,
                                'week': eventLists2[i].week,
                                'Odds': eventLists2[i].Odds,
                                'scores': eventLists2[i].scores,
                                'prematch_Odd': eventLists2[i].prematch_Odd,
                                'totalMatched': eventLists2[i].totalMatched
                            }},
                        function (err, item) {
                            if (err) { return }
                        })
                }
                else{
                    await db.collection('predictionTable').updateOne(
                        query,
                        {$set: {
                                '_id': eventLists2[i].id,
                                'openDate': eventLists2[i].openDate,
                                'pre_MatchOdd': eventLists2[i].pre_MatchOdd,
                                'predictionType': eventLists2[i].predictionType,
                                'value': eventLists2[i].value,
                                'week': eventLists2[i].week,
                                'label': eventLists2[i].label,
                                'league': eventLists2[i].league,
                                'marketType': eventLists2[i].marketType,
                                'Odds': eventLists2[i].Odds,
                                'scores': eventLists2[i].scores,
                                'game': eventLists2[i].game,
                                'prematch_Odd': eventLists2[i].prematch_Odd,
                                'totalMatched': eventLists2[i].totalMatched,
                                'date': eventLists2[i].date,
                                'status': eventLists2[i].status,
                                'eventId': eventLists2[i].eventId
                            }},
                        {upsert: true},
                        function (err, item) {
                            if (err) { return }
                        })
                }
            }
        }
//-----------------------------------------------------------------------------------------
//----------------------------------score update part-------------------------------------
        let dailyApiEvents0 = await db.collection('DailyApiEvents').find({"time.starting_at.date": n}).toArray()
        console.log('dailyApiEvents=>', dailyApiEvents0.length)
        let eventResult0 = await db.collection('predictionTable').aggregate([
            { $match: {"date": n}},
            { $lookup: { from: "events", localField: "eventId", foreignField: "eventId", as: "events" }}
        ]).toArray();
        let map = await db.collection('api_map').find().toArray()
        console.log('predictionLengthfor scores=>', eventResult0.length)
        for(i = 0 ; i < eventResult0.length ; i++){
            let predictionId = eventResult0[i]._id
            if(eventResult0[i].events[0]){
                let eventName = eventResult0[i].events[0].name
                let homeName = eventName.split(" v ")[0].trim()
                let awayName = eventName.split(" v ")[1].trim()
                // console.log(eventName,', ',homeName,', ', awayName)
                let home_tran = map.filter(function(item) {
                    return item.betfair == homeName
                });
                if(home_tran.length > 0){
                    homeName = home_tran[0].apiData
                }
                let away_tran = map.filter(function(item) {
                    return item.betfair == awayName
                });
                if(away_tran.length > 0){
                    awayName = away_tran[0].apiData
                }
                for(j = 0; j < dailyApiEvents0.length; j++){
                    if(homeName === dailyApiEvents0[j].localTeamName && awayName === dailyApiEvents0[j].visitorTeamName){
                        // console.log('checkout=>',dailyApiEvents0[j].localTeamName,', ', dailyApiEvents0[j].visitorTeamName,', ',dailyApiEvents0[j].localTeamId,', ',dailyApiEvents0[j].visitorTeamId, ', ', dailyApiEvents0[j].round_id)
                        predictionId = eventResult0[i]._id
                        db.collection('predictionTable').updateOne({"_id": predictionId},
                            {$set: {
                                    'homeTeamId': dailyApiEvents0[j].localTeamId,
                                    'awayTeamId': dailyApiEvents0[j].visitorTeamId,
                                    'roundId': dailyApiEvents0[j].round_id,
                                    'fixtureId': dailyApiEvents0[j]._id
                                }},
                            function (err, item) {
                                if (err) { return }
                            })
                    }
                    else{
                        // predictionId = eventResult0[i]._id
                        // db.collection('predictionTable').updateOne({"_id": predictionId},
                        //     {$set: {
                        //             'homeTeamId': null,
                        //             'awayTeamId': null,
                        //             'roundId': null
                        //         }},
                        //     function (err, item) {
                        //         if (err) { return }
                        //     })
                    }
                }
            }
            else{
                console.log(predictionId)
                predictionId = eventResult0[i]._id
                // db.collection('predictionTable').updateOne({"_id": predictionId},
                //     {$set: {
                //             'homeTeamId': null,
                //             'awayTeamId': null,
                //             'roundId': null
                //         }},
                //     function (err, item) {
                //         if (err) { return }
                //     })
            }
        }
//----------------------------------score adding script------------------------------------------
        let predictions = await db.collection('predictionTable').aggregate([
            { $match: {"date": n, "roundId": {$gt : 0}}},
            { $lookup: { from: "seasonRoundIds", localField: "roundId", foreignField: "round_id", as: "events0" }}
        ]).toArray();
        console.log('predictions length*************************=>', predictions.length)

        // for(let i = 0 ; i < predictions.length; i++){
        //     let p_id = predictions[i]._id
        //     let p_date = predictions[i].date
        //     let p_homeTeam = predictions[i].homeTeamId
        //     let p_awayTeam = predictions[i].awayTeamId
        //     let p_time = predictions[i].timeElapsed
        //     if(p_time < 90){p_time = 95}
        //     if(predictions[i].events0[0].events[0] && predictions[i].homeTeamId && predictions[i].awayTeamId){
        //         for(j = 0 ; j < predictions[i].events0[0].events.length ; j++){
        //             let r_date = predictions[i].events0[0].events[j].date
        //             let r_homeTeam = predictions[i].events0[0].events[j].localteamId
        //             let r_awayTeam = predictions[i].events0[0].events[j].visitorteamId
        //             let home_score = predictions[i].events0[0].events[j].localteamScore
        //             let away_score = predictions[i].events0[0].events[j].visitorteamSore
        //             if(r_date == p_date && p_homeTeam == r_homeTeam && p_awayTeam == r_awayTeam){
        //                 let score_array = []
        //                 let ht_score = predictions[i].events0[0].events[j].hf_score
        //                 let ft_score = predictions[i].events0[0].events[j].ft_score
        //                 if(predictions[i].events0[0].events[j].goals.length === 0){
        //                      for(k = 0 ; k < p_time ; k++){
        //                          score_array.push({"score": {"home": 0, "away": 0}, "timeElapsed": p_time + 1, "elapsedRegularTime": p_time + 1})
        //                      }
        //                 }
        //                 else if(predictions[i].events0[0].events[j].goals.length > 1){
        //                     for(k = 0 ; k < predictions[i].events0[0].events[j].goals.length - 1; k++){
        //                         let minute1 = predictions[i].events0[0].events[j].goals[k].minute
        //                         let minute2 = predictions[i].events0[0].events[j].goals[k + 1].minute
        //                         let home_goal1 = predictions[i].events0[0].events[j].goals[k].result.split("-")[0].trim()
        //                         let away_goal1 = predictions[i].events0[0].events[j].goals[k].result.split("-")[1].trim()
        //                         let home_goal2 = predictions[i].events0[0].events[j].goals[k + 1].result.split("-")[0].trim()
        //                         let away_goal2 = predictions[i].events0[0].events[j].goals[k + 1].result.split("-")[1].trim()
        //
        //                         if(k === 0){
        //                             for(kk = 0 ; kk < minute1 - 1 ; kk++){
        //                                 score_array.push({"score": {"home": 0, "away": 0}, "timeElapsed": kk + 1, "elapsedRegularTime": kk + 1})
        //                             }
        //                             score_array.push({"score": {"home": home_goal1, "away": away_goal1}, "timeElapsed": minute1, "elapsedRegularTime": minute1})
        //                         }
        //                         for(kk = minute1 ; kk < minute2 - 1 ; kk++){
        //                             score_array.push({"score": {"home": home_goal1, "away": away_goal1}, "timeElapsed": kk + 1, "elapsedRegularTime": kk + 1})
        //                         }
        //                         score_array.push({"score": {"home": home_goal2, "away": away_goal2}, "timeElapsed": minute2, "elapsedRegularTime": minute2})
        //                     }
        //                     for(k = predictions[i].events0[0].events[j].goals[predictions[i].events0[0].events[j].goals.length - 1].minute ; k < p_time ; k++){
        //                         let last_home_goal = predictions[i].events0[0].events[j].goals[predictions[i].events0[0].events[j].goals.length - 1].result.split("-")[0].trim()
        //                         let last_away_goal = predictions[i].events0[0].events[j].goals[predictions[i].events0[0].events[j].goals.length - 1].result.split("-")[1].trim()
        //                         score_array.push({"score": {"home": last_home_goal, "away": last_away_goal}, "timeElapsed": k + 1, "elapsedRegularTime": k + 1})
        //                     }
        //
        //                 }
        //                 else if(predictions[i].events0[0].events[j].goals.length === 1){
        //                     let minute1 = predictions[i].events0[0].events[j].goals[0].minute
        //                     let home_goal1 = predictions[i].events0[0].events[j].goals[0].result.split("-")[0].trim()
        //                     let away_goal1 = predictions[i].events0[0].events[j].goals[0].result.split("-")[1].trim()
        //
        //                     for(kk = 0 ; kk < minute1 - 1 ; kk++){
        //                         score_array.push({"score": {"home": 0, "away": 0}, "timeElapsed": kk + 1, "elapsedRegularTime": kk + 1})
        //                     }
        //                     score_array.push({"score": {"home": home_goal1, "away": away_goal1}, "timeElapsed": minute1, "elapsedRegularTime": minute1})
        //
        //                     for(k = minute1 ; k < p_time ; k++){
        //                         let last_home_goal = predictions[i].events0[0].events[j].goals[predictions[i].events0[0].events[j].goals.length - 1].result.split("-")[0].trim()
        //                         let last_away_goal = predictions[i].events0[0].events[j].goals[predictions[i].events0[0].events[j].goals.length - 1].result.split("-")[1].trim()
        //                         score_array.push({"score": {"home": last_home_goal, "away": last_away_goal}, "timeElapsed": k + 1, "elapsedRegularTime": k + 1})
        //                     }
        //
        //                 }
        //                 db.collection('predictionTable').updateOne({"_id": p_id},
        //                     {$set: {
        //                             'scores': score_array,
        //                             'ht_score': ht_score,
        //                             'ft_score': ft_score
        //                         }},
        //                     {upsert: true},
        //                     function (err, item) {
        //                         if (err) { return }
        //                     })
        //
        //                     console.log('score array test=>', predictions[i].events0[0].events[j].goals, ', scores=>', score_array,', roundId',predictions[i].roundId)
        //
        //             }
        //         }
        //     }
        // }
//------------------------------------------------------------------------------------------
    })
    task_prediction.start()

    //todo main data scrapping part
    let task00;
    task00 = schedule('*/57 * * * *', async () => {
        console.log('sdf')
        let service = new betfair();
        let start_date = new Date();
        let next_date = start_date.setDate(start_date.getDate() + 0);
        let end_date = start_date.setDate(start_date.getDate() + 1);
        next_date = new Date(next_date).toISOString()
        end_date = new Date(end_date).toISOString()
        next_date = next_date.substring(0,11)+'00:00:00'+ next_date.substring(19,24)
        end_date = end_date.substring(0,11)+'04:00:00'+ end_date.substring(19,24)

        let filter = await db.collection('filters').find().toArray()
        filter[0].filter.marketStartingAfter = next_date
        filter[0].filter.marketStartingBefore = end_date

        let data = await service.getMainData(filter[0])

        let events = Object.values(data.attachments.events)
        let markets = Object.values(data.attachments.markets)
        let competitions = Object.values(data.attachments.competitions)

        console.log('betfair.come_Total->', events.length, markets.length, competitions.length)

        for(i = 0; i < events.length; i++){
            let query = {"eventId": events[i].eventId}
            db.collection('eventsTotal').updateOne(query,
                {$set: {
                        'eventId': events[i].eventId,
                        'name': events[i].name,
                        'eventTypeId': events[i].eventTypeId,
                        'countryCode': events[i].countryCode,
                        'openDate': events[i].openDate
                    }},
                {upsert: true},
                function (err, item) {
                    if (err) { return }
                })
        }

        for(i = 0; i < markets.length; i++){
            if(!markets[i].topLevelEventId){
                db.collection('eventsTotal').deleteOne({"eventId": markets[i].eventId})
            }
            let query1 = {"eventId": markets[i].eventId}
            db.collection('eventsTotal').updateOne(query1,
                {$set: {
                        'upperLevelEventId': markets[i].upperLevelEventId,
                        'topLevelEventId': markets[i].topLevelEventId,
                    }},
                function (err, item) {
                    if (err) { return }
                })
        }

        for(i = 0; i < competitions.length; i++){
            let query = {"competitionId": competitions[i].competitionId}
            db.collection('competitionsTotal').updateOne(
                query,
                {$set: {
                        'key': competitions[i].key,
                        'name': competitions[i].name,
                        'competitionId': competitions[i].competitionId,
                        'eventId': competitions[i].eventId
                    }},
                {upsert: true},
                function (err, item) {
                    if (err) { return }
                })
        }

    });
    task00.start()

    //todo score update cron job
    let taskScore
    let index_score1 = 0
    let index_score = 0
    let indexf = 0
    let indexPage = 0
    let index_market = 0
    let index_role = 0
    let index_titularity = 0
    taskScore = schedule('*/7 * * * * *', async () => {
        index_score1 ++
        let service = new betfair();
        let start_date = new Date();
        let next_date = start_date.setDate(start_date.getDate() + 0);

        next_date = new Date(next_date).toISOString()
        next_date = next_date.substring(0,11)+'00:00:00'+ next_date.substring(19,24)
        console.log('today_date===>', next_date.substring(0,10))
//-----------------------------------------------------//--------------------------------------------------------
//         let liveStatsTotal = await db.collection('liveStatsTotal').find({'time.starting_at.date': {$gte: "2020-10-15", $lte: "2020-10-21"}}).toArray()
//         console.log('livestatsTotaleventsLength===>', liveStatsTotal.length)
//
//         let map = await db.collection('api_map').find().toArray()
//         let predictions = await db.collection('predictionTable').find({'fixtureId': {$gte: 0}}).toArray()
//         console.log('predictionslength for live statstotal comparing', predictions.length)
//
//         let eventResult = await db.collection('predictionTable').aggregate([
//             { $match: {"date": {$gte: "2020-10-15", $lte: "2020-10-21"}}},
//             { $lookup: { from: "eventsTotal", localField: "eventId", foreignField: "eventId", as: "events" } }
//         ]).sort({"date": 1}).toArray();
//         console.log('livestats for events results====>', eventResult.length)
//
//         for(let i = 0 ; i < liveStatsTotal.length ; i++){
//             let home_name = liveStatsTotal[i].home_name
//             let away_name = liveStatsTotal[i].away_name
//             for(let j = 0 ; j < eventResult.length ; j++){
//                 if(eventResult[j].events.length > 0){
//                     let eventName = eventResult[j].events[0].name
//                     let home = eventName.split(' v ')[0].trim()
//                     let away = eventName.split(' v ')[1].trim()
//                     let home_tran = map.filter(function(item) {
//                         return item.betfair == home
//                     });
//                     if(home_tran.length > 0){
//                         home = home_tran[0].apiData
//                     }
//                     let away_tran = map.filter(function(item) {
//                         return item.betfair == away
//                     });
//                     if(away_tran.length > 0){
//                         away = away_tran[0].apiData
//                     }
//
//                     if(home_name == home && away_name == away){
//                         console.log('livestats for events Name+++++++++++++', liveStatsTotal[i]._id)
//                         db.collection('predictionTable').updateOne({"_id": eventResult[j]._id},
//                             {$set: {
//                                     'fixtureId': liveStatsTotal[i]._id,
//                                 }},
//                             function (err, item) {
//                                 if (err) { return }
//                             })
//                     }
//                 }
//             }
//         }
//------------------------------------------------------//-------------------------------------------------------
        //----------------------status Update--------------------------
        //-------------------eventId update-------------------
        // let predictions = await db.collection('predictionTable').find({"date": "2020-09-21"}).toArray()
        // console.log('predictionsLength=>', predictions.length)
            //-------------------eventId update end --------------

        // for(i = 0 ; i < predictions.length ; i++){
        //     query = {"label": predictions[i].label}
        //     console.log('predictions=>', predictions[i].date)
        //     await db.collection('predictionTable').updateOne(query,
        //         {
        //             $set: {
        //                 'Odds': []
        //             }
        //         },
        //         {upsert: true},
        //         function (err, item) {
        //             if (err) {
        //                 return
        //             }
        //         })
        // }

        // for(i = 0 ; i < predictions.length ; i++){
        //     let eventId = parseInt(predictions[i].value.split(',')[2])
        //     console.log(eventId)
        //         query = {"label": predictions[i].label}
        //         await db.collection('predictionTable').updateOne(query,
        //             {
        //                 $set: {
        //                     'eventId': eventId
        //                 }
        //             },
        //             {upsert: true},
        //             function (err, item) {
        //                 if (err) {
        //                     return
        //                 }
        //             })
        // }
        //-------------------status update start--------------

        // await service.players_marketValue()
        // let data = await service.getWholeleagues()
        // for(i = 0 ; i < data.length ; i++){
        //     // console.log('country=>', data[i].country.data.name, ', league_id=>', data[i].id, ', league_name=>', data[i].name)
        //     if(data[i].season){
        //         let query = {"_id": data[i].id}
        //         await db.collection('AllLeagues').updateOne(query,
        //             {
        //                 $set: {
        //                     '_id': data[i].id,
        //                     'name': data[i].name,
        //                     'country': data[i].country.data.name,
        //                     'league_id': data[i].id,
        //                     'season_id': data[i].season.data.id,
        //                 }
        //             },
        //             {upsert: true},
        //             function (err, item) {
        //                 if (err) {
        //                     return
        //                 }
        //             })
        //     }
        // }
        let seasonArray = []
        // let seasons = await db.collection('AllLeagues').find().toArray()
        // for(i  = 0 ; i < seasons.length ;  i++){
        //     seasonArray[i] = seasons[i].season_id
        // }
        // seasonArray = Array.from(new Set (seasonArray))
        //
        // for(i = 0 ; i < seasonArray.length ; i++){
        //     if(i === (index_score1 - 1)){
        //         console.log('--->===>', i, ', ', seasonArray.length)
        //         let data = await service.getWholeTeams(seasonArray[i])
        //         for(j = 0 ; j < data.length ; j++){
        //             if(data[j].league){
        //                 let query = {"_id": data[j].id}
        //                 await db.collection('AllTeams').updateOne(query,
        //                     {
        //                         $set: {
        //                             '_id': data[j].id,
        //                             'team_id': data[j].id,
        //                             'name': data[j].name,
        //                             'country': data[j].country.data.name,
        //                             'league_id': data[j].league.data.id,
        //                             'league_name': data[j].league.data.name
        //                         }
        //                     },
        //                     {upsert: true},
        //                     function (err, item) {
        //                         if (err) {
        //                             return
        //                         }
        //                     })
        //             }
        //         }
        //     }
        // }

        if(index_score1 % 3 == 1){
            index_score++
            let query = {"inplay": true,"marketTime": {'$gte': next_date}}
            let marketsList = await db.collection('markets').find(query).toArray()
console.log('marketList Length=> ', marketsList.length)
            let eventIds = []
            for(i = 0 ; i < marketsList.length ;  i++){
                eventIds[i] = marketsList[i].eventId
            }
            let eventsList = Array.from(new Set (eventIds))
            if(eventsList.length > 0){
                scoreUpdate(eventsList, index_score)
            }

            let eventResult = await db.collection('DailyApiEvents').aggregate([
                { $match: {"time.starting_at.date": next_date.substring(0,10)}},
                { $lookup: { from: "Team_T_A_map", localField: "visitorTeamId", foreignField: "team_id", as: "Teams1" }},
                { $lookup: { from: "Team_T_A_map", localField: "localTeamId", foreignField: "team_id", as: "Teams2" }}
            ]).toArray();

            let teamId_array = []
            for(i = 0 ; i < eventResult.length ; i++){
                if(eventResult[i].Teams2[0] && eventResult[i].Teams1[0]){
                    if(eventResult[i].Teams2[0].url_role.includes('https') && eventResult[i].Teams2[0].url_market.includes('https') && eventResult[i].Teams1[0].url_role.includes('https') && eventResult[i].Teams1[0].url_market.includes('https') && (eventResult[i].Teams2[0].update_role_date < next_date.substring(0,10) || eventResult[i].Teams2[0].update_market_date < next_date.substring(0,10) || eventResult[i].Teams1[0].update_role_date < next_date.substring(0,10) || eventResult[i].Teams1[0].update_market_date < next_date.substring(0,10))){
                        teamId_array.push({'teamId': eventResult[i].localTeamId, 'url_role': eventResult[i].Teams2[0].url_role, 'url_market': eventResult[i].Teams2[0].url_market})
                        teamId_array.push({'teamId': eventResult[i].visitorTeamId, 'url_role': eventResult[i].Teams1[0].url_role, 'url_market': eventResult[i].Teams1[0].url_market})
                    }
                }
            }
            console.log('teamId_Array_Length==>', teamId_array.length)

            if(index_score % 3 === 1){
                index_role++
                for(i = 0 ; i < teamId_array.length ; i++){
                    // console.log('TeamArrayRole===>', teamId_array[i])
                    if((index_role - 1) > teamId_array.length){
                        index_role = 1
                    }
                    if((index_role - 1) === i){
                        if(teamId_array[i].url_role.includes('https')){
                            console.log('url_role==>', i,',', teamId_array[i].teamId, ', ', teamId_array[i].url_role)
                            let role_data = await service.players_role(teamId_array[i].teamId, teamId_array[i].url_role)
                            let query = {"_id": role_data[0]}
                            await db.collection('Team_T_A_map').updateOne(query,
                                {
                                    $set: {
                                        'roles':role_data[1],
                                        'update_role_date': next_date.substring(0,10)
                                    }
                                },
                                {upsert: true},
                                function (err, item) {
                                    if (err) {
                                        return
                                    }
                                })
                        }
                    }
                }
            }
            else if(index_score % 3 === 0){
                index_market++
                for(i = 0 ; i < teamId_array.length ; i++){
                    // console.log('TeamArrayMarket===>', teamId_array[i])
                    if((index_market - 1) > teamId_array.length){
                        index_market = 1
                    }
                    if((index_market - 1) === i){
                        if(teamId_array[i].url_market.includes('https')){
                            console.log('url_market==>', i,',', teamId_array[i].teamId, ', ', teamId_array[i].url_market)
                            let role_data = await service.players_marketValue(teamId_array[i].teamId, teamId_array[i].url_market)
                            let query = {"_id": role_data[0]}
                            await db.collection('Team_T_A_map').updateOne(query,
                                {
                                    $set: {
                                        'market_values':role_data[1],
                                        'update_market_date': next_date.substring(0,10)
                                    }
                                },
                                {upsert: true},
                                function (err, item) {
                                    if (err) {
                                        return
                                    }
                                })
                        }
                    }
                }
            }
            //
            // for(i = 0 ;  i < eventResult.length ; i++){
            //     if((indexRole - 1) >= eventResult.length){
            //         indexRole = 1
            //     }
            //     if((indexRole - 1) === i){
            //         if(eventResult[i].Teams[0].url_role.includes('https')){
            //             console.log(i,',', eventResult[i].localTeamId, ', ', eventResult[i].Teams[0].url_role)
            //             let role_data = await service.players_role(eventResult[i].localTeamId, eventResult[i].Teams[0].url_role)
            //             let query = {"_id": role_data[0]}
            //             await db.collection('Team_T_A_map').updateOne(query,
            //                 {
            //                     $set: {
            //                         'roles':role_data[1],
            //                     }
            //                 },
            //                 {upsert: true},
            //                 function (err, item) {
            //                     if (err) {
            //                         return
            //                     }
            //                 })
            //         }
            //     }
            // }

            // for(i = 0 ;  i < eventResult.length ; i++){
            //     if((indexRole - 1) >= eventResult.length){
            //         indexRole = 1
            //     }
            //     if((indexRole - 1) === i){
            //         if(eventResult[i].Teams[0].url_market.includes('https')){
            //             console.log(i,',', eventResult[i].visitorTeamId, ', ', eventResult[i].Teams[0].url_market)
            //             let role_data = await service.players_marketValue(eventResult[i].visitorTeamId, eventResult[i].Teams[0].url_market)
            //             let query = {"_id": role_data[0]}
            //             await db.collection('Team_T_A_map').updateOne(query,
            //                 {
            //                     $set: {
            //                         'market_values':role_data[1],
            //                     }
            //                 },
            //                 {upsert: true},
            //                 function (err, item) {
            //                     if (err) {
            //                         return
            //                     }
            //                 })
            //         }
            //         else{
            //             let query = {"_id": eventResult[i].visitorTeamId}
            //             await db.collection('Team_T_A_map').updateOne(query,
            //                 {
            //                     $set: {
            //                         'market_values':[],
            //                         'roles': [],
            //                         'titularity': []
            //                     }
            //                 },
            //                 {upsert: true},
            //                 function (err, item) {
            //                     if (err) {
            //                         return
            //                     }
            //                 })
            //         }
            //     }
            // }

            // let map_data = await db.collection('Team_T_A_map').find().toArray()
            // for(i = 0 ; i < map_data.length ; i++){
            //     // if(!map_data[i].url_market.includes('https')){
            //         let id = map_data[i]._id
            //         query = {"_id": id}
            //         await db.collection('Team_T_A_map').updateOne(query,
            //             {
            //                 $set: {
            //
            //                     'titularity_update_date':""
            //                 }
            //             },
            //             {upsert: true},
            //             function (err, item) {
            //                 if (err) {
            //                     return
            //                 }
            //             })
            //     // }
            // }

            // let map_data = await db.collection('Team_T_A_map').find().toArray()
            // for(i = 0 ; i < map_data.length ; i++){
            //     // if(!map_data[i].url_market.includes('https')){
            //         let id = map_data[i]._id
            //         query = {"_id": id}
            //         await db.collection('Team_T_A_map').updateOne(query,
            //             {
            //                 $set: {
            //                     'market_values':[],
            //                     'roles': [],
            //                     'titularity': [],
            //                     'update_role_date':'',
            //                     'update_market_date':'',
            //                     'titularity_update_date':''
            //                 }
            //             },
            //             {upsert: true},
            //             function (err, item) {
            //                 if (err) {
            //                     return
            //                 }
            //             })
            //     // }
            // }

            // let map_data = await db.collection('Team_T_A_map').find().toArray()
            // for(i = 0 ; i < map_data.length ; i++){
            //     let id = map_data[i]._id
            //     let url_role = map_data[i].url_role
            //     if(url_role.includes('https')){
            //         url_role = url_role.replace('startseite', 'kadernachposition')
            //         query = {"_id": id}
            //         await db.collection('Team_T_A_map').updateOne(query,
            //             {
            //                 $set: {
            //                     'url_role':url_role
            //                 }
            //             },
            //             {upsert: true},
            //             function (err, item) {
            //                 if (err) {
            //                     return
            //                 }
            //             })
            //     }
            // }
//--------------------------------
        }
        else if(index_score1 % 3 == 3){
            let historicData = await db.collection('historicData').find().toArray()
            let historicArray = []
            let urlArray = []
            let matchDayArray = []
            let k = 0
            let mdayNum = []
            for(i = 0 ; i < historicData.length ; i++){
                for(j = 1 ; j < historicData[i].mdayNum + 1 ; j++){
                    k++
                    historicArray[k - 1] = historicData[i].url + j.toString()
                    urlArray[k - 1] = historicData[i].url
                    matchDayArray[k - 1] = j.toString()
                    mdayNum[k - 1] = historicData[i].mdayNum
                }
            }

            if(index_score > k){
                index_score = 0
            }
            else{
                let service = new betfair();
                let competition1 =  await service.competitionOdd(historicArray[index_score - 1], urlArray[index_score - 1], matchDayArray[index_score - 1], mdayNum[index_score - 1])
                let competition = competition1[0]

                await db.collection('historicData').updateMany(
                    { "url": competition1[1] },
                    {
                        $push: {
                            historic_data: {
                                $each: [{'matchday': competition1[2], 'result': competition}],
                                $slice: -competition1[3]
                            }
                        }
                    }
                )
                query = {"url": competition1[1]}
                await db.collection('historicData').updateOne(query,
                    {
                        $set: {
                            'mdayNum': competition1[4],
                        }
                    })
                console.log('cold data++++', competition1[1],'==>', competition1[2], '===>', competition1[3], competition1[4])
            }
        }
        else if(index_score1 % 3 == 0){
            indexf++
            let start_date1 = new Date();
            let next_date1 = start_date1.setDate(start_date1.getDate() - 1);
            let end_date1 = start_date1.setDate(start_date1.getDate() + 2);

            next_date1 = new Date(next_date1).toISOString()
            end_date1 = new Date(end_date1).toISOString()
            next_date1 = next_date1.substring(0,11)+'00:00:00'+ next_date1.substring(19,24)
            end_date1 = end_date1.substring(0,11)+'04:00:00'+ end_date1.substring(19,24)

            console.log('live Stats Data Date=>', next_date1, end_date1)

            let events = await db.collection('eventsTotal').aggregate([
                { $match: {"openDate": {$gte: next_date1, $lt: end_date1}}},
                { $lookup: { from: "competitionsTotal", localField: "topLevelEventId", foreignField: "eventId", as: "competitions" }}
            ]).sort({"openDate": 1}).toArray();

            let service = new betfair();
            let data = await service.getLiveStats()
            let map = await db.collection('api_map').find().toArray()
            // for(i = 0 ; i < events.length ; i++){
            //     if(events[i].competitions[0]){
            //         console.log(events[i].openDate, ' -- ', events[i].name, ', leagueName==> ', events[i].competitions[0].name)
            //     }
            //     else{
            //         console.log(events[i].openDate, ' -- ', events[i].name, ', leagueName==> ')
            //     }
            // }
            // for(i = 0 ; i < data.length ; i++){
            //     console.log(data[i].localTeam.data.name, ' v ', data[i].visitorTeam.data.name)
            // }
            let k = 0
            let setUpdateArray = []
            for(i = 0 ; i < data.length ; i++){
                if(data[i]){
                    for(j = 0; j < events.length ; j++){
                        let str =  events[j].name
                        let eventId = events[j].eventId
                        let home = str.split(' v ')[0].trim()
                        let away = str.split(' v ')[1].trim()
                        let home_tran = map.filter(function(item) { return item.betfair == home });
                        if(home_tran.length > 0){ home = home_tran[0].apiData }
                        let away_tran = map.filter(function(item) { return item.betfair == away });
                        if(away_tran.length > 0){ away = away_tran[0].apiData }
                        if(data[i]){
                            if(data[i].localTeam && data[i].visitorTeam){
                                if(data[i].localTeam.data.name == home && data[i].visitorTeam.data.name == away){
                                    k++
                                    let id =  data[i].id
                                    let query = {"_id": data[i].id}
                                    let home_tooltip_in = {'on': '', 'off': '', 'in': '', 'out': '', 'cnr': '', 'blk': ''}
                                    let away_tooltip_in = {'on': '', 'off': '', 'in': '', 'out': '', 'cnr': '', 'blk': ''}
                                    let dup = await db.collection('liveStats').findOne({'_id': data[i].id})
                                    if(!dup){
                                        await db.collection('liveStats').updateOne(query,
                                            {
                                                $set: {
                                                    '_id': data[i].id,
                                                    'competitionId':events[j].topLevelEventId,
                                                    'countryCode': events[j].countryCode,
                                                    'home_id': data[i].localteam_id,
                                                    'away_id': data[i].visitorteam_id,
                                                    'home_name': data[i].localTeam.data.name,
                                                    'away_name': data[i].visitorTeam.data.name,
                                                    'home_rank': data[i].standings.localteam_position,
                                                    'away_rank': data[i].standings.visitorteam_position,
                                                    "stats_ten": [],
                                                    'scores_ten': [],
                                                    'time_ten': [],
                                                    'home_tooltip': home_tooltip_in,
                                                    'away_tooltip': away_tooltip_in,
                                                    'league_id': data[i].league_id,
                                                    'season_id': data[i].season_id,
                                                    'stage_id': data[i].stage_id,
                                                }
                                            },
                                            {upsert: true},
                                            function (err, item) {
                                                if (err) {
                                                    return
                                                }
                                            })
                                    }
                                    if(data[i]){
                                        let dup0 = await db.collection('liveStatsTotal').findOne({'_id': data[i].id})
                                        if(!dup0){
                                            if(data[i].time.status == "LIVE") {
                                                await db.collection('liveStatsTotal').updateOne(query,
                                                    {
                                                        $set: {
                                                            '_id': data[i].id,
                                                            'league_id': data[i].league_id,
                                                            'season_id': data[i].season_id,
                                                            'stage_id': data[i].stage_id,
                                                            'eventId': eventId,
                                                            "stats": [],
                                                            'scores': [],
                                                            'time': [],
                                                            'home_id': data[i].localteam_id,
                                                            'away_id': data[i].visitorteam_id,
                                                            'home_name': data[i].localTeam.data.name,
                                                            'away_name': data[i].visitorTeam.data.name,
                                                            'competitionId': events[j].topLevelEventId,
                                                            'countryCode': events[j].countryCode,
                                                            'home_rank': data[i].standings.localteam_position,
                                                            'away_rank': data[i].standings.visitorteam_position
                                                        }
                                                    },
                                                    {upsert: true},
                                                    function (err, item) {
                                                        if (err) {
                                                            return
                                                        }
                                                    })
                                            }
                                        }
                                        if(data[i]) {
                                            if (data[i].time.status == "LIVE") {
                                                let time_check1 = await db.collection('liveStats').find({"_id": data[i].id}).toArray()
                                                let timeLength1 = 0

                                                if (time_check1.length > 0) {
                                                    if (time_check1[0].time_ten) {
                                                        timeLength1 = time_check1[0].time_ten.length
                                                    }
                                                }

                                                let time1 = 0
                                                let extra_time1 = 0
                                                if (timeLength1 > 0) {
                                                    time1 = time_check1[0].time_ten[timeLength1 - 1].minute
                                                    extra_time1 = time_check1[0].time_ten[timeLength1 - 1].injury_time
                                                }
                                                if (extra_time1 === null) {
                                                    extra_time1 = 0
                                                }
                                                let current_extra1 = data[i].time.injury_time
                                                if (current_extra1 === null) {
                                                    current_extra1 = 0
                                                }
                                                if (data[i].time.minute - time1 >= 1 || current_extra1 > extra_time1) {
                                                    await db.collection('liveStats').updateMany(
                                                        {"_id": data[i].id},
                                                        {
                                                            $push: {
                                                                scores_ten: {
                                                                    $each: [data[i].scores],
                                                                    $slice: -10
                                                                },
                                                                stats_ten: {
                                                                    $each: [data[i].stats.data],
                                                                    $slice: -10
                                                                },
                                                                time_ten: {
                                                                    $each: [data[i].time],
                                                                    $slice: -10
                                                                }
                                                            }
                                                        }
                                                    )
                                                }
                                                // //---------------------------------------------------------------------------------------------------------
                                            }
                                        }
                                        if(data[i]){
                                            if(data[i].time.status == "LIVE"){
                                                let time_check = await db.collection('liveStatsTotal').find({"_id": data[i].id }).toArray()
                                                let timeLength = 0
                                                if(time_check.length > 0){
                                                    timeLength = time_check[0].time.length
                                                }

                                                let time = 0
                                                let extra_time = 0
                                                if(timeLength > 0){
                                                    time = time_check[0].time[timeLength - 1].minute
                                                    extra_time = time_check[0].time[timeLength - 1].injury_time
                                                }
                                                if(extra_time === null){
                                                    extra_time = 0
                                                }
                                                let current_extra = data[i].time.injury_time
                                                if(current_extra === null){
                                                    current_extra = 0
                                                }
                                                if(data[i].time.minute - time >= 1 || current_extra > extra_time){
                                                    await db.collection('liveStatsTotal').updateMany(
                                                        { "_id": data[i].id },
                                                        {
                                                            $push: {
                                                                scores: {
                                                                    $each: [data[i].scores],
                                                                    $slice: -180
                                                                },
                                                                stats: {
                                                                    $each: [data[i].stats.data],
                                                                    $slice: -180
                                                                },
                                                                time: {
                                                                    $each: [data[i].time],
                                                                    $slice: -180
                                                                }
                                                            }
                                                        }
                                                    )
                                                }
                                            }
                                        }

                                        let goal_tooltip = ''
                                        let home_goal_tooltip = ''
                                        let away_goal_tooltip = ''
                                        if(data[i]){
                                            for(let c = 0 ; c < data[i].events.data.length ; c++){
                                                if(data[i].events.data[c].result !== null){
                                                    if(data[i].events.data[c].team_id == data[i].localteam_id){
                                                        home_goal_tooltip = home_goal_tooltip + data[i].events.data[c].minute + "' "
                                                    }
                                                    else if(data[i].events.data[c].team_id == data[i].visitorteam_id){
                                                        away_goal_tooltip = away_goal_tooltip + data[i].events.data[c].minute + "' "
                                                    }
                                                }
                                            }
                                        }

                                        if(home_goal_tooltip != '' && away_goal_tooltip != ''){
                                            goal_tooltip = home_goal_tooltip + "- " + away_goal_tooltip
                                        }
                                        else if(home_goal_tooltip != '' && away_goal_tooltip == ''){
                                            goal_tooltip = home_goal_tooltip
                                        }
                                        else if(home_goal_tooltip == '' && away_goal_tooltip != ''){
                                            goal_tooltip = away_goal_tooltip
                                        }

                                        let home_tooltip = {'on': 0, 'off': 0, 'in': 0, 'out': 0, 'cnr': 0, 'blk': 0}
                                        let away_tooltip = {'on': 0, 'off': 0, 'in': 0, 'out': 0, 'cnr': 0, 'blk': 0}

                                        let tooltip_check = []
                                        if(data[i]){
                                            tooltip_check = await db.collection('liveStats').find({"_id": data[i].id}).toArray()
                                        }

                                        let home_tooltip1 = {
                                            'on': '',
                                            'off': '',
                                            'in': '',
                                            'out': '',
                                            'cnr': '',
                                            'blk': ''
                                        }
                                        let away_tooltip1 = {
                                            'on': '',
                                            'off': '',
                                            'in': '',
                                            'out': '',
                                            'cnr': '',
                                            'blk': ''
                                        }

                                        if(tooltip_check.length > 0){
                                            if(tooltip_check[0].home_tooltip){
                                                home_tooltip1 = {
                                                    'on': tooltip_check[0].home_tooltip.on,
                                                    'off': tooltip_check[0].home_tooltip.off,
                                                    'in': tooltip_check[0].home_tooltip.in,
                                                    'out': tooltip_check[0].home_tooltip.out,
                                                    'cnr': tooltip_check[0].home_tooltip.cnr,
                                                    'blk': tooltip_check[0].home_tooltip.blk
                                                }
                                                away_tooltip1 = {
                                                    'on': tooltip_check[0].away_tooltip.on,
                                                    'off': tooltip_check[0].away_tooltip.off,
                                                    'in': tooltip_check[0].away_tooltip.in,
                                                    'out': tooltip_check[0].away_tooltip.out,
                                                    'cnr': tooltip_check[0].away_tooltip.cnr,
                                                    'blk': tooltip_check[0].away_tooltip.blk
                                                }
                                            }
                                        }

                                        if(tooltip_check.length > 0){

                                            if(tooltip_check[0].stats){
                                                if(tooltip_check[0].stats[0]){
                                                    if(data[i]){
                                                        if(tooltip_check[0].stats[0].team_id == data[i].localteam_id){
                                                            if(tooltip_check[0].stats[0].shots){
                                                                home_tooltip.on = tooltip_check[0].stats[0].shots.ongoal
                                                                home_tooltip.off = tooltip_check[0].stats[0].shots.offgoal
                                                                home_tooltip.in = tooltip_check[0].stats[0].shots.insidebox
                                                                home_tooltip.out = tooltip_check[0].stats[0].shots.outsidebox
                                                                home_tooltip.cnr = tooltip_check[0].stats[0].corners
                                                                home_tooltip.blk = tooltip_check[0].stats[0].shots.blocked

                                                                away_tooltip.on = tooltip_check[0].stats[1].shots.ongoal
                                                                away_tooltip.off = tooltip_check[0].stats[1].shots.offgoal
                                                                away_tooltip.in = tooltip_check[0].stats[1].shots.insidebox
                                                                away_tooltip.out = tooltip_check[0].stats[1].shots.outsidebox
                                                                away_tooltip.cnr = tooltip_check[0].stats[1].corners
                                                                away_tooltip.blk = tooltip_check[0].stats[1].shots.blocked
                                                            }
                                                        }
                                                        else if(tooltip_check[0].stats[0].team_id == data[i].visitorteam_id){
                                                            home_tooltip.on = tooltip_check[0].stats[1].shots.ongoal
                                                            home_tooltip.off = tooltip_check[0].stats[1].shots.offgoal
                                                            home_tooltip.in = tooltip_check[0].stats[1].shots.insidebox
                                                            home_tooltip.out = tooltip_check[0].stats[1].shots.outsidebox
                                                            home_tooltip.cnr = tooltip_check[0].stats[1].corners
                                                            home_tooltip.blk = tooltip_check[0].stats[1].shots.blocked

                                                            away_tooltip.on = tooltip_check[0].stats[0].shots.ongoal
                                                            away_tooltip.off = tooltip_check[0].stats[0].shots.offgoal
                                                            away_tooltip.in = tooltip_check[0].stats[0].shots.insidebox
                                                            away_tooltip.out = tooltip_check[0].stats[0].shots.outsidebox
                                                            away_tooltip.cnr = tooltip_check[0].stats[0].corners
                                                            away_tooltip.blk = tooltip_check[0].stats[0].shots.blocked
                                                        }
                                                    }
                                                }
                                            }

                                        }
                                        if(data[i]){
                                            let time = data[i].time.minute
                                            if(data[i].stats.data[0]){
                                                if(data[i].stats.data[0].team_id == data[i].localteam_id){
                                                    if(data[i].stats.data[0].shots){
                                                        if(home_tooltip.on != data[i].stats.data[0].shots.ongoal && data[i].stats.data[0].shots.ongoal){
                                                            home_tooltip1.on = home_tooltip1.on + ' ' + time + "'"
                                                        }
                                                        if(home_tooltip.off != data[i].stats.data[0].shots.offgoal && data[i].stats.data[0].shots.offgoal){
                                                            home_tooltip1.off = home_tooltip1.off + ' ' + time + "'"
                                                        }
                                                        if(home_tooltip.in != data[i].stats.data[0].shots.insidebox && data[i].stats.data[0].shots.insidebox){
                                                            home_tooltip1.in = home_tooltip1.in + ' ' + time + "'"
                                                        }
                                                        if(home_tooltip.out != data[i].stats.data[0].shots.outsidebox && data[i].stats.data[0].shots.outsidebox){
                                                            home_tooltip1.out = home_tooltip1.out + ' ' + time + "'"
                                                        }
                                                        if(home_tooltip.cnr != data[i].stats.data[0].corners && data[i].stats.data[0].corners){
                                                            home_tooltip1.cnr = home_tooltip1.cnr + ' ' + time + "'"
                                                        }
                                                        if(home_tooltip.blk != data[i].stats.data[0].shots.blocked && data[i].stats.data[0].shots.blocked){
                                                            home_tooltip1.blk = home_tooltip1.blk + ' ' + time + "'"
                                                        }

                                                        if(away_tooltip.on != data[i].stats.data[1].shots.ongoal && data[i].stats.data[1].shots.ongoal){
                                                            away_tooltip1.on = away_tooltip1.on + ' ' + time + "'"
                                                        }
                                                        if(away_tooltip.off != data[i].stats.data[1].shots.offgoal && data[i].stats.data[1].shots.offgoal){
                                                            away_tooltip1.off = away_tooltip1.off + ' ' + time + "'"
                                                        }
                                                        if(away_tooltip.in != data[i].stats.data[1].shots.insidebox && data[i].stats.data[1].shots.insidebox){
                                                            away_tooltip1.in = away_tooltip1.in + ' ' + time + "'"
                                                        }
                                                        if(away_tooltip.out != data[i].stats.data[1].shots.outsidebox && data[i].stats.data[1].shots.outsidebox){
                                                            away_tooltip1.out = away_tooltip1.out + ' ' + time + "'"
                                                        }
                                                        if(away_tooltip.cnr != data[i].stats.data[1].corners && data[i].stats.data[1].corners){
                                                            away_tooltip1.cnr = away_tooltip1.cnr + ' ' + time + "'"
                                                        }
                                                        if(away_tooltip.blk != data[i].stats.data[1].shots.blocked && data[i].stats.data[1].shots.blocked){
                                                            away_tooltip1.blk = away_tooltip1.blk + ' ' + time + "'"
                                                        }
                                                    }

                                                }
                                                else if(data[i].stats.data[0].team_id == data[i].visitorteam_id){

                                                    if(home_tooltip.on != data[i].stats.data[1].shots.ongoal && data[i].stats.data[1].shots.ongoal){
                                                        home_tooltip1.on = home_tooltip1.on + ' ' + time + "'"
                                                    }
                                                    if(home_tooltip.off != data[i].stats.data[1].shots.offgoal && data[i].stats.data[1].shots.offgoal){
                                                        home_tooltip1.off = home_tooltip1.off + ' ' + time + "'"
                                                    }
                                                    if(home_tooltip.in != data[i].stats.data[1].shots.insidebox && data[i].stats.data[1].shots.insidebox){
                                                        home_tooltip1.in = home_tooltip1.in + ' ' + time + "'"
                                                    }
                                                    if(home_tooltip.out != data[i].stats.data[1].shots.outsidebox && data[i].stats.data[1].shots.outsidebox){
                                                        home_tooltip1.out = home_tooltip1.out + ' ' + time + "'"
                                                    }
                                                    if(home_tooltip.cnr != data[i].stats.data[1].corners && data[i].stats.data[1].corners){
                                                        home_tooltip1.cnr = home_tooltip1.cnr + ' ' + time + "'"
                                                    }
                                                    if(home_tooltip.blk != data[i].stats.data[1].shots.blocked && data[i].stats.data[1].shots.blocked){
                                                        home_tooltip1.blk = home_tooltip1.blk + ' ' + time + "'"
                                                    }

                                                    if(away_tooltip.on != data[i].stats.data[0].shots.ongoal && data[i].stats.data[0].shots.ongoal){
                                                        away_tooltip1.on = away_tooltip1.on + ' ' + time + "'"
                                                    }
                                                    if(away_tooltip.off != data[i].stats.data[0].shots.offgoal && data[i].stats.data[0].shots.offgoal){
                                                        away_tooltip1.off = away_tooltip1.off + ' ' + time + "'"
                                                    }
                                                    if(away_tooltip.in != data[i].stats.data[0].shots.insidebox && data[i].stats.data[0].shots.insidebox){
                                                        away_tooltip1.in = away_tooltip1.in + ' ' + time + "'"
                                                    }
                                                    if(away_tooltip.out != data[i].stats.data[0].shots.outsidebox && data[i].stats.data[0].shots.outsidebox){
                                                        away_tooltip1.out = away_tooltip1.out + ' ' + time + "'"
                                                    }
                                                    if(away_tooltip.cnr != data[i].stats.data[0].corners && data[i].stats.data[0].corners){
                                                        away_tooltip1.cnr = away_tooltip1.cnr + ' ' + time + "'"
                                                    }
                                                    if(away_tooltip.blk != data[i].stats.data[0].shots.blocked && data[i].stats.data[0].shots.blocked){
                                                        away_tooltip1.blk = away_tooltip1.blk + ' ' + time + "'"
                                                    }
                                                }
                                            }

                                            let setEArray = {
                                                "_id": data[i].id,
                                                "stats": data[i].stats.data,
                                                'scores': data[i].scores,
                                                'time': data[i].time,
                                                'goal_tooltip': goal_tooltip,
                                                'home_tooltip': home_tooltip1,
                                                'away_tooltip': away_tooltip1
                                            }

                                            let item = await db.collection('liveStats').updateOne({"_id": data[i].id},
                                                {
                                                    $set: {
                                                        '_id': data[i].id,
                                                        "stats": data[i].stats.data,
                                                        'scores': data[i].scores,
                                                        'time': data[i].time,
                                                        'goal_tooltip': goal_tooltip,
                                                        'home_tooltip': home_tooltip1,
                                                        'away_tooltip': away_tooltip1
                                                    }
                                                })

                                            if(item.result.nModified > 0) {
                                                let updateArray = await db.collection('liveStats').findOne({"_id": id})
                                                setUpdateArray.push({'updateArray': updateArray, 'currentData': setEArray})
                                            }
                                        }
                                    }


                                    let team_season_home = []
                                    if(data[i]){
                                        team_season_home = await db.collection('team_season').find({'_id': data[i].localteam_id}).toArray()
                                    }
                                    if(team_season_home.length > 0 && data[i]){
                                        await db.collection('team_season').updateOne({'_id': data[i].localteam_id},
                                            {
                                                $set: {
                                                    '_id': data[i].localteam_id,
                                                    'teamId': data[i].localteam_id,
                                                    'season_id': data[i].season_id,
                                                    "attacks": 0,
                                                    "dangerous_attacks": 0,
                                                    "avg_ball_possession_percentage": "",
                                                    "fouls": 0,
                                                    "avg_fouls_per_game": "",
                                                    "offsides": 0,
                                                    "redcards": 0,
                                                    "yellowcards": 0,
                                                    "shots_blocked": 0,
                                                    "shots_off_target": 0,
                                                    "avg_shots_off_target_per_game": "",
                                                    "shots_on_target": 0,
                                                    "avg_shots_on_target_per_game": "",
                                                    "avg_corners": "",
                                                    "total_corners": 0,
                                                    "btts": 0,
                                                    'update_date': ""
                                                }
                                            },
                                            {upsert: true},
                                            function (err, item) {
                                                if (err) {
                                                    return
                                                }
                                            })
                                    }

                                    let team_season_away = []
                                    if(data[i]){
                                        team_season_away = await db.collection('team_season').find({'_id': data[i].visitorteam_id}).toArray()
                                    }
                                    if(team_season_away.length > 0 && data[i]){
                                        await db.collection('team_season').updateOne({'_id': data[i].visitorteam_id},
                                            {
                                                $set: {
                                                    '_id': data[i].visitorteam_id,
                                                    'teamId': data[i].visitorteam_id,
                                                    'season_id': data[i].season_id,
                                                    "attacks": 0,
                                                    "dangerous_attacks": 0,
                                                    "avg_ball_possession_percentage": "",
                                                    "fouls": 0,
                                                    "avg_fouls_per_game": "",
                                                    "offsides": 0,
                                                    "redcards": 0,
                                                    "yellowcards": 0,
                                                    "shots_blocked": 0,
                                                    "shots_off_target": 0,
                                                    "avg_shots_off_target_per_game": "",
                                                    "shots_on_target": 0,
                                                    "avg_shots_on_target_per_game": "",
                                                    "avg_corners": "",
                                                    "total_corners": 0,
                                                    "btts": 0,
                                                    'update_date': ""
                                                }
                                            },
                                            {upsert: true},
                                            function (err, item) {
                                                if (err) {
                                                    return
                                                }
                                            })
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if(setUpdateArray.length > 0){
                io.emit('UpdateStats', setUpdateArray)
            }
            console.log('k+++', k)
        }
        else if(index_score1 % 3 == 2){
            indexPage++
            index_titularity++
            let start_date4 = new Date();
            let next_date4 = start_date4.setDate(start_date4.getDate() + 0);
            next_date4 = new Date(next_date4).toISOString()
            next_date4 = next_date4.substring(0,10)

            let start_date5 = new Date();
            let next_date5 = start_date5.setDate(start_date5.getDate() - 1);
            let end_date5 = start_date5.setDate(start_date5.getDate() + 2);
            // let next_date5 = start_date5.setDate(start_date5.getDate() + 0);
            // let end_date5 = start_date5.setDate(start_date5.getDate() + 2);
            next_date5 = new Date(next_date5).toISOString()
            end_date5 = new Date(end_date5).toISOString()
            next_date5 = next_date5.substring(0,11)+'00:00:00'+ next_date5.substring(19,24)
            end_date5 = end_date5.substring(0,11)+'04:00:00'+ end_date5.substring(19,24)
            // next_date4 = '2020-10-04'
            console.log('next date 5', next_date5,', ',end_date5)
            let events = await db.collection('eventsTotal').find({"openDate": {$gte: next_date5, $lte: end_date5}}).sort({"openDate": 1}).toArray()
            let map = await db.collection('api_map').find().toArray()
            let pages = await db.collection('DateFixtures').findOne({"_id": next_date4})

            if(pages){
                for(l = 1 ; l < pages.pages + 1 ; l++){
                    if(indexPage % pages.pages + 1 == l){
                        //         console.log('pagesCheck', l)
                        let service = new betfair();
                        let data = await service.getWholeTeamsbyDay(next_date4,l)
                        let c = 0
                        for(p = 0 ; p < data.length ; p++){
                            if(data[p].time.status != 'POSTP' && data[p].time.status != 'Cancelled' && data[p].time.status != 'Deleted' && data[p].time.status != 'Delayed'){
                                // && data[p].time.starting_at.time < "04:00:00"
                                c++
                                // console.log('leagueId==>',data[p].league_id, ' -- ', data[p].localTeam.data.name, ' v ', data[p].visitorTeam.data.name,', start_time(GMT)=> ', data[p].time.starting_at.time)
                                // console.log('leagueId==>',data[p].lineup, data[p].events)
                                for(i = 0 ; i < events.length ; i++){
                                    let eventId = events[i].eventId
                                    let eventName = events[i].name
                                    let countryCode = events[i].countryCode
                                    let competitionId = events[i].topLevelEventId
                                    let homeName = eventName.split(' v ')[0].trim()
                                    let awayName = eventName.split(' v ')[1].trim()

                                    let home_tran = map.filter(function(item) {
                                        return item.betfair == homeName
                                    });
                                    if(home_tran.length > 0){
                                        homeName = home_tran[0].apiData
                                    }
                                    let away_tran = map.filter(function(item) {
                                        return item.betfair == awayName
                                    });
                                    if(away_tran.length > 0){
                                        awayName = away_tran[0].apiData
                                    }
                                    if(homeName == data[p].localTeam.data.name && awayName == data[p].visitorTeam.data.name){
                                        if(data[p].time.status === 'NS'){
                                            let query = {"_id": data[p].id}
                                            await db.collection('DailyApiEvents').updateOne(query,
                                                {
                                                    $set: {
                                                        '_id': data[p].id,
                                                        'eventId': eventId,
                                                        'competitionId': competitionId,
                                                        'countryCode': countryCode,
                                                        'leagueId': data[p].league_id,
                                                        'season_id': data[p].season_id,
                                                        'round_id': data[p].round_id,
                                                        'localTeamId': data[p].localteam_id,
                                                        'visitorTeamId': data[p].visitorteam_id,
                                                        'localTeamName': data[p].localTeam.data.name,
                                                        'visitorTeamName': data[p].visitorTeam.data.name,
                                                        'scores': data[p].scores,
                                                        'time': data[p].time,
                                                        'stats': data[p].stats.data,
                                                        'standing': data[p].standings,
                                                        'lineup': data[p].lineup,
                                                        'events1':data[p].events,
                                                        'formations':data[p].formations,
                                                        'pre_formations':data[p].formations,
                                                        'live_formations': {
                                                            'localteam_formation': null,
                                                            'visitorteam_formation': null
                                                        }
                                                    }
                                                },
                                                {upsert: true},
                                                function (err, item) {
                                                    if (err) {
                                                        return
                                                    }
                                                })
                                        }
                                        else if(data[p].time.status === 'LIVE'){
                                            let query = {"_id": data[p].id}
                                            await db.collection('DailyApiEvents').updateOne(query,
                                                {
                                                    $set: {
                                                        '_id': data[p].id,
                                                        'eventId': eventId,
                                                        'competitionId': competitionId,
                                                        'countryCode': countryCode,
                                                        'leagueId': data[p].league_id,
                                                        'season_id': data[p].season_id,
                                                        'round_id': data[p].round_id,
                                                        'localTeamId': data[p].localteam_id,
                                                        'visitorTeamId': data[p].visitorteam_id,
                                                        'localTeamName': data[p].localTeam.data.name,
                                                        'visitorTeamName': data[p].visitorTeam.data.name,
                                                        'scores': data[p].scores,
                                                        'time': data[p].time,
                                                        'stats': data[p].stats.data,
                                                        'standing': data[p].standings,
                                                        'lineup': data[p].lineup,
                                                        'events1':data[p].events,
                                                        'formations':data[p].formations,
                                                        'live_formations':data[p].formations
                                                    }
                                                },
                                                {upsert: true},
                                                function (err, item) {
                                                    if (err) {
                                                        return
                                                    }
                                                })
                                        }
                                        else if(data[p].time.status === 'FT'){
                                            let query = {"_id": data[p].id}
                                            await db.collection('DailyApiEvents').updateOne(query,
                                                {
                                                    $set: {
                                                        '_id': data[p].id,
                                                        'eventId': eventId,
                                                        'competitionId': competitionId,
                                                        'countryCode': countryCode,
                                                        'leagueId': data[p].league_id,
                                                        'season_id': data[p].season_id,
                                                        'round_id': data[p].round_id,
                                                        'localTeamId': data[p].localteam_id,
                                                        'visitorTeamId': data[p].visitorteam_id,
                                                        'localTeamName': data[p].localTeam.data.name,
                                                        'visitorTeamName': data[p].visitorTeam.data.name,
                                                        'scores': data[p].scores,
                                                        'time': data[p].time,
                                                        'stats': data[p].stats.data,
                                                        'standing': data[p].standings,
                                                        'events1':data[p].events,
                                                        'formations':data[p].formations,
                                                    }
                                                },
                                                {upsert: true},
                                                function (err, item) {
                                                    if (err) {
                                                        return
                                                    }
                                                })
                                        }

                                        let query = {"_id": eventId}
                                        await db.collection('events').updateOne(query,
                                            {
                                                $set: {
                                                    'round_id': data[p].round_id,
                                                    'localTeamId': data[p].localteam_id,
                                                    'visitorTeamId': data[p].visitorteam_id,
                                                }
                                            },
                                            function (err, item) {
                                                if (err) {
                                                    return
                                                }
                                            })
                                    }
                                }
                            }
                        }
                    }
                }
            }

            let eventResult = await db.collection('DailyApiEvents').aggregate([
                { $match: {"time.starting_at.date": next_date.substring(0,10)}},
                { $lookup: { from: "Team_T_A_map", localField: "visitorTeamId", foreignField: "team_id", as: "Teams1" }},
                { $lookup: { from: "Team_T_A_map", localField: "localTeamId", foreignField: "team_id", as: "Teams2" }}
            ]).toArray();

            let teamId_array = []
            for(i = 0 ; i < eventResult.length ; i++){
                if(eventResult[i].Teams2[0] && eventResult[i].Teams1[0]){
                    if(eventResult[i].Teams2[0].titularity_update_date < next_date.substring(0,10) || eventResult[i].Teams1[0].titularity_update_date < next_date.substring(0,10)){
                        teamId_array.push({'teamId': eventResult[i].localTeamId, 'seasonId': eventResult[i].season_id})
                        teamId_array.push({'teamId': eventResult[i].visitorTeamId, 'seasonId': eventResult[i].season_id})
                    }
                }
            }
            console.log('teamId_Array_Length_for_titularity==>', teamId_array.length)
            let service = new betfair();
            for(i = 0 ; i < teamId_array.length; i++){
                if(index_titularity > teamId_array.length){
                    index_titularity = 1
                }
                // console.log('seasonId=>', teamId_array[i].seasonId, ', teamId=>', teamId_array[i].teamId)
                if(index_titularity - 1 === i){
                    let titu_data = await service.players_titularity(teamId_array[i].seasonId, teamId_array[i].teamId)
                    let query = {"_id": titu_data[0]}
                    await db.collection('Team_T_A_map').updateOne(query,
                        {
                            $set: {
                                'titularity':titu_data[1],
                                'titularity_update_date': next_date.substring(0,10)
                            }
                        },
                        {upsert: true},
                        function (err, item) {
                            if (err) {
                                return
                            }
                        })
                }
            }
        }
    });
    taskScore.start()

    //todo test api for score scrapping
    let indexpage1 = 0
    let test;
    // test = schedule('0 */15 */1 * *', async () => {
    test = schedule('0 */1 * * *', async () => {
        indexpage1++
        index_titularity++
        let start_date4 = new Date();
        let next_date4 = start_date4.setDate(start_date4.getDate() + 0);
        next_date4 = new Date(next_date4).toISOString()
        next_date4 = next_date4.substring(0,10)

        let start_date5 = new Date();
        let next_date5 = start_date5.setDate(start_date5.getDate() - 1);
        next_date5 = new Date(next_date5).toISOString()
        next_date5 = next_date5.substring(0,10)

        // next_date5 = "2020-10-01"
        let map = await db.collection('api_map').find().toArray()
        let date_array = ["2020-08-20", "2020-08-21", "2020-08-22", "2020-08-23", "2020-08-24", "2020-08-25", "2020-08-26", "2020-08-27", "2020-08-28", "2020-08-29", "2020-08-30",
                          "2020-08-31", "2020-09-01", "2020-09-02", "2020-09-03", "2020-09-04", "2020-09-05", "2020-09-06", "2020-09-07", "2020-09-08", "2020-09-09", "2020-09-10",
                          "2020-09-11", "2020-09-12", "2020-09-13", "2020-09-14", "2020-09-15", "2020-09-16", "2020-09-17", "2020-09-18", "2020-09-19", "2020-09-20", "2020-09-21",
                          "2020-09-22", "2020-09-23", "2020-09-24"]
        let i = 35
        let predictions = await db.collection('predictionTable').aggregate([
            { $match: {"date": next_date5}},
            { $lookup: { from: "events", localField: "eventId", foreignField: "eventId", as: "events" }}
        ]).toArray();

        let pages = await db.collection('DateFixtures').findOne({"_id": next_date5})
        console.log('data_array_date=>*******************', next_date5,'~',next_date4,', pages number', pages.pages)
        if(pages){
            console.log("..............")
            for(l = 1 ; l < pages.pages + 1 ; l++){

                if(indexpage1 >= pages.pages + 1){
                    indexpage1 = 1
                }

                if(indexpage1 % pages.pages + 1 == l){
                    let service = new betfair();
                    let data = await service.getWholeTeamsbyDay(next_date5, l)
                    let c = 0
                    for(p = 0 ; p < data.length ; p++){
                        if(data[p].time.status != 'POSTP' && data[p].time.status != 'Cancelled' && data[p].time.status != 'Deleted' && data[p].time.status != 'Delayed'){
                            // && data[p].time.starting_at.time < "04:00:00"
                            c++
                            // console.log('leagueId==>',data[p].league_id, ' -- ', data[p].localTeam.data.name, ' v ', data[p].visitorTeam.data.name,', start_time(GMT)=> ', data[p].time.starting_at.time)
                            // console.log('leagueId==>',data[p].lineup, data[p].events)
                            for(i = 0 ; i < predictions.length ; i++){

                                if(predictions[i].events[0]){
                                    let predictionId = predictions[i]._id
                                    let eventId = predictions[i].events[0].eventId
                                    let eventName = predictions[i].events[0].name
                                    let countryCode = predictions[i].events[0].countryCode
                                    let competitionId = predictions[i].events[0].topLevelEventId
                                    let homeName = eventName.split(' v ')[0].trim()
                                    let awayName = eventName.split(' v ')[1].trim()

                                    let home_tran = map.filter(function(item) {
                                        return item.betfair == homeName
                                    });
                                    if(home_tran.length > 0){
                                        homeName = home_tran[0].apiData
                                    }
                                    let away_tran = map.filter(function(item) {
                                        return item.betfair == awayName
                                    });
                                    if(away_tran.length > 0){
                                        awayName = away_tran[0].apiData
                                    }
                                    if(homeName == data[p].localTeam.data.name && awayName == data[p].visitorTeam.data.name){
                                        if(data[p].time.status === 'FT'){
                                            // console.log('events=>',eventName,data[p].events)
                                            let eventsData = data[p].events.data
                                            let eventsArray = []
                                            let localteamId = data[p].localteam_id
                                            let visitorteamId = data[p].visitorteam_id
                                            let ht_score = data[p].scores.ht_score
                                            let ft_score = data[p].scores.ft_score
                                            for(k = 0 ; k < eventsData.length ; k++){
                                                if(eventsData[k].type == 'penalty' || eventsData[k].type == 'goal' || eventsData[k].type == 'own-goal'){
                                                    let extra_minute = 0
                                                    if(eventsData[k].extra_minute){
                                                        extra_minute = eventsData[k].extra_minute
                                                    }
                                                    eventsArray.push({"teamId": eventsData[k].team_id, "minute":eventsData[k].minute + extra_minute, "result":eventsData[k].result})
                                                }
                                            }
                                        // console.log('eventsArray',eventName, eventsArray)
                                            let score_array = []
                                            let p_time = 100
                                            if(eventsArray.length === 0){
                                                for(k = 0 ; k < p_time ; k++){
                                                    score_array.push({"score": {"home": 0, "away": 0}, "timeElapsed": k + 1, "elapsedRegularTime": k + 1})
                                                }
                                            }
                                            else if(eventsArray.length > 1){
                                                for(k = 0 ; k < eventsArray.length - 1; k++){
                                                    let minute1 = eventsArray[k].minute
                                                    let minute2 = eventsArray[k + 1].minute
                                                    let home_goal1 = eventsArray[k].result.split("-")[0].trim()
                                                    let away_goal1 = eventsArray[k].result.split("-")[1].trim()
                                                    let home_goal2 = eventsArray[k + 1].result.split("-")[0].trim()
                                                    let away_goal2 = eventsArray[k + 1].result.split("-")[1].trim()

                                                    if(k === 0){
                                                        for(kk = 0 ; kk < minute1 - 1 ; kk++){
                                                            score_array.push({"score": {"home": 0, "away": 0}, "timeElapsed": kk + 1, "elapsedRegularTime": kk + 1})
                                                        }
                                                        score_array.push({"score": {"home": home_goal1, "away": away_goal1}, "timeElapsed": minute1, "elapsedRegularTime": minute1})
                                                    }
                                                    for(kk = minute1 ; kk < minute2 - 1 ; kk++){
                                                        score_array.push({"score": {"home": home_goal1, "away": away_goal1}, "timeElapsed": kk + 1, "elapsedRegularTime": kk + 1})
                                                    }
                                                    score_array.push({"score": {"home": home_goal2, "away": away_goal2}, "timeElapsed": minute2, "elapsedRegularTime": minute2})
                                                }
                                                for(k = eventsArray[eventsArray.length - 1].minute ; k < p_time ; k++){
                                                    let last_home_goal = eventsArray[eventsArray.length - 1].result.split("-")[0].trim()
                                                    let last_away_goal = eventsArray[eventsArray.length - 1].result.split("-")[1].trim()
                                                    score_array.push({"score": {"home": last_home_goal, "away": last_away_goal}, "timeElapsed": k + 1, "elapsedRegularTime": k + 1})
                                                }

                                            }
                                            else if(eventsArray.length === 1){
                                                let minute1 = eventsArray[0].minute
                                                let home_goal1 = eventsArray[0].result.split("-")[0].trim()
                                                let away_goal1 = eventsArray[0].result.split("-")[1].trim()

                                                for(kk = 0 ; kk < minute1 - 1 ; kk++){
                                                    score_array.push({"score": {"home": 0, "away": 0}, "timeElapsed": kk + 1, "elapsedRegularTime": kk + 1})
                                                }
                                                score_array.push({"score": {"home": home_goal1, "away": away_goal1}, "timeElapsed": minute1, "elapsedRegularTime": minute1})

                                                for(k = minute1 ; k < p_time ; k++){
                                                    let last_home_goal = eventsArray[eventsArray.length - 1].result.split("-")[0].trim()
                                                    let last_away_goal = eventsArray[eventsArray.length - 1].result.split("-")[1].trim()
                                                    score_array.push({"score": {"home": last_home_goal, "away": last_away_goal}, "timeElapsed": k + 1, "elapsedRegularTime": k + 1})
                                                }

                                            }
                                            db.collection('predictionTable').updateOne({"_id": predictionId},
                                                {$set: {
                                                        'scores': score_array,
                                                        'ht_score': ht_score,
                                                        'ft_score': ft_score
                                                    }},
                                                {upsert: true},
                                                function (err, item) {
                                                    if (err) { return }
                                                })
                                            console.log('score array***************===>',predictionId,', ', ht_score,', ',ft_score)
                                        }
                                    }
                                }
                            }
                        }
                    }
                    console.log(c)
                }
            }
        }
    });
    test.start()
    //---------------------------------Season Stats-----------------------------------
    // let team_season_stats
    // let season_stats_index = 0
    // team_season_stats = schedule('*/10 * * * * *', async () => {
    //     season_stats_index++
    //     let start_date = new Date();
    //     let next_date = start_date.setDate(start_date.getDate() + 0);
    //     next_date = new Date(next_date).toISOString()
    //     let service = new betfair();
    //     let teams = await db.collection('liveStats').aggregate([
    //         { $match: {"time.starting_at.date": next_date.substring(0,10), "time.status": {$ne: "FT"}}},
    //         { $lookup: { from: "team_season", localField: "home_id", foreignField: "teamId", as: "Teams1" }},
    //         { $lookup: { from: "team_season", localField: "away_id", foreignField: "teamId", as: "Teams2" }}
    //     ]).toArray();
    //
    //     let teamId_array = []
    //     for(i = 0 ; i < teams.length ; i++){
    //         if(teams[i].Teams1.length > 0 && teams[i].Teams1[0].update_date < next_date.substring(0,10)){
    //             teamId_array.push({"seasonId": teams[i].Teams1[0].season_id, "teamId": teams[i].Teams1[0].teamId})
    //         }
    //         else if(teams[i].Teams2.length > 0 && teams[i].Teams2[0].update_date < next_date.substring(0,10)){
    //             teamId_array.push({"seasonId": teams[i].Teams2[0].season_id, "teamId": teams[i].Teams2[0].teamId})
    //         }
    //     }
    //     console.log('teams_season_stats_length==>++++++++++++++++', teamId_array.length)
    //     for(i = 0 ; i < teamId_array.length ; i++){
    //         console.log('teamIdArrayLength===>', teamId_array[i], i)
    //         if(season_stats_index > teamId_array.length + 1){
    //             season_stats_index = 1
    //         }
    //
    //         if(season_stats_index === i + 1){
    //             console.log('**********', teamId_array[i].seasonId, teamId_array[i].teamId)
    //             let season_data = await service.team_season_statics(teamId_array[i].seasonId, teamId_array[i].teamId)
    //             let season_stats = {
    //                 "attacks": season_data[1].stats.data[0].attacks,
    //                 "dangerous_attacks": season_data[1].stats.data[0].dangerous_attacks,
    //                 "avg_ball_possession_percentage": season_data[1].stats.data[0].avg_ball_possession_percentage,
    //                 "fouls": season_data[1].stats.data[0].fouls,
    //                 "avg_fouls_per_game": season_data[1].stats.data[0].avg_fouls_per_game,
    //                 "offsides": season_data[1].stats.data[0].offsides,
    //                 "redcards": season_data[1].stats.data[0].redcards,
    //                 "yellowcards": season_data[1].stats.data[0].yellowcards,
    //                 "shots_blocked": season_data[1].stats.data[0].shots_blocked,
    //                 "shots_off_target": season_data[1].stats.data[0].shots_off_target,
    //                 "avg_shots_off_target_per_game": season_data[1].stats.data[0].avg_shots_off_target_per_game,
    //                 "shots_on_target": season_data[1].stats.data[0].shots_on_target,
    //                 "avg_shots_on_target_per_game": season_data[1].stats.data[0].avg_shots_on_target_per_game,
    //                 "avg_corners": season_data[1].stats.data[0].avg_corners,
    //                 "total_corners": season_data[1].stats.data[0].total_corners,
    //                 "btts": season_data[1].stats.data[0].btts,
    //                 "update_date": next_date.substring(0,10)
    //             }
    //             console.log(season_data[0], season_stats)
    //             await db.collection('team_season').updateOne({'_id': season_data[0]},
    //                 {$set: season_stats},
    //                 function (err, item) {
    //                     if (err) {
    //                         return
    //                     }
    //                 })
    //         }
    //     }
    // })
    // team_season_stats.start()
    //--------------------------------------------------------------------------------
    //todo api cold stats part
    let cold;
    let coldIndex = 0
    let coldIndex1 = 0
    let coldIndex2 = 0
    let coldIndex3 = 0
    cold = schedule('*/23 * * * * *', async () => {
        coldIndex++
        let start_date4 = new Date();
        let next_date4 = start_date4.setDate(start_date4.getDate() + 0);
        next_date4 = new Date(next_date4).toISOString()
        next_date4 = next_date4.substring(0,10)

        let start_date5 = new Date();
        let next_date5 = start_date5.setDate(start_date5.getDate() - 1);
        next_date5 = new Date(next_date5).toISOString()
        next_date5 = next_date5.substring(0,10)
        if(coldIndex % 7 == 0){
            coldIndex1++
            let apiEvents = await db.collection('DailyApiEvents').find({"time.starting_at.date": next_date4}).toArray()
            // console.log(apiEvents)
            let seasonIdArray = []
            for(i = 0 ; i < apiEvents.length ; i++){
                seasonIdArray.push(apiEvents[i].season_id)
            }
            seasonIdArray = Array.from(new Set (seasonIdArray))

            if(coldIndex1 > seasonIdArray.length + 1){
                coldIndex1 = 1
            }
            console.log('seasonIdArrayLength=>', seasonIdArray.length)
            for(j = 0 ; j < seasonIdArray.length ; j++){
                if(coldIndex1 == (j + 1)){
                    let service = new betfair();
                    let data = await service.getRoundsId(seasonIdArray[j])
                    let roundIds = []
                    for(p = 0 ; p < data.length ; p++){
                        // roundIds.push({'roundId': data[p].id, 'name': data[p].name, 'start': data[p].start, 'end': data[p].end})
                        let check = await db.collection('seasonRoundIds').findOne({"_id": data[p].id})
                        let query = {"_id": data[p].id}
                        if(!check){
                            await db.collection('seasonRoundIds').updateOne(query,
                                {
                                    $set: {
                                        "_id": data[p].id,
                                        "round_id": data[p].id,
                                        "name": data[p].name,
                                        'season_id': data[p].season_id,
                                        "leagueId": data[p].league_id,
                                        'stage_id': data[p].stage_id,
                                        "start": data[p].start,
                                        "end": data[p].end,
                                        "events": [],
                                        "stats": []
                                    }
                                },
                                {upsert: true})
                        }
                    }
                }
            }
        }
        else if(coldIndex % 7 == 3 || coldIndex % 7 == 4 || coldIndex % 7 == 5 || coldIndex % 7 == 6){
            coldIndex2++
            let service = new betfair();
            // let rounds = await db.collection('seasonRoundIds').find({"start": {'$lt': next_date4}}).toArray()
            // let rounds = await db.collection('predictionTable').find({"roundId": {$gt: 0}}).toArray()
            let rounds = await db.collection('DailyApiEvents').find({"time.starting_at.date": {$gte: next_date5, $lte: next_date4}, "round_id": {$ne: null}, "update_date": {$ne: next_date4}}).toArray()
            // next_date4 = "2020-10-13"
            // let rounds = await db.collection('seasonRoundIds').find({"round_id": {$ne: null}, "start": {'$lt': next_date4}, "update_date": {$ne : next_date4}}).toArray()

            console.log('rounds length=>', rounds.length)
            if(coldIndex2 > rounds.length + 1){
                coldIndex2 = 1
            }
            for(i = 0 ; i < rounds.length ; i++){
                if(coldIndex2 == (i + 1)){
                    // console.log(rounds)
                    let roundId = rounds[i].round_id
                    // let roundId = rounds[i].roundId
                    let data = await service.getEventsAllRounds(roundId, rounds[i]._id)
                    let fixtures = data[0].fixtures.data
                    console.log('data===>**************events and stats update=====>****************', ', ', data[1])
                    let eventResult = []
                    let statsArray = []
                    for(j = 0 ; j < fixtures.length ; j++){
                        if(fixtures[j].time.status == 'FT'){
                            let localteamId = fixtures[j].localteam_id
                            let visitorteamId = fixtures[j].visitorteam_id
                            let localteamScore = fixtures[j].scores.localteam_score
                            let visitorteamScore = fixtures[j].scores.visitorteam_score
                            let ht_score = fixtures[j].scores.ht_score
                            let ft_score = fixtures[j].scores.ft_score
                            let date = fixtures[j].time.starting_at.date
                            let eventsData = fixtures[j].events.data
                            let statsData = fixtures[j].stats.data
                            let eventsArray = []

                            statsArray.push(statsData)
                            for(k = 0 ; k < eventsData.length ; k++){
                                if(eventsData[k].type == 'penalty' || eventsData[k].type == 'goal' || eventsData[k].type == 'own-goal'){
                                    let extra_minute = 0
                                    if(eventsData[k].extra_minute){
                                        extra_minute = eventsData[k].extra_minute
                                    }
                                    eventsArray.push({"teamId": eventsData[k].team_id, "minute":eventsData[k].minute + extra_minute, "result":eventsData[k].result})
                                }
                            }
                            eventResult.push({"localteamId": localteamId, "visitorteamId": visitorteamId, "localteamScore": localteamScore, "visitorteamSore": visitorteamScore, "hf_score": ht_score, "ft_score": ft_score, "date": date, "goals": eventsArray})
                        }
                    }
                    let query = {"_id": data[1]}
                    await db.collection('seasonRoundIds').updateOne(query,
                        {
                            $set: {
                                "events": eventResult,
                                "stats": statsArray,
                                "update_date": next_date4
                            }
                        })

                    await db.collection('DailyApiEvents').updateOne({"_id": data[2]},
                        {
                            $set: {
                                "update_date": next_date4
                            }
                        })

                }
            }
            console.log('roundslength==>', rounds.length)
        }
        else if(coldIndex % 7 == 1){
            coldIndex3++
            let seasons = await db.collection('DailyApiEvents').find().toArray()
            let seasonArray = []
            for(i = 0 ; i < seasons.length ; i++){
                seasonArray[i] = seasons[i].season_id
            }
            seasonArray = Array.from(new Set (seasonArray))
            for(i = 0 ; i < seasonArray.length ; i++){
                if(coldIndex3 > seasonArray.length){
                    coldIndex3 = 1
                }
                if(i == coldIndex3 - 1){
                    let service = new betfair();
                    let data = await service.standingsSeason(seasonArray[i])
                    let query = {"_id": data[1]}

                    if(data[0] && data[0][0]){
                        await db.collection('seasonStandings').updateOne(query,
                            {
                                $set: {
                                    "_id": data[1],
                                    "season_id":data[1],
                                    "league_id":data[0][0].league_id,
                                    "round_id":data[0][0].round_id,
                                    "standings": data[0][0].standings.data
                                }
                            },
                            {upsert: true})
                    }

                }
            }
            console.log('seasonArray==>', seasonArray.length)
        }
        else if(coldIndex % 7 == 2){
            let eventResult = await db.collection('predictionTable').aggregate([
                { $match: {"date": {$gte: next_date5, $lte: next_date4}}},
                { $lookup: { from: "events", localField: "eventId", foreignField: "eventId", as: "events" }}
            ]).toArray();

            for(i = 0 ; i < eventResult.length ; i++){
                let time = 115
                let half_extra = 1
                let forwarded_time = 15
                if(eventResult[i].events[0]){
                    if(eventResult[i].events[0].timeElapsed >= 90){
                        time = eventResult[i].events[0].timeElapsed
                    }
                    if(eventResult[i].events[0].updateDetails){
                        let half_end_check = 0
                        let second_start_check = 0
                        let half_end_time = ""
                        let second_start_time = ""
                        let diff = 0
                        for(u = 0 ; u < eventResult[i].events[0].updateDetails.length ; u++){
                            if(eventResult[i].events[0].updateDetails[u].type == "FirstHalfEnd"){
                                half_end_check = 1
                                half_end_time = eventResult[i].events[0].updateDetails[u].updateTime
                            }
                            if(eventResult[i].events[0].updateDetails[u].type == "SecondHalfKickOff"){
                                second_start_check = 1
                                second_start_time = eventResult[i].events[0].updateDetails[u].updateTime
                            }
                            if(eventResult[i].events[0].updateDetails[u].type == "FirstHalfEnd" && eventResult[i].events[0].updateDetails[u].elapsedAddedTime){
                                half_extra = eventResult[i].events[0].updateDetails[u].elapsedAddedTime
                            }
                        }

                        if(half_end_check === 1 && second_start_check === 1){
                            let date1 = new Date(second_start_time)
                            let date2 = new Date(half_end_time)
                            diff = date1.getTime() - date2.getTime()
                            forwarded_time = Math.floor(diff / 60e3)
                        }
                    }
                }
                // console.log('extra_time_check=>*************', time,', forwarded_tme=>', forwarded_time,', half_extra=>',half_extra)
                let query = {"_id": eventResult[i]._id}
                db.collection('predictionTable').updateOne(query,
                    {$set: {
                            'timeElapsed': time,
                            'half_extra': half_extra,
                            'break_time': forwarded_time
                        }},
                    function (err, item) {
                        if (err) { return }
                    })
            }
        }
    });
    cold.start()

    //todo odd update cron
    let taskLiveOdd
    let index = 0
    taskLiveOdd = schedule('*/2 * * * * *', async () => {
        index += 1
        let start_date = new Date();
        let next_date = start_date.setDate(start_date.getDate() + 0);
            next_date = new Date(next_date).toISOString()
        let openDate = next_date.substring(0,11)+'04:00:00'+ next_date.substring(19,24)
        let query = {"marketTime": {'$gte': openDate},"state.status": {$ne:"CLOSED"}}
        let marketsList = await db.collection('markets').find(query).sort({"marketTime": 1}).toArray()
        let oddArray = []
        if(index % 4 == 1){
            if(marketsList.length > 0){
                for(i = 0 ; i < marketsList.length; i++){
                    oddArray[i] = marketsList[i].marketId
                }
            }
            if(oddArray.length > 0){
                oddUpdate(oddArray,index)
            }
        }
        else if(index % 4 == 2){
            if(marketsList.length > 39){
                for(i = 40 ; i < marketsList.length; i++){
                    oddArray[i - 40] = marketsList[i].marketId
                }
            }
            if(oddArray.length > 0){
                oddUpdate(oddArray,index)
            }
        }
        else if(index % 4 == 3){
            if(marketsList.length > 79){
                for(i = 80 ; i < marketsList.length; i++){
                    oddArray[i - 80] = marketsList[i].marketId
                }
            }
            if(oddArray.length > 0){
                oddUpdate(oddArray,index)
            }
        }
        array = [
            {
                "leagueName": "Italy >> Italian Serie A",
                "url": "https://www.transfermarkt.com/serie-a/spieltag/wettbewerb/IT1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 38
            },
            {
                "leagueName": "Italy >> Italian Serie B",
                "url": "https://www.transfermarkt.com/serie-b/spieltag/wettbewerb/IT2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 38
            },
            {
                "leagueName": "England >> English Premier League",
                "url": "https://www.transfermarkt.com/premier-league/spieltag/wettbewerb/GB1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 38
            },
            {
                "leagueName": "England >> English Championship",
                "url": "https://www.transfermarkt.com/championship/spieltag/wettbewerb/GB2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 46
            },
            {
                "leagueName": "England >> English League 1",
                "url": "https://www.transfermarkt.com/league-one/spieltag/wettbewerb/GB3/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 37
            },
            {
                "leagueName": "England >> English League 2",
                "url": "https://www.transfermarkt.com/league-two/spieltag/wettbewerb/GB4/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 37
            },
            {
                "leagueName": "Germany >> German Bundesliga",
                "url": "https://www.transfermarkt.com/bundesliga/spieltag/wettbewerb/L1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 34
            },
            {
                "leagueName": "Germany >> German 2 Bundesliga",
                "url": "https://www.transfermarkt.com/2-bundesliga/spieltag/wettbewerb/L2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 34
            },
            {
                "leagueName": "Germany >> German 3 Liga",
                "url": "https://www.transfermarkt.com/3-liga/spieltag/wettbewerb/L3/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 38
            },
            {
                "leagueName": "Spain >> Spanish La Liga",
                "url": "https://www.transfermarkt.com/laliga/spieltag/wettbewerb/ES1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 38
            },
            {
                "leagueName": "Spain >> Spanish Segunda Division",
                "url": "https://www.transfermarkt.com/laliga2/spieltag/wettbewerb/ES2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 42
            },
            {
                "leagueName": "Portugal >> Portuguese Primeira Liga",
                "url": "https://www.transfermarkt.com/liga-nos/spieltag/wettbewerb/PO1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 34
            },
            {
                "leagueName": "Protugal >> Liga pro",
                "url": "https://www.transfermarkt.com/liga-pro/spieltag/wettbewerb/PO2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 24
            },
            {
                "leagueName": "France >> Ligue 1",
                "url": "https://www.transfermarkt.com/ligue-1/spieltag/wettbewerb/FR1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 28
            },
            {
                "leagueName": "France >> Ligue 2",
                "url": "https://www.transfermarkt.com/ligue-2/spieltag/wettbewerb/FR2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 33
            },
            {
                "leagueName": "Austria >> Austrian Bundesliga",
                "url": "https://www.transfermarkt.com/bundesliga/spieltag/wettbewerb/A1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 32
            },
            {
                "leagueName": "Austria >> Austrian Erste Liga",
                "url": "https://www.transfermarkt.com/2-liga/spieltag/wettbewerb/A2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 30
            },
            {
                "leagueName": "Belgium >> Jupiler Pro league",
                "url": "https://www.transfermarkt.com/jupiler-pro-league/spieltag/wettbewerb/BE1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 30
            },
            {
                "leagueName": "Belgium >> Proximus league",
                "url": "https://www.transfermarkt.com/proximus-league/spieltag/wettbewerb/BE2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 28
            },
            {
                "leagueName": "Switzerland >> Swiss Super League",
                "url": "https://www.transfermarkt.com/super-league/spieltag/wettbewerb/C1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 36
            },
            {
                "leagueName": "Switzerland >> Swiss Challenge League",
                "url": "https://www.transfermarkt.com/challenge-league/spieltag/wettbewerb/C2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 36
            },
            {
                "leagueName": "Brazil >> Serie A",
                "url": "https://www.transfermarkt.com/campeonato-brasileiro-serie-a/spieltag/wettbewerb/BRA1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 1
            },
            {
                "leagueName": "Brazil >> Serie B",
                "url": "https://www.transfermarkt.com/campeonato-brasileiro-serie-b/spieltag/wettbewerb/BRA2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 1
            },
            {
                "leagueName": "Denmark >> Danish Superliga",
                "url": "https://www.transfermarkt.com/superligaen/spieltag/wettbewerb/DK1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 26
            },
            {
                "leagueName": "Finland >> Finnish Kolmonen",
                "url": "https://www.transfermarkt.com/veikkausliiga/spieltag/wettbewerb/FI1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 22
            },
            {
                "leagueName": "Finland >> Finnish Ykkonen",
                "url": "https://www.transfermarkt.com/ykkonen/spieltag/wettbewerb/FI2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 22
            },
            {
                "leagueName": "Japan >> Japanese J League",
                "url": "https://www.transfermarkt.com/j1-league/spieltag/wettbewerb/JAP1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 13
            },
            {
                "leagueName": "Norway >> Norwegian Eliteserien",
                "url": "https://www.transfermarkt.com/eliteserien/spieltag/wettbewerb/NO1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 30
            },
            {
                "leagueName": "Norway >> Norwegian 1st division",
                "url": "https://www.transfermarkt.com/obos-ligaen/spieltag/wettbewerb/NO2/plus/?saison_id=2018&spieltag=",
                "historic_data": [],
                "mdayNum": 30
            },
            {
                "leagueName": "Poland >> Polish Ekstraklasa",
                "url": "https://www.transfermarkt.com/pko-ekstraklasa/spieltag/wettbewerb/PL1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 37
            },
            {
                "leagueName": "Poland >> Polish I Liga",
                "url": "https://www.transfermarkt.com/fortuna-1-liga/spieltag/wettbewerb/PL2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 34
            },
            {
                "leagueName": "Russia >> Russian Premier League",
                "url": "https://www.transfermarkt.com/premier-liga/spieltag/wettbewerb/RU1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 30
            },
            {
                "leagueName": "Russia >> 1st division",
                "url": "https://www.transfermarkt.com/1-division/spieltag/wettbewerb/RU2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 27
            },
            {
                "leagueName": "Scotland >> Premiership",
                "url": "https://www.transfermarkt.com/scottish-premiership/spieltag/wettbewerb/SC1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 33
            },
            {
                "leagueName": "Scotland >> Championship",
                "url": "https://www.transfermarkt.com/scottish-championship/spieltag/wettbewerb/SC2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 36
            },
            {
                "leagueName": "Sweden >> Swedish Allsvenskan",
                "url": "https://www.transfermarkt.com/allsvenskan/spieltag/wettbewerb/SE1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 4
            },
            {
                "leagueName": "Sweden >> Swedish Superettan",
                "url": "https://www.transfermarkt.com/superettan/spieltag/wettbewerb/SE2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 10
            },
            {
                "leagueName": "Turkey >> Turkish Super League",
                "url": "https://www.transfermarkt.com/super-lig/spieltag/wettbewerb/TR1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 34
            },
            {
                "leagueName": "Turkey >> Turkish 1 Lig",
                "url": "https://www.transfermarkt.com/1-lig/spieltag/wettbewerb/TR2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 34
            },
            {
                "leagueName": "Greece >> Greek Super League",
                "url": "https://www.transfermarkt.com/super-league-1/spieltag/wettbewerb/GR1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 26
            },
            {
                "leagueName": "Greece >> SL playoff",
                "url": "https://www.transfermarkt.com/super-league-1-play-off/spieltag/wettbewerb/POGR/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 10
            },
            {
                "leagueName": "Greece >> SL playout",
                "url": "https://www.transfermarkt.com/super-league-1-play-out/spieltag/wettbewerb/S1PO/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 7
            },
            {
                "leagueName": "Belarus >> Belarusian Premier League",
                "url": "https://www.transfermarkt.com/vysheyshaya-liga/spieltag/wettbewerb/WER1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 19
            },
            {
                "leagueName": "Belarus >> Pershja",
                "url": "https://www.transfermarkt.com/pershaja-liga/spieltag/wettbewerb/WER2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 11
            },
            {
                "leagueName": "Croatia >> Croatian 1 HNL",
                "url": "https://www.transfermarkt.com/1-hnl/spieltag/wettbewerb/KR1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 34
            },
            {
                "leagueName": "Argentina >> Superliga",
                "url": "https://www.transfermarkt.com/superliga/spieltag/wettbewerb/AR1N/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 23
            },
            {
                "leagueName": "Australia >> Australian A-League",
                "url": "https://www.transfermarkt.com/a-league/spieltag/wettbewerb/AUS1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 29
            },
            {
                "leagueName": "Bosnia Herzegovina >> Premijer Liga",
                "url": "https://www.transfermarkt.com/premijer-liga/spieltag/wettbewerb/BOS1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 22
            },
            {
                "leagueName": "Bulgaria >> Bulgarian A League",
                "url": "https://www.transfermarkt.com/efbet-liga/spieltag/wettbewerb/BU1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 26
            },
            {
                "leagueName": "Chile >> primera division de chile",
                "url": "https://www.transfermarkt.com/primera-division-de-chile/spieltag/wettbewerb/CLPD/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 8
            },
            {
                "leagueName": "China >> Chinese Superligue",
                "url": "https://www.transfermarkt.com/chinese-super-league/spieltag/wettbewerb/CSL/plus/?saison_id=2018&spieltag=",
                "historic_data": [],
                "mdayNum": 0
            },
            {
                "leagueName": "Colombia >> Liga Dimayor I",
                "url": "https://www.transfermarkt.com/liga-dimayor-i/spieltag/wettbewerb/COLP/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 8
            },
            {
                "leagueName": "Czech republic >> Czech 1 Liga",
                "url": "https://www.transfermarkt.com/fortuna-liga/spieltag/wettbewerb/TS1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 30
            },
            {
                "leagueName": "Ecuador >> LigaPro Serie A Primera Etapa",
                "url": "https://www.transfermarkt.com/ligapro-serie-a-primera-etapa/spieltag/wettbewerb/EL1A/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 6
            },
            {
                "leagueName": "Egypt >> Egyptian Premier Ligue",
                "url": "https://www.transfermarkt.com/egyptian-premier-league/spieltag/wettbewerb/EGY1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 20
            },
            {
                "leagueName": "Hungary >> Nemzeti Bajnoksag",
                "url": "https://www.transfermarkt.com/nemzeti-bajnoksag/spieltag/wettbewerb/UNG1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 33
            },
            {
                "leagueName": "Iceland >> Icelandic Urvasdeild",
                "url": "https://www.transfermarkt.com/pepsi-max-deild/spieltag/wettbewerb/IS1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 22
            },
            {
                "leagueName": "Iceland >> Icelandic 1 Deild",
                "url": "https://www.transfermarkt.com/lengjudeild/spieltag/wettbewerb/IS2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 22
            },
            {
                "leagueName": "India >> Indian Super League",
                "url": "https://www.transfermarkt.com/indian-super-league/spieltag/wettbewerb/IND1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 18
            },
            {
                "leagueName": "Israel >> Israeli Premier League",
                "url": "https://www.transfermarkt.com/ligat-haal/spieltag/wettbewerb/ISR1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 26
            },
            {
                "leagueName": "Japan >> Japanese J League 2",
                "url": "https://www.transfermarkt.com/j2-league/spieltag/wettbewerb/JAP2/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 15
            },
            {
                "leagueName": "Lithuania >> Lithuanian A Lyga",
                "url": "https://www.transfermarkt.com/a-lyga/spieltag/wettbewerb/LI1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 20
            },
            {
                "leagueName": "Mexico >> MX Apertura",
                "url": "https://www.transfermarkt.com/liga-mx-apertura/spieltag/wettbewerb/MEXA/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 19
            },
            {
                "leagueName": "Mexico >> MX Clausura",
                "url": "https://www.transfermarkt.com/liga-mx-clausura/spieltag/wettbewerb/MEX1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 10
            },
            {
                "leagueName": "Qatar >> Qatar Start League",
                "url": "https://www.transfermarkt.com/qatar-stars-league/spieltag/wettbewerb/QSL/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 20
            },
            {
                "leagueName": "Ireland >> Premier League",
                "url": "https://www.transfermarkt.com/premier-league/spieltag/wettbewerb/IR1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 8
            },
            {
                "leagueName": "Ireland >>First Division",
                "url": "https://www.transfermarkt.com/first-division-playoffs/spieltag/wettbewerb/IR12/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 27
            },
            {
                "leagueName": "Romania >> Romanian Liga I",
                "url": "https://www.transfermarkt.com/liga-1/spieltag/wettbewerb/RO1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 26
            },
            {
                "leagueName": "Romania >> Liga 1 Championship Group",
                "url": "https://www.transfermarkt.com/liga-1-championship-group/spieltag/wettbewerb/RO1C/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 10
            },
            {
                "leagueName": "Romania >> Liga 1 Relegation Group",
                "url": "https://www.transfermarkt.com/liga-1-relegation-group/spieltag/wettbewerb/RO1R/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 8
            },
            {
                "leagueName": "Serbia >> Super Liga Srbije",
                "url": "https://www.transfermarkt.com/super-liga-srbije/spieltag/wettbewerb/SER1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 30
            },
            {
                "leagueName": "Singapore >> Singapore Premier Ligue",
                "url": "https://www.transfermarkt.com/singapore-premier-league/spieltag/wettbewerb/SIN1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 27
            },
            {
                "leagueName": "Slovakia >> Slovakian Super League",
                "url": "https://www.transfermarkt.com/fortuna-liga/spieltag/wettbewerb/SLO1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 22
            },
            {
                "leagueName": "Slovenia >> Slovenian Premier League",
                "url": "https://www.transfermarkt.com/prva-liga/spieltag/wettbewerb/SL1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 36
            },
            {
                "leagueName": "South korea >> K League 1",
                "url": "https://www.transfermarkt.com/k-league-1/spieltag/wettbewerb/RSK1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 22
            },
            {
                "leagueName": "United Arab Emirates >> UAE Arabian Gulf league",
                "url": "https://www.transfermarkt.com/uae-arabian-gulf-league/spieltag/wettbewerb/UAE1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 19
            },
            {
                "leagueName": "Ukraine >> Ukrainian Premier Ligue",
                "url": "https://www.transfermarkt.com/premier-liga/spieltag/wettbewerb/UKR1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 22
            },
            {
                "leagueName": "United States >> US Major League Soccer",
                "url": "https://www.transfermarkt.com/major-league-soccer/spieltag/wettbewerb/MLS1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 2
            },
            {
                "leagueName": "Vietnam >> V.League 1",
                "url": "https://www.transfermarkt.com/v-league-1/spieltag/wettbewerb/VIE1/plus/?saison_id=2019&spieltag=",
                "historic_data": [],
                "mdayNum": 13
            },
        ]

        // await db.collection('historicData').deleteMany({'url': {$ne: "1"}})
        // db.collection('historicData').insertMany(array)

    });
    taskLiveOdd.start()
    //---------------------

    //todo static table scrapping from statistic website
    let task3;
    task3 = schedule('0 */15 */1 * *', async () => {
        // task3 = schedule('*/10 * * * * *', async () => {
        let service = new betfair();
        let data = await service.statisticsData()
        await db.collection('teamlist').deleteMany({'groupName': {$ne: "1"}})
        db.collection('teamlist').insertMany(data)
        console.log('groupteam inserted')
    });
    task3.start()

    let task4;
    task4 = schedule('0 */5 * * *', async () => {
        // task3 = schedule('*/10 * * * * *', async () => {
        let start_date4 = new Date();
        let next_date4 = start_date4.setDate(start_date4.getDate() + 0);
        next_date4 = new Date(next_date4).toISOString()
        next_date4 = next_date4.substring(0,10)

        let service = new betfair();
        let meta = await service.getWholefixturePagebyDay(next_date4)

        let query = {"_id": next_date4}
        await db.collection('DateFixtures').updateOne(query,
            {
                $set: {
                    '_id': next_date4,
                    'pages': meta.pagination.total_pages,
                }
            },
            {upsert: true},
            function (err, item) {
                if (err) {
                    return
                }
            })
        console.log('pages=>', meta.pagination.total_pages)
    });
    task4.start()

//------------------------------------------date fixtures-----------------------------------------------
//     let date_fixtures;
//     let dated_fixtures_index = 74
//     date_fixtures = schedule('*/15 * * * * *', async () => {
//         // task3 = schedule('*/10 * * * * *', async () => {
//         dated_fixtures_index++
//         let start_date4 = new Date();
//         let next_date4 = start_date4.setDate(start_date4.getDate() - dated_fixtures_index);
//         next_date4 = new Date(next_date4).toISOString()
//         next_date4 = next_date4.substring(0,10)
// console.log('date_fixtures_testing=====>', next_date4)
//         let service = new betfair();
//         let meta = await service.getWholefixturePagebyDay(next_date4)
//
//         let query = {"_id": next_date4}
//         await db.collection('DateFixtures').updateOne(query,
//             {
//                 $set: {
//                     '_id': next_date4,
//                     'pages': meta.pagination.total_pages,
//                 }
//             },
//             {upsert: true},
//             function (err, item) {
//                 if (err) {
//                     return
//                 }
//             })
//         console.log('pages=>', meta.pagination.total_pages)
//     });
//     date_fixtures.start()
//----------------------------------


    //todo score update script
    async function scoreUpdate(eventArray,index) {
        try{
            if(eventArray.length < 1){
                return
            }
            let service = new betfair();
            let scores = await service.getScore(eventArray)
            console.log('scores length=>', scores.length)
            for (i = 0; i < scores.length; i++) {
                let setEArray = {
                    "eventId": scores[i].eventId,
                    'score': scores[i].score,
                    'timeElapsed': scores[i].timeElapsed,
                    'elapsedRegularTime': scores[i].elapsedRegularTime,
                    'updateDetails': scores[i].updateDetails,
                    'status': scores[i].status,
                    'inPlayMatchStatus': scores[i].inPlayMatchStatus
                }
                let query = {"eventId": scores[i].eventId}
                await db.collection('events').updateOne(query,
                    {
                        $set: {
                            'score': scores[i].score,
                            'timeElapsed': scores[i].timeElapsed,
                            'elapsedRegularTime': scores[i].elapsedRegularTime,
                            'updateDetails': scores[i].updateDetails,
                            'status': scores[i].status,
                            'inPlayMatchStatus': scores[i].inPlayMatchStatus,
                        }
                    }, function (err, item) {
                        if (err) {
                            return
                        }
                        if (item.result.nModified > 0) {
                            io.emit('UpdateScore', setEArray)
                            console.log('----Com_Score----')
                        }
                    })
            }

            for (i = 0; i < scores.length; i++) {
                let time_check = await db.collection('events').find({"eventId": scores[i].eventId}).toArray()
                let timeLength = 0
                if(time_check.length > 0){
                    timeLength = time_check[0].scores.length
                }

                let time = 0
                let time1 = 0
                if(timeLength > 0){
                    time = time_check[0].scores[timeLength - 1].elapsedRegularTime
                    time1 = time_check[0].scores[timeLength - 1].timeElapsed
                }
                // console.log('score_update_start', time, time1)
                // let date = new Date()
                // console.log('minute==>', date.getUTCSeconds())
                // console.log('score_updating',scores[i].elapsedRegularTime, scores[i].timeElapsed)
                let score = {"score": {"home": scores[i].score.home.score, "away": scores[i].score.away.score}, "timeElapsed": scores[i].timeElapsed, "elapsedRegularTime": scores[i].elapsedRegularTime}
                // if(scores[i].timeElapsed - time1 > 0 || scores[i].elapsedRegularTime - time > 0){
                //     // console.log('score_updating_final',scores[i].elapsedRegularTime, scores[i].timeElapsed)
                //     await db.collection('events').updateMany(
                //         { "eventId": scores[i].eventId },
                //         {
                //             $push: {
                //                 scores: {
                //                     $each: [score],
                //                     $slice: -180
                //                 }
                //             }
                //         }
                //     )
                // }

            }

        } catch (err) {
            return
        }
    }

    //todo odd update script
    async function oddUpdate(marketsArray,index) {
        try{
            if(marketsArray.length < 1){
                return
            }
            let service = new betfair();
            let eventNodesList = []
            let markets = await service.getOdd(marketsArray)
            let marketNodesList = []
            let socketIndex = 0
            let socketOdd = []
            for (i = 0; i < markets.eventTypes.length; i++) {
                eventNodesList = markets.eventTypes[i].eventNodes
                for (j = 0; j < eventNodesList.length; j++) {
                    marketNodesList = eventNodesList[j].marketNodes
                    let eventId = eventNodesList[j].eventId
                    for (k = 0; k < marketNodesList.length; k++) {
                        if(marketNodesList[k].state.inplay === true){
                            let query = {"eventId": eventId}
                            await db.collection('events').updateOne(query,
                                {
                                    $set: {
                                        'status': "IN_PLAY"
                                    }
                                },
                                {upsert: true},
                                function (err, item) {
                                    if (err) {
                                        return
                                    }
                                })
                        }

                        let setArray = {
                            'marketId': marketNodesList[k].marketId,
                            'isMarketDataDelayed': marketNodesList[k].isMarketDataDelayed,
                            'inplay': marketNodesList[k].state.inplay,
                            'state': marketNodesList[k].state,
                            'runners': marketNodesList[k].runners,
                            'isMarketDataVirtual': marketNodesList[k].isMarketDataVirtual
                        }
                        let item  = await db.collection('markets').updateOne({'marketId': marketNodesList[k].marketId},
                            {
                                $set: {
                                    'isMarketDataDelayed': marketNodesList[k].isMarketDataDelayed,
                                    'inplay': marketNodesList[k].state.inplay,
                                    'state': marketNodesList[k].state,
                                    'runners': marketNodesList[k].runners,
                                    'isMarketDataVirtual': marketNodesList[k].isMarketDataVirtual
                                }
                            })
                        if (item.result.nModified > 0) {
                            socketOdd.push(setArray)
                            socketIndex += 1
                        }
                    }

                }
            }
            io.emit('UpdateOdds', socketOdd)
                for (i = 0; i < markets.eventTypes.length; i++) {
                    eventNodesList = markets.eventTypes[i].eventNodes
                    for (j = 0; j < eventNodesList.length; j++) {
                        marketNodesList = eventNodesList[j].marketNodes

                        for (k = 0; k < marketNodesList.length; k++) {
                            let date = new Date();
                            if(marketNodesList[k].state.inplay === false){
                                await db.collection('markets').updateOne({'marketId': marketNodesList[k].marketId},
                                    {
                                        $set: {
                                            'prematchMarket':{
                                                'marketId': marketNodesList[k].marketId,
                                                'isMarketDataDelayed': marketNodesList[k].isMarketDataDelayed,
                                                'inplay': marketNodesList[k].state.inplay,
                                                'state': marketNodesList[k].state,
                                                'runners': marketNodesList[k].runners
                                            }
                                        }
                                    })
                            }
                            // else{
                            //     let checkScoreTime = await db.collection('events').find({ "eventId": eventNodesList[j].eventId }).toArray()
                            //     let time = 1
                            //     let time1 = 1
                            //     let Oddtime = 0
                            //     let Oddtime1 = 0
                            //     if(checkScoreTime.length > 0){
                            //         if(checkScoreTime[0].scores.length > 0){
                            //             time =  checkScoreTime[0].scores[checkScoreTime[0].scores.length - 1].elapsedRegularTime
                            //             time1 =  checkScoreTime[0].scores[checkScoreTime[0].scores.length - 1].timeElapsed
                            //         }
                            //     }
                            //     let checkOddTime = await db.collection('markets').find({ "marketId": marketNodesList[k].marketId }).toArray()
                            //     if(checkOddTime.length > 0){
                            //         if(checkOddTime[0].Odds.length > 0){
                            //             Oddtime = checkOddTime[0].Odds[checkOddTime[0].Odds.length -  1].elapsedRegularTime
                            //             Oddtime1 = checkOddTime[0].Odds[checkOddTime[0].Odds.length -  1].timeElapsed
                            //         }
                            //     }
                            //     if(time > Oddtime || time1 > Oddtime1){
                            //         await db.collection('markets').updateMany(
                            //             { "marketId": marketNodesList[k].marketId },
                            //             {
                            //                 $push: {
                            //                     Odds: {
                            //                         $each: [{'runners': marketNodesList[k].runners, 'state': marketNodesList[k].state, 'elapsedRegularTime': time, 'timeElapsed': time1}],
                            //                         $slice: -180
                            //                     }
                            //                 }
                            //             }
                            //         )
                            //     }
                            // }
                        }
                    }
                }
        }catch (err) {
            return
        }

    }

    //todo api part
    app.post('/from_betsrc',async (req,res)=>{
        let start_date = new Date();
        let next_date = start_date.setDate(start_date.getDate() + 0);
        let end_date = start_date.setDate(start_date.getDate() + 1);
        next_date = new Date(next_date).toISOString()
        end_date = new Date(end_date).toISOString()
        next_date = next_date.substring(0,11)+'00:00:00'+ next_date.substring(19,24)
        end_date = end_date.substring(0,11)+'04:00:00'+ end_date.substring(19,24)
        if(req.body[0].src == 'betfair.com'){
            let eventResult = await db.collection('events').aggregate([
                { $match: {"status": {$ne : "COMPLETE"}, "openDate": {'$gte': next_date, "$lt": end_date} } },
                { $lookup: { from: "markets", localField: "eventId", foreignField: "eventId", as: "markets" } }
            ]).sort({"openDate": 1}).toArray();

            if(eventResult.length > 80){
                console.log('-------->')
                eventResult = await db.collection('events').aggregate([
                    { $match: {"status": {$ne : "COMPLETE"}, "openDate": {'$gte': next_date, "$lt": end_date} } },
                    { $lookup: { from: "markets", localField: "eventId", foreignField: "eventId", as: "markets" } }
                ]).sort({"openDate": 1}).limit(80).toArray();
            }

            let teamNameList = await db.collection('teamNameLists').find().toArray()
            let competitions = await db.collection('events').aggregate([
                { $match: {"status": {$ne : "COMPLETE"}, "openDate": {'$gte': next_date, "$lt": end_date} } },
                { $lookup: { from: "competitions", localField: "upperLevelEventId", foreignField: "eventId", as: "competitions" } }
            ]).sort({"openDate": 1}).toArray();

            let teamGroup = await db.collection('teamlist').find().toArray()
            let adminTable = await db.collection('adminTable').find().toArray()

            if (!eventResult) {
                res.status(200).send({
                    data: 'error', message: 'failed!' })
            } else {
                res.status(200).send({
                    data:[eventResult, teamNameList, teamGroup, competitions, adminTable], message: 'success' })
            }
        }
        else if(req.body[0].src == 'betfair.it'){
            let eventResult = await db1.collection('events').aggregate([
                { $match: {"status": {$ne : "COMPLETE"}, "openDate": {'$gte': next_date, "$lt": end_date} } },
                { $lookup: { from: "markets", localField: "eventId", foreignField: "eventId", as: "markets" } }
            ]).sort({"openDate": 1}).toArray();

            let teamNameList = await db.collection('teamNameLists').find().toArray()
            let teamGroup = await db.collection('teamlist').find().toArray()
            if (!eventResult) {
                res.status(200).send({
                    data: 'error',
                    message: 'failed!'
                })
            } else {
                res.status(200).send({
                    data:[eventResult, teamNameList, teamGroup],
                    message: 'success'
                })
            }
        }
    })

    app.post('/save_table',async (req,res)=>{
        await db.collection('adminTable').deleteMany({'facile.GN': {$ne: "-1"}})
        db.collection('adminTable').insertOne(req.body[0])
        console.log('adminTable inserted')

        res.status(200).send({
            data: '',
            message: 'success'
        })
    })

    app.post('/getTable',async (req,res)=>{
        let adminTable = await db.collection('adminTable').find().toArray()
        res.status(200).send({
            data: adminTable[0],
            message: 'success'
        })
    })

    app.post('/getStats',async (req,res)=>{
        let start_date = new Date();
        let next_date = start_date.setDate(start_date.getDate() - 1);
        let end_date = start_date.setDate(start_date.getDate() + 2);
        next_date = new Date(next_date).toISOString()
        end_date = new Date(end_date).toISOString()
        next_date = next_date.substring(0,11)+'00:00:00'+ next_date.substring(19,24)
        end_date = end_date.substring(0,11)+'04:00:00'+ end_date.substring(19,24)

        let eventResult = await db.collection('eventsTotal').aggregate([
            { $match: {"openDate": {'$gte': next_date, "$lt": end_date} } },
            { $lookup: { from: "competitionsTotal", localField: "topLevelEventId", foreignField: "eventId", as: "competitions" } }
        ]).sort({"openDate": 1}).toArray();

        let historicData = await db.collection('historicData').find().toArray()

        for(i = 0 ; i < historicData.length ; i++){
            let check = 0
            let country = historicData[i].leagueName.split(">>")[0].trim()
            let leagueName = historicData[i].leagueName.split(">>")[1].trim()
            for(j = 0 ; j < eventResult.length ; j++){
                let league = eventResult[j].competitions[0].name.trim()
                let countryCode = eventResult[j].countryCode
                let countryName = countryFilter(countryCode)
                if(countryName == country && league == leagueName){
                    check = 1
                }
            }

            if(check == 0){
                let index = historicData.indexOf(historicData[i]);
                if (index > -1) {
                    i = i - 1
                    historicData.splice(index, 1);
                }
            }
        }
        let coldMap = await db.collection('coldMap').find().toArray()

        res.status(200).send({
            data: [eventResult, historicData, coldMap],
            message: 'success'
        })
    })

    app.post('/getStatsNew',async (req,res)=>{
        let start_date = new Date();
        let next_date = start_date.setDate(start_date.getDate() + 0);

        next_date = new Date(next_date).toISOString()
        next_date = next_date.substring(0,10)

        let standings = await db.collection('seasonStandings').find().toArray()

        let eventResult = await db.collection('DailyApiEvents').aggregate([
            { $match: {"time.starting_at.date": next_date}},
            { $lookup: { from: "competitionsTotal", localField: "competitionId", foreignField: "eventId", as: "competitions" }},
            { $lookup: { from: "seasonRoundIds", localField: "season_id", foreignField: "season_id", as: "events" }},
        ]).toArray();

        res.status(200).send({
            data: [eventResult, standings],
            message: 'success'
        })
    })

    app.post('/teamAnalysis',async (req,res)=>{
        let start_date = new Date();
        let next_date = start_date.setDate(start_date.getDate() + 0);

        next_date = new Date(next_date).toISOString()
        next_date = next_date.substring(0,10)
        // next_date = "2020-09-25"
        let standings = await db.collection('seasonStandings').find().toArray()

        let eventResult = await db.collection('DailyApiEvents').aggregate([
            { $match: {"time.starting_at.date": next_date,"lineup.data": {$ne : []} }},
            { $lookup: { from: "competitionsTotal", localField: "competitionId", foreignField: "eventId", as: "competitions" }},
            { $lookup: { from: "Team_T_A_map", localField: "localTeamId", foreignField: "team_id", as: "local_players" }},
            { $lookup: { from: "Team_T_A_map", localField: "visitorTeamId", foreignField: "team_id", as: "visitor_players" }},
        ]).toArray();

        res.status(200).send({
            data: [eventResult, standings],
            message: 'success'
        })
    })

    app.post('/getLiveStats',async (req,res)=>{
        try {
            let start_date2 = new Date();
            let next_date2 = start_date2.setDate(start_date2.getDate() + 0);
            let end_date2 = start_date2.setDate(start_date2.getDate() - 1);
            next_date2 = new Date(next_date2).toISOString()
            end_date2 = new Date(end_date2).toISOString()
            next_date2 = next_date2.substring(0,10)
            end_date2 = end_date2.substring(0,10)

            let eventResult = await db.collection('liveStats').aggregate([
                { $match: {"time.starting_at.date": {$gte: end_date2}, "time.status": {$ne: "FT"}}},
                { $lookup: { from: "competitionsTotal", localField: "competitionId", foreignField: "eventId", as: "competitions" }},
                { $lookup: { from: "seasonRoundIds", localField: "season_id", foreignField: "season_id", as: "season_stats" }},
            ]).sort({"openDate": 1}).toArray();
            // console.log('livestatusLength==>', end_date2, next_date2)
            // let eventResult1 = await db.collection('liveStatsTotal').aggregate([
            //     { $match: {"time.starting_at.date": {$gte: next_date2}, "time.status": "NS"}},
            //     { $lookup: { from: "competitionsTotal", localField: "competitionId", foreignField: "eventId", as: "competitions" } }
            // ]).limit(100).sort({"openDate": -1}).toArray();

            let eventResult2 = await db.collection('DailyApiEvents').aggregate([
                { $match: {"time.starting_at.date": {$gte: next_date2}, "time.status": "FT", "time.status": "NS" }},
                { $lookup: { from: "competitionsTotal", localField: "competitionId", foreignField: "eventId", as: "competitions" } }
            ]).sort({"openDate": 1}).toArray();
            res.status(200).send({
                data: [eventResult, [], eventResult2],
                message: 'success'
            })
        }catch (e) {

        }

    })

    app.post('/getPredictions',async (req,res)=>{
        // let predictions = await db.collection('predictionTable').find({'marketType': req.body[0], 'scores': {$ne: []}}).sort({"openDate": 1}).toArray()
        // let predictions = await db.collection('predictionTable').find({'marketType': req.body[0]}).sort({"openDate": 1}).toArray()

        let dateArray = [
            "2020-01-01", "2020-01-15", "2020-02-01", "2020-02-15", "2020-03-01", "2020-03-15", "2020-04-01", "2020-04-15", "2020-05-01",
            "2020-05-15", "2020-06-01", "2020-06-15", "2020-07-01", "2020-07-15", "2020-08-01", "2020-08-15", "2020-09-01", "2020-09-15",
            "2020-10-01", "2020-10-15", "2020-11-01", "2020-11-15", "2020-12-01", "2020-12-15"
        ]
        let predictions = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[0], $lt: dateArray[1]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions1 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[1], $lt: dateArray[2]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions2 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[2], $lt: dateArray[3]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions3 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[3], $lt: dateArray[4]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions4 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[4], $lt: dateArray[5]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions5 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[5], $lt: dateArray[6]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions6 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[6], $lt: dateArray[7]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions7 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[7], $lt: dateArray[8]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions8 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[8], $lt: dateArray[9]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions9 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[9], $lt: dateArray[10]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions10 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[10], $lt: dateArray[11]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions11 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[11], $lt: dateArray[12]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions12 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[12], $lt: dateArray[13]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions13 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[13], $lt: dateArray[14]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions14 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[14], $lt: dateArray[15]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions15 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[15], $lt: dateArray[16]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions16 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[16], $lt: dateArray[17]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions17 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[17], $lt: dateArray[18]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions18 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[18], $lt: dateArray[19]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions19 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[19], $lt: dateArray[20]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions20 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[20], $lt: dateArray[21]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions21 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[21], $lt: dateArray[22]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions22 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[22], $lt: dateArray[23]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictions23 = await db.collection('predictionTable').aggregate([{ $match: {'marketType': req.body[0], 'date': {$gte: dateArray[23], $lt: dateArray[24]}}},
            { $lookup: { from: "liveStatsTotal", localField: "fixtureId", foreignField: "_id", as: "liveStats" } }
        ]).sort({"date": 1}).toArray();

        let predictionArray = []
        for(let i = 0 ; i < predictions.length ; i++){ predictionArray.push(predictions[i])}
        for(let i = 0 ; i < predictions1.length ; i++){ predictionArray.push(predictions1[i])}
        for(let i = 0 ; i < predictions2.length ; i++){ predictionArray.push(predictions2[i])}
        for(let i = 0 ; i < predictions3.length ; i++){ predictionArray.push(predictions3[i])}
        for(let i = 0 ; i < predictions4.length ; i++){ predictionArray.push(predictions4[i])}
        for(let i = 0 ; i < predictions5.length ; i++){ predictionArray.push(predictions5[i])}
        for(let i = 0 ; i < predictions6.length ; i++){ predictionArray.push(predictions6[i])}
        for(let i = 0 ; i < predictions7.length ; i++){ predictionArray.push(predictions7[i])}
        for(let i = 0 ; i < predictions8.length ; i++){ predictionArray.push(predictions8[i])}
        for(let i = 0 ; i < predictions9.length ; i++){ predictionArray.push(predictions9[i])}
        for(let i = 0 ; i < predictions10.length ; i++){ predictionArray.push(predictions10[i])}
        for(let i = 0 ; i < predictions11.length ; i++){ predictionArray.push(predictions11[i])}
        for(let i = 0 ; i < predictions12.length ; i++){ predictionArray.push(predictions12[i])}
        for(let i = 0 ; i < predictions13.length ; i++){ predictionArray.push(predictions13[i])}
        for(let i = 0 ; i < predictions14.length ; i++){ predictionArray.push(predictions14[i])}
        for(let i = 0 ; i < predictions15.length ; i++){ predictionArray.push(predictions15[i])}
        for(let i = 0 ; i < predictions16.length ; i++){ predictionArray.push(predictions16[i])}
        for(let i = 0 ; i < predictions17.length ; i++){ predictionArray.push(predictions17[i])}
        for(let i = 0 ; i < predictions18.length ; i++){ predictionArray.push(predictions18[i])}
        for(let i = 0 ; i < predictions19.length ; i++){ predictionArray.push(predictions19[i])}
        for(let i = 0 ; i < predictions20.length ; i++){ predictionArray.push(predictions20[i])}
        for(let i = 0 ; i < predictions21.length ; i++){ predictionArray.push(predictions21[i])}
        for(let i = 0 ; i < predictions22.length ; i++){ predictionArray.push(predictions22[i])}
        for(let i = 0 ; i < predictions23.length ; i++){ predictionArray.push(predictions23[i])}
        predictions = predictionArray
        console.log('predictions_length',predictions.length)
        res.status(200).send({
            data: [predictions],
            message: 'success'
        })
    })

    app.post('/getLeague',async (req,res)=>{
        console.log('eventId==>',req.body[0])
        let eventResult = await db.collection('eventsTotal').aggregate([
            { $match: {"eventId": req.body[0]}},
            { $lookup: { from: "competitionsTotal", localField: "topLevelEventId", foreignField: "eventId", as: "competitions" } }
        ]).sort({"openDate": 1}).toArray();

        if(eventResult.length > 0){
            res.status(200).send({
                data: [eventResult[0].competitions[0].name, eventResult[0].openDate.substring(0, 10)],
                message: 'success'
            })
        }
        else{
            res.status(200).send({
                data: '',
                message: 'error'
            })
        }
    })

    app.post('/saveHistoricalData',async (req,res)=>{
        let predictions = await db.collection('predictionTable').find().toArray()
        console.log('predictionsLength=>', predictions.length)
        let check = 0
        for(i = 0 ; i < predictions.length; i++){
            let id = predictions[i]._id
            let eventId = parseInt(predictions[i].value.split(",")[2])
            let marketId = predictions[i].value.split(",")[0]
            let selectionId = parseInt(predictions[i].value.split(",")[1])
            let predictionType = predictions[i].marketType
            let bl = 0
            if(predictionType.includes('Back') === true){
                bl = 1
            }
            if(eventId == req.body[0].eventId && marketId == req.body[0].marketId){
                console.log('datas=>',eventId, ', ', marketId, ', ', selectionId)
                check = 1
                let prematchOdd_value = ""
                let runners = req.body[0].finalData[0].runners.filter(function(item) {
                    return item.selectionId === selectionId;
                });
                if(runners.length > 0){
                    if(bl === 1){
                        prematchOdd_value = runners[0].exchange.availableToBack[0].price
                    }
                    else{
                        prematchOdd_value = runners[0].exchange.availableToLay[0].price
                    }
                }

                let query = {"_id": id}
                console.log(req.body[0].finalData)
                db.collection('predictionTable').updateOne(query,
                    {$set: {
                            'Odds': req.body[0].finalData,
                            'pre_MatchOdd':req.body[0].finalData[0].runners,
                            'prematch_Odd':prematchOdd_value
                        }},
                    function (err, item) {
                        if (err) { return }
                    })
                // console.log('final data=>', req.body[0].finalData)
            }
        }

    if(check === 1){
        res.status(200).send({
            data: 'success',
            message: 'success'
        })
    }
    else{
        console.log('check value===>', check)
        res.status(200).send({
            data: 'error',
            message: 'error'
        })
    }

    })

    app.post('/savePredictionData',async (req,res)=>{
        console.log('received Data=>', req.body[0])
        let date = req.body[0].date
        let eventId = req.body[0].eventId
        let marketId = req.body[0].marketId
        let runnerId = req.body[0].runnerId
        let total_matched =  req.body[0].total_matched
        let game = req.body[0].game
        let marketType = req.body[0].marketType
        let predictionType = req.body[0].predictionType
        let league = req.body[0].league
        let week = req.body[0].week
        let status = req.body[0].status
        let eventName = req.body[0].eventName
        let openDate = ""
        let label = ""
        let value = marketId + ',' + runnerId + ',' + eventId
        let scores = []
        let check = 0

        let event = await db.collection('eventsTotal').find({"eventId": eventId}).toArray()
        if(event.length > 0){
            eventName =  event[0].name
            openDate = event[0].openDate
            label = date + ", " + openDate.substring(11, 16) + " >> " + eventName + " " + marketType
            //----------------------scores adding part -----------------------------
            let indexpage2 = 0
            let map = await db.collection('api_map').find().toArray()
            let predictions = event
            let pages = await db.collection('DateFixtures').findOne({"_id": date})
            console.log('pages.pages=>', pages.pages)
            if(pages){
                for(l = 1 ; l < pages.pages + 1 ; l++){
                    indexpage2++
                    if(indexpage2 >= pages.pages + 1){
                        break
                    }
                    console.log('indexpage2=>', indexpage2)
                    if(indexpage2 == l){
                        let service = new betfair();
                        let data = await service.getWholeTeamsbyDay(date,l)
                        let c = 0
                        for(p = 0 ; p < data.length ; p++){
                            if(data[p].time.status != 'POSTP' && data[p].time.status != 'Cancelled' && data[p].time.status != 'Deleted' && data[p].time.status != 'Delayed'){
                                c++
                                for(i = 0 ; i < predictions.length ; i++){
                                    let eventName1 = eventName
                                    let homeName = eventName1.split(' v ')[0].trim()
                                    let awayName = eventName1.split(' v ')[1].trim()

                                    let home_tran = map.filter(function(item) {
                                        return item.betfair == homeName
                                    });
                                    if(home_tran.length > 0){
                                        homeName = home_tran[0].apiData
                                    }
                                    let away_tran = map.filter(function(item) {
                                        return item.betfair == awayName
                                    });
                                    if(away_tran.length > 0){
                                        awayName = away_tran[0].apiData
                                    }
                                    if(homeName == data[p].localTeam.data.name && awayName == data[p].visitorTeam.data.name){
                                        if(data[p].time.status === 'FT'){
                                            check =  1
                                            console.log('************************************************************')
                                            let eventsData = data[p].events.data
                                            let eventsArray = []
                                            let localteamId = data[p].localteam_id
                                            let visitorteamId = data[p].visitorteam_id
                                            let fixtureId = data[p].id
                                            let ht_score = data[p].scores.ht_score
                                            let ft_score = data[p].scores.ft_score
                                            for(k = 0 ; k < eventsData.length ; k++){
                                                if(eventsData[k].type == 'penalty' || eventsData[k].type == 'goal' || eventsData[k].type == 'own-goal'){
                                                    let extra_minute = 0
                                                    if(eventsData[k].extra_minute){
                                                        extra_minute = eventsData[k].extra_minute
                                                    }
                                                    eventsArray.push({"teamId": eventsData[k].team_id, "minute":eventsData[k].minute + extra_minute, "result":eventsData[k].result})
                                                }
                                            }

                                            let score_array = []
                                            let p_time = 100
                                            if(eventsArray.length === 0){
                                                for(k = 0 ; k < p_time ; k++){
                                                    score_array.push({"score": {"home": 0, "away": 0}, "timeElapsed": k + 1, "elapsedRegularTime": k + 1})
                                                }
                                            }
                                            else if(eventsArray.length > 1){
                                                for(k = 0 ; k < eventsArray.length - 1; k++){
                                                    let minute1 = eventsArray[k].minute
                                                    let minute2 = eventsArray[k + 1].minute
                                                    let home_goal1 = eventsArray[k].result.split("-")[0].trim()
                                                    let away_goal1 = eventsArray[k].result.split("-")[1].trim()
                                                    let home_goal2 = eventsArray[k + 1].result.split("-")[0].trim()
                                                    let away_goal2 = eventsArray[k + 1].result.split("-")[1].trim()

                                                    if(k === 0){
                                                        for(kk = 0 ; kk < minute1 - 1 ; kk++){
                                                            score_array.push({"score": {"home": 0, "away": 0}, "timeElapsed": kk + 1, "elapsedRegularTime": kk + 1})
                                                        }
                                                        score_array.push({"score": {"home": home_goal1, "away": away_goal1}, "timeElapsed": minute1, "elapsedRegularTime": minute1})
                                                    }
                                                    for(kk = minute1 ; kk < minute2 - 1 ; kk++){
                                                        score_array.push({"score": {"home": home_goal1, "away": away_goal1}, "timeElapsed": kk + 1, "elapsedRegularTime": kk + 1})
                                                    }
                                                    score_array.push({"score": {"home": home_goal2, "away": away_goal2}, "timeElapsed": minute2, "elapsedRegularTime": minute2})
                                                }
                                                for(k = eventsArray[eventsArray.length - 1].minute ; k < p_time ; k++){
                                                    let last_home_goal = eventsArray[eventsArray.length - 1].result.split("-")[0].trim()
                                                    let last_away_goal = eventsArray[eventsArray.length - 1].result.split("-")[1].trim()
                                                    score_array.push({"score": {"home": last_home_goal, "away": last_away_goal}, "timeElapsed": k + 1, "elapsedRegularTime": k + 1})
                                                }

                                            }
                                            else if(eventsArray.length === 1){
                                                let minute1 = eventsArray[0].minute
                                                let home_goal1 = eventsArray[0].result.split("-")[0].trim()
                                                let away_goal1 = eventsArray[0].result.split("-")[1].trim()

                                                for(kk = 0 ; kk < minute1 - 1 ; kk++){
                                                    score_array.push({"score": {"home": 0, "away": 0}, "timeElapsed": kk + 1, "elapsedRegularTime": kk + 1})
                                                }
                                                score_array.push({"score": {"home": home_goal1, "away": away_goal1}, "timeElapsed": minute1, "elapsedRegularTime": minute1})

                                                for(k = minute1 ; k < p_time ; k++){
                                                    let last_home_goal = eventsArray[eventsArray.length - 1].result.split("-")[0].trim()
                                                    let last_away_goal = eventsArray[eventsArray.length - 1].result.split("-")[1].trim()
                                                    score_array.push({"score": {"home": last_home_goal, "away": last_away_goal}, "timeElapsed": k + 1, "elapsedRegularTime": k + 1})
                                                }
                                            }
                                            // console.log("scorearraytesting===>", score_array)
                                            scores = score_array
                                            // scores = []
                                            // let query = {"_id": 'testingapi1'}
                                            let query = {"_id": eventId + ' ' + eventName1 + ' ' + marketType}
                                            await db.collection('predictionTable').updateOne(
                                                query,
                                                {$set: {
                                                        "_id": eventId + ' ' + eventName1 + ' ' + marketType,
                                                        'openDate': openDate,
                                                        'pre_MatchOdd': [],
                                                        'predictionType': predictionType,
                                                        'value': value,
                                                        'week': week,
                                                        'label': label,
                                                        'league': league,
                                                        'fixtureId': fixtureId,
                                                        'marketType': marketType,
                                                        'Odds': [],
                                                        'scores': scores,
                                                        'game': game,
                                                        'prematch_Odd': "",
                                                        'totalMatched': total_matched,
                                                        'date': date,
                                                        'status': status,
                                                        'eventId': eventId,
                                                        'half_extra': 1,
                                                        'break_time': 15,
                                                        'ht_score': ht_score,
                                                        'ft_score': ft_score,
                                                    }},
                                                {upsert: true},
                                                function (err, item) {
                                                    if (err) { return }
                                                })
                                            break
                                        }
                                    }
                                }
                            }
                        }
                        console.log(c)
                    }
                }
            }
            //--------------------------------------------------------------
            if(check === 1){
                res.status(200).send({
                    data: 'success',
                    message: 'success'
                })
            }
            else{
                res.status(200).send({
                    data: 'error',
                    message: 'error'
                })
            }
        }
        else{
            //--------------
            label = date + ", " + " >> " + eventName + " " + marketType
            //----------------------scores adding part -----------------------------
            let indexpage2 = 0
            let map = await db.collection('api_map').find().toArray()
            let pages = await db.collection('DateFixtures').findOne({"_id": date})
            console.log('pages.pages=>', pages.pages)
            if(pages){
                for(l = 1 ; l < pages.pages + 1 ; l++){
                    indexpage2++
                    if(indexpage2 >= pages.pages + 1){
                        break
                    }
                    console.log('indexpage2=>', indexpage2)
                    if(indexpage2 == l){
                        let service = new betfair();
                        let data = await service.getWholeTeamsbyDay(date,l)
                        let c = 0
                        for(p = 0 ; p < data.length ; p++){
                            if(data[p].time.status != 'POSTP' && data[p].time.status != 'Cancelled' && data[p].time.status != 'Deleted' && data[p].time.status != 'Delayed'){
                                c++
                                for(i = 0 ; i < 1 ; i++){
                                    let eventName1 = eventName
                                    let homeName = eventName1.split(' v ')[0].trim()
                                    let awayName = eventName1.split(' v ')[1].trim()

                                    let home_tran = map.filter(function(item) {
                                        return item.betfair == homeName
                                    });
                                    if(home_tran.length > 0){
                                        homeName = home_tran[0].apiData
                                    }
                                    let away_tran = map.filter(function(item) {
                                        return item.betfair == awayName
                                    });
                                    if(away_tran.length > 0){
                                        awayName = away_tran[0].apiData
                                    }
                                    if(homeName == data[p].localTeam.data.name && awayName == data[p].visitorTeam.data.name){
                                        if(data[p].time.status === 'FT'){
                                            check =  1
                                            console.log('************************************************************')
                                            let eventsData = data[p].events.data
                                            let eventsArray = []
                                            let localteamId = data[p].localteam_id
                                            let visitorteamId = data[p].visitorteam_id
                                            let fixtureId = data[p].id
                                            let leagueId = data[p].league_id
                                            console.log('+++++++++++++++++++++++++++++++++++++++++++++++leagueId=>', leagueId)
                                            let leagues = await db.collection('LeagueMap').find({"id": leagueId.toString()}).toArray()
                                            if(leagues.length > 0){
                                                league = leagues[0].betfair_league
                                            }
                                            let ht_score = data[p].scores.ht_score
                                            let ft_score = data[p].scores.ft_score
                                            for(k = 0 ; k < eventsData.length ; k++){
                                                if(eventsData[k].type == 'penalty' || eventsData[k].type == 'goal' || eventsData[k].type == 'own-goal'){
                                                    let extra_minute = 0
                                                    if(eventsData[k].extra_minute){
                                                        extra_minute = eventsData[k].extra_minute
                                                    }
                                                    eventsArray.push({"teamId": eventsData[k].team_id, "minute":eventsData[k].minute + extra_minute, "result":eventsData[k].result})
                                                }
                                            }

                                            let score_array = []
                                            let p_time = 100
                                            if(eventsArray.length === 0){
                                                for(k = 0 ; k < p_time ; k++){
                                                    score_array.push({"score": {"home": 0, "away": 0}, "timeElapsed": k + 1, "elapsedRegularTime": k + 1})
                                                }
                                            }
                                            else if(eventsArray.length > 1){
                                                for(k = 0 ; k < eventsArray.length - 1; k++){
                                                    let minute1 = eventsArray[k].minute
                                                    let minute2 = eventsArray[k + 1].minute
                                                    let home_goal1 = eventsArray[k].result.split("-")[0].trim()
                                                    let away_goal1 = eventsArray[k].result.split("-")[1].trim()
                                                    let home_goal2 = eventsArray[k + 1].result.split("-")[0].trim()
                                                    let away_goal2 = eventsArray[k + 1].result.split("-")[1].trim()

                                                    if(k === 0){
                                                        for(kk = 0 ; kk < minute1 - 1 ; kk++){
                                                            score_array.push({"score": {"home": 0, "away": 0}, "timeElapsed": kk + 1, "elapsedRegularTime": kk + 1})
                                                        }
                                                        score_array.push({"score": {"home": home_goal1, "away": away_goal1}, "timeElapsed": minute1, "elapsedRegularTime": minute1})
                                                    }
                                                    for(kk = minute1 ; kk < minute2 - 1 ; kk++){
                                                        score_array.push({"score": {"home": home_goal1, "away": away_goal1}, "timeElapsed": kk + 1, "elapsedRegularTime": kk + 1})
                                                    }
                                                    score_array.push({"score": {"home": home_goal2, "away": away_goal2}, "timeElapsed": minute2, "elapsedRegularTime": minute2})
                                                }
                                                for(k = eventsArray[eventsArray.length - 1].minute ; k < p_time ; k++){
                                                    let last_home_goal = eventsArray[eventsArray.length - 1].result.split("-")[0].trim()
                                                    let last_away_goal = eventsArray[eventsArray.length - 1].result.split("-")[1].trim()
                                                    score_array.push({"score": {"home": last_home_goal, "away": last_away_goal}, "timeElapsed": k + 1, "elapsedRegularTime": k + 1})
                                                }

                                            }
                                            else if(eventsArray.length === 1){
                                                let minute1 = eventsArray[0].minute
                                                let home_goal1 = eventsArray[0].result.split("-")[0].trim()
                                                let away_goal1 = eventsArray[0].result.split("-")[1].trim()

                                                for(kk = 0 ; kk < minute1 - 1 ; kk++){
                                                    score_array.push({"score": {"home": 0, "away": 0}, "timeElapsed": kk + 1, "elapsedRegularTime": kk + 1})
                                                }
                                                score_array.push({"score": {"home": home_goal1, "away": away_goal1}, "timeElapsed": minute1, "elapsedRegularTime": minute1})

                                                for(k = minute1 ; k < p_time ; k++){
                                                    let last_home_goal = eventsArray[eventsArray.length - 1].result.split("-")[0].trim()
                                                    let last_away_goal = eventsArray[eventsArray.length - 1].result.split("-")[1].trim()
                                                    score_array.push({"score": {"home": last_home_goal, "away": last_away_goal}, "timeElapsed": k + 1, "elapsedRegularTime": k + 1})
                                                }
                                            }
                                            scores = score_array
                                            let query = {"_id": eventId + ' ' + eventName1 + ' ' + marketType}
                                            await db.collection('predictionTable').updateOne(
                                                query,
                                                {$set: {
                                                        "_id": eventId + ' ' + eventName1 + ' ' + marketType,
                                                        'openDate': openDate,
                                                        'pre_MatchOdd': [],
                                                        'predictionType': predictionType,
                                                        'value': value,
                                                        'week': week,
                                                        'label': label,
                                                        'league': league,
                                                        'fixtureId': fixtureId,
                                                        'marketType': marketType,
                                                        'Odds': [],
                                                        'scores': scores,
                                                        'game': game,
                                                        'prematch_Odd': "",
                                                        'totalMatched': total_matched,
                                                        'date': date,
                                                        'status': status,
                                                        'eventId': eventId,
                                                        'half_extra': 1,
                                                        'break_time': 15,
                                                        'ht_score': ht_score,
                                                        'ft_score': ft_score,
                                                    }},
                                                {upsert: true},
                                                function (err, item) {
                                                    if (err) { return }
                                                })
                                            break
                                        }
                                    }
                                }
                            }
                        }
                        console.log(c)
                    }
                }
            }
            //--------------------------------------------------------------
            if(check === 1){
                res.status(200).send({
                    data: 'success',
                    message: 'success'
                })
            }
            else{
                res.status(200).send({
                    data: 'error',
                    message: 'error'
                })
            }
        }
    })

    app.post('/getPredictionsResult',async (req,res)=>{
        let eventResult = await db.collection('predictions').aggregate([
            { $match: {"scores": {$ne : []},"date": {'$gte': req.body.from_date, "$lte": req.body.to_date}}},
            { $lookup: { from: "competitionsTotal", localField: "competitionId", foreignField: "eventId", as: "competitions" } },
            { $lookup: { from: "prematchOdds", localField: "marketId", foreignField: "marketId", as: "markets" } },
            { $lookup: { from: "predictionOdds", localField: "marketId", foreignField: "marketId", as: "pre_markets" } }
        ]).sort({"date": 1}).toArray();

        res.status(200).send({
            data: [eventResult],
            message: 'success'
        })
    })

    app.post('/removePrediction',async (req,res)=>{
        console.log('removeId',req.body[0])
        await db.collection('predictionTable').deleteOne({"_id": req.body[0]})
        res.status(200).send({
            data: 'success',
            message: 'success'
       })
    })
    app.post('/scoreGet_Prediction',async (req,res)=>{
        console.log('scoreGetPredictionId',req.body[0])
        let predictionId = req.body[0]
        let prediction = await db.collection('predictionTable').aggregate([
            { $match: {"_id": predictionId}},
            { $lookup: { from: "events", localField: "eventId", foreignField: "eventId", as: "events" }}
        ]).toArray();
        //-------------------------------------------------------------
        let date = prediction[0].date
        let eventId = prediction[0].eventId

        let scores = []
        let check = 0

        let event = await db.collection('eventsTotal').find({"eventId": eventId}).toArray()
        if(event.length > 0){
        let eventName =  event[0].name
            //----------------------scores adding part -----------------------------
            let indexpage2 = 0
            let map = await db.collection('api_map').find().toArray()
            let predictions = event
            let pages = await db.collection('DateFixtures').findOne({"_id": date})
            console.log('pages.pages=>', pages.pages)
            if(pages){
                for(l = 1 ; l < pages.pages + 1 ; l++){
                    indexpage2++
                    if(indexpage2 >= pages.pages + 1){
                        break
                    }
                    console.log('indexpage2=>', indexpage2)
                    if(indexpage2 == l){
                        let service = new betfair();
                        let data = await service.getWholeTeamsbyDay(date,l)
                        let c = 0
                        for(p = 0 ; p < data.length ; p++){
                            if(data[p].time.status != 'POSTP' && data[p].time.status != 'Cancelled' && data[p].time.status != 'Deleted' && data[p].time.status != 'Delayed'){
                                c++
                                for(i = 0 ; i < predictions.length ; i++){
                                    let eventName1 = eventName
                                    let homeName = eventName1.split(' v ')[0].trim()
                                    let awayName = eventName1.split(' v ')[1].trim()

                                    let home_tran = map.filter(function(item) {
                                        return item.betfair == homeName
                                    });
                                    if(home_tran.length > 0){
                                        homeName = home_tran[0].apiData
                                    }
                                    let away_tran = map.filter(function(item) {
                                        return item.betfair == awayName
                                    });
                                    if(away_tran.length > 0){
                                        awayName = away_tran[0].apiData
                                    }
                                    if(homeName == data[p].localTeam.data.name && awayName == data[p].visitorTeam.data.name){
                                        if(data[p].time.status === 'FT' || data[p].time.status === 'FT_PEN'){
                                            check =  1
                                            console.log('************************************************************')
                                            let eventsData = data[p].events.data
                                            let eventsArray = []
                                            let localteamId = data[p].localteam_id
                                            let visitorteamId = data[p].visitorteam_id
                                            let ht_score = data[p].scores.ht_score
                                            let ft_score = data[p].scores.ft_score
                                            for(k = 0 ; k < eventsData.length ; k++){
                                                if(eventsData[k].type == 'penalty' || eventsData[k].type == 'goal' || eventsData[k].type == 'own-goal'){
                                                    let extra_minute = 0
                                                    if(eventsData[k].extra_minute){
                                                        extra_minute = eventsData[k].extra_minute
                                                    }
                                                    eventsArray.push({"teamId": eventsData[k].team_id, "minute":eventsData[k].minute + extra_minute, "result":eventsData[k].result})
                                                }
                                            }

                                            let score_array = []
                                            let p_time = 100
                                            if(eventsArray.length === 0){
                                                for(k = 0 ; k < p_time ; k++){
                                                    score_array.push({"score": {"home": 0, "away": 0}, "timeElapsed": k + 1, "elapsedRegularTime": k + 1})
                                                }
                                            }
                                            else if(eventsArray.length > 1){
                                                for(k = 0 ; k < eventsArray.length - 1; k++){
                                                    let minute1 = eventsArray[k].minute
                                                    let minute2 = eventsArray[k + 1].minute
                                                    let home_goal1 = eventsArray[k].result.split("-")[0].trim()
                                                    let away_goal1 = eventsArray[k].result.split("-")[1].trim()
                                                    let home_goal2 = eventsArray[k + 1].result.split("-")[0].trim()
                                                    let away_goal2 = eventsArray[k + 1].result.split("-")[1].trim()

                                                    if(k === 0){
                                                        for(kk = 0 ; kk < minute1 - 1 ; kk++){
                                                            score_array.push({"score": {"home": 0, "away": 0}, "timeElapsed": kk + 1, "elapsedRegularTime": kk + 1})
                                                        }
                                                        score_array.push({"score": {"home": home_goal1, "away": away_goal1}, "timeElapsed": minute1, "elapsedRegularTime": minute1})
                                                    }
                                                    for(kk = minute1 ; kk < minute2 - 1 ; kk++){
                                                        score_array.push({"score": {"home": home_goal1, "away": away_goal1}, "timeElapsed": kk + 1, "elapsedRegularTime": kk + 1})
                                                    }
                                                    score_array.push({"score": {"home": home_goal2, "away": away_goal2}, "timeElapsed": minute2, "elapsedRegularTime": minute2})
                                                }
                                                for(k = eventsArray[eventsArray.length - 1].minute ; k < p_time ; k++){
                                                    let last_home_goal = eventsArray[eventsArray.length - 1].result.split("-")[0].trim()
                                                    let last_away_goal = eventsArray[eventsArray.length - 1].result.split("-")[1].trim()
                                                    score_array.push({"score": {"home": last_home_goal, "away": last_away_goal}, "timeElapsed": k + 1, "elapsedRegularTime": k + 1})
                                                }

                                            }
                                            else if(eventsArray.length === 1){
                                                let minute1 = eventsArray[0].minute
                                                let home_goal1 = eventsArray[0].result.split("-")[0].trim()
                                                let away_goal1 = eventsArray[0].result.split("-")[1].trim()

                                                for(kk = 0 ; kk < minute1 - 1 ; kk++){
                                                    score_array.push({"score": {"home": 0, "away": 0}, "timeElapsed": kk + 1, "elapsedRegularTime": kk + 1})
                                                }
                                                score_array.push({"score": {"home": home_goal1, "away": away_goal1}, "timeElapsed": minute1, "elapsedRegularTime": minute1})

                                                for(k = minute1 ; k < p_time ; k++){
                                                    let last_home_goal = eventsArray[eventsArray.length - 1].result.split("-")[0].trim()
                                                    let last_away_goal = eventsArray[eventsArray.length - 1].result.split("-")[1].trim()
                                                    score_array.push({"score": {"home": last_home_goal, "away": last_away_goal}, "timeElapsed": k + 1, "elapsedRegularTime": k + 1})
                                                }

                                            }

                                            scores = score_array
                                            let query = {"_id": predictionId}
                                            await db.collection('predictionTable').updateOne(
                                                query,
                                                {$set: {
                                                        'scores': scores,
                                                        'ht_score': ht_score,
                                                        'ft_score': ft_score,
                                                    }},
                                                {upsert: true},
                                                function (err, item) {
                                                    if (err) { return }
                                                })
                                            break
                                        }
                                    }
                                }
                            }
                        }
                        console.log(c)
                    }
                }
            }
            //--------------------------------------------------------------
            if(check === 1){
                res.status(200).send({
                    data: 'success',
                    message: 'success'
                })
            }
            else{
                res.status(200).send({
                    data: 'error',
                    message: 'error'
                })
            }

        }
        else{
            res.status(200).send({
                data: 'error',
                message: 'error'
            })
        }
        //----------------------------------
    })
    app.post('/getlivestatsData',async (req,res)=>{
        console.log('get Live data parameters==>', req.body[0], req.body[1])
        // let liveData = await db.collection('liveStatsTotal').find({"time.starting_at.date": {$gte: req.body[0], $lte: req.body[1]}}).toArray()
        let s_month = parseInt(req.body[0].substring(5,7))
        let e_month = parseInt(req.body[1].substring(5,7))
        let start_date = req.body[0].substring(0,7)
        let end_date = req.body[1].substring(0,7)
        console.log('get Live data parameters==>', s_month, e_month)
        let liveEvents = []
        if(e_month === s_month){
            let liveData = await db.collection('liveStatsTotal').aggregate([
                { $match: {"time.starting_at.date": {$gte: req.body[0], $lte: req.body[1]}, "competitionId": req.body[2]}},
                { $lookup: { from: "competitionsTotal", localField: "competitionId", foreignField: "eventId", as: "competitions" } },
                { $lookup: { from: "seasonRoundIds", localField: "season_id", foreignField: "season_id", as: "season_stats" }},
            ]).sort({"date": 1}).toArray();
            liveEvents = liveEvents.concat(liveData)
        }
        else if(e_month > s_month){
            for(let d = s_month ; d < e_month + 1 ; d++ ){
                if(d == s_month){
                    let s_month_n = s_month + 1
                    if(s_month + 1 > 9){
                        s_month_n = (s_month + 1).toString()
                    }
                    else{
                        s_month_n = '0' + (s_month + 1).toString()
                    }

                    let liveData = await db.collection('liveStatsTotal').aggregate([
                        { $match: {"time.starting_at.date": {$gte: req.body[0], $lte: '2020-' + s_month_n + '-01'}, "competitionId": req.body[2]}},
                        { $lookup: { from: "competitionsTotal", localField: "competitionId", foreignField: "eventId", as: "competitions" } },
                        { $lookup: { from: "seasonRoundIds", localField: "season_id", foreignField: "season_id", as: "season_stats" }},
                    ]).sort({"date": 1}).toArray();
                    if(liveData.length > 0){
                        liveEvents = liveEvents.concat(liveData)
                    }
                }
                else if(d == e_month){
                    console.log("************", end_date + '-02')
                    let liveData = await db.collection('liveStatsTotal').aggregate([
                        { $match: {"time.starting_at.date": {$gte: end_date + '-02', $lte: req.body[1]}, "competitionId": req.body[2]}},
                        { $lookup: { from: "competitionsTotal", localField: "competitionId", foreignField: "eventId", as: "competitions" } },
                        { $lookup: { from: "seasonRoundIds", localField: "season_id", foreignField: "season_id", as: "season_stats" }},
                    ]).sort({"date": 1}).toArray();
                    if(liveData.length > 0){
                        liveEvents = liveEvents.concat(liveData)
                    }
                }
                else{
                    let s_month_n = d
                    if(d > 9){
                        s_month_n = (d).toString()
                    }
                    else{
                        s_month_n = '0' + (d).toString()
                    }
                    let s_month_n2 = d + 1
                    if(d + 1 > 9){
                        s_month_n2 = (d + 1).toString()
                    }
                    else{
                        s_month_n2 = '0' + (d + 1).toString()
                    }

                    let liveData = await db.collection('liveStatsTotal').aggregate([
                        { $match: {"time.starting_at.date": {$gte: '2020-' + s_month_n + '-02', $lte: '2020-' + s_month_n2 + '-01'}, "competitionId": req.body[2]}},
                        { $lookup: { from: "competitionsTotal", localField: "competitionId", foreignField: "eventId", as: "competitions" } },
                        { $lookup: { from: "seasonRoundIds", localField: "season_id", foreignField: "season_id", as: "season_stats" }},
                    ]).sort({"date": 1}).toArray();
                    if(liveData.length > 0){
                        liveEvents = liveEvents.concat(liveData)
                    }
                }
            }

        }

        res.status(200).send({
            data: [liveEvents],
            message: 'success'
        })
    })
    app.post('/getleaguelist',async (req,res)=>{
        let leagues = await db.collection('competitionsTotal').find().toArray()

        res.status(200).send({
            data: [leagues],
            message: 'success'
        })
    })
    function countryFilter(countryCode) {
        let countryCodeList = [
            {'ccode' : 'AF', 'cname' : 'Afghanistan'},
            {'ccode' : 'AX', 'cname' : 'Aland Islands'},
            {'ccode' : 'AL', 'cname' : 'Albania'},
            {'ccode' : 'DZ', 'cname' : 'Algeria'},
            {'ccode' : 'AS', 'cname' : 'American Samoa'},
            {'ccode' : 'AD', 'cname' : 'Andorra'},
            {'ccode' : 'AO', 'cname' : 'Angola'},
            {'ccode' : 'AI', 'cname' : 'Anguilla'},
            {'ccode' : 'AQ', 'cname' : 'Antarctica'},
            {'ccode' : 'AG', 'cname' : 'Antigua And Barbuda'},
            {'ccode' : 'AR', 'cname' : 'Argentina'},
            {'ccode' : 'AM', 'cname' : 'Armenia'},
            {'ccode' : 'AW', 'cname' : 'Aruba'},
            {'ccode' : 'AU', 'cname' : 'Australia'},
            {'ccode' : 'AT', 'cname' : 'Austria'},
            {'ccode' : 'AZ', 'cname' : 'Azerbaijan'},
            {'ccode' : 'BS', 'cname' : 'Bahamas'},
            {'ccode' : 'BH', 'cname' : 'Bahrain'},
            {'ccode' : 'BD', 'cname' : 'Bangladesh'},
            {'ccode' : 'BB', 'cname' : 'Barbados'},
            {'ccode' : 'BY', 'cname' : 'Belarus'},
            {'ccode' : 'BE', 'cname' : 'Belgium'},
            {'ccode' : 'BZ', 'cname' : 'Belize'},
            {'ccode' : 'BJ', 'cname' : 'Benin'},
            {'ccode' : 'BM', 'cname' : 'Bermuda'},
            {'ccode' : 'BT', 'cname' : 'Bhutan'},
            {'ccode' : 'BO', 'cname' : 'Bolivia'},
            {'ccode' : 'BA', 'cname' : 'Bosnia And Herzegovina'},
            {'ccode' : 'BW', 'cname' : 'Botswana'},
            {'ccode' : 'BV', 'cname' : 'Bouvet Island'},
            {'ccode' : 'BR', 'cname' : 'Brazil'},
            {'ccode' : 'IO', 'cname' : 'British Indian Ocean Territory'},
            {'ccode' : 'BN', 'cname' : 'Brunei Darussalam'},
            {'ccode' : 'BG', 'cname' : 'Bulgaria'},
            {'ccode' : 'BF', 'cname' : 'Burkina Faso'},
            {'ccode' : 'BI', 'cname' : 'Burundi'},
            {'ccode' : 'KH', 'cname' : 'Cambodia'},
            {'ccode' : 'CM', 'cname' : 'Cameroon'},
            {'ccode' : 'CA', 'cname' : 'Canada'},
            {'ccode' : 'CV', 'cname' : 'Cape Verde'},
            {'ccode' : 'KY', 'cname' : 'Cayman Islands'},
            {'ccode' : 'CF', 'cname' : 'Central African Republic'},
            {'ccode' : 'TD', 'cname' : 'Chad'},
            {'ccode' : 'CL', 'cname' : 'Chile'},
            {'ccode' : 'CN', 'cname' : 'China'},
            {'ccode' : 'CX', 'cname' : 'Christmas Island'},
            {'ccode' : 'CC', 'cname' : 'Cocos (Keeling) Islands'},
            {'ccode' : 'CO', 'cname' : 'Colombia'},
            {'ccode' : 'KM', 'cname' : 'Comoros'},
            {'ccode' : 'CG', 'cname' : 'Congo'},
            {'ccode' : 'CD', 'cname' : 'Congo, Democratic Republic'},
            {'ccode' : 'CK', 'cname' : 'Cook Islands'},
            {'ccode' : 'CR', 'cname' : 'Costa Rica'},
            {'ccode' : 'CI', 'cname' : 'Cote D\'Ivoire'},
            {'ccode' : 'HR', 'cname' : 'Croatia'},
            {'ccode' : 'CU', 'cname' : 'Cuba'},
            {'ccode' : 'CY', 'cname' : 'Cyprus'},
            {'ccode' : 'CZ', 'cname' : 'Czech Republic'},
            {'ccode' : 'DK', 'cname' : 'Denmark'},
            {'ccode' : 'DJ', 'cname' : 'Djibouti'},
            {'ccode' : 'DM', 'cname' : 'Dominica'},
            {'ccode' : 'DO', 'cname' : 'Dominican Republic'},
            {'ccode' : 'EC', 'cname' : 'Ecuador'},
            {'ccode' : 'EG', 'cname' : 'Egypt'},
            {'ccode' : 'SV', 'cname' : 'El Salvador'},
            {'ccode' : 'GQ', 'cname' : 'Equatorial Guinea'},
            {'ccode' : 'ER', 'cname' : 'Eritrea'},
            {'ccode' : 'EE', 'cname' : 'Estonia'},
            {'ccode' : 'ET', 'cname' : 'Ethiopia'},
            {'ccode' : 'FK', 'cname' : 'Falkland Islands (Malvinas)'},
            {'ccode' : 'FO', 'cname' : 'Faroe Islands'},
            {'ccode' : 'FJ', 'cname' : 'Fiji'},
            {'ccode' : 'FI', 'cname' : 'Finland'},
            {'ccode' : 'FR', 'cname' : 'France'},
            {'ccode' : 'GF', 'cname' : 'French Guiana'},
            {'ccode' : 'PF', 'cname' : 'French Polynesia'},
            {'ccode' : 'TF', 'cname' : 'French Southern Territories'},
            {'ccode' : 'GA', 'cname' : 'Gabon'},
            {'ccode' : 'GM', 'cname' : 'Gambia'},
            {'ccode' : 'GE', 'cname' : 'Georgia'},
            {'ccode' : 'DE', 'cname' : 'Germany'},
            {'ccode' : 'GH', 'cname' : 'Ghana'},
            {'ccode' : 'GI', 'cname' : 'Gibraltar'},
            {'ccode' : 'GR', 'cname' : 'Greece'},
            {'ccode' : 'GL', 'cname' : 'Greenland'},
            {'ccode' : 'GD', 'cname' : 'Grenada'},
            {'ccode' : 'GP', 'cname' : 'Guadeloupe'},
            {'ccode' : 'GU', 'cname' : 'Guam'},
            {'ccode' : 'GT', 'cname' : 'Guatemala'},
            {'ccode' : 'GG', 'cname' : 'Guernsey'},
            {'ccode' : 'GN', 'cname' : 'Guinea'},
            {'ccode' : 'GW', 'cname' : 'Guinea-Bissau'},
            {'ccode' : 'GY', 'cname' : 'Guyana'},
            {'ccode' : 'HT', 'cname' : 'Haiti'},
            {'ccode' : 'HM', 'cname' : 'Heard Island & Mcdonald Islands'},
            {'ccode' : 'VA', 'cname' : 'Holy See (Vatican City State)'},
            {'ccode' : 'HN', 'cname' : 'Honduras'},
            {'ccode' : 'HK', 'cname' : 'Hong Kong'},
            {'ccode' : 'HU', 'cname' : 'Hungary'},
            {'ccode' : 'IS', 'cname' : 'Iceland'},
            {'ccode' : 'IN', 'cname' : 'India'},
            {'ccode' : 'ID', 'cname' : 'Indonesia'},
            {'ccode' : 'IR', 'cname' : 'Iran, Islamic Republic Of'},
            {'ccode' : 'IQ', 'cname' : 'Iraq'},
            {'ccode' : 'IE', 'cname' : 'Ireland'},
            {'ccode' : 'IM', 'cname' : 'Isle Of Man'},
            {'ccode' : 'IL', 'cname' : 'Israel'},
            {'ccode' : 'IT', 'cname' : 'Italy'},
            {'ccode' : 'JM', 'cname' : 'Jamaica'},
            {'ccode' : 'JP', 'cname' : 'Japan'},
            {'ccode' : 'JE', 'cname' : 'Jersey'},
            {'ccode' : 'JO', 'cname' : 'Jordan'},
            {'ccode' : 'KZ', 'cname' : 'Kazakhstan'},
            {'ccode' : 'KE', 'cname' : 'Kenya'},
            {'ccode' : 'KI', 'cname' : 'Kiribati'},
            {'ccode' : 'KR', 'cname' : 'Korea'},
            {'ccode' : 'KW', 'cname' : 'Kuwait'},
            {'ccode' : 'KG', 'cname' : 'Kyrgyzstan'},
            {'ccode' : 'LA', 'cname' : 'Lao People\'s Democratic Republic'},
            {'ccode' : 'LV', 'cname' : 'Latvia'},
            {'ccode' : 'LB', 'cname' : 'Lebanon'},
            {'ccode' : 'LS', 'cname' : 'Lesotho'},
            {'ccode' : 'LR', 'cname' : 'Liberia'},
            {'ccode' : 'LY', 'cname' : 'Libyan Arab Jamahiriya'},
            {'ccode' : 'LI', 'cname' : 'Liechtenstein'},
            {'ccode' : 'LT', 'cname' : 'Lithuania'},
            {'ccode' : 'LU', 'cname' : 'Luxembourg'},
            {'ccode' : 'MO', 'cname' : 'Macao'},
            {'ccode' : 'MK', 'cname' : 'Macedonia'},
            {'ccode' : 'MG', 'cname' : 'Madagascar'},
            {'ccode' : 'MW', 'cname' : 'Malawi'},
            {'ccode' : 'MY', 'cname' : 'Malaysia'},
            {'ccode' : 'MV', 'cname' : 'Maldives'},
            {'ccode' : 'ML', 'cname' : 'Mali'},
            {'ccode' : 'MT', 'cname' : 'Malta'},
            {'ccode' : 'MH', 'cname' : 'Marshall Islands'},
            {'ccode' : 'MQ', 'cname' : 'Martinique'},
            {'ccode' : 'MR', 'cname' : 'Mauritania'},
            {'ccode' : 'MU', 'cname' : 'Mauritius'},
            {'ccode' : 'YT', 'cname' : 'Mayotte'},
            {'ccode' : 'MX', 'cname' : 'Mexico'},
            {'ccode' : 'FM', 'cname' : 'Micronesia, Federated States Of'},
            {'ccode' : 'MD', 'cname' : 'Moldova'},
            {'ccode' : 'MC', 'cname' : 'Monaco'},
            {'ccode' : 'MN', 'cname' : 'Mongolia'},
            {'ccode' : 'ME', 'cname' : 'Montenegro'},
            {'ccode' : 'MS', 'cname' : 'Montserrat'},
            {'ccode' : 'MA', 'cname' : 'Morocco'},
            {'ccode' : 'MZ', 'cname' : 'Mozambique'},
            {'ccode' : 'MM', 'cname' : 'Myanmar'},
            {'ccode' : 'NA', 'cname' : 'Namibia'},
            {'ccode' : 'NR', 'cname' : 'Nauru'},
            {'ccode' : 'NP', 'cname' : 'Nepal'},
            {'ccode' : 'NL', 'cname' : 'Netherlands'},
            {'ccode' : 'AN', 'cname' : 'Netherlands Antilles'},
            {'ccode' : 'NC', 'cname' : 'New Caledonia'},
            {'ccode' : 'NZ', 'cname' : 'New Zealand'},
            {'ccode' : 'NI', 'cname' : 'Nicaragua'},
            {'ccode' : 'NE', 'cname' : 'Niger'},
            {'ccode' : 'NG', 'cname' : 'Nigeria'},
            {'ccode' : 'NU', 'cname' : 'Niue'},
            {'ccode' : 'NF', 'cname' : 'Norfolk Island'},
            {'ccode' : 'MP', 'cname' : 'Northern Mariana Islands'},
            {'ccode' : 'NO', 'cname' : 'Norway'},
            {'ccode' : 'OM', 'cname' : 'Oman'},
            {'ccode' : 'PK', 'cname' : 'Pakistan'},
            {'ccode' : 'PW', 'cname' : 'Palau'},
            {'ccode' : 'PS', 'cname' : 'Palestinian Territory, Occupied'},
            {'ccode' : 'PA', 'cname' : 'Panama'},
            {'ccode' : 'PG', 'cname' : 'Papua New Guinea'},
            {'ccode' : 'PY', 'cname' : 'Paraguay'},
            {'ccode' : 'PE', 'cname' : 'Peru'},
            {'ccode' : 'PH', 'cname' : 'Philippines'},
            {'ccode' : 'PN', 'cname' : 'Pitcairn'},
            {'ccode' : 'PL', 'cname' : 'Poland'},
            {'ccode' : 'PT', 'cname' : 'Portugal'},
            {'ccode' : 'PR', 'cname' : 'Puerto Rico'},
            {'ccode' : 'QA', 'cname' : 'Qatar'},
            {'ccode' : 'RE', 'cname' : 'Reunion'},
            {'ccode' : 'RO', 'cname' : 'Romania'},
            {'ccode' : 'RU', 'cname' : 'Russian Federation'},
            {'ccode' : 'RW', 'cname' : 'Rwanda'},
            {'ccode' : 'BL', 'cname' : 'Saint Barthelemy'},
            {'ccode' : 'SH', 'cname' : 'Saint Helena'},
            {'ccode' : 'KN', 'cname' : 'Saint Kitts And Nevis'},
            {'ccode' : 'LC', 'cname' : 'Saint Lucia'},
            {'ccode' : 'MF', 'cname' : 'Saint Martin'},
            {'ccode' : 'PM', 'cname' : 'Saint Pierre And Miquelon'},
            {'ccode' : 'VC', 'cname' : 'Saint Vincent And Grenadines'},
            {'ccode' : 'WS', 'cname' : 'Samoa'},
            {'ccode' : 'SM', 'cname' : 'San Marino'},
            {'ccode' : 'ST', 'cname' : 'Sao Tome And Principe'},
            {'ccode' : 'SA', 'cname' : 'Saudi Arabia'},
            {'ccode' : 'SN', 'cname' : 'Senegal'},
            {'ccode' : 'CS', 'cname' : 'Serbia'},
            {'ccode' : 'SC', 'cname' : 'Seychelles'},
            {'ccode' : 'SL', 'cname' : 'Sierra Leone'},
            {'ccode' : 'SG', 'cname' : 'Singapore'},
            {'ccode' : 'SK', 'cname' : 'Slovakia'},
            {'ccode' : 'SI', 'cname' : 'Slovenia'},
            {'ccode' : 'SB', 'cname' : 'Solomon Islands'},
            {'ccode' : 'SO', 'cname' : 'Somalia'},
            {'ccode' : 'ZA', 'cname' : 'South Africa'},
            {'ccode' : 'GS', 'cname' : 'South Georgia And Sandwich Isl.'},
            {'ccode' : 'ES', 'cname' : 'Spain'},
            {'ccode' : 'LK', 'cname' : 'Sri Lanka'},
            {'ccode' : 'SD', 'cname' : 'Sudan'},
            {'ccode' : 'SR', 'cname' : 'Suriname'},
            {'ccode' : 'SJ', 'cname' : 'Svalbard And Jan Mayen'},
            {'ccode' : 'SZ', 'cname' : 'Swaziland'},
            {'ccode' : 'SE', 'cname' : 'Sweden'},
            {'ccode' : 'CH', 'cname' : 'Switzerland'},
            {'ccode' : 'SY', 'cname' : 'Syrian Arab Republic'},
            {'ccode' : 'TW', 'cname' : 'Taiwan'},
            {'ccode' : 'TJ', 'cname' : 'Tajikistan'},
            {'ccode' : 'TZ', 'cname' : 'Tanzania'},
            {'ccode' : 'TH', 'cname' : 'Thailand'},
            {'ccode' : 'TL', 'cname' : 'Timor-Leste'},
            {'ccode' : 'TG', 'cname' : 'Togo'},
            {'ccode' : 'TK', 'cname' : 'Tokelau'},
            {'ccode' : 'TO', 'cname' : 'Tonga'},
            {'ccode' : 'TT', 'cname' : 'Trinidad And Tobago'},
            {'ccode' : 'TN', 'cname' : 'Tunisia'},
            {'ccode' : 'TR', 'cname' : 'Turkey'},
            {'ccode' : 'TM', 'cname' : 'Turkmenistan'},
            {'ccode' : 'TC', 'cname' : 'Turks And Caicos Islands'},
            {'ccode' : 'TV', 'cname' : 'Tuvalu'},
            {'ccode' : 'UG', 'cname' : 'Uganda'},
            {'ccode' : 'UA', 'cname' : 'Ukraine'},
            {'ccode' : 'AE', 'cname' : 'United Arab Emirates'},
            {'ccode' : 'GB', 'cname' : 'England'},
            {'ccode' : 'US', 'cname' : 'United States'},
            {'ccode' : 'UM', 'cname' : 'United States Outlying Islands'},
            {'ccode' : 'UY', 'cname' : 'Uruguay'},
            {'ccode' : 'UZ', 'cname' : 'Uzbekistan'},
            {'ccode' : 'VU', 'cname' : 'Vanuatu'},
            {'ccode' : 'VE', 'cname' : 'Venezuela'},
            {'ccode' : 'VN', 'cname' : 'Viet Nam'},
            {'ccode' : 'VG', 'cname' : 'Virgin Islands, British'},
            {'ccode' : 'VI', 'cname' : 'Virgin Islands, U.S.'},
            {'ccode' : 'WF', 'cname' : 'Wallis And Futuna'},
            {'ccode' : 'EH', 'cname' : 'Western Sahara'},
            {'ccode' : 'YE', 'cname' : 'Yemen'},
            {'ccode' : 'ZM', 'cname' : 'Zambia'},
            {'ccode' : 'ZW', 'cname' : 'Zimbabwe'}
        ]

        let countryName = countryCodeList.filter(function(item) {
            return item.ccode == countryCode;
        });

        if(countryName.length > 0){
            return countryName[0].cname
        }
        else{
            return 'International'
        }
    }
})
