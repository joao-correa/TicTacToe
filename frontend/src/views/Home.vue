<template>
  <div class="container-fluid d-flex justify-content-center align-items-center">
    <div class="row w-100">
      <div class="jumbotron col-12 col-md-6 offset-md-3">
        <form>
          <div class="form-group row">
            <label for="txtName" class="col-12 col-sm-2 col-form-label">Name</label>
            <div class="col-12 col-sm-10">
              <input type="text" class="form-control" v-model='name'  id="txtName" placeholder="Your name">
            </div>
          </div>
          <button @click="next()" class="btn btn-primary mb-2">Next</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  
  export default {
    name: 'ChoiceName',
    data(){
      return {  
        name: "",
      }
    },
    methods : {
      next() {
        this.$router.push({
          name: "game",
          params : {
            name : this.name.replace(/\W/g, "")
          }
        });
      }
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

  input {
    background-color:rgba(31, 31, 31, .9);
    border: none;
    border-bottom: .5px solid rgba(200, 200, 200, .9);
  }

  input:focus {
    color: #fff;
    background-color:rgba(41, 41, 41, .9);
    transition: .5s;
  }

</style>
