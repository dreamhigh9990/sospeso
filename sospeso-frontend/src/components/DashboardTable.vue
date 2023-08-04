<template>
    <CDataTable v-if="eventListsLength"
            class="mb-0 table-outline"
            hover
            :items="tableItems"
            :fields="tableFields"
            head-color="light"
            no-sorting
    >
        <template #match="{item, index}">
            <td class="table-cell">
                <MatchSelect 
                    :updateItem="updateItem"
                    :eventLists3="subEventLists3"
                    :index="index"
                    :buttonFlag="buttonFlag"
                    :item="item"
                    :all="all"
                >
                </MatchSelect>
            </td>
        </template>
        <template #tot="{item}">
            <transition name="slide-fade" mode="out-in">
                <td :key="item.tot.value" class="table-cell text-center">    
                    {{item.tot.value}}
                </td>
            </transition>
        </template>
        <template #preodd="{item}">
            <td class="table-cell text-center">    
                {{item.preodd.value}}
            </td>
        </template>
        <template #odd="{item}">
            <td class="table-cell text-center">    
                {{item.odd.value}}
            </td>
        </template>
        <template #back="{item}">
            <transition name="slide-fade" mode="out-in">
                <td :key="item.back.value" class="table-info text-center">    
                    {{item.back.value}}
                </td>
            </transition>
        </template>
        <template #lay="{item}">
            <transition name="slide-fade" mode="out-in">
                <td :key="item.lay.value" class="table-danger text-center">    
                    {{item.lay.value}}
                </td>
            </transition>
        </template>
        <template #status="{item}">
            <transition name="slide-fade" mode="out-in">
                <td :key="item.status.value" class="table-cell text-center">    
                    {{item.status.value}}
                </td>
            </transition>
        </template>
        <template #minute="{item}">
            <transition name="slide-fade" mode="out-in">
                <td :key="item.minute.value" class="table-cell text-center">    
                    {{item.minute.value}}
                </td>
            </transition>
        </template>
        <template #score="{item}">
            <transition name="slide-fade" mode="out-in">
                <td :key="item.score.value" class="table-cell text-center">
                    {{item.score.value}}
                </td>
            </transition>
        </template>
        <template #gain="{item}">
            <transition name="slide-fade" mode="out-in">
                <td :key="item.gain.value" class="table-cell text-center"
                    :style="{'color': item.gain.value && Number(item.gain.value.replace('%', ''))>=0 ? 'rgb(32, 160, 82)': 'rgb(184, 1, 1)',
                    'background': item.gain.value && Number(item.gain.value.replace('%', ''))>=0 ? 'rgb(216, 228, 188)': 'rgb(255, 199, 206)'}">    
                    {{item.gain.value}}
                </td>
            </transition>
        </template>
    </CDataTable>
    <div v-else class="d-flex justify-content-center align-items-center">
        <CSpinner
            color="primary"
            style="width:4rem;height:4rem;"
        />
    </div>
</template>

<script>
    import MatchSelect from "./utilities/MatchSelect";
    export default {
        name: 'DashboardTable',
        props:  {
            eventLists3: {
                type: Array
            },
            competitionList: {
                type: Array
            },
            mainList: {
                type: Array
            },
            eventLists: {
                type: Array
            },
            prematchOddList: {
                type: Array
            },
            eventFlag: {
                type: Boolean
            },
            clickEventValue: {
                type: String
            },
            bookmarkerFee: {
                type: Number
            }
        },
        components: {
            MatchSelect
        },
        data () {
            return {
                tableItems: [],
                eventListsLength: 0,
                tableFields: [],
                eventId: 0,
                buttonFlag: false,
                childEventLists: [],
                all: false,
                selectionId: '',
                marketIds: [],
                clearEndedFlag: false,
                subEventLists3: []
            }
        },
        methods : {
            updateItem(val, index) {
                this.select_match(val);
                this.tableItems[index].tot.value = '€' + this.total_matched;
                this.tableItems[index].preodd.value = this.prematchOdd;
                this.tableItems[index].back.value = this.back;
                this.tableItems[index].lay.value = this.lay;
                this.tableItems[index].status.value = this.status;
                if (this.timeRecord.includes('undefined')) {
                    this.tableItems[index].minute.value = 'Unknown';
                } else {
                    this.tableItems[index].minute.value = this.timeRecord;
                }
                this.tableItems[index].score.value = this.scoreOne + this.scoreTwo;
                if (this.status == 'CLOSED') {
                    this.tableItems[index].gain.value = '';
                } else {
                    this.tableItems[index].gain.value = this.percent_text2;
                }

                if (!this.marketIds.includes(this.marketId)) {
                    this.marketIds.push(
                        {
                            'index': index,
                            'market': this.marketId,
                            'selectionId': this.selectionId,
                            'eventValue': val,
                            'prematchOdd': this.prematchOdd,
                            'oddSelect': this.prematchOdd===this.back ? 'back':'lay',
                            'selectedArray': this.selectedArray[6],
                            'status': this.status,
                            'eventId': this.eventId
                        });
                }
            },
            select_match(val){
                this.key = '0'
                if(val == ''){
                    return
                }
                this.selectedArray = val.split(',')
                this.selectedValue = val
                if(this.selectedArray[0] != '0'){
                    this.eventId = this.selectedArray[0]
                    this.marketId =''
                    this.selectionId =''
                    this.lay =''
                    this.back =''
                    this.total_matched = 0
                    this.back_matched = 0
                    this.lay_matched = 0
                    this.scoreOne =''
                    this.scoreTwo =''
                    this.status =''
                    this.marketStatus =''
                    this.timeRecord=''

                    let self = this
                    let competitionNode = this.competitionList.filter(function(item) {
                        return item.eventId == self.eventId;
                    });

                    if(competitionNode.length > 0){
                        this.competitionName = "Competition >> " + competitionNode[0].competitions[0].name
                    }else{
                        this.competitionName = 'Competition >> N/D'
                    }

                    for(let i = 0; i < this.mainList.length; i++){
                        let eventValue = this.mainList[i]
                        if(eventValue.eventId == this.eventId){

                            if(eventValue.score){
                                let scoreDetail = eventValue.score
                                this.scoreOne = scoreDetail.home.score + ' - '
                                this.scoreTwo = scoreDetail.away.score
                            }
                            else{
                                this.scoreOne =''
                                this.scoreTwo =''
                            }
                            if(eventValue.status){
                                this.status = 'Live'
                                this.timeRecord = eventValue.timeElapsed + "'"
                            }
                            else if(!eventValue.status){
                                this.status = 'Coming Up'
                                this.timeRecord =''
                            }
                            if(eventValue.inPlayMatchStatus == 'FirstHalfEnd'){
                                this.timeRecord = 'HT'
                            }
                        }
                    }
                }

                if(this.selectedArray[0] == '0'){

                    let eventId = parseInt(this.selectedArray[1])
                    let marketType = this.selectedArray[2]
                    let team = parseInt(this.selectedArray[3])
                    let runnerNo = parseInt(this.selectedArray[6])

                    //----------------------------classic_part--------------------------------
                    if(marketType == 'MATCH_ODDS'){
                        if(team == '0'){
                            if(runnerNo == '0'){
                                this.classic_match = '- 1 - Back'
                            }
                            else{
                                this.classic_match = '- 1 - Lay'
                            }
                        }
                        else if(team == '1'){
                            if(runnerNo == '0'){
                                this.classic_match = '- 2 - Back'
                            }
                            else{
                                this.classic_match = '- 2 - Lay'
                            }
                        }
                        else if(team == '2'){
                            if(runnerNo == '0'){
                                this.classic_match = '- X - Back'
                            }
                            else{
                                this.classic_match = '- X - Lay'
                            }
                        }
                    }
                    else if(marketType == 'OVER_UNDER_05'){
                        if(team == '1'){
                            if(runnerNo == '0'){
                                this.classic_match = '- O 0.5 - Back'
                            }
                            else{
                                this.classic_match = '- O 0.5 - Lay'
                            }
                        }
                    }
                    else if(marketType == 'OVER_UNDER_15'){
                        if(team == '0'){
                            if(runnerNo == '0'){
                                this.classic_match = '- U 1.5 - Back'
                            }
                            else{
                                this.classic_match = '- U 1.5 - Lay'
                            }
                        }
                        else{
                            if(runnerNo == '0'){
                                this.classic_match = '- O 1.5 - Back'
                            }
                            else{
                                this.classic_match = '- O 1.5 - Lay'
                            }
                        }
                    }
                    else if(marketType == 'OVER_UNDER_25'){
                        if(team == '0'){
                            if(runnerNo == '0'){
                                this.classic_match = '- U 2.5 - Back'
                            }
                            else{
                                this.classic_match = '- U 2.5 - Lay'
                            }
                        }
                        else{
                            if(runnerNo == '0'){
                                this.classic_match = '- O 2.5 - Back'
                            }
                            else{
                                this.classic_match = '- O 2.5 - Lay'
                            }
                        }
                    }
                    else if(marketType == 'OVER_UNDER_35'){
                        if(team == '0'){
                            if(runnerNo == '0'){
                                this.classic_match = '- U 3.5 - Back'
                            }
                            else{
                                this.classic_match = '- U 3.5 - Lay'
                            }
                        }
                    }

                    //------------------------------------------------------------------------

                    this.eventId =eventId

                    let self = this
                    let competitionNode = this.competitionList.filter(function(item) {
                        return item.eventId == self.eventId;
                    });

                    if(competitionNode.length > 0){
                        this.competitionName = "Competition >> " + competitionNode[0].competitions[0].name
                        this.oddUrl = competitionNode[0].competitions[0].name.toLowerCase()
                        this.oddUrl = this.oddUrl.replace(" ", "-")

                        let eventNode = this.mainList.filter(function(item) {
                            return item.eventId == eventId;
                        });
                        if(eventNode){
                            this.oddUrl = this.oddUrl + "/" + eventNode[0].name.toLowerCase()
                            this.oddUrl = 'https://www.betfair.com/exchange/plus/en/football/' + this.oddUrl.replace(" ", "-") + '-betting-' + this.eventId
                        }
                    }else{
                        this.competitionName = 'Competition >> N/D'
                    }

                    let eventNode = this.mainList.filter(function(item) {
                        return item.eventId == eventId;
                    });

                    if(eventNode.length < 1){
                        return
                    }
                    //---------------score----------------
                    if(eventNode[0].score){
                        let scoreDetail = eventNode[0].score
                        this.scoreOne = scoreDetail.home.score + ' - '
                        this.scoreTwo = scoreDetail.away.score
                    }
                    else{
                        this.scoreOne =''
                        this.scoreTwo =''
                    }

                    if(eventNode[0].status){
                        this.status = 'Live'
                        this.timeRecord = eventNode[0].timeElapsed + "'"
                    }
                    else if(!eventNode[0].status){
                        this.status = 'Coming Up'
                        this.timeRecord =''
                    }
                    if(eventNode[0].inPlayMatchStatus == 'FirstHalfEnd'){
                        this.timeRecord = 'HT'
                    }

                    //----------------------------------------
                    let marketNode = eventNode[0].markets.filter(function(item) {
                        return item.marketType == marketType;
                    });
                    if(marketNode.length < 1){
                        return
                    }

                    if(marketNode[0].state){
                        if(marketNode[0].state.status == 'SUSPENDED'){
                            this.status = 'SUSPENDED'
                        }
                        else if(marketNode[0].state.status == "CLOSED"){
                            this.status = 'CLOSED'
                        }
                    }
                    this.marketId = marketNode[0].marketId

                    this.total_matched = marketNode[0].totalMatched
                    let runnerNode = marketNode[0].runners[team]

                    this.selectionId = runnerNode.selectionId
                    if(eventNode[0].status){
                        for(let u = 0; u < this.prematchOddList.length; u++){
                            let c1 =  this.marketId
                            let c2 =  this.prematchOddList[u].marketId
                            if(c1 == c2){
                                let runnerlists = this.prematchOddList[u].runners[team]
                                if(runnerNo == 0 && runnerlists.exchange && runnerlists.exchange.availableToBack){
                                    this.prematchOdd = runnerlists.exchange.availableToBack[0].price
                                }

                                if(runnerNo == 1 && runnerlists.exchange.availableToBack[0].price){
                                    this.prematchOdd = runnerlists.exchange.availableToBack[0].price
                                }

                            }
                        }

                        if(!runnerNode.exchange){
                            return
                        }
                        if(runnerNode.exchange.availableToBack){
                            this.back = runnerNode.exchange.availableToBack[0].price
                            this.back_matched = runnerNode.exchange.availableToBack[0].size
                        }
                        else{
                            this.back =
                                this.back_matched = 0
                        }
                        if(runnerNode.exchange.availableToLay){
                            this.lay = runnerNode.exchange.availableToLay[0].price
                            this.lay_matched = runnerNode.exchange.availableToLay[0].size
                        }
                        else{
                            this.lay =
                                this.lay_matched = 0
                        }

                    }
                    else{
                        if(!runnerNode.exchange){
                            return
                        }
                        if(runnerNode.exchange.availableToBack){
                            this.back = runnerNode.exchange.availableToBack[0].price
                            if(runnerNo == 0){
                                this.prematchOdd = this.back
                            }
                            this.back_matched = runnerNode.exchange.availableToBack[0].size
                        }
                        else{
                            this.back =''
                            if(runnerNo == 0){
                                this.prematchOdd = this.back
                            }
                            this.back_matched = 0
                        }
                        if(runnerNode.exchange.availableToLay){
                            this.lay = runnerNode.exchange.availableToLay[0].price
                            if(runnerNo == 1){
                                this.prematchOdd = this.lay
                            }
                            this.lay_matched = runnerNode.exchange.availableToLay[0].size
                        }
                        else{
                            this.lay =''
                            if(runnerNo == 1){
                                this.prematchOdd = this.lay
                            }
                            this.lay_matched = 0
                        }
                    }
                    this.odd_calc(0)
                    this.stake_calc(0)
                }
            },
            oddCalcRefresh(odd, selected, calc_lay, calc_back){
                this.calc_odd = odd;

                this.calc_stake = 100;

                if(this.calc_odd != 0 && this.calc_stake != 0 && this.eventId != 0){
                    if(parseInt(selected) == 0){
                        this.max_profit = (this.calc_odd * this.calc_stake - this.calc_stake).toFixed(2)
                        this.max_lose = this.calc_stake
                        this.guad_max = this.max_profit
                        if(calc_lay == '' || calc_lay == 0){
                            this.guad_att = 0
                        }
                        else{
                            this.guad_att = (this.calc_odd * this.calc_stake/parseFloat(calc_lay) -  this.calc_stake).toFixed(2)
                        }

                        if(this.guad_att > 0){
                            this.guad_att = (this.guad_att * (100 - this.bookmarkerFee)/100).toFixed(2)
                        }

                        if(this.guad_max != 0){
                            if(this.guad_att >= 0){
                                this.currentPercent = (100*this.guad_att/this.guad_max).toFixed(2)
                            }
                            else{
                                this.currentPercent = (100*this.guad_att/this.calc_stake).toFixed(2)
                            }
                        }
                        else{
                            this.currentPercent = 0
                        }
                        this.percent_text2 = this.currentPercent.toString() + '%'
                    }
                    else{
                        this.max_lose = (this.calc_odd * this.calc_stake - this.calc_stake).toFixed(2)
                        this.max_profit = this.calc_stake
                        this.guad_max = this.calc_stake
                        if(calc_back == '' || calc_back == 0){
                            this.guad_att = 0
                        }
                        else{
                            this.guad_att = ( this.calc_stake - this.calc_odd * this.calc_stake/parseFloat(calc_back)).toFixed(2)
                        }

                        if(this.guad_att > 0){
                            this.guad_att = (this.guad_att * (100 - this.bookmarkerFee)/100).toFixed(2)
                        }

                        if(this.guad_max != 0){
                            if(this.guad_att >= 0){
                                this.currentPercent = (100*this.guad_att/this.guad_max).toFixed(2)
                            }
                            else{
                                this.currentPercent = (100*this.guad_att/(this.calc_odd * this.calc_stake - this.calc_stake)).toFixed(2)
                            }
                        }
                        else{
                            this.currentPercent = 0
                        }
                        this.percent_text2 = this.currentPercent.toString() + '%'
                    }
                }
                else{
                    this.max_profit = 0
                    this.max_lose = 0
                    this.guad_max = 0
                    this.percent_text2 = ''
                    this.guad_att = 0
                }
            },
            odd_calc(val){
                this.calc_odd = this.prematchOdd;
                this.calc_stake = 100;

                if(this.calc_odd != 0 && this.calc_stake != 0 && this.eventId != 0){
                    if(parseInt(this.selectedArray[6]) == 0){
                        this.max_profit = (this.calc_odd * this.calc_stake - this.calc_stake).toFixed(2)
                        this.max_lose = this.calc_stake
                        this.guad_max = this.max_profit
                        if(this.lay == '' || this.lay == 0){
                            this.guad_att = 0
                        }
                        else{
                            this.guad_att = (this.calc_odd * this.calc_stake/parseFloat(this.lay) -  this.calc_stake).toFixed(2)
                        }

                        if(this.guad_att > 0){
                            this.guad_att = (this.guad_att * (100 - this.bookmarkerFee)/100).toFixed(2)
                        }

                        if(this.guad_max != 0){
                            if(this.guad_att >= 0){
                                this.currentPercent = (100*this.guad_att/this.guad_max).toFixed(2)
                            }
                            else{
                                this.currentPercent = (100*this.guad_att/this.calc_stake).toFixed(2)
                            }
                        }
                        else{
                            this.currentPercent = 0
                        }
                        this.percent_text2 = this.currentPercent.toString() + '%'
                    }
                    else{
                        this.max_lose = (this.calc_odd * this.calc_stake - this.calc_stake).toFixed(2)
                        this.max_profit = this.calc_stake
                        this.guad_max = this.calc_stake
                        if(this.back == '' || this.back == 0){
                            this.guad_att = 0
                        }
                        else{
                            this.guad_att = ( this.calc_stake - this.calc_odd * this.calc_stake/parseFloat(this.back)).toFixed(2)
                        }

                        if(this.guad_att > 0){
                            this.guad_att = (this.guad_att * (100 - this.bookmarkerFee)/100).toFixed(2)
                        }

                        if(this.guad_max != 0){
                            if(this.guad_att >= 0){
                                this.currentPercent = (100*this.guad_att/this.guad_max).toFixed(2)
                            }
                            else{
                                this.currentPercent = (100*this.guad_att/(this.calc_odd * this.calc_stake - this.calc_stake)).toFixed(2)
                            }
                        }
                        else{
                            this.currentPercent = 0
                        }
                        this.percent_text2 = this.currentPercent.toString() + '%'
                    }
                }
                else{
                    this.max_profit = 0
                    this.max_lose = 0
                    this.guad_max = 0
                    this.percent_text2 = ''
                    this.guad_att = 0
                }
            },
            stake_calc(val){
                this.calc_stake = 100;
                if(this.calc_odd != 0 && this.calc_stake != 0 && this.eventId != 0){
                    if(parseInt(this.selectedArray[6]) == 0){
                        this.max_profit = (this.calc_odd * this.calc_stake - this.calc_stake).toFixed(2)
                        this.max_lose = this.calc_stake
                        this.guad_max = this.max_profit
                        if(this.lay == '' || this.lay == 0){
                            this.guad_att = 0
                        }
                        else{
                            this.guad_att = (this.calc_odd * this.calc_stake/parseFloat(this.lay) -  this.calc_stake).toFixed(2)
                        }

                        if(this.guad_att > 0){
                            this.guad_att = this.guad_att * (100 - this.bookmarkerFee)/100
                        }

                        if(this.guad_max != 0){
                            if(this.guad_att >= 0){
                                this.currentPercent = (100*this.guad_att/this.guad_max).toFixed(2)
                            }
                            else{
                                this.currentPercent = (100*this.guad_att/this.calc_stake).toFixed(2)
                            }
                        }
                        else{
                            this.currentPercent = 0
                        }
                        this.percent_text2 = this.currentPercent.toString() + '%'
                    }
                    else{
                        this.max_lose = (this.calc_odd * this.calc_stake - this.calc_stake).toFixed(2)
                        this.max_profit = this.calc_stake
                        this.guad_max = this.calc_stake
                        if(this.back == '' || this.back == 0){
                            this.guad_att = 0
                        }
                        else{
                            this.guad_att = ( this.calc_stake - this.calc_odd * this.calc_stake/parseFloat(this.back)).toFixed(2)
                        }

                        if(this.guad_att > 0){
                            this.guad_att = this.guad_att * (100 - this.bookmarkerFee)/100
                        }

                        if(this.guad_max != 0){
                            if(this.guad_att >= 0){
                                this.currentPercent = (100*this.guad_att/this.guad_max).toFixed(2)
                            }
                            else{
                                this.currentPercent = (100*this.guad_att/(this.calc_odd * this.calc_stake - this.calc_stake)).toFixed(2)
                            }
                        }
                        else{
                            this.currentPercent = 0
                        }
                        this.percent_text2 = this.currentPercent.toString() + '%'
                    }
                }
                else{
                    this.max_profit = 0
                    this.max_lose = 0
                    this.guad_max = 0
                    this.percent_text2 = ''
                    this.guad_att = 0
                }
            },
            Rerender () {
                this.$nextTick (() => {
                    this.eventListsLength = this.eventLists3.length;
                });
            },
        },
        watch: {
            eventLists3(Lists) {
                this.subEventLists3 = Lists;
                this.tableItems = [];
                this.eventListsLength = Lists.length - 1;
                this.tableFields = [
                    { key: 'match', label:  `Match (${this.eventListsLength})`, _classes: 'table-warning'},
                    { key: 'tot', label:  'Tot. Matched', _classes: 'table-warning'},
                    { key: 'preodd', label:  'Pre Odd', _classes: 'table-warning'},
                    { key: 'odd', label:  'Odd', _classes: 'table-warning'},
                    { key: 'back', label:  'Back', _classes: 'table-info'},
                    { key: 'lay', label:  'Lay', _classes: 'table-danger'},
                    { key: 'status', label:  'Status', _classes: 'table-warning'},
                    { key: 'minute', label:  'Minute', _classes: 'table-warning'},
                    { key: 'score', label:  'Score', _classes: 'table-warning'},
                    { key: 'gain', label:  'Gain/Losses%', _classes: 'table-warning'}
                ]
                for (let i=0; i<this.eventListsLength; i++) {
                    this.tableItems.push(
                        {
                            tot: {value: null},
                            preodd: {value: null},
                            odd: {value: null},
                            back: {value: null},
                            lay: {value: null},
                            status: {value: null},
                            minute: {value: null},
                            score: {value: null},
                            gain: {value: null},
                        }
                    )
                }
                // this.Rerender();
            },
            eventFlag(event) {
                if (this.eventListsLength == 0) {
                    return
                }
                if (this.clickEventValue == 'all') {
                    this.all = true;
                    this.buttonFlag = !this.buttonFlag;
                    this.subEventLists3.forEach((element, index) => {
                        if (index > this.tableItems.length) return
                        if (element.value)
                            this.updateItem(element.value, index-1);
                    });
                } else if (this.clickEventValue == 'clear') {
                    this.marketIds = [];
                    this.all = false;
                    this.buttonFlag = !this.buttonFlag;
                    for (let event of this.subEventLists3) {
                        for (let item of this.tableItems) {
                            item.tot.value = '';
                            item.preodd.value = '';
                            item.back.value = '';
                            item.lay.value = '';
                            item.status.value = '';
                            item.minute.value = '';
                            item.score.value = '';
                            if (this.percent_text1) {
                                item.gain.value = '';
                            } else if (this.percent_text2) {
                                item.gain.value = '';
                            }
                        }
                    }
                } else {
                    this.clearEndedFlag = true;
                    this.all = true;
                    this.buttonFlag = !this.buttonFlag;
                    let indexs = [];
                    this.tableItems.forEach((item, index) => {
                        if (item.status.value == 'CLOSED') {
                            indexs.push(index);
                            this.tableItems = this.tableItems.slice(1, index).concat(this.tableItems.slice(index+1, this.tableItems.length))
                        }
                    })
                    indexs.reverse().forEach(index => {
                        this.subEventLists3 = this.subEventLists3.slice(0, index+1).concat(this.subEventLists3.slice(index+2, this.subEventLists3.length));
                    })
                    // this.subEventLists3.forEach((subEvent, subIndex) => {
                    //     this.tableItems.forEach((tableItem, tableIndex) => {
                    //         if (tableItem.tot.value && tableItem.tot.value !== '' && subIndex==tableIndex+1 && subEvent.value) {
                    //             this.updateItem(subEvent.value, subIndex-1);
                    //         }
                    //     })
                    // })
                }
            },
        },
        created() {
            let self = this
            this.sockets.listener.subscribe('UpdateOdds', (data) => {
                for (let i=0; i<this.marketIds.length; i++) {
                    const element = this.marketIds[i];
                    for (let j = 0; j < data.length; j++) {
                        
                        if(element.market == data[j].marketId){
                            
                            let selections = data[j].runners.filter(function(runner) {
                                return runner.selectionId == element.selectionId;
                            });

                            if(data[j].state.status == 'SUSPENDED'){
                                this.status = 'SUSPENDED';
                            }
                            else if(data[j].state.status == "CLOSED"){
                                this.status = 'CLOSED';
                            } else if (data[j].state.inplay) {
                                this.status = 'Live';
                            } else {
                                this.status = element.status;
                            }
                                console.log("created -> data[j].state.inplay", data[j].state.status, data[j].state.inplay, self.status)

                            if (selections.length > 0) {
                                
                                if(selections[0].exchange.availableToBack){
                                    self.back = selections[0].exchange.availableToBack[0].price ||''
                                    self.back_matched = selections[0].exchange.availableToBack[0].size || 0
                                }
                                else{
                                    self.back =''
                                    self.back_matched = 0
                                }

                                if(selections[0].exchange.availableToLay){
                                    self.lay = selections[0].exchange.availableToLay[0].price ||''
                                    self.lay_matched = selections[0].exchange.availableToLay[0].size || 0
                                }
                                else{
                                    self.lay =''
                                    self.lay_matched = 0
                                }
                                self.total_matched = (data[j].state.totalMatched).toFixed(1);
                            }

                            if (self.status == 'Coming Up' && element.oddSelect == 'back') {
                                self.oddCalcRefresh(self.back, element.selectedArray, self.lay, self.back);
                                self.tableItems[element.index].preodd.value = self.back;
                                self.marketIds[i].prematchOdd = self.back;
                            } else if (self.status == 'Coming Up' && element.oddSelect == 'lay') {
                                self.oddCalcRefresh(self.lay, element.selectedArray, self.lay, self.back);
                                self.tableItems[element.index].preodd.value = self.lay;
                                self.marketIds[i].prematchOdd = self.lay;
                            } else {
                                self.oddCalcRefresh(self.marketIds[i].prematchOdd, element.selectedArray, self.lay, self.back);
                                self.tableItems[element.index].preodd.value = self.marketIds[i].prematchOdd;
                            }

                            if (element.index >= self.tableItems.length) {
                                continue
                            }

                            self.tableItems[element.index].tot.value = '€' + self.total_matched;
                            self.tableItems[element.index].back.value = self.back;
                            self.tableItems[element.index].lay.value = self.lay;
                            self.tableItems[element.index].status.value = self.status;
                            if (self.currentPercent == 0) {
                                self.tableItems[element.index].gain.value = '';
                            } else {
                                self.tableItems[element.index].gain.value = self.currentPercent.toString() + '%';
                            }
                        }
                    }
                }
            });
            
            this.sockets.listener.subscribe('UpdateScore', (data) => {

                for(let i = 0 ; i < self.mainList.length ; i++){
                    if(self.mainList[i].eventId == data.eventId){
                        self.mainList[i].inPlayMatchStatus = data.inPlayMatchStatus
                        self.mainList[i].score = data.score
                        self.mainList[i].timeElapsed = data.timeElapsed
                        self.mainList[i].status = data.status
                        self.mainList[i].updateDetails = data.updateDetails
                        if(data.status == 'IN_PLAY'){
                            for(let j = 0; j < this.eventLists.length; j++){
                                let value = this.eventLists[j].value
                                let liveArray = value.split(',')
                                if(data.eventId == liveArray[0]){
                                    let str = this.eventLists[j].label
                                    if(str.includes(' - Live') == false){
                                        this.eventLists[j].label = this.eventLists[j].label + ' - Live'
                                    }
                                }
                                if(data.eventId == liveArray[1]){
                                    let str = this.eventLists[j].label
                                    if(str.includes(' - Live') == false){
                                        this.eventLists[j].label = this.eventLists[j].label + ' - Live'
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0; j < this.eventLists.length; j++){
                                let value = this.eventLists[j].value
                                let liveArray = value.split(',')
                                if(data.eventId == liveArray[0]){
                                    let str = this.eventLists[j].label
                                    if(str.includes(' - Live') == true){
                                        this.eventLists[j].label.replace(' - Live', )
                                    }
                                }
                            }
                            for(let j = 0; j < this.eventLists.length; j++){
                                let value = this.eventLists[j].value
                                let liveArray = value.split(',')
                                if(data.eventId == liveArray[1]){
                                    let str = this.eventLists[j].label
                                    if(str.includes(' - Live') == true){
                                        this.eventLists[j].label.replace(' - Live', )
                                    }
                                }
                            }
                        }
                    }
                }

                this.marketIds.forEach(element => {
                    if (element.eventId == data.eventId) {
                        self.timeRecord = data.timeElapsed
                        self.status = data.status
                        if(data.status == 'IN_PLAY'){
                            self.status = 'Live'
                            self.scoreOne = data.score.home.score + " - "
                            self.scoreTwo = data.score.away.score
                            self.timeRecord = data.timeElapsed+ "'"
                        }
                        else if(!data.status){
                            self.status = 'Coming Up'
                            self.scoreOne =''
                            self.scoreTwo =''
                            self.timeRecord =''
                        }
                        if(data.inPlayMatchStatus == 'FirstHalfEnd'){
                            self.timeRecord = "HT"
                        }

                        if (typeof this.timeRecord == 'string' && this.timeRecord.includes('undefined')) {
                            self.tableItems[element.index].minute.value = 'Unknown';
                        } else {
                            self.tableItems[element.index].minute.value = self.timeRecord;
                        }
                        self.tableItems[element.index].score.value = self.scoreOne + self.scoreTwo;
                    }
                });
            });
        }
    }
</script>


<style scoped>
    .form-group {
        margin-bottom: 0px;
    }

    .slide-fade-enter-active {
        -webkit-animation-name: frame;
        -webkit-animation-duration: .51s;
        -webkit-animation-iteration-count: 1;
        animation-name: frame;
        animation-duration: .51s;
        animation-iteration-count: 1;
    }

    @keyframes frame {
        0% {
            background-color: rgba(166, 216, 255, 0.53);
        }
        50% {
            background-color: rgba(18, 18, 18, 0.34);
        }
        100% {
            background-color: rgba(250, 201, 209, 0.53);
        }
        100% {
            background-color: rgba(243, 196, 0, 0.5)!important;
        }
    }

</style>