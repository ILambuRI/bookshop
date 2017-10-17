<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="margin-bottom: 30px;">
      <a class="navbar-brand" href="/">BookShop</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>

        <div v-if="!user.access" class="row">
          <button type="button" class="btn btn-light mr-sm-1 my-sm-0">
            Registration
          </button>
          <form class="form-inline my-2 my-lg-0">
            <input v-model.trim="login" class="form-control mr-sm-1" type="text" placeholder="Login" aria-label="Login">
            <input v-model.trim="password" class="form-control mr-sm-1" type="password" placeholder="Password" aria-label="Password">
            <button @click="auth()" type="button" class="btn btn-outline-dark my-2 my-sm-0" :disabled="validAccess">
              Login
            </button>
          </form>
        </div>

        <div v-if="user.access" class="row">
          <button type="button" class="btn btn-light mr-sm-1 my-sm-0 text-primary font-weight-bold">
            {{ user.login }}
          </button>
          <button type="button" class="btn btn-outline-dark mr-sm-2 my-sm-0">
            <i class="fa fa-cart-arrow-down" aria-hidden="true"></i>
          </button>
          <button @click="logout()" type="button" class="btn btn-outline-dark mr-sm-2 my-sm-0">
            <i class="fa fa-sign-out" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </nav>
    <!-- <img src="./assets/logo.png"> -->
    <router-view :user="user"/>

  </div>
</template>

<script>
import app from '../static/config'

export default {
  name: 'app',
  data () {
    return {
      URL: app.config.URL,
      login: '',
      password: '',
      user: {access: false},
    }
  },

  computed: {
    validAccess() {
      if (this.validLogin && this.validPassword) {
        return false
      }

      return true
    },

    validLogin() {
      let x = /^[a-z]+[0-9a-z]*$/i.exec(this.login)
      if (x && this.login.length >=3) {
        return true
      }

      return false
    },

    validPassword() {
      let x = /^[a-z0-9]+$/i.exec(this.password)

      if (x) {
        if (x && this.login.length >=5) return true
      }

      return false
    }
  },


  created() {
    if (localStorage['user']) {
      this.user = JSON.parse(localStorage['user'])
      this.checkAuth(this.user.hash)
    }
  },

  methods: {
    checkAuth(hash) {
      fetch(this.URL + 'client/api/user/users/false/' + hash, {method: 'GET'})
      .then(this.status)
      .then(this.json)
      .then((data) => {
        if (data.server.status == 200) {
          console.log(data)
        }
        /* TODO modal window with error */
        else if (data.server.code == '013') {
          localStorage.removeItem("user")
          this.user.access = false
          let error = 'Login time has expired, please login!'
          alert(error)
        }
        else {
          let error = 'Status: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information
          alert(error)
        }
      })
    },

    logout() {
      localStorage.removeItem("user")
      this.user.access = false
      fetch(this.URL + 'client/api/user/users/' + this.user.hash, {
        method: 'DELETE',
        headers: {  
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
        },  
      })
      .then(this.status)
      .then(this.json)
      .then((data) => {
        if (data.server.status == 200) {
        }
        else {
          let error = 'Status: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information
          alert(error)
        }
      });
    },

    auth() {
      fetch(this.URL + 'client/api/user/users/', {
        method: 'PUT',
        headers: {  
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
        },  
        body: 'login=' + this.login + '&password=' + this.password
      })
      .then(this.status)
      .then(this.json)
      .then((data) => {
        if (data.server.status == 200) {
          this.user.access = true
          this.user.login = this.login
          this.user.hash = data.data.hash
          this.user.admin = data.data.admin
          localStorage['user'] = JSON.stringify(this.user)
        }
        else {
          let error = 'Status: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information
          alert(error)
        }
      });
    },

    cardEvent(type, id) {
      // console.log(type, id)
      switch (type) {
        case 'byAuthor':
          this.contentByAuthor(id)
        break;
        case 'byGenre':
          this.contentByGenre(id)
        break;
        case 'toCart':
          this.$emit('toCart', id)
        break;
      }

    },

    status(response) { 
      if (response.status == 200) {
        return Promise.resolve(response)
      } else {
        console.log('ERROR FETCH RESPONSE!')
        return Promise.reject( new Error(response.statusText) )  
      }
    },

    json(response) {
        return response.json()  
    },
  }
}
</script>