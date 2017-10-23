<template>
    <div class="row col-md-8">

      <div class="col-md-12">
        <table class="table table-hover font-weight-bold">
          <thead class="thead-inverse">
            <tr>
              <th>№</th>
              <th>Login</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Discount</th>
              <th>Peyment</th>
              <th>Status</th>
            </tr>
          </thead>
          <!-- Sorry for this -->
          <tbody v-for="(order, key) in adminData.allOrders" :key="key">
            <tr>
              <td data-toggle="collapse" :data-target="'#collapseInfoBooks'+order.id" aria-expanded="false" :aria-controls="'collapseInfoBooks'+order.id">
                {{ order.id }}
              </td>
              <td data-toggle="collapse" :data-target="'#collapseInfoBooks'+order.id" aria-expanded="false" :aria-controls="'collapseInfoBooks'+order.id">
                {{ order.login }}
              </td>
              <td data-toggle="collapse" :data-target="'#collapseInfoBooks'+order.id" aria-expanded="false" :aria-controls="'collapseInfoBooks'+order.id">
                {{ timeToDate(order.time) }}
              </td>
              <td data-toggle="collapse" :data-target="'#collapseInfoBooks'+order.id" aria-expanded="false" :aria-controls="'collapseInfoBooks'+order.id">
                {{ order.orderTotalPrice }}
              </td>
              <td data-toggle="collapse" :data-target="'#collapseInfoBooks'+order.id" aria-expanded="false" :aria-controls="'collapseInfoBooks'+order.id">
                {{ order.clientDiscount }}%
              </td>
              <td data-toggle="collapse" :data-target="'#collapseInfoBooks'+order.id" aria-expanded="false" :aria-controls="'collapseInfoBooks'+order.id">
                {{ order.paymentName }}
              </td>
              <td>
                <span>{{order.statusName}}</span>
                <div class="form-group">
                  <select @change="saveOrderStatus(order.id, order.statusId)" class="form-control" v-model="statusId">
                    <option value=''>Select</option>
                    <option v-for="(status, key) in adminData.allStatus" :key="key" :value="status.id">
                      {{ status.statusName }}
                    </option>
                  </select>
                </div>
              </td>
            </tr>
            <tr class="collapse" :id="'collapseInfoBooks'+order.id">
              <td colspan="7">
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
      </div>

    </div>
</template>

<script>
import app from '../../../../static/config'

export default {
  name: 'AllOrders',
  data () {
    return {
      URL: app.config.URL,
      statusId: ''
    }
  },

  props: ["user", "adminData"],

  computed: {
  },

  created() {
  },

  methods: {
    saveOrderStatus(orderId, statusId) {
      if (+statusId == +this.statusId) {
        this.statusId = ''
        return
      }
      fetch(this.URL + 'client/api/admin/orders/', {
        method: 'PUT',
        headers: {  
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
        },
        body: 'hash=' + this.user.hash + '&idOrder=' + orderId + '&idStatus=' + this.statusId
      })
      .then(this.status)
      .then(this.json)
      .then((data) => {
        if (data.server.status == 200) {
          this.adminEvent('Orders')
        }
        else {
          let error = 'Error in saveOrderStatus()'+
                      '\nStatus: ' + data.server.status +
                      '\nError code: ' + data.server.code +
                      '\nInfo: ' + data.server.information
          alert(error)
        }
      })

      this.statusId = ''
    },

    adminEvent(type) {
      this.$emit('adminEvent', type)
    },

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
