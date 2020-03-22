<template>
  <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
  
    <div>
      <div class="alert alert-danger" v-if="this.alertaErro.length > 0">
        {{ alertaErro }}
      </div>
      <div class="alert alert-success" v-if="this.alertaSucesso.length > 0">
        {{ alertaSucesso }}
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
        <div class="arena-field" @click="play('A1')"> {{ render('A1') }} </div>
        <div class="arena-field" @click="play('A2')"> {{ render('A2') }} </div>
        <div class="arena-field" @click="play('A3')"> {{ render('A3') }} </div>
      </div>
      <div class="first-line d-flex flex-row">
        <div class="arena-field" @click="play('B1')"> {{ render('B1') }} </div>
        <div class="arena-field" @click="play('B2')"> {{ render('B2') }} </div>
        <div class="arena-field" @click="play('B3')"> {{ render('B3') }} </div>
      </div>
      <div class="first-line d-flex flex-row">
        <div class="arena-field" @click="play('C1')"> {{ render('C1') }} </div>
        <div class="arena-field" @click="play('C2')"> {{ render('C2') }} </div>
        <div class="arena-field" @click="play('C3')"> {{ render('C3') }} </div>
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
        game: null,
        alertaSucesso: "",       
        alertaErro: "",       
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
      cantPlay(data){
        this.alertaErro = data.message;
      },
      update(data){
        this.game = data;
        this.alertaErro = "";
        this.alertaSucesso = "";
      },
      winner (data) {
        this.alertaSucesso = data.message;
      },
      lose (data) {
        this.alertaErro = data.message;
      },
    },
    created(){
      this.name =  this.$route && this.$route.params && this.$route.params.name;
      this.sendMessage();
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

</style>
