<template>
  <div class="row col-12">
    <div class="col-2">
      <div class="list-group">
        <router-link to="/admin/new-author" class="list-group-item list-group-item-primary text-center">
            New Author
        </router-link>
        <button class="list-group-item list-group-item-secondary text-center" type="button" data-toggle="collapse" data-target="#collapseAuthors" aria-expanded="false" aria-controls="collapseAuthors">
          All Authors
        </button>
        <div class="collapse" id="collapseAuthors">
          <router-link to="/admin/edit-author" @click="contentByAuthor(author.id)" v-for="(author, key) in adminData.allAuthors" :key="key" class="list-group-item list-group-item-action list-group-item-light">
            {{ author.authorsName }}
          </router-link>
        </div>

        <button @click="contentAllBooks()" class="list-group-item list-group-item-primary text-center">
          New Genre
        </button>
        <button class="list-group-item list-group-item-secondary text-center" type="button" data-toggle="collapse" data-target="#collapseGenres" aria-expanded="false" aria-controls="collapseGenres">
          All Genres
        </button>
        <div class="collapse" id="collapseGenres">
          <button @click="contentByAuthor(genre.id)" v-for="(genre, key) in adminData.allGenres" :key="key" class="list-group-item list-group-item-action list-group-item-light">
            {{ genre.genresName }}
          </button>
        </div>

        <button @click="contentAllBooks()" class="list-group-item list-group-item-primary text-center">
          New Book
        </button>
        <button class="list-group-item list-group-item-secondary text-center" type="button" data-toggle="collapse" data-target="#collapseBooks" aria-expanded="false" aria-controls="collapseBooks">
          All Books
        </button>
        <div class="collapse" id="collapseBooks">
          <button @click="contentByAuthor(book.id)" v-for="(book, key) in adminData.allBooks" :key="key" class="list-group-item list-group-item-action list-group-item-light">
            {{ book.booksName }}
          </button>
        </div>

        <button @click="contentAllBooks()" class="list-group-item list-group-item-primary text-center">
          New User
        </button>
        <button class="list-group-item list-group-item-secondary text-center" type="button" data-toggle="collapse" data-target="#collapseUsers" aria-expanded="false" aria-controls="collapseUsers">
          All Users
        </button>
        <div class="collapse" id="collapseUsers">
          <button @click="contentByAuthor(user.id)" v-for="(user, key) in adminData.allUsers" :key="key" class="list-group-item list-group-item-action list-group-item-light">
            {{ user.login }}
          </button>
        </div>

        <button @click="contentAllBooks()" class="list-group-item list-group-item-primary text-center">
          All Orders
        </button>
      </div>
    </div>

    <div class="col">
      <div class="row justify-content-center">
          <router-view :user="user" :adminData="adminData"/>
      </div>
    </div>
  </div>
</template>

<script>
import app from '../../static/config'
// import addUser from './Registration'

export default {
  name: 'Admin',
  data () {
    return {
      URL: app.config.URL,
      adminData: {
        allAuthors: [],
        allGenres: [],
        allBooks: [],
        allUsers: [],
        allOrders: [],
      }
    }
  },

  props: ["user"],

  // components:{
  //   'adduser': addUser
  // },

  computed: {
  },

  created() {
    if (this.user.admin != 1) location.href = "/#/"

    fetch(this.URL + 'client/api/shop/authors/', {method: 'GET'})
    .then(this.status)
    .then(this.json)
    .then((data) => {
      // console.log(data)
      this.adminData.allAuthors = data.data
    })
    
    fetch(this.URL + 'client/api/shop/genres/', {method: 'GET'})
    .then(this.status)
    .then(this.json)
    .then((data) => {
      // console.log(data)
      this.adminData.allGenres = data.data
    })
    
    fetch(this.URL + 'client/api/shop/books/', {method: 'GET'})
    .then(this.status)
    .then(this.json)
    .then((data) => {
      // console.log(data.data)
      this.adminData.allBooks = data.data
    })

    fetch(this.URL + 'client/api/admin/orders/' + this.user.hash, {method: 'GET'})
    .then(this.status)
    .then(this.json)
    .then((data) => {
      if (data.server.status == 200) {
        this.adminData.allOrders = data.data
      }
    })

    fetch(this.URL + 'client/api/admin/users/' + this.user.hash, {method: 'GET'})
    .then(this.status)
    .then(this.json)
    .then((data) => {
      if (data.server.status == 200) {
        this.adminData.allUsers = data.data
      }
    })
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
