<template>
  <div class="row col-md-12 justify-content-md-center">

    <div class="row col-md-4">
      <div class="col-md-12">
        <form>
          <label class="font-weight-bold">Change book: {{ getBookInfo }}</label>
          <div class="form-group">
            <label>Name</label>
            <input v-model="name" type="text" class="form-control" placeholder="Enter book name">
            <small v-if="name == ''" class="form-text text-muted">3 - 100 characters</small>
            <small v-if="!validName & name.length > 0" class="form-text text-danger">Not yet correct ...</small>
            <small v-if="validName" class="form-text text-success">Сorrectly!</small>
          </div>

          <div class="form-group">
            <label>Pubyear</label>
            <input v-model="pubyear" type="text" class="form-control" placeholder="Enter pubyear">
            <small v-if="pubyear == ''" class="form-text text-muted">Only 1-4 numbers</small>
            <small v-if="!validPubyear & pubyear.length > 0" class="form-text text-danger">Not yet correct ...</small>
            <small v-if="validPubyear" class="form-text text-success">Сorrectly!</small>
          </div>

          <div class="form-group">
            <label>Price</label>
            <input v-model="price" type="text" class="form-control" placeholder="Enter price">
            <small v-if="price == ''" class="form-text text-muted">Only 1-10 numbers</small>
            <small v-if="!validPrice & price.length > 0" class="form-text text-danger">Not yet correct ...</small>
            <small v-if="validPrice" class="form-text text-success">Сorrectly!</small>
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea v-model="desc" type="text" class="form-control" placeholder="Enter description"></textarea>
            <small v-if="desc == ''" class="form-text text-muted">Minimum 3 characters</small>
            <small v-if="!validDesc & desc.length > 0" class="form-text text-danger">Not yet correct ...</small>
            <small v-if="validDesc" class="form-text text-success">Сorrectly!</small>
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

          <div class="form-group">
            <label class="float-left font-weight-bold">Select Author(s):</label>
            <select class="form-control" multiple size="5" v-model="authorsId">
              <option v-for="(author, key) in adminData.allAuthors" :key="key" :value="author.id">
                {{ author.authorsName }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="float-left font-weight-bold">Select Genre(s):</label>
            <select class="form-control" multiple size="5" v-model="genresId">
              <option v-for="(genre, key) in adminData.allGenres" :key="key" :value="genre.id">
                {{ genre.genresName }}
              </option>
            </select>
          </div>
        </form>
        <button @click="saveBook()" class="float-right btn btn-dark" :disabled="!validBtnAccess">
          Save
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import app from '../../../../static/config'

export default {
  name: 'EditBook',
  data () {
    return {
      URL: app.config.URL,
      name: '',
      pubyear: '',
      price: '',
      desc: '',
      discountId: 1,
      authorsId: [],
      genresId: [],
      idCheck: '',
    }
  },

  props: ["user", "adminData"],

  computed: {
    getBookInfo() {
      this.name = ''
      let x = this.adminData.allBooks.filter((el) => {
        if(el.id == this.$route.params.id)
          return true
      })

      if (x.length) {
        this.name = x[0].booksName
        this.pubyear = x[0].pubyear
        this.price = x[0].price
        this.desc = x[0].description
        this.discountId = x[0].discountsId

        if (this.idCheck != this.$route.params.id) {
          this.idCheck = this.$route.params.id

          this.authorsId = []
          for (var key in x[0].authors) {
            if (x[0].authors.hasOwnProperty(key)) {
              this.authorsId.push(x[0].authors[key].id)
            }
          }

          this.genresId = []
          for (var key in x[0].genres) {
            if (x[0].genres.hasOwnProperty(key)) {
              this.genresId.push(x[0].genres[key].id)
            }
          }
        }

        return x[0].booksName
      }

      this.$router.push('/admin')
    },

    validBtnAccess() {
      if (this.validName && this.validPubyear && this.validPrice && this.validDesc &&
          this.authorsId.length >= 1 && this.genresId.length >= 1) {
        return true
      }

      return false
    },
    
    validName() {
      if (this.name.length >= 3 && this.name.length <= 100) {
        return true
      }

      return false
    },
    
    validDesc() {
      if (this.desc.length >= 3) {
        return true
      }

      return false
    },

    validPubyear() {
      let x = /^[0-9]+$/i.exec(this.pubyear)

      if (x) {
        if (x && this.pubyear.length >= 1 && this.pubyear.length <= 4)
          return true
      }

      return false
    },

    validPrice() {
      let x = /^[0-9]+$/i.exec(this.price)

      if (x) {
        if (x && this.price.length >= 1 && this.price.length <= 10)
          return true
      }

      return false
    },

  },

  created() {
  },

  methods: {
    saveBook() {
      fetch(this.URL + 'client/api/admin/books/', {
        method: 'PUT',
        headers: {  
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
        },  
        body: 'hash=' + this.user.hash + '&id=' + this.$route.params.id + '&name=' + this.name + '&description=' + this.desc +
              '&pubyear=' + this.pubyear + '&price=' + this.price + '&idDiscount=' + this.discountId +
              '&authorsId=' + this.authorsId.join(',') + '&genresId=' + this.genresId.join(',')
      })
      .then(this.status)
      .then(this.json)
      .then((data) => {
        if (data.server.status == 200) {
          this.adminEvent('Books')
        }
        else {
          let error = 'Error in saveBook()'+
                      '\nStatus: ' + data.server.status +
                      '\nError code: ' + data.server.code +
                      '\nInfo: ' + data.server.information
          alert(error)
        }
      })
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