<template>
  <div class="main">

    <div class="row col-12">
      <div class="col-2">
        <div class="list-group">
          <button @click="contentAllBooks()" class="list-group-item list-group-item-primary text-center">All Books</button>
          <p class="list-group-item list-group-item-secondary text-center">Authors</p>
          <button @click="contentByAuthor(author.id)" v-for="(author, key) in allAuthors" :key="key" class="list-group-item list-group-item-action list-group-item-light">
            {{ author.authorsName }}
          </button>
          <p class="list-group-item list-group-item-secondary text-center">Genres</p>
          <button @click="contentByGenre(genre.id)" v-for="(genre, key) in allGenres" :key="key" class="list-group-item list-group-item-action list-group-item-light">
            {{ genre.genresName }}
          </button>
          <p class="list-group-item list-group-item-secondary text-center">Books</p>
          <button @click="contentByBook(book.id)" v-for="(book, key) in allBooks" :key="key" class="list-group-item list-group-item-action list-group-item-light">
            {{ book.booksName }}
          </button>
        </div>
      </div>

      <div class="col">
        <div class="row justify-content-center">
            <one-book-card v-for="(book, key) in content" :key="key" :book="book" :user="user" @cardEvent="cardEvent"></one-book-card>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import app from '../../static/config'
import oneBookCard from './sections/OneBookCard'

export default {
  name: 'MainPage',
  data () {
    return {
      URL: app.config.URL,
      allBooks: '',
      allAuthors: '',
      allGenres: '',
      content: '',
    }
  },

  components:{
    'one-book-card': oneBookCard
  },

  props: ["user"],

  created() {
    fetch(this.URL + 'client/api/shop/authors/', {method: 'GET'})
    .then(this.status)
    .then(this.json)
    .then((data) => {
      // console.log(data)
      this.allAuthors = data.data
    });
    
    fetch(this.URL + 'client/api/shop/genres/', {method: 'GET'})
    .then(this.status)
    .then(this.json)
    .then((data) => {
      // console.log(data)
      this.allGenres = data.data
    });
    
    fetch(this.URL + 'client/api/shop/books/', {method: 'GET'})
    .then(this.status)
    .then(this.json)
    .then((data) => {
      // console.log(data.data)
      this.allBooks = data.data
      this.content = data.data
    });

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

    contentAllBooks() {
      fetch(this.URL + 'client/api/shop/books/', {method: 'GET'})
      .then(this.status)
      .then(this.json)
      .then((data) => {
        // console.log(data.data)
        this.content = data.data
      });
    },

    contentByGenre(id) {
      fetch(this.URL + 'client/api/shop/books/FALSE/FALSE/' + id, {method: 'GET'})
      .then(this.status)
      .then(this.json)
      .then((data) => {
        // console.log(data.data)
        this.content = data.data
      });
    },

    contentByAuthor(id) {
      fetch(this.URL + 'client/api/shop/books/FALSE/' + id, {method: 'GET'})
      .then(this.status)
      .then(this.json)
      .then((data) => {
        // console.log(data.data)
        this.content = data.data
      });
    },

    contentByBook(id) {
      fetch(this.URL + 'client/api/shop/books/' + id, {method: 'GET'})
      .then(this.status)
      .then(this.json)
      .then((data) => {
        // console.log(data.data)
        this.content = data.data
      });
    },

    cardEvent(type, id) {
      console.log(type, id)
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
  }

  // methods: {
  //   cardEvent(type, id) {
  //     this.$emit('cardEvent', type, id)
  //   }
  // }
}
</script>