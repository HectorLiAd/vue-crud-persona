<template>
  <div>
    <h2 v-if="actualizar">
      Actualizar <strong>{{ id_persona_url }}</strong>
    </h2>
    <h2 v-else>Crear Persona</h2>
    <button
      type="button"
      class="btn btn-primary mb-2 col-sm-2 mt-1"
      @click="menuPrincipal()"
    >
      ATRAS
    </button>
    <form class="mt-4" @submit.prevent="crearOrActualizarPersona()">
      <div class="form-group row">
        <label for="nombrePersona" class="col-sm-2 col-form-label"
          >Nombre Personal</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="nombrePersona"
            placeholder="Nombres completos"
            v-model="persona.Nombre"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="apellidoPaterno" class="col-sm-2 col-form-label"
          >Apellido Paterno</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="apellidoPaterno"
            placeholder="Apellido Paterno"
            v-model="persona.Apellido_paterno"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="apellidoMaterno" class="col-sm-2 col-form-label"
          >Apellido Materno</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="apellidoMaterno"
            placeholder="Apellido Materno"
            v-model="persona.Apellido_materno"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="apellidoMaterno" class="col-sm-2 col-form-label">DNI</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="apellidoMaterno"
            placeholder="DNI"
            v-model="persona.Dni"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="apellidoMaterno" class="col-sm-2 col-form-label"
          >Fecha de Nacimiento</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="apellidoMaterno"
            placeholder="Fecha de Nacimiento"
            v-model="persona.Fecha_nacimiento"
          />
        </div>
      </div>
      <fieldset class="form-group">
        <div class="row">
          <legend class="col-form-label col-sm-2 pt-0">Genero</legend>
          <div class="col-sm-10">
            <div class="row">
              <div class="form-check col-sm-4">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                  value="M"
                  v-model="persona.Genero"
                />
                <label class="form-check-label" for="gridRadios1">
                  Masculino
                </label>
              </div>
              <div class="form-check col-sm-4">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value="F"
                  v-model="persona.Genero"
                />
                <label class="form-check-label" for="gridRadios2">
                  Femenino
                </label>
              </div>
              <div class="form-check col-sm-4">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value="O"
                  v-model="persona.Genero"
                />
                <label class="form-check-label" for="gridRadios2"> Otro </label>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
      <div class="form-group row">
        <div class="col-sm-12">
          <button type="submit" class="col-sm-6 btn btn-primary">
            Guardar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import swal from "sweetalert";
import axios from "axios";
export default {
  name: "NuevaPersonaComponent",
  props: ["titulo"],
  data() {
    return {
      persona: {
        Nombre: "",
        Apellido_paterno: "",
        Apellido_materno: "",
        Genero: "M",
        Dni: "",
        Fecha_nacimiento: "",
      },
      id_persona_url: null,
      actualizar: false,
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.id_persona_url = this.$route.params.id;
      this.actualizar = true;
      this.obtenerPersona();
    } else {
      this.actualizar = false;
    }
  },

  methods: {
    menuPrincipal() {
      this.$router.push({ name: "principal" });
    },
    obtenerPersona() {
      axios
        .get("https://proyintegrador2020.herokuapp.com/persona/" + this.id_persona_url)
        .then((response) => {
          this.persona.Nombre = response.data.nombre_personal;
          this.persona.Apellido_paterno = response.data.apellido_paterno;
          this.persona.Apellido_materno = response.data.apellido_materno;
          this.persona.Dni = response.data.dni;
          this.persona.Fecha_nacimiento = response.data.fecha_nacimiento;
          this.persona.Genero = response.data.Genero
        })
        .catch((error) => {
          console.error(error);
        });
    },
    mensajeCrearPersona(nombre) {
      swal(
        "Creado Correctamente",
        "La persona " + nombre + " se registro en la BD",
        "success"
      );
    },
    mensajeActualizarPersona(nombre) {
      swal(
        "Actualizado Correctamente",
        "Se actualizo " + nombre + " correctamente en la BD",
        "success"
      );
    },
    mensajeErrorGuardaCambios(cadena) {
      swal(
        "Error al guardar cambios",
        cadena,
        "error" ,
        {
        className: "red-bg",
      });
    },
    crearOrActualizarPersona() {
      if (this.actualizar) {
        this.actualizarPersona();

      } else {
        this.crearPersona();
      }
    },
    actualizarPersona() {
      axios
        .put(
          "https://proyintegrador2020.herokuapp.com/persona/",
          `{
            "ID": ${this.id_persona_url},
            "Nombre": "${this.persona.Nombre}",
            "ApellidoPaterno": "${this.persona.Apellido_paterno}",
            "ApellidoMaterno": "${this.persona.Apellido_materno}",
            "Genero": "${this.persona.Genero}",
            "Dni": "${this.persona.Dni}",
            "FechaNacimiento": "${this.persona.Fecha_nacimiento}"
          }`
        )
        .then((response) => {
          console.log(response.data)
          this.mensajeActualizarPersona(
              this.persona.Nombre +
              " " +
              this.persona.Apellido_paterno +
              " " +
              this.persona.Apellido_materno
          );
          this.$router.push({ name: "principal" });
        })
        .catch((error) => {
          console.error(error);
          this.mensajeErrorGuardaCambios("No se puedo actualizar")
        });
    },
    crearPersona() {
      axios
        .post(
          "https://proyintegrador2020.herokuapp.com/persona/",
          `{
        "Nombre": "${this.persona.Nombre}",
        "ApellidoPaterno": "${this.persona.Apellido_paterno}",
        "ApellidoMaterno": "${this.persona.Apellido_materno}",
        "Genero": "${this.persona.Genero}",
        "Dni": "${this.persona.Dni}",
        "FechaNacimiento": "${this.persona.Fecha_nacimiento}"
      }`
        )
        .then((response) => {
          console.log(response.data)
          this.mensajeCrearPersona(
              this.persona.Nombre +
              " " +
              this.persona.Apellido_paterno +
              " " +
              this.persona.Apellido_materno
          );
          this.$router.push({ name: "principal" });
        })
        .catch((error) => {
          console.error(error);
          this.mensajeErrorGuardaCambios("No se puedo crear a la persona")
        });
    },
  },
};
</script>