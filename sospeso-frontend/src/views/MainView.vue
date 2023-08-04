<template>
    <div>
        <CCard>
            <CCardHeader>
                <img src="/img/betlogo.png" width="200px;"/>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol lg="6">
                        <label style="font-size: 14px!important; font-weight: 600;">Match</label>
                        <div class="match-container">
                            <CRow>
                                <CCol sm="10">
                                    <label style="color: red; font-weight: 600;">Select Match({{this.eventLists3.length - 1}})</label>
                                    <CSelect
                                            :value.sync = "key1"
                                            :options="eventLists3"
                                            @update:value="select_match"
                                    >
                                    </CSelect>
                                    <p style="text-align: center; margin-bottom: 8px;"><strong style="color: blue">{{this.competitionName}}</strong></p>
                                </CCol>
                                <CCol sm="2">
                                    <label style="color: red; font-weight: 600; width: 100%; text-align: center;">Open:</label>
                                    <div style="width: 30px; margin: auto">
                                        <a :href="oddUrl" target="_blank">
                                            <img src="/img/chrom.png" width="30px;" height="30px;"/>
                                        </a>
                                    </div>
                                </CCol>
                                <!--                                <CCol sm="6" :style="{'display': this.predictionWidth}">-->
                                <!--                                    <label style="color: white; font-weight: 600;">All Games</label>-->
                                <!--                                    <CSelect-->
                                <!--                                            :options="gameList1"-->
                                <!--                                            :value.sync = "key"-->
                                <!--                                            @update:value="select_game"-->
                                <!--                                    >-->
                                <!--                                    </CSelect>-->
                                <!--                                </CCol>-->
                                <!--                                <CCol sm="2">-->
                                <!--                                    <div style="margin-bottom: 40px; ">-->
                                <!--                                        <label style="color: red; font-weight: 600;">Predictions</label>-->
                                <!--                                        <CInputCheckbox class="check-box"-->
                                <!--                                            :checked="true"-->
                                <!--                                            @update:checked="select_prediction"-->
                                <!--                                        >-->
                                <!--                                        </CInputCheckbox>-->
                                <!--                                    </div>-->
                                <!--                                </CCol>-->
                                <CCol sm="6">
                                    <label style="color: red; font-weight: 600;">Score:</label>
                                    <div class="score">
                                        <div v-if="timeRecord.includes('undefined') === false" style="background: #20a052;
                                            text-align: center;
                                            font-weight: 600;
                                            color: #fff;
                                            height: 30px;
                                            padding-top: 2px;
                                            border: 1px solid white;
                                            font-size: 17px!important;
                                            ">
                                            <label style="font-size: 17px!important;">{{this.status}}</label> {{this.timeRecord}}
                                        </div>
                                        <div v-else style="background: #20a052;
                                            text-align: center;
                                            font-weight: 600;
                                            color: #fff;
                                            height: 30px;
                                            padding-top: 2px;
                                            border: 1px solid white;
                                            font-size: 17px!important;
                                            ">
                                            <label style="font-size: 17px!important;">Live</label>
                                        </div>
                                        <div v-if="this.marketStatus == 'SUSPENDED' || this.marketStatus ==  'CLOSED' " style="width: 130px;
                                                height: 30px;
                                                background: rgba(255,255,255,0.8);
                                                margin: auto;
                                                margin-top:-30px;
                                                border-radius: 3px;
                                                border: 1px solid red;
                                                color: red;
                                                padding-top: 3px;
                                                text-align: center;
                                                font-weight: 600;
                                                position: relative;">
                                            {{this.marketStatus}}
                                        </div>
                                        <div style="background: #4db375;
                                                    font-size: 25px;
                                                    text-align: center;
                                                    font-weight: 600;
                                                    margin-bottom: 10px;
                                                    padding: 5px;
                                                    color: white;
                                                    height: 50px;
                                                    border: 1px solid white;
                                                    border-top: none;
                                                    ">
                                            <p v-if="this.scoreOne" style="font-weight: 600; font-size: 24px!important;">
                                                {{this.scoreOne}}  {{this.scoreTwo}}
                                            </p>
                                        </div>
                                    </div>
                                    <label style="color: red; font-weight: 600;">
                                        Notifications:
                                    </label>
                                    <div style="background: #f4e7e9; height: 34px; border: 1px solid rgba(255,192,203,0.71);">

                                    </div>
                                </CCol>
                                <CCol sm="6">
                                    <CRow>
                                        <CCol sm="6" >
                                            <label style="color: red; font-weight: 600;">Odds:</label>
                                            <div style="width: 100%;
                                                        display: flex;
                                                        background: #6cd7fd;
                                                        text-align: center;
                                                        height: 30px;
                                                        border: 1px solid white;
                                                ">
                                                <p style="margin-bottom: 0; text-align: center; width: 100%; font-weight: 600; padding-top: 2px; font-size: 14px!important;">Back</p>
                                            </div>
                                            <div style="display: flex;
                                                        width: 100%;
                                                        background: #b7eafc;
                                                        text-align: center;
                                                        height: 25px;
                                                        border: 1px solid white;
                                                        border-top: none;
                                                ">
                                                <transition name="slide-fade" mode="out-in">
                                                    <p :key="this.back" style="margin-bottom: 0; text-align: center; width: 100%; height: 23px; font-weight: 600; font-size: 14px!important;">
                                                        {{this.back}}
                                                    </p>
                                                </transition>

                                            </div>
                                            <div style="display: flex;
                                                        width: 100%;
                                                        background: #b5e8fa;
                                                        text-align: center;
                                                        height: 25px;
                                                        border: 1px solid white;
                                                        border-top: none;
                                                ">
                                                <transition name="slide-fade" mode="out-in">
                                                    <p :key="this.back_matched" v-if="this.back_matched != 0" style="padding-top: 2px; margin-bottom: 0; text-align: center; width: 100%; height: 23px;">
                                                        &euro;{{this.back_matched}}
                                                    </p>
                                                </transition>
                                            </div>
                                            <p style="text-align: center; width: 100%; min-width: 100px; font-weight: 600;">Total Matched</p>
                                            <CButton
                                                    color="info"
                                                    class="refresh-btn"
                                            >
                                                Refresh
                                            </CButton>
                                        </CCol>
                                        <CCol sm="6" >
                                            <label style="color: #fff">Odds:</label>
                                            <div style="width: 100%;
                                                        display: flex;
                                                        background: #fac9d1;
                                                        text-align: center;
                                                        height: 30px;
                                                        border: 1px solid white;
                                                        padding: 2px;">
                                                <p style="margin-bottom: 0; text-align: center; width: 100%; font-weight: 600; font-size: 14px!important;">Lay</p>
                                            </div>
                                            <div style="display: flex;
                                                        width: 100%;
                                                        background: #fdecef;
                                                        text-align: center;
                                                        height: 25px;
                                                        border: 1px solid white;
                                                        border-top: none;
                                                         ">
                                                <transition name="slide-fade" mode="out-in">
                                                    <p :key="this.lay" style="margin-bottom: 0; text-align: center; width: 100%; height: 23px; font-weight: 600; font-size: 14px!important;">
                                                        {{this.lay}}
                                                    </p>
                                                </transition>
                                            </div>
                                            <div style="display: flex;
                                                        width: 100%;
                                                        background: #fdecef;
                                                        text-align: center;
                                                        height: 25px;
                                                        border: 1px solid white;
                                                        border-top: none;
                                                        ">
                                                <transition name="slide-fade" mode="out-in">
                                                    <p :key="this.lay_matched" v-if="this.lay_matched != 0" style="padding-top: 2px; margin-bottom: 0; text-align: center; width: 100%; height: 23px;">
                                                        &euro;{{this.lay_matched}}
                                                    </p>
                                                </transition>
                                            </div>
                                            <p style="text-align: center; width: 90%; font-weight: 600;">&euro;{{this.total_matched}}</p>
                                            <CButton
                                                    color="info"
                                                    class="stop-btn"
                                            >
                                                Stop
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </div>
                    </CCol>
                    <CCol lg="6">
                        <label  style="font-size: 14px!important; font-weight: 600;">Filter</label>
                        <div class="filter-container">
                            <label style="color: red; font-weight: 600;">
                                General Filters:
                            </label>
                            <div style="display: flex; margin-bottom: 12px; min-height: 87px;">
                                <div style="width: 20%; flex: 1; text-align: left">
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter1"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            1
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter2"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            x
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter3"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            2
                                        </template>
                                    </CInputCheckbox>
                                </div>
                                <div style="width: 20%; flex: 1; text-align: left">
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter4"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            O 0.5
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter5"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            O 1.5
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter6"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            O 2.5
                                        </template>
                                    </CInputCheckbox>
                                </div>
                                <div style="width: 20%; flex: 1; text-align: left">
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter7"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            U 2.5
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter8"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            U 3.5
                                        </template>
                                    </CInputCheckbox>
                                </div>
                                <div style="width: 25%; flex: 1; ">
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter9"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            Back
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter10"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            Lay
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter11"
                                    >
                                        <template #label>
                                            Double Tips
                                        </template>
                                    </CInputCheckbox>
                                </div>
                                <div style="width: 15%; flex: 1;">
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter12"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            Cup
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter13"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            Week
                                        </template>
                                    </CInputCheckbox>
                                </div>
                            </div>
                            <label style="color: red; font-weight: 600;">Odd Filters:</label>
                            <div style="display: flex; margin-bottom: 15px;">
                                <div style="flex: 1;">
                                    <label style="float: left; margin-top: 6px; margin-right: 5px;">min:</label>
                                    <CInput type="number" min="0" max="90000000" :value="this.oddMin" @update:value="odd_min" class="odd-filter-inputbox"></CInput>
                                </div>
                                <div style="flex: 1; width: 40%">
                                    <label style="float: left; margin-top: 6px; margin-right: 5px;">max:</label>
                                    <CInput type="number" min="0" max="100000" :value="this.oddMax" @update:value="odd_max" class="odd-filter-inputbox"></CInput>
                                </div>
                            </div>
                            <label style="color: red; font-weight: 600;">Matched Filters:</label>
                            <div style="display: flex;">
                                <div style="flex: 2;">
                                    <label style="float: left; margin-top: 6px; margin-right: 5px;">min:</label>
                                    <CInput type="number" min="0" max="90000000" :value="this.matchedMin" @update:value="matched_min" class="odd-filter-inputbox"></CInput>
                                </div>
                                <!--                                <div style="flex: 1; width: 40%">-->
                                <!--                                    <label style="float: left; margin-top: 6px; margin-right: 5px;">max:</label>-->
                                <!--                                    <CInput type="number" min="0" max="90000000" :value="this.matchedMax" @update:value="matched_max" class="odd-filter-inputbox"></CInput>-->
                                <!--                                </div>-->
                            </div>
                        </div>
                    </CCol>
                    <!--                    <CCol lg="2">-->
                    <!--                        <label>Data Option</label>-->
                    <!--                        <div class="data_option-container">-->

                    <!--                            <div style="margin: auto; width: 80%; max-width: 200px; margin-bottom: 23px;">-->
                    <!--                                <label style="color: red; font-weight: 600;">Select Odd from:</label>-->
                    <!--                                <CSelect-->
                    <!--                                        :options="this.select_odd_from"-->
                    <!--                                        @update:value="this.bet_src"-->
                    <!--                                >-->
                    <!--                                </CSelect>-->
                    <!--                            </div>-->
                    <!--                        </div>-->
                    <!--                    </CCol>-->
                    <CCol lg="12" style="height: 20px;"></CCol>
                    <CCol lg="6">
                        <div class="select-container">
                            <label  style="font-size: 14px!important; font-weight: 600;">Select</label>
                            <div class="select-container1">
                                <CRow>
                                    <CCol sm="3">
                                        <div style="margin: auto; width: 100%; ">
                                            <label style="color: red; font-weight: 600;">Enter the Odd:</label>
                                            <CInput
                                                    type="number"
                                                    :value="calc_odd"
                                                    @update:value = "odd_calc"
                                            ></CInput>
                                        </div>
                                        <label style="font-weight: 600;">pre-match Odd</label><br>
                                        <label style="font-weight: 600; margin-bottom: 20px; color: blue;">{{this.prematchOdd}}</label><br>
                                        <label style="font-weight: 600;">Max Potential earn</label><br>
                                        <label style="font-weight: 600; color: blue;">
                                            &euro;{{max_profit}}
                                        </label>
                                    </CCol>
                                    <CCol sm="4">
                                        <div style="width: 100%; ">
                                            <label style="color: red; font-weight: 600;">Enter the Stake:</label>
                                            <CInput
                                                    type="number"
                                                    :value="calc_stake"
                                                    @update:value = "stake_calc"
                                            ></CInput>
                                            <label v-if="selectedArray[6] == 1" style="font-weight: 600;">
                                                Responsability:<span style="color: blue;"> &euro;{{max_lose}}</span>
                                            </label><br>
                                            <label style="color: red; font-weight: 600;">Bookmaker Commissions(%):</label>
                                            <CInput
                                                    type="number"
                                                    @update:value = "bookmaker_fee"
                                            ></CInput>
                                            <CButton
                                                    color="info"
                                                    class="m-2"
                                            >
                                                Save match Data
                                            </CButton>
                                        </div>
                                    </CCol>
                                    <CCol sm="5">
                                        <div style="width: 100%; ">
                                            <label style="color: red; font-weight: 600;">Select Risk Trading:</label>
                                            <CSelect
                                                    :options="[ { value: '0', label: 'Easy' }, { value: '1', label: 'Medium' }, { value: '2', label: 'Risky' }]"
                                                    @update:value="riskMode"
                                            >
                                            </CSelect>
                                            <div style="margin-top: 34px;">
                                                <div style="float: left; width: 46%">
                                                    <label style="color: red; font-weight: 600;">Trading Mode:</label>
                                                    <CInputCheckbox
                                                            class="check-box0"
                                                            @update:checked="tradingModefunction"
                                                            :checked = "false"
                                                    >
                                                    </CInputCheckbox>
                                                </div>
                                                <div style="float: right; width: 46%">
                                                    <label style="color: red; font-weight: 600;">Stop Losses:</label>
                                                    <CInputCheckbox
                                                            class="check-box0"
                                                            @update:checked="stopLossfunction"
                                                            :checked = "false"
                                                    >
                                                    </CInputCheckbox>
                                                </div>
                                            </div>
                                            <div>
                                                <CButton
                                                        color="danger"
                                                        class="m-2"
                                                >
                                                    Delete match Data
                                                </CButton>
                                            </div>

                                        </div>
                                    </CCol>
                                </CRow>
                            </div>
                            <label  style="font-size: 14px!important; font-weight: 600;">Messages</label>
                            <div class="select-container2">
                                <CRow>
                                    <CCol sm="9">
                                        <label style="color: red; font-weight: 600;">Cash out bar:</label>
                                        <div style="">
                                            <div class="percent1" :style="{'background': percentBackgroundColor, 'color': percentTextColor1, 'text-align': 'center', 'width': '100%', 'padding': '2px', 'font-size': '18px!important', 'font-weight': '700', 'font-style': 'italic'}">
                                                {{this.percent_text1}}
                                            </div>
                                            <div v-if="percent_text1 != ''" class="percent2" :style="{'background': percentBackgroundColor1, 'color': percentTextColor, 'text-align': 'center', 'width': '100%', 'padding': '2px','padding-bottom': '5px', 'font-size': '18px!important', 'font-weight': '700', 'font-style': 'italic'}">
                                                {{this.percent_text2}}
                                            </div>
                                            <div v-if="percent_text1 == ''" class="percent2" :style="{'background': percentBackgroundColor1, 'color': percentTextColor, 'text-align': 'center', 'width': '100%', 'height': '62px', 'padding': '2px','padding-top': '14px', 'padding-bottom': '5px', 'font-size': '18px!important', 'font-weight': '700', 'font-style': 'italic'}">
                                                {{this.percent_text2}}
                                            </div>
                                        </div>
                                        <div>
                                            <div style="width: 50%; float: left; text-align: left; padding-left: 10px;">
                                                Max profit:   &euro; {{guad_max}}
                                            </div>
                                            <div style="width: 50%; text-align: right; float: right; padding-right: 10px;">
                                                Current Profit:   &euro; {{guad_att}}
                                            </div>
                                        </div>
                                    </CCol>
                                    <CCol sm="3">
                                        <label style="color: red; font-weight: 600;">Trading Mode:</label>
                                        <CButton
                                                color="success"
                                                class="trading-mode-btn"
                                        >
                                            OFF
                                        </CButton>
                                    </CCol>
                                </CRow>

                            </div>
                        </div>
                    </CCol>
                    <CCol lg="6">
                        <label  style="font-size: 14px!important; font-weight: 600;">
                            Betfair Classic:
                        </label>
                        <div class="betfair-classic-container">
                            <CRow style="margin: 0;">
                                <CCol v-if="selectedArray[6] == 0 || !selectedArray[6]" sm="12" style="padding: 0px;">
                                    <div class="back-header" style="height: 25px; background: #6dd9ff; padding: 2px 10px; font-weight: 600; color: black;">
                                        <div style="width: 40%; float: left">
                                            Back
                                        </div>
                                        <div style="width: 22.5%; float: left">
                                            Odd
                                        </div>
                                        <div style="width: 22.5%; float: left">
                                            Stake
                                        </div>
                                        <div style="width: 15%; float: left">
                                            Profit
                                        </div>
                                    </div>
                                    <div class="back-content" style="height: 57px; background: #b9edff; padding: 5px;">
                                        <div style="width: 40%; float: left; color: #b5e8fa">
                                            .
                                        </div>
                                        <div style="width: 22.5%; float: left;">
                                            <CInput
                                                    class="inputOdd"
                                                    :value="calc_odd"
                                                    readonly
                                            ></CInput>
                                        </div>
                                        <div style="width: 22.5%; float: left;">
                                            <CInput
                                                    class="inputOdd"
                                                    :value="calc_stake"
                                                    readonly
                                            ></CInput>
                                        </div>
                                        <div style="width: 15%; float: left; height: 30px; padding-top: 4px;">
                                            &euro;{{max_profit}}
                                        </div>
                                        <div style="font-style: italic; font-weight: 600;">You're betting in favour of: {{classic_match}}</div>
                                    </div>
                                </CCol>
                                <CCol v-if="selectedArray[6] == 1 " sm="12" style="padding: 0px;">
                                    <div class="back-header" style="height: 25px; background: #ebedef; padding: 2px 10px; font-weight: 600;">
                                        <div style="width: 40%; float: left">
                                            Back
                                        </div>
                                        <div style="width: 22.5%; float: left">
                                            Odd
                                        </div>
                                        <div style="width: 22.5%; float: left">
                                            Stake
                                        </div>
                                        <div style="width: 15%; float: left">
                                            Profit
                                        </div>
                                    </div>
                                    <div class="back-content" style="height: 57px; background: #ebedef; padding: 5px;">
                                        <div style="width: 40%; float: left; color: #b5e8fa">
                                            .
                                        </div>
                                        <div style="width: 22.5%; float: left;">
                                            <CInput
                                                    class="inputOdd1"
                                                    :value="back"
                                                    readonly
                                            ></CInput>
                                        </div>
                                        <div style="width: 22.5%; float: left;">
                                            <CInput
                                                    class="inputOdd1"
                                                    :value="((calc_odd*calc_stake)/(back)).toFixed(2)"
                                                    readonly
                                            ></CInput>
                                        </div>
                                        <div style="width: 15%; float: left; height: 30px; padding-top: 4px;">
                                            &euro;{{((calc_odd*calc_stake)/(back)*(back - 1)).toFixed(2)}}
                                        </div>
                                        <div style="font-style: italic; font-weight: 600">You're betting in favour of: {{classic_match}}</div>
                                    </div>
                                </CCol>
                                <CCol sm="12" style="height: 20px;">
                                </CCol>
                                <CCol  v-if="selectedArray[6] == 1 || !selectedArray[6]" sm="12" style="padding: 0px; margin-bottom: 30px;">
                                    <div class="lay-header" style="height: 25px; background: #fac9d1; color:black; padding: 2px 10px; font-weight: 600;">
                                        <div style="width: 35%; float: left">
                                            Lay
                                        </div>
                                        <div style="width: 20%; float: left">
                                            Odd
                                        </div>
                                        <div style="width: 20%; float: left">
                                            Profit
                                        </div>
                                        <div style="width: 25%; float: left; ">
                                            Responsibility
                                        </div>
                                    </div>
                                    <div class="lay-content" style="height: 57px;background: #fdecef; padding: 5px;">
                                        <div style="width: 35%; float: left; color: #b5e8fa">
                                            .
                                        </div>
                                        <div style="width: 20%; float: left;">
                                            <CInput
                                                    :value="calc_odd"
                                                    class="inputOdd"
                                                    readonly
                                            ></CInput>
                                        </div>
                                        <div style="width: 20%; float: left;">
                                            <CInput
                                                    class="inputOdd"
                                                    :value="calc_stake"
                                                    readonly
                                            ></CInput>
                                        </div>
                                        <div style="width: 25%; float: left; height: 30px; padding-top: 4px;">
                                            &euro;{{(calc_odd*calc_stake - calc_stake).toFixed(2)}}
                                        </div>
                                        <div style="font-style: italic; font-weight: 600;">You're betting against of: {{classic_match}}</div>
                                    </div>

                                </CCol>
                                <CCol  v-if="selectedArray[6] == 0" sm="12" style="padding: 0px; margin-bottom: 30px;">
                                    <div class="lay-header" style="height: 25px; background: #ebedef; padding: 2px 10px; font-weight: 600;">
                                        <div style="width: 35%; float: left">
                                            Lay
                                        </div>
                                        <div style="width: 20%; float: left">
                                            Odd
                                        </div>
                                        <div style="width: 20%; float: left">
                                            Profit
                                        </div>
                                        <div style="width: 25%; float: left; ">
                                            Responsibility
                                        </div>
                                    </div>
                                    <div class="lay-content" style="height: 57px;background: #ebedef; padding: 5px;">
                                        <div style="width: 35%; float: left; color: #ebedef">
                                            .
                                        </div>
                                        <div style="width: 20%; float: left;">
                                            <CInput
                                                    :value="lay"
                                                    class="inputOdd1"
                                                    readonly
                                            ></CInput>
                                        </div>
                                        <div style="width: 20%; float: left;">
                                            <CInput
                                                    :value="(back*calc_stake/lay).toFixed(2)"
                                                    class="inputOdd1"
                                                    readonly
                                            ></CInput>
                                        </div>
                                        <div style="width: 25%; float: left; height: 30px; padding-top: 4px;">
                                            &euro;{{(lay*(back*calc_stake/lay) - (back*calc_stake/lay)).toFixed(2)}}
                                        </div>
                                        <div style="font-style: italic; font-weight: 600;">You're betting against of: {{classic_match}}</div>
                                    </div>

                                </CCol>
                                <CCol sm="12" style="height: 25px; text-align: right; font-weight: bold; font-size: 11px!important;">
                                    Net Profits
                                </CCol>

                                <CCol sm="8" style="text-align: left; height: 22px;">
                                    <p style="margin: 0;">In case of <strong>{{classic_match}}</strong> wins you'll earn:</p>
                                </CCol>
                                <CCol sm="4" style="text-align: right; height: 22px;">
                                    <label v-if="cash_out == true" style="font-weight: bold;">&euro;{{guad_att}}</label>
                                    <label v-if="low_cash == true && selectedArray[6] == 1 && (calc_stake - ((calc_odd*calc_stake - calc_stake)/(back - 1))) < 0" style="font-weight: bold;">&euro;{{((calc_stake - ((calc_odd*calc_stake - calc_stake)/(back - 1)))).toFixed(2)}}</label>
                                    <label v-if="low_cash == true && selectedArray[6] == 1 && (calc_stake - ((calc_odd*calc_stake - calc_stake)/(back - 1))) > 0" style="font-weight: bold;">&euro;{{((calc_stake - ((calc_odd*calc_stake - calc_stake)/(back - 1)))*(100 - bookmarkerFee)/100).toFixed(2)}}</label>
                                    <label v-if="low_cash == true && selectedArray[6] == 0 && ((calc_stake*calc_odd - calc_stake) - (lay - 1)* calc_stake) > 0" style="font-weight: bold;">&euro;{{(((calc_stake*calc_odd - calc_stake) - (lay - 1)* calc_stake)*(100 - bookmarkerFee)/100).toFixed(2)}}</label>
                                    <label v-if="low_cash == true && selectedArray[6] == 0 && ((calc_stake*calc_odd - calc_stake) - (lay - 1)* calc_stake) < 0" style="font-weight: bold;">&euro;{{(((calc_stake*calc_odd - calc_stake) - (lay - 1)* calc_stake)).toFixed(2)}}</label>
                                    <label v-if="high_cash == true && selectedArray[6] == 1" style="font-weight: bold;">&euro;0.00</label>
                                    <label v-if="high_cash == true && selectedArray[6] == 0" style="font-weight: bold;">&euro;{{(((calc_stake*calc_odd - calc_stake) - (lay - 1)*max_profit*(lay/(lay - 1) - 1))*(100 - bookmarkerFee)/100).toFixed(2)}}</label>
                                </CCol>
                                <CCol sm="8" style="text-align: left; height: 22px;">
                                    <p style="margin: 0;">In case of <strong>{{classic_match}}</strong> does NOT win you'll earn:</p>
                                </CCol>
                                <CCol sm="4" style="text-align: right; height: 22px;">
                                    <label v-if="cash_out == true" style="font-weight: bold;">&euro;{{guad_att}}</label>
                                    <label v-if="low_cash == true && selectedArray[6] == 1" style="font-weight: bold;">&euro;{{(((calc_odd*calc_stake - calc_stake)/(back - 1))*(back - 1) - calc_stake*(calc_odd - 1)).toFixed(2)}}</label>
                                    <label v-if="low_cash == true && selectedArray[6] == 0" style="font-weight: bold;">&euro;0.00</label>
                                    <label v-if="high_cash == true && selectedArray[6] == 1 && ((calc_stake*back - calc_stake) - (calc_stake*calc_odd - calc_stake)) > 0" style="font-weight: bold;">&euro;{{(((calc_stake*back - calc_stake) - (calc_stake*calc_odd - calc_stake))*(100 - bookmarkerFee)/100).toFixed(2)}}</label>
                                    <label v-if="high_cash == true && selectedArray[6] == 1 && ((calc_stake*back - calc_stake) - (calc_stake*calc_odd - calc_stake)) < 0" style="font-weight: bold;">&euro;{{((calc_stake*back - calc_stake) - (calc_stake*calc_odd - calc_stake)).toFixed(2)}}</label>
                                    <label v-if="high_cash == true && selectedArray[6] == 0 && ((max_profit*(lay/(lay - 1) - 1)) - calc_stake) > 0" style="font-weight: bold;">&euro;{{(((max_profit*(lay/(lay - 1) - 1)) - calc_stake)*(100 - bookmarkerFee)/100).toFixed(2)}}</label>
                                    <label v-if="high_cash == true && selectedArray[6] == 0 && ((max_profit*(lay/(lay - 1) - 1)) - calc_stake) < 0" style="font-weight: bold;">&euro;{{((max_profit*(lay/(lay - 1) - 1)) - calc_stake).toFixed(2)}}</label>
                                </CCol>

                                <CCol sm="8" style="text-align: left; margin-top: 20px; margin-bottom: 10px;">
                                    <p style="margin: 0;">Stake CASH OUT:</p>
                                </CCol>
                                <CCol sm="4" style="text-align: right; margin-top: 20px; margin-bottom: 10px;">
                                    <label v-if="cash_out ==  true && selectedArray[6] == 0 && lay != 0" style="font-weight: bold;">&euro;{{(calc_stake*calc_odd/lay).toFixed(2)}}</label>
                                    <label v-if="cash_out ==  true && selectedArray[6] == 1 && back != 0" style="font-weight: bold;">&euro;{{(calc_stake*calc_odd/back).toFixed(2)}}</label>
                                    <label v-if="low_cash ==  true && selectedArray[6] == 1" style="font-weight: bold;">&euro;{{((calc_odd*calc_stake - calc_stake)/(back - 1)).toFixed(2)}}</label>
                                    <label v-if="low_cash ==  true && selectedArray[6] == 0" style="font-weight: bold;">&euro;{{calc_stake}}</label>
                                    <label v-if="high_cash ==  true && selectedArray[6] == 1" style="font-weight: bold;">&euro;{{calc_stake}}</label>
                                    <label v-if="high_cash ==  true && selectedArray[6] == 0" style="font-weight: bold;">&euro;{{(max_profit*(lay/(lay - 1) - 1)).toFixed(2)}}</label>
                                </CCol>
                            </CRow>
                            <CRow style="margin-bottom: 10px;">
                                <div style="width: 33%; float: left; text-align: center;">
                                    <CInputRadio
                                            @update:checked="cashOut1"
                                            :checked = "false"
                                            name="cashout"
                                            class="form-check1"
                                    >
                                    </CInputRadio>
                                    <div style="margin-top: 17px; text-align: center;font-weight: 600">
                                        {{classic_match}} W
                                    </div>
                                    <div style="border-bottom: 2px solid #8e8e8e; width: 50%; float: right; margin-top: -26px;">
                                    </div>
                                </div>
                                <div style="width: 33%; float: left; text-align: center;">
                                    <CInputRadio
                                            @update:checked="cashOut2"
                                            :checked = "true"
                                            name="cashout"
                                            class="form-check1"
                                    >
                                    </CInputRadio>
                                    <div style="margin-top: 17px; text-align: center;font-weight: 600">
                                        CASH OUT
                                    </div>
                                    <div style="border-bottom: 2px solid #8e8e8e; width: 100%; margin-top: -26px;">
                                    </div>
                                </div>
                                <div style="width: 33%; float: left;  text-align: center;">
                                    <CInputRadio
                                            @update:checked="cashOut3"
                                            :checked = "false"
                                            name="cashout"
                                            class="form-check1"
                                    >
                                    </CInputRadio>
                                    <div style="margin-top: 17px; text-align: center;font-weight: 600">
                                        {{classic_match}} L
                                    </div>
                                    <div style="border-bottom: 2px solid #8e8e8e; width: 50%; float: left; margin-top: -26px;">
                                    </div>
                                </div>
                            </CRow>
                        </div>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    export default {
        name: 'MainView',
        data(){
            return{
                bet_data:{
                    src: 'betfair.com',
                    date:'today'
                },
                select_odd_from : [
                    { value: 'betfair.com', label: 'Betfair.com' },
                    { value: 'betfair.it', label: 'Betfair.it' }
                ],
                data_load_date:[
                    { value: 'today', label: 'Today' },
                    { value: 'tomorrow', label: 'Tomorrow' },
                    { value: '2_days', label: 'In two days' },
                    { value: '3_days', label: 'In three days' }
                ],
                gameList:[
                    { value: '0', label: 'Select Prediction' },
                    { value: '1', label: '- X - Back' },
                    { value: '2', label: '- X - Lay' },
                    { value: '3', label: '- 1 - Lay' },
                    { value: '4', label: '- 2 - Lay' },
                    { value: '5', label: '- Over 0.5 Back' },
                    { value: '6', label: '- Over 1.5 Back' },
                    { value: '7', label: '- Under 2.5 Back' },
                    { value: '8', label: '- Over 2.5 Back' },
                    { value: '9', label: '- Under 3.5 Back' },

                ],
                gameList1:[],
                gameList2:[],
                mainList: [],
                eventLists: [],
                eventLists1: [],
                eventLists2: [],
                eventLists3: [],
                marketId: '',
                selectionId: 0,
                lay:'' ,
                back: '',
                total_matched: 0,
                back_matched: 0,
                lay_matched: 0,
                scoreOne: '',
                scoreTwo: '',
                status: '',
                timeRecord:'' ,
                eventId: 0,
                openDate: '',
                selectedArray: [],
                marketStatus: '',
                key:'',
                key1:'',
                predictionList:[],
                teamgroups1:[],
                teamgroups2:[],
                competitionList:[],
                competitionName:'Competition >> N/D',
                matchWidth: '50%',
                predictionWidth: 'block',
                filterQuery:['- 1 -','- X -','- 2 -','- Over 0.5','- Over 1.5','- Over 2.5','- Under 2.5','- Under 3.5'],
                cupList:['Cup','Copa','UEFA','Europa League','Champions League','Cupen','Coppa'],
                predictionList1:[],
                filterSection:['Back','Lay','Cup','Week'],
                cupFilter:true,
                weekFilter:true,
                backFilter:true,
                layFilter:true,
                doubleTips:false,
                oddMin:0,
                oddMax:100000,
                matchedMin:0,
                matchedMax:90000000,
                predictionStatus:true,
                oddUrl:"",
                eventName:"",
                selectedValue:"",
                prematchOddList:[],
                prematchOdd:0,
                calc_odd:0,
                calc_stake:0,
                max_profit:0,
                max_lose:0,
                percent_text1:'',
                percent_text2:'Insert Odd and Stake',
                guad_max:0,
                guad_att:0,
                percentTextColor:'#20a052',
                percentTextColor1:'#20a052',
                percentBackgroundColor:'#d8e4bc',
                percentBackgroundColor1:'#d8e4bc',
                currentPercent:0,
                adminTable: {},
                stopLoss:false,
                tradingMode:false,
                riskTrading:'easy',
                bookmarkerFee:0,
                classic_match:'',
                low_cash: false,
                cash_out: true,
                high_cash: false,
                net_profit1: 0,
                net_profit2: 0,
                stakeCashout:0
            }
        },
        methods:{
            bet_src: function (val) {
                this.bet_data.src = val;
                window.axios.post(`${process.env.VUE_APP_URL}from_betsrc`, [this.bet_data]).then(({data}) => {
                    console.log(data.data[0], data.data[1], data.data[2])
                    let marketNode = []
                    let marketArray = []
                    let m_index = 0
                    this.eventLists = [{'value': '', 'label': 'Select Match'}]
                    this.eventLists1 = [{'value':'' , 'label': 'Select Match'}]
                    let teamGroups = data.data[2]

                    for(let i = 0; i < data.data[0].length;  i++){
                        let eventNode = data.data[0][i]
                        let eventName = eventNode.name
                        let name1 = eventName.split('v').splice(0,1).toString().trim()
                        let name2 = eventName.split('v').splice(1,1).toString().trim()
                        let name11 = ''
                        let name22 = ''

                        let teamGroup1 = data.data[2].filter(function(item) {
                            return item.teamNames.teamName == name1;
                        });
                        if(teamGroup1.length > 0){
                            name11 = teamGroup1[0].statistic
                        }

                        let teamGroup2 = data.data[2].filter(function(item) {
                            return item.teamNames.teamName == name2;
                        });
                        if(teamGroup2.length > 0){
                            name22 = teamGroup2[0].statistic
                        }

                        for(let ii = 0 ;  ii < teamGroups.length ; ii++){
                            for(let jj = 0 ; jj < teamGroups[ii].teamNames.length ; jj++){
                                if(teamGroups[ii].teamNames[jj].teamName == name1 || teamGroups[ii].teamNames[jj].teamName == name11){
                                    let groupList = teamGroups[ii].groupName
                                    let marketType =  teamGroups[ii].marketType
                                    let direction = teamGroups[ii].direction
                                    let bl = teamGroups[ii].bl
                                    for(let j = 0; j < eventNode.markets.length; j++){
                                        if((eventNode.markets[j].marketStatus != 'SUSPENDED') && (eventNode.markets[j].marketStatus != 'CLOSED')) {
                                            if (eventNode.markets[j].marketType == "MATCH_ODDS" && marketType == "MATCH_ODDS") {
                                                let runnerNode = eventNode.markets[j].runners
                                                for (let k = 0; k < runnerNode.length; k++) {
                                                    let runnerName = ''
                                                    if(runnerNode[k].description){
                                                        runnerName = runnerNode[k].description.runnerName
                                                    }
                                                    else{
                                                        runnerName = runnerNode[k].runnerName
                                                    }

                                                    console.log('runnerId', runnerNode[k].selectionId)
                                                    marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                                    if(groupList == '-X - Lay' && direction == 0){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Back' && direction == 0){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Back"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-1 - Lay or -2 Lay' && direction == 1){
                                                        if(runnerName == name1){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 1 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Lay' && direction == 0){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-1 - Lay or -2 Lay' && direction == 2){
                                                        if(runnerName == name1){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 2 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Lay' && direction == 3){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Back' && direction == 3){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Back"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-1 - Lay' && direction == 3){
                                                        if(runnerName == name1){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 1 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-2 - Lay' && direction == 3){
                                                        if(runnerName == name1){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 2 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    m_index++
                                                }

                                            } else {
                                                console.log('groupList', groupList)
                                                let runnerNode = eventNode.markets[j].runners
                                                for (let k = 0; k < runnerNode.length; k++) {
                                                    if (runnerNode[k].runnerName == "Over 0.5 Goals" || runnerNode[k].runnerName == "Over 1.5 Goals" || runnerNode[k].runnerName == "Under 2.5 Goals" || runnerNode[k].runnerName == "Over 2.5 Goals" || runnerNode[k].runnerName == "Under 3.5 Goals") {
                                                        let runnerName = ''
                                                        if(runnerNode[k].description){
                                                            runnerName = runnerNode[k].description.runnerName
                                                        }
                                                        else{
                                                            runnerName = runnerNode[k].runnerName
                                                        }
                                                        marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId

                                                        if(groupList == 'Over 0.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Over 0.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 0.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Over 1.5 Goals' && direction == 0 && bl == "Back"){
                                                            console.log('over 1.5')
                                                            if(runnerName == 'Over 1.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 1.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Under 2.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Under 2.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- U 2.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Over 2.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Over 2.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 2.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Under 3.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Under 3.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- U 3.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

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
                                    for(let j = 0; j < eventNode.markets.length; j++){
                                        if((eventNode.markets[j].marketStatus != 'SUSPENDED') && (eventNode.markets[j].marketStatus != 'CLOSED')) {
                                            if (eventNode.markets[j].marketType == "MATCH_ODDS" && marketType == "MATCH_ODDS") {
                                                let runnerNode = eventNode.markets[j].runners
                                                for (let k = 0; k < runnerNode.length; k++) {
                                                    let runnerName = ''
                                                    if(runnerNode[k].description){
                                                        runnerName = runnerNode[k].description.runnerName
                                                    }
                                                    else{
                                                        runnerName = runnerNode[k].runnerName
                                                    }
                                                    marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                                    if(groupList == '-X - Lay' && direction == 0){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Back' && direction == 0){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Back"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-1 - Lay or -2 Lay' && direction == 1){
                                                        if(runnerName == name2){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 2 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Lay' && direction == 0){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-1 - Lay or -2 Lay' && direction == 2){
                                                        if(runnerName == name2){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 1 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Lay' && direction == 4){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Back' && direction == 4){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Back"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-2 - Lay' && direction == 4){
                                                        if(runnerName == name2){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 2 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-1 - Lay' && direction == 4){
                                                        if(runnerName == name2){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 1 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    m_index++
                                                }

                                            } else {
                                                let runnerNode = eventNode.markets[j].runners
                                                for (let k = 0; k < runnerNode.length; k++) {
                                                    if (runnerNode[k].runnerName == "Over 0.5 Goals" || runnerNode[k].runnerName == "Over 1.5 Goals" || runnerNode[k].runnerName == "Under 2.5 Goals" || runnerNode[k].runnerName == "Over 2.5 Goals" || runnerNode[k].runnerName == "Under 3.5 Goals") {
                                                        let runnerName = ''
                                                        if(runnerNode[k].description){
                                                            runnerName = runnerNode[k].description.runnerName
                                                        }
                                                        else{
                                                            runnerName = runnerNode[k].runnerName
                                                        }
                                                        marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId

                                                        if(groupList == 'Over 0.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Over 0.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 0.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Over 1.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Over 1.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 1.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Under 2.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Under 2.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- U 2.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Over 2.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Over 2.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 2.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Under 3.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Under 3.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- U 3.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

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

                        for(let j = 0; j < eventNode.markets.length; j++){
                            if((eventNode.markets[j].marketStatus != 'SUSPENDED') && (eventNode.markets[j].marketStatus != 'CLOSED')) {
                                if (eventNode.markets[j].marketType == "MATCH_ODDS") {
                                    let runnerNode = eventNode.markets[j].runners
                                    for (let k = 0; k < runnerNode.length; k++) {
                                        if(runnerNode[k].description){
                                            marketNode[m_index] = eventNode.openDate.substring(12, 16) + " >> " + eventNode.name + " -" + (runnerNode[k].description.runnerName || '')
                                        }
                                        else{
                                            marketNode[m_index] = eventNode.openDate.substring(12, 16) + " >> " + eventNode.name + " -" + (runnerNode[k].runnerName || '' )
                                        }
                                        marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                        this.eventLists.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                        m_index++
                                    }

                                } else {
                                    let runnerNode = eventNode.markets[j].runners
                                    let runnerName = ''
                                    for (let k = 0; k < runnerNode.length; k++) {
                                        if(runnerNode[k].description){
                                            runnerName = runnerNode[k].description.runnerName
                                        }else{
                                            runnerName = runnerNode[k].runnerName
                                        }
                                        // console.log('runnerName', runnerName)
                                        if (runnerName == "Over 0.5 Goals" || runnerName == "Più di 0,5 goal" || runnerName == "Over 1.5 Goals" || runnerName == "Più di 1,5 goal" || runnerName == "Under 2.5 Goals" || runnerName == "Meno di 2,5 goal" || runnerName == "Over 2.5 Goals"  || runnerName == "Più di 2,5 goal" || runnerName == "Under 3.5 Goals" || runnerName == "Meno di 3,5 goal") {
                                            marketNode[m_index] = eventNode.openDate.substring(12, 16) + " >> " + eventNode.name + " -" + runnerName
                                            marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                            this.eventLists.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                            m_index++
                                        }
                                    }
                                }
                            }
                        }

                    }

                    this.eventLists2 = []
                    for(let i = 0 ; i < this.eventLists1.length ; i++){
                        let check = 0
                        for(let j = 0 ; j < this.eventLists2.length ; j++){
                            console.log('list2', this.eventLists2[j].label)
                            if(this.eventLists1[i].label == this.eventLists2[j].label){
                                check = 1
                            }
                        }
                        if(check == 0){
                            this.eventLists2.push({'value': this.eventLists1[i].value, 'label': this.eventLists1[i].label})
                        }
                    }

                    //---------excluded filter-------------
                    for(let i = 0; i < this.eventLists.length ; i++){
                        if(this.eventLists[i].value.split(',')[2] != 'MATCH_ODDS'){
                            let self = this
                            let predictions =this.eventLists.filter(function(item) {
                                return item.value.split(',')[1] == self.eventLists[i].value.split(',')[1] && item.value.split(',')[2] == self.eventLists[i].value.split(',')[2];
                            });
                            if(predictions.length > 1){
                                for(let j = 0 ; j < predictions.length; j++){
                                    let index = this.eventLists.indexOf(predictions[j]);
                                    if (index > -1) {
                                        i = i - 1
                                        this.eventLists.splice(index, 1);
                                    }
                                }
                            }

                            let predictions1 = this.eventLists.filter(function(item) {
                                return item.value.split(',')[1] == self.eventLists[i].value.split(',')[1] && self.eventLists[i].value.split(',')[2] != 'MATCH_ODDS';
                            });

                            let pp = 0
                            let pp1 = 0

                            for(let j = 0 ; j < predictions1.length ; j++){
                                if(predictions1[j].value.split(',')[2] == 'OVER_UNDER_35' && predictions1[j].value.split(',')[3] == '0'){
                                    pp = 1
                                }
                                if(predictions1[j].value.split(',')[2] == 'OVER_UNDER_25' && predictions1[j].value.split(',')[3] == '1'){
                                    pp1 = 1
                                }
                            }

                            if(pp == 1 && pp1 == 1){
                                for(let j = 0 ; j < predictions1.length ; j++) {
                                    if(predictions1[j].value.split(',')[2] == 'OVER_UNDER_25' || predictions1[j].value.split(',')[2] == 'OVER_UNDER_35'){
                                        let index = this.eventLists.indexOf(predictions1[j]);
                                        if (index > -1) {
                                            i = i - 1
                                            this.eventLists.splice(index, 1);
                                        }
                                    }
                                }
                                console.log('predictions1=>', predictions1)
                            }
                        }
                        else{
                            let self = this
                            let predictions =this.eventLists.filter(function(item) {
                                return item.value.split(',')[1] == self.eventLists[i].value.split(',')[1] && item.value.split(',')[2] == self.eventLists[i].value.split(',')[2];
                            });
                            if(predictions.length > 1){
                                console.log('excluded check===>', predictions)
                                let check001 = 0
                                let check002 = 0
                                let check003 = 0
                                let check004 = 0
                                for(let c = 0 ; c < predictions.length ; c++){
                                    if(predictions[c].label.includes('1 - Lay')){
                                        check001 = 1
                                    }
                                    if(predictions[c].label.includes('2 - Lay')){
                                        check002 = 1
                                    }
                                    if(predictions[c].label.includes('X - Back')){
                                        check003 = 1
                                    }
                                    if(predictions[c].label.includes('X - Lay')){
                                        check004 = 1
                                    }
                                }
                                if((check001 === 1 && check002 === 1) || ((check003 === 1) && (check001 === 1 || check002 === 1)) || (check003 === 1 && check004 === 1)){
                                    for(let j = 0 ; j < predictions.length; j++){
                                        console.log('predictions===>',predictions[j])
                                        let index = this.eventLists.indexOf(predictions[j]);
                                        if (index > -1) {
                                            i = i - 1
                                            this.eventLists.splice(index, 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //-----------------excluded_filter_end--------------------

                    this.eventLists3 = this.eventLists
                    console.log('eventList1', this.eventLists2)
                })
            },
            bet_date(){
                this.bet_data.date = 'today';
                console.log('bet data', this.bet_data)

                window.axios.post(`${process.env.VUE_APP_URL}from_betsrc`,[this.bet_data]).then(({data})=>{
                    console.log('asdasdas',data.data[0],data.data[1],data.data[2],data.data[3],data.data[4])
                    this.eventLists[0] = {'value': '', 'label': 'Select Match'}
                    this.mainList = data.data[0]
                    this.teamgroups1 = data.data[1]
                    this.teamgroups2 = data.data[2]
                    this.competitionList = data.data[3]
                    this.adminTable = data.data[4]

                    console.log('adminTable====>', this.adminTable[0])

                    let premarketArray = data.data[0]
                    let m_index = 0
                    for(let pp = 0 ; pp < premarketArray.length; pp++){
                        for(let uu = 0; uu < premarketArray[pp].markets.length; uu ++){
                            if(premarketArray[pp].markets[uu].prematchMarket){
                                m_index++
                                this.prematchOddList[m_index - 1] = premarketArray[pp].markets[uu].prematchMarket
                            }
                        }
                    }
                    console.log('prematch_odd_list====>', this.prematchOddList)

                    let eventList0 = data.data[0]
                    let marketNode = []
                    let marketArray = []
                    let marketIds = []
                    let check = 0

                    for(let i = 0; i < eventList0.length ; i++){
                        let eventNode = eventList0[i]
                        if(eventNode.status == 'IN_PLAY'){
                            marketNode[i] = eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + ' - Live'
                        }else{
                            marketNode[i] = eventNode.openDate.substring(11, 16) + " >> " + eventNode.name
                        }
                        let selectionNodes = []

                        for(let j = 0; j < eventNode.markets.length; j++){
                            let marketElement = eventNode.markets[j]
                            if(marketElement.marketType == 'MATCH_ODDS'){
                                check = check + 1
                                marketIds[0] = marketElement.marketId
                                selectionNodes[0] = marketElement.runners[0].selectionId
                                selectionNodes[1] = marketElement.runners[1].selectionId
                                selectionNodes[2] = marketElement.runners[2].selectionId
                            }else if(marketElement.marketType == 'OVER_UNDER_05'){
                                marketIds[1] = marketElement.marketId
                                selectionNodes[3] = marketElement.runners[1].selectionId
                            }else if(marketElement.marketType == 'OVER_UNDER_15'){
                                marketIds[2] = marketElement.marketId
                                selectionNodes[4] = marketElement.runners[1].selectionId
                            }else if(marketElement.marketType == 'OVER_UNDER_25'){
                                marketIds[3] = marketElement.marketId
                                selectionNodes[5] = marketElement.runners[0].selectionId
                                selectionNodes[6] = marketElement.runners[1].selectionId
                            }else if(marketElement.marketType == 'OVER_UNDER_35'){
                                marketIds[4] = marketElement.marketId
                                selectionNodes[7] = marketElement.runners[0].selectionId
                            }
                        }

                        let selectionString = selectionNodes[0]
                        for(let k = 1; k < 8; k++){
                            selectionString = selectionString + ',' + selectionNodes[k]
                        }

                        let marketString = marketIds[0]
                        for(let k = 1; k < 5; k++){
                            marketString = marketString + ',' + marketIds[k]
                        }

                        marketArray[i] = eventNode.eventId + ',' + marketString + ',' + selectionString
                        this.eventLists.push({'value': marketArray[i], 'label': marketNode[i]})
                    }
                    this.eventLists3 = this.eventLists
                    this.select_prediction(true)
                    console.log('matchOddcounts------------>', this.eventLists)
                })

            },
            select_game(val){
                switch(val) {
                    case '1':
                        this.marketId = this.selectedArray[1]
                        this.selectionId = this.selectedArray[8]
                        break;
                    case '2':
                        this.marketId = this.selectedArray[1]
                        this.selectionId = this.selectedArray[8]
                        break;
                    case '3':
                        this.marketId = this.selectedArray[1]
                        this.selectionId = this.selectedArray[6]
                        break;
                    case '4':
                        this.marketId = this.selectedArray[1]
                        this.selectionId = this.selectedArray[7]
                        break;
                    case '5':
                        this.marketId = this.selectedArray[2]
                        this.selectionId = this.selectedArray[9]
                        break;
                    case '6':
                        this.marketId = this.selectedArray[3]
                        this.selectionId = this.selectedArray[10]
                        break;
                    case '7':
                        this.marketId = this.selectedArray[4]
                        this.selectionId = this.selectedArray[11]
                        break;
                    case '8':
                        this.marketId = this.selectedArray[4]
                        this.selectionId = this.selectedArray[12]
                        break;
                    case '9':
                        this.marketId = this.selectedArray[5]
                        this.selectionId = this.selectedArray[13]
                        break;

                    default:
                        break;
                }

                if(this.selectedArray[0] == '0'){
                    return
                }
                else{
                    this.eventId = this.selectedArray[0]
                    this.lay=''
                    this.back=''
                    this.total_matched= 0
                    this.back_matched= 0
                    this.lay_matched= 0
                    this.scoreOne=''
                    this.scoreTwo=''
                    this.status=''
                    this.marketStatus =''
                    this.timeRecord=''

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
                                this.status = 'Live -'
                                this.timeRecord = eventValue.timeElapsed + "'"
                            }
                            else if(!eventValue.status){
                                this.status = 'Coming Up'
                                this.timeRecord =''
                            }
                            if(eventValue.inPlayMatchStatus == 'FirstHalfEnd'){
                                this.timeRecord = 'HT'
                            }

                            for(let j = 0; j < eventValue.markets.length; j++){
                                if(eventValue.markets[j].marketId == this.marketId){
                                    this.marketStatus = eventValue.markets[j].state.status
                                    for(let k = 0; k < eventValue.markets[j].runners.length ;  k++){
                                        if(eventValue.markets[j].runners[k].selectionId == this.selectionId){
                                            this.total_matched= eventValue.markets[j].totalMatched
                                            if(eventValue.markets[j].runners[k].exchange.availableToLay){
                                                this.lay = eventValue.markets[j].runners[k].exchange.availableToLay[0].price
                                                this.lay_matched = eventValue.markets[j].runners[k].exchange.availableToLay[0].size
                                            }
                                            else{
                                                this.lay =
                                                    this.lay_matched = 0
                                            }
                                            if(eventValue.markets[j].runners[k].exchange.availableToBack){
                                                this.back = eventValue.markets[j].runners[k].exchange.availableToBack[0].price
                                                this.back_matched = eventValue.markets[j].runners[k].exchange.availableToBack[0].size
                                            }
                                            else{
                                                this.back =
                                                    this.back_matched = 0
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            select_prediction(val){
                this.key1 = 0
                let eventList0 = this.mainList
                let marketNode1 = []
                let marketArray1 = []
                let index = 0
                this.eventLists[0] = {'value': '', 'label': 'Select Match'}
                this.predictionList[0] = {'value': '', 'label': 'Select Match'}
                let teamGroups = this.teamgroups2
                this.competitionName = 'Competition >> N/D'

                this.eventId = 0
                this.marketId =
                this.selectionId = 0
                this.lay =''
                this.lay_matched = 0
                this.back =''
                this.back_matched = 0
                this.total_matched = 0
                this.status =''
                this.scoreOne =''
                this.scoreTwo =''
                this.timeRecord =''

                for(let i = 0; i < eventList0.length ; i++){
                    let eventNode =  eventList0[i].name
                    let name1 = eventNode.split(' v ').splice(0,1).toString().trim()
                    let name2 = eventNode.split(' v ').splice(1,1).toString().trim()
                    let name11 =''
                    let name22 =''

                    let teamGroup1 = this.teamgroups1.filter(function(item) {
                        return item.betfair_com == name1;
                    });
                    if(teamGroup1.length > 0){
                        name11 = teamGroup1[0].statistic
                    }

                    let teamGroup2 = this.teamgroups1.filter(function(item) {
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
                                let groupName = teamGroups[ii].groupName1
                                let marketType =  teamGroups[ii].marketType
                                let direction = teamGroups[ii].direction
                                let teamValue = teamGroups[ii].teamNames[jj].teamNo
                                if(groupList == '- Over 0.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 0.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 0.5 Back'
                                    }
                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Over 1.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY') {
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 1.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 1.5 Back'
                                    }
                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Under 2.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 2.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 2.5 Back'
                                    }
                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Over 2.5 Back' && direction == 0 || groupList == '- Over 3.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 2.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 2.5 Back'
                                    }
                                    if(groupList == '- Over 3.5 Back' && direction == 0){
                                        marketType = 'OVER_UNDER_25'
                                    }
                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Under 3.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 3.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 3.5 Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Lay' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 1){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay'
                                    }
                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 2){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Lay' && direction == 3){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Back' && direction == 3){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 1 - Lay' && direction == 3){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 2 - Lay' && direction == 3){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                            }
                            else if(teamGroups[ii].teamNames[jj].teamName == name2 || teamGroups[ii].teamNames[jj].teamName == name22){
                                let groupList = teamGroups[ii].groupName
                                let groupName = teamGroups[ii].groupName1
                                let marketType =  teamGroups[ii].marketType
                                let direction = teamGroups[ii].direction
                                let teamValue = teamGroups[ii].teamNames[jj].teamNo
                                if(groupList == '- Over 0.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 0.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 0.5 Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Over 1.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 1.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 1.5 Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Under 2.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 2.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 2.5 Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Over 2.5 Back' && direction == 0 || groupList == '- Over 3.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 2.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 2.5 Back'
                                    }
                                    if(groupList == '- Over 3.5 Back' && direction == 0){
                                        marketType = 'OVER_UNDER_25'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Under 3.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 3.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 3.5 Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Lay' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 1){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 2){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay'
                                    }
                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Lay' && direction == 4){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay'
                                    }
                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Back' && direction == 4){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 2 - Lay' && direction == 4){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 1 - Lay' && direction == 4){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                            }
                        }
                    }
                }

                this.eventLists2 = []
                for(let i = 0 ; i < this.predictionList.length ; i++){
                    let check = 0
                    for(let j = 0 ; j < this.eventLists2.length ; j++){
                        if(this.predictionList[i].label == this.eventLists2[j].label){
                            check = 1
                        }
                    }
                    if(check == 0){
                        this.eventLists2.push({'value': this.predictionList[i].value, 'label': this.predictionList[i].label})
                    }
                }
                this.predictionList = this.eventLists2
                console.log('predictionListNew', this.predictionList)
                if(val == true){
                    this.eventLists3 = this.predictionList
                    this.gameList1 = this.gameList2
                    this.matchWidth = '83.333333333%'
                    this.predictionWidth = 'none'
                    this.filter1(this.filterQuery)
                    this.predictionStatus =  true
                }
                else{
                    this.eventLists3 = this.eventLists
                    this.gameList1 = this.gameList
                    this.matchWidth = '50%'
                    this.predictionWidth = 'block'
                    this.predictionStatus = false
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
                                this.status = 'Live -'
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
                    console.log('eventId', this.selectedArray)
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
                    console.log('eventNode', eventNode[0])
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
                        this.status = 'Live -'
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
                    // console.log('marketNode', marketNode,team)

                    if(marketNode[0].state){
                        if(marketNode[0].state.status == 'SUSPENDED'){
                            this.marketStatus = 'SUSPENDED'
                        }
                        else if(marketNode[0].state.status == "CLOSED"){
                            this.marketStatus = 'CLOSED'
                        }
                        else if(marketNode[0].state.status == "OPEN"){
                            this.marketStatus =''
                        }
                    }
                    this.marketId = marketNode[0].marketId

                    this.total_matched = marketNode[0].totalMatched
                    let runnerNode = marketNode[0].runners[team]

                    this.selectionId = runnerNode.selectionId
                    if(eventNode[0].status){
                        console.log('great', this.marketId)
                        for(let u = 0; u < this.prematchOddList.length; u++){
                            let c1 =  this.marketId
                            let c2 =  this.prematchOddList[u].marketId
                            if(c1 == c2){
                                let runnerlists = this.prematchOddList[u].runners[team]
                                if(runnerNo == 0 && runnerlists.exchange && runnerlists.exchange.availableToBack){
                                    console.log('test!!!!',runnerlists.exchange.availableToBack[0].price)
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
                    console.log('runnerNode===>',runnerNode)
                }
            },
            select_filter1(val){
                if(val == true){
                    this.filterQuery.push('- 1 -')
                }
                else{
                    let index = this.filterQuery.indexOf('- 1 -');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter2(val){
                if(val == true){
                    this.filterQuery.push('- X -')
                }
                else{
                    let index = this.filterQuery.indexOf('- X -');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter3(val){
                if(val == true){
                    this.filterQuery.push('- 2 -')
                }
                else{
                    let index = this.filterQuery.indexOf('- 2 -');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter4(val){
                if(val ==  true){
                    this.filterQuery.push('- Over 0.5')
                }
                else{
                    let index = this.filterQuery.indexOf('- Over 0.5');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter5(val){
                if(val == true){
                    this.filterQuery.push('- Over 1.5')
                }
                else{
                    let index = this.filterQuery.indexOf('- Over 1.5');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter6(val){
                if(val == true){
                    this.filterQuery.push('- Over 2.5')
                }
                else{
                    let index = this.filterQuery.indexOf('- Over 2.5');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter7(val){
                if(val == true){
                    this.filterQuery.push('- Under 2.5')
                }
                else{
                    let index = this.filterQuery.indexOf('- Under 2.5');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter8(val){
                if(val ==  true){
                    this.filterQuery.push('- Under 3.5')
                }
                else{
                    let index = this.filterQuery.indexOf('- Under 3.5');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter9(val){
                if(val == true){
                    this.backFilter = true
                }
                else{
                    this.backFilter = false
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter10(val){
                if(val == true){
                    this.layFilter = true
                }
                else{
                    this.layFilter = false
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter11(val){
                if(val == true){
                    this.doubleTips = true
                }
                else{
                    this.doubleTips = false
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter12(val){
                if(val == true){
                    this.cupFilter = true
                }
                else{
                    this.cupFilter = false
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter13(val){
                if(val == true){
                    this.weekFilter = true
                }
                else{
                    this.weekFilter = false
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            filter1(filterArray){
                this.predictionList1 = []
                this.predictionList1[0] = {'value': '', 'label': 'Select Match'}

                if(filterArray.length < 1){
                    this.eventLists3 = this.predictionList1
                    return
                }
                else{
                    for(let j = 1 ; j < this.predictionList.length; j++){
                        let prediction = this.predictionList[j].label.toString()
                        let value = this.predictionList[j].value
                        for(let i = 0 ; i < filterArray.length; i++){
                            if(filterArray[i] == '- 1 -'){
                                if(prediction.includes('- 1 -') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                            else if(filterArray[i] == '- X -'){
                                if(prediction.includes('- X -') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                            else if(filterArray[i] == '- 2 -'){
                                if(prediction.includes('- 2 -') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                            else if(filterArray[i] == '- Over 0.5'){
                                if(prediction.includes('- Over 0.5') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                            else if(filterArray[i] == '- Over 1.5'){
                                if(prediction.includes('- Over 1.5') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                            else if(filterArray[i] == '- Over 2.5'){
                                if(prediction.includes('- Over 2.5') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                            else if(filterArray[i] == '- Under 2.5'){
                                if(prediction.includes('- Under 2.5') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                            else if(filterArray[i] == '- Under 3.5'){
                                if(prediction.includes('- Under 3.5') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                        }
                    }

                    if(this.backFilter == false){
                        let predictions =this.predictionList1.filter(function(item) {
                            return !item.label.includes('Back');
                        });
                        this.predictionList1 = predictions
                    }

                    if(this.layFilter == false){
                        let predictions =this.predictionList1.filter(function(item) {
                            return !item.label.includes('Lay');
                        });
                        this.predictionList1 = predictions
                    }

                    //---------excluded filter-------------

                    for(let i = 0; i < this.predictionList1.length ; i++){
                        console.log(this.predictionList1[i])
                        if(this.predictionList1[i].value.split(',')[2] != 'MATCH_ODDS'){
                            let self = this
                            let predictions =this.predictionList1.filter(function(item) {
                                return item.value.split(',')[1] == self.predictionList1[i].value.split(',')[1] && item.value.split(',')[2] == self.predictionList1[i].value.split(',')[2];
                            });
                            if(predictions.length > 1){
                                for(let j = 0 ; j < predictions.length; j++){
                                    let index = this.predictionList1.indexOf(predictions[j]);
                                    if (index > -1) {
                                        i = i - 1
                                        this.predictionList1.splice(index, 1);
                                    }
                                }
                            }

                            let predictions1 =this.predictionList1.filter(function(item) {
                                return item.value.split(',')[1] == self.predictionList1[i].value.split(',')[1] && self.predictionList1[i].value.split(',')[2] != 'MATCH_ODDS';
                            });

                            let pp = 0
                            let pp1 = 0

                            for(let j = 0 ; j < predictions1.length ; j++){
                                if(predictions1[j].value.split(',')[2] == 'OVER_UNDER_35' && predictions1[j].value.split(',')[3] == '0'){
                                    pp = 1
                                }
                                if(predictions1[j].value.split(',')[2] == 'OVER_UNDER_25' && predictions1[j].value.split(',')[3] == '1'){
                                    pp1 = 1
                                }
                            }

                            if(pp == 1 && pp1 == 1){
                                for(let j = 0 ; j < predictions1.length ; j++) {
                                    if(predictions1[j].value.split(',')[2] == 'OVER_UNDER_25' || predictions1[j].value.split(',')[2] == 'OVER_UNDER_35'){
                                        let index = this.predictionList1.indexOf(predictions1[j]);
                                        if (index > -1) {
                                            i = i - 1
                                            this.predictionList1.splice(index, 1);
                                        }
                                    }
                                }
                                console.log('predictions1=>', predictions1)
                            }
                        }
                        else{
                            let self = this
                            let predictions =this.predictionList1.filter(function(item) {
                                return item.value.split(',')[1] == self.predictionList1[i].value.split(',')[1] && item.value.split(',')[2] == self.predictionList1[i].value.split(',')[2];
                            });
                            if(predictions.length > 1){
                                console.log('excluded check===>', predictions)
                                let check001 = 0
                                let check002 = 0
                                let check003 = 0
                                let check004 = 0
                                for(let c = 0 ; c < predictions.length ; c++){
                                    if(predictions[c].label.includes('1 - Lay')){
                                        check001 = 1
                                    }
                                    if(predictions[c].label.includes('2 - Lay')){
                                        check002 = 1
                                    }
                                    if(predictions[c].label.includes('X - Back')){
                                        check003 = 1
                                    }
                                    if(predictions[c].label.includes('X - Lay')){
                                        check004 = 1
                                    }
                                }
                                if((check001 === 1 && check002 === 1) || ((check003 === 1) && (check001 === 1 || check002 === 1)) || (check003 === 1 && check004 === 1)){
                                    for(let j = 0 ; j < predictions.length; j++){
                                        console.log('predictions===>',predictions[j])
                                        let index = this.predictionList1.indexOf(predictions[j]);
                                        if (index > -1) {
                                            i = i - 1
                                            this.predictionList1.splice(index, 1);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    //-------------------------------------

                    if(this.cupFilter == false){
                        for(let i = 1 ; i < this.predictionList1.length; i++){
                            let p_value = this.predictionList1[i].value
                            let com_label = p_value.split(',')
                            let com_eventId =  com_label[1]
                            let competition = this.competitionList.filter(function(item) {
                                return item.eventId == com_eventId;
                            });

                            let competitionLabel = competition[0].competitions[0].name
                            let check = 0
                            for(let k = 0; k < this.cupList.length; k++){
                                if(competitionLabel.includes(this.cupList[k]) == true){
                                    check = 1
                                }
                            }

                            if(check == 1){
                                let index = this.predictionList1.indexOf(this.predictionList1[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionList1.splice(index, 1);
                                }
                            }

                        }
                    }

                    if(this.weekFilter ==  false){
                        console.log('prediction_list_check===>',this.predictionList1)
                        // let predictions =this.predictionList1.filter(function(item) {
                        //     return parseInt(item.value.split(',')[5]) > parseInt(item.value.split(',')[4]);
                        // });

                        for(let n = 1 ; n < this.predictionList1.length ; n++){
                            let p_val = this.predictionList1[n].value.split(',')[7].trim()
                            let val1 = parseInt(this.predictionList1[n].value.split(',')[4])
                            let val2 = parseInt(this.predictionList1[n].value.split(',')[5])
                            console.log('value is just these =>', p_val, val1, val2)
                            if(p_val == 'Perde da' || p_val == 'Perde in casa da' || p_val == 'Pareggia fuori da'){
                                console.log('value is just these =>', p_val)
                                let index = this.predictionList1.indexOf(this.predictionList1[n]);
                                if (index > -1) {
                                    n = n - 1
                                    this.predictionList1.splice(index, 1);
                                }
                            }
                            else if(p_val != 'Non vince da' && p_val != 'Non pareggia da' && p_val != 'Non perde da' && p_val != 'Non perde in casa da' && p_val != 'Non vince fuori da' && p_val != 'Non pareggia fuori da'){
                                if(val1 > val2){
                                    let index = this.predictionList1.indexOf(this.predictionList1[n]);
                                    if (index > -1) {
                                        n = n - 1
                                        this.predictionList1.splice(index, 1);
                                    }
                                }
                            }
                            else{
                                console.log(this.predictionList1)
                            }
                        }
                    }

                    if(this.doubleTips ==  false){
                        let eventArray = []
                        for(let d = 0 ; d < this.predictionList1.length; d++){
                            eventArray[d] = this.predictionList1[d].value.split(',')[1]
                        }
                        eventArray = Array.from(new Set (eventArray))

                        for(let d = 0 ; d < eventArray.length; d++){
                            let predictions = this.predictionList1.filter(function(item) {
                                return item.value.split(',')[1] == eventArray[d] && item.value.split(',')[2] == 'MATCH_ODDS';
                            });

                            if(predictions.length > 1){
                                let predictions1 = predictions.filter(function(item) {
                                    return item.value.split(',')[3] == '2';
                                });

                                if(predictions1.length > 0){
                                    for(let g = 0 ; g < predictions.length ; g++){
                                        if(predictions[g].value.split(',')[3] != '2'){
                                            let index = this.predictionList1.indexOf(predictions[g]);
                                            if (index > -1) {
                                                g = g - 1
                                                this.predictionList1.splice(index, 1);
                                            }
                                        }
                                    }
                                }

                                if(predictions.length > 1){
                                    let predictions1 = predictions.filter(function(item) {
                                        return item.value.split(',')[3] == '2' && item.value.split(',')[6] == '0';
                                    });
                                    if(predictions1.length > 0){
                                        for(let g = 0 ; g < predictions.length ; g++){
                                            if(predictions[g].label.includes('1 - Lay') == true || predictions[g].label.includes('2 - Lay') == true){
                                                let index = this.predictionList1.indexOf(predictions[g]);
                                                if (index > -1) {
                                                    g = g - 1
                                                    this.predictionList1.splice(index, 1);
                                                }
                                            }
                                        }
                                        let index = this.predictionList1.indexOf(predictions1[0]);
                                        if (index > -1) {
                                            this.predictionList1.splice(index, 1);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if(this.doubleTips ==  true){
                        let eventArray = []
                        for(let d = 0 ; d < this.predictionList1.length; d++){
                            eventArray[d] = this.predictionList1[d].value.split(',')[1]
                        }
                        eventArray = Array.from(new Set (eventArray))

                        for(let d = 0 ; d < eventArray.length; d++){
                            let predictions = this.predictionList1.filter(function(item) {
                                return item.value.split(',')[1] == eventArray[d] && item.value.split(',')[2] == 'MATCH_ODDS';
                            });

                            if(predictions.length > 1){
                                let predictions1 = predictions.filter(function(item) {
                                    return item.value.split(',')[3] == '2' && item.value.split(',')[6] == '0';
                                });
                                if(predictions1.length > 0){
                                    for(let g = 0 ; g < predictions.length ; g++){
                                        if(predictions[g].label.includes('1 - Lay') == true || predictions[g].label.includes('2 - Lay') == true){
                                            let index = this.predictionList1.indexOf(predictions[g]);
                                            if (index > -1) {
                                                g = g - 1
                                                this.predictionList1.splice(index, 1);
                                            }
                                        }
                                    }
                                    let index = this.predictionList1.indexOf(predictions1[0]);
                                    if (index > -1) {
                                        this.predictionList1.splice(index, 1);
                                    }
                                }
                            }
                        }
                    }

                    if(this.predictionStatus == true){
                        //-----------------------total_matched_money--------------------------
                        for(let p = 1; p < this.predictionList1.length; p++){
                            let eventId = this.predictionList1[p].value.split(',')[1]
                            let marketType = this.predictionList1[p].value.split(',')[2]

                            let eventNode = this.mainList.filter(function(item) {
                                return item.eventId == eventId;
                            });

                            let marketNode = eventNode[0].markets.filter(function(item) {
                                return item.marketType == marketType;
                            });
                            console.log('marketNode===>', marketNode, marketType)
                            if(marketNode.length > 0){
                                if(marketNode[0].totalMatched < this.matchedMin || marketNode[0].totalMatched > this.matchedMax){
                                    let index = this.predictionList1.indexOf(this.predictionList1[p]);
                                    if (index > -1) {
                                        p = p - 1
                                        this.predictionList1.splice(index, 1);
                                    }
                                }
                            }
                            else{
                                // let index = this.predictionList1.indexOf(this.predictionList1[p]);
                                // if (index > -1) {
                                //     p = p - 1
                                //     this.predictionList1.splice(index, 1);
                                // }
                            }
                        }
                        //---------------------------odd_filter----------------------------
                        for(let p = 1 ; p < this.predictionList1.length; p++){
                            let eventId = this.predictionList1[p].value.split(',')[1]
                            let marketType = this.predictionList1[p].value.split(',')[2]
                            let marketNo = parseInt(this.predictionList1[p].value.split(',')[3])
                            let runnerNo = parseInt(this.predictionList1[p].value.split(',')[6])
                            let predictionLabel = this.predictionList1[p].label

                            let eventNode = this.mainList.filter(function(item) {
                                return item.eventId == eventId;
                            });

                            let marketNode = eventNode[0].markets.filter(function(item) {
                                return item.marketType == marketType;
                            });
                            console.log('marketNode===>', marketNode[0])
                            if(marketNode[0]){
                                if(!marketNode[0].runners){
                                    return
                                }

                                if(predictionLabel.includes(' - Live') == true){
                                    for(let h = 0  ; h < this.prematchOddList.length ;  h++){
                                        if(this.prematchOddList[h].marketId == marketNode[0].marketId){
                                            console.log('great!!', marketNode[0].marketId)
                                            if(this.prematchOddList[h].runners[marketNo].exchange){
                                                if(runnerNo == '0'){
                                                    if(this.prematchOddList[h].runners[marketNo].exchange.availableToBack){
                                                        let backOdds = parseFloat(this.prematchOddList[h].runners[marketNo].exchange.availableToBack[0].price)
                                                        if(this.marketId == marketNode[0].marketId){
                                                            this.prematchOdd = backOdds
                                                        }
                                                        if(backOdds < parseFloat(this.oddMin) || backOdds > parseFloat(this.oddMax)){
                                                            let index = this.predictionList1.indexOf(this.predictionList1[p]);
                                                            if (index > -1) {
                                                                p = p - 1
                                                                this.predictionList1.splice(index, 1);
                                                            }
                                                        }

                                                    }
                                                }
                                                else {
                                                    if(this.prematchOddList[h].runners[marketNo].exchange.availableToLay){
                                                        let layOdds = parseFloat(this.prematchOddList[h].runners[marketNo].exchange.availableToLay[0].price)
                                                        if(this.marketId == marketNode[0].marketId){
                                                            this.prematchOdd = layOdds
                                                        }
                                                        if(layOdds < parseFloat(this.oddMin) || layOdds > parseFloat(this.oddMax)){
                                                            let index = this.predictionList1.indexOf(this.predictionList1[p]);
                                                            if (index > -1) {
                                                                p = p - 1
                                                                this.predictionList1.splice(index, 1);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else{
                                    if(marketNode[0].runners[marketNo].exchange){
                                        if(runnerNo == '0'){
                                            if(marketNode[0].runners[marketNo].exchange.availableToBack){
                                                let backOdds = parseFloat(marketNode[0].runners[marketNo].exchange.availableToBack[0].price)
                                                if(backOdds < parseFloat(this.oddMin) || backOdds > parseFloat(this.oddMax)){
                                                    let index = this.predictionList1.indexOf(this.predictionList1[p]);
                                                    if (index > -1) {
                                                        p = p - 1
                                                        this.predictionList1.splice(index, 1);
                                                    }
                                                }

                                            }
                                        }
                                        else {
                                            if(marketNode[0].runners[marketNo].exchange.availableToLay){
                                                let layOdds = parseFloat(marketNode[0].runners[marketNo].exchange.availableToLay[0].price)
                                                if(layOdds < parseFloat(this.oddMin) || layOdds > parseFloat(this.oddMax)){
                                                    let index = this.predictionList1.indexOf(this.predictionList1[p]);
                                                    if (index > -1) {
                                                        p = p - 1
                                                        this.predictionList1.splice(index, 1);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else{
                                let index = this.predictionList1.indexOf(this.predictionList1[p]);
                                if (index > -1) {
                                    p = p - 1
                                    this.predictionList1.splice(index, 1);
                                }
                            }
                        }



                        let checkSelect = 0;
                        for(let s = 0 ; s < this.predictionList1.length ; s++){
                            if(this.predictionList1[s].value == this.selectedValue){
                                checkSelect = 1
                            }
                        }
                        if(checkSelect == 0){
                            this.eventId = 0
                            this.marketId =
                                this.selectionId = 0
                            this.lay =
                                this.lay_matched = 0
                            this.back =
                                this.back_matched = 0
                            this.total_matched = 0
                            this.status =
                                this.scoreOne =
                                    this.scoreTwo =
                                        this.timeRecord =
                                            this.key1 = 0
                        }
                        this.eventLists3 = this.predictionList1
                    }
                }
            },
            odd_min(val){
                this.oddMin = val
                // if(this.predictionStatus == true){
                this.filter1(this.filterQuery)
                // }
            },
            odd_max(val){
                this.oddMax = val
                // if(this.predictionStatus == true){
                this.filter1(this.filterQuery)
                // }
            },
            matched_min(val){
                this.matchedMin = val
                // if(this.predictionStatus == true){
                this.filter1(this.filterQuery)
                // }
            },
            odd_calc(val){
                this.calc_odd = val
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
                        if(this.currentPercent > 0){
                            this.percentTextColor = '#20a052'
                            this.percentTextColor1 = '#20a052'
                            this.percentBackgroundColor = '#d8e4bc'
                            this.percentBackgroundColor1 = '#d8e4bc'
                            this.percent_text1 = 'Current Profit:'
                            this.percent_text2 = this.currentPercent.toString() + '%'

                            let timeRecord = this.timeRecord
                            let MG = timeRecord.substring(0, timeRecord.length)

                            if(MG == ''){
                                MG = '0'
                            }
                            console.log('XXXXXXXXXX->>>>',MG,this.riskTrading,this.stopLoss,this.tradingMode,this.currentPercent)
                            if(this.riskTrading == 'easy'){
                                if(parseInt(MG) > this.adminTable[0].facile.MG && this.stopLoss == false && this.tradingMode == false && this.currentPercent > this.adminTable[0].facile.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.tradingMode == true && this.stopLoss == false && this.currentPercent > this.adminTable[0].facile.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent > this.adminTable[0].facile.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent > this.adminTable[0].facile.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'medium'){
                                if(parseInt(MG) > this.adminTable[0].medio.MG && this.stopLoss == false && this.tradingMode == false && this.currentPercent > this.adminTable[0].medio.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.tradingMode == true && this.stopLoss == false && this.currentPercent > this.adminTable[0].medio.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent > this.adminTable[0].medio.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent > this.adminTable[0].medio.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'risky'){
                                if(parseInt(MG) > this.adminTable[0].elevato.MG && this.stopLoss == false && this.tradingMode == false && this.currentPercent > this.adminTable[0].elevato.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.tradingMode == true && this.stopLoss == false && this.currentPercent > this.adminTable[0].elevato.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent > this.adminTable[0].elevato.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent > this.adminTable[0].elevato.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }

                        }
                        else if(this.currentPercent < 0){
                            this.percentTextColor = '#b80101'
                            this.percentTextColor1 = '#b80101'
                            this.percentBackgroundColor = '#ffc7ce'
                            this.percentBackgroundColor1 = '#ffc7ce'
                            this.percent_text1 = 'Current Profit:'
                            this.percent_text2 = this.currentPercent.toString() + '%'

                            let timeRecord = this.timeRecord
                            let MG = timeRecord.substring(0, timeRecord.length)

                            if(MG =='' ){
                                MG = '0'
                            }

                            console.log('XXXXXXXXXX',MG,this.riskTrading,this.stopLoss,this.tradingMode,this.currentPercent)

                            if(this.riskTrading == 'easy'){
                                if(parseInt(MG) > this.adminTable[0].facile.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent < this.adminTable[0].facile.SLN * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent < this.adminTable[0].facile.SLT * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'medium'){
                                if(parseInt(MG) > this.adminTable[0].medio.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent < this.adminTable[0].medio.SLN * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent < this.adminTable[0].medio.SLT * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'risky'){
                                if(parseInt(MG) > this.adminTable[0].elevato.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent < this.adminTable[0].elevato.SLN * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent < this.adminTable[0].elevato.SLT * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }

                        }
                        console.log('Layasdasd===>', this.max_profit)

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
                        console.log('Lay===>', this.max_profit)

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
                        if(this.currentPercent > 0){
                            this.percentTextColor = '#20a052'
                            this.percentTextColor1 = '#20a052'
                            this.percentBackgroundColor = '#d8e4bc'
                            this.percentBackgroundColor1 = '#d8e4bc'
                            this.percent_text1 = 'Current Profit:'
                            this.percent_text2 = this.currentPercent.toString() + '%'

                            let timeRecord = this.timeRecord
                            let MG = timeRecord.substring(0, timeRecord.length)

                            if(MG =='' ){
                                MG = '0'
                            }

                            console.log('XXXXXXXXXX',MG,this.riskTrading,this.stopLoss,this.tradingMode,this.currentPercent)

                            if(this.riskTrading == 'easy'){
                                if(parseInt(MG) > this.adminTable[0].facile.MG && this.stopLoss == false && this.tradingMode == false && this.currentPercent > this.adminTable[0].facile.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.tradingMode == true && this.stopLoss == false && this.currentPercent > this.adminTable[0].facile.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent > this.adminTable[0].facile.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent > this.adminTable[0].facile.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'medium'){
                                if(parseInt(MG) > this.adminTable[0].medio.MG && this.stopLoss == false && this.tradingMode == false && this.currentPercent > this.adminTable[0].medio.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.tradingMode == true && this.stopLoss == false && this.currentPercent > this.adminTable[0].medio.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent > this.adminTable[0].medio.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent > this.adminTable[0].medio.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'risky'){
                                if(parseInt(MG) > this.adminTable[0].elevato.MG && this.stopLoss == false && this.tradingMode == false && this.currentPercent > this.adminTable[0].elevato.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.tradingMode == true && this.stopLoss == false && this.currentPercent > this.adminTable[0].elevato.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent > this.adminTable[0].elevato.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent > this.adminTable[0].elevato.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }

                        }
                        else if(this.currentPercent < 0){
                            this.percentTextColor = '#b80101'
                            this.percentTextColor1 = '#b80101'
                            this.percentBackgroundColor = '#ffc7ce'
                            this.percentBackgroundColor1 = '#ffc7ce'
                            this.percent_text1 = 'Current Profit:'
                            this.percent_text2 = this.currentPercent.toString() + '%'

                            let timeRecord = this.timeRecord
                            let MG = timeRecord.substring(0, timeRecord.length)

                            if(MG =='' ){
                                MG = '0'
                            }

                            console.log('XXXXXXXXXX',MG,this.riskTrading,this.stopLoss,this.tradingMode,this.currentPercent,this.adminTable[0].facile.SLN)

                            if(this.riskTrading == 'easy'){
                                if(parseInt(MG) > this.adminTable[0].facile.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent < this.adminTable[0].facile.SLN * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent < this.adminTable[0].facile.SLT * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'medium'){
                                if(parseInt(MG) > this.adminTable[0].medio.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent < this.adminTable[0].medio.SLN * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent < this.adminTable[0].medio.SLT * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'risky'){
                                if(parseInt(MG) > this.adminTable[0].elevato.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent < this.adminTable[0].elevato.SLN * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent < this.adminTable[0].elevato.SLT * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }

                        }

                    }
                }
                else{
                    this.max_profit = 0
                    this.max_lose = 0
                    this.guad_max = 0
                    this.percent_text1 =
                        this.percent_text2 = 'Insert Odd and Stake'
                    this.guad_att = 0
                    this.percentTextColor = '#20a052'
                    this.percentTextColor1 = '#20a052'
                    this.percentBackgroundColor = '#d8e4bc'
                    this.percentBackgroundColor1 = '#d8e4bc'
                }
            },
            stake_calc(val){
                this.calc_stake = val
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
                        if(this.currentPercent > 0){
                            this.percentTextColor = '#20a052'
                            this.percentTextColor1 = '#20a052'
                            this.percentBackgroundColor = '#d8e4bc'
                            this.percentBackgroundColor1 = '#d8e4bc'
                            this.percent_text1 = 'Current Profit:'
                            this.percent_text2 = this.currentPercent.toString() + '%'

                            let timeRecord = this.timeRecord
                            let MG = timeRecord.substring(0, timeRecord.length)

                            if(MG =='' ){
                                MG = '0'
                            }
                            if(this.riskTrading == 'easy'){
                                if(parseInt(MG) > this.adminTable[0].facile.MG && this.stopLoss == false && this.tradingMode == false && this.currentPercent > this.adminTable[0].facile.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.tradingMode == true && this.stopLoss == false && this.currentPercent > this.adminTable[0].facile.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent > this.adminTable[0].facile.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent > this.adminTable[0].facile.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'medium'){
                                if(parseInt(MG) > this.adminTable[0].medio.MG && this.stopLoss == false && this.tradingMode == false && this.currentPercent > this.adminTable[0].medio.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.tradingMode == true && this.stopLoss == false && this.currentPercent > this.adminTable[0].medio.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent > this.adminTable[0].medio.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent > this.adminTable[0].medio.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'risky'){
                                if(parseInt(MG) > this.adminTable[0].elevato.MG && this.stopLoss == false && this.tradingMode == false && this.currentPercent > this.adminTable[0].elevato.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.tradingMode == true && this.stopLoss == false && this.currentPercent > this.adminTable[0].elevato.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent > this.adminTable[0].elevato.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent > this.adminTable[0].elevato.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }

                        }
                        else if(this.currentPercent < 0){
                            this.percentTextColor = '#b80101'
                            this.percentTextColor1 = '#b80101'
                            this.percentBackgroundColor = '#ffc7ce'
                            this.percentBackgroundColor1 = '#ffc7ce'
                            this.percent_text1 = 'Current Profit:'
                            this.percent_text2 = this.currentPercent.toString() + '%'

                            let timeRecord = this.timeRecord
                            let MG = timeRecord.substring(0, timeRecord.length)

                            if(MG == ''){
                                MG = '0'
                            }

                            if(this.riskTrading == 'easy'){
                                if(parseInt(MG) > this.adminTable[0].facile.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent < this.adminTable[0].facile.SLN * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent < this.adminTable[0].facile.SLT * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'medium'){
                                if(parseInt(MG) > this.adminTable[0].medio.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent < this.adminTable[0].medio.SLN * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent < this.adminTable[0].medio.SLT * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'risky'){
                                if(parseInt(MG) > this.adminTable[0].elevato.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent < this.adminTable[0].elevato.SLN * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent < this.adminTable[0].elevato.SLT * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }

                        }

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
                        console.log('Lay===>', this.max_profit)

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
                        if(this.currentPercent > 0){
                            this.percentTextColor = '#20a052'
                            this.percentTextColor1 = '#20a052'
                            this.percentBackgroundColor = '#d8e4bc'
                            this.percentBackgroundColor1 = '#d8e4bc'
                            this.percent_text1 = 'Current Profit:'
                            this.percent_text2 = this.currentPercent.toString() + '%'

                            let timeRecord = this.timeRecord
                            let MG = timeRecord.substring(0, timeRecord.length)

                            if(MG =='' ){
                                MG = '0'
                            }

                            console.log('XXXXXXXXXX',MG,this.riskTrading,this.stopLoss,this.tradingMode,this.currentPercent)

                            if(this.riskTrading == 'easy'){
                                if(parseInt(MG) > this.adminTable[0].facile.MG && this.stopLoss == false && this.tradingMode == false && this.currentPercent > this.adminTable[0].facile.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.tradingMode == true && this.stopLoss == false && this.currentPercent > this.adminTable[0].facile.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent > this.adminTable[0].facile.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent > this.adminTable[0].facile.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'medium'){
                                if(parseInt(MG) > this.adminTable[0].medio.MG && this.stopLoss == false && this.tradingMode == false && this.currentPercent > this.adminTable[0].medio.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.tradingMode == true && this.stopLoss == false && this.currentPercent > this.adminTable[0].medio.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent > this.adminTable[0].medio.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent > this.adminTable[0].medio.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'risky'){
                                if(parseInt(MG) > this.adminTable[0].elevato.MG && this.stopLoss == false && this.tradingMode == false && this.currentPercent > this.adminTable[0].elevato.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.tradingMode == true && this.stopLoss == false && this.currentPercent > this.adminTable[0].elevato.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent > this.adminTable[0].elevato.GN){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent > this.adminTable[0].elevato.GT){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }

                        }
                        else if(this.currentPercent < 0){
                            this.percentTextColor = '#b80101'
                            this.percentTextColor1 = '#b80101'
                            this.percentBackgroundColor = '#ffc7ce'
                            this.percentBackgroundColor1 = '#ffc7ce'
                            this.percent_text1 = 'Current Profit:'
                            this.percent_text2 = this.currentPercent.toString() + '%'

                            let timeRecord = this.timeRecord
                            let MG = timeRecord.substring(0, timeRecord.length)

                            if(MG =='' ){
                                MG = '0'
                            }

                            console.log('XXXXXXXXXX',MG,this.riskTrading,this.stopLoss,this.tradingMode,this.currentPercent,this.adminTable[0].facile.SLN)

                            if(this.riskTrading == 'easy'){
                                if(parseInt(MG) > this.adminTable[0].facile.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent < this.adminTable[0].facile.SLN * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].facile.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent < this.adminTable[0].facile.SLT * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'medium'){
                                if(parseInt(MG) > this.adminTable[0].medio.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent < this.adminTable[0].medio.SLN * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].medio.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent < this.adminTable[0].medio.SLT * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }
                            else if(this.riskTrading == 'risky'){
                                if(parseInt(MG) > this.adminTable[0].elevato.MG && this.stopLoss == true && this.tradingMode == false && this.currentPercent < this.adminTable[0].elevato.SLN * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                                else if(parseInt(MG) > this.adminTable[0].elevato.MG && this.tradingMode == true && this.stopLoss == true && this.currentPercent < this.adminTable[0].elevato.SLT * (-1)){
                                    this.percentTextColor1 = '#000'
                                    this.percentBackgroundColor = '#ffc000'
                                    this.percent_text1 = 'Cash Out Now! '
                                }
                            }

                        }

                    }
                }
                else{
                    this.max_profit = 0
                    this.max_lose = 0
                    this.guad_max = 0
                    this.percent_text1 =
                        this.percent_text2 = 'Insert Odd and Stake'
                    this.guad_att = 0
                    this.percentTextColor = '#20a052'
                    this.percentTextColor1 = '#20a052'
                    this.percentBackgroundColor = '#d8e4bc'
                    this.percentBackgroundColor1 = '#d8e4bc'
                }
            },
            bookmaker_fee(val){
                this.bookmarkerFee = val
                this.odd_calc(this.calc_odd)
                console.log(val)
            },
            stopLossfunction(val){
                this.stopLoss = val
                this.odd_calc(this.calc_odd)
                console.log('stoplossVal', val)
            },
            tradingModefunction(val){
                this.tradingMode = val
                this.stake_calc(this.calc_stake)
                console.log('tradingModeVal', val)
            },
            riskMode(val){
                if(val == '0'){
                    this.riskTrading = 'easy'
                }
                else if(val == '1'){
                    this.riskTrading = 'medium'
                }
                else if(val == '2'){
                    this.riskTrading = 'risky'
                }
                this.odd_calc(this.calc_odd)
            },
            cashOut1(val){
                this.low_cash = val
                this.cash_out = false
                this.high_cash = false
                console.log('low=>', this.low_cash, this.cash_out, this.high_cash)
            },
            cashOut2(val){
                this.cash_out = val
                this.low_cash = false
                this.high_cash = false

                this.net_profit1 = this.guad_att
                this.net_profit2 = this.guad_att

                if(parseInt(this.selectedArray[6]) == 0){
                    if(this.back != '' && this.back != 0){
                        this.stakeCashout = (this.calc_odd* this.calc_stake/this.lay).toFixed(2)
                    }
                    else{
                        this.stakeCashout = 0
                    }
                }
                else if(parseInt(this.selectedArray[6]) == 1){
                    if(this.back != '' && this.back != 0){
                        this.stakeCashout = (this.calc_odd* this.calc_stake/this.back).toFixed(2)
                    }
                    else{
                        this.stakeCashout = 0
                    }
                }
                console.log('cashOut=>', this.low_cash, this.cash_out, this.high_cash)
            },
            cashOut3(val){
                this.high_cash = val
                this.cash_out = false
                this.low_cash = false
                console.log('high=>', this.low_cash, this.cash_out, this.high_cash)
            }
        },
        created() {
            this.bet_date();
            this.gameList1 = this.gameList
            let self = this
            this.sockets.listener.subscribe('UpdateOdds', (data) => {

                for(let i = 0 ; i < self.mainList.length; i++){
                    let marketsNode = self.mainList[i].markets
                    for(let j = 0; j < marketsNode.length; j++){
                        for(let k = 0; k < data.length; k++){
                            if(marketsNode[j].marketId == data[k].marketId){
                                self.mainList[i].markets[j].inplay = data[k].inplay
                                self.mainList[i].markets[j].runners = data[k].runners
                                self.mainList[i].markets[j].state = data[k].state
                            }
                            if(self.marketId == data[k].marketId){
                                self.odd_calc(this.calc_odd)
                                let selections = data[k].runners.filter(function(runner) {
                                    return runner.selectionId == self.selectionId;
                                });
                                if(data[k].state.status == 'SUSPENDED'){
                                    this.marketStatus = 'SUSPENDED'
                                }
                                else if(data[k].state.status == "CLOSED"){
                                    this.marketStatus = 'CLOSED'
                                }
                                else if(data[k].state.status == "OPEN"){
                                    this.marketStatus =''
                                }
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
                                self.total_matched = (data[k].state.totalMatched).toFixed(1)
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

                if(self.eventId ==  data.eventId){
                    self.timeRecord = data.timeElapsed
                    self.status = data.status
                    if(data.status == 'IN_PLAY'){
                        self.status = 'Live - '
                        this.scoreOne = data.score.home.score + " -"
                        this.scoreTwo = data.score.away.score
                        this.timeRecord = data.timeElapsed+ "'"
                    }
                    else if(!data.status){
                        self.status = 'Coming Up'
                        this.scoreOne =''
                        this.scoreTwo =''
                        this.timeRecord =''
                    }
                    if(data.inPlayMatchStatus == 'FirstHalfEnd'){
                        this.timeRecord = "HT"
                    }
                }
            });

        }
    }
</script>
<style scoped>
    .match-container{
        border: 1px solid lightgray;
        padding: 10px;
        border-radius: 5px;
        background: ivory;
        box-shadow: 0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12);
        /*background: #1e1e1e;*/
    }
    .filter-container{
        border: 1px solid lightgray;
        padding: 10px;
        border-radius: 5px;
        background: ivory;
        box-shadow: 0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12);

    }
    .data_option-container{
        border: 1px solid lightgray;
        padding: 10px;
        border-radius: 5px;
        background: ivory;
        box-shadow: 0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12);
    }
    .form-group{
        margin-bottom: 5px;
    }
    .check-box{
        margin-bottom: 5px;
        min-width: 55px;
    }
    .checkbox-row{
        padding: 0;
    }
    .odd-filter-inputbox{
        width: calc(100% - 40px);
        float: left;
    }
    .select-container1{
        border: 1px solid lightgray;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 20px;
        background: ivory;
        box-shadow: 0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12);
    }
    .select-container2{
        border: 1px solid lightgray;
        padding: 10px;
        border-radius: 5px;
        background: ivory;
        box-shadow: 0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12);
    }
    .betfair-classic-container{
        border: 1px solid lightgray;
        padding: 10px;
        border-radius: 5px;
        background: ivory;
        box-shadow: 0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12);
    }
    .btn-info{
        font-size: 15px;
        padding-top: 5px;
        padding-bottom: 10px;
        background: green;
        color: #fff;
        font-weight: 500;
        border: 1px solid #ebedef;
    }
    .btn-success {
        color: #2b2b2b;
        background-color: #e6eef5;
        border-color: #ebedef;
        font-size: 25px;
        width: 100px;
        margin-top: 28px!important;
    }
    .button_group{
        width: 100%;
        margin-bottom: 10px;
    }
    .before_btn{
        background: #ebedef;
        font-weight: 600;
    }
    .current_btn{
        background: #cecece;
        font-weight: 600;
    }
    .after_btn{
        background: #ebedef;
        font-weight: 600;
    }
    .refresh-btn{
        width: 100%;
        background: #00791f;
        color: white;
        margin-top: 1px;
        padding-top: 5px;
        font-size: 15px;
        padding-left: 0px;
        padding-right: 0px;
        text-align: center;
        height: 36px;
    }
    .stop-btn{
        width: 100%;
        background: #ca2640;
        color: white;
        margin-top: 1px;
        padding-top: 5px;
        font-size: 15px;
        padding-left: 0px;
        padding-right: 0px;
        text-align: center;
        height: 36px;
    }
    .trading-mode-btn{
        width: 90%;
        color: red;
        border: 1px solid gainsboro;
    }
    .check-box0{
        height: 37px;
    }
    label, p, div, button{
        font-size: 12px!important;
    }

</style>
<style>
    .inputOdd, .inputOdd1{
        width: 60px;
        height: 25px;

    }
    .inputOdd input{
        padding: 2px 5px;
        height: 25px;
        background: white!important;
        border-radius: 0;
        color: black;
        border: 1px solid black;
    }
    .inputOdd1 input{
        padding: 2px 5px;
        height: 25px;
        background: none!important;
        border-radius: 0;
        color: gray;
        border: none;
    }
    .form-check1{
        width: 110px;
        font-weight: 700;
        margin: auto;
    }
    .form-check1 input{
        margin-top: 3px;
    }
    .filter-container input[type = 'checkbox']{
        width: 10px!important;
    }
    .form-control{
        font-size: 12px!important;
    }
    .slide-fade-enter-active {
        -webkit-animation-name: example;
        -webkit-animation-duration: .51s;
        -webkit-animation-iteration-count: 1;
        animation-name: example;
        animation-duration: .51s;
        animation-iteration-count: 1;
    }

    .livenow {
        -webkit-animation-name: example;
        -webkit-animation-duration: .25s;
        -webkit-animation-iteration-count: 1;
        animation-name: example;
        animation-duration: .55s;
        animation-iteration-count: 1;
    }

    @keyframes example {
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

