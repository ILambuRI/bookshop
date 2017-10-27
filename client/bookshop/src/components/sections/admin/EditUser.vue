<template>
  <div class="row col-md-12 justify-content-md-center">

    <div class="row col-md-4">
      <div class="col-md-12">
        <label class="font-weight-bold">Change user: {{ getUserInfo }}</label>
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

          <div>
            <span class="d-block bg-secondary col-md-12" style="height: 2px; margin-bottom: 10px; margin-top: 10px;"></span>
          </div>
          <!-- Discount -->
          <div class="custom-controls-stacked">
            <span class="float-left font-weight-bold">Select discount:</span>
            <label v-for="(discount, key) in adminData.allDiscounts" :key="key" class="custom-control custom-radio">
              <input type="radio" class="custom-control-input" :value="discount.id" v-model="discountId">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description font-weight-bold">{{ discount.discountsName }} ({{ discount.percent }}%)</span>
            </label>
          </div>
          <div>
            <span class="d-block bg-secondary col-md-12" style="height: 2px; margin-bottom: 10px; margin-top: 10px;"></span>
          </div>

          <!-- Activation | Deactivation -->
          <div class="custom-controls-stacked">
            <span class="float-left font-weight-bold">Activation & Deactivation:</span>
            <label class="custom-control custom-radio">
              <input type="radio" class="custom-control-input" value="1" v-model="active">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description font-weight-bold">Active</span>
            </label>
            <label class="custom-control custom-radio">
              <input type="radio" class="custom-control-input" value="0" v-model="active">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description font-weight-bold">Blocked</span>
            </label>
          </div>
          <div>
            <span class="d-block bg-secondary col-md-12" style="height: 2px; margin-bottom: 10px; margin-top: 10px;"></span>
          </div>

          <!-- Admin rights -->
          <div class="custom-controls-stacked">
            <span class="float-left font-weight-bold">Activation & Deactivation:</span>
            <label class="custom-control custom-radio">
              <input type="radio" class="custom-control-input" value="1" v-model="admin">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description font-weight-bold">IMPERATOR</span>
            </label>
            <label class="custom-control custom-radio">
              <input type="radio" class="custom-control-input" value="0" v-model="admin">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description font-weight-bold">Human</span>
            </label>
          </div>
          <div>
            <span class="d-block bg-secondary col-md-12" style="height: 2px; margin-bottom: 10px; margin-top: 10px;"></span>
          </div>
        </form>
        
        <button class="float-left btn btn-dark" data-toggle="collapse" data-target="#collapseUserOrders" aria-expanded="false" aria-controls="collapseUserOrders">
          Show orders
        </button>
        <button @click="saveUser()" class="float-right btn btn-dark" :disabled="!validBtnAccess">
          Save
        </button>
      </div>
    </div>
    <p> </p>
    <div class="collapse col-md-10 mt-md-5" id="collapseUserOrders">
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
        <tbody v-for="(order, key) in userOrders" :key="key">
          <tr data-toggle="collapse" :data-target="'#collapseInfoBooks'+order.id" aria-expanded="false" :aria-controls="'collapseInfoBooks'+order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.login }}</td>
            <td>{{ timeToDate(order.time) }}</td>
            <td>{{ order.orderTotalPrice }}</td>
            <td>{{ order.clientDiscount }}%</td>
            <td>{{ order.paymentName }}</td>
            <td>{{ order.statusName }}</td>
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
  name: 'EditUser',
  data () {
    return {
      URL: app.config.URL,
      login: '',
      loginExist: false,
      password: '',
      confirm: '',
      phone: '',
      active: '',
      admin: '',
      discountId: '',
      userOrders: '',
    }
  },

  props: ["user", "adminData"],

  watch: {
    login: function () {
      if (this.validLogin) {
        this.checkLogin()
      }
    }
  },

  computed: {
    getUserInfo() {
      this.login = ''
      let x = this.adminData.allUsers.filter((el) => {
        if(el.id == this.$route.params.id)
          return true
      })

      if (x.length) {
        this.login = x[0].login
        this.active = x[0].active
        this.admin = x[0].admin
        this.phone = x[0].phone
        this.discountId = x[0].discountsId
        this.password = ''
        this.confirm = ''

        this.userOrders = this.adminData.allOrders.filter((el) => {
          if(el.login == x[0].login)
            return true
        })

        return x[0].login
      }

      this.$router.push('/admin')
    },


    validBtnAccess() {
      if (this.validLogin &&
          this.validPassword &&
          this.validPhone &&
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
      if (this.user.access) this.$router.push('/admin')
    }
  },

  methods: {
    saveUser() {
      fetch(this.URL + 'client/api/admin/users/', {
        method: 'PUT',
        headers: {  
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
        }, 
        body: 'login=' + this.login + '&password=' + this.password + '&phone=' + this.phone +
              '&hash=' + this.user.hash + '&id=' + this.$route.params.id + '&idDiscount=' + this.discountId +
              '&admin=' + this.admin + '&active=' + this.active
      })
      .then(this.status)
      .then(this.json)
      .then((data) => {
        if (data.server.status == 200) {
          this.adminEvent('Users')
          this.adminEvent('Orders')
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

    adminEvent(type) {
      this.$emit('adminEvent', type)
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
