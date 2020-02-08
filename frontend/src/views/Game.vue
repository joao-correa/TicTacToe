<template>
  <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
  
    <div>
      <div class="alert alert-danger" v-if="this.alerta.length > 0">
        {{ alerta }}
      </div>
    </div>

    <div class="row" v-if="!this.game">
      <div class="col-12">
        <div class="alert alert-success">
          Waiting a player...
        </div>
      </div>
    </div>

    <div class="arena d-flex flex-column" v-if="this.game && !this.reseting">
      <div class="first-line d-flex flew-row">
        <div class="arena-field" @click="play('A1')"> <img :src="render('A1')" alt="" width="50px"> </div>
        <div class="arena-field" @click="play('A2')"> <img :src="render('A2')" alt="" width="50px"> </div>
        <div class="arena-field" @click="play('A3')"> <img :src="render('A3')" alt="" width="50px"> </div>
      </div>
      <div class="first-line d-flex flex-row">
        <div class="arena-field" @click="play('B1')"> <img :src="render('B1')" alt="" width="50px"> </div>
        <div class="arena-field" @click="play('B2')"> <img :src="render('B2')" alt="" width="50px"> </div>
        <div class="arena-field" @click="play('B3')"> <img :src="render('B3')" alt="" width="50px"> </div>
      </div>
      <div class="first-line d-flex flex-row">
        <div class="arena-field" @click="play('C1')"> <img :src="render('C1')" alt="" width="50px"> </div>
        <div class="arena-field" @click="play('C2')"> <img :src="render('C2')" alt="" width="50px"> </div>
        <div class="arena-field" @click="play('C3')"> <img :src="render('C3')" alt="" width="50px"> </div>
      </div>
    </div>

  </div>  
</template>

<script>
  
  import X from "./../assets/x.png";
  import O from "./../assets/o.png";

  export default {
    name: 'Game',
    data(){
      return {  
        name: "",
        game: null,
        alerta: "",
        reseting: false,
      }
    },
    methods : {
      sendMessage(){
        this.$socket.emit('subscribe', { name: this.name });
      },
      play(position){
        this.$socket.emit('play', { position, name: this.name });
      },
      render(position){
        return this.game && this.game.state && this.game.state[position].value;
      },
    },
    sockets: {
      connect() {
        this.$socket.emit('subscribe', { name: this.name });
      },
      startGame(data) {
        this.game = data;
      },
      cantPlay(position){
        this.alerta = `Can't play at ${position}`;
      },
      updateGame(data){
        this.game = data;
      },
      resultado( mensagem ){
        this.alerta = mensagem;
      },
      reset(data){
        this.reseting = true;
        this.game = data;

        setTimeout(()=> {
          this.reseting = false;
        }, 1000);
      }
    },
    created(){
      this.name =  this.$route && this.$route.params && this.$route.params.name;
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
    border-collapse: collapse;
    border: .4px solid #00f;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 30px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .devb {
    border: 1px solid #000;
  }
 
</style>
