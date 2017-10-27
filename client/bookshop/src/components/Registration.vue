<template>
  <div class="row col-md-12 justify-content-md-center">

    <div class="row col-md-4">
      <div class="col-md-12">
        <form>
          <div class="form-group">
            <label>Login</label>
            <input v-model.trim="login" type="text" class="form-control" placeholder="Login">
            <small v-if="login == ''" class="form-text text-muted">Start whith latin, remain are numbers and latin (3 - 20 characters) ...</small>
            <small v-if="!validLogin & login.length > 0" class="form-text text-danger">Not yet correct ...</small>
            <small v-if="validLogin & loginExist" class="form-text text-danger">Login is already taken, please enter another!</small>
            <small v-if="validLogin & !loginExist" class="form-text text-success">Сorrectly!</small>
          </div>

          <div class="form-group">
            <label>Password</label>
            <input v-model.trim="password" type="password" class="form-control" placeholder="Password">
            <small v-if="password == ''" class="form-text text-muted">Only latin and numbers (5 - 32 characters) ...</small>
            <small v-if="!validPassword & password.length > 0" class="form-text text-danger">Not yet correct ...</small>
            <small v-if="validPassword" class="form-text text-success">Сorrectly!</small>
          </div>

          <div class="form-group">
            <label>Confirm password</label>
            <input v-model.trim="confirm" type="password" class="form-control" placeholder="Confirm the password">
            <small v-if="confirm == ''" class="form-text text-muted">Confirm the password</small>
            <small v-if="password != confirm & confirm != ''" class="form-text text-danger">Not yet correct ...</small>
            <small v-if="password == confirm & validPassword" class="form-text text-success">Сorrectly!</small>
          </div>

          <div class="form-group">
            <label>Phone</label>
            <input v-model.trim="phone" type="text" class="form-control" placeholder="Phone">
            <small v-if="phone == ''" class="form-text text-muted">Only numbers (6 - 20 characters) ...</small>
            <small v-if="!validPhone & phone.length > 0" class="form-text text-danger">Not yet correct ...</small>
            <small v-if="validPhone" class="form-text text-success">Сorrectly!</small>
          </div>

          <router-link :to="'/'">
            <button class="float-left btn btn-dark">
              Home
            </button>
          </router-link>
        </form>
          <button @click="saveUser()" class="float-right btn btn-dark" :disabled="!validBtnAccess">
            Submit
          </button>
      </div>
    </div>

  </div>
</template>

<script>
import app from '../../static/config'

export default {
  name: 'Registration',
  data () {
    return {
      URL: app.config.URL,
      login: '',
      loginExist: false,
      password: '',
      confirm: '',
      phone: '',
    }
  },

  props: ["user"],

  watch: {
    login: function () {
      if (this.validLogin) {
        this.checkLogin()
      }
    }
  },

  computed: {
    validBtnAccess() {
      if (this.validLogin &&
          this.validPassword &&
          this.validPhone &&
          !this.loginExist &&
          this.password == this.confirm) {

        return true
      }

      return false
    },

    validLogin() {
      let x = /^[a-z]+[0-9a-z]*$/i.exec(this.login)

      if (x && this.login.length >= 3 && this.login.length <= 20) {
        return true
      }

      return false
    },

    validPassword() {
      let x = /^[a-z0-9]+$/i.exec(this.password)

      if (x) {
        if (x && this.password.length >= 5 && this.password.length <= 32)
          return true
      }

      return false
    },

    validPhone() {
      let x = /^[0-9]+$/i.exec(this.phone)

      if (x) {
        if (x && this.phone.length >= 6 && this.phone.length <= 20)
          return true
      }

      return false
    },
  },

  created() {
    if (this.user.admin == 0) {
      if (this.user.access) this.$router.push('/')
    }
  },

  methods: {
    saveUser() {
      fetch(this.URL + 'client/api/user/users/', {
        method: 'POST',
        headers: {  
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
        },  
        body: 'login=' + this.login + '&password=' + this.password + '&phone=' + this.phone
      })
      .then(this.status)
      .then(this.json)
      .then((data) => {
        if (data.server.status == 200) {
          if (this.user.admin == 0) {
            this.$router.push('/')
          }
          else {
            location.reload()
          }
        }
        else {
          let error = 'Error in saveUser()'+
                      '\nStatus: ' + data.server.status +
                      '\nError code: ' + data.server.code +
                      '\nInfo: ' + data.server.information
          alert(error)
        }
      })
    },

    checkLogin() {
      fetch(this.URL + 'client/api/user/users/' + this.login, {method: 'GET'})
      .then(this.status)
      .then(this.json)
      .then((data) => {
        if (data.server.status == 200) {
          this.loginExist = true
        }
        else {
          this.loginExist = false
        }
      })
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
