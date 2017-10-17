<template>
  <!-- <div class="col-md-3 card card_section" style="width: 20rem; margin-bottom: 30px; margin-left: 20px;"> -->


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
        <p class="card-text" v-if="book.percent != '0'"><strong>Discount:</strong>  {{ book.percent }}%</p>
        <p class="card-text"><strong>Pubyear:</strong>  {{ book.pubyear }}</p>
        <p class="card-text"><strong>Price:</strong>  {{ book.price }} <strong>₴</strong></p>
        <button class="btn btn-primary" :disabled="!user.access">To cart</button>
      </div>
    </div>

    <!-- <router-link :to="'/book/' + book.id">
      <img class="card-img-top"  src="https://i.ytimg.com/vi/RuLhzVySrns/hqdefault.jpg" :alt="book.booksName" />
    </router-link>
    <div class="card-body">
      <p class="card-text">{{ book.name }} - <strong>{{ book.price }}</strong></p>
    </div>
    
  </div> -->
</template>

<script>
export default {
  name: 'card_section',
  data () {
    return {
    }
  },

  props: ["book", "user"],

  created() {
    // for (var key in this.book.genres) {
    //       this.genres.push('<a href="">' + this.book.genres[key].genresName + '</a>')
    // }
    // this.genres = this.genres.join(', ')

    // for (var key in this.book.authors) {
    //       this.authors.push(this.book.authors[key].authorsName)
    // }
    // this.authors = this.authors.join(', ')
    // console.log(this.genres)
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
    }
  }
}
</script>
