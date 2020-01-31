<template>
  <div class="name-container">
    <form action="">
      <label for="">Nome:</label> 
      <input type="text" v-model="name">
      <button @click="avancar()"> Continuar </button>
    </form>
  </div>
</template>

<script>
  
  export default {
    name: 'ChoiceName',
    data(){
      return {  
        name: "sem nome",
      }
    },
    methods : {
      avancar() {
        this.$router.push({
          name: "game",
          params : {
            name : this.name.replace(/\W/g, "")
          }
        });
      }
    },
    created(){
      console.log('component created');
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

  .name-container {
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

  form {
    width: 400px;
  }

  form input, form input:active {
    background: #111;
    display: block;
    clear: both;
    width: 400px;
    height: 30px;
    outline: none;
    border: .4pt solid #888;
    color: #fff;
    padding-left: 3px;
    margin-top: 4px;
    margin-bottom: 4px;
    transition: .6s;
  }

  form input:hover {
    background: #333;
    transition: .6s;
  }

  form label {
    display: inline-block;
    width: 400px;
    text-align: center;
    font-family: consolas;
    color: #fff;
    font-size: 17px;
  }

  form button {
    background: #333;
    color: #fff;
    border: .4pt solid #888;
    width: 404px;
    text-align: center;
    height: 30px;
    transition: .6s;
    padding-left: 3px;
    margin-top: 4px;
    margin-bottom: 4px;
    font-size: 17px;
  }

  form button:hover {
    background: #000;
    color: #fff;
    transition: .6s;
  }

  @media (max-width: 500px) 
  {
    form  {
      width: 100vw;
    }
  }

</style>
