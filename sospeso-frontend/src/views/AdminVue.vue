<template>
    <div>
        <CRow>
            <CCol md="12">
                <CCard>
                    <CCardHeader>
                        Opozioni Admin
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                                class="mb-0 table-outline"
                                hover
                                :items="tableItems"
                                :fields="tableFields"
                                head-color="light"
                                no-sorting
                        >
                            <td slot="mode" slot-scope="{item}">
                                <div>{{item.mode.name}}</div>
                            </td>

                            <td slot="facile" slot-scope="{item}" class="table-cell">
                                <div class="clearfix">
                                    <div class="float-left">
                                        <CInput type="number" min="-1" :value="item.facile.value" @click="mode = item.mode.name" @update:value="saveTable1" class="facile"></CInput>
                                        <span v-if="item.mode.name != 'MG' && item.mode.name != 'Special min'" style="position: relative; top: 6px; left: 4px;">%</span>
                                    </div>
                                </div>
                            </td>
                            <td
                                slot="medio"
                                 slot-scope="{item}"
                                class="table-cell"
                            >
                                <div class="float-left">
                                    <CInput v-if="item.mode.name != 'Special %' && item.mode.name != 'Special min'" type="number" min="-1" :value="item.medio.value" @click="mode = item.mode.name" @update:value="saveTable2" class="facile"></CInput>
                                    <span v-if="item.mode.name != 'Special %' && item.mode.name != 'MG' && item.mode.name != 'Special min'" style="position: relative; top: 6px; left: 4px;">%</span>
                                </div>
                            </td>
                            <td slot="elevato" slot-scope="{item}" class="table-cell">
                                <div class="float-left">
                                    <CInput v-if="item.mode.name != 'Special %' && item.mode.name != 'Special min'" type="number" min="-1" :value="item.elevato.value" @click="mode = item.mode.name" @update:value="saveTable3" class="facile"></CInput>
                                    <span v-if="item.mode.name != 'Special %' && item.mode.name != 'MG' && item.mode.name != 'Special min'" style="position: relative; top: 6px; left: 4px;">%</span>
                                </div>
                            </td>
                        </CDataTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>

<script>

    export default {
        name: 'Dashboard',
        components: {
        },
        data () {
            return {
                selected: 'Month',
                tableItems: [
                    {
                        mode: { name: 'GN'},
                        facile: { value: 10},
                        medio:{value: 20},
                        elevato:{value: 30},
                    },
                    {
                        mode: { name: 'GT'},
                        facile: { value: 3},
                        medio:{value: 5},
                        elevato:{value: 10},
                    },
                    {
                        mode: { name: 'MG'},
                        facile: { value: 10},
                        medio:{value: 30},
                        elevato:{value: 60},
                    },
                    {
                        mode: { name: 'SLN'},
                        facile: { value: 30},
                        medio:{value: 60},
                        elevato:{value: 91},
                    },
                    {
                        mode: { name: 'SLT'},
                        facile: { value: 9},
                        medio:{value: 15},
                        elevato:{value: 30},
                    },
                    {
                        mode: { name: 'Special %'},
                        facile: { value: 10},
                        medio:{value: 0},
                        elevato:{value: 0},
                    },
                    {
                        mode: { name: 'Special min'},
                        facile: { value: 45},
                        medio:{value: 0},
                        elevato:{value: 0},
                    }
                ],
                tableFields: [
                    { key: 'mode', label:  ''},
                    { key: 'facile', label: 'Facile', _classes: 'table-success'},
                    { key: 'medio', label: 'Medio', _classes: 'table-warning'},
                    { key: 'elevato', label: 'Elevato',_classes: 'table-danger'  },
                ],
                mode:'',
                adminTable:{
                    facile:{
                        'GN': 10,
                        'GT': 3,
                        'MG': 10,
                        'SLN': 30,
                        'SLT': 9,
                        'Special1': 10,
                        'Special2': 45
                    },
                    medio:{
                        'GN': 20,
                        'GT': 5,
                        'MG': 30,
                        'SLN': 60,
                        'SLT': 15,
                    },
                    elevato:{
                        'GN': 30,
                        'GT': 10,
                        'MG': 60,
                        'SLN': 91,
                        'SLT': 30,
                    }
                }
            }
        },
        methods: {
            saveTable1(val1){
                let val = parseInt(val1)
                if(this.mode == 'GN'){
                    this.adminTable.facile.GN = val
                }
                else if(this.mode == 'GT'){
                    this.adminTable.facile.GT = val
                }
                else if(this.mode == 'MG'){
                    this.adminTable.facile.MG = val
                }
                else if(this.mode == 'SLN'){
                    this.adminTable.facile.SLN = val
                }
                else if(this.mode == 'SLT'){
                    this.adminTable.facile.SLT = val
                }
                else if(this.mode == 'Special %'){
                    this.adminTable.facile.Special1 = val
                }
                else if(this.mode == 'Special min'){
                    this.adminTable.facile.Special2 = val
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table`, [this.adminTable]).then(({data}) => {
                    console.log(data.data)
                })
                console.log(val, this.mode, this.adminTable)

            },
            saveTable2(val1){
                let val = parseInt(val1)
                if(this.mode == 'GN'){
                    this.adminTable.medio.GN = val
                }
                else if(this.mode == 'GT'){
                    this.adminTable.medio.GT = val
                }
                else if(this.mode == 'MG'){
                    this.adminTable.medio.MG = val
                }
                else if(this.mode == 'SLN'){
                    this.adminTable.medio.SLN = val
                }
                else if(this.mode == 'SLT'){
                    this.adminTable.medio.SLT = val
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table`, [this.adminTable]).then(({data}) => {
                    console.log(data.data)
                })
                console.log(val, this.mode, this.adminTable)
            },
            saveTable3(val1){
                let val = parseInt(val1)
                if(this.mode == 'GN'){
                    this.adminTable.elevato.GN = val
                }
                else if(this.mode == 'GT'){
                    this.adminTable.elevato.GT = val
                }
                else if(this.mode == 'MG'){
                    this.adminTable.elevato.MG = val
                }
                else if(this.mode == 'SLN'){
                    this.adminTable.elevato.SLN = val
                }
                else if(this.mode == 'SLT'){
                    this.adminTable.elevato.SLT = val
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table`, [this.adminTable]).then(({data}) => {
                    console.log(data.data)
                })
                console.log(val, this.mode, this.adminTable)
            },
            getTable(){
                window.axios.post(`${process.env.VUE_APP_URL}getTable`).then(({data})=> {
                    console.log('asdasdas', data.data)
                    this.adminTable = data.data

                    this.tableItems = [
                        {
                            mode: { name: 'GN'},
                            facile: { value: data.data.facile.GN},
                            medio:{value: data.data.medio.GN},
                            elevato:{value: data.data.elevato.GN},
                        },
                        {
                            mode: { name: 'GT'},
                            facile: { value: data.data.facile.GT},
                            medio:{value: data.data.medio.GT},
                            elevato:{value: data.data.elevato.GT},
                        },
                        {
                            mode: { name: 'MG'},
                            facile: { value: data.data.facile.MG},
                            medio:{value: data.data.medio.MG},
                            elevato:{value: data.data.elevato.MG},
                        },
                        {
                            mode: { name: 'SLN'},
                            facile: { value: data.data.facile.SLN},
                            medio:{value: data.data.medio.SLN},
                            elevato:{value:  data.data.elevato.SLN},
                        },
                        {
                            mode: { name: 'SLT'},
                            facile: { value: data.data.facile.SLT},
                            medio:{value: data.data.medio.SLT},
                            elevato:{value: data.data.elevato.SLT},
                        },
                        {
                            mode: { name: 'Special %'},
                            facile: { value: data.data.facile.Special1},
                            medio:{value: 0},
                            elevato:{value: 0},
                        },
                        {
                            mode: { name: 'Special min'},
                            facile: { value: data.data.facile.Special2},
                            medio:{value: 0},
                            elevato:{value: 0},
                        }
                    ]
                })
            }
        },
        created() {
            this.getTable()
        }
    }
</script>
<style>
    .facile{
        float: left;
    }
    .table-cell input{
        max-width: 70px;
    }
    .table-cell{
        background: lightgoldenrodyellow;
        height: 50px;
        border-left: 1px solid lightgray;
    }
    .table td {
        padding: 5px;
    }
    .float-left{
        height: 35px;
    }
    .table th, .table td {
        border-top: 0px solid!important;
        border-bottom: 1px solid lightgray!important;
    }
    .table{
        margin-bottom: 0!important;
        border-bottom: none;
    }
    @media screen and (max-width: 600px) {
        .table-cell input{
            max-width: 44px;
        }
    }
</style>
