<template>
  <div id="app" class="container">

    <div class="card" v-if='!currentQuestion'>
      <div class="card-body">
        Yarışmaya başlamak için butona basın.
      </div>
      <div class="card-footer">
        <button @click='giveQuestion' class="btn btn-primary">Yarışmaya Başla</button>
      </div>
    </div> 

    <div class="card mt-4" v-else>
      <div class="card-header">
          {{currentQuestion.question}}
      </div>
      <div class="card-body">
        <div class="d-flex">
          <div class="letter shadow" v-for='(letter, index) in letters' :key='index'>
            <span v-if='letter.said'>{{letter.letter}}</span>
            <span v-else></span>
          </div>
        </div>
      </div>
      <div class="card-footer">
        Harf Puanı: {{letterScore}}
      </div>
      <div class="card-footer">
        Toplam Puan: {{score}}
      </div>
      <div class="card-footer">
        <p>
          <input class="form-control" type="text" placeholder="Cevabınızı Yazın" v-model='answer'>
        </p>
        Cevabınız: {{answer}}
        <p>
          <button class="btn btn-secondary" @click='giveLetter'>Harf İste</button>
        </p>
      </div>      
      <div class="card-footer">
        <button class="btn btn-secondary" @click='giveAnswer'>Cevap Ver</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data(){
    return{
      questions: [
        {
          question: "Siyah ile aynı anlama gelen bir renk",
          answer: "KARA",
          asked: false,
        },
        {
          question: "Sık kullanılan bir isim",
          answer: "AHMET",
          asked: false,
        },
        {
          question: "Türkiye'nin başkenti",
          answer: "ANKARA",
          asked: false,
        },
        {
          question: "Karadenizde bir ilimiz",
          answer: "TRABZON",
          asked: false,
        },
      ],
      currentQuestion: '',
      letters: '',
      score: 0,
      letterScore: 0,
      answer: '',
    }
  },
  methods: {
    startGame(){
      this.currentQuestion = null;
      this.giveQuestion();
    },
    giveQuestion(){
      this.currentQuestion = this.questions.find(q => !q.asked);
      if (!this.currentQuestion){
        alert(`Tebrikler yarışmayı ${this.score} puan ile bitirdiniz!`)
      }
      this.letters = [];
      this.currentQuestion.answer.split('').map(l => {
        this.letters.push({
          letter: l,
          said: false,
        });
      });
      this.letterScore = this.letters.length * 100
      this.currentQuestion.asked = true;
    },
    giveLetter(){
      let randomLetterIndex = Math.floor(Math.random() * this.letters.length);
      if (this.letterScore > 100){
        let letter = this.letters[randomLetterIndex];
        while (letter.said){
          letter = this.letters[randomLetterIndex];
        }
        letter.said = true;
        this.letterScore -= 100
      }
    },
    giveAnswer(){
      this.answer = this.answer.toLocaleUpperCase('tr');

      if (this.answer === this.currentQuestion.answer.toLocaleUpperCase('tr')){
        this.score += this.letterScore;
      }
      else{
        this.score -= this.letterScore;
      }
      this.giveQuestion();
    }
  }
}
</script>

<style>
.letter{
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}
</style>
