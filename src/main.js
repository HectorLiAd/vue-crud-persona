import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import ListarPersonasComponent from './components/ListarPersonasComponent'
import NuevaPersonaComponent from './components/NuevaPersonaComponent'

Vue.config.productionTip = false
Vue.use(VueRouter)
const routes = [
  { path: '/', name: 'principal', component: ListarPersonasComponent },
  { path: '/crear-persona', name: 'crearpersona', component: NuevaPersonaComponent },
  { path: '/editar-persona/:id?', name: 'actualizarpersona', component: NuevaPersonaComponent },
]

const router = new VueRouter({
  mode: "history",
  routes
});

// export default router;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
