<template>
  <div class="game-container">
    <button @click="sendMessage()"> Send a message </button>
  </div>
</template>

<script>
  
  export default {
    name: 'Game',
    data(){
      return {  
        name: "",
      }
    },
    methods : {
      sendMessage(){
        try {
          this.$socket.emit('player_register', { name: this.name });
        }catch (er){
          console.log(er);
        }
      }
    },
    sockets: {
      connect() {
        console.log('connected with success.');
        
      },
      disconnect() {
        console.log('disconnected with success.');
      },
      waitingPlayer(data) {
        console.log('waiting a player...');
      },
      teset2(data){
        console.log(data);
      }
    },
    created(){
      this.name =  this.$route && this.$route.params && this.$route.params.name;
      console.log( this.name );
    }
   
  }

</script>

<style scoped lang="scss">

  html, body {
    padding: 0 !important;
    margin: 0 !important;
    color: #fff;
    font-size: 17px;
  }

  .game-container {
    padding: 0;
    margin: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, .9);
    display:flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
 
</style>
