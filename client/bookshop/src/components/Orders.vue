<template>
  <div class="row justify-content-md-center">
    <div class="row col-md-8">
      <div class="col-md-12">
        <table class="table table-striped font-weight-bold">
          <thead class="thead-inverse">
            <tr>
              <th>№</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Discount</th>
              <th>Peyment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody v-for="(order, key) in userOrders" :key="key">
            <tr>
              <td>{{ order.id }}</td>
              <td>{{ timeToDate(order.time) }}</td>
              <td>{{ order.orderTotalPrice }}</td>
              <td>{{ order.clientDiscount }}%</td>
              <td>{{ order.paymentName }}</td>
              <td>{{ order.statusName }}</td>
            </tr>
            <tr>
              <td colspan="6">
                <table class="table table-striped font-weight-bold">
                  <thead class="thead-inverse">
                    <tr>
                      <th>Name</th>
                      <th>Discount</th>
                      <th>Count</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(book, key) in order.books" :key="key">
                      <td>{{ book.booksName }}</td>
                      <td>{{ book.bookDiscount }}%</td>
                      <td>{{ book.count }}</td>
                      <td>{{ book.bookTotalPrice }}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- <table class="table table-striped font-weight-bold">
          <thead class="thead-inverse">
            <tr>
              <th>Name</th>
              <th>Discount</th>
              <th>Count</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, key) in userOrders.books" :key="key">
              <td>{{ book.booksName }}</td>
              <td>{{ book.bookDiscount }}</td>
              <td>{{ book.bookTotalPrice }}</td>
              <td>{{ book.count }}%</td>
            </tr>
          </tbody>
        </table> -->

      </div>
    </div>
  </div>
</template>

<script>
import app from '../../static/config'

export default {
  name: 'Orders',
  data () {
    return {
      URL: app.config.URL,
      userOrders: []
    }
  },

  props: ["user"],

  computed: {

  },

  created() {
    if (!this.user.access) location.href = "/#/"

    fetch(this.URL + 'client/api/user/orders/' + this.user.hash, {method: 'GET'})
    .then(this.status)
    .then(this.json)
    .then((data) => {
      if (data.server.status == 200) {
        this.userOrders = data.data
      }
      else {
        let error = 'Error in logIn()'+
                    '\nStatus: ' + data.server.status +
                    '\nError code: ' + data.server.code +
                    '\nInfo: ' + data.server.information
        alert(error)
      }
    })
  },

  methods: {
    timeToDate(timestamp) {
      var a = new Date(timestamp * 1000)
      var today = new Date()
      var yesterday = new Date(Date.now() - 86400000)
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      var year = a.getFullYear()
      var month = months[a.getMonth()]
      var date = a.getDate()
      var hour = a.getHours()
      if (hour < 10) hour = '0' + hour
      var min = a.getMinutes()
      if (min < 10) min = '0' + min

      if (a.setHours(0,0,0,0) == today.setHours(0,0,0,0))
        return 'today, ' + hour + ':' + min
      else if (a.setHours(0,0,0,0) == yesterday.setHours(0,0,0,0))
        return 'yesterday, ' + hour + ':' + min
      else if (year == today.getFullYear())
        return date + ' ' + month + ', ' + hour + ':' + min
      else
        return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min
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
