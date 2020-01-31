<template>
  <div class="container-fluid d-flex align-items-center justify-content-center">
    <form class="w-50">
      <div class="form-group row">
        <label for="txtName" class="col-12 col-sm-2 col-form-label">Nome</label>
        <div class="col-12 col-sm-10">
          <input type="text" class="form-control" v-model='name' id="txtName" placeholder="">
        </div>
      </div>
      <button @click="avancar()" class="btn btn-primary mb-2">Avançar</button>
    </form>
  </div>
</template>

<script>
  
  export default {
    name: 'ChoiceName',
    data(){
      return {  
        name: "Your Name",
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

  .container-fluid {
    background-color: rgba(240, 240, 240, .9);
    width: 100vw;
    height: 100vh;
  }

</style>
