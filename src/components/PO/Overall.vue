<template>
<div>
<div class="bodyHeader">
    <div class="graphic">
      <img src="@/assets/header.png">
    </div>
    <div class="header2">
      <img class="menu" alt="Vue logo" src="@/assets/icon-hamburger.svg">
      <div class="menu1">
        <select v-model="monthDropdown" @change="changeMonth">
            <option value="jan">January</option>
            <option value="feb">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="aug">August</option>
            <option value="sept">September</option>
            <option value="oct">October</option>
            <option value="nov">November</option>
            <option value="dec">December</option>
        </select>
      </div>
      <img class="menu" alt="Vue logo" src="@/assets/profile.png">
    </div>
</div>
<div class="container">
    <div class="box">
        <div class="income">
            <p>Income</p>
            <p class="highlight">MYR {{display_TotalIncome}}.00</p>
            <div class="detailBox">
                <p class="deets">Details</p>
            </div>
        </div>
        <div class="overall">
            <p class="over">Overall</p>
            <p id="bold" class="highlight1">+ MYR {{display_Overall}}.00</p>
        </div>
        <div class="expenses">
            <p>Expenses</p>
            <p class="highlight">MYR {{display_TotalExpenses}}.00</p>
            <div class="detailBox">
                <p class="deets">Details</p>
            </div>
        </div>
    </div>
</div>
<div class="container1">
        <div class="box1">
            <div class="head">
                <div class="attr">
                    <p class="date">{{today}}</p>
                </div>
                <div class="attr">
                    <p class="plus-minus">+ 10000.00 | - 2.00</p>
                </div>
            </div>
            <div class="content" v-for="(array, key) in display_IncomeExpensesArray" v-bind:key="key">
                <img v-bind:src="getImgUrl(array.src)"/>
                <div class="space">
                    <p id="dividend">{{array.subCategoryName}}</p>
                    <p>{{array.moneyCategory}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="add-btn">
        <img src="@/assets/icon-add.svg"  @click="onAddPage" value="PageTwo"/>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
    data() {
        return {
            today: moment().format('D MMMM YYYY, dddd'),
            monthDropdown: 'jan',
            display_TotalIncome: 0.00,
            display_TotalExpenses: 0.00,
            display_Overall:0.00,
            display_IncomeExpensesArray: []
        }
    },
    created() {
        // this.monthDropdown = this.SelectedMonth
        // this.changeMonth()
    },
    methods: {
        onAddPage() {
            this.$router.push("/PageTwo");
        },
        getImgUrl(img) {
            var images = require.context('@/assets/', false, /\.svg$/)
            return images('./' + img + ".svg")
        },
        changeMonth(){
            this.display_TotalIncome = this.TotalIncome[0][this.monthDropdown]
            this.display_TotalExpenses = this.TotalExpenses[0][this.monthDropdown]
            this.display_Overall = this.Overall[0][this.monthDropdown]
            this.display_IncomeExpensesArray = this.IncomeExpensesArray[0][this.monthDropdown]
            this.$store.commit("SelectedMonthMutation",this.monthDropdown);
        },
    },
    computed: {
    ...mapGetters([ 'Overall', 'SelectedMonth', "IncomeExpensesArray", 'TotalIncome', 'TotalExpenses',])
    },
}
</script>

<style scoped>
.container {
    margin-top: 45px;
    width: 100%; 
}

.box {
    display: flex;
    margin: 0 auto;
    background-image: linear-gradient(to right, #D27283 , #F3D896);
    width: 340px;
    height: 110px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 30px rgb(184, 184, 184);
}

.box p {
    color: white;
    font-family: Helvetica;
    font-size: 11px;
}

p {
    font-family: Helvetica;
    font-size: 11px;
    color: black;
}

.highlight {
    font-weight: 800;
    padding: 7px 0;
}

.highlight1 {
    color: black !important;
    font-weight: 900;
    padding-top: 1px;
}

.detailBox {
    width: 95%;
    height: 20px;
    background: rgba(226,226,226,0.5);
    border-radius: 15px;
    text-align: center;
    align-items: center;
    z-index: -1;
}

.overall {
    width: 110px;
    height: 55px;
    background-color: #FAF0EB;
    border-radius: 10px;
    margin: 0px 30px 0px;
    text-align: center;
    padding-top: 10px;
    opacity: 100%;
}

.expenses {
    text-align: right;
    padding-right: 10px;
}

.income {
    padding-left: 10px;
}

.deets {
    padding-top: 3px;
}

.over {
    color: #DD9186 !important; 
    font-weight: 900;
}

.graphic {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -105%;
    overflow-x: hidden;
}

.header2 {
    justify-content: center;
    flex-direction: row;
    display: flex;
    margin: 10px 0 -20px 0
}

.menu1 {
    margin: 0px 95px 0px;
    padding-top: 5px;
}

.container1 {
    margin-top: 30px;
    width: 100%; 
}

.box1 {
    margin: 0 auto;
    background-color: #ffffff;
    width: 330px;
    height: 100%;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 30px rgb(230, 230, 230);
}

.head {
    margin: 0 auto;
    display: flex;
    width: 100%;
    justify-content: space-between;
    width: 290px;
}

.attr {
    padding: 20px 0;
    letter-spacing: -0.1px;
}

.attr p {
    font-family: 'Helvetica';
    font-size: 9px;
    opacity: 50%;
}

.content {
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 20px;
}

.content img {
    width: 45px;
    height: 45px;
}

.content p {
    font-family: 'Helvetica';
    font-size: 12px;
    font-weight: 600;
}

.space {
    display: flex;
    justify-content: space-between;
    width: 300px;
    padding-left: 12px;
}

.add-btn {
    z-index: 1;
    position: absolute;
    left: 50%;
    top: 87%;
    transform: translate(-50%, 0);
    position: fixed;
}

</style>