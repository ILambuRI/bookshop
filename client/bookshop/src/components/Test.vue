<template>
  <div class="row col-12">
    asdasdad
  </div>
</template>

<script>
import app from '../../static/config'

export default {
  name: 'Orders',
  data () {
    return {
      URL: app.config.URL,
    }
  },

  // props: ["user"],

  // components:{
  //   'adduser': addUser
  // },

  computed: {
  },

  created() {
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
