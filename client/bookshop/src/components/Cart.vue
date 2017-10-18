<template>
  <div class="container justify-content-md-center">
    <table class="table table-striped">
  <thead class="thead-inverse">
    <tr>
      <th>Name</th>
      <th>Discount (%)</th>
      <th>Price</th>
      <th>Discount</th>
      <th>Count</th>
      <th>Total</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(book, key) in userCart" :key="key">
      <td>{{ book.booksName }}</td>
      <td>{{ book.percent }}%</td>
      <td>{{ book.price }}</td>
      <td>{{ book.discount }}</td>
      <td>{{ book.count }}</td>
      <td>{{ book.total }}</td>
      <td>
        <button type="button" class="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
import app from '../../static/config'

export default {
  name: 'Cart',
  data () {
    return {
      URL: app.config.URL,
      userCart: []

    }
  },

  props: ["user"],

  computed: {
  },

  created() {
    fetch(this.URL + 'client/api/user/cart/' + this.user.hash, {method: 'GET'})
    .then(this.status)
    .then(this.json)
    .then((data) => {
      if (data.server.status == 200) {
        this.userCart = data.data
        this.userCart.forEach((element) => {
          element.discount = +element.price * +element.percent / 100
          element.total = +element.price * +element.count
          if (element.percent != 0) {
            element.total -= +element.total * +element.percent / 100
          }
        })
      }
      // console.log(this.userCart)
    })
  },

  methods: {

    cardEvent(type, id) {
      this.$emit('cardEvent', type, id)

      // switch (type) {
      //   case 'byAuthor':
      //     this.$emit('byAuthor', id, 'author')
      //   break;
      //   case 'byGenre':
      //     this.$emit('byGenre', id)
      //   break;
      //   case 'toCart':
      //     this.$emit('toCart', id)
      //   break;
      // }
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
