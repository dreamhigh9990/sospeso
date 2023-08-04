<template>
    <div    style="min-width: 1250px">
        <CCard body-wrapper>
            <div
                    v-for="(item,index) in mainList"
                    :key="item.league"
            >
                <div
                        @click="SetCollapse(index)"
                        duration="500"
                        class="event-list"
                        v-if="item.events.length > 0"
                >
                    {{item.country}} - {{item.league}}  <span v-if="item.percentage != 0" style="font-weight: normal; margin-left: 10px;">{{item.percentage}}%</span>
                    <img v-if="item.percentage >= 96 && item.numbers > 6" src="/img/icon-warning-orange.png" width="13px;" style="width: 18px; position:relative; top: -3px; margin-left: 5px; margin-right: 10px;"/>
                    <img v-if="item.percentage <= 10 || item.numbers <= 6" src="/img/icon-warning-red.png" width="13px;" style="width: 18px; position:relative; top: -3px; margin-left: 5px; margin-right: 10px;"/>
                    <img v-if="item.percentage >= 11  && item.numbers > 6 && item.percentage <= 95" src="/img/icon-tick.png" width="13px;" style="width: 18px; position:relative; top: -1px; margin-left: 5px; margin-right: 10px;"/>
                    {{item.events.length}} matches
                    <img v-if="isPlus(index)" src="/img/ico-plus.png" width="13px;" style="width: 16px; float: right;"/>
                    <img v-if="isMinus(index)" src="/img/ico-minus.png" width="13px;" style="width: 16px; float: right;"/>
                </div>
                <CCollapse
                        :show="isCollapsed(index)" class="mt-0"
                >
                    <div
                            v-for="item1 in item.events"
                            :key="item1.eventId"
                    >
                        <div
                                class="event-content"
                                @click="SetCollapse1(item1.eventName)"
                                duration="500"
                        >
                            {{item1.eventName}}
                        </div>
                        <CCollapse
                                :show="isCollapsed1(item1.eventName)" class="mt-0"
                        >
                            <div
                                    class="event-graph"
                            >
                                <div class="event-graph-header">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 30px;">

                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%;">
                                        Team
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        P
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        0 - 0
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        Ov. 1.5
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        Ov. 2.5
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        Ov. 3.5
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        Scored
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        Conc.
                                    </div>
                                    <div style="min-width: 80px; float: left; width: 8%; text-align: center;">
                                        Average
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        BTS
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        1 + 1st
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        2 + 1st
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        1 + 2st
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        2 + 2st
                                    </div>
                                </div>
                                <div class="graph1">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 50px; text-align: center; padding-top: 15px;">
                                        H
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 50px; padding-top: 15px;">
                                        {{item1.home.name}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 50px; padding-top: 15px;">
                                        {{item1.home.p}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.z_z <= 10" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.z_z+'%'}"></div>
                                            <div v-if="item1.home.z_z >= 20" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.z_z+'%'}"></div>
                                            <div v-if="item1.home.z_z > 10 && item1.home.z_z < 20" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.z_z+'%'}"></div>
                                            <label class="graph-label">{{item1.home.z_z}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.over15 >= 80" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.over15 +'%'}"></div>
                                            <div v-if="item1.home.over15 < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.over15 +'%'}"></div>
                                            <div v-if="item1.home.over15 < 80 && item1.home.over15 >= 60" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.over15+'%'}"></div>
                                            <label class="graph-label">{{item1.home.over15}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.over25 >= 65" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.over25+'%'}"></div>
                                            <div v-if="item1.home.over25 < 50" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.over25 +'%'}"></div>
                                            <div v-if="item1.home.over25 >= 50 && item1.home.over25 < 65" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.over25+'%'}"></div>
                                            <label class="graph-label">{{item1.home.over25}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.over35 >= 40" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.over35+'%'}"></div>
                                            <div v-if="item1.home.over35 < 25" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.over35+'%'}"></div>
                                            <div v-if="item1.home.over35 >= 25 && item1.home.over35 < 40" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.over35 +'%'}"></div>
                                            <label class="graph-label">{{item1.home.over35}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.scored >= 70" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.scored +'%'}"></div>
                                            <div v-if="item1.home.scored < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.scored +'%'}"></div>
                                            <div v-if="item1.home.scored >= 60 && item1.home.scored < 70" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.scored +'%'}"></div>
                                            <label class="graph-label">{{item1.home.scored}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.conc >= 70" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.conc +'%'}"></div>
                                            <div v-if="item1.home.conc < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.conc +'%'}"></div>
                                            <div v-if="item1.home.conc >= 60 && item1.home.conc <70" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.conc +'%'}"></div>
                                            <label class="graph-label">{{item1.home.conc}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 80px; float: left; width: 8%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :style="{'position': 'absolute', 'left': '0','width':'100%', 'width': (item1.home.average1/(parseFloat(item1.home.average1) + parseFloat(item1.home.average2))*100).toFixed(2)+'%'}"></div>
                                            <div class="graph-inner" :style="{'position': 'absolute', 'right': '-1px','width':'0%','width': (item1.home.average2/(parseFloat(item1.home.average1) + parseFloat(item1.home.average2))*100).toFixed(2)+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{item1.home.average1}}</label>
                                            <label class="graph-label1">{{item1.home.average2}}</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.bts >= 65" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.bts+'%'}"></div>
                                            <div v-if="item1.home.bts < 45" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.bts+'%'}"></div>
                                            <div v-if="item1.home.bts >= 45 && item1.home.bts < 65" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.bts +'%'}"></div>
                                            <label class="graph-label">{{item1.home.bts}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.first1 >= 80" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.first1+'%'}"></div>
                                            <div v-if="item1.home.first1 < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.first1+'%'}"></div>
                                            <div v-if="item1.home.first1 >= 60 && item1.home.first1 < 80" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.first1+'%'}"></div>
                                            <label class="graph-label">{{item1.home.first1}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.first2 >= 50" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.first2+'%'}"></div>
                                            <div v-if="item1.home.first2 < 40" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.first2+'%'}"></div>
                                            <div v-if="item1.home.first2 >= 40 && item1.home.first2 <50" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.first2+'%'}"></div>
                                            <label class="graph-label">{{item1.home.first2}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.second1 >= 80" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.second1+'%'}"></div>
                                            <div v-if="item1.home.second1 < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.second1+'%'}"></div>
                                            <div v-if="item1.home.second1 >= 60 && item1.home.second1 < 80" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.second1+'%'}"></div>
                                            <label class="graph-label">{{item1.home.second1}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.second2 >= 50" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.second2+'%'}"></div>
                                            <div v-if="item1.home.second2 < 40" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.second2+'%'}"></div>
                                            <div v-if="item1.home.second2 >= 40 && item1.home.second2 < 50" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.second2+'%'}"></div>
                                            <label class="graph-label">{{item1.home.second2}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 150px; float: left; width: 15%;">
                                        <div style="width: 100%; height: 30px;">
                                            <label style="float: left; margin-left: 10px; ">Red Card</label>

                                            <div style="width: 25%; float: right;">
                                                <CInputCheckbox class="check-box"
                                                    :checked="false"
                                                    @update:checked="SH_red"
                                                    @click="item_X = item1, home_date_list = item1.homeDateList, away_date_list = item1.awayDateList, basic_data = item1.b_data"
                                                >
                                                    <template #label>
                                                        SH
                                                    </template>
                                                </CInputCheckbox>
                                            </div>

                                            <div style="width: 25%; float: right;">
                                                <CInputCheckbox class="check-box"
                                                    :checked="false"
                                                    @update:checked="FH_red"
                                                    @click="item_X = item1, home_date_list = item1.homeDateList, away_date_list = item1.awayDateList, basic_data = item1.b_data"
                                                >
                                                    <template #label>
                                                        FH
                                                    </template>
                                                </CInputCheckbox>
                                            </div>
                                        </div>
                                        <div>
                                            <label style="float: left; margin-left: 10px; margin-top: 10px;">Show last</label>
                                            <CSelect
                                                    v-if="item1.homeDateList.length <= item1.awayDateList.length"
                                                    class="eventdays date-range"
                                                    :options="item1.homeDateList"
                                                    @click="item_X = item1, home_date_list = item1.homeDateList, away_date_list = item1.awayDateList, basic_data = item1.b_data"
                                                    @update:value="refreshCalc"
                                            >
                                            </CSelect>

                                            <CSelect
                                                    v-if="item1.homeDateList.length > item1.awayDateList.length"
                                                    class="eventdays date-range"
                                                    @click="item_X = item1"
                                                    :options="item1.awayDateList"
                                                    @update:value="refreshCalc"
                                            >
                                            </CSelect>
                                            <label style="margin-top: 10px;">days</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="graph1">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 50px; text-align: center; padding-top: 15px;">
                                        A
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 50px; padding-top: 15px;">
                                        {{item1.away.name}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 50px; padding-top: 15px;">
                                        {{item1.away.p}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.z_z <= 10" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.z_z+'%'}"></div>
                                            <div v-if="item1.away.z_z >= 20" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.z_z+'%'}"></div>
                                            <div v-if="item1.away.z_z < 20 && item1.away.z_z > 10" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.z_z+'%'}"></div>
                                            <label class="graph-label">{{item1.away.z_z}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.over15 >= 80" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.over15+'%'}"></div>
                                            <div v-if="item1.away.over15 < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.over15+'%'}"></div>
                                            <div v-if="item1.away.over15 < 80 && item1.away.over15 >= 60" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.over15+'%'}"></div>
                                            <label class="graph-label">{{item1.away.over15}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.over25 >= 65" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.over25+'%'}"></div>
                                            <div v-if="item1.away.over25 < 50" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.over25+'%'}"></div>
                                            <div v-if="item1.away.over25 >= 50 && item1.away.over25 < 65" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.over25+'%'}"></div>
                                            <label class="graph-label">{{item1.away.over25}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.over35 >= 40" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.over35+'%'}"></div>
                                            <div v-if="item1.away.over35 < 25" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.over35+'%'}"></div>
                                            <div v-if="item1.away.over35 >= 25 && item1.away.over35 < 40" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.over35+'%'}"></div>
                                            <label class="graph-label">{{item1.away.over35}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.scored >= 70" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.scored+'%'}"></div>
                                            <div v-if="item1.away.scored < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.scored+'%'}"></div>
                                            <div v-if="item1.away.scored >= 60 && item1.away.scored < 70" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.scored+'%'}"></div>
                                            <label class="graph-label">{{item1.away.scored}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.conc >= 70" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.conc+'%'}"></div>
                                            <div v-if="item1.away.conc < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.conc+'%'}"></div>
                                            <div v-if="item1.away.conc >= 60 && item1.away.conc < 70" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.conc+'%'}"></div>
                                            <label class="graph-label">{{item1.away.conc}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 80px; float: left; width: 8%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :style="{'position': 'absolute', 'left': '0','width':'100%','width': (item1.away.average1/(parseFloat(item1.away.average1) + parseFloat(item1.away.average2))*100).toFixed(2)+'%', 'background': '#00cc00'}"></div>
                                            <div class="graph-inner" :style="{'position': 'absolute', 'right': '-1px','width':'0%','width': (item1.away.average2/(parseFloat(item1.away.average1) + parseFloat(item1.away.average2))*100).toFixed(2)+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{item1.away.average1}}</label>
                                            <label class="graph-label1">{{item1.away.average2}}</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.bts >= 65" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.bts+'%'}"></div>
                                            <div v-if="item1.away.bts < 45" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.bts+'%'}"></div>
                                            <div v-if="item1.away.bts >= 45 && item1.away.bts < 65" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.bts+'%'}"></div>
                                            <label class="graph-label">{{item1.away.bts}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.first1 >= 80" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.first1+'%'}"></div>
                                            <div v-if="item1.away.first1 < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.first1+'%'}"></div>
                                            <div v-if="item1.away.first1 >= 60 && item1.away.first1 < 80" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.first1+'%'}"></div>
                                            <label class="graph-label">{{item1.away.first1}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.first2 >= 50" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.first2+'%'}"></div>
                                            <div v-if="item1.away.first2 < 40" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.first2+'%'}"></div>
                                            <div v-if="item1.away.first2 >= 40 && item1.away.first2 < 50" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.first2+'%'}"></div>
                                            <label class="graph-label">{{item1.away.first2}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.second1 >= 80" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.second1+'%'}"></div>
                                            <div v-if="item1.away.second1 < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.second1+'%'}"></div>
                                            <div v-if="item1.away.second1 >= 60 && item1.away.second1 < 80" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.second1+'%'}"></div>
                                            <label class="graph-label">{{item1.away.second1}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.second2 >= 50" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.second2+'%'}"></div>
                                            <div v-if="item1.away.second2 < 40" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.second2+'%'}"></div>
                                            <div v-if="item1.away.second2 >= 40 && item1.away.second2 < 50" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.second2+'%'}"></div>
                                            <label class="graph-label">{{item1.away.second2}}%</label>
                                        </div>
                                    </div>

                                    <div v-if="item1.rankFilter === true" style="min-width: 150px; float: left; width: 15%;">
                                        <div style="width: 100%; height: 30px;">
                                            <label style="float: left; margin-left: 10px; ">HomeTeam:</label>
                                            <div style="width: 50%; float: right;">
                                                <CSelect
                                                    class="rank_filter"
                                                    :options="item1.rank_option"
                                                    @click = "rank_filter = item1.rank_set, item_X = item1, away_team = item1.away, home_team = item1.home"
                                                    @update:value="home_rank_filter"
                                                >
                                                </CSelect>
                                            </div>
                                        </div>
                                        <div style="width: 100%; height: 30px;">
                                            <label style="float: left; margin-left: 10px; ">AwayTeam:</label>
                                            <div style="width: 50%; float: right;">
                                                <CSelect
                                                    class="rank_filter"
                                                    :options="item1.rank_option"
                                                    @click = "rank_filter = item1.rank_set, item_X = item1, away_team = item1.away, home_team = item1.home"
                                                    @update:value="away_rank_filter"
                                                >
                                                </CSelect>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="event-graph-header">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 30px;">

                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%;">
                                        Team
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        P
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 7%; text-align: center; padding: 0px 10px;">
                                        <span style="float: left;">G+</span><span style="float: right;">G-</span>
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center;">
                                        0 - 15
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center;">
                                        16 - 30
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center;">
                                        31 - 45
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 7%; text-align: center;">
                                        46 - 60
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 7%; text-align: center;">
                                        61 - 75
                                    </div>
                                    <div title="sdfsdfsdf" style="min-width: 60px; float: left; width: 7%; text-align: center;">
                                        76 - 90
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 9%; text-align: center; padding: 0px 10px;">
                                        <span style="float: left;">GS1</span><span style="float: right;">GS2</span>
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 9%; text-align: center; padding: 0px 10px;">
                                        <span style="float: left;">GC1</span><span style="float: right;">GC2</span>
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%; text-align: center;">
                                        40+
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%; text-align: center;">
                                        85+
                                    </div>
                                </div>
                                <div class="graph1">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 50px; text-align: center; padding-top: 15px;">
                                        H
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 50px; padding-top: 15px;">
                                        {{item1.home.name}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 50px; padding-top: 15px;">
                                        {{item1.home.p}}
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 7%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :style="{'position': 'absolute', 'left': '0','width': (item1.home.average1/(parseFloat(item1.home.average1) + parseFloat(item1.home.average2))*100).toFixed(2)+'%', 'background': '#00cc00'}"></div>
                                            <div class="graph-inner" :style="{'position': 'absolute', 'right': '-1px','width': (item1.home.average2/(parseFloat(item1.home.average1) + parseFloat(item1.home.average2))*100).toFixed(2)+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{(parseFloat(item1.home.average1)*parseFloat(item1.home.p)).toFixed(0)}}</label>
                                            <label class="graph-label1">{{(parseFloat(item1.home.average2)*parseFloat(item1.home.p)).toFixed(0)}}</label>
                                        </div>
                                    </div>
                                    <!--                                    <div style="min-width:450px ;width: 42%;">-->
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time15_S" :style="{'height': item1.home.time15_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time15_C" :style="{'position': 'absolute', 'right': '5px','height': item1.home.time15_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label" style="left: 0;">{{item1.home.time15_S}}%</label>
                                            <label class="graph-label1">{{item1.home.time15_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time30_S" :style="{'height': item1.home.time30_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time30_C" :style="{'position': 'absolute', 'right': '5px','height': item1.home.time30_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.home.time30_S}}%</label>
                                            <label class="graph-label1">{{item1.home.time30_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time45_S" :style="{'height': item1.home.time45_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time45_C" :style="{'position': 'absolute', 'right': '5px','height': item1.home.time45_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.home.time45_S}}%</label>
                                            <label class="graph-label1">{{item1.home.time45_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time60_S" :style="{'height': item1.home.time60_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time60_C" :style="{'position': 'absolute', 'right': '5px','height': item1.home.time60_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.home.time60_S}}%</label>
                                            <label class="graph-label1">{{item1.home.time60_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time75_S" :style="{'height': item1.home.time75_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time75_C" :style="{'position': 'absolute', 'right': '5px','height': item1.home.time75_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.home.time75_S}}%</label>
                                            <label class="graph-label1">{{item1.home.time75_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time90_S" :style="{'height': item1.home.time90_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time90_C" :style="{'position': 'absolute', 'right': '5px','height': item1.home.time90_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.home.time90_S}}%</label>
                                            <label class="graph-label1">{{item1.home.time90_C}}%</label>
                                        </div>
                                    </div>
                                    <!--                                    </div>-->


                                    <div style="min-width: 90px; float: left; width: 9%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :title="item1.home.gs1" :style="{'position': 'absolute', 'left': '0','width': item1.home.gs1+'%', 'background': '#00cc00'}"></div>
                                            <div class="graph-inner" :title="item1.home.gs2" :style="{'position': 'absolute', 'right': '-1px','width': (100 - parseInt(item1.home.gs1))+'%', 'background': '#00c900'}"></div>
                                            <label class="graph-label">{{item1.home.gs1}}%</label>
                                            <label class="graph-label1">{{100 - parseInt(item1.home.gs1)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 9%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :title="item1.home.gc1" :style="{'position': 'absolute', 'left': '0','width': item1.home.gc1+'%', 'background': '#fe9f9f'}"></div>
                                            <div class="graph-inner" :title="item1.home.gc2" :style="{'position': 'absolute', 'right': '-1px','width': 100 - parseInt(item1.home.gc1)+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{item1.home.gc1}}%</label>
                                            <label class="graph-label1">{{100 - parseInt(item1.home.gc1)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%;">
                                        <div class="graph-detail">
                                            <div class="graph-inner" :title="item1.home.over40" :style="{'height': item1.home.over40+'%', 'background': '#655'}"></div>
                                            <label class="graph-label">{{item1.home.over40}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%;">
                                        <div class="graph-detail">
                                            <div class="graph-inner" :title="item1.home.over85" :style="{'height': item1.home.over85+'%', 'background': '#655'}"></div>
                                            <label class="graph-label">{{item1.home.over85}}%</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="graph1">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 50px; text-align: center; padding-top: 15px;">
                                        A
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 50px; padding-top: 15px;">
                                        {{item1.away.name}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 50px; padding-top: 15px;">
                                        {{item1.away.p}}
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 7%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :style="{'position': 'absolute', 'left': '0','width': item1.away.average1/(parseFloat(item1.away.average1) + parseFloat(item1.away.average2))*100+'%', 'background': '#00cc00'}"></div>
                                            <div class="graph-inner" :style="{'position': 'absolute', 'right': '-1px','width': item1.away.average2/(parseFloat(item1.away.average1) + parseFloat(item1.away.average2))*100+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{(parseFloat(item1.away.average1)*item1.away.p).toFixed(0)}}</label>
                                            <label class="graph-label1">{{(parseFloat(item1.away.average2)*item1.away.p).toFixed(0)}}</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time15_S" :style="{'height': item1.away.time15_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time15_C" :style="{'position': 'absolute', 'right': '5px','height': item1.away.time15_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label" style="left: 0;">{{item1.away.time15_S}}%</label>
                                            <label class="graph-label1">{{item1.away.time15_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time30_S" :style="{'height': item1.away.time30_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time30_C" :style="{'position': 'absolute', 'right': '5px','height': item1.away.time30_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.away.time30_S}}%</label>
                                            <label class="graph-label1">{{item1.away.time30_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time45_S" :style="{'height': item1.away.time45_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time45_C" :style="{'position': 'absolute', 'right': '5px','height': item1.away.time45_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.away.time45_S}}%</label>
                                            <label class="graph-label1">{{item1.away.time45_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time60_S" :style="{'height': item1.away.time60_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time60_C" :style="{'position': 'absolute', 'right': '5px','height': item1.away.time60_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.away.time60_S}}%</label>
                                            <label class="graph-label1">{{item1.away.time60_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time75_S" :style="{'height': item1.away.time75_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time75_C" :style="{'position': 'absolute', 'right': '5px','height': item1.away.time75_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.away.time75_S}}%</label>
                                            <label class="graph-label1">{{item1.away.time75_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time90_S" :style="{'height': item1.away.time90_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time90_C" :style="{'position': 'absolute', 'right': '5px','height': item1.away.time90_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.away.time90_S}}%</label>
                                            <label class="graph-label1">{{item1.away.time90_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 9%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :title="item1.away.gs1" :style="{'position': 'absolute', 'left': '0','width': item1.away.gs1+'%', 'background': '#00cc00'}"></div>
                                            <div class="graph-inner" :title="item1.away.gs2" :style="{'position': 'absolute', 'right': '-1px','width': item1.away.gs2+'%', 'background': '#00cc00'}"></div>
                                            <label class="graph-label">{{item1.away.gs1}}%</label>
                                            <label class="graph-label1">{{item1.away.gs2}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 9%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :title="item1.away.gc1" :style="{'position': 'absolute', 'left': '0','width': item1.away.gc1+'%', 'background': '#fe9f9f'}"></div>
                                            <div class="graph-inner" :title="item1.away.gc2" :style="{'position': 'absolute', 'right': '-1px','width': item1.away.gc2+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{item1.away.gc1}}%</label>
                                            <label class="graph-label1">{{item1.away.gc2}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%;">
                                        <div class="graph-detail">
                                            <div class="graph-inner" :title="item1.away.over40" :style="{'height': item1.away.over40+'%', 'background': '#655'}"></div>
                                            <label class="graph-label">{{item1.away.over40}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%;">
                                        <div class="graph-detail">
                                            <div class="graph-inner" :title="item1.away.over85" :style="{'height': item1.away.over85+'%', 'background': '#655'}"></div>
                                            <label class="graph-label">{{item1.away.over85}}%</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="event-graph-header">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 30px;">

                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%;">
                                        Team
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        P
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center; position: relative; border-left: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        H
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        D
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        A
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        1-0
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        1-1
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        2-0
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        0-1
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        1-1
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        0-2
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        First
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        Last
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        2+
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        2-
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        H 1st
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        D 1st
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        A 1st
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 4.5%; text-align: center;">
                                        H 2nd
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        D 2nd
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        A 2nd
                                    </div>

                                </div>
                                <div class="graph1 graph-percent">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 31px; text-align: center;">
                                        H
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 31px;">
                                        {{item1.home.name}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 31px;">
                                        {{item1.home.p}}
                                    </div>
                                    <div class="graph-detail00" style="border-left: 1px solid lightgray;">
                                        {{item1.home.C_H}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.home.C_D}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.home.C_A}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.home.first10}}
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.home.first11}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.home.first20}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.home.second01}}
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.home.second11}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.home.second02}}%
                                    </div>
                                    <div v-if="item1.home.p != 0" class="graph-detail00">
                                        {{(item1.home.first10/item1.home.p*100).toFixed(0)}}%
                                    </div>
                                    <div v-if="item1.home.p == 0" class="graph-detail00">
                                        0%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.home.lastGoal}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.home.secondplus}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.home.secondminus}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        {{item1.home.homefirst}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.home.drawfirst}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        {{item1.home.awayfirst}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.home.homesecond}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.home.drawsecond}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.home.awaysecond}}%
                                    </div>
                                </div>
                                <div class="graph1 graph-percent" style="margin-top: -10px;">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 31px; text-align: center;">
                                        A
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 31px;">
                                        {{item1.away.name}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 31px;">
                                        {{item1.away.p}}
                                    </div>
                                    <div class="graph-detail00" style="border-left: 1px solid lightgray;">
                                        {{item1.away.C_H}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.away.C_D}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.away.C_A}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.away.first10}}
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.away.first11}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.away.first20}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.away.second01}}
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.away.second11}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.away.second02}}%
                                    </div>
                                    <div v-if="item1.away.p != 0" class="graph-detail00">
                                        {{(item1.away.second01/item1.away.p*100).toFixed(0)}}%
                                    </div>
                                    <div v-if="item1.away.p == 0" class="graph-detail00">
                                        0%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.away.lastGoal}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.away.secondplus}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.away.secondminus}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        {{item1.away.homefirst}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.away.drawfirst}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        {{item1.away.awayfirst}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.away.homesecond}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.away.drawsecond}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.away.awaysecond}}%
                                    </div>
                                </div>
                                <div class="graph1 graph-percent0" style="margin-top: -10px;">
                                    <div style="min-width: 190px; float: left; width: 20%; height: 70px; text-align: right; padding-right: 45px;">
                                        Total
                                    </div>
                                    <div v-if="(item1.away.p + item1.home.p) == 0" class="graph-detail00" style="border-left: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b', 'height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="border-left: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b', 'height': ((item1.away.C_H*item1.away.p + item1.home.C_H*item1.home.p)/(item1.away.p + item1.home.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.C_H*item1.away.p + item1.home.C_H*item1.home.p)/(item1.away.p + item1.home.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.away.p + item1.home.p) == 0" class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.C_D*item1.away.p + item1.home.C_D*item1.home.p)/(item1.away.p + item1.home.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.C_D*item1.away.p + item1.home.C_D*item1.home.p)/(item1.away.p + item1.home.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.away.p + item1.home.p) == 0" class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.C_A*item1.away.p + item1.home.C_A*item1.home.p)/(item1.away.p + item1.home.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.C_A*item1.away.p + item1.home.C_A*item1.home.p)/(item1.away.p + item1.home.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.away.p + item1.home.p) == 0" class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.first10/item1.away.p + item1.home.first10/item1.home.p)*50).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.first10*100 + item1.home.first10*100)/(item1.away.p + item1.home.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.first10 + item1.away.first10) == 0" class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height':'0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.first11*item1.away.first10 + item1.home.first11*item1.home.first10)/(item1.home.first10 + item1.away.first10)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.first11*item1.away.first10 + item1.home.first11*item1.home.first10)/(item1.home.first10 + item1.away.first10)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.first10 + item1.away.first10) == 0" class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.first20*item1.away.first10 + item1.home.first20*item1.home.first10)/(item1.home.first10 + item1.away.first10)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.first20*item1.away.first10 + item1.home.first20*item1.home.first10)/(item1.home.first10 + item1.away.first10)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.away.p + item1.home.p) == 0" class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.second01*100 + item1.home.second01*100)/(item1.away.p + item1.home.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.second01*100 + item1.home.second01*100)/(item1.away.p + item1.home.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.second01 + item1.away.second01) == 0" class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.second11*item1.away.second01 + item1.home.second11*item1.home.second01)/(item1.home.second01 + item1.away.second01)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.second11*item1.away.second01 + item1.home.second11*item1.home.second01)/(item1.home.second01 + item1.away.second01)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.second01 + item1.away.second01) == 0" class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.second02*item1.away.second01 + item1.home.second02*item1.home.second01)/(item1.home.second01 + item1.away.second01)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.second02*item1.away.second01 + item1.home.second02*item1.home.second01)/(item1.home.second01 + item1.away.second01)).toFixed(0)}}%</label>
                                    </div>

                                    <div class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px; border: none;">

                                        </div>
                                        <label class="graph-label" style="left: 13px"></label>
                                    </div>
                                    <div class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px; border: none;">

                                        </div>
                                        <label class="graph-label" style="left: 13px"></label>
                                    </div>
                                    <div v-if="(item1.home.p + item1.away.p) == 0" class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.secondplus*item1.away.p + item1.home.secondplus*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.secondplus*item1.away.p + item1.home.secondplus*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.p + item1.away.p) == 0" class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.secondminus*item1.away.p + item1.home.secondminus*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.secondminus*item1.away.p + item1.home.secondminus*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.p + item1.away.p) == 0" style="min-width: 50px; float: left; width: 5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px; position: relative; top: -10px;">0%</label>
                                    </div>
                                    <div v-else style="min-width: 50px; float: left; width: 5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.homefirst*item1.away.p + item1.home.homefirst*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px; position: relative; top: -10px;">{{((item1.away.homefirst*item1.away.p + item1.home.homefirst*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.p + item1.away.p) == 0" style="min-width: 45px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">0%</label>
                                    </div>
                                    <div v-else style="min-width: 45px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.drawfirst*item1.away.p + item1.home.drawfirst*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">{{((item1.away.drawfirst*item1.away.p + item1.home.drawfirst*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.p + item1.away.p) == 0" style="height: 70px; min-width: 50px; float: left; width: 5%; text-align: center; position: relative; border-right: 1px solid lightgray; top: -9px; padding-top: 9px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">0%</label>
                                    </div>
                                    <div v-else style="height: 70px; min-width: 50px; float: left; width: 5%; text-align: center; position: relative; border-right: 1px solid lightgray; top: -9px; padding-top: 9px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.awayfirst*item1.away.p + item1.home.awayfirst*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">{{((item1.away.awayfirst*item1.away.p + item1.home.awayfirst*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.p + item1.away.p) == 0" style="min-width: 50px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">0%</label>
                                    </div>
                                    <div v-else style="min-width: 50px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.homesecond*item1.away.p + item1.home.homesecond*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">{{((item1.away.homesecond*item1.away.p + item1.home.homesecond*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.p + item1.away.p) == 0" style="min-width: 45px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">0%</label>
                                    </div>
                                    <div v-else style="min-width: 45px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.drawsecond*item1.away.p + item1.home.drawsecond*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">{{((item1.away.drawsecond*item1.away.p + item1.home.drawsecond*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.p + item1.away.p) == 0" style="min-width: 45px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">0%</label>
                                    </div>
                                    <div v-else style="min-width: 45px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.awaysecond*item1.away.p + item1.home.awaysecond*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">{{((item1.away.awaysecond*item1.away.p + item1.home.awaysecond*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>
                                </div>
                                <div class="event-graph-header">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 30px;">

                                    </div>
                                    <div style="min-width: 150px; float: left; width: 15%;">
                                        Team
                                    </div>

                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center; position: relative; border-left: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        Pos
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center;">
                                        H/A
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        Swing
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center;">
                                        FH
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        Swing
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center;">
                                        SH
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        Swing
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center;">
                                        Attack
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        Defense
                                    </div>
                                    <div style="min-width: 80px; float: left; width: 8%; text-align: center;">
                                        Form
                                    </div>
                                    <div style="min-width: 80px; float: left; width: 8%; text-align: center; position: relative; height: 40px; top: -9px; padding-top: 9px;">
                                        H/A Form
                                    </div>
                                </div>
                                <div class="graph1 graph-percent">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 31px; text-align: center;">
                                        H
                                    </div>
                                    <div style="min-width: 150px; float: left; width: 15%; height: 31px;">
                                        {{item1.home.name}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; border-left: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.home.pos}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; min-width: 70px; width: 7%;">
                                        {{item1.home.h_a}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; border-right: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.home.swing1}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; min-width: 70px; width: 7%;">
                                        {{item1.home.FH}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; border-right: 1px solid lightgray;min-width: 70px; width: 7%;">
                                        {{item1.home.swing2}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; min-width: 70px; width: 7%;">
                                        {{item1.home.SH}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; border-right: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.home.swing3}}
                                    </div>
                                    <div class="height: 50px; graph-detail00" style="min-width: 70px; width: 7%;">
                                        {{item1.home.attack}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; border-right: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.home.defense}}
                                    </div>
                                    <div style="height: 50px; min-width: 80px; float: left; text-align: center; width: 8%;">
                                        {{item1.home.form}}
                                    </div>
                                    <div style="height: 50px; min-width: 80px; float: left; text-align: center; width: 8%;">
                                        {{item1.home.form_H_A}}
                                    </div>
                                </div>
                                <div class="graph1 graph-percent">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 31px; text-align: center;">
                                        A
                                    </div>
                                    <div style="min-width: 150px; float: left; width: 15%; height: 31px;">
                                        {{item1.away.name}}
                                    </div>
                                    <div class="graph-detail00" style="border-left: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.away.pos}}
                                    </div>
                                    <div class="graph-detail00" style="min-width: 70px; width: 7%;">
                                        {{item1.away.h_a}}
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.away.swing1}}
                                    </div>
                                    <div class="graph-detail00" style="min-width: 70px; width: 7%;">
                                        {{item1.away.FH}}
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;min-width: 70px; width: 7%;">
                                        {{item1.away.swing2}}
                                    </div>
                                    <div class="graph-detail00" style="min-width: 70px; width: 7%;">
                                        {{item1.away.SH}}
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.away.swing3}}
                                    </div>
                                    <div class="graph-detail00" style="min-width: 70px; width: 7%;">
                                        {{item1.away.attack}}
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.away.defense}}
                                    </div>
                                    <div style="min-width: 80px; float: left; text-align: center; width: 8%;">
                                        {{item1.away.form}}
                                    </div>
                                    <div style="min-width: 80px; float: left; text-align: center; width: 8%;">
                                        {{item1.away.form_H_A}}
                                    </div>
                                </div>
                            </div>
                        </CCollapse>
                    </div>
                </CCollapse>
            </div>
        </CCard>
    </div>
</template>
<script>
    export default {
        name: 'StatsList',
        components: {
        },
        data () {
            return {
                collapse: false,
                countryCodeList:[
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
                ],
                eventList:[],
                collapsed:[],
                collapsed1:[],
                historicArray:[],
                historicResult:[],
                coldMap:[],
                item_X: {},
                leagueIndex: 0,
                eventIndex: 0,
                mainList: [],
                standingList:[],
                mainData:[],
                home_date_list:[],
                away_date_list:[],
                basic_data:[],
                red_FH_check: false,
                red_SH_check: false,
                rankList:[
                    {"value": 1, "label": "vs All"},
                    {"value": 2, "label": "vs High rank"},
                    {"value": 3, "label": "vs middle-high rank"},
                    {"value": 4, "label": "vs middle-low rank"},
                    {"value": 5, "label": "vs low rank"},
                ],
                rank_filter:{},
                home_team:{},
                away_team:{}
            }
        },
        methods: {
            isCollapsed(id){
                return this.collapsed.indexOf(id)>-1?true:false;
            },
            SetCollapse(id){
                if (this.isCollapsed(id)){
                    this.collapsed.splice(this.collapsed.indexOf(id), 1)
                }
                else{
                    this.collapsed.push(id)
                }
                console.log(this.collapsed)
            },
            isCollapsed1(id){
                return this.collapsed1.indexOf(id)>-1?true:false;
            },
            SetCollapse1(id){
                if (this.isCollapsed1(id)){
                    this.collapsed1.splice(this.collapsed.indexOf(id), 1)
                }
                else{
                    this.collapsed1.push(id)
                }
            },
            isPlus(id){
                return this.collapsed.indexOf(id)>-1?false:true;
            },
            isMinus(id){
                return this.collapsed.indexOf(id)>-1?true:false;
            },
            FH_red(val){
                this.red_FH_check = val
                let home_id = this.item_X.home_id
                let away_id = this.item_X.away_id
                let temp =  JSON.stringify(this.mainData)
                let  main_data = JSON.parse(temp)

                let bc_data = []
                this.home_date_list = []
                this.away_date_list = []
                let home_date_index = 0
                let away_date_list = 0
                for(let j = 0; j < main_data.length ; j++){
                    if(main_data[j].events.length < 45){
                        if(this.item_X.home_id === main_data[j].localTeamId && this.item_X.away_id === main_data[j].visitorTeamId){
                            bc_data = main_data[j].events
                            for(let p = 0 ; p < main_data[j].events.length ; p++){
                                for(let pp = 0 ; pp < main_data[j].events[p].events.length ; pp++){
                                    if(this.item_X.home_id === main_data[j].events[p].events[pp].localteamId){
                                        home_date_index++
                                        this.home_date_list.push({"date": main_data[j].events[p].events[pp].date, "value": home_date_index, "label": home_date_index})
                                    }
                                    if(this.item_X.away_id === main_data[j].events[p].events[pp].visitorteamId){
                                        away_date_list++
                                        this.away_date_list.push({"date": main_data[j].events[p].events[pp].date, "value": away_date_list, "label": away_date_list})
                                    }
                                }
                            }
                        }
                    }
                }
                console.log('date list check ===>', this.home_date_list, this.away_date_list)
                let self = this
                this.sortJSON(self.home_date_list,'date', '123');
                this.sortJSON(self.away_date_list,'date', '123');
                for(let i = 0 ; i < bc_data.length; i++){
                    for(let j = 0 ; j < bc_data[i].redCards.length ; j++){
                        if(this.red_FH_check === true && bc_data[i].redCards[j].redFH > 0){
                            if(home_id === bc_data[i].redCards[j].localteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }

                                let index1 = this.home_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.home_date_list.splice(index1, 1)

                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                            }
                            if(away_id === bc_data[i].redCards[j].visitorteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }

                                let index1 = this.away_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.away_date_list.splice(index1, 1)

                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                            }
                        }
                        if(this.red_SH_check === true && bc_data[i].redCards[j].redSH > 0){
                            if(home_id === bc_data[i].redCards[j].localteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }

                                let index1 = this.home_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.home_date_list.splice(index1, 1)

                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                            }
                            if(away_id === bc_data[i].redCards[j].visitorteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }

                                let index1 = this.away_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.away_date_list.splice(index1, 1)

                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                            }
                        }
                    }
                }
                this.basic_data = bc_data
                this.refresh_calculation(this.item_X, this.home_date_list[0].date, this.away_date_list[0].date, this.basic_data)
            },
            SH_red(val){
                this.red_SH_check = val
                let home_id = this.item_X.home_id
                let away_id = this.item_X.away_id
                let temp =  JSON.stringify(this.mainData)
                let  main_data = JSON.parse(temp)
                let bc_data = []

                this.home_date_list = []
                this.away_date_list = []
                let home_date_index = 0
                let away_date_list = 0
                for(let j = 0; j < main_data.length ; j++){
                    if(main_data[j].events.length < 45){
                        if(this.item_X.home_id === main_data[j].localTeamId && this.item_X.away_id === main_data[j].visitorTeamId){
                            bc_data = main_data[j].events
                            for(let p = 0 ; p < main_data[j].events.length ; p++){
                                for(let pp = 0 ; pp < main_data[j].events[p].events.length ; pp++){
                                    if(this.item_X.home_id === main_data[j].events[p].events[pp].localteamId){
                                        home_date_index++
                                        this.home_date_list.push({"date": main_data[j].events[p].events[pp].date, "value": home_date_index, "label": home_date_index})
                                    }
                                    if(this.item_X.away_id === main_data[j].events[p].events[pp].visitorteamId){
                                        away_date_list++
                                        this.away_date_list.push({"date": main_data[j].events[p].events[pp].date, "value": away_date_list, "label": away_date_list})
                                    }
                                }
                            }
                        }
                    }
                }
                console.log('date list check ===>', this.home_date_list, this.away_date_list)
                let self = this
                this.sortJSON(self.home_date_list,'date', '123');
                this.sortJSON(self.away_date_list,'date', '123');
                for(let i = 0 ; i < bc_data.length; i++){
                    for(let j = 0 ; j < bc_data[i].redCards.length ; j++){
                        if(this.red_FH_check === true && bc_data[i].redCards[j].redFH > 0){
                            if(home_id === bc_data[i].redCards[j].localteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }
                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                                let index1 = this.home_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.home_date_list.splice(index1, 1)
                            }
                            if(away_id === bc_data[i].redCards[j].visitorteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }
                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                                let index1 = this.away_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.away_date_list.splice(index1, 1)
                            }
                        }
                        if(this.red_SH_check === true && bc_data[i].redCards[j].redSH > 0){
                            if(home_id === bc_data[i].redCards[j].localteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }
                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                                let index1 = this.home_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.home_date_list.splice(index1, 1)
                            }
                            if(away_id === bc_data[i].redCards[j].visitorteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }
                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                                let index1 = this.away_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.away_date_list.splice(index1, 1)
                            }
                        }
                    }
                }
                this.basic_data = bc_data
                this.refresh_calculation(this.item_X, this.home_date_list[0].date, this.away_date_list[0].date, this.basic_data)
            },
            refreshCalc(val){
                let home_date = ''
                let away_date = ''
                for(let i = 0 ; i < this.home_date_list.length ; i++){
                    if(this.home_date_list.length - i == val){
                        home_date = this.home_date_list[i].date
                    }
                }
                for(let i = 0 ; i < this.away_date_list.length; i++){
                    if(this.away_date_list.length - i == val){
                        away_date = this.away_date_list[i].date
                    }
                }
console.log('=====>', this.home_date_list, ', ', this.away_date_list)
                this.refresh_calculation(this.item_X, home_date, away_date, this.basic_data)
            },
            p_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to){
                                    p++
                                }
                            }
                        }
                    }
                }

                return p
            },
            percentage_calculation(data){
                let p = 0
                let p1 = 0
                let events = data.events
                let roundId = data.round_id
                let name1 = 0
                let stage_id = 0
                let round_ids = events.filter(function(item) {
                    return item.round_id == roundId;
                });

                if(events.length > 0){
                    if(round_ids.length > 0){
                        name1 = round_ids[0].name
                        stage_id =round_ids[0].stage_id
                        p = (name1/events.length*100).toFixed(0)
                    }

                    for(let i = 0 ; i < events.length ; i++){
                        if(events[i].stage_id !== stage_id && events[i].events.length > 0){
                            p1++
                        }
                    }

                    if(p1 > 0){
                        name1 = name1 + p1
                        p = (name1/events.length*100).toFixed(0)
                    }
                }

                return [p, name1]
            },
            zeroTozero_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore == 0 && data[i].events[j].visitorteamSore == 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore == 0 && data[i].events[j].visitorteamSore == 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore == 0 && data[i].events[j].visitorteamSore == 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore == 0 && data[i].events[j].visitorteamSore == 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].localteamScore == 0 && data[i].events[j].visitorteamSore == 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore == 0 && data[i].events[j].visitorteamSore == 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            over15_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 1)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 1)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 1)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 1)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 1)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 1)){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            over25_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 2)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 2)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 2)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 2)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 2)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 2)){
                                    p++
                                }
                            }
                        }
                    }
                }

                return p
            },
            over35_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 3)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 3)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 3)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 3)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 3)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 3)){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            scored_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore > 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore > 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].visitorteamSore > 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            concd_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            average_scored_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore > 0){
                                    p = p + data[i].events[j].localteamScore
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore > 0){
                                    p = p + data[i].events[j].visitorteamSore
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore > 0){
                                    p = p + data[i].events[j].localteamScore
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore > 0){
                                    p = p + data[i].events[j].visitorteamSore
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].localteamScore > 0){
                                    p = p + data[i].events[j].localteamScore
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].visitorteamSore > 0){
                                    p = p + data[i].events[j].visitorteamSore
                                }
                            }
                        }
                    }
                }
                return p
            },
            average_concd_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore > 0){
                                    p = p + data[i].events[j].visitorteamSore
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore > 0){
                                    p = p + data[i].events[j].localteamScore
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore > 0){
                                    p = p + data[i].events[j].visitorteamSore
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore > 0){
                                    p = p + data[i].events[j].localteamScore
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore > 0){
                                    p = p + data[i].events[j].visitorteamSore
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore > 0){
                                    p = p + data[i].events[j].localteamScore
                                }
                            }
                        }
                    }
                }
                return p
            },
            average_bts_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore > 0 && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore > 0 && data[i].events[j].visitorteamSore > 0 ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore > 0 && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore > 0 && data[i].events[j].visitorteamSore > 0 ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore > 0 && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore > 0 && data[i].events[j].visitorteamSore > 0 ){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            FH_1st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            FH_2st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute < 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute < 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute < 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute < 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute < 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute < 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            SH_1st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            SH_2st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            time_scored_calculation(data, teamId, dir, date, time, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == teamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == teamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == teamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == teamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == teamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == teamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            time_concd_calculation(data, teamId, dir, date, time, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == data[i].events[j].localteamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == data[i].events[j].localteamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == data[i].events[j].localteamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            scored_1st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 &&  data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 &&  data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 &&  data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            scored_2st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 &&  data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 &&  data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 &&  data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            concd_1st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 &&  data[i].events[j].goals[k].teamId ==data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 &&  data[i].events[j].goals[k].teamId ==data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 &&  data[i].events[j].goals[k].teamId ==data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            concd_2st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 &&  data[i].events[j].goals[k].teamId ==data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 &&  data[i].events[j].goals[k].teamId ==data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 &&  data[i].events[j].goals[k].teamId ==data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            scored_plus_calculation(data, teamId, dir, date, time, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 6){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 6){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d ==='2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 6){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 6){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d ==='3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 6){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 6){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            win_percentage_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore < data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore > data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore < data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore > data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore < data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore > data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            draw_percentage_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore == data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore == data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore == data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore == data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore == data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore == data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            loss_percentage_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore > data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore < data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore > data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore < data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore > data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore < data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            one_to_zero_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            one_to_one_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            two_to_one_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId && data[i].events[j].goals[1].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId && data[i].events[j].goals[1].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId && data[i].events[j].goals[1].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            zero_to_one_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            one_to_one2_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[1].teamId == teamId && data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[1].teamId == teamId && data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[1].teamId == teamId && data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            zero_to_two_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId && data[i].events[j].goals[1].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId && data[i].events[j].goals[1].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId && data[i].events[j].goals[1].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            two_score_ahead_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(hometeamScore - awayteamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(awayteamScore - hometeamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(hometeamScore - awayteamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(awayteamScore - hometeamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(hometeamScore - awayteamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(awayteamScore - hometeamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                    }
                }
                return p
            },
            two_score_behind_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(awayteamScore - hometeamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(hometeamScore - awayteamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(awayteamScore - hometeamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(hometeamScore - awayteamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(awayteamScore - hometeamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(hometeamScore - awayteamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                    }
                }

                return p
            },
            H_1st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            D_1st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            A_1st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            H_2st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            D_2st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            A_2st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            Last_goal_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[data[i].events[j].goals.length - 1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[data[i].events[j].goals.length - 1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[data[i].events[j].goals.length - 1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[data[i].events[j].goals.length - 1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[data[i].events[j].goals.length - 1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[data[i].events[j].goals.length - 1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            H_A_calculation(seasonId, teamId, dir){
                let rankArray = []
                let teamPoints = 0
                let rank = 1
                let team_goals_scored = 0
                let team_goals_against = 0
                for(let i = 0 ; i < this.standingList.length ; i++){
                    if(this.standingList[i].season_id == seasonId){
                        for(let j = 0 ; j < this.standingList[i].standings.length; j++){
                            if(dir == 'home'){
                                rankArray.push({"teamId": this.standingList[i].standings[j].team_id, "points": this.standingList[i].standings[j].home.won*3 + this.standingList[i].standings[j].home.draw, 'goals_scored': this.standingList[i].standings[j].home.goals_scored, 'goals_against': this.standingList[i].standings[j].home.goals_against})
                                if(this.standingList[i].standings[j].team_id == teamId){
                                    teamPoints =  this.standingList[i].standings[j].home.won*3 + this.standingList[i].standings[j].home.draw
                                    team_goals_scored = this.standingList[i].standings[j].home.goals_scored
                                    team_goals_against = this.standingList[i].standings[j].home.goals_against
                                }
                            }
                            else{
                                rankArray.push({"teamId": this.standingList[i].standings[j].team_id, "points": this.standingList[i].standings[j].away.won*3 + this.standingList[i].standings[j].away.draw, 'goals_scored': this.standingList[i].standings[j].away.goals_scored, 'goals_against': this.standingList[i].standings[j].away.goals_against})
                                if(this.standingList[i].standings[j].team_id == teamId){
                                    teamPoints =  this.standingList[i].standings[j].away.won*3 + this.standingList[i].standings[j].away.draw
                                    team_goals_scored = this.standingList[i].standings[j].away.goals_scored
                                    team_goals_against = this.standingList[i].standings[j].away.goals_against
                                }
                            }
                        }

                        for(let j = 0 ; j < rankArray.length ; j++){
                            if(rankArray[j].points > teamPoints){
                                rank++
                            }
                            if(rankArray[j].points == teamPoints){
                                if((team_goals_scored - team_goals_against) < (rankArray[j].goals_scored - rankArray[j].goals_against)){
                                    rank++
                                }
                            }
                        }
                    }
                }
                if(teamId == 300){
                    console.log('teamPoints=>',teamPoints)
                }
                return rank
            },
            FH_calculation(data, teamId, seasonId, dir, date, d, ranks){
                let teamIdArray = []
                let rank = 1
                let currentTeamData = {}
                for(let i = 0 ; i < this.standingList.length ; i++){
                    if(this.standingList[i].season_id == seasonId){
                        for(let j = 0 ; j < this.standingList[i].standings.length; j++){
                            teamIdArray[j] = this.standingList[i].standings[j].team_id
                        }
                    }
                }
                teamIdArray = Array.from(new Set (teamIdArray))
                let rankArray = []
                if(d === '1'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = 0 ; j < data.length ; j++){
                            if(dir == 'home'){
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].date < date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].date < date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = 0 ; j < data.length ; j++){
                            if(dir == 'home'){
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].date >= date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].date >= date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }

                }
                else if(d === '3'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = 0 ; j < data.length ; j++){
                            if(dir == 'home'){
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].awayRank >= ranks.from && data[j].events[k].awayRank <= ranks.to){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].homeRank >= ranks.from && data[j].events[k].homeRank <= ranks.to){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }

                for(let i = 0 ; i < rankArray.length ; i++){
                    if(rankArray[i].points > currentTeamData.points){
                        rank++
                    }
                    if(rankArray[i].points == currentTeamData.points){
                        if((rankArray[i].goals_scored - rankArray[i].goals_against) > (currentTeamData.goals_scored - currentTeamData.goals_against)){
                            rank++
                        }
                    }
                }
                return rank
            },
            SH_calculation(data, teamId, seasonId, dir, date, d, ranks){
                let teamIdArray = []
                let rank = 1
                let currentTeamData = {}
                for(let i = 0 ; i < this.standingList.length ; i++){
                    if(this.standingList[i].season_id == seasonId){
                        for(let j = 0 ; j < this.standingList[i].standings.length; j++){
                            teamIdArray[j] = this.standingList[i].standings[j].team_id
                        }
                    }
                }
                teamIdArray = Array.from(new Set (teamIdArray))
                let rankArray = []
                if(d === '1'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = 0 ; j < data.length ; j++){
                            if(dir == 'home'){
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].date < date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].date < date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = 0 ; j < data.length ; j++){
                            if(dir == 'home'){
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].date >= date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].date >= date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = 0 ; j < data.length ; j++){
                            if(dir == 'home'){
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].awayRank >= ranks.from && data[j].events[k].awayRank <= ranks.to){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].homeRank >= ranks.from && data[j].events[k].homeRank <= ranks.to){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                for(let i = 0 ; i < rankArray.length ; i++){
                    if(rankArray[i].points > currentTeamData.points){
                        rank++
                    }
                    if(rankArray[i].points == currentTeamData.points){
                        if((rankArray[i].goals_scored - rankArray[i].goals_against) > (currentTeamData.goals_scored - currentTeamData.goals_against)){
                            rank++
                        }
                    }
                }
                return rank
            },
            attack_calculation(seasonId, teamId, dir){
                let rankArray = []
                let rank = 1
                let team_goals_scored = 0
                for(let i = 0 ; i < this.standingList.length ; i++){
                    if(this.standingList[i].season_id == seasonId){
                        for(let j = 0 ; j < this.standingList[i].standings.length; j++){
                            if(dir == 'home'){
                                rankArray.push({"teamId": this.standingList[i].standings[j].team_id, "points": this.standingList[i].standings[j].home.won*3 + this.standingList[i].standings[j].home.draw, 'goals_scored': this.standingList[i].standings[j].home.goals_scored, 'goals_against': this.standingList[i].standings[j].home.goals_against})
                                if(this.standingList[i].standings[j].team_id == teamId){
                                    team_goals_scored = this.standingList[i].standings[j].home.goals_scored
                                }
                            }
                            else{
                                rankArray.push({"teamId": this.standingList[i].standings[j].team_id, "points": this.standingList[i].standings[j].away.won*3 + this.standingList[i].standings[j].away.draw, 'goals_scored': this.standingList[i].standings[j].away.goals_scored, 'goals_against': this.standingList[i].standings[j].away.goals_against})
                                if(this.standingList[i].standings[j].team_id == teamId){
                                    team_goals_scored = this.standingList[i].standings[j].away.goals_scored
                                }
                            }
                        }

                        for(let j = 0 ; j < rankArray.length ; j++){
                            if(rankArray[j].goals_scored > team_goals_scored){
                                rank++
                            }
                        }
                    }
                }
                return rank
            },
            defense_calculation(seasonId, teamId, dir){
                let rankArray = []
                let rank = 1
                let team_goals_against = 0
                for(let i = 0 ; i < this.standingList.length ; i++){
                    if(this.standingList[i].season_id == seasonId){
                        for(let j = 0 ; j < this.standingList[i].standings.length; j++){
                            if(dir == 'home'){
                                rankArray.push({"teamId": this.standingList[i].standings[j].team_id, "points": this.standingList[i].standings[j].home.won*3 + this.standingList[i].standings[j].home.draw, 'goals_scored': this.standingList[i].standings[j].home.goals_scored, 'goals_against': this.standingList[i].standings[j].home.goals_against})
                                if(this.standingList[i].standings[j].team_id == teamId){
                                    team_goals_against = this.standingList[i].standings[j].home.goals_against
                                }
                            }
                            else{
                                rankArray.push({"teamId": this.standingList[i].standings[j].team_id, "points": this.standingList[i].standings[j].away.won*3 + this.standingList[i].standings[j].away.draw, 'goals_scored': this.standingList[i].standings[j].away.goals_scored, 'goals_against': this.standingList[i].standings[j].away.goals_against})
                                if(this.standingList[i].standings[j].team_id == teamId){
                                    team_goals_against = this.standingList[i].standings[j].away.goals_against
                                }
                            }
                        }

                        for(let j = 0 ; j < rankArray.length ; j++){
                            if(rankArray[j].goals_against < team_goals_against){
                                rank++
                            }
                        }
                    }
                }
                return rank
            },
            H_A_Form_calculation(data, teamId, seasonId, dir, date,d, ranks){
                let teamIdArray = []
                let rank = 1
                let currentTeamData = {}
                for(let i = 0 ; i < this.standingList.length ; i++){
                    if(this.standingList[i].season_id == seasonId){
                        for(let j = 0 ; j < this.standingList[i].standings.length; j++){
                            teamIdArray[j] = this.standingList[i].standings[j].team_id
                        }
                    }
                }
                teamIdArray = Array.from(new Set (teamIdArray))
                let rankArray = []
                if(d === '1'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        let limit = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = data.length - 1 ; j >= 0 ; j--){
                            if(dir == 'home'){
                                for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].date < date){
                                        limit++
                                        if(limit <= 3){
                                            let localScoreSum = 0
                                            let visitorScoreSum = 0
                                            for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                                if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                    localScoreSum++
                                                    rankArray[i].goals_scored++
                                                }
                                                if(data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                    visitorScoreSum++
                                                    rankArray[i].goals_against++
                                                }
                                            }
                                            if(localScoreSum == visitorScoreSum){
                                                draw++
                                            }
                                            else if(localScoreSum > visitorScoreSum){
                                                won++
                                            }
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].date < date){
                                        limit++
                                        if(limit <= 3){
                                            let localScoreSum = 0
                                            let visitorScoreSum = 0
                                            for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                                if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                    visitorScoreSum++
                                                    rankArray[i].goals_scored++
                                                }
                                                if(data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                    localScoreSum++
                                                    rankArray[i].goals_against++
                                                }
                                            }
                                            if(localScoreSum == visitorScoreSum){
                                                draw++
                                            }
                                            else if(localScoreSum < visitorScoreSum){
                                                won++
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        let limit = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = data.length - 1 ; j >= 0 ; j--){
                            if(dir == 'home'){
                                for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].date >= date){
                                        limit++
                                        if(limit <= 3){
                                            let localScoreSum = 0
                                            let visitorScoreSum = 0
                                            for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                                if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                    localScoreSum++
                                                    rankArray[i].goals_scored++
                                                }
                                                if(data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                    visitorScoreSum++
                                                    rankArray[i].goals_against++
                                                }
                                            }
                                            if(localScoreSum == visitorScoreSum){
                                                draw++
                                            }
                                            else if(localScoreSum > visitorScoreSum){
                                                won++
                                            }
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].date >= date){
                                        limit++
                                        if(limit <= 3){
                                            let localScoreSum = 0
                                            let visitorScoreSum = 0
                                            for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                                if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                    visitorScoreSum++
                                                    rankArray[i].goals_scored++
                                                }
                                                if(data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                    localScoreSum++
                                                    rankArray[i].goals_against++
                                                }
                                            }
                                            if(localScoreSum == visitorScoreSum){
                                                draw++
                                            }
                                            else if(localScoreSum < visitorScoreSum){
                                                won++
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        let limit = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = data.length - 1 ; j >= 0 ; j--){
                            if(dir == 'home'){
                                for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].awayRank >= ranks.from && data[j].events[k].awayRank <= ranks.to){
                                        limit++
                                        if(limit <= 3){
                                            let localScoreSum = 0
                                            let visitorScoreSum = 0
                                            for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                                if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                    localScoreSum++
                                                    rankArray[i].goals_scored++
                                                }
                                                if(data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                    visitorScoreSum++
                                                    rankArray[i].goals_against++
                                                }
                                            }
                                            if(localScoreSum == visitorScoreSum){
                                                draw++
                                            }
                                            else if(localScoreSum > visitorScoreSum){
                                                won++
                                            }
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].homeRank >= ranks.from && data[j].events[k].homeRank <= ranks.to){
                                        limit++
                                        if(limit <= 3){
                                            let localScoreSum = 0
                                            let visitorScoreSum = 0
                                            for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                                if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                    visitorScoreSum++
                                                    rankArray[i].goals_scored++
                                                }
                                                if(data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                    localScoreSum++
                                                    rankArray[i].goals_against++
                                                }
                                            }
                                            if(localScoreSum == visitorScoreSum){
                                                draw++
                                            }
                                            else if(localScoreSum < visitorScoreSum){
                                                won++
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }

                for(let i = 0 ; i < rankArray.length ; i++){
                    if(rankArray[i].points > currentTeamData.points){
                        rank++
                    }
                    if(rankArray[i].points == currentTeamData.points){
                        if((rankArray[i].goals_scored - rankArray[i].goals_against) > (currentTeamData.goals_scored - currentTeamData.goals_against)){
                            rank++
                        }
                    }
                }
                return rank
            },
            Form_calculation(data, teamId, seasonId, date, d, ranks){
                let teamIdArray = []
                let rank = 1
                let currentTeamData = {}
                for(let i = 0 ; i < this.standingList.length ; i++){
                    if(this.standingList[i].season_id == seasonId){
                        for(let j = 0 ; j < this.standingList[i].standings.length; j++){
                            teamIdArray[j] = this.standingList[i].standings[j].team_id
                        }
                    }
                }
                teamIdArray = Array.from(new Set (teamIdArray))
                let rankArray = []
                if(d === '1'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        let limit = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = data.length - 1 ; j >= 0 ; j--){
                            for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                if((data[j].events[k].localteamId == teamIdArray[i] || data[j].events[k].visitorteamId == teamIdArray[i]) && data[j].events[k].date < date){
                                    limit++
                                    if(data[j].events[k].localteamId == teamIdArray[i] && limit <= 6){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                    else if(data[j].events[k].visitorteamId == teamIdArray[i] && limit <= 6){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        let limit = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = data.length - 1 ; j >= 0 ; j--){
                            for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                if((data[j].events[k].localteamId == teamIdArray[i] || data[j].events[k].visitorteamId == teamIdArray[i]) && data[j].events[k].date >= date){
                                    limit++
                                    if(data[j].events[k].localteamId == teamIdArray[i] && limit <= 6){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                    else if(data[j].events[k].visitorteamId == teamIdArray[i] && limit <= 6){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        let limit = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = data.length - 1 ; j >= 0 ; j--){
                            for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                if((data[j].events[k].localteamId == teamIdArray[i] || data[j].events[k].visitorteamId == teamIdArray[i])  && data[j].events[k].date >= date){
                                    limit++
                                    if(data[j].events[k].localteamId == teamIdArray[i] && limit <= 6){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                    else if(data[j].events[k].visitorteamId == teamIdArray[i] && limit <= 6){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }

                for(let i = 0 ; i < rankArray.length ; i++){
                    if(rankArray[i].points > currentTeamData.points){
                        rank++
                    }
                    if(rankArray[i].points == currentTeamData.points){
                        if((rankArray[i].goals_scored - rankArray[i].goals_against) > (currentTeamData.goals_scored - currentTeamData.goals_against)){
                            rank++
                        }
                    }
                }
                return rank
            },
            readData(){
                window.axios.post(`${process.env.VUE_APP_URL}getStatsNew`).then(({data})=> {
                    console.log('data******', data.data[0])
                    console.log('data1******', data.data[1])
                    this.standingList = data.data[1]
                    let main_data = data.data[0]
                    this.mainData = main_data
                    let competitionArray = []
                    for(let i = 0 ; i < main_data.length ; i++){
                        competitionArray[i] = main_data[i].competitions[0].name
                    }
                    competitionArray = Array.from(new Set (competitionArray))

                    this.mainList = []
                    for(let i = 0 ; i < competitionArray.length; i++){
                        let countryCode = ''
                        let k = 0
                        let events = []
                        let percentage = 0
                        let numbers = 0
                        for(let j = 0; j < main_data.length ; j++){
                            if(competitionArray[i] == main_data[j].competitions[0].name && main_data[j].events.length < 45){
                                k++
                                let start_date4 = new Date();
                                let next_date4 = start_date4.setDate(start_date4.getDate() + 0);
                                next_date4 = new Date(next_date4).toISOString()
                                next_date4 = next_date4.substring(0,10)
                                let home = {
                                    p:0,
                                    name:'',
                                    rank: '',
                                    z_z: 0,
                                    over15: 0,
                                    over25:0,
                                    over35:0,
                                    scored:0,
                                    conc:0,
                                    average1:0,
                                    average2:0,
                                    bts:0,
                                    first1:0,
                                    first2:0,
                                    second1:0,
                                    second2:0,
                                    time15_S:0,
                                    time30_S:0,
                                    time45_S:0,
                                    time60_S:0,
                                    time75_S:0,
                                    time90_S:0,
                                    time15_C:0,
                                    time30_C:0,
                                    time45_C:0,
                                    time60_C:0,
                                    time75_C:0,
                                    time90_C:0,
                                    gs1:0,
                                    gs2:0,
                                    gc1:0,
                                    gc2:0,
                                    over40:0,
                                    over85:0,
                                    C_H:0,
                                    C_D:0,
                                    C_A:0,
                                    first10:0,
                                    first11:0,
                                    first20:0,
                                    second01:0,
                                    second11:0,
                                    second02:0,
                                    firstGoal:0,
                                    lastGoal:0,
                                    secondplus:0,
                                    secondminus:0,
                                    homefirst:0,
                                    drawfirst:0,
                                    awayfirst:0,
                                    homesecond:0,
                                    drawsecond:0,
                                    awaysecond:0,
                                    eventdays:['All'],
                                    pos:0,
                                    h_a:0,
                                    swing1:'',
                                    FH:0,
                                    swing2:'',
                                    SH:0,
                                    swing3:'',
                                    attack:0,
                                    defense:0,
                                    form:0,
                                    form_H_A:0

                                }
                                let away = {
                                    p:0,
                                    name:'',
                                    rank:'' ,
                                    z_z: 0,
                                    over15: 0,
                                    over25:0,
                                    over35:0,
                                    scored:0,
                                    conc:0,
                                    average1:0,
                                    average2:0,
                                    bts:0,
                                    first1:0,
                                    first2:0,
                                    second1:0,
                                    second2:0,
                                    time15_S:0,
                                    time30_S:0,
                                    time45_S:0,
                                    time60_S:0,
                                    time75_S:0,
                                    time90_S:0,
                                    time15_C:0,
                                    time30_C:0,
                                    time45_C:0,
                                    time60_C:0,
                                    time75_C:0,
                                    time90_C:0,
                                    gs1:0,
                                    gs2:0,
                                    gc1:0,
                                    gc2:0,
                                    over40:0,
                                    over85:0,
                                    C_H:0,
                                    C_D:0,
                                    C_A:0,
                                    first10:0,
                                    first11:0,
                                    first20:0,
                                    second01:0,
                                    second11:0,
                                    second02:0,
                                    firstGoal:0,
                                    lastGoal:0,
                                    secondPlus:0,
                                    secondMinus:0,
                                    homefirst:0,
                                    drawfirst:0,
                                    awayfirst:0,
                                    homesecond:0,
                                    drawsecond:0,
                                    awaysecond:0,
                                    eventdays:['All'],
                                    pos:0,
                                    h_a:0,
                                    swing1: '',
                                    FH:0,
                                    swing2: '',
                                    SH:0,
                                    swing3: '',
                                    attack:0,
                                    defense:0,
                                    form:0,
                                    form_H_A:0
                                }
                                countryCode = main_data[j].countryCode
                                home.name = main_data[j].localTeamName + '(' + main_data[j].standing.localteam_position + ')'
                                away.name = main_data[j].visitorTeamName +  '(' + main_data[j].standing.visitorteam_position + ')'
                                events[k - 1] = {'rank_option': [], 'rank_set': {}, 'rankFilter': false, 'b_data': main_data[j].events, 'eventName': main_data[j].time.starting_at.time.substring(0, 5) + ' ' + main_data[j].localTeamName + '(' + main_data[j].standing.localteam_position + ')' + ' v ' + main_data[j].visitorTeamName +  '(' + main_data[j].standing.visitorteam_position + ')', 'home_id': 0, 'away_id': 0, 'openDate':  main_data[j].time.starting_at.time, 'home':home, 'away': away, 'homeDateList': [], "awayDateList": []}

                                let homeTeamId = main_data[j].localTeamId
                                let awayTeamId = main_data[j].visitorTeamId

                                events[k - 1].home_id = homeTeamId
                                events[k - 1].away_id = awayTeamId

                                let teamsInfo = main_data[j].teamInfo
                                let rank_filter_show = true
                                let teamArray = []
                                for(let m = 0 ; m < teamsInfo.length ; m++){
                                    let teams = teamsInfo[m].teams
                                    if(teams.length < 5){
                                        rank_filter_show = false
                                        break
                                    }
                                    for(let mm = 0 ; mm < teams.length ; mm++){
                                        teamArray.push(teams[mm].team_id)
                                    }
                                }
                                if(teamArray.length === 0){
                                    rank_filter_show = false
                                }
                                teamArray = Array.from(new Set (teamArray))

                                let rank_set = {
                                    "v1": {"from": 1, "to": 0},
                                    "v2": {"from": 0, "to": 0},
                                    "v3": {"from": 0, "to": 0},
                                    "v4": {"from": 0, "to": 0}
                                }
                                let rankList_option = []
                                if(rank_filter_show === true){
                                    let total_teams = teamArray.length
                                    if(total_teams % 2 === 0){
                                        let sec = total_teams/2
                                        if(sec % 2 === 0){
                                            rank_set.v1.to = sec/2
                                            rank_set.v2.to = sec
                                            rank_set.v3.to = sec*3/2
                                            rank_set.v4.to = sec*2

                                            rank_set.v2.from = rank_set.v1.to + 1
                                            rank_set.v3.from = rank_set.v2.to + 1
                                            rank_set.v4.from = rank_set.v3.to + 1
                                        }
                                        else{
                                            rank_set.v1.to = (sec - 1)/2
                                            rank_set.v2.to = sec
                                            rank_set.v3.to = sec + (sec - 1)/2
                                            rank_set.v4.to = sec*2

                                            rank_set.v2.from = rank_set.v1.to + 1
                                            rank_set.v3.from = rank_set.v2.to + 1
                                            rank_set.v4.from = rank_set.v3.to + 1
                                        }
                                    }
                                    else{
                                        let f_sec = (total_teams - 1)/2
                                        let s_sec = (total_teams - 1)/2 + 1
                                        if(f_sec % 2 === 0){
                                            rank_set.v1.to = f_sec/2
                                            rank_set.v2.to = f_sec
                                            rank_set.v2.from = rank_set.v1.to + 1
                                            rank_set.v3.from = rank_set.v2.to + 1
                                        }
                                        else{
                                            rank_set.v1.to = (f_sec - 1)/2
                                            rank_set.v2.to = f_sec
                                            rank_set.v2.from = rank_set.v1.to + 1
                                            rank_set.v3.from = rank_set.v2.to + 1
                                        }

                                        if(s_sec % 2 === 0){
                                            rank_set.v3.to = s_sec/2
                                            rank_set.v4.to = s_sec
                                            rank_set.v4.from = rank_set.v3.to + 1
                                        }
                                        else{
                                            rank_set.v3.to = f_sec + (s_sec - 1)/2
                                            rank_set.v4.to = total_teams
                                            rank_set.v4.from = rank_set.v3.to + 1
                                        }
                                    }
                                    events[k - 1].rankFilter = true
                                    events[k - 1].rank_set = rank_set
                                    rankList_option = [
                                        {"value": 1, "label": "vs All"},
                                        {"value": 2, "label": "vs High rank ( " + rank_set.v1.from + ' to ' + rank_set.v1.to + ' )'},
                                        {"value": 3, "label": "vs middle-high rank ( " + rank_set.v2.from + ' to ' + rank_set.v2.to + ' )'},
                                        {"value": 4, "label": "vs middle-low rank (" + rank_set.v3.from + ' to ' + rank_set.v3.to + ' )'},
                                        {"value": 5, "label": "vs low rank (" + rank_set.v4.from + ' to ' + rank_set.v4.to + ' )'},
                                    ]
                                    events[k - 1].rank_option = rankList_option
                                }

                                let seasonId = main_data[j].season_id
                                let event_item = main_data[j].events
                                let home_date_list = []
                                let away_date_list = []
                                let home_date_Index = 0
                                let away_date_Index = 0
                                for(let m = 0 ; m < event_item.length ; m++){
                                    for(let mm = 0 ; mm < event_item[m].events.length ; mm++){
                                        if(event_item[m].events[mm].localteamId == homeTeamId){
                                            home_date_Index++
                                            home_date_list.push({'value': home_date_Index,"date": event_item[m].events[mm].date, "label": home_date_Index})
                                        }
                                        if(event_item[m].events[mm].visitorteamId == awayTeamId){
                                            away_date_Index++
                                            away_date_list.push({'value': away_date_Index,"date": event_item[m].events[mm].date, "label": away_date_Index})
                                        }
                                    }
                                }
                                this.sortJSON(home_date_list,'date', '123');
                                this.sortJSON(away_date_list,'date', '123');

                                for(let m = 0 ; m < home_date_list.length ; m++){
                                    home_date_list[m].value = m + 1
                                    home_date_list[m].label = m + 1
                                }

                                for(let m = 0 ; m < away_date_list.length ; m++){
                                    away_date_list[m].value = m + 1
                                    away_date_list[m].label = m + 1
                                }

                                events[k - 1].homeDateList = home_date_list
                                events[k - 1].awayDateList = away_date_list
                                home.pos = main_data[j].standing.localteam_position
                                away.pos = main_data[j].standing.visitorteam_position
                                home.h_a = this.H_A_calculation(seasonId, homeTeamId, 'home')
                                away.h_a = this.H_A_calculation(seasonId, awayTeamId, 'away')

                                let swing1 = (away.pos - away.h_a) - (home.pos - home.h_a)
                                if(swing1 > 0){
                                    away.swing1 = '+'+swing1
                                    home.swing1 =''
                                }
                                else if(swing1 < 0){
                                    away.swing1 =''
                                    home.swing1 = '+'+swing1*(-1)
                                }
                                if((home.pos > home.h_a && away.pos > away.h_a) || (home.pos < home.h_a && away.pos < away.h_a)){
                                    away.swing1 =''
                                    home.swing1 =''
                                }
                                home.FH = this.FH_calculation(main_data[j].events, main_data[j].localTeamId,seasonId, 'home', next_date4, '1', {})
                                away.FH = this.FH_calculation(main_data[j].events, main_data[j].visitorTeamId,seasonId, 'away', next_date4, '1', {})

                                let swing2 =(away.pos - away.FH) -  (home.pos - home.FH)
                                if(swing2 > 0){
                                    away.swing2 = '+'+swing2
                                    home.swing2 =''
                                }
                                else if(swing2 < 0){
                                    away.swing2 =''
                                    home.swing2 = '+'+swing2*(-1)
                                }
                                if((home.pos > home.FH && away.pos > away.FH) || (home.pos < home.FH && away.pos < away.FH)){
                                    away.swing2 =''
                                    home.swing2 =''
                                }

                                home.SH = this.SH_calculation(main_data[j].events, main_data[j].localTeamId,seasonId, 'home', next_date4, '1', {})
                                away.SH = this.SH_calculation(main_data[j].events, main_data[j].visitorTeamId,seasonId, 'away', next_date4, '1', {})

                                let swing3 =(away.pos - away.SH) -  (home.pos - home.SH)
                                if(swing3 > 0){
                                    away.swing3 = '+'+swing3
                                    home.swing3 =''
                                }
                                else if(swing3 < 0){
                                    away.swing3 =''
                                    home.swing3 = '+'+swing3*(-1)
                                }
                                if((home.pos > home.SH && away.pos > away.SH) || (home.pos < home.SH && away.pos < away.SH)){
                                    away.swing3 =''
                                    home.swing3 =''
                                }

                                home.attack = this.attack_calculation(seasonId, homeTeamId, 'home')
                                away.attack = this.attack_calculation(seasonId, awayTeamId, 'away')
                                home.defense = this.defense_calculation(seasonId, homeTeamId, 'home')
                                away.defense = this.defense_calculation(seasonId, awayTeamId, 'away')
                                home.form_H_A = this.H_A_Form_calculation(main_data[j].events, main_data[j].localTeamId, seasonId, 'home', next_date4, '1', {})
                                away.form_H_A = this.H_A_Form_calculation(main_data[j].events, main_data[j].visitorTeamId, seasonId, 'away', next_date4, '1', {})
                                home.form = this.Form_calculation(main_data[j].events, main_data[j].localTeamId, seasonId, next_date4, '1', {})
                                away.form = this.Form_calculation(main_data[j].events, main_data[j].visitorTeamId, seasonId, next_date4, '1', {})

                                let percentage0 = this.percentage_calculation(main_data[j])
                                percentage = percentage0[0]
                                numbers = percentage0[1]

                                home.p = this.p_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})
                                away.p = this.p_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})
                                home.z_z = (this.zeroTozero_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.001)*100).toFixed(0)
                                away.z_z = (this.zeroTozero_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.001)*100).toFixed(0)
                                home.over15 = (this.over15_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.001)*100).toFixed(0)
                                away.over15 = (this.over15_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.001)*100).toFixed(0)
                                home.over25 = (this.over25_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.001)*100).toFixed(0)
                                away.over25 = (this.over25_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.001)*100).toFixed(0)
                                home.over35 = (this.over35_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.001)*100).toFixed(0)
                                away.over35 = (this.over35_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.001)*100).toFixed(0)
                                home.scored = (this.scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.001)*100).toFixed(0)
                                away.scored = (this.scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.001)*100).toFixed(0)
                                home.conc = (this.concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.001)*100).toFixed(0)
                                away.conc = (this.concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.001)*100).toFixed(0)
                                home.average1 = (this.average_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)).toFixed(2)
                                away.average1 = (this.average_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)).toFixed(2)
                                home.average2 = (this.average_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)).toFixed(2)
                                away.average2 = (this.average_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)).toFixed(2)
                                if(this.average_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {}) == 0){home.average1 = 0;}
                                if(this.average_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {}) == 0){away.average1 = 0;}
                                if(this.average_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {}) == 0){home.average2 = 0;}
                                if(this.average_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {}) == 0){away.average2 = 0;}
                                home.bts = (this.average_bts_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.bts = (this.average_bts_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                home.first1 = (this.FH_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.first1 = (this.FH_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                home.first2 = (this.FH_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.first2 = (this.FH_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                home.second1 = (this.SH_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.second1 = (this.SH_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                home.second2 = (this.SH_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.second2 = (this.SH_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.0001)*100).toFixed(0)

                                home.time15_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 15, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.time15_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 15, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                home.time15_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 15, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.time15_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 15, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                home.time30_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 30, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.time30_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 30, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                home.time30_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 30, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.time30_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 30, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                home.time45_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 45, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.time45_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 45, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                home.time45_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 45, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.time45_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 45, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                home.time60_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 60, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.time60_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 60, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                home.time60_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 60, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.time60_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 60, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                home.time75_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 75, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.time75_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 75, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                home.time75_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 75, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.time75_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 75, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                home.time90_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 90, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.time90_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 90, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                home.time90_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 90, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                away.time90_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 90, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                let hgs1 = this.scored_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})
                                let ags1 = this.scored_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})
                                let hgs2 = this.scored_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})
                                let ags2 = this.scored_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})
                                home.gs1 = (hgs1/(hgs1 + hgs2)*100).toFixed(0)
                                home.gs2 = (hgs2/(hgs1 + hgs2)*100).toFixed(0)
                                if((hgs1 + hgs2) == 0){home.gs1 = 0; home.gs2 = 0}
                                away.gs1 = (ags1/(ags1 + ags2)*100).toFixed(0)
                                away.gs2 = (ags2/(ags1 + ags2)*100).toFixed(0)
                                if((ags1 + ags2) == 0){away.gs1 = 0 ; away.gs2 = 0}
                                let hgc1 = this.concd_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})
                                let agc1 = this.concd_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})
                                let hgc2 = this.concd_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})
                                let agc2 = this.concd_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})
                                home.gc1 = (hgc1/(hgc1 + hgc2)*100).toFixed(0)
                                home.gc2 = (hgc2/(hgc1 + hgc2)*100).toFixed(0)
                                if((hgc1 + hgc2) == 0){home.gc1 = 0; home.gc2 = 0}
                                away.gc1 = (agc1/(agc1 + agc2)*100).toFixed(0)
                                away.gc2 = (agc2/(agc1 + agc2)*100).toFixed(0)
                                if((agc1 + agc2) == 0){away.gc1 = 0 ; away.gc2 = 0}
                                home.over40 = (this.scored_plus_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 45, '1', {})/(home.p)*100).toFixed(0)
                                away.over40 = (this.scored_plus_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 45, '1', {})/(away.p)*100).toFixed(0)
                                home.over85 = (this.scored_plus_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 90, '1', {})/(home.p)*100).toFixed(0)
                                away.over85 = (this.scored_plus_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 90, '1', {})/(away.p)*100).toFixed(0)

                                home.C_H = (this.win_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                away.C_H = (this.win_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                home.C_D = (this.draw_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                away.C_D = (this.draw_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                home.C_A = (this.loss_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                away.C_A = (this.loss_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)

                                home.lastGoal = (this.Last_goal_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                away.lastGoal = (this.Last_goal_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                if(home.p == 0){home.over40 = 0; home.over85 = 0; home.C_H = 0; home.C_D = 0; home.C_A = 0; home.lastGoal = 0}
                                if(away.p == 0){away.over40 = 0; away.over85 = 0; away.C_H = 0; away.C_D = 0; away.C_A = 0; away.lastGoal = 0}
                                home.first10 = this.one_to_zero_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})
                                away.first10 = this.one_to_zero_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})

                                home.first11 = (this.one_to_one_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.first10)*100).toFixed(0)
                                away.first11 = (this.one_to_one_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.first10)*100).toFixed(0)
                                home.first20 = (this.two_to_one_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.first10)*100).toFixed(0)
                                away.first20 = (this.two_to_one_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.first10)*100).toFixed(0)

                                if(home.first10 == 0){home.first11 = 0; home.first20 = 0}
                                if(away.first10 == 0){away.first11 = 0; away.first20 = 0}
                                home.second01 = this.zero_to_one_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})
                                away.second01 = this.zero_to_one_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})

                                home.second11 = (this.one_to_one2_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.second01)*100).toFixed(0)
                                away.second11 = (this.one_to_one2_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.second01)*100).toFixed(0)
                                home.second02 = (this.zero_to_two_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.second01)*100).toFixed(0)
                                away.second02 = (this.zero_to_two_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.second01)*100).toFixed(0)

                                if(home.second01 == 0){home.second11 = 0; home.second02 = 0}
                                if(away.second01 == 0){away.second11 = 0; away.second02 = 0}
                                home.secondplus = (this.two_score_ahead_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                away.secondplus = (this.two_score_ahead_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                home.secondminus = (this.two_score_behind_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                away.secondminus = (this.two_score_behind_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                home.homefirst = (this.H_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                away.homefirst = (this.H_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                home.drawfirst = (this.D_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                away.drawfirst = (this.D_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                home.awayfirst = (this.A_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                away.awayfirst = (this.A_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)

                                home.homesecond = (this.H_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                away.homesecond = (this.H_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                home.drawsecond = (this.D_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                away.drawsecond = (this.D_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                home.awaysecond = (this.A_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                away.awaysecond = (this.A_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                if(home.p == 0){home.secondplus = 0; home.secondminus = 0; home.homefirst = 0; home.drawfirst = 0; home.awayfirst = 0; home.homesecond = 0; home.drawsecond = 0; home.awaysecond = 0}
                                if(away.p == 0){away.secondplus = 0; away.secondminus = 0; away.homefirst = 0; away.drawfirst = 0; away.awayfirst = 0; away.homesecond = 0; away.drawsecond = 0; away.awaysecond = 0}
                            }
                        }
                        let countryName = this.countryCodeList.filter(function(item) {
                            return item.ccode == countryCode;
                        });

                        if(countryName.length > 0 && events.length > 0){
                            this.mainList.push({'country': countryName[0].cname, 'league': competitionArray[i], 'percentage': percentage, 'numbers': numbers,  'events': events})
                        }
                        else if(countryName.length < 1 && events.length > 0){
                            this.mainList.push({'country': 'International', 'league': competitionArray[i], 'percentage': percentage, 'numbers': numbers, 'events': events})
                        }
                        let self = this
                        this.sortJSON(self.mainList,'country', '123');
                    }
                    console.log('this.mainList==>',this.mainList)
                })
            },
            refresh_calculation(val, home_date, away_date, b_data){
                console.log('refresh final data check==!', val, ', ', home_date, ', ', away_date, ', ', b_data)

                let c_home_id = val.home_id
                let c_away_id = val.away_id
                let main_data = this.mainData
                for(let j = 0; j < main_data.length ; j++){
                        if(main_data[j].events.length < 45){

                            let home = {
                                p:0,
                                name:'',
                                rank: '',
                                z_z: 0,
                                over15: 0,
                                over25:0,
                                over35:0,
                                scored:0,
                                conc:0,
                                average1:0,
                                average2:0,
                                bts:0,
                                first1:0,
                                first2:0,
                                second1:0,
                                second2:0,
                                time15_S:0,
                                time30_S:0,
                                time45_S:0,
                                time60_S:0,
                                time75_S:0,
                                time90_S:0,
                                time15_C:0,
                                time30_C:0,
                                time45_C:0,
                                time60_C:0,
                                time75_C:0,
                                time90_C:0,
                                gs1:0,
                                gs2:0,
                                gc1:0,
                                gc2:0,
                                over40:0,
                                over85:0,
                                C_H:0,
                                C_D:0,
                                C_A:0,
                                first10:0,
                                first11:0,
                                first20:0,
                                second01:0,
                                second11:0,
                                second02:0,
                                firstGoal:0,
                                lastGoal:0,
                                secondplus:0,
                                secondminus:0,
                                homefirst:0,
                                drawfirst:0,
                                awayfirst:0,
                                homesecond:0,
                                drawsecond:0,
                                awaysecond:0,
                                eventdays:['All'],
                                pos:0,
                                h_a:0,
                                swing1:'',
                                FH:0,
                                swing2:'',
                                SH:0,
                                swing3:'',
                                attack:0,
                                defense:0,
                                form:0,
                                form_H_A:0

                            }
                            let away = {
                                p:0,
                                name:'',
                                rank:'' ,
                                z_z: 0,
                                over15: 0,
                                over25:0,
                                over35:0,
                                scored:0,
                                conc:0,
                                average1:0,
                                average2:0,
                                bts:0,
                                first1:0,
                                first2:0,
                                second1:0,
                                second2:0,
                                time15_S:0,
                                time30_S:0,
                                time45_S:0,
                                time60_S:0,
                                time75_S:0,
                                time90_S:0,
                                time15_C:0,
                                time30_C:0,
                                time45_C:0,
                                time60_C:0,
                                time75_C:0,
                                time90_C:0,
                                gs1:0,
                                gs2:0,
                                gc1:0,
                                gc2:0,
                                over40:0,
                                over85:0,
                                C_H:0,
                                C_D:0,
                                C_A:0,
                                first10:0,
                                first11:0,
                                first20:0,
                                second01:0,
                                second11:0,
                                second02:0,
                                firstGoal:0,
                                lastGoal:0,
                                secondPlus:0,
                                secondMinus:0,
                                homefirst:0,
                                drawfirst:0,
                                awayfirst:0,
                                homesecond:0,
                                drawsecond:0,
                                awaysecond:0,
                                eventdays:['All'],
                                pos:0,
                                h_a:0,
                                swing1: '',
                                FH:0,
                                swing2: '',
                                SH:0,
                                swing3: '',
                                attack:0,
                                defense:0,
                                form:0,
                                form_H_A:0
                            }

                            let homeTeamId = main_data[j].localTeamId
                            let awayTeamId = main_data[j].visitorTeamId

                            if(homeTeamId == c_home_id && awayTeamId == c_away_id){
                                let seasonId = main_data[j].season_id

                                home.pos = main_data[j].standing.localteam_position
                                away.pos = main_data[j].standing.visitorteam_position
                                home.h_a = this.H_A_calculation(seasonId, homeTeamId, 'home')
                                away.h_a = this.H_A_calculation(seasonId, awayTeamId, 'away')

                                let swing1 = (away.pos - away.h_a) - (home.pos - home.h_a)
                                if(swing1 > 0){
                                    away.swing1 = '+'+swing1
                                    home.swing1 =''
                                }
                                else if(swing1 < 0){
                                    away.swing1 =''
                                    home.swing1 = '+'+swing1*(-1)
                                }
                                if((home.pos > home.h_a && away.pos > away.h_a) || (home.pos < home.h_a && away.pos < away.h_a)){
                                    away.swing1 =''
                                    home.swing1 =''
                                }
                                home.FH = this.FH_calculation(b_data, main_data[j].localTeamId,seasonId, 'home', home_date, '2')
                                away.FH = this.FH_calculation(b_data, main_data[j].visitorTeamId,seasonId, 'away', away_date, '2')

                                let swing2 =(away.pos - away.FH) -  (home.pos - home.FH)
                                if(swing2 > 0){
                                    away.swing2 = '+'+swing2
                                    home.swing2 =''
                                }
                                else if(swing2 < 0){
                                    away.swing2 =''
                                    home.swing2 = '+'+swing2*(-1)
                                }
                                if((home.pos > home.FH && away.pos > away.FH) || (home.pos < home.FH && away.pos < away.FH)){
                                    away.swing2 =''
                                    home.swing2 =''
                                }

                                home.SH = this.SH_calculation(b_data, main_data[j].localTeamId,seasonId, 'home', home_date, '2')
                                away.SH = this.SH_calculation(b_data, main_data[j].visitorTeamId,seasonId, 'away', away_date, '2')

                                let swing3 =(away.pos - away.SH) -  (home.pos - home.SH)
                                if(swing3 > 0){
                                    away.swing3 = '+'+swing3
                                    home.swing3 =''
                                }
                                else if(swing3 < 0){
                                    away.swing3 =''
                                    home.swing3 = '+'+swing3*(-1)
                                }
                                if((home.pos > home.SH && away.pos > away.SH) || (home.pos < home.SH && away.pos < away.SH)){
                                    away.swing3 =''
                                    home.swing3 =''
                                }

                                home.attack = this.attack_calculation(seasonId, homeTeamId, 'home')
                                away.attack = this.attack_calculation(seasonId, awayTeamId, 'away')
                                home.defense = this.defense_calculation(seasonId, homeTeamId, 'home')
                                away.defense = this.defense_calculation(seasonId, awayTeamId, 'away')
                                home.form_H_A = this.H_A_Form_calculation(b_data, main_data[j].localTeamId, seasonId, 'home', home_date, '2')
                                away.form_H_A = this.H_A_Form_calculation(b_data, main_data[j].visitorTeamId, seasonId, 'away', away_date, '2')
                                home.form = this.Form_calculation(b_data, main_data[j].localTeamId, seasonId, home_date, '2')
                                away.form = this.Form_calculation(b_data, main_data[j].visitorTeamId, seasonId, away_date, '2')

                                home.p = this.p_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')
                                away.p = this.p_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')
                                home.z_z = (this.zeroTozero_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.001)*100).toFixed(0)
                                away.z_z = (this.zeroTozero_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.001)*100).toFixed(0)
                                home.over15 = (this.over15_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.001)*100).toFixed(0)
                                away.over15 = (this.over15_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.001)*100).toFixed(0)
                                home.over25 = (this.over25_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.001)*100).toFixed(0)
                                away.over25 = (this.over25_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.001)*100).toFixed(0)
                                home.over35 = (this.over35_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.001)*100).toFixed(0)
                                away.over35 = (this.over35_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.001)*100).toFixed(0)
                                home.scored = (this.scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.001)*100).toFixed(0)
                                away.scored = (this.scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.001)*100).toFixed(0)
                                home.conc = (this.concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.001)*100).toFixed(0)
                                away.conc = (this.concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.001)*100).toFixed(0)
                                home.average1 = (this.average_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)).toFixed(2)
                                away.average1 = (this.average_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)).toFixed(2)
                                home.average2 = (this.average_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)).toFixed(2)
                                away.average2 = (this.average_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)).toFixed(2)
                                if(this.average_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2') == 0){home.average1 = 0;}
                                if(this.average_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2') == 0){away.average1 = 0;}
                                if(this.average_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2') == 0){home.average2 = 0;}
                                if(this.average_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2') == 0){away.average2 = 0;}
                                home.bts = (this.average_bts_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.bts = (this.average_bts_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.first1 = (this.FH_1st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.first1 = (this.FH_1st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.first2 = (this.FH_2st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.first2 = (this.FH_2st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.second1 = (this.SH_1st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.second1 = (this.SH_1st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.second2 = (this.SH_2st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.second2 = (this.SH_2st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.time15_S = (this.time_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 15, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.time15_S = (this.time_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 15, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.time15_C = (this.time_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 15, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.time15_C = (this.time_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 15, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.time30_S = (this.time_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 30, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.time30_S = (this.time_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 30, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.time30_C = (this.time_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 30, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.time30_C = (this.time_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 30, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.time45_S = (this.time_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 45, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.time45_S = (this.time_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 45, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.time45_C = (this.time_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 45, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.time45_C = (this.time_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 45, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.time60_S = (this.time_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 60, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.time60_S = (this.time_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 60, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.time60_C = (this.time_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 60, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.time60_C = (this.time_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 60, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.time75_S = (this.time_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 75, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.time75_S = (this.time_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 75, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.time75_C = (this.time_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 75, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.time75_C = (this.time_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 75, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.time90_S = (this.time_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 90, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.time90_S = (this.time_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 90, '2')/(away.p + 0.0001)*100).toFixed(0)
                                home.time90_C = (this.time_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 90, '2')/(home.p + 0.0001)*100).toFixed(0)
                                away.time90_C = (this.time_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 90, '2')/(away.p + 0.0001)*100).toFixed(0)
                                let hgs1 = this.scored_1st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')
                                let ags1 = this.scored_1st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')
                                let hgs2 = this.scored_2st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')
                                let ags2 = this.scored_2st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')
                                home.gs1 = (hgs1/(hgs1 + hgs2)*100).toFixed(0)
                                home.gs2 = (hgs2/(hgs1 + hgs2)*100).toFixed(0)
                                if((hgs1 + hgs2) == 0){home.gs1 = 0; home.gs2 = 0}
                                away.gs1 = (ags1/(ags1 + ags2)*100).toFixed(0)
                                away.gs2 = (ags2/(ags1 + ags2)*100).toFixed(0)
                                if((ags1 + ags2) == 0){away.gs1 = 0 ; away.gs2 = 0}
                                let hgc1 = this.concd_1st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')
                                let agc1 = this.concd_1st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')
                                let hgc2 = this.concd_2st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')
                                let agc2 = this.concd_2st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')
                                home.gc1 = (hgc1/(hgc1 + hgc2)*100).toFixed(0)
                                home.gc2 = (hgc2/(hgc1 + hgc2)*100).toFixed(0)
                                if((hgc1 + hgc2) == 0){home.gc1 = 0; home.gc2 = 0}
                                away.gc1 = (agc1/(agc1 + agc2)*100).toFixed(0)
                                away.gc2 = (agc2/(agc1 + agc2)*100).toFixed(0)
                                if((agc1 + agc2) == 0){away.gc1 = 0 ; away.gc2 = 0}
                                home.over40 = (this.scored_plus_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 45, '2')/(home.p)*100).toFixed(0)
                                away.over40 = (this.scored_plus_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 45, '2')/(away.p)*100).toFixed(0)
                                home.over85 = (this.scored_plus_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 90, '2')/(home.p)*100).toFixed(0)
                                away.over85 = (this.scored_plus_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 90, '2')/(away.p)*100).toFixed(0)

                                home.C_H = (this.win_percentage_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                                away.C_H = (this.win_percentage_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                                home.C_D = (this.draw_percentage_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                                away.C_D = (this.draw_percentage_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                                home.C_A = (this.loss_percentage_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                                away.C_A = (this.loss_percentage_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)

                                home.lastGoal = (this.Last_goal_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                                away.lastGoal = (this.Last_goal_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                                if(home.p == 0){home.over40 = 0; home.over85 = 0; home.C_H = 0; home.C_D = 0; home.C_A = 0; home.lastGoal = 0}
                                if(away.p == 0){away.over40 = 0; away.over85 = 0; away.C_H = 0; away.C_D = 0; away.C_A = 0; away.lastGoal = 0}
                                home.first10 = this.one_to_zero_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')
                                away.first10 = this.one_to_zero_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')

                                home.first11 = (this.one_to_one_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.first10)*100).toFixed(0)
                                away.first11 = (this.one_to_one_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.first10)*100).toFixed(0)
                                home.first20 = (this.two_to_one_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.first10)*100).toFixed(0)
                                away.first20 = (this.two_to_one_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.first10)*100).toFixed(0)

                                if(home.first10 == 0){home.first11 = 0; home.first20 = 0}
                                if(away.first10 == 0){away.first11 = 0; away.first20 = 0}
                                home.second01 = this.zero_to_one_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')
                                away.second01 = this.zero_to_one_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')

                                home.second11 = (this.one_to_one2_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.second01)*100).toFixed(0)
                                away.second11 = (this.one_to_one2_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.second01)*100).toFixed(0)
                                home.second02 = (this.zero_to_two_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.second01)*100).toFixed(0)
                                away.second02 = (this.zero_to_two_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.second01)*100).toFixed(0)

                                if(home.second01 == 0){home.second11 = 0; home.second02 = 0}
                                if(away.second01 == 0){away.second11 = 0; away.second02 = 0}
                                home.secondplus = (this.two_score_ahead_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                                away.secondplus = (this.two_score_ahead_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                                home.secondminus = (this.two_score_behind_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                                away.secondminus = (this.two_score_behind_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                                home.homefirst = (this.H_1st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                                away.homefirst = (this.H_1st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                                home.drawfirst = (this.D_1st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                                away.drawfirst = (this.D_1st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                                home.awayfirst = (this.A_1st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                                away.awayfirst = (this.A_1st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)

                                home.homesecond = (this.H_2st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                                away.homesecond = (this.H_2st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                                home.drawsecond = (this.D_2st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                                away.drawsecond = (this.D_2st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                                home.awaysecond = (this.A_2st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                                away.awaysecond = (this.A_2st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                                if(home.p == 0){home.secondplus = 0; home.secondminus = 0; home.homefirst = 0; home.drawfirst = 0; home.awayfirst = 0; home.homesecond = 0; home.drawsecond = 0; home.awaysecond = 0}
                                if(away.p == 0){away.secondplus = 0; away.secondminus = 0; away.homefirst = 0; away.drawfirst = 0; away.awayfirst = 0; away.homesecond = 0; away.drawsecond = 0; away.awaysecond = 0}

                                for(let c = 0 ; c < this.mainList.length ; c++){
                                    for(let cc = 0 ; cc < this.mainList[c].events.length ; cc++){
                                        if(this.mainList[c].events[cc].home_id == homeTeamId && this.mainList[c].events[cc].away_id == awayTeamId){
                                            let home_name = this.mainList[c].events[cc].home.name
                                            let home_rank = this.mainList[c].events[cc].home.rank
                                            let away_name = this.mainList[c].events[cc].away.name
                                            let away_rank = this.mainList[c].events[cc].away.rank
                                            this.mainList[c].events[cc].home = home
                                            this.mainList[c].events[cc].away = away
                                            this.mainList[c].events[cc].home.name = home_name
                                            this.mainList[c].events[cc].home.rank = home_rank
                                            this.mainList[c].events[cc].away.name = away_name
                                            this.mainList[c].events[cc].away.rank = away_rank

                                        }
                                    }

                                }
                            }
                        }
                    }
            },
            home_rank_refresh(ranks, val){
                console.log('refresh final data check==!', val, ', ', ranks)

                let c_home_id = val.home_id
                let c_away_id = val.away_id
                let main_data = this.mainData

                let start_date4 = new Date();
                let next_date4 = start_date4.setDate(start_date4.getDate() + 0);
                next_date4 = new Date(next_date4).toISOString()
                next_date4 = next_date4.substring(0,10)

                for(let j = 0; j < main_data.length ; j++){
                    if(main_data[j].events.length < 45){

                        let home = {
                            p:0,
                            name:'',
                            rank: '',
                            z_z: 0,
                            over15: 0,
                            over25:0,
                            over35:0,
                            scored:0,
                            conc:0,
                            average1:0,
                            average2:0,
                            bts:0,
                            first1:0,
                            first2:0,
                            second1:0,
                            second2:0,
                            time15_S:0,
                            time30_S:0,
                            time45_S:0,
                            time60_S:0,
                            time75_S:0,
                            time90_S:0,
                            time15_C:0,
                            time30_C:0,
                            time45_C:0,
                            time60_C:0,
                            time75_C:0,
                            time90_C:0,
                            gs1:0,
                            gs2:0,
                            gc1:0,
                            gc2:0,
                            over40:0,
                            over85:0,
                            C_H:0,
                            C_D:0,
                            C_A:0,
                            first10:0,
                            first11:0,
                            first20:0,
                            second01:0,
                            second11:0,
                            second02:0,
                            firstGoal:0,
                            lastGoal:0,
                            secondplus:0,
                            secondminus:0,
                            homefirst:0,
                            drawfirst:0,
                            awayfirst:0,
                            homesecond:0,
                            drawsecond:0,
                            awaysecond:0,
                            eventdays:['All'],
                            pos:0,
                            h_a:0,
                            swing1:'',
                            FH:0,
                            swing2:'',
                            SH:0,
                            swing3:'',
                            attack:0,
                            defense:0,
                            form:0,
                            form_H_A:0

                        }
                        let away = this.away_team
                        let homeTeamId = main_data[j].localTeamId
                        let awayTeamId = main_data[j].visitorTeamId

                        if(homeTeamId == c_home_id && awayTeamId == c_away_id){
                            let seasonId = main_data[j].season_id

                            home.pos = main_data[j].standing.localteam_position
                            home.h_a = this.H_A_calculation(seasonId, homeTeamId, 'home')

                            let swing1 = (away.pos - away.h_a) - (home.pos - home.h_a)
                            if(swing1 > 0){
                                away.swing1 = '+'+swing1
                                home.swing1 =''
                            }
                            else if(swing1 < 0){
                                away.swing1 =''
                                home.swing1 = '+'+swing1*(-1)
                            }
                            if((home.pos > home.h_a && away.pos > away.h_a) || (home.pos < home.h_a && away.pos < away.h_a)){
                                away.swing1 =''
                                home.swing1 =''
                            }

                            home.FH = this.FH_calculation(main_data[j].events, main_data[j].localTeamId, seasonId, 'home', next_date4, '3', ranks)
                            let swing2 =(away.pos - away.FH) -  (home.pos - home.FH)
                            if(swing2 > 0){
                                away.swing2 = '+'+swing2
                                home.swing2 =''
                            }
                            else if(swing2 < 0){
                                away.swing2 =''
                                home.swing2 = '+'+swing2*(-1)
                            }
                            if((home.pos > home.FH && away.pos > away.FH) || (home.pos < home.FH && away.pos < away.FH)){
                                away.swing2 =''
                                home.swing2 =''
                            }

                            home.SH = this.SH_calculation(main_data[j].events, main_data[j].localTeamId,seasonId, 'home', next_date4, '3', ranks)
                            let swing3 =(away.pos - away.SH) -  (home.pos - home.SH)
                            if(swing3 > 0){
                                away.swing3 = '+'+swing3
                                home.swing3 =''
                            }
                            else if(swing3 < 0){
                                away.swing3 =''
                                home.swing3 = '+'+swing3*(-1)
                            }
                            if((home.pos > home.SH && away.pos > away.SH) || (home.pos < home.SH && away.pos < away.SH)){
                                away.swing3 =''
                                home.swing3 =''
                            }

                            home.attack = this.attack_calculation(seasonId, homeTeamId, 'home')
                            home.defense = this.defense_calculation(seasonId, homeTeamId, 'home')
                            home.form_H_A = this.H_A_Form_calculation(main_data[j].events, main_data[j].localTeamId, seasonId, 'home', next_date4, '3', ranks)
                            home.form = this.Form_calculation(main_data[j].events, main_data[j].localTeamId, seasonId, next_date4, '2')
                            home.p = this.p_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)
                            home.z_z = (this.zeroTozero_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.001)*100).toFixed(0)
                            home.over15 = (this.over15_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.001)*100).toFixed(0)
                            home.over25 = (this.over25_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.001)*100).toFixed(0)
                            home.over35 = (this.over35_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.001)*100).toFixed(0)
                            home.scored = (this.scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.001)*100).toFixed(0)
                            home.conc = (this.concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.001)*100).toFixed(0)
                            home.average1 = (this.average_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)).toFixed(2)
                            home.average2 = (this.average_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)).toFixed(2)
                            if(this.average_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks) == 0){home.average1 = 0;}
                            if(this.average_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks) == 0){home.average2 = 0;}
                            home.bts = (this.average_bts_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.first1 = (this.FH_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.first2 = (this.FH_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.second1 = (this.SH_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.second2 = (this.SH_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time15_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 15, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time15_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 15, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time30_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 30, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time30_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 30, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time45_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 45, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time45_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 45, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time60_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 60, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time60_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 60, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time75_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 75, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time75_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 75, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time90_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 90, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time90_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 90, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            let hgs1 = this.scored_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)
                            let hgs2 = this.scored_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)
                            home.gs1 = (hgs1/(hgs1 + hgs2)*100).toFixed(0)
                            home.gs2 = (hgs2/(hgs1 + hgs2)*100).toFixed(0)
                            if((hgs1 + hgs2) == 0){home.gs1 = 0; home.gs2 = 0}
                            let hgc1 = this.concd_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)
                            let hgc2 = this.concd_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)
                            home.gc1 = (hgc1/(hgc1 + hgc2)*100).toFixed(0)
                            home.gc2 = (hgc2/(hgc1 + hgc2)*100).toFixed(0)
                            if((hgc1 + hgc2) == 0){home.gc1 = 0; home.gc2 = 0}
                            home.over40 = (this.scored_plus_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 45, '3', ranks)/(home.p)*100).toFixed(0)
                            home.over85 = (this.scored_plus_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 90, '3', ranks)/(home.p)*100).toFixed(0)
                            home.C_H = (this.win_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.C_D = (this.draw_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.C_A = (this.loss_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)

                            home.lastGoal = (this.Last_goal_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            if(home.p == 0){home.over40 = 0; home.over85 = 0; home.C_H = 0; home.C_D = 0; home.C_A = 0; home.lastGoal = 0}
                            home.first10 = this.one_to_zero_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)
                            home.first11 = (this.one_to_one_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '2')/(home.first10)*100).toFixed(0)
                            home.first20 = (this.two_to_one_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.first10)*100).toFixed(0)
                            if(home.first10 == 0){home.first11 = 0; home.first20 = 0}
                            home.second01 = this.zero_to_one_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)
                            home.second11 = (this.one_to_one2_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.second01)*100).toFixed(0)
                            home.second02 = (this.zero_to_two_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.second01)*100).toFixed(0)
                            if(home.second01 == 0){home.second11 = 0; home.second02 = 0}
                            home.secondplus = (this.two_score_ahead_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.secondminus = (this.two_score_behind_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.homefirst = (this.H_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.drawfirst = (this.D_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.awayfirst = (this.A_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.homesecond = (this.H_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.drawsecond = (this.D_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.awaysecond = (this.A_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            if(home.p == 0){home.secondplus = 0; home.secondminus = 0; home.homefirst = 0; home.drawfirst = 0; home.awayfirst = 0; home.homesecond = 0; home.drawsecond = 0; home.awaysecond = 0}

                            for(let c = 0 ; c < this.mainList.length ; c++){
                                for(let cc = 0 ; cc < this.mainList[c].events.length ; cc++){
                                    if(this.mainList[c].events[cc].home_id == homeTeamId && this.mainList[c].events[cc].away_id == awayTeamId){
                                        let home_name = this.mainList[c].events[cc].home.name
                                        let home_rank = this.mainList[c].events[cc].home.rank
                                        let away_name = this.mainList[c].events[cc].away.name
                                        let away_rank = this.mainList[c].events[cc].away.rank
                                        this.mainList[c].events[cc].home = home
                                        this.mainList[c].events[cc].away = away
                                        this.mainList[c].events[cc].home.name = home_name
                                        this.mainList[c].events[cc].home.rank = home_rank
                                        this.mainList[c].events[cc].away.name = away_name
                                        this.mainList[c].events[cc].away.rank = away_rank

                                    }
                                }

                            }
                        }
                    }
                }
            },
            away_rank_refresh(ranks, val){
                console.log('refresh final data check==!', val, ', ', ranks)

                let c_home_id = val.home_id
                let c_away_id = val.away_id
                let main_data = this.mainData

                let start_date4 = new Date();
                let next_date4 = start_date4.setDate(start_date4.getDate() + 0);
                next_date4 = new Date(next_date4).toISOString()
                next_date4 = next_date4.substring(0,10)

                for(let j = 0; j < main_data.length ; j++){
                    if(main_data[j].events.length < 45){

                        let away = {
                            p:0,
                            name:'',
                            rank: '',
                            z_z: 0,
                            over15: 0,
                            over25:0,
                            over35:0,
                            scored:0,
                            conc:0,
                            average1:0,
                            average2:0,
                            bts:0,
                            first1:0,
                            first2:0,
                            second1:0,
                            second2:0,
                            time15_S:0,
                            time30_S:0,
                            time45_S:0,
                            time60_S:0,
                            time75_S:0,
                            time90_S:0,
                            time15_C:0,
                            time30_C:0,
                            time45_C:0,
                            time60_C:0,
                            time75_C:0,
                            time90_C:0,
                            gs1:0,
                            gs2:0,
                            gc1:0,
                            gc2:0,
                            over40:0,
                            over85:0,
                            C_H:0,
                            C_D:0,
                            C_A:0,
                            first10:0,
                            first11:0,
                            first20:0,
                            second01:0,
                            second11:0,
                            second02:0,
                            firstGoal:0,
                            lastGoal:0,
                            secondplus:0,
                            secondminus:0,
                            homefirst:0,
                            drawfirst:0,
                            awayfirst:0,
                            homesecond:0,
                            drawsecond:0,
                            awaysecond:0,
                            eventdays:['All'],
                            pos:0,
                            h_a:0,
                            swing1:'',
                            FH:0,
                            swing2:'',
                            SH:0,
                            swing3:'',
                            attack:0,
                            defense:0,
                            form:0,
                            form_H_A:0

                        }
                        let home = this.home_team
                        let homeTeamId = main_data[j].localTeamId
                        let awayTeamId = main_data[j].visitorTeamId

                        if(homeTeamId == c_home_id && awayTeamId == c_away_id){
                            let seasonId = main_data[j].season_id

                            away.pos = main_data[j].standing.visitorteam_position
                            away.h_a = this.H_A_calculation(seasonId, awayTeamId, 'away')

                            let swing1 = (away.pos - away.h_a) - (home.pos - home.h_a)
                            if(swing1 > 0){
                                away.swing1 = '+'+swing1
                                home.swing1 =''
                            }
                            else if(swing1 < 0){
                                away.swing1 =''
                                home.swing1 = '+'+swing1*(-1)
                            }
                            if((home.pos > home.h_a && away.pos > away.h_a) || (home.pos < home.h_a && away.pos < away.h_a)){
                                away.swing1 =''
                                home.swing1 =''
                            }
                            away.FH = this.FH_calculation(main_data[j].events, main_data[j].visitorTeamId, seasonId, 'away', next_date4, '3', ranks)

                            let swing2 =(away.pos - away.FH) -  (home.pos - home.FH)
                            if(swing2 > 0){
                                away.swing2 = '+'+swing2
                                home.swing2 =''
                            }
                            else if(swing2 < 0){
                                away.swing2 =''
                                home.swing2 = '+'+swing2*(-1)
                            }
                            if((home.pos > home.FH && away.pos > away.FH) || (home.pos < home.FH && away.pos < away.FH)){
                                away.swing2 =''
                                home.swing2 =''
                            }
                            away.SH = this.SH_calculation(main_data[j].events, main_data[j].visitorTeamId,seasonId, 'away', next_date4, '3', ranks)

                            let swing3 =(away.pos - away.SH) -  (home.pos - home.SH)
                            if(swing3 > 0){
                                away.swing3 = '+'+swing3
                                home.swing3 =''
                            }
                            else if(swing3 < 0){
                                away.swing3 =''
                                home.swing3 = '+'+swing3*(-1)
                            }
                            if((home.pos > home.SH && away.pos > away.SH) || (home.pos < home.SH && away.pos < away.SH)){
                                away.swing3 =''
                                home.swing3 =''
                            }

                            away.attack = this.attack_calculation(seasonId, awayTeamId, 'away')
                            away.defense = this.defense_calculation(seasonId, awayTeamId, 'away')
                            away.form_H_A = this.H_A_Form_calculation(main_data[j].events, main_data[j].visitorTeamId, seasonId, 'away', next_date4, '3', ranks)
                            away.form = this.Form_calculation(main_data[j].events, main_data[j].visitorTeamId, seasonId, next_date4, '2')
                            away.p = this.p_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)
                            away.z_z = (this.zeroTozero_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.001)*100).toFixed(0)
                            away.over15 = (this.over15_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.001)*100).toFixed(0)
                            away.over25 = (this.over25_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.001)*100).toFixed(0)
                            away.over35 = (this.over35_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.001)*100).toFixed(0)
                            away.scored = (this.scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.001)*100).toFixed(0)
                            away.conc = (this.concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.001)*100).toFixed(0)
                            away.average1 = (this.average_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)).toFixed(2)
                            away.average2 = (this.average_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)).toFixed(2)
                            if(this.average_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks) == 0){away.average1 = 0;}
                            if(this.average_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks) == 0){away.average2 = 0;}
                            away.bts = (this.average_bts_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.first1 = (this.FH_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.first2 = (this.FH_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.second1 = (this.SH_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.second2 = (this.SH_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time15_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 15, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time15_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 15, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time30_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 30, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time30_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 30, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time45_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 45, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time45_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 45, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time60_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 60, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time60_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 60, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time75_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 75, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time75_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 75, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time90_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 90, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time90_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 90, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            let ags1 = this.scored_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)
                            let ags2 = this.scored_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)
                            away.gs1 = (ags1/(ags1 + ags2)*100).toFixed(0)
                            away.gs2 = (ags2/(ags1 + ags2)*100).toFixed(0)
                            if((ags1 + ags2) == 0){away.gs1 = 0 ; away.gs2 = 0}
                            let agc1 = this.concd_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)
                            let agc2 = this.concd_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)
                            away.gc1 = (agc1/(agc1 + agc2)*100).toFixed(0)
                            away.gc2 = (agc2/(agc1 + agc2)*100).toFixed(0)
                            if((agc1 + agc2) == 0){away.gc1 = 0 ; away.gc2 = 0}
                            away.over40 = (this.scored_plus_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 45, '3', ranks)/(away.p)*100).toFixed(0)
                            away.over85 = (this.scored_plus_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 90, '3', ranks)/(away.p)*100).toFixed(0)
                            away.C_H = (this.win_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.C_D = (this.draw_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.C_A = (this.loss_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.lastGoal = (this.Last_goal_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            if(away.p == 0){away.over40 = 0; away.over85 = 0; away.C_H = 0; away.C_D = 0; away.C_A = 0; away.lastGoal = 0}
                            away.first10 = this.one_to_zero_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)
                            away.first11 = (this.one_to_one_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.first10)*100).toFixed(0)
                            away.first20 = (this.two_to_one_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.first10)*100).toFixed(0)
                            if(away.first10 == 0){away.first11 = 0; away.first20 = 0}
                            away.second01 = this.zero_to_one_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)
                            away.second11 = (this.one_to_one2_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.second01)*100).toFixed(0)
                            away.second02 = (this.zero_to_two_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.second01)*100).toFixed(0)
                            if(away.second01 == 0){away.second11 = 0; away.second02 = 0}
                            away.secondplus = (this.two_score_ahead_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.secondminus = (this.two_score_behind_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.homefirst = (this.H_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.drawfirst = (this.D_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.awayfirst = (this.A_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.homesecond = (this.H_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.drawsecond = (this.D_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.awaysecond = (this.A_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            if(away.p == 0){away.secondplus = 0; away.secondminus = 0; away.homefirst = 0; away.drawfirst = 0; away.awayfirst = 0; away.homesecond = 0; away.drawsecond = 0; away.awaysecond = 0}

                            for(let c = 0 ; c < this.mainList.length ; c++){
                                for(let cc = 0 ; cc < this.mainList[c].events.length ; cc++){
                                    if(this.mainList[c].events[cc].home_id == homeTeamId && this.mainList[c].events[cc].away_id == awayTeamId){
                                        let home_name = this.mainList[c].events[cc].home.name
                                        let home_rank = this.mainList[c].events[cc].home.rank
                                        let away_name = this.mainList[c].events[cc].away.name
                                        let away_rank = this.mainList[c].events[cc].away.rank
                                        this.mainList[c].events[cc].home = home
                                        this.mainList[c].events[cc].away = away
                                        this.mainList[c].events[cc].home.name = home_name
                                        this.mainList[c].events[cc].home.rank = home_rank
                                        this.mainList[c].events[cc].away.name = away_name
                                        this.mainList[c].events[cc].away.rank = away_rank

                                    }
                                }

                            }
                        }
                    }
                }
            },
            home_rank_filter(val){
                if(val === 1){
                    console.log("ALL")
                    let data = this.item_X
                    let ranks = {"from": 0, "to": 50}
                    this.home_rank_refresh(ranks, data)
                }
                else if(val === 2){
                    console.log(this.rank_filter.v1)
                    let data = this.item_X
                    let ranks = this.rank_filter.v1
                    this.home_rank_refresh(ranks, data)
                }
                else if(val === 3){
                    console.log(this.rank_filter.v2)
                    let data = this.item_X
                    let ranks = this.rank_filter.v2
                    this.home_rank_refresh(ranks, data)
                }
                else if(val === 4){
                    console.log(this.rank_filter.v3)
                    let data = this.item_X
                    let ranks = this.rank_filter.v3
                    this.home_rank_refresh(ranks, data)
                }
                else if(val === 5){
                    console.log(this.rank_filter.v4)
                    let data = this.item_X
                    let ranks = this.rank_filter.v4
                    this.home_rank_refresh(ranks, data)
                }
            },
            away_rank_filter(val){
                if(val === 1){
                    console.log("ALL")
                    let data = this.item_X
                    let ranks = {"from": 0, "to": 50}
                    this.away_rank_refresh(ranks, data)
                }
                else if(val === 2){
                    console.log(this.rank_filter.v1)
                    let data = this.item_X
                    let ranks = this.rank_filter.v1
                    this.away_rank_refresh(ranks, data)
                }
                else if(val === 3){
                    console.log(this.rank_filter.v2)
                    let data = this.item_X
                    let ranks = this.rank_filter.v2
                    this.away_rank_refresh(ranks, data)
                }
                else if(val === 4){
                    console.log(this.rank_filter.v3)
                    let data = this.item_X
                    let ranks = this.rank_filter.v3
                    this.away_rank_refresh(ranks, data)
                }
                else if(val === 5){
                    console.log(this.rank_filter.v4)
                    let data = this.item_X
                    let ranks = this.rank_filter.v4
                    this.away_rank_refresh(ranks, data)
                }
            },
            sortJSON(data, key){
                return data.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            }
        },
        created() {
            this.readData()
        }
    }
</script>
<style>
    .rank_filter{
        margin-bottom: 0px;
    }
    .rank_filter select{
        border-radius: 0px;
        height: 24px;
        padding: 0;
        padding-left: 5px;
        padding-right: 5px;
    }
    .eventdays select{
        padding-left: 5px;
    }
    .eventdays{
        width: 55px;
        float: left;
        margin-left: 10px;
        margin-right: 10px;
    }
    .eventdays select{
        height: 25px;
        border-radius: 0;
        padding: 0;
        padding-left: 5px;
    }
    .eventdays.date-range{
        margin-top: 8px;
    }
    .event-list{
        background: #dff0d8;
        padding: 7px 12px;
        font-weight: 600;
        cursor: pointer;
    }
    .event-content{
        background: #effaeb;
        font-size: 13px;
        padding: 7px 12px;
        cursor: pointer;
    }
    .event-graph{
        height: 803px;
        background: #f9f9f9;
    }
    .event-graph-header{
        background: #b1a0c7;
        height: 40px;
        padding: 9px 0px;
        font-size: 13px;
        font-weight: 600;
    }
    .graph1{
        height: 100px;
        padding: 9px 0px;
        font-size: 13px;
        font-weight: 600;
    }
    .graph-detail{
        width: 40px;
        height: 50px;
        padding: 10px 5px;
        border: 1px solid #bebebe;
        position: relative;
        margin: auto;
    }
    .graph-detail1{
        width: 80px;
        height: 50px;
        padding: 10px 5px;
        /*border: 1px solid #bebebe;*/
        position: relative;
        margin: auto;
    }
    .graph-inner{
        height: 20px;
        background: #00cc00;
        position: absolute;
        width: 28px;
        bottom: 0px;
    }
    .graph-label{
        position: absolute;
        top: 48px;
        font-size: 12px;
        left: 7px;
        font-weight: normal;
    }
    .graph-label1{
        position: absolute;
        top: 48px;
        font-size: 12px;
        left: 45px;
        font-weight: normal;
    }
    .graph-detail00{
        margin: auto;
        text-align: center;
        min-width: 40px;
        float: left;
        width: 4%;
        position: relative;
        height: 40px; top: -9px;
        padding-top: 9px;
    }
    .graph-percent{
        height: 50px;
    }
    .graph-percent0{
        height: 70px;
    }
</style>
