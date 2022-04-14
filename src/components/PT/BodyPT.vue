<template>
    <div class="container">
    <div class="btnContainer">
        <button id="exp" :class="{'button button1': Expenses, 'button button2': !Expenses }" @click="AccountType('1')">Expenses</button> 
        <button id="inc" :class="{'button button1': Income, 'button button2': !Income }" @click="AccountType('2')">Income</button> 
    </div>
    <div class="categoryName">
        <p>Expenses categories:</p>
    </div>
    <div class="catContainer">
        <div class="addCategory">
            <img @click="modalShow" src="@/assets/icon-add.svg">
            <p>Add category</p>
        </div>
        <div v-for="(Icon, key) in arrayCategory" v-bind:key="key">
            <img v-bind:src="getImg(Icon.src)" @click="clickImage(Icon.src,key)" class="afterIcon" />
            <div >{{Icon.categoryName}}</div>
        </div>
          <div class="modal" ref="modalCategory">
              <div class="modal-content">
                  <form ref="formCategory">
                      <div class="addCatHead">
                          <p>Add category</p>
                          <span @click="hidemodal" class="close-button">&times;</span>
                      </div>
                      <span style="color: red; font-size: 15px">{{warning}}</span>
                      <div class="iconsModal">
                        <div>
                            <input type="radio" name="radioCategory" v-model="category" value="icon-money">
                            <img src="@/assets/icon-money.svg" style="width: 30px" required >
                        </div>
                        <div>
                            <input type="radio" name="radioCategory" v-model="category" value="icon-car">
                            <img src="@/assets/icon-car.svg" style="width: 30px" required>
                        </div>
                        <div>
                            <input type="radio" name="radioCategory" v-model="category" value="icon-umbrella">
                            <img src="@/assets/icon-umbrella.svg" style="width: 30px" required>
                        </div>
                        <div>
                            <input type="radio" name="radioCategory" v-model="category" value="icon-child">
                            <img src="@/assets/icon-child.svg" style="width: 30px" required>
                        </div>
                        <div>
                            <input type="radio" name="radioCategory" v-model="category" value="icon-food">
                            <img src="@/assets/icon-food.svg" style="width: 30px" required>
                        </div>
                        <div>
                            <input type="radio" name="radioCategory" v-model="category" value="icon-home">
                            <img src="@/assets/icon-home.svg" style="width: 30px" required>
                        </div>
                        <div>
                            <input type="radio" name="radioCategory" v-model="category" value="icon-investment">
                            <img src="@/assets/icon-investment.svg" style="width: 30px" required>
                        </div>
                        <div>
                            <input v-model="textCategory" type="text" required>
                        </div>
                        <div>
                            <input type="button" @click="categorySave" name="" value="SAVE">
                        </div>
                     </div>
                  </form>
              </div>
          </div>
      </div>
      <div ref="modalPopUpSave" class="modal">
        <div class="modal-content">
            <div class>
                <label>Saved!</label>
            </div>
        </div>
      </div>
      <div ref="modalKeyInValue" class="modal">
        <div class="modal-content">
            <div class>
                <label>Insert value please</label>
            </div>
        </div>
      </div>
      <div class="calculator">
        <div class="btn">
            <img class="display2icon" v-if="image_url" v-bind:src="getImg(selectedIcon)"/>
            <input type="text" v-if="image_url" v-model="inputSelectedCategory">
        </div>
        <div class="display">{{ current || "0" }}</div>
        <div @click="append('7')" class="btn">7</div>
        <div @click="append('8')" class="btn">8</div>
        <div @click="append('9')" class="btn">9</div>
        <div class="btn" style="font-size:11px">Today : {{ today }}</div>
        <div @click="append('4')" class="btn">4</div>
        <div @click="append('5')" class="btn">5</div>
        <div @click="append('6')" class="btn">6</div>
        <div  class="btn">
        </div>
        <div @click="append('1')" class="btn">1</div>
        <div @click="append('2')" class="btn">2</div>
        <div @click="append('3')" class="btn">3</div>
        <div  class="btn">
        </div>
        <div @click="period" class="btn">.</div>
        <div @click="append('0')" class="btn">0</div>
        <div @click="clear" class="btn">
          <img src="@/assets/icon-cancel.svg" style="width: 9%" />
        </div>
        <div @click="submit" class="btn">
          <img src="@/assets/icon-tick.svg" style="width: 9%" />
        </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            today: moment().format('MM/DD'),
            arrayCategory: [],
            category: '',
            textCategory: '',
            indexImage: 0,
            image_url: false,
            previous: null,
            current: '',
            operator: null,
            operatorClicked: false,
            selectedIcon: '',
            inputSelectedCategory: '',
            warning: '',
            arrayAllCategories: [],
            show: false,
            Expenses: true,
            Income: false,
        }
    },
    methods: {
        AccountType(type){
            if (type=='1'){
                this.arrayCategory=this.ExpensesArray
                this.Expenses=true
                this.Income=false
            }
            else if (type=='2'){
                this.arrayCategory=this.IncomeArray
                this.Income=true
                this.Expenses=false
            }
            this.selectedIcon=''
            this.image_url=false
            this.indexImage=0
            this.current=''
            this.inputSelectedCategory=''
        },
        getImg(img) {
            var images = require.context('@/assets/', false, /\.svg$/)
            return images('./' + img + ".svg")
        },
        modalShow() {
            let modal = this.$refs.modalCategory
            modal.classList.toggle("show-modal");
            this.textCategory=''
            this.category=''
            this.warning=''
        },
        hidemodal() {
            let modal = this.$refs.modalCategory
            modal.classList.toggle("show-modal");
        },
        clickImage(src,key){
            this.indexImage=key 
            this.image_url=true
            this.selectedIcon=src
        },
        categorySave () {
            if(!this.$refs['formCategory'].reportValidity()){
                return false
            }
                
            if (this.category==''){
                this.warning="Please select one category!"
                return false
            }
            this.warning=''

            this.arrayCategory.push( {src: this.category, categoryName: this.textCategory} )
            this.hidemodal()

            this.current=''
            this.inputSelectedCategory=''

            if(this.Expenses){
                this.$store.commit("ExpensesMutation",this.arrayCategory);
            }
            else if(this.Income){
                this.$store.commit("IncomeMutation",this.arrayCategory);
            }
        },
        clear() {
            this.current = "";
        },
        append(number) {
            if (this.operatorClicked) {
                this.current = "";
                this.operatorClicked = false;
            }
            this.current = `${this.current}${number}`;
        },
        period() {
            if (this.current.indexOf(".") === -1) {
                this.append(".");
            }
        },
        setPrevious() {
            this.previous = this.current;
            this.operatorClicked = true;
        },
        minus() {
            this.operator = (a, b) => a - b;
            this.setPrevious();
        },
        add() {
            this.operator = (a, b) => a + b;
            this.setPrevious();
        },
        submit() {

            if (this.current == 0) {
                let modal = this.$refs.modalKeyInValue
                modal.classList.toggle("show-modal");
                setTimeout(function(){modal.classList.toggle("show-modal")},2000)
                return false
            }

            this.previous = null;

            if(this.Expenses){
                var varMoneyCategory='-' + this.current
                this.TotalExpenses[0][this.SelectedMonth]= this.TotalExpenses[0][this.SelectedMonth] + parseFloat(this.current,2)
                this.$store.commit("TotalExpensesMutation", this.TotalExpenses);
            }
            else if(this.Income){
                varMoneyCategory='+' + this.current
                this.TotalIncome[0][this.SelectedMonth]= this.TotalIncome[0][this.SelectedMonth] + parseFloat(this.current,2)
                this.$store.commit("TotalIncomeMutation", this.TotalIncome);
            }

            this.Overall[0][this.SelectedMonth] = this.TotalIncome[0][this.SelectedMonth] - this.TotalExpenses[0][this.SelectedMonth]
            this.$store.commit("OverallMutation", this.Overall);

            let array = {
                src: this.arrayCategory[this.indexImage].src,
                subCategoryName: this.inputSelectedCategory,
                moneyCategory: varMoneyCategory
            }

            this.arrayAllCategories[0][this.SelectedMonth].push(array)
            this.$store.commit("IncomeExpensesMutation",this.arrayAllCategories);

            let modal = this.$refs.modalPopUpSave
            modal.classList.toggle("show-modal");
            setTimeout(function(){modal.classList.toggle("show-modal")},2000)
        },
    },
    created () {
        // this.arrayAllCategories = this.IncomeExpensesArray
        // this.arrayCategory = this.ExpensesArray
    },
    computed: {
        ...mapGetters(['TotalExpenses', 'Overall', 'SelectedMonth', 'ExpensesArray', 'IncomeArray', 'IncomeExpensesArray', 'TotalIncome',])
    },
}
</script>

<style>
.btnContainer {
    margin-top: 20px;
    width: 100%; 
    text-align: center;
}

.button {
    display: inline-block;
    width: 160px;
    height: 50px;
    border-radius: 15px;
    background-color: #ff91a4;
    color: white;
    border-radius: 15px;
    font-size: 14px;
    font-family: 'Helvetica';
}

#exp {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
}

#inc {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
}

.categoryName {
    font-family: 'Helvetica';
    font-size: 14px;
    padding-top: 30px;
    padding-left: 30px;
}

.addCategory {
    text-align: right;
    left: 70%;
    top: 40%;
    justify-content: center;
    align-items: center;
    position: absolute;
}

.addCategory img {
    width: 35px;
    margin-right: 20px;
}

.addCategory p {
    font-family: 'Helvetica';
    font-size: 14px;
}

.catContainer {
    margin: 0 auto;
    background-color: white;
    padding: 30px 30px 0;
    display: flex;
    text-align: center;
}

.modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transform: scale(1.1);
    transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
    z-index: 1;
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 1rem 1.5rem;
    width: 90%;
    border-radius: 0.5rem;
}

.show-modal {
    opacity: 1;
    visibility: visible;
    transform: scale(1.0);
    transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
}
.close-button {
    float: right;
    width: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    cursor: pointer;
    border-radius: 0.25rem;
    background-color: lightgray;
}

.calculator {
    margin: 0 auto;
    width: 100%;
    height: 30vh;
    font-size: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(30px, auto);
    background-color: white;
    border-style: outset;
    border: 0.5px solid white;
    border-radius: 8px;
    text-align: center;
    margin-top: 51%;
    font-family: 'Helvetica';
  }

  .btn {
    background-color: white;
    border: 0.5px solid #999;
    justify-content: center;
    padding-top: 5px;
  }

  .display {
    grid-column: 2 / 5;
    background-color: white;
    color: black;
    border: 0.5px solid #999;
    text-align: right;
    padding-right: 10px;
  }

.afterIcon {
    width: 35px;
    background-color: white;
}

.iconsModal {
    text-align: center;
}

.display2icon {
    width: 20px;
    height: 20px;
}

</style>