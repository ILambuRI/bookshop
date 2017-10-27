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
          <router-link :to="'/admin/edit-author/'+author.id" @click="contentByAuthor(author.id)" v-for="(author, key) in adminData.allAuthors" :key="key" class="list-group-item list-group-item-action list-group-item-light">
            {{ author.authorsName }}
          </router-link>
        </div>

        <router-link to="/admin/new-genre" class="list-group-item list-group-item-primary text-center">
          New Genre
        </router-link>
        <button class="list-group-item list-group-item-secondary text-center" type="button" data-toggle="collapse" data-target="#collapseGenres" aria-expanded="false" aria-controls="collapseGenres">
          All Genres
        </button>
        <div class="collapse" id="collapseGenres">
          <router-link :to="'/admin/edit-genre/'+genre.id" v-for="(genre, key) in adminData.allGenres" :key="key" class="list-group-item list-group-item-action list-group-item-light">
            {{ genre.genresName }}
          </router-link>
        </div>

        <router-link to="/admin/new-book" class="list-group-item list-group-item-primary text-center">
          New Book
        </router-link>
        <button class="list-group-item list-group-item-secondary text-center" type="button" data-toggle="collapse" data-target="#collapseBooks" aria-expanded="false" aria-controls="collapseBooks">
          All Books
        </button>
        <div class="collapse" id="collapseBooks">
          <router-link :to="'/admin/edit-book/'+book.id" v-for="(book, key) in adminData.allBooks" :key="key" class="list-group-item list-group-item-action list-group-item-light">
            {{ book.booksName }}
          </router-link>
        </div>

        <router-link to="/admin/new-user" class="list-group-item list-group-item-primary text-center">
          New User
        </router-link>
        <button class="list-group-item list-group-item-secondary text-center" type="button" data-toggle="collapse" data-target="#collapseUsers" aria-expanded="false" aria-controls="collapseUsers">
          All Users
        </button>
        <div class="collapse" id="collapseUsers">
          <router-link :to="'/admin/edit-user/'+user.id" v-for="(user, key) in adminData.allUsers" :key="key" class="list-group-item list-group-item-action list-group-item-light">
            {{ user.login }}
          </router-link>
        </div>

        <router-link to="/admin/all-orders" class="list-group-item list-group-item-primary text-center">
          All Orders
        </router-link>
      </div>
    </div>

    <div class="col">
      <div class="row justify-content-center">
          <router-view :user="user" :adminData="adminData" @adminEvent="adminEvent"/>
      </div>
    </div>
  </div>
</template>

<script>
import app from '../../static/config'

export default {
  name: 'Admin',
  data () {
    return {
      URL: app.config.URL,
      adminData: {
        allAuthors: [],
        allGenres: [],
        allBooks: [],
        allDiscounts: [],
        allStatus: [],
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
    if (!this.user.access || this.user.admin != 1) this.$router.push('/')
    
    this.getAuthors()
    this.getGenres()
    this.getBooks()
    this.getDiscounts()
    this.getStatus()
    this.getOrders()
    this.getUsers()
  },

  methods: {
    getAuthors() {
      fetch(this.URL + 'client/api/shop/authors/', {method: 'GET'})
      .then(this.status)
      .then(this.json)
      .then((data) => {
        // console.log(data)
        this.adminData.allAuthors = data.data
      })
    },

    getGenres() {
      fetch(this.URL + 'client/api/shop/genres/', {method: 'GET'})
      .then(this.status)
      .then(this.json)
      .then((data) => {
        // console.log(data)
        this.adminData.allGenres = data.data
      })
    },

    getBooks() {
      fetch(this.URL + 'client/api/shop/books/', {method: 'GET'})
      .then(this.status)
      .then(this.json)
      .then((data) => {
        // console.log(data.data)
        this.adminData.allBooks = data.data
      })
    },

    getDiscounts() {
      fetch(this.URL + 'client/api/shop/discounts/', {method: 'GET'})
      .then(this.status)
      .then(this.json)
      .then((data) => {
        // console.log(data.data)
        this.adminData.allDiscounts = data.data
      })
    },

    getStatus() {
      fetch(this.URL + 'client/api/shop/status/', {method: 'GET'})
      .then(this.status)
      .then(this.json)
      .then((data) => {
        // console.log(data.data)
        this.adminData.allStatus = data.data
      })
    },

    getOrders() {
      fetch(this.URL + 'client/api/admin/orders/' + this.user.hash, {method: 'GET'})
      .then(this.status)
      .then(this.json)
      .then((data) => {
        if (data.server.status == 200) {
          this.adminData.allOrders = data.data
        }
      })
    },

    getUsers() {
      fetch(this.URL + 'client/api/admin/users/' + this.user.hash, {method: 'GET'})
      .then(this.status)
      .then(this.json)
      .then((data) => {
        if (data.server.status == 200) {
          this.adminData.allUsers = data.data
        }
      })
    },

    adminEvent(type) {
      switch (type) {
        case 'Authors':
          this.getAuthors()
        break;
        case 'Genres':
          this.getGenres()
        break;
        case 'Books':
          this.getBooks()
        break;
        case 'Orders':
          this.getOrders()
        break;
        case 'Users':
          this.getUsers()
        break;
      }
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
