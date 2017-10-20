<template>
  <div class="row col-md-12 justify-content-md-center">

    <div class="row col-md-4">
      <div class="col-md-12">
        <form>
          <div class="form-group">
            <label>Author name</label>
            <input v-model="name" type="text" class="form-control" placeholder="Enter name">
            <small v-if="name == ''" class="form-text text-muted">Only latin (3 - 20 characters) ...</small>
            <small v-if="!validName & name.length > 0" class="form-text text-danger">Not yet correct ...</small>
            <small v-if="validName & nameCheck" class="form-text text-danger">This author already exists, please enter another!</small>
            <small v-if="validName & !nameCheck" class="form-text text-success">Сorrectly!</small>
          </div>
          <button @click="saveUser()" class="float-right btn btn-dark" :disabled="!validBtnAccess">
            Submit
          </button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import app from '../../../static/config'

export default {
  name: 'NewAuthor',
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
      let x = this.adminData.allAuthors.filter((el) => {
        if (el.authorsName.toLowerCase() == this.name.toLowerCase())
          return true
      })

      if (x && x.length) {
        this.nameCheck = true
      }
    }
  },

  props: ["user", "adminData"],

  // components:{
  //   'adduser': addUser
  // },

  computed: {
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
