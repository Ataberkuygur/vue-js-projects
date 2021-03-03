<template>
  <div id="questionList">
    <div
      v-bind:key="item.specialKey"
      v-for="item in questionList"
      class="question col-md-12 d-flex justify-content-center align-items-center mt-3"
    >
      <div class="row">
        <div
          v-bind:style="{ width: item.yesPercent }"
          class="progress-bar d-flex justify-content-center align-items-center mt-2"
        >
          <span>{{ item.yesPercent }}</span>
        </div>
        <div
          class="question-header col-md-12 d-flex justify-content-center align-items-center"
        >
          {{ item.question }}
        </div>
        <div
          class="question-body col-md-12 d-flex justify-content-center align-items-center pb-3"
        >
          <button
            id="choiceYesButton"
            v-bind:class="{ selected: item.choices.yes.selected }"
            class="btn text-start d-flex align-items-center mr-2"
            v-on:click="selectYes(item)"
          >
            Yes
          </button>
          <button
            id="choiceNoButton"
            v-bind:class="{ selected: item.choices.no.selected }"
            class="btn text-start d-flex align-items-center"
            v-on:click="selectNo(item)"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionList: [
        {
          question: "Do you like our school?",
          yesPercent: "-",
          totalParticipating: 0,
          choices: {
            yes: { selected: false, count: 0 },
            no: { selected: false, count: 0 },
          },
          specialKey: "",
        },
        {
          question: "Do we give good lessons to you?",
          yesPercent: "-",
          totalParticipating: 0,
          choices: {
            yes: { selected: false, count: 0 },
            no: { selected: false, count: 0 },
          },
          specialKey: "",
        },
        {
          question: "Do you want to change location from here?",
          yesPercent: "-",
          totalParticipating: 0,
          choices: {
            yes: { selected: false, count: 0 },
            no: { selected: false, count: 0 },
          },
          specialKey: "",
        },
        {
          question: "Is our school is clear?",
          yesPercent: "-",
          totalParticipating: 0,
          choices: {
            yes: { selected: false, count: 0 },
            no: { selected: false, count: 0 },
          },
          specialKey: "",
        },
      ],
    };
  },
  methods: {
    changeProgressBar() {
      //Progress Bar Algorithm
      this.questionList.map((obj) => {
        let yesChoices = 0;
        yesChoices += obj.choices.yes.count;
        let yesPercent = (yesChoices / obj.totalParticipating)* 100;
        yesPercent = Math.ceil(yesPercent)
        console.log(yesChoices)
        console.log(obj.totalParticipating)
        console.log(yesPercent)
        if (yesPercent > 0) {
          obj.yesPercent = yesPercent + "%";
        }
      });
    },
    //Selecting Choice Yes
    selectYes(question) {
      if (question.choices.no.selected == false && question.choices.yes.selected == false ) {
        question.choices.yes.selected = true;
        question.choices.yes.count++;
      
        //İncreasing Total Clicks
        question.totalParticipating++;
        console.log(question.totalParticipating);
        this.changeProgressBar();
      }
    },
    //Selecting Choice No
    selectNo(question) {
      if (question.choices.yes.selected == false && question.choices.no.selected == false ) {
        question.choices.no.selected = true;
        question.choices.no.count++;
      
        //İncreasing Total Clicks
        question.totalParticipating++;
        console.log(question.totalParticipating);
        this.changeProgressBar();
      }
    },
  },
  created() {
    //Setting Unique Key For Every Question
    this.questionList.map((obj) => {
      //Random Numbers(12) - Converting To String - Splitting The String
      let numbers = Math.ceil(Math.random() * 1000000000000)
        .toString()
        .split("");

      //Some Letters And Symbols
      let complexList = ["*", "a", "B", "-", "#", "A", "/", "d", "J", "%", "v"];

      //Creating Special Key with Mixing Numbers and Complex Key
      let uniqueKey = [
        complexList[Math.ceil(Math.random() * 10)] +
          numbers[Math.ceil(Math.random() * 10)] +
          complexList[Math.ceil(Math.random() * 10)] +
          numbers[Math.ceil(Math.random() * 10)] +
          complexList[Math.ceil(Math.random() * 10)] +
          numbers[Math.ceil(Math.random() * 10)],
      ].join("");
      obj.specialKey = uniqueKey;
    });
  },
};
</script>

<style scoped>
#questionList {
  overflow-x: hidden;
}

.question {
  font-family: sans-serif;
  width: 100%;
  border: 1px solid rgb(29, 157, 173);
}

.progress-bar {
  width: 100%;
  height: 30px;
  border-radius: 7px;
  background-color: rgb(34, 147, 192);
}

.question-header {
  width: 100%;
  min-height: 50px;
}

#choiceYesButton {
  width: 100%;
  background-color: white;
  border: 1px solid rgb(29, 157, 173);
  height: 25px;
  font-size: 15px;
}

#choiceYesButton:hover {
  background-color: rgb(29, 157, 173);
}

#choiceNoButton {
  width: 100%;
  background-color: white;
  border: 1px solid rgb(29, 157, 173);
  height: 25px;
  font-size: 15px;
}

#choiceNoButton:hover {
  background-color: rgb(29, 157, 173);
}

.selected {
  background-color: rgb(29, 157, 173) !important;
  color: white !important;
}
</style>