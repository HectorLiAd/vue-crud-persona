<template>
  <div id="app">
    <h1>FORMULARIO PARA LA PERSONA</h1>
    <div class="container-fluid">
      <div class="col-md-12">
        <div class="row">
          <!-- <div class="col-md-2">
            <MenuComponent></MenuComponent>
          </div> -->
          <div class="col-md-12 w-100">
            <div class="jumbotron">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import MenuComponent from "./components/MenuComponent";
export default {
  name: "App",
  components: {
    // MenuComponent,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@import "./assets/css/style.css";
</style>