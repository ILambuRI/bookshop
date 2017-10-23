<template>

  <div class="card col-md-3" style="width: 20rem; margin-bottom: 30px; margin-left: 30px;">
    <img class="card-img-top" src="https://image.jimcdn.com/app/cms/image/transf/dimension=270x1024:format=jpg/path/s031157332e8c77b3/image/i9b56b68841ba013e/version/1298320698/image.jpg" :alt="book.booksName">
    <div class="card-body">
      <h4 class="card-title text-center">{{ book.booksName }}</h4>
      <p class="card-text">{{ book.description }}</p>
      <p class="card-text">
        <strong>Author(s):</strong> 
        <a class="badge badge-pill badge-light" @click="cardEvent('byAuthor', author.id)" v-for="(author, key) in book.authors" :key="key" href="#">
          {{ author.authorsName }}
        </a>
      </p>
      <p class="card-text">
        <strong>Genre(s):</strong>
        <a class="badge badge-pill badge-light" @click="cardEvent('byGenre', genre.id)" v-for="(genre, key) in book.genres" :key="key" href="#">
          {{ genre.genresName }}
        </a>
      </p>
      <p class="card-text" v-if="book.percent != '0'"><strong>Discount:</strong> {{ book.discountsName }} ({{ book.percent }}%)</p>
      <p class="card-text"><strong>Pubyear:</strong>  {{ book.pubyear }}</p>
      <p class="card-text" v-if="book.percent == '0'"><strong>Price:</strong>  {{ book.price }} <strong>₴</strong></p>
      <p class="card-text" v-if="book.percent != '0'"><strong>Price:</strong>  <del>{{ book.price }}</del>  {{ book.price - (book.price * book.percent / 100) }} <strong>₴</strong></p>

      <div v-if="btnToCartAccess">
        <button @click="toCart()" class="btn btn-outline-dark" :disabled="!user.access">
          <i class="fa fa-cart-plus" aria-hidden="true" style="font-size: 30px;"></i>
        </button>
        <button @click="count--" class="btn btn-dark" :disabled="count <= 1">
          <i class="fa fa-minus" aria-hidden="true"></i>
        </button>
        <button type="button" class="btn btn-light font-weight-bold">{{ count }}</button>
        <!-- <span class="font-weight-bold">_{{ count }}_</span> -->
        <button @click="count++" class="btn btn-dark">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>

      <button v-if="!btnToCartAccess" type="button" class="btn btn-outline-dark" disabled>
        <i class="fa fa-cart-arrow-down" aria-hidden="true" style="font-size: 30px;"></i>
      </button>
    </div>
  </div>

</template>

<script>
import app from '../../../static/config'

export default {
  name: 'OneBookCard',
  data () {
    return {
      URL: app.config.URL,
      count: 1,
    }
  },

  props: ["book", "user"],

  computed: {
    btnToCartAccess() {
      if (this.user.cart) {
        let result = this.user.cart.filter((el) => {
          if (el == this.book.id) return true
          
          return false
        })

        if (result.length) return false
      }

      return true
    },
  },

  created() {
  },

  methods: {
    toCart() {
      let user = JSON.parse(localStorage['user'])
      user.cart.push(this.book.id)
      localStorage['user'] = JSON.stringify(user)
      this.user.cart.push(this.book.id)

      fetch(this.URL + 'client/api/user/cart/', {
        method: 'POST',
        headers: {  
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
        },  
        body: 'hash=' + this.user.hash + '&id=' + this.book.id + '&count=' + this.count
      })
      .then(this.status)
      .then(this.json)
      .then((data) => {
        // console.log(data)
        if (data.server.status == 200) {
        }
        else {
          let error = 'Error in toCart()'+
                      '\nStatus: ' + data.server.status +
                      '\nError code: ' + data.server.code +
                      '\nInfo: ' + data.server.information
          alert(error)
        }
      })
    },

    cardEvent(type, id) {
      this.$emit('cardEvent', type, id)
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
