<template>
  <div class="row col-md-12 justify-content-md-center">

    <div class="row col-md-4">
      <div class="col-md-12">
        <form>
          <div class="form-group">
            <label class="font-weight-bold">Change genre: {{ getGenreName }}</label>
            <input v-model="name" type="text" class="form-control" placeholder="Enter new name">
            <small v-if="name == ''" class="form-text text-muted">Only latin (3 - 20 characters) ...</small>
            <small v-if="!validName & name.length > 0" class="form-text text-danger">Not yet correct ...</small>
            <small v-if="validName & nameCheck" class="form-text text-danger">This genre already exists, please enter another!</small>
            <small v-if="validName & !nameCheck" class="form-text text-success">Сorrectly!</small>
          </div>
        </form>
        <button @click="deleteGenre()" class="float-left btn btn-dark">
          Delete
        </button>
        <button @click="saveGenre()" class="float-right btn btn-dark" :disabled="!validBtnAccess">
          Save
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import app from '../../../../static/config'

export default {
  name: 'EditGenre',
  data () {
    return {
      URL: app.config.URL,
      name: '',
      nameCheck: false
    }
  },

  watch: {
    name: function () {
      this.nameCheck = false
      let x = this.adminData.allGenres.filter((el) => {
        if (el.genresName.toLowerCase() == this.name.toLowerCase())
          return true
      })

      if (x && x.length) {
        this.nameCheck = true
      }
    }
  },

  props: ["user", "adminData"],

  computed: {
    getGenreName() {
      this.name = ''
      let x = this.adminData.allGenres.filter((el) => {
        if(el.id == this.$route.params.id)
          return true
      })

      if (x.length) {
        this.name = x[0].genresName
        return x[0].genresName
      }

      this.$router.push('/admin')
    },

    validBtnAccess() {
      if (this.validName && !this.nameCheck) {
        return true
      }

      return false
    },
    
    validName() {
      let x = /^[a-z]+(\s{1}[a-z]+)?$/i.exec(this.name)

      if (x && this.name.length >= 3 && this.name.length <= 20) {
        return true
      }

      return false
    },

  },

  created() {
  },

  methods: {
    saveGenre() {
      fetch(this.URL + 'client/api/admin/genres/', {
        method: 'PUT',
        headers: {  
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
        },  
        body: 'hash=' + this.user.hash + '&id=' + this.$route.params.id + '&name=' + this.name
      })
      .then(this.status)
      .then(this.json)
      .then((data) => {
        if (data.server.status == 200) {
          this.adminEvent('Genres')
        }
        else {
          let error = 'Error in saveGenre()'+
                      '\nStatus: ' + data.server.status +
                      '\nError code: ' + data.server.code +
                      '\nInfo: ' + data.server.information
          alert(error)
        }
      })

      this.nameCheck = true
    },

    deleteGenre() {
      fetch(this.URL + 'client/api/admin/genres/' + this.user.hash + '/' + this.$route.params.id, {
        method: 'DELETE',
        headers: {  
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
        },
      })
      .then(this.status)
      .then(this.json)
      .then((data) => {
        if (data.server.status == 200) {
          this.adminEvent('Genres')
          this.$router.push('/admin')
        }
        else {
          let error = 'Error in deleteGenre()'+
                      '\nStatus: ' + data.server.status +
                      '\nError code: ' + data.server.code +
                      '\nInfo: ' + data.server.information
          alert(error)
        }
      })
    },

    adminEvent(type) {
      this.$emit('adminEvent', type)
    },

    status(response) { 
      if (response.status == 200) {
        return Promise.resolve(response)
      } else {
        console.log('ERROR RESPONSE')
        return Promise.reject( new Error(response.statusText) )  
      }
    },

    json(response) {
        return response.json()  
    },
  }
}
</script>