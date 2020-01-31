<template>
  <div class="container-fluid d-flex justify-content-center align-items-center">
  
    <div class="row" v-if="!this.game">
      <div class="col-12">
        <div class="alert alert-success">
          Wainting a player...
        </div>
      </div>
    </div>

    <div class="arena d-flex flex-column" v-if="this.game">
      <div class="first-line d-flex flew-row">
        <div class="arena-field" @click="game.play('A1')"> {{ game.render('A1') }} </div>
        <div class="arena-field" @click="game.play('A2')"> {{ game.render('A2') }} </div>
        <div class="arena-field" @click="game.play('A3')"> {{ game.render('A3') }} </div>
      </div>
      <div class="first-line d-flex flex-row">
        <div class="arena-field" @click="game.play('B1')"> {{ game.render('B1') }} </div>
        <div class="arena-field" @click="game.play('B2')"> {{ game.render('B2') }} </div>
        <div class="arena-field" @click="game.play('B3')"> {{ game.render('B3') }} </div>
      </div>
      <div class="first-line d-flex flex-row">
        <div class="arena-field" @click="game.play('C1')"> {{ game.render('C1') }} </div>
        <div class="arena-field" @click="game.play('C2')"> {{ game.render('C2') }} </div>
        <div class="arena-field" @click="game.play('C3')"> {{ game.render('C3') }} </div>
      </div>
    </div>

  </div>  
</template>

<script>
  
  export default {
    name: 'Game',
    data(){
      return {  
        name: "",
        game: null
      }
    },
    methods : {
      sendMessage(){
        this.$socket.emit('player_register', { name: this.name });
      },
    },
    sockets: {
      connect() {
        console.log('connected with success.');     
      },
      disconnect() {
        console.log('disconnected with success.');
      },
      startGame(data) {
        console.log(data);
        this.game = new Game(data);
      },
    },
    created(){
      this.name =  this.$route && this.$route.params && this.$route.params.name;
    }
  }

  class Game {
    constructor({state = {}, oponente = {}, app = {}} =  {}){
      this.position = { ...state };
      this.oponente = { ...oponente };
      this.app = app;
    }

    play(pos){

    }
    
    canPlayHere(pos){
      const field = this.position[pos];

      if( field.value == "" )
        return true;

      return false
    }

    render(position = ""){

    }
  }

</script>

<style scoped lang="scss">

  .container-fluid {
    background-color: rgba(240, 240, 240, .9);
    width: 100vw;
    height: 100vh;
  }

  .arena .arena-field {
    collapse: collapse;
    border-collapse: collapse;
    border: .4px solid #000;
    width: 75px;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .devb {
    border: 1px solid #000;
  }
 
</style>
