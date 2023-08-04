<template>
    <div style="min-width: 1250px">
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
                            <div class="event-graph"
                            >
                                <label>Unit analysis and stats_</label>
                                <div class="unit-analysis">
                                    <div class="homeTeam_Container">
                                        <CRow style="margin: 0px;">
                                            <CCol sm="6" style="padding: 10px; border-right: 1px solid lightgray;">
                                                <div class="home_main_tab">
                                                    <label style="float:left;">Home Team: <span style="font-weight: 700; color: darkblue;">{{item1.homeTeamName}}</span></label>
                                                    <label style="margin-left: 3%; float: left;">Lineup (pre): <span style="font-weight: 600; color: darkblue">{{item1.homeTeamPformation}}</span></label>
                                                    <label style="margin-left: 3%; float: left;">Manual: </label>
                                                    <CSelect
                                                            @click = "selected_team = item1.homeTeamName, selected_direction = 'home'"
                                                            class="lineup-selector"
                                                            :options="lineup_list"
                                                            @update:value="select_lineup"
                                                    >
                                                    </CSelect>
                                                    <label style="margin-left: 3%">Used: ##</label>
                                                    <div class="content" style="color: black;">
                                                        <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black;">
                                                            <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                S.Role
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                M.R
                                                            </div>
                                                            <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                Line Up Home
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                Sub
                                                            </div>
                                                            <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                Market Value
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                P.M.Role
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                Primary_Role
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                Alt.Role1
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                Alt.Role2
                                                            </div>
                                                            <div style="width: 13%;">
                                                                Titularity %
                                                            </div>
                                                        </div>
                                                        <div v-for="item2 in item1.homeTeam" :key="item2.index" style="display: flex; text-align: center; background: #d8e4bc">
                                                            <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                {{item2.sRole}}
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                {{item2.mR}}
                                                            </div>
                                                            <div :style="{'height': '18px','overflow': 'hidden', 'width': '20%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'left', 'padding-left': '5px', 'background': item2.sub_order_color}">
                                                                {{item2.Pname}}
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                {{item2.sub_minute}}
                                                            </div>
                                                            <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                {{item2.marketValue}}
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                {{item2.p_m_Role}}
                                                            </div>
                                                            <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'background': item2.rule_color}">
                                                                {{item2.primaryRole}}
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                {{item2.altRole1}}
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                {{item2.altRole2}}
                                                            </div>
                                                            <div style="width: 13%;">
                                                                {{item2.Tit}}
                                                            </div>
                                                        </div>
                                                        <div style="padding-top: 2%; height: 45px;">
                                                            <label style="margin-left: 3%;float: left;">Lineup (live): <span style="font-weight: 600; color: darkblue">{{item1.homeTeamLformation}}</span></label>
                                                            <label style="margin-left: 3%; float: left;">Manual: </label>
                                                            <CSelect
                                                                    @click = "selected_team = item1.homeTeamName, selected_direction = 'home'"
                                                                    class="lineup-selector"
                                                                    :options="lineup_list"
                                                                    @update:value="select_lineup1"
                                                            >
                                                            </CSelect>
                                                        </div>
                                                        <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black;">
                                                            <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                S.Role
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                M.R
                                                            </div>
                                                            <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                Line Up Home
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                Sub
                                                            </div>
                                                            <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                Market Value
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                P.M.Role
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                Primary_Role
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                Alt.Role1
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                Alt.Role2
                                                            </div>
                                                            <div style="width: 13%;">
                                                                Titularity %
                                                            </div>
                                                        </div>
                                                        <div v-for="item2 in item1.homeTeam1" :key="item2.index" style="display: flex; text-align: center; background: #d8e4bc">
                                                            <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                {{item2.sRole}}
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                {{item2.mR}}
                                                            </div>
                                                            <div :style="{'height': '18px','overflow': 'hidden', 'width': '20%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'left', 'padding-left': '5px', 'background': item2.sub_order_color}">
                                                                {{item2.Pname}}
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                {{item2.sub_minute}}
                                                            </div>
                                                            <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                {{item2.marketValue}}
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                {{item2.p_m_Role}}
                                                            </div>
                                                            <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'background': item2.rule_color}">
                                                                {{item2.primaryRole}}
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                {{item2.altRole1}}
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                {{item2.altRole2}}
                                                            </div>
                                                            <div style="width: 13%;">
                                                                {{item2.Tit}}
                                                            </div>
                                                        </div>
                                                        <br><br>
                                                        <div style="width: 17%; float: left; height: 62px; padding-left: 20px;">
                                                            Role legend:
                                                        </div>
                                                        <div style="width: 43%; float: left; height: 62px;">
                                                            <div style="display: flex;">
                                                                <div style="flex: 2; height: 20px; background: #92d050; text-align: center;">{{item1.home_rule_set.green_color}}</div>
                                                                <div style="flex: 5; padding-left: 5px;">Player in Role</div>
                                                            </div>
                                                            <div style="display: flex;">
                                                                <div style="flex: 2; height: 20px; background: #ffff00; text-align: center;">{{item1.home_rule_set.yellow_color}}</div>
                                                                <div style="flex: 5; padding-left: 5px;">Player in alternative Role</div>
                                                            </div>
                                                            <div style="display: flex;">
                                                                <div style="flex: 2; height: 20px; background: #ff0000; text-align: center;">{{item1.home_rule_set.red_color}}</div>
                                                                <div style="flex: 5; padding-left: 5px;">Player out of role</div>
                                                            </div>
                                                        </div>
                                                        <div style="width: 15%; float: left; height: 62px; text-align: right;">
                                                            Subst.legend:
                                                        </div>
                                                        <div style="width: 25%; float: left; text-align: center; margin-bottom: 10px;">
                                                            <div v-for="item4  in item1.home_legend" :key="item4.index" style="display: flex; width: 80%; margin: auto;">
                                                                <div :style="{'flex': '1', 'height': '20px', 'background': item4.color}">{{item4.label}}</div>
                                                            </div>
                                                        </div>
                                                        <br><br>
                                                        <div style="width: 30%; float: left; background: #d8e4bc; padding: 5px; margin-bottom: 20px;">
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    MVP H
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    MVP H %
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    100.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    75.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    67.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    40.00 %
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style="width: 30%; float: left; background: #d8e4bc; padding: 5px; margin-bottom: 20px; margin-left: 5%;">
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    MVP H
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    MVP H %
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    100.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    75.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    67.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    40.00 %
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style="width: 30%; float: left; background: #d8e4bc; padding: 5px; margin-bottom: 20px; margin-left: 5%;">
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    MVP H
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    MVP H %
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    100.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    75.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    67.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    40.00 %
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CCol>
                                            <CCol sm="6" style="padding: 10px;">
                                                <div class="home_main_tab">
                                                    <label style="float:left;">Away Team: <span style="font-weight: 700; color: darkblue;">{{item1.awayTeamName}}</span></label>
                                                    <label style="margin-left: 3%; float: left;">Lineup (pre): <span style="font-weight: 600; color: darkblue">{{item1.awayTeamPformation}}</span></label>
                                                    <label style="margin-left: 3%; float: left;">Manual: </label>
                                                    <CSelect
                                                            @click = "selected_team = item1.awayTeamName, selected_direction = 'away'"
                                                            class="lineup-selector"
                                                            :options="lineup_list"
                                                            @update:value="select_lineup"
                                                    >
                                                    </CSelect>
                                                    <label style="margin-left: 3%">Used: ##</label>
                                                    <div class="content" style="color: black;">
                                                        <div style="display: flex; text-align: center; background: #e6b8b7; border-bottom: 1px solid white; height: 20px; color: black;">
                                                            <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                S.Role
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                M.R
                                                            </div>
                                                            <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                Line Up Home
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                Sub
                                                            </div>
                                                            <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                Market Value
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                P.M.Role
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                Primary_Role
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                Alt.Role1
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                Alt.Role2
                                                            </div>
                                                            <div style="width: 13%;">
                                                                Titularity %
                                                            </div>
                                                        </div>
                                                        <div v-for="item3 in item1.awayTeam" :key="item3.index" style="display: flex; text-align: center; background: #e6b8b7">
                                                            <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                {{item3.sRole}}
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                {{item3.mR}}
                                                            </div>
                                                            <div :style="{'height': '18px','overflow': 'hidden', 'width': '20%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'left', 'padding-left': '5px', 'background': item3.sub_order_color}">
                                                                {{item3.Pname}}
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                {{item3.sub_minute}}
                                                            </div>
                                                            <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                {{item3.marketValue}}
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                {{item3.p_m_Role}}
                                                            </div>
                                                            <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'background': item3.rule_color}">
                                                                {{item3.primaryRole}}
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                {{item3.altRole1}}
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                {{item3.altRole2}}
                                                            </div>
                                                            <div style="width: 13%;">
                                                                {{item3.Tit}}
                                                            </div>
                                                        </div>
                                                        <div style="padding-top: 2%; height: 45px;">
                                                            <label style="margin-left: 3%; float: left;">Lineup (live): <span style="font-weight: 600; color: darkblue">{{item1.awayTeamLformation}}</span></label>
                                                            <label style="margin-left: 3%; float: left;">Manual: </label>
                                                            <CSelect
                                                                    @click = "selected_team = item1.awayTeamName, selected_direction = 'away'"
                                                                    class="lineup-selector"
                                                                    :options="lineup_list"
                                                                    @update:value="select_lineup1"
                                                            >
                                                            </CSelect>
                                                        </div>
                                                        <div style="display: flex; text-align: center; background: #e6b8b7; border-bottom: 1px solid white; height: 20px; color: black;">
                                                            <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                S.Role
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                M.R
                                                            </div>
                                                            <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                Line Up Home
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                Sub
                                                            </div>
                                                            <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                Market Value
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                P.M.Role
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                Primary_Role
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                Alt.Role1
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                Alt.Role2
                                                            </div>
                                                            <div style="width: 13%;">
                                                                Titularity %
                                                            </div>
                                                        </div>
                                                        <div v-for="item3 in item1.awayTeam1" :key="item3.index" style="display: flex; text-align: center; background: #e6b8b7">
                                                            <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                {{item3.sRole}}
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                {{item3.mR}}
                                                            </div>
                                                            <div :style="{'height': '18px','overflow': 'hidden', 'width': '20%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'left', 'padding-left': '5px', 'background': item3.sub_order_color}">
                                                                {{item3.Pname}}
                                                            </div>
                                                            <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                {{item3.sub_minute}}
                                                            </div>
                                                            <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                {{item3.marketValue}}
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                {{item3.p_m_Role}}
                                                            </div>
                                                            <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'background': item3.rule_color}">
                                                                {{item3.primaryRole}}
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                {{item3.altRole1}}
                                                            </div>
                                                            <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                {{item3.altRole2}}
                                                            </div>
                                                            <div style="width: 13%;">
                                                                {{item3.Tit}}
                                                            </div>
                                                        </div>
                                                        <br><br>
                                                        <div style="width: 20%; float: left; height: 62px; padding-left: 20px;">
                                                            Role legend:
                                                        </div>
                                                        <div style="width: 40%; float: left; height: 62px;">
                                                            <div style="display: flex;">
                                                                <div style="flex: 1; height: 20px; background: #92d050; text-align: center;">{{item1.away_rule_set.green_color}}</div>
                                                                <div style="flex: 2; padding-left: 5px;">Player in Role</div>
                                                            </div>
                                                            <div style="display: flex;">
                                                                <div style="flex: 1; height: 20px; background: #ffff00; text-align: center;">{{item1.away_rule_set.yellow_color}}</div>
                                                                <div style="flex: 2; padding-left: 5px;">Player in alternative Role</div>
                                                            </div>
                                                            <div style="display: flex;">
                                                                <div style="flex: 1; height: 20px; background: #ff0000; text-align: center;">{{item1.away_rule_set.red_color}}</div>
                                                                <div style="flex: 2; padding-left: 5px;">Player out of role</div>
                                                            </div>
                                                        </div>
                                                        <div style="width: 15%; float: left; height: 62px; text-align: right;">
                                                            Subst.legend:
                                                        </div>
                                                        <div style="width: 25%; float: left; text-align: center; margin-bottom: 10px;">
                                                            <div v-for="item4  in item1.away_legend" :key="item4.index" style="display: flex; width: 80%; margin: auto;">
                                                                <div :style="{'flex': '1', 'height': '20px', 'background': item4.color}">{{item4.label}}</div>
                                                            </div>
                                                        </div>
                                                        <br><br>
                                                        <div style="width: 30%; float: left; background: #e6b8b7; padding: 5px; margin-bottom: 20px;">
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    MVP H
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    MVP H %
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    100.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    75.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    67.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    40.00 %
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style="width: 30%; float: left; background: #e6b8b7; padding: 5px; margin-bottom: 20px; margin-left: 5%;">
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    MVP H
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    MVP H %
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    100.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    75.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    67.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    40.00 %
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style="width: 30%; float: left; background: #e6b8b7; padding: 5px; margin-bottom: 20px; margin-left: 5%;">
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    MVP H
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    MVP H %
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    100.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    75.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    67.00 %
                                                                </div>
                                                            </div>
                                                            <div style="display: flex">
                                                                <div style="flex: 1;">
                                                                    Hplayer
                                                                </div>
                                                                <div style="flex: 1; text-align: right;">
                                                                    40.00 %
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CCol>
                                        </CRow>
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
                sub_color_set:[
                    {'color': '#c6d9ec', 'label': '1st Substitution'},
                    {'color': '#9fbedf', 'label': '2nd Substitution'},
                    {'color': '#79a6d2', 'label': '3rd Substitution'},
                    {'color': '#6699cc', 'label': '4th Substitution'},
                    {'color': '#538cc6', 'label': '5th Substitution'},
                    {'color': '#4080be', 'label': '6th Substitution'},
                    {'color': '#4080be', 'label': '7th Substitution'},
                    {'color': '#4080be', 'label': '8th Substitution'},
                    {'color': '#4080be', 'label': '9th Substitution'},
                    {'color': '#4080be', 'label': '10th Substitution'},
                    {'color': '#4080be', 'label': '8th Substitution'},
                    {'color': '#4080be', 'label': '9th Substitution'},
                    {'color': '#4080be', 'label': '10th Substitution'},
                ],
                s_role_set:[
                    {
                        "name": "4-3-1-2",
                        "s_role":["GK", "RB", "CB", "CB", "LB", "CM", "CM", "CM", "AM", "CF", "CF"],
                        "alt_s_role":["", "", "", "", "", "", "", "", "SS", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                    {
                        "name": "4-3-3",
                        "s_role":["GK", "RB", "CB", "CB", "LB", "CM", "CM", "CM", "RW", "CF", "LW"],
                        "alt_s_role":["", "", "", "", "", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "FWD", "FWD", "FWD"]
                    },
                    {
                        "name": "4-3-2-1",
                        "s_role":["GK", "RB", "CB", "CB", "LB", "CM", "CM", "CM", "AM", "AM", "CF"],
                        "alt_s_role":["", "", "", "", "", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "4-4-2",
                        "s_role":["GK", "RB", "CB", "CB", "LB", "RM", "CM", "CM", "LM", "CF", "CF"],
                        "alt_s_role":["", "", "", "", "", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                    {
                        "name": "4-2-3-1",
                        "s_role":["GK", "RB", "CB", "CB", "LB", "DM", "DM", "RM", "AM", "LM", "CF"],
                        "alt_s_role":["", "", "", "", "", "", "", "RW", "", "LW", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "4-4-1-1",
                        "s_role":["GK", "RB", "CB", "CB", "LB", "RM", "CM", "CM", "LM", "SS", "CF"],
                        "alt_s_role":["", "", "", "", "", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                    {
                        "name": "5-4-1",
                        "s_role":["GK", "RB", "CB", "CB", "CB", "LB", "RM", "CM", "CM", "LM", "CF"],
                        "alt_s_role":["", "", "", "", "", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "3-4-1-2",
                        "s_role":["GK", "CB", "CB", "CB", "RM", "CM", "CM", "LM", "AM", "CF", "CF"],
                        "alt_s_role":["", "", "", "", "", "DM", "DM", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                    {
                        "name": "3-5-2",
                        "s_role":["GK", "CB", "CB", "CB", "RM", "CM", "CM", "CM", "LM", "CF", "CF"],
                        "alt_s_role":["", "", "", "", "", "", "DM", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                    {
                        "name": "3-5-1-1",
                        "s_role":["GK", "CB", "CB", "CB", "RM", "CM", "CM", "CM", "LM", "AM", "CF"],
                        "alt_s_role":["", "", "", "", "", "", "DM", "", "", "SS", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "3-4-2-1",
                        "s_role":["GK", "CB", "CB", "CB", "RM", "CM", "CM", "LM", "AM", "AM", "CF"],
                        "alt_s_role":["", "", "", "", "", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "5-3-2",
                        "s_role":["GK", "RB", "CB", "CB", "CB", "LB", "CM", "CM", "CM", "CF", "CF"],
                        "alt_s_role":["", "", "", "", "", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                    {
                        "name": "5-3-1-1",
                        "s_role":["GK", "RB", "CB", "CB", "CB", "LB", "CM", "CM", "CM", "AM", "CF"],
                        "alt_s_role":["", "", "", "", "", "", "", "", "", "SS", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "4-5-1",
                        "s_role":["GK", "RB", "CB", "CB", "LB", "RM", "CM", "CM", "CM", "LM", "CF"],
                        "alt_s_role":["", "", "", "", "", "RW", "", "DM", "", "LW", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "4-1-4-1",
                        "s_role":["GK", "CB", "CB", "CB", "CB", "DM", "RM", "CM", "CM", "LM", "CF"],
                        "alt_s_role":["", "RB", "", "", "LB", "CM", "AM", "AM", "AM", "AM", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "4-1-3-2",
                        "s_role":["GK", "CB", "CB", "CB", "CB", "DM", "AM", "AM", "AM", "CF", "CF"],
                        "alt_s_role":["", "RB", "", "", "LB", "CM", "RM", "", "LM", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                    {
                        "name": "3-4-3",
                        "s_role":["GK", "CB", "CB", "CB", "RM", "CM", "CM", "LM", "RW", "CF", "LW"],
                        "alt_s_role":["", "", "", "", "", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "FWD", "FWD", "FWD"]
                    },
                    {
                        "name": "3-1-4-2",
                        "s_role":["GK", "CB", "CB", "CB", "DM", "RM", "CM", "CM", "LM", "CF", "CF"],
                        "alt_s_role":["", "", "", "", "", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                ],
                lineup_list:[
                    { value: '0', label: 'Auto'},
                    { value: '4-3-1-2', label: '4-3-1-2'},
                    { value: '4-3-3', label: '4-3-3'},
                    { value: '4-3-2-1', label: '4-3-2-1'},
                    { value: '4-4-2', label: '4-4-2'},
                    { value: '4-2-3-1', label: '4-2-3-1'},
                    { value: '4-4-1-1', label: '4-4-1-1'},
                    { value: '5-4-1', label: '5-4-1'},
                    { value: '3-4-1-2', label: '3-4-1-2'},
                    { value: '3-5-2', label: '3-5-2'},
                    { value: '3-5-1-1', label: '3-5-1-1'},
                    { value: '3-4-2-1', label: '3-4-2-1'},
                    { value: '5-3-2', label: '5-3-2'},
                    { value: '5-3-1-1', label: '5-3-1-1'},
                    { value: '4-5-1', label: '4-5-1'},
                    { value: '4-1-4-1', label: '4-1-4-1'},
                    { value: '4-1-3-2', label: '4-1-3-2'},
                    { value: '3-4-3', label: '3-4-3'},
                    { value: '3-1-4-2', label: '3-1-4-2'}
                ],
                selected_team: '',
                selected_direction: ''
            }
        },
        // sub_color_set:[
        //     'rgba(236,242,249)',
        //     'rgba(217,230,242)',
        //     '#c6d9ec',
        //     '#b3cce6',
        //     '#9fbedf',
        //     '#8cb3d9',
        //     '#79a6d2',
        //     '#6699cc',
        //     '#538cc6',
        //     '#4080be'
        // ]
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

                if(data.localTeamId === 1858){
                    console.log('percentage calculation', name1, p)
                }

                return [p, name1]
            },
            select_lineup(value){
                for(let i = 0 ; i < this.mainList.length ; i++){
                    for(let j = 0 ; j < this.mainList[i].events.length ; j++){
                        let eventNode = this.mainList[i].events[j]
                        if(this.selected_direction === 'home' && this.selected_team === eventNode.homeTeamName){
                            if(value !== '0'){
                                for(let k = 0 ; k < eventNode.homeTeam.length ; k++){
                                    let s_roles = this.s_role_set.filter(function(item) {
                                        return item.name === value;
                                    });
                                    console.log('s roles===>', s_roles, eventNode.homeTeam[k])
                                    if(s_roles.length > 0){
                                        let position_number = eventNode.homeTeam[k].formation_position
                                        // let s_role = s_roles[0].s_role[k]
                                        // let s_role12 = s_roles[0].alt_s_role[k]
                                        // let mean_role = s_roles[0].mean_role[k]

                                        let s_role = s_roles[0].s_role[position_number - 1]
                                        let s_role12 = s_roles[0].alt_s_role[position_number - 1]
                                        let mean_role = s_roles[0].mean_role[position_number - 1]

                                        this.mainList[i].events[j].homeTeam[k].sRole = s_role
                                        this.mainList[i].events[j].homeTeam[k].sRole2 = s_role12
                                        this.mainList[i].events[j].homeTeam[k].mR = mean_role
                                        console.log('s_role=>', s_role)
                                        console.log('s_role12=>', s_role12)
                                        console.log('mean_role=>', mean_role)
                                        console.log('formation_position=>', position_number)
                                        let main_role = this.mainList[i].events[j].homeTeam[k].primaryRole
                                        let position = this.mainList[i].events[j].homeTeam[k].p_m_Role
                                        let alt_role1 = this.mainList[i].events[j].homeTeam[k].altRole1
                                        let alt_role2 = this.mainList[i].events[j].homeTeam[k].altRole2
                                        let s_role2 = this.mainList[i].events[j].homeTeam[k].sRole2
                                        let rule_color = 'rgb(216, 228, 188)'
                                        if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                            rule_color = 'rgb(146,208,80)'
                                        }
                                        else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                            rule_color = 'rgb(255,255,0)'
                                        }
                                        else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                            rule_color = 'rgb(255,0,0)'
                                        }
                                        this.mainList[i].events[j].homeTeam[k].rule_color = rule_color
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < eventNode.homeTeam.length ; k++){
                                    this.mainList[i].events[j].homeTeam[k].sRole = this.mainList[i].events[j].homeTeam[k].sRole1
                                    this.mainList[i].events[j].homeTeam[k].mR = this.mainList[i].events[j].homeTeam[k].mR1
                                    this.mainList[i].events[j].homeTeam[k].rule_color = 'rgb(216,228,188)'
                                }
                            }
                        }
                        else if(this.selected_direction === 'away' && this.selected_team === eventNode.awayTeamName){
                            if(value !== '0'){
                                for(let k = 0 ; k < eventNode.awayTeam.length ; k++){
                                    let s_roles = this.s_role_set.filter(function(item) {
                                        return item.name === value;
                                    });
                                    if(s_roles.length > 0){
                                        let position_number = eventNode.awayTeam[k].formation_position
                                        // let s_role = s_roles[0].s_role[k]
                                        // let s_role12 = s_roles[0].alt_s_role[k]
                                        // let mean_role = s_roles[0].mean_role[k]

                                        let s_role = s_roles[0].s_role[position_number - 1]
                                        let s_role12 = s_roles[0].alt_s_role[position_number - 1]
                                        let mean_role = s_roles[0].mean_role[position_number - 1]

                                        this.mainList[i].events[j].awayTeam[k].sRole = s_role
                                        this.mainList[i].events[j].awayTeam[k].sRole2 = s_role12
                                        this.mainList[i].events[j].awayTeam[k].mR = mean_role
                                        let main_role = this.mainList[i].events[j].awayTeam[k].primaryRole
                                        let position = this.mainList[i].events[j].awayTeam[k].p_m_Role
                                        let alt_role1 = this.mainList[i].events[j].awayTeam[k].altRole1
                                        let alt_role2 = this.mainList[i].events[j].awayTeam[k].altRole2
                                        let s_role2 = this.mainList[i].events[j].awayTeam[k].sRole2
                                        let rule_color = 'rgb(230,184,183)'
                                        if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                            rule_color = 'rgb(146,208,80)'
                                        }
                                        else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                            rule_color = 'rgb(255,255,0)'
                                        }
                                        else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                            rule_color = 'rgb(255,0,0)'
                                        }
                                        this.mainList[i].events[j].awayTeam[k].rule_color = rule_color
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < eventNode.homeTeam.length ; k++){
                                    this.mainList[i].events[j].awayTeam[k].sRole = this.mainList[i].events[j].awayTeam[k].sRole1
                                    this.mainList[i].events[j].awayTeam[k].mR = this.mainList[i].events[j].awayTeam[k].mR1
                                    this.mainList[i].events[j].awayTeam[k].rule_color = 'rgb(230,184,183)'
                                }
                            }
                        }

                        let home_rule_color_number = {"green_color": 0, "yellow_color": 0, "red_color": 0}
                        for(let pp = 0 ; pp < this.mainList[i].events[j].homeTeam.length ; pp++){
                            if(this.mainList[i].events[j].homeTeam[pp].rule_color === 'rgb(146,208,80)'){
                                home_rule_color_number.green_color++
                            }
                            else if(this.mainList[i].events[j].homeTeam[pp].rule_color === 'rgb(255,255,0)'){
                                home_rule_color_number.yellow_color++
                            }
                            else if(this.mainList[i].events[j].homeTeam[pp].rule_color === 'rgb(255,0,0)'){
                                home_rule_color_number.red_color++
                            }
                        }

                        let away_rule_color_number = {"green_color": 0, "yellow_color": 0, "red_color": 0}
                        for(let pp = 0 ; pp < this.mainList[i].events[j].awayTeam.length ; pp++){
                            if(this.mainList[i].events[j].awayTeam[pp].rule_color === 'rgb(146,208,80)'){
                                away_rule_color_number.green_color++
                            }
                            else if(this.mainList[i].events[j].awayTeam[pp].rule_color === 'rgb(255,255,0)'){
                                away_rule_color_number.yellow_color++
                            }
                            else if(this.mainList[i].events[j].awayTeam[pp].rule_color === 'rgb(255,0,0)'){
                                away_rule_color_number.red_color++
                            }
                        }
                        this.mainList[i].events[j].home_rule_set = home_rule_color_number
                        this.mainList[i].events[j].away_rule_set = away_rule_color_number
                    }
                }
            },
            select_lineup1(value){
                for(let i = 0 ; i < this.mainList.length ; i++){
                    for(let j = 0 ; j < this.mainList[i].events.length ; j++){
                        let eventNode = this.mainList[i].events[j]
                        if(this.selected_direction === 'home' && this.selected_team === eventNode.homeTeamName){
                            if(value !== '0'){
                                let homeTeam2 = eventNode.homeTeam1
                                let homeTeam3 = eventNode.homeTeam1
                                for(let k = 0 ; k < homeTeam2.length ; k++){
                                    homeTeam2[k].order_key = 0
                                    homeTeam3[k].order_key = 0
                                }

                                for(let k = 0 ; k < homeTeam2.length ; k++){
                                    let s_roles = this.s_role_set.filter(function(item) {
                                        return item.name === value;
                                    });
                                    if(s_roles.length > 0) {
                                        let position_number = homeTeam2[k].formation_position
                                        let s_role = s_roles[0].s_role[position_number - 1]
                                        let s_role12 = s_roles[0].alt_s_role[position_number - 1]
                                        let mean_role = s_roles[0].mean_role[position_number - 1]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        let check = 0
                                        let check_key = 0

                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2
                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((s_role === main_role || s_role12 === main_role) && alt_role1 === '' && alt_role2 === '') {
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'blue'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                    check_key = kk
                                                    check = 1
                                                }
                                                if((s_role === main_role || s_role12 === main_role) && ((alt_role1 !== '' && alt_role2 === '') || (alt_role1 === '' && alt_role2 !== ''))){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'green'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                    check = 1
                                                    check_key = kk
                                                }
                                                if((s_role === main_role || s_role12 === main_role) && alt_role1 !== '' && alt_role2 !== ''){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                    check = 1
                                                    check_key = kk
                                                }
                                            }

                                        }

                                        //
                                        // if(homeTeam2[k].order_key === 0){
                                        //     for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                        //         if(homeTeam3[kk].order_key === 0){
                                        //             let main_role = homeTeam3[kk].primaryRole
                                        //             let position = homeTeam3[kk].p_m_Role
                                        //             let alt_role1 = homeTeam3[kk].altRole1
                                        //             let alt_role2 = homeTeam3[kk].altRole2
                                        //             let s_role2 = homeTeam2[kk].sRole2
                                        //             homeTeam2[k].sRole1 = homeTeam3[kk].sRole1
                                        //             if(alt_role1 === '...' || alt_role1 === ''){
                                        //                 alt_role1 = ''
                                        //             }
                                        //             if(alt_role2 === '...' || alt_role2 === ''){
                                        //                 alt_role2 = ''
                                        //             }
                                        //             // homeTeam.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id, 'formation_position': position_number, 'teamId':localTeamId ,'sRole': s_role, 'mR': mean_role, 'sRole1': s_role, 'sRole2': s_role2, 'mR1': mean_role, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(216, 228, 188)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit})
                                        //             if(homeTeam2[k].order_key === 0){
                                        //                 if((s_role === main_role || s_role12 === main_role) && alt_role1 === '' && alt_role2 === '' && homeTeam2[k].order_key === 0){
                                        //                     // homeTeam2[k].order_key = 1
                                        //                     homeTeam2[k].Pname = homeTeam3[kk].Pname
                                        //                     homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //                     homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                        //                     homeTeam2[k].playerId = homeTeam3[kk].playerId
                                        //                     homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                        //                     homeTeam2[k].teamId = homeTeam3[kk].teamId
                                        //                     homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                        //                     homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                        //                     homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                        //                     homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                        //                     homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                        //                     homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                        //                     homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //                     homeTeam2[k].rule_color = homeTeam3[kk].rule_color
                                        //                     homeTeam2[k].Tit = homeTeam3[kk].Tit
                                        //                     homeTeam3[kk].order_key = 1
                                        //                     let rule_color = 'rgb(216, 228, 188)'
                                        //                     if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                        //                         rule_color = 'rgb(146,208,80)'
                                        //                     }
                                        //                     else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                        //                         rule_color = 'rgb(255,255,0)'
                                        //                     }
                                        //                     else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                        //                         rule_color = 'rgb(255,0,0)'
                                        //                     }
                                        //                     homeTeam2[k].rule_color = rule_color
                                        //                     // if(homeTeam2[k].teamId === 7057){
                                        //                     //     console.log('player=>', homeTeam2[k].Pname)
                                        //                     // }
                                        //                 }
                                        //                 else if((s_role === main_role || s_role12 === main_role) && (alt_role1 !== '' && alt_role2 === '') || (alt_role1 === '' && alt_role2 !== '' && homeTeam2[k].order_key === 0)){
                                        //                     homeTeam2[k].order_key = 1
                                        //                     homeTeam2[k].Pname = homeTeam3[kk].Pname
                                        //                     homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //                     homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                        //                     homeTeam2[k].playerId = homeTeam3[kk].playerId
                                        //                     homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                        //                     homeTeam2[k].teamId = homeTeam3[kk].teamId
                                        //                     homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                        //                     homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                        //                     homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                        //                     homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                        //                     homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                        //                     homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                        //                     homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //                     homeTeam2[k].rule_color = homeTeam3[kk].rule_color
                                        //                     homeTeam2[k].Tit = homeTeam3[kk].Tit
                                        //                     homeTeam3[kk].order_key = 1
                                        //
                                        //                     let rule_color = 'rgb(216, 228, 188)'
                                        //                     if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                        //                         rule_color = 'rgb(146,208,80)'
                                        //                     }
                                        //                     else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                        //                         rule_color = 'rgb(255,255,0)'
                                        //                     }
                                        //                     else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                        //                         rule_color = 'rgb(255,0,0)'
                                        //                     }
                                        //                     homeTeam2[k].rule_color = rule_color
                                        //                     // if(homeTeam2[k].teamId === 7057){
                                        //                     //     console.log('player=>', homeTeam2[k].Pname)
                                        //                     // }
                                        //                 }
                                        //                 else if((s_role === main_role || s_role12 === main_role) && alt_role1 !== '' && alt_role2 !== '' && homeTeam2[k].order_key === 0){
                                        //                     homeTeam2[k].order_key = 1
                                        //                     homeTeam2[k].Pname = homeTeam3[kk].Pname
                                        //                     homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //                     homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                        //                     homeTeam2[k].playerId = homeTeam3[kk].playerId
                                        //                     homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                        //                     homeTeam2[k].teamId = homeTeam3[kk].teamId
                                        //                     homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                        //                     homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                        //                     homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                        //                     homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                        //                     homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                        //                     homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                        //                     homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //                     homeTeam2[k].rule_color = homeTeam3[kk].rule_color
                                        //                     homeTeam2[k].Tit = homeTeam3[kk].Tit
                                        //                     homeTeam3[kk].order_key = 1
                                        //
                                        //                     let rule_color = 'rgb(216, 228, 188)'
                                        //                     if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                        //                         rule_color = 'rgb(146,208,80)'
                                        //                     }
                                        //                     else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                        //                         rule_color = 'rgb(255,255,0)'
                                        //                     }
                                        //                     else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                        //                         rule_color = 'rgb(255,0,0)'
                                        //                     }
                                        //                     homeTeam2[k].rule_color = rule_color
                                        //                     // if(homeTeam2[k].teamId === 7057){
                                        //                     //     console.log('player=>', homeTeam2[k].Pname)
                                        //                     // }
                                        //                 }
                                        //                 else if(position === mean_role && (alt_role1 !== '' && alt_role2 === '') || (alt_role1 === '' && alt_role2 !== '' && homeTeam2[k].order_key === 0)){
                                        //                     homeTeam2[k].order_key = 1
                                        //                     homeTeam2[k].Pname = homeTeam3[kk].Pname
                                        //                     homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //                     homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                        //                     homeTeam2[k].playerId = homeTeam3[kk].playerId
                                        //                     homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                        //                     homeTeam2[k].teamId = homeTeam3[kk].teamId
                                        //                     homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                        //                     homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                        //                     homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                        //                     homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                        //                     homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                        //                     homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                        //                     homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //                     homeTeam2[k].rule_color = homeTeam3[kk].rule_color
                                        //                     homeTeam2[k].Tit = homeTeam3[kk].Tit
                                        //                     homeTeam3[kk].order_key = 1
                                        //
                                        //                     let rule_color = 'rgb(216, 228, 188)'
                                        //                     if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                        //                         rule_color = 'rgb(146,208,80)'
                                        //                     }
                                        //                     else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                        //                         rule_color = 'rgb(255,255,0)'
                                        //                     }
                                        //                     else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                        //                         rule_color = 'rgb(255,0,0)'
                                        //                     }
                                        //                     homeTeam2[k].rule_color = rule_color
                                        //                     // if(homeTeam2[k].teamId === 7057){
                                        //                     //     console.log('player=>', homeTeam2[k].Pname)
                                        //                     // }
                                        //                 }
                                        //                 else if(position === mean_role && alt_role1 !== '' && alt_role2 !== '' && homeTeam2[k].order_key === 0){
                                        //                     homeTeam2[k].order_key = 1
                                        //                     homeTeam2[k].Pname = homeTeam3[kk].Pname
                                        //                     homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //                     homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                        //                     homeTeam2[k].playerId = homeTeam3[kk].playerId
                                        //                     homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                        //                     homeTeam2[k].teamId = homeTeam3[kk].teamId
                                        //                     homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                        //                     homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                        //                     homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                        //                     homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                        //                     homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                        //                     homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                        //                     homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //                     homeTeam2[k].rule_color = homeTeam3[kk].rule_color
                                        //                     homeTeam2[k].Tit = homeTeam3[kk].Tit
                                        //                     homeTeam3[kk].order_key = 1
                                        //
                                        //                     let rule_color = 'rgb(216, 228, 188)'
                                        //                     if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                        //                         rule_color = 'rgb(146,208,80)'
                                        //                     }
                                        //                     else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                        //                         rule_color = 'rgb(255,255,0)'
                                        //                     }
                                        //                     else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                        //                         rule_color = 'rgb(255,0,0)'
                                        //                     }
                                        //                     homeTeam2[k].rule_color = rule_color
                                        //                     // if(homeTeam2[k].teamId === 7057){
                                        //                     //     console.log('players=>', homeTeam2[k].Pname)
                                        //                     // }
                                        //
                                        //                 }
                                        //                 if(homeTeam2[k].teamId === 7057){
                                        //                     console.log('player_order_key_value=>', homeTeam2[k].order_key)
                                        //                 }
                                        //             }
                                        //         }
                                        //     }
                                        // }

                                        // for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                        //     let main_role = homeTeam3[kk].primaryRole
                                        //     let position = homeTeam3[kk].p_m_Role
                                        //     let alt_role1 = homeTeam3[kk].altRole1
                                        //     let alt_role2 = homeTeam3[kk].altRole2
                                        //     let s_role2 = homeTeam2[kk].sRole2
                                        //     if(alt_role1 === '...' || alt_role1 === ''){
                                        //         alt_role1 = ''
                                        //     }
                                        //     if(alt_role2 === '...' || alt_role2 === ''){
                                        //         alt_role2 = ''
                                        //     }
                                        //     if(homeTeam3[kk].order_key === 0){
                                        //         if((s_role === main_role || s_role12 === main_role) && alt_role1 === '' && alt_role2 === ''){
                                        //             homeTeam2[k].Pname = homeTeam3[kk].Pname
                                        //             homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //             homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                        //             homeTeam2[k].playerId = homeTeam3[kk].playerId
                                        //             homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                        //             homeTeam2[k].teamId = homeTeam3[kk].teamId
                                        //             homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                        //             homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                        //             homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                        //             homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                        //             homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                        //             homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                        //             homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //             homeTeam2[k].rule_color = homeTeam3[kk].rule_color
                                        //             homeTeam2[k].Tit = homeTeam3[kk].Tit
                                        //             homeTeam2[k].order_key = 1
                                        //             homeTeam3[kk].order_key = 1
                                        //             check_key = kk
                                        //             check = 1
                                        //         }
                                        //         if((s_role === main_role || s_role12 === main_role) && ((alt_role1 !== '' && alt_role2 === '') || (alt_role1 === '' && alt_role2 !== ''))){
                                        //             homeTeam2[k].Pname = homeTeam3[kk].Pname
                                        //             homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //             homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                        //             homeTeam2[k].playerId = homeTeam3[kk].playerId
                                        //             homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                        //             homeTeam2[k].teamId = homeTeam3[kk].teamId
                                        //             homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                        //             homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                        //             homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                        //             homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                        //             homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                        //             homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                        //             homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //             homeTeam2[k].rule_color = homeTeam3[kk].rule_color
                                        //             homeTeam2[k].Tit = homeTeam3[kk].Tit
                                        //             homeTeam2[k].order_key = 1
                                        //             homeTeam3[kk].order_key = 1
                                        //             check = 1
                                        //             check_key = kk
                                        //         }
                                        //         if((s_role === main_role || s_role12 === main_role) && alt_role1 !== '' && alt_role2 !== ''){
                                        //             homeTeam2[k].Pname = homeTeam3[kk].Pname
                                        //             homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //             homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                        //             homeTeam2[k].playerId = homeTeam3[kk].playerId
                                        //             homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                        //             homeTeam2[k].teamId = homeTeam3[kk].teamId
                                        //             homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                        //             homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                        //             homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                        //             homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                        //             homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                        //             homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                        //             homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //             homeTeam2[k].rule_color = homeTeam3[kk].rule_color
                                        //             homeTeam2[k].Tit = homeTeam3[kk].Tit
                                        //             homeTeam2[k].order_key = 1
                                        //             homeTeam3[kk].order_key = 1
                                        //             check = 1
                                        //             check_key = kk
                                        //         }
                                        //         if((position === mean_role) && ((alt_role1 !== '' && alt_role2 === '') || (alt_role1 === '' && alt_role2 !== ''))){
                                        //             homeTeam2[k].Pname = homeTeam3[kk].Pname
                                        //             homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //             homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                        //             homeTeam2[k].playerId = homeTeam3[kk].playerId
                                        //             homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                        //             homeTeam2[k].teamId = homeTeam3[kk].teamId
                                        //             homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                        //             homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                        //             homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                        //             homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                        //             homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                        //             homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                        //             homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //             homeTeam2[k].rule_color = homeTeam3[kk].rule_color
                                        //             homeTeam2[k].Tit = homeTeam3[kk].Tit
                                        //             homeTeam2[k].order_key = 1
                                        //             homeTeam3[kk].order_key = 1
                                        //             check = 1
                                        //             check_key = kk
                                        //         }
                                        //         if((position === mean_role) && alt_role1 !== '' && alt_role2 !== ''){
                                        //             homeTeam2[k].Pname = homeTeam3[kk].Pname
                                        //             homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //             homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                        //             homeTeam2[k].playerId = homeTeam3[kk].playerId
                                        //             homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                        //             homeTeam2[k].teamId = homeTeam3[kk].teamId
                                        //             homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                        //             homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                        //             homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                        //             homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                        //             homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                        //             homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                        //             homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                        //             homeTeam2[k].rule_color = homeTeam3[kk].rule_color
                                        //             homeTeam2[k].Tit = homeTeam3[kk].Tit
                                        //             homeTeam2[k].order_key = 1
                                        //             homeTeam3[kk].order_key = 1
                                        //             check = 1
                                        //             check_key = kk
                                        //         }
                                        //     }
                                        // }

                                        if(check === 0){
                                            homeTeam2[k].order_key = 0
                                        }
                                    }
                                }
                                this.mainList[i].events[j].homeTeam1 = homeTeam2
                            }
                            else{
                                for(let k = 0 ; k < eventNode.homeTeam1.length ; k++){
                                    this.mainList[i].events[j].homeTeam1[k].sRole = this.mainList[i].events[j].homeTeam1[k].sRole1
                                    this.mainList[i].events[j].homeTeam1[k].mR = this.mainList[i].events[j].homeTeam1[k].mR1
                                    this.mainList[i].events[j].homeTeam1[k].rule_color = 'rgb(216,228,188)'
                                }
                            }
                        }
                        else if(this.selected_direction === 'away' && this.selected_team === eventNode.awayTeamName){
                            if(value !== '0'){
                                for(let k = 0 ; k < eventNode.awayTeam1.length ; k++){
                                    let s_roles = this.s_role_set.filter(function(item){
                                        return item.name === value;
                                    });
                                    if(s_roles.length > 0){
                                        let position_number = eventNode.awayTeam1[k].formation_position
                                        let s_role = s_roles[0].s_role[position_number - 1]
                                        let s_role12 = s_roles[0].alt_s_role[position_number - 1]
                                        let mean_role = s_roles[0].mean_role[position_number - 1]
                                        this.mainList[i].events[j].awayTeam1[k].sRole = s_role
                                        this.mainList[i].events[j].awayTeam1[k].sRole2 = s_role12
                                        this.mainList[i].events[j].awayTeam1[k].mR = mean_role
                                        let main_role = this.mainList[i].events[j].awayTeam1[k].primaryRole
                                        let position = this.mainList[i].events[j].awayTeam1[k].p_m_Role
                                        let alt_role1 = this.mainList[i].events[j].awayTeam1[k].altRole1
                                        let alt_role2 = this.mainList[i].events[j].awayTeam1[k].altRole2
                                        let s_role2 = this.mainList[i].events[j].awayTeam1[k].sRole2
                                        let rule_color = 'rgb(230,184,183)'
                                        if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                            rule_color = 'rgb(146,208,80)'
                                        }
                                        else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                            rule_color = 'rgb(255,255,0)'
                                        }
                                        else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                            rule_color = 'rgb(255,0,0)'
                                        }
                                        this.mainList[i].events[j].awayTeam1[k].rule_color = rule_color
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < eventNode.homeTeam.length ; k++){
                                    this.mainList[i].events[j].awayTeam1[k].sRole = this.mainList[i].events[j].awayTeam1[k].sRole1
                                    this.mainList[i].events[j].awayTeam1[k].mR = this.mainList[i].events[j].awayTeam1[k].mR1
                                    this.mainList[i].events[j].awayTeam1[k].rule_color = 'rgb(230,184,183)'
                                }
                            }
                        }

                        let home_rule_color_number = {"green_color": 0, "yellow_color": 0, "red_color": 0}
                        for(let pp = 0 ; pp < this.mainList[i].events[j].homeTeam1.length ; pp++){
                            if(this.mainList[i].events[j].homeTeam1[pp].rule_color === 'rgb(146,208,80)'){
                                home_rule_color_number.green_color++
                            }
                            else if(this.mainList[i].events[j].homeTeam1[pp].rule_color === 'rgb(255,255,0)'){
                                home_rule_color_number.yellow_color++
                            }
                            else if(this.mainList[i].events[j].homeTeam1[pp].rule_color === 'rgb(255,0,0)'){
                                home_rule_color_number.red_color++
                            }
                        }

                        let away_rule_color_number = {"green_color": 0, "yellow_color": 0, "red_color": 0}
                        for(let pp = 0 ; pp < this.mainList[i].events[j].awayTeam1.length ; pp++){
                            if(this.mainList[i].events[j].awayTeam1[pp].rule_color === 'rgb(146,208,80)'){
                                away_rule_color_number.green_color++
                            }
                            else if(this.mainList[i].events[j].awayTeam1[pp].rule_color === 'rgb(255,255,0)'){
                                away_rule_color_number.yellow_color++
                            }
                            else if(this.mainList[i].events[j].awayTeam1[pp].rule_color === 'rgb(255,0,0)'){
                                away_rule_color_number.red_color++
                            }
                        }
                        this.mainList[i].events[j].home_rule_set = home_rule_color_number
                        this.mainList[i].events[j].away_rule_set = away_rule_color_number
                    }
                }
            },
            readData(){
                window.axios.post(`${process.env.VUE_APP_URL}teamAnalysis`).then(({data})=> {
                    console.log('data******', data.data[0])
                    console.log('data1******', data.data[1])
                    this.standingList = data.data[1]
                    let main_data = data.data[0]
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
                            if(competitionArray[i] == main_data[j].competitions[0].name && main_data[j].local_players.length > 0){
                                k++
                                let homeTeam = []
                                let awayTeam = []
                                let homeTeam1 = []
                                let awayTeam1 = []
                                let localTeamId = main_data[j].localTeamId
                                let visitTeamId = main_data[j].visitorTeamId
                                let homeTeamName = main_data[j].localTeamName
                                let awayTeamName = main_data[j].visitorTeamName
                                let homeTeamFormation = main_data[j].formations.localteam_formation
                                let awayTeamFormation = main_data[j].formations.visitorteam_formation
                                let homeTeamPformation = ''
                                let awayTeamPformation = ''
                                if(main_data[j].pre_formations){
                                    homeTeamPformation = main_data[j].pre_formations.localteam_formation
                                    awayTeamPformation = main_data[j].pre_formations.visitorteam_formation
                                }

                                let percentage0 = this.percentage_calculation(main_data[j])
                                percentage = percentage0[0]
                                numbers = percentage0[1]

                                let homeTeamLformation = main_data[j].live_formations.localteam_formation
                                let awayTeamLformation = main_data[j].live_formations.visitorteam_formation
                                if(main_data[j].lineup != null){
                                    for(let k = 0 ; k < main_data[j].lineup.data.length ; k++){
                                        if(main_data[j].lineup.data[k].team_id === localTeamId && main_data[j].local_players.length > 0){
                                            let position = ''
                                            if(main_data[j].lineup.data[k].position === 'G'){
                                                position = 'GK'
                                            }
                                            else if(main_data[j].lineup.data[k].position === 'D'){
                                                position = 'DEF'
                                            }
                                            else if(main_data[j].lineup.data[k].position === 'M'){
                                                position = 'MID'
                                            }
                                            else if(main_data[j].lineup.data[k].position === 'A'){
                                                position = 'FWD'
                                            }
                                            else{
                                                position = '-'
                                            }

                                            let market_value = '...'
                                            let main_role = '...'
                                            let alt_role1 = '...'
                                            let alt_role2 = '...'
                                            let market_player_name = ''
                                            let local_players = main_data[j].local_players.filter(function(item) {
                                                return item.team_id == localTeamId && item.market_values.length > 0;
                                            });

                                            if(local_players.length > 0){
                                                let values = local_players[0].market_values.filter(function(item) {
                                                    return item.player_number == main_data[j].lineup.data[k].number;
                                                });
                                                if(values.length > 0){
                                                    market_value = values[0].player_marketvalue
                                                    market_player_name = values[0].player_name
                                                }
                                                else{
                                                    let value = local_players[0].market_values.filter(function(item) {
                                                        return item.player_name.trim() == main_data[j].lineup.data[k].player_name;
                                                    });
                                                    if(value.length > 0){
                                                        market_value = value[0].player_marketvalue
                                                        market_player_name = value[0].player_name
                                                    }
                                                    else{
                                                        let value0 = local_players[0].market_values.filter(function(item) {
                                                            return item.player_name.trim().substring(item.player_name.trim().length - 4, item.player_name.trim().length) == main_data[j].lineup.data[k].player_name.substring(main_data[j].lineup.data[k].player_name.length - 4, main_data[j].lineup.data[k].player_name.length);
                                                        });
                                                        if(value0.length > 0){
                                                            market_value = value0[0].player_marketvalue
                                                            market_player_name = value0[0].player_name
                                                        }
                                                        else{
                                                            let value1 = local_players[0].market_values.filter(function(item) {
                                                                return item.player_name.trim().substring(0, 3) == main_data[j].lineup.data[k].player_name.substring(0, 3);
                                                            });
                                                            if(value1.length > 0){
                                                                market_value = value1[0].player_marketvalue
                                                                market_player_name = value1[0].player_name
                                                            }
                                                        }
                                                    }
                                                }

                                                let roles = local_players[0].roles.filter(function(item) {
                                                    return item.player_number == main_data[j].lineup.data[k].number;
                                                });
                                                if(roles.length > 0){
                                                    main_role = roles[0].player_main_role
                                                    alt_role1 = roles[0].player_alt_role1
                                                    alt_role2 = roles[0].player_alt_role2
                                                    if(alt_role1 == ''){
                                                        alt_role1 = '...'
                                                    }
                                                    if(alt_role2 == ''){
                                                        alt_role2 = '...'
                                                    }
                                                }
                                                else{
                                                    let names = local_players[0].roles.filter(function(item) {
                                                        return item.player_name.trim() == main_data[j].lineup.data[k].player_name;
                                                    });
                                                    if(names.length > 0){
                                                        main_role = names[0].player_main_role
                                                        alt_role1 = names[0].player_alt_role1
                                                        alt_role2 = names[0].player_alt_role2
                                                        if(alt_role1 == ''){
                                                            alt_role1 = '...'
                                                        }
                                                        if(alt_role2 == ''){
                                                            alt_role2 = '...'
                                                        }
                                                    }
                                                    else{
                                                        let namex = local_players[0].roles.filter(function(item) {
                                                            return item.player_name.trim() === market_player_name;
                                                        });
                                                        if(namex.length > 0){
                                                            main_role = namex[0].player_main_role
                                                            alt_role1 = namex[0].player_alt_role1
                                                            alt_role2 = namex[0].player_alt_role2
                                                            if(alt_role1 == ''){
                                                                alt_role1 = '...'
                                                            }
                                                            if(alt_role2 == ''){
                                                                alt_role2 = '...'
                                                            }
                                                        }else{
                                                            let name0 = local_players[0].roles.filter(function(item) {
                                                                return item.player_name.trim().substring(item.player_name.trim().length - 4, item.player_name.trim().length) == main_data[j].lineup.data[k].player_name.substring(main_data[j].lineup.data[k].player_name.length - 4, main_data[j].lineup.data[k].player_name.length);
                                                            });
                                                            if(name0.length > 0){
                                                                main_role = name0[0].player_main_role
                                                                alt_role1 = name0[0].player_alt_role1
                                                                alt_role2 = name0[0].player_alt_role2
                                                                if(alt_role1 == ''){
                                                                    alt_role1 = '...'
                                                                }
                                                                if(alt_role2 == ''){
                                                                    alt_role2 = '...'
                                                                }
                                                            }
                                                            else{
                                                                let name1 = local_players[0].roles.filter(function(item) {
                                                                    return item.player_name.trim().substring(0, 3) == main_data[j].lineup.data[k].player_name.substring(0, 3);
                                                                });
                                                                if(name1.length > 0){
                                                                    main_role = name1[0].player_main_role
                                                                    alt_role1 = name1[0].player_alt_role1
                                                                    alt_role2 = name1[0].player_alt_role2
                                                                    if(alt_role1 == ''){
                                                                        alt_role1 = '...'
                                                                    }
                                                                    if(alt_role2 == ''){
                                                                        alt_role2 = '...'
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            if(main_role == 'GK'){ position = 'GK' }
                                            else if(main_role == 'RB'){ position = 'DEF' }
                                            else if(main_role == 'CB'){ position = 'DEF' }
                                            else if(main_role == 'LB'){ position = 'DEF' }
                                            else if(main_role == 'RM'){ position = 'MID' }
                                            else if(main_role == 'CM'){ position = 'MID' }
                                            else if(main_role == 'LM'){ position = 'MID' }
                                            else if(main_role == 'DM'){ position = 'MID' }
                                            else if(main_role == 'AM'){ position = 'MID' }
                                            else if(main_role == 'RW'){ position = 'FWD' }
                                            else if(main_role == 'LW'){ position = 'FWD' }
                                            else if(main_role == 'SS'){ position = 'FWD' }
                                            else if(main_role == 'CF'){ position = 'FWD' }

                                            let Tit = (0).toFixed(2)
                                            let titularity = main_data[j].local_players[0].titularity.filter(function(item) {
                                                return item.player_id === main_data[j].lineup.data[k].player_id;
                                            })

                                            let Tit1 = 0
                                            let Tit2 = 0
                                            if(titularity[0]){
                                                let appearences = titularity[0].appearences
                                                let lineups = titularity[0].lineups
                                                let substitute_in = titularity[0].substitute_in
                                                let substitute_out = titularity[0].substitute_out
                                                let presences = titularity[0].appearences

                                                if(lineups !== null && appearences !== null){
                                                    Tit1 = lineups/appearences*100
                                                }
                                                if(presences !== null && substitute_in !== null && substitute_out !== null){
                                                    Tit2 = (lineups + substitute_out - substitute_in)/presences*100
                                                }
                                                if(Tit2 != 0 && Tit1 != 0){
                                                    Tit = (Tit1 + Tit2)/2
                                                }
                                                if(Tit2 == 0 && Tit1 != 0){
                                                    Tit = Tit1
                                                }
                                            }
                                            if(Tit1 == 0 && Tit2 == 0){
                                                Tit = '##'
                                            }
                                            else if(Tit1 != 0 && Tit2 != 0 && Tit == 0){
                                                Tit = (0).toFixed(2)
                                            }
                                            else if(Tit > 0 && Tit <= 100){
                                                let Tit3 = Tit
                                                Tit = Tit3.toFixed(2)
                                            }
                                            else if(Tit < 0){
                                                Tit = (0).toFixed(2)
                                            }
                                            else if(Tit > 100){
                                                Tit = (100).toFixed(2)
                                            }

                                            // console.log('titularity==>', titularity[0])
                                            // console.log('Tit==>', Tit, ', Tit1=>', Tit1, ', Tit2=>', Tit2)
                                            let rule_color = 'rgb(216, 228, 188)'
                                            // pre-formartion part
                                            let s_roles = this.s_role_set.filter(function(item) {
                                                return item.name === homeTeamPformation;
                                            })

                                            if(s_roles.length > 0){
                                                let position_number = main_data[j].lineup.data[k].formation_position
                                                console.log('position_number=>', position_number)
                                                let s_role = s_roles[0].s_role[position_number - 1]
                                                let s_role2 = s_roles[0].alt_s_role[position_number - 1]
                                                let mean_role = s_roles[0].mean_role[position_number - 1]
                                                if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                                    rule_color = 'rgb(146,208,80)'
                                                }
                                                else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                                    rule_color = 'rgb(255,255,0)'
                                                }
                                                else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                                    rule_color = 'rgb(255,0,0)'
                                                }
                                                homeTeam.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id, 'formation_position': position_number, 'teamId':localTeamId ,'sRole': s_role, 'mR': mean_role, 'sRole1': s_role, 'sRole2': s_role2, 'mR1': mean_role, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(216, 228, 188)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit})
                                            }
                                            else{
                                                let position_number = main_data[j].lineup.data[k].formation_position
                                                homeTeam.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id, 'formation_position': position_number, 'teamId':localTeamId ,'sRole': '...', 'mR': position, 'sRole1': '...','sRole2': '', 'mR1': position, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(216, 228, 188)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit})
                                            }
                                            //live formartion part
                                            let s_roles_live = this.s_role_set.filter(function(item) {
                                                return item.name === homeTeamLformation;
                                            })

                                            if(s_roles_live.length > 0){
                                                let position_number = main_data[j].lineup.data[k].formation_position
                                                let s_role = s_roles_live[0].s_role[position_number - 1]
                                                let s_role2 = s_roles_live[0].alt_s_role[position_number - 1]
                                                let mean_role = s_roles_live[0].mean_role[position_number - 1]
                                                if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                                    rule_color = 'rgb(146,208,80)'
                                                }
                                                else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                                    rule_color = 'rgb(255,255,0)'
                                                }
                                                else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                                    rule_color = 'rgb(255,0,0)'
                                                }
                                                homeTeam1.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id, 'formation_position': position_number, 'teamId':localTeamId ,'sRole': s_role, 'mR': mean_role, 'sRole1': s_role, 'sRole2': s_role2, 'mR1': mean_role, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(216, 228, 188)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit})
                                            }
                                            else{
                                                let position_number = main_data[j].lineup.data[k].formation_position
                                                homeTeam1.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id, 'formation_position': position_number, 'teamId':localTeamId ,'sRole': '...', 'mR': position, 'sRole1': '...','sRole2': '', 'mR1': position, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(216, 228, 188)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit})
                                            }
                                            //-------------------------------------------------------------------
                                        }
                                        else{
                                            let position = ''
                                            if(main_data[j].lineup.data[k].position === 'G'){
                                                position = 'GK'
                                            }
                                            else if(main_data[j].lineup.data[k].position === 'D'){
                                                position = 'DEF'
                                            }
                                            else if(main_data[j].lineup.data[k].position === 'M'){
                                                position = 'MID'
                                            }
                                            else if(main_data[j].lineup.data[k].position === 'A'){
                                                position = 'FWD'
                                            }
                                            else{
                                                position = '-'
                                            }

                                            let market_value = '...'
                                            let main_role = '...'
                                            let alt_role1 = '...'
                                            let alt_role2 = '...'
                                            let local_players = main_data[j].visitor_players.filter(function(item) {
                                                return item.team_id == visitTeamId && item.market_values.length > 0;
                                            });

                                            if(local_players.length > 0){
                                                let values = local_players[0].market_values.filter(function(item) {
                                                    return item.player_number == main_data[j].lineup.data[k].number;
                                                });
                                                if(values.length > 0){
                                                    market_value = values[0].player_marketvalue
                                                }
                                                else{
                                                    let value = local_players[0].market_values.filter(function(item) {
                                                        return item.player_name == main_data[j].lineup.data[k].player_name;
                                                    });
                                                    if(value.length > 0){
                                                        market_value = value[0].player_marketvalue
                                                    }
                                                    else{
                                                        let value0 = local_players[0].market_values.filter(function(item) {
                                                            return item.player_name.substring(item.player_name.length - 4, item.player_name.length) == main_data[j].lineup.data[k].player_name.substring(main_data[j].lineup.data[k].player_name.length - 4, main_data[j].lineup.data[k].player_name.length);
                                                        });
                                                        if(value0.length > 0){
                                                            market_value = value0[0].player_marketvalue
                                                        }
                                                        else{
                                                            let value1 = local_players[0].market_values.filter(function(item) {
                                                                return item.player_name.substring(0, 3) == main_data[j].lineup.data[k].player_name.substring(0, 3);
                                                            });
                                                            if(value1.length > 0){
                                                                market_value = value1[0].player_marketvalue
                                                            }
                                                        }
                                                    }
                                                }

                                                let roles = local_players[0].roles.filter(function(item) {
                                                    return item.player_number == main_data[j].lineup.data[k].number;
                                                });
                                                if(roles.length > 0){
                                                    main_role = roles[0].player_main_role
                                                    alt_role1 = roles[0].player_alt_role1
                                                    alt_role2 = roles[0].player_alt_role2
                                                    if(alt_role1 == ''){
                                                        alt_role1 = '...'
                                                    }
                                                    if(alt_role2 == ''){
                                                        alt_role2 = '...'
                                                    }
                                                }
                                                else{
                                                    let names = local_players[0].roles.filter(function(item) {
                                                        return item.player_name == main_data[j].lineup.data[k].player_name;
                                                    });
                                                    if(names.length > 0){
                                                        main_role = names[0].player_main_role
                                                        alt_role1 = names[0].player_alt_role1
                                                        alt_role2 = names[0].player_alt_role2
                                                        if(alt_role1 == ''){
                                                            alt_role1 = '...'
                                                        }
                                                        if(alt_role2 == ''){
                                                            alt_role2 = '...'
                                                        }
                                                    }
                                                    else{
                                                        let name0 = local_players[0].roles.filter(function(item) {
                                                            return item.player_name.substring(item.player_name.length - 4, item.player_name.length) == main_data[j].lineup.data[k].player_name.substring(main_data[j].lineup.data[k].player_name.length - 4, main_data[j].lineup.data[k].player_name.length);
                                                        });
                                                        if(name0.length > 0){
                                                            main_role = name0[0].player_main_role
                                                            alt_role1 = name0[0].player_alt_role1
                                                            alt_role2 = name0[0].player_alt_role2
                                                            if(alt_role1 == ''){
                                                                alt_role1 = '...'
                                                            }
                                                            if(alt_role2 == ''){
                                                                alt_role2 = '...'
                                                            }
                                                        }
                                                        else{
                                                            let name1 = local_players[0].roles.filter(function(item) {
                                                                return item.player_name.substring(0, 3) == main_data[j].lineup.data[k].player_name.substring(0, 3);
                                                            });
                                                            if(name1.length > 0){
                                                                main_role = name1[0].player_main_role
                                                                alt_role1 = name1[0].player_alt_role1
                                                                alt_role2 = name1[0].player_alt_role2
                                                                if(alt_role1 == ''){
                                                                    alt_role1 = '...'
                                                                }
                                                                if(alt_role2 == ''){
                                                                    alt_role2 = '...'
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            if(main_role == 'GK'){ position = 'GK' }
                                            else if(main_role == 'RB'){ position = 'DEF' }
                                            else if(main_role == 'CB'){ position = 'DEF' }
                                            else if(main_role == 'LB'){ position = 'DEF' }
                                            else if(main_role == 'RM'){ position = 'MID' }
                                            else if(main_role == 'CM'){ position = 'MID' }
                                            else if(main_role == 'LM'){ position = 'MID' }
                                            else if(main_role == 'DM'){ position = 'MID' }
                                            else if(main_role == 'AM'){ position = 'MID' }
                                            else if(main_role == 'RW'){ position = 'FWD' }
                                            else if(main_role == 'LW'){ position = 'FWD' }
                                            else if(main_role == 'SS'){ position = 'FWD' }
                                            else if(main_role == 'CF'){ position = 'FWD' }

                                            let Tit = (0).toFixed(2)
                                            let Tit1 = 0
                                            let Tit2 = 0
                                            let titularity = []
                                            if(main_data[j].visitor_players.length > 0){
                                                titularity = main_data[j].visitor_players[0].titularity.filter(function(item) {
                                                    return item.player_id === main_data[j].lineup.data[k].player_id;
                                                })
                                            }
                                            if(titularity[0]){
                                                let appearences = titularity[0].appearences
                                                let lineups = titularity[0].lineups
                                                let substitute_in = titularity[0].substitute_in
                                                let substitute_out = titularity[0].substitute_out
                                                let presences = titularity[0].appearences

                                                if(lineups !== null && appearences !== null){
                                                    Tit1 = lineups/appearences*100
                                                }
                                                if(presences !== null && substitute_in !== null && substitute_out !== null){
                                                    Tit2 = (lineups + substitute_out - substitute_in)/presences*100
                                                }
                                                if(Tit2 != 0 && Tit1 != 0){
                                                    Tit = (Tit1 + Tit2)/2
                                                }
                                                if(Tit2 == 0 && Tit1 != 0){
                                                    Tit = Tit1
                                                }
                                            }
                                            if(Tit1 == 0 && Tit2 == 0){
                                                Tit = '##'
                                            }
                                            else if(Tit1 != 0 && Tit2 != 0 && Tit == 0){
                                                Tit = (0).toFixed(2)
                                            }
                                            else if(Tit > 0 && Tit <= 100){
                                                let Tit3 = Tit
                                                Tit = Tit3.toFixed(2)
                                            }
                                            else if(Tit < 0){
                                                Tit = (0).toFixed(2)
                                            }
                                            else if(Tit > 100){
                                                Tit = (100).toFixed(2)
                                            }
                                            // console.log('titularity==>', titularity[0])
                                            // console.log('Tit==>', Tit, ', Tit1=>', Tit1, ', Tit2=>', Tit2)
                                            let rule_color = 'rgb(230,184,183)'
                                            // away pre formation part
                                            let s_roles = this.s_role_set.filter(function(item) {
                                                return item.name === awayTeamPformation;
                                            });

                                            if(s_roles.length > 0){
                                                let position_number = main_data[j].lineup.data[k].formation_position
                                                let s_role = s_roles[0].s_role[position_number - 1]
                                                let s_role2 = s_roles[0].alt_s_role[position_number - 1]
                                                let mean_role = s_roles[0].mean_role[position_number - 1]
                                                if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                                    rule_color = 'rgb(146,208,80)'
                                                }
                                                else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                                    rule_color = 'rgb(255,255,0)'
                                                }
                                                else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                                    rule_color = 'rgb(255,0,0)'
                                                }
                                                awayTeam.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id,'formation_position': position_number, 'teamId': visitTeamId, 'sRole': s_role, 'mR': mean_role, 'sRole1': s_role, 'sRole2': s_role2, 'mR1': mean_role, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(230, 184, 183)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit})
                                            }
                                            else{
                                                let position_number = main_data[j].lineup.data[k].formation_position
                                                awayTeam.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id,'formation_position': position_number,  'teamId': visitTeamId, 'sRole': '...', 'mR': position, 'sRole1': '...', 'sRole2': '', 'mR1': position, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(230, 184, 183)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit})
                                            }
                                            // away live formation part
                                            let s_roles_live_a = this.s_role_set.filter(function(item) {
                                                return item.name === awayTeamLformation;
                                            });

                                            if(s_roles_live_a.length > 0){
                                                let position_number = main_data[j].lineup.data[k].formation_position
                                                let s_role = s_roles_live_a[0].s_role[position_number - 1]
                                                let s_role2 = s_roles_live_a[0].alt_s_role[position_number - 1]
                                                let mean_role = s_roles_live_a[0].mean_role[position_number - 1]
                                                if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                                    rule_color = 'rgb(146,208,80)'
                                                }
                                                else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                                    rule_color = 'rgb(255,255,0)'
                                                }
                                                else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                                    rule_color = 'rgb(255,0,0)'
                                                }
                                                awayTeam1.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id,'formation_position': position_number, 'teamId': visitTeamId, 'sRole': s_role, 'mR': mean_role, 'sRole1': s_role, 'sRole2': s_role2, 'mR1': mean_role, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(230, 184, 183)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit})
                                            }
                                            else{
                                                let position_number = main_data[j].lineup.data[k].formation_position
                                                awayTeam1.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id,'formation_position': position_number,  'teamId': visitTeamId, 'sRole': '...', 'mR': position, 'sRole1': '...', 'sRole2': '', 'mR1': position, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(230, 184, 183)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit})
                                            }
                                        }
                                    }

                                    let local_sub_array = []
                                    let visitor_sub_array = []
                                    let localTeam_substitution_index = 0
                                    let visitorTeam_substitution_index = 0
                                    if(main_data[j].events1 != null){
                                        for(let k = 0 ; k < main_data[j].events1.data.length ; k++){
                                            let eventsNode = main_data[j].events1.data[k]
                                            if(eventsNode.type === 'substitution'){
                                                if(eventsNode.team_id == localTeamId){
                                                    localTeam_substitution_index++
                                                    local_sub_array[localTeam_substitution_index - 1] = {'minute': eventsNode.minute, 'player_id': eventsNode.player_id, 'player_name':eventsNode.player_name, 'related_player_id': eventsNode.related_player_id, 'related_player_name': eventsNode.related_player_name}
                                                }
                                                else{
                                                    visitorTeam_substitution_index++
                                                    visitor_sub_array[visitorTeam_substitution_index - 1] = {'minute': eventsNode.minute, 'player_id': eventsNode.player_id, 'player_name':eventsNode.player_name, 'related_player_id': eventsNode.related_player_id, 'related_player_name': eventsNode.related_player_name}
                                                }
                                            }
                                        }
                                    }
                                    let home_order_index = 0
                                    let home_substitutions = []
                                    for(let kk = 0 ; kk < local_sub_array.length; kk++){
                                        for(let k = 0 ; k < homeTeam.length ; k++){
                                            if(homeTeam[k].playerId === local_sub_array[kk].related_player_id){
                                                home_order_index++
                                                homeTeam[k].sub_order_color = this.sub_color_set[home_order_index - 1].color
                                                homeTeam[k].sub_minute = local_sub_array[kk].minute
                                                let local_players_markets = main_data[j].local_players[0].market_values
                                                let local_players_roles = main_data[j].local_players[0].roles
                                                let market_value = '...'
                                                let main_role = '...'
                                                let alt_role1 = '...'
                                                let alt_role2 = '...'
                                                let market_values = local_players_markets.filter(function(item) {
                                                    return item.player_name.substring(item.player_name.length - 4, item.player_name.length) === local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 4, local_sub_array[kk].player_name.length);
                                                });
                                                if(market_values.length > 0){
                                                    market_value = market_values[0].player_marketvalue
                                                }
                                                else{
                                                    let compare_index = 0
                                                    for(let n = 0 ; n < local_players_markets.length ; n++){
                                                        let compare1 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 4, local_players_markets[n].player_name.length - 3)
                                                        let compare2 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 3, local_players_markets[n].player_name.length - 2)
                                                        let compare3 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 2, local_players_markets[n].player_name.length - 1)
                                                        let compare4 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 1, local_players_markets[n].player_name.length)
                                                        let local_compare1 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 4, local_sub_array[kk].player_name.length - 3)
                                                        let local_compare2 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 3, local_sub_array[kk].player_name.length - 2)
                                                        let local_compare3 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 2, local_sub_array[kk].player_name.length - 1)
                                                        let local_compare4 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 1, local_sub_array[kk].player_name.length)
                                                        if(compare1 === local_compare1){
                                                            compare_index++
                                                        }
                                                        else if(compare2 === local_compare2){
                                                            compare_index++
                                                        }
                                                        else if(compare3 === local_compare3){
                                                            compare_index++
                                                        }
                                                        else if(compare4 === local_compare4){
                                                            compare_index++
                                                        }
                                                        if(compare_index >= 3){
                                                            market_value = local_players_markets[n].player_marketvalue
                                                        }
                                                    }
                                                }

                                                let roles = local_players_roles.filter(function(item) {
                                                    return item.player_name.substring(item.player_name.length - 4, item.player_name.length) === local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 4, local_sub_array[kk].player_name.length);
                                                });
                                                if(roles.length > 0){
                                                    main_role = roles[0].player_main_role
                                                    alt_role1 = roles[0].player_alt_role1
                                                    alt_role2 = roles[0].player_alt_role2
                                                }
                                                else{
                                                    let compare_index = 0
                                                    for(let n = 0 ; n < local_players_roles.length ; n++){
                                                        let compare1 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 4, local_players_roles[n].player_name.length - 3)
                                                        let compare2 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 3, local_players_roles[n].player_name.length - 2)
                                                        let compare3 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 2, local_players_roles[n].player_name.length - 1)
                                                        let compare4 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 1, local_players_roles[n].player_name.length)
                                                        let local_compare1 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 4, local_sub_array[kk].player_name.length - 3)
                                                        let local_compare2 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 3, local_sub_array[kk].player_name.length - 2)
                                                        let local_compare3 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 2, local_sub_array[kk].player_name.length - 1)
                                                        let local_compare4 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 1, local_sub_array[kk].player_name.length)
                                                        if(compare1 === local_compare1){
                                                            compare_index++
                                                        }
                                                        else if(compare2 === local_compare2){
                                                            compare_index++
                                                        }
                                                        else if(compare3 === local_compare3){
                                                            compare_index++
                                                        }
                                                        else if(compare4 === local_compare4){
                                                            compare_index++
                                                        }
                                                        if(compare_index >= 3){
                                                            main_role = local_players_roles[n].player_main_role
                                                            alt_role1 = local_players_roles[n].player_alt_role1
                                                            alt_role2 = local_players_roles[n].player_alt_role2
                                                        }
                                                    }
                                                }

                                                let rule_color = 'rgb(216,228,188)'
                                                let mean_role = homeTeam[k].mR
                                                let position = homeTeam[k].p_m_Role
                                                let s_role = homeTeam[k].sRole
                                                let s_role2 = homeTeam[k].sRole2

                                                if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                                    rule_color = 'rgb(146,208,80)'
                                                }
                                                else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                                    rule_color = 'rgb(255,255,0)'
                                                }
                                                else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                                    rule_color = 'rgb(255,0,0)'
                                                }

                                                let titularity = main_data[j].local_players[0].titularity.filter(function(item) {
                                                    return item.player_id === local_sub_array[kk].player_id;
                                                })

                                                let Tit = (0).toFixed(2)
                                                let Tit1 = 0
                                                let Tit2 = 0
                                                if(titularity[0]){
                                                    let appearences = titularity[0].appearences
                                                    let lineups = titularity[0].lineups
                                                    let substitute_in = titularity[0].substitute_in
                                                    let substitute_out = titularity[0].substitute_out
                                                    let presences = titularity[0].appearences

                                                    if(lineups !== null && appearences !== null){
                                                        Tit1 = lineups/appearences*100
                                                    }
                                                    if(presences !== null && substitute_in !== null && substitute_out !== null){
                                                        Tit2 = (lineups + substitute_out - substitute_in)/presences*100
                                                    }
                                                    if(Tit2 != 0 && Tit1 != 0){
                                                        Tit = (Tit1 + Tit2)/2
                                                    }
                                                    if(Tit2 == 0 && Tit1 != 0){
                                                        Tit = Tit1
                                                    }
                                                }
                                                if(Tit1 == 0 && Tit2 == 0){
                                                    Tit = '##'
                                                }
                                                else if(Tit1 != 0 && Tit2 != 0 && Tit == 0){
                                                    Tit = (0).toFixed(2)
                                                }
                                                else if(Tit > 0 && Tit <= 100){
                                                    let Tit3 = Tit
                                                    Tit = Tit3.toFixed(2)
                                                }
                                                else if(Tit < 0){
                                                    Tit = (0).toFixed(2)
                                                }
                                                else if(Tit > 100){
                                                    Tit = (100).toFixed(2)
                                                }
                                                home_substitutions.push({'playerId': local_sub_array[kk].player_id, 'teamId':homeTeam[k].teamId ,'sRole': homeTeam[k].sRole, 'sRole2': homeTeam[k].sRole2, 'mR': homeTeam[k].mR, 'Pname': local_sub_array[kk].player_name, 'marketValue': market_value, 'p_m_Role': homeTeam[k].p_m_Role, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': homeTeam[k].sub_order_color, 'sub_minute': homeTeam[k].sub_minute, 'rule_color': rule_color, 'Tit': Tit})
                                            }
                                        }
                                    }
                                    home_order_index = 0
                                    for(let kk = 0 ; kk < local_sub_array.length; kk++){
                                        for(let k = 0 ; k < homeTeam1.length ; k++){
                                            if(homeTeam1[k].playerId === local_sub_array[kk].related_player_id){
                                                home_order_index++
                                                homeTeam1[k].sub_order_color = this.sub_color_set[home_order_index - 1].color
                                                homeTeam1[k].sub_minute = local_sub_array[kk].minute
                                                let local_players_markets = main_data[j].local_players[0].market_values
                                                let local_players_roles = main_data[j].local_players[0].roles
                                                let market_value = '...'
                                                let main_role = '...'
                                                let alt_role1 = '...'
                                                let alt_role2 = '...'
                                                let market_values = local_players_markets.filter(function(item) {
                                                    return item.player_name.substring(item.player_name.length - 4, item.player_name.length) === local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 4, local_sub_array[kk].player_name.length);
                                                });
                                                if(market_values.length > 0){
                                                    market_value = market_values[0].player_marketvalue
                                                }
                                                else{
                                                    let compare_index = 0
                                                    for(let n = 0 ; n < local_players_markets.length ; n++){
                                                        let compare1 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 4, local_players_markets[n].player_name.length - 3)
                                                        let compare2 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 3, local_players_markets[n].player_name.length - 2)
                                                        let compare3 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 2, local_players_markets[n].player_name.length - 1)
                                                        let compare4 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 1, local_players_markets[n].player_name.length)
                                                        let local_compare1 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 4, local_sub_array[kk].player_name.length - 3)
                                                        let local_compare2 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 3, local_sub_array[kk].player_name.length - 2)
                                                        let local_compare3 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 2, local_sub_array[kk].player_name.length - 1)
                                                        let local_compare4 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 1, local_sub_array[kk].player_name.length)
                                                        if(compare1 === local_compare1){
                                                            compare_index++
                                                        }
                                                        else if(compare2 === local_compare2){
                                                            compare_index++
                                                        }
                                                        else if(compare3 === local_compare3){
                                                            compare_index++
                                                        }
                                                        else if(compare4 === local_compare4){
                                                            compare_index++
                                                        }
                                                        if(compare_index >= 3){
                                                            market_value = local_players_markets[n].player_marketvalue
                                                        }
                                                    }
                                                }

                                                let roles = local_players_roles.filter(function(item) {
                                                    return item.player_name.substring(item.player_name.length - 4, item.player_name.length) === local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 4, local_sub_array[kk].player_name.length);
                                                });
                                                if(roles.length > 0){
                                                    main_role = roles[0].player_main_role
                                                    alt_role1 = roles[0].player_alt_role1
                                                    alt_role2 = roles[0].player_alt_role2
                                                }
                                                else{
                                                    let compare_index = 0
                                                    for(let n = 0 ; n < local_players_roles.length ; n++){
                                                        let compare1 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 4, local_players_roles[n].player_name.length - 3)
                                                        let compare2 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 3, local_players_roles[n].player_name.length - 2)
                                                        let compare3 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 2, local_players_roles[n].player_name.length - 1)
                                                        let compare4 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 1, local_players_roles[n].player_name.length)
                                                        let local_compare1 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 4, local_sub_array[kk].player_name.length - 3)
                                                        let local_compare2 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 3, local_sub_array[kk].player_name.length - 2)
                                                        let local_compare3 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 2, local_sub_array[kk].player_name.length - 1)
                                                        let local_compare4 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 1, local_sub_array[kk].player_name.length)
                                                        if(compare1 === local_compare1){
                                                            compare_index++
                                                        }
                                                        else if(compare2 === local_compare2){
                                                            compare_index++
                                                        }
                                                        else if(compare3 === local_compare3){
                                                            compare_index++
                                                        }
                                                        else if(compare4 === local_compare4){
                                                            compare_index++
                                                        }
                                                        if(compare_index >= 3){
                                                            main_role = local_players_roles[n].player_main_role
                                                            alt_role1 = local_players_roles[n].player_alt_role1
                                                            alt_role2 = local_players_roles[n].player_alt_role2
                                                        }
                                                    }
                                                }

                                                // let rule_color = 'rgb(216,228,188)'
                                                // let mean_role = homeTeam[k].mR
                                                // let position = homeTeam[k].p_m_Role
                                                // let s_role = homeTeam[k].sRole
                                                // let s_role2 = homeTeam[k].sRole2

                                                // if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                                //     rule_color = 'rgb(146,208,80)'
                                                // }
                                                // else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                                //     rule_color = 'rgb(255,255,0)'
                                                // }
                                                // else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                                //     rule_color = 'rgb(255,0,0)'
                                                // }

                                                let titularity = main_data[j].local_players[0].titularity.filter(function(item) {
                                                    return item.player_id === local_sub_array[kk].player_id;
                                                })

                                                let Tit = (0).toFixed(2)
                                                let Tit1 = 0
                                                let Tit2 = 0
                                                if(titularity[0]){
                                                    let appearences = titularity[0].appearences
                                                    let lineups = titularity[0].lineups
                                                    let substitute_in = titularity[0].substitute_in
                                                    let substitute_out = titularity[0].substitute_out
                                                    let presences = titularity[0].appearences

                                                    if(lineups !== null && appearences !== null){
                                                        Tit1 = lineups/appearences*100
                                                    }
                                                    if(presences !== null && substitute_in !== null && substitute_out !== null){
                                                        Tit2 = (lineups + substitute_out - substitute_in)/presences*100
                                                    }
                                                    if(Tit2 != 0 && Tit1 != 0){
                                                        Tit = (Tit1 + Tit2)/2
                                                    }
                                                    if(Tit2 == 0 && Tit1 != 0){
                                                        Tit = Tit1
                                                    }
                                                }
                                                if(Tit1 == 0 && Tit2 == 0){
                                                    Tit = '##'
                                                }
                                                else if(Tit1 != 0 && Tit2 != 0 && Tit == 0){
                                                    Tit = (0).toFixed(2)
                                                }
                                                else if(Tit > 0 && Tit <= 100){
                                                    let Tit3 = Tit
                                                    Tit = Tit3.toFixed(2)
                                                }
                                                else if(Tit < 0){
                                                    Tit = (0).toFixed(2)
                                                }
                                                else if(Tit > 100){
                                                    Tit = (100).toFixed(2)
                                                }
                                                homeTeam1[k].Pname = local_sub_array[kk].player_name
                                                homeTeam1[k].marketValue = market_value
                                                homeTeam1[k].primaryRole = main_role
                                                homeTeam1[k].altRole1 = alt_role1
                                                homeTeam1[k].altRole2 = alt_role2
                                                homeTeam1[k].Tit = Tit
                                                // homeTeam1[k].rule_color = rule_color
                                                // home_substitutions.push({'playerId': local_sub_array[kk].player_id, 'teamId':homeTeam[k].teamId ,'sRole': homeTeam[k].sRole, 'sRole2': homeTeam[k].sRole2, 'mR': homeTeam[k].mR, 'Pname': local_sub_array[kk].player_name, 'marketValue': market_value, 'p_m_Role': homeTeam[k].p_m_Role, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': homeTeam[k].sub_order_color, 'sub_minute': homeTeam[k].sub_minute, 'rule_color': rule_color, 'Tit': Tit})
                                            }
                                        }
                                    }
                                    let away_order_index = 0
                                    let away_substitutions = []
                                    for(let kk = 0 ; kk < visitor_sub_array.length; kk++){
                                        for(let k = 0 ; k < awayTeam.length ; k++){
                                            if(awayTeam[k].playerId === visitor_sub_array[kk].related_player_id){
                                                away_order_index++
                                                awayTeam[k].sub_order_color = this.sub_color_set[away_order_index - 1].color
                                                awayTeam[k].sub_minute = visitor_sub_array[kk].minute

                                                let visitor_players_markets = []
                                                let visitor_players_roles = []
                                                if(main_data[j].visitor_players.length > 0){
                                                    visitor_players_markets = main_data[j].visitor_players[0].market_values
                                                    visitor_players_roles = main_data[j].visitor_players[0].roles
                                                }
                                                let market_value = '...'
                                                let main_role = '...'
                                                let alt_role1 = '...'
                                                let alt_role2 = '...'
                                                let market_values = visitor_players_markets.filter(function(item) {
                                                    return item.player_name.substring(item.player_name.length - 4, item.player_name.length) === visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 4, visitor_sub_array[kk].player_name.length);
                                                });
                                                if(market_values.length > 0){
                                                    market_value = market_values[0].player_marketvalue
                                                }
                                                else{
                                                    let compare_index = 0
                                                    for(let n = 0 ; n < visitor_players_markets.length ; n++){
                                                        let compare1 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 4, visitor_players_markets[n].player_name.length - 3)
                                                        let compare2 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 3, visitor_players_markets[n].player_name.length - 2)
                                                        let compare3 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 2, visitor_players_markets[n].player_name.length - 1)
                                                        let compare4 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 1, visitor_players_markets[n].player_name.length)
                                                        let local_compare1 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 4, visitor_sub_array[kk].player_name.length - 3)
                                                        let local_compare2 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 3, visitor_sub_array[kk].player_name.length - 2)
                                                        let local_compare3 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 2, visitor_sub_array[kk].player_name.length - 1)
                                                        let local_compare4 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 1, visitor_sub_array[kk].player_name.length)
                                                        if(compare1 === local_compare1){
                                                            compare_index++
                                                        }
                                                        else if(compare2 === local_compare2){
                                                            compare_index++
                                                        }
                                                        else if(compare3 === local_compare3){
                                                            compare_index++
                                                        }
                                                        else if(compare4 === local_compare4){
                                                            compare_index++
                                                        }
                                                        if(compare_index >= 3){
                                                            market_value = visitor_players_markets[n].player_marketvalue
                                                        }
                                                    }
                                                }

                                                let roles = visitor_players_roles.filter(function(item) {
                                                    return item.player_name.substring(item.player_name.length - 4, item.player_name.length) === visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 4, visitor_sub_array[kk].player_name.length);
                                                });
                                                if(roles.length > 0){
                                                    main_role = roles[0].player_main_role
                                                    alt_role1 = roles[0].player_alt_role1
                                                    alt_role2 = roles[0].player_alt_role2
                                                }
                                                else{
                                                    let compare_index = 0
                                                    for(let n = 0 ; n < visitor_players_roles.length ; n++){
                                                        let compare1 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 4, visitor_players_roles[n].player_name.length - 3)
                                                        let compare2 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 3, visitor_players_roles[n].player_name.length - 2)
                                                        let compare3 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 2, visitor_players_roles[n].player_name.length - 1)
                                                        let compare4 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 1, visitor_players_roles[n].player_name.length)
                                                        let local_compare1 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 4, visitor_sub_array[kk].player_name.length - 3)
                                                        let local_compare2 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 3, visitor_sub_array[kk].player_name.length - 2)
                                                        let local_compare3 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 2, visitor_sub_array[kk].player_name.length - 1)
                                                        let local_compare4 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 1, visitor_sub_array[kk].player_name.length)
                                                        if(compare1 === local_compare1){
                                                            compare_index++
                                                        }
                                                        else if(compare2 === local_compare2){
                                                            compare_index++
                                                        }
                                                        else if(compare3 === local_compare3){
                                                            compare_index++
                                                        }
                                                        else if(compare4 === local_compare4){
                                                            compare_index++
                                                        }
                                                        if(compare_index >= 3){
                                                            main_role = visitor_players_roles[n].player_main_role
                                                            alt_role1 = visitor_players_roles[n].player_alt_role1
                                                            alt_role2 = visitor_players_roles[n].player_alt_role2
                                                        }
                                                    }
                                                }

                                                let rule_color = 'rgb(230,184,183)'
                                                let mean_role = awayTeam[k].mR
                                                let position = awayTeam[k].p_m_Role
                                                let s_role = awayTeam[k].sRole
                                                let s_role2 = awayTeam[k].sRole2

                                                if(s_role2 === ''){
                                                    s_role2 = '...'
                                                }

                                                if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                                    rule_color = 'rgb(146,208,80)'
                                                    if(localTeamId === 3562){
                                                        console.log('awayTeamPlayer=>',s_role, ', primaryRole=>', main_role,', player=>', visitor_sub_array[kk].player_name)
                                                    }
                                                }
                                                else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                                    rule_color = 'rgb(255,255,0)'
                                                }
                                                else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                                    rule_color = 'rgb(255,0,0)'
                                                }

                                                let titularity = []
                                                if(main_data[j].visitor_players.length > 0){
                                                    titularity = main_data[j].visitor_players[0].titularity.filter(function(item) {
                                                        return item.player_id === visitor_sub_array[kk].player_id;
                                                    })
                                                }
                                                let Tit = (0).toFixed(2)
                                                let Tit1 = 0
                                                let Tit2 = 0

                                                if(titularity[0]){
                                                    let appearences = titularity[0].appearences
                                                    let lineups = titularity[0].lineups
                                                    let substitute_in = titularity[0].substitute_in
                                                    let substitute_out = titularity[0].substitute_out
                                                    let presences = titularity[0].appearences

                                                    if(lineups !== null && appearences !== null){
                                                        Tit1 = lineups/appearences*100
                                                    }
                                                    if(presences !== null && substitute_in !== null && substitute_out !== null){
                                                        Tit2 = (lineups + substitute_out - substitute_in)/presences*100
                                                    }
                                                    if(Tit2 != 0 && Tit1 != 0){
                                                        Tit = (Tit1 + Tit2)/2
                                                    }
                                                    if(Tit2 == 0 && Tit1 != 0){
                                                        Tit = Tit1
                                                    }
                                                }
                                                if(Tit1 == 0 && Tit2 == 0){
                                                    Tit = '##'
                                                }
                                                else if(Tit1 != 0 && Tit2 != 0 && Tit == 0){
                                                    Tit = (0).toFixed(2)
                                                }
                                                else if(Tit > 0 && Tit <= 100){
                                                    let Tit3 = Tit
                                                    Tit = Tit3.toFixed(2)
                                                }
                                                else if(Tit < 0){
                                                    Tit = (0).toFixed(2)
                                                }
                                                else if(Tit > 100){
                                                    Tit = (100).toFixed(2)
                                                }
                                                away_substitutions.push({'playerId': visitor_sub_array[kk].player_id, 'teamId':awayTeam[k].teamId ,'sRole': awayTeam[k].sRole, 'sRole2': awayTeam[k].sRole2, 'mR': awayTeam[k].mR, 'Pname': visitor_sub_array[kk].player_name, 'marketValue': market_value, 'p_m_Role': awayTeam[k].p_m_Role, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': awayTeam[k].sub_order_color, 'sub_minute': awayTeam[k].sub_minute,'rule_color': rule_color, 'Tit': Tit})
                                            }
                                        }
                                    }
                                    away_order_index = 0
                                    for(let kk = 0 ; kk < visitor_sub_array.length; kk++){
                                        for(let k = 0 ; k < awayTeam1.length ; k++){
                                            if(awayTeam1[k].playerId === visitor_sub_array[kk].related_player_id){
                                                away_order_index++
                                                awayTeam1[k].sub_order_color = this.sub_color_set[away_order_index - 1].color
                                                awayTeam1[k].sub_minute = visitor_sub_array[kk].minute

                                                let visitor_players_markets = []
                                                let visitor_players_roles = []
                                                if(main_data[j].visitor_players.length > 0){
                                                    visitor_players_markets = main_data[j].visitor_players[0].market_values
                                                    visitor_players_roles = main_data[j].visitor_players[0].roles
                                                }

                                                let market_value = '...'
                                                let main_role = '...'
                                                let alt_role1 = '...'
                                                let alt_role2 = '...'
                                                let market_values = visitor_players_markets.filter(function(item) {
                                                    return item.player_name.substring(item.player_name.length - 4, item.player_name.length) === visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 4, visitor_sub_array[kk].player_name.length);
                                                });
                                                if(market_values.length > 0){
                                                    market_value = market_values[0].player_marketvalue
                                                }
                                                else{
                                                    let compare_index = 0
                                                    for(let n = 0 ; n < visitor_players_markets.length ; n++){
                                                        let compare1 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 4, visitor_players_markets[n].player_name.length - 3)
                                                        let compare2 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 3, visitor_players_markets[n].player_name.length - 2)
                                                        let compare3 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 2, visitor_players_markets[n].player_name.length - 1)
                                                        let compare4 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 1, visitor_players_markets[n].player_name.length)
                                                        let local_compare1 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 4, visitor_sub_array[kk].player_name.length - 3)
                                                        let local_compare2 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 3, visitor_sub_array[kk].player_name.length - 2)
                                                        let local_compare3 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 2, visitor_sub_array[kk].player_name.length - 1)
                                                        let local_compare4 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 1, visitor_sub_array[kk].player_name.length)
                                                        if(compare1 === local_compare1){
                                                            compare_index++
                                                        }
                                                        else if(compare2 === local_compare2){
                                                            compare_index++
                                                        }
                                                        else if(compare3 === local_compare3){
                                                            compare_index++
                                                        }
                                                        else if(compare4 === local_compare4){
                                                            compare_index++
                                                        }
                                                        if(compare_index >= 3){
                                                            market_value = visitor_players_markets[n].player_marketvalue
                                                        }
                                                    }
                                                }

                                                let roles = visitor_players_roles.filter(function(item) {
                                                    return item.player_name.substring(item.player_name.length - 4, item.player_name.length) === visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 4, visitor_sub_array[kk].player_name.length);
                                                });
                                                if(roles.length > 0){
                                                    main_role = roles[0].player_main_role
                                                    alt_role1 = roles[0].player_alt_role1
                                                    alt_role2 = roles[0].player_alt_role2
                                                }
                                                else{
                                                    let compare_index = 0
                                                    for(let n = 0 ; n < visitor_players_roles.length ; n++){
                                                        let compare1 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 4, visitor_players_roles[n].player_name.length - 3)
                                                        let compare2 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 3, visitor_players_roles[n].player_name.length - 2)
                                                        let compare3 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 2, visitor_players_roles[n].player_name.length - 1)
                                                        let compare4 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 1, visitor_players_roles[n].player_name.length)
                                                        let local_compare1 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 4, visitor_sub_array[kk].player_name.length - 3)
                                                        let local_compare2 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 3, visitor_sub_array[kk].player_name.length - 2)
                                                        let local_compare3 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 2, visitor_sub_array[kk].player_name.length - 1)
                                                        let local_compare4 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 1, visitor_sub_array[kk].player_name.length)
                                                        if(compare1 === local_compare1){
                                                            compare_index++
                                                        }
                                                        else if(compare2 === local_compare2){
                                                            compare_index++
                                                        }
                                                        else if(compare3 === local_compare3){
                                                            compare_index++
                                                        }
                                                        else if(compare4 === local_compare4){
                                                            compare_index++
                                                        }
                                                        if(compare_index >= 3){
                                                            main_role = visitor_players_roles[n].player_main_role
                                                            alt_role1 = visitor_players_roles[n].player_alt_role1
                                                            alt_role2 = visitor_players_roles[n].player_alt_role2
                                                        }
                                                    }
                                                }

                                                // let rule_color = 'rgb(230,184,183)'
                                                // let mean_role = awayTeam[k].mR
                                                // let position = awayTeam[k].p_m_Role
                                                // let s_role = awayTeam[k].sRole
                                                // let s_role2 = awayTeam[k].sRole2
                                                //
                                                // if(s_role2 === ''){
                                                //     s_role2 = '...'
                                                // }
                                                //
                                                // if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                                //     rule_color = 'rgb(146,208,80)'
                                                //     if(localTeamId === 3562){
                                                //         console.log('awayTeamPlayer=>',s_role, ', primaryRole=>', main_role,', player=>', visitor_sub_array[kk].player_name)
                                                //     }
                                                // }
                                                // else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                                //     rule_color = 'rgb(255,255,0)'
                                                // }
                                                // else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                                //     rule_color = 'rgb(255,0,0)'
                                                // }
                                                let titularity = []
                                                if(main_data[j].visitor_players.length > 0){
                                                    titularity = main_data[j].visitor_players[0].titularity.filter(function(item) {
                                                        return item.player_id === visitor_sub_array[kk].player_id;
                                                    })
                                                }

                                                let Tit = (0).toFixed(2)
                                                let Tit1 = 0
                                                let Tit2 = 0

                                                if(titularity[0]){
                                                    let appearences = titularity[0].appearences
                                                    let lineups = titularity[0].lineups
                                                    let substitute_in = titularity[0].substitute_in
                                                    let substitute_out = titularity[0].substitute_out
                                                    let presences = titularity[0].appearences

                                                    if(lineups !== null && appearences !== null){
                                                        Tit1 = lineups/appearences*100
                                                    }
                                                    if(presences !== null && substitute_in !== null && substitute_out !== null){
                                                        Tit2 = (lineups + substitute_out - substitute_in)/presences*100
                                                    }
                                                    if(Tit2 != 0 && Tit1 != 0){
                                                        Tit = (Tit1 + Tit2)/2
                                                    }
                                                    if(Tit2 == 0 && Tit1 != 0){
                                                        Tit = Tit1
                                                    }
                                                }
                                                if(Tit1 == 0 && Tit2 == 0){
                                                    Tit = '##'
                                                }
                                                else if(Tit1 != 0 && Tit2 != 0 && Tit == 0){
                                                    Tit = (0).toFixed(2)
                                                }
                                                else if(Tit > 0 && Tit <= 100){
                                                    let Tit3 = Tit
                                                    Tit = Tit3.toFixed(2)
                                                }
                                                else if(Tit < 0){
                                                    Tit = (0).toFixed(2)
                                                }
                                                else if(Tit > 100){
                                                    Tit = (100).toFixed(2)
                                                }
                                                awayTeam1[k].Pname = visitor_sub_array[kk].player_name
                                                awayTeam1[k].marketValue = market_value
                                                awayTeam1[k].primaryRole = main_role
                                                awayTeam1[k].altRole1 = alt_role1
                                                awayTeam1[k].altRole2 = alt_role2
                                                awayTeam1[k].Tit = Tit

                                                // away_substitutions.push({'playerId': visitor_sub_array[kk].player_id, 'teamId':awayTeam[k].teamId ,'sRole': awayTeam[k].sRole, 'sRole2': awayTeam[k].sRole2, 'mR': awayTeam[k].mR, 'Pname': visitor_sub_array[kk].player_name, 'marketValue': market_value, 'p_m_Role': awayTeam[k].p_m_Role, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': awayTeam[k].sub_order_color, 'sub_minute': awayTeam[k].sub_minute,'rule_color': rule_color, 'Tit': Tit})
                                            }
                                        }
                                    }
                                    let home_legend = []
                                    let away_legend = []
                                    for(let k = 0 ; k < home_substitutions.length ; k++){
                                        home_legend.push(this.sub_color_set[k])
                                    }
                                    for(let k = 0 ; k < away_substitutions.length ; k++){
                                        away_legend.push(this.sub_color_set[k])
                                    }
                                    homeTeam.sort(this.sortByProperty('formation_position'))
                                    awayTeam.sort(this.sortByProperty('formation_position'))
                                    homeTeam1.sort(this.sortByProperty('formation_position'))
                                    awayTeam1.sort(this.sortByProperty('formation_position'))
                                    let home_rule_color_number = {"green_color": 0, "yellow_color": 0, "red_color": 0}
                                    for(let pp = 0 ; pp < homeTeam.length ; pp++){
                                        if(homeTeam[pp].rule_color === 'rgb(146,208,80)'){
                                            home_rule_color_number.green_color++
                                        }
                                        else if(homeTeam[pp].rule_color === 'rgb(255,255,0)'){
                                            home_rule_color_number.yellow_color++
                                        }
                                        else if(homeTeam[pp].rule_color === 'rgb(255,0,0)'){
                                            home_rule_color_number.red_color++
                                        }
                                    }

                                    let away_rule_color_number = {"green_color": 0, "yellow_color": 0, "red_color": 0}
                                    for(let pp = 0 ; pp < awayTeam.length ; pp++){
                                        if(awayTeam[pp].rule_color === 'rgb(146,208,80)'){
                                            away_rule_color_number.green_color++
                                        }
                                        else if(awayTeam[pp].rule_color === 'rgb(255,255,0)'){
                                            away_rule_color_number.yellow_color++
                                        }
                                        else if(awayTeam[pp].rule_color === 'rgb(255,0,0)'){
                                            away_rule_color_number.red_color++
                                        }
                                    }
                                    countryCode = main_data[j].countryCode
                                    events[k - 1] = {'eventName': main_data[j].time.starting_at.time.substring(0, 5) + ' ' + main_data[j].localTeamName + '(' + main_data[j].standing.localteam_position + ')' + ' v ' + main_data[j].visitorTeamName +  '(' + main_data[j].standing.visitorteam_position + ')', 'openDate':  main_data[j].time.starting_at.time, 'homeTeam': homeTeam, 'awayTeam': awayTeam, 'homeTeam1': homeTeam1, 'awayTeam1': awayTeam1, 'homeTeamName': homeTeamName, 'awayTeamName': awayTeamName, 'homeTeamformation': homeTeamFormation, 'awayTeamformation': awayTeamFormation, 'homeTeamPformation': homeTeamPformation, 'awayTeamPformation': awayTeamPformation,  'homeTeamLformation': homeTeamLformation, 'awayTeamLformation': awayTeamLformation, 'home_substitutions': home_substitutions, 'away_substitutions': away_substitutions, 'home_legend': home_legend, 'away_legend': away_legend, 'home_rule_set': home_rule_color_number, 'away_rule_set': away_rule_color_number}
                                }
                            }
                        }
                        let countryName = this.countryCodeList.filter(function(item) {
                            return item.ccode == countryCode;
                        });

                        if(countryName.length > 0 && events.length > 0){
                            this.mainList.push({'country': countryName[0].cname, 'league': competitionArray[i], 'percentage': percentage, 'numbers': numbers, 'events': events})
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
            sortJSON(data, key){
                return data.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            },
            sortByProperty(property){
                return function(a,b){
                    if(a[property] > b[property])
                        return 1;
                    else if(a[property] < b[property])
                        return -1;
                    return 0;
                }
            }
        },
        created() {
            this.readData()
        }
    }
</script>
<style>
    .eventdays select{
        padding-left: 5px;
    }
    .event-graph{
        height: auto;
        background: #f9f9f9;
        padding: 20px 20px;
    }
    .unit-analysis{
        border: 1px solid gray;
        padding: 30px 10px;
    }
    .homeTeam_Container{
        width: 100%;
        min-height: 450px;
        border: 1px solid lightgrey;
        font-size: 12px;
    }
    .awayTeam_Container{
        width: 100%;
        min-height: 450px;
        border: 1px solid lightgrey;
        font-size: 12px;
        margin-top: 25px;
    }
    .home_main_tab{
        width: 100%;
        height: 420px;
        padding: 0px;
        padding-top: 5px;
    }
    .content{
        width: 100%;
    }
    .lineup-selector{
        width: 70px;
        margin-bottom: 0;
        float: left;
        margin-left: 10px;
    }
    .lineup-selector select{
        border-radius: 0;
        padding: 0;
        padding-left: 5px;
        padding-right: 5px;
        height: 20px;
    }
</style>
