<template>
  <div class="row justify-content-md-center">
    <!-- Table list -->
    <div class="row col-md-10">
      <div class="col-md-8">
        <table class="table table-striped font-weight-bold">
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
            <tr v-for="(book, key) in userСalculatedCart" :key="key">
              <td>{{ book.booksName }}</td>
              <td>{{ book.percent }}%</td>
              <td>{{ book.price }}</td>
              <td>{{ book.discount }}</td>
              <td class="row">
                <button @click="book.count-- & saveCount(book.id, book.count)" class="btn btn-dark" :disabled="book.count <= 1">
                  <i class="fa fa-minus" aria-hidden="true"></i>
                </button>
                <button class="btn btn-light font-weight-bold">{{ book.count }}</button>
                <button @click="book.count++ & saveCount(book.id, book.count)" class="btn btn-dark">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
              </td>
              <td>{{ book.total }}</td>
              <td>
                <label class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" :value="book.id" v-model="deleteId">
                  <span class="custom-control-indicator"></span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Calculator -->
      <div class="col-md-4">
        <div>
          <span class="d-block bg-secondary col-md-12" style="height: 2px; margin-bottom: 10px; margin-top: 10px;"></span>
        </div>
        <div class="clearfix">
          <span class="float-left font-weight-bold">In your Cart:</span>
          <span class="float-right font-weight-bold">{{ getTotal }} ₴</span>
        </div>
        <div class="clearfix">
          <span class="float-left font-weight-bold">Your discount:</span>
          <span class="float-right font-weight-bold">{{ user.percent }}%</span>
        </div>
        <div class="clearfix">
          <span class="float-left font-weight-bold">Proceeds:</span>
          <span class="float-right font-weight-bold">{{ getUserProceeds }} ₴</span>
        </div>
        <p></p>
        <div class="clearfix">
          <h4 class="float-left font-weight-bold">Grand Total:</h4>
          <h4 class="float-right font-weight-bold">
            {{ getGrandTotal }} ₴
          </h4>
        </div>
        <div>
          <span class="d-block bg-secondary col-md-12" style="height: 2px; margin-bottom: 10px; margin-top: 10px;"></span>
        </div>
        <!-- Payment -->
        <div class="custom-controls-stacked">
          <span class="float-left font-weight-bold">Select a Payment Method:</span>
          <label v-for="(payment, key) in payments" :key="key" class="custom-control custom-radio">
            <input type="radio" class="custom-control-input" :value="payment.id" v-model="paymentId">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description font-weight-bold">{{ payment.paymentName }}</span>
          </label>
        </div>
        <div>
          <span class="d-block bg-secondary col-md-12" style="height: 2px; margin-bottom: 10px; margin-top: 10px;"></span>
        </div>
        <div class="clearfix">
          <button @click="deleteBooks()" class="float-left btn btn-dark" :disabled="!deleteId.length">
            Delete
          </button>
          <button @click="saveOrder()" class="float-right btn btn-dark" :disabled="!paymentId">
            Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import app from '../../static/config'

export default {
  name: 'Cart',
  data () {
    return {
      URL: app.config.URL,
      userCart: [],
      deleteId: [],
      totalCart: 0,
      payments: [],
      paymentId: ''
    }
  },

  props: ["user"],

  computed: {
    userСalculatedCart() {
      this.userCart.forEach((element) => {
        element.discount = +element.price * +element.percent / 100
        element.total = +element.price * +element.count

        if (element.percent != 0) {
          element.total -= +element.total * +element.percent / 100
        }
      })

      return this.userCart
    },

    getTotal(){
      var total = 0
      this.userCart.forEach(function(book) {
        var discount = (+book.price * +book.percent) / 100
        total += +(+book.price - discount) * +book.count
      })

      this.totalCart = total.toFixed(2)
      return total
    },

    getUserProceeds() {
      let total = 0
      if (this.user.percent != 0)
        total = this.totalCart * this.user.percent / 100

      return total.toFixed(2)
    },

    getGrandTotal() {
      let total = this.totalCart
      total -= total * this.user.percent / 100
      return total.toFixed(2)
    }
  },

  created() {
    if (!this.user.access) this.$router.push('/')

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
    })

    fetch(this.URL + 'client/api/shop/payment/', {method: 'GET'})
    .then(this.status)
    .then(this.json)
    .then((data) => {
      if (data.server.status == 200) {
        this.payments = data.data
      }
      else {
        let error = 'Error in Cart created()'+
                    '\nStatus: ' + data.server.status +
                    '\nError code: ' + data.server.code +
                    '\nInfo: ' + data.server.information
        alert(error)
      }
    })
  },

  methods: {
    saveCount(id, count) {
      fetch(this.URL + 'client/api/user/cart/', {
        method: 'PUT',
        headers: {  
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
        },  
        body: 'hash=' + this.user.hash + '&id=' + id + '&count=' + count
      })
      .then(this.status)
      .then(this.json)
      .then((data) => {
        if (data.server.status == 200) {
        }
        else {
          let error = 'Error in saveCount()'+
                      '\nStatus: ' + data.server.status +
                      '\nError code: ' + data.server.code +
                      '\nInfo: ' + data.server.information
          alert(error)
        }
      })
    },

    deleteBooks() {
      this.userCart.forEach((element, key) => {
        this.deleteId.forEach((id) => {
          if (element.id == id)
            this.userCart.splice(key, 1)
        })
      })

      this.user.cart.forEach((element, key) => {
        this.deleteId.forEach((id) => {
          if (element == id)
            this.user.cart.splice(key, 1)
        })
      })

      let user = JSON.parse(localStorage['user'])
      user.cart = this.user.cart 
      localStorage['user'] = JSON.stringify(user)

      this.deleteId.forEach((id) => {
        fetch(this.URL + 'client/api/user/cart/' + this.user.hash + '/' + id, {
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
            let error = 'Error in deleteBooks()'+
                        '\nStatus: ' + data.server.status +
                        '\nError code: ' + data.server.code +
                        '\nInfo: ' + data.server.information
            alert(error)
          }
        })
      })

      this.deleteId = []
    },

    saveOrder() {
      this.userCart = []
      this.user.cart = []
      let user = JSON.parse(localStorage['user'])
      user.cart = this.user.cart 
      localStorage['user'] = JSON.stringify(user)

      fetch(this.URL + 'client/api/user/orders/', {
        method: 'POST',
        headers: {  
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
        },  
        body: 'hash=' + this.user.hash + '&id=' + this.paymentId
      })
      .then(this.status)
      .then(this.json)
      .then((data) => {
        if (data.server.status == 200) {
        }
        else {
          let error = 'Error in saveOrder()'+
                      '\nStatus: ' + data.server.status +
                      '\nError code: ' + data.server.code +
                      '\nInfo: ' + data.server.information
          alert(error)
        }
      })

      this.$router.push('/orders')
      location.reload()
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
