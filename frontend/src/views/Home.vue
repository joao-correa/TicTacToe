<template>
  <div class="container-fluid d-flex justify-content-center align-items-center">
    <div class="row w-100">
      <div class="jumbotron col-12 col-md-6 offset-md-3">
        <form  @submit.prevent>
          <div class="form-group row">
            <label for="txtName" class="col-12 col-sm-2 col-form-label">Name</label>
            <div class="col-12 col-sm-10">
              <input type="text" class="form-control" v-model='name'  id="txtName" placeholder="Your name">
            </div>
          </div>
          <div class="form-group row">
            <label for="txtPass" class="col-12 col-sm-2 col-form-label">Password</label>
            <div class="col-12 col-sm-10">
              <input type="password" class="form-control" v-model='password'  id="txtPass" placeholder="Your Password">
            </div>
          </div>
          <button @click="next()" class="btn btn-primary mb-2">Next</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  
  import servicePlayer from './../services/player';

  export default {
    name: 'ChoiceName',
    data(){
      return {  
        name: "",
        file: null,
        buffer: [],
        password: "",
      }
    },
    methods : {
      async next() {
        const player = await servicePlayer.register({
          name: this.name,
          password: this.password,
        });

        localStorage.setItem('player', JSON.stringify(player));

        this.$router.push({
          name: "room"
        });
      },
    }
  }

</script>

<style scoped lang="scss">

  .container-fluid {
    color: #fff;
    background-color: rgba(31, 31, 31, .9);
    width: 100vw;
    height: 100vh;
  }

  .jumbotron {
    background-color: rgba(41, 41, 41, .9);  
    box-shadow: #fff 0px 5px 10px -10px;
  }

  input, .input-color {
    background-color:rgba(31, 31, 31, .9) !important;
    border: none !important;
    border-bottom: .5px solid rgba(200, 200, 200, .9) !important;
  }

  input:focus, .input-color:focus {
    color: #fff !important;
    background-color:rgba(41, 41, 41, .9) !important;
    transition: .5s !important;
  }

</style>
