webpackJsonp([1],{

/***/ "/98u":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var config = {
    /* WORK */
    URL:'http://192.168.0.15/~user10/MYPHP/bookshop/'

    /* HOME */
    // URL: 'http://bookshop/'
}

/* harmony default export */ __webpack_exports__["a"] = ({
    config
});

/***/ }),

/***/ "/w5R":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__("mvHQ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__static_config__ = __webpack_require__("/98u");


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Cart',
  data: function data() {
    return {
      URL: __WEBPACK_IMPORTED_MODULE_2__static_config__["a" /* default */].config.URL,
      userCart: [],
      deleteId: [],
      totalCart: 0,
      payments: [],
      paymentId: ''
    };
  },


  props: ["user"],

  computed: {
    userСalculatedCart: function userAlculatedCart() {
      this.userCart.forEach(function (element) {
        element.discount = +element.price * +element.percent / 100;
        element.total = +element.price * +element.count;

        if (element.percent != 0) {
          element.total -= +element.total * +element.percent / 100;
        }
      });

      return this.userCart;
    },
    getTotal: function getTotal() {
      var total = 0;
      this.userCart.forEach(function (book) {
        var discount = +book.price * +book.percent / 100;
        total += +(+book.price - discount) * +book.count;
      });

      this.totalCart = total.toFixed(2);
      return total;
    },
    getUserProceeds: function getUserProceeds() {
      var total = 0;
      if (this.user.percent != 0) total = this.totalCart * this.user.percent / 100;

      return total.toFixed(2);
    },
    getGrandTotal: function getGrandTotal() {
      var total = this.totalCart;
      total -= total * this.user.percent / 100;
      return total.toFixed(2);
    }
  },

  created: function created() {
    var _this = this;

    if (!this.user.access) location.href = "/#/";

    fetch(this.URL + 'client/api/user/cart/' + this.user.hash, { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
      if (data.server.status == 200) {
        _this.userCart = data.data;
        _this.userCart.forEach(function (element) {
          element.discount = +element.price * +element.percent / 100;
          element.total = +element.price * +element.count;
          if (element.percent != 0) {
            element.total -= +element.total * +element.percent / 100;
          }
        });
      }
    });

    fetch(this.URL + 'client/api/shop/payment/', { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
      if (data.server.status == 200) {
        _this.payments = data.data;
      } else {
        var error = 'Error in Cart created()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
        alert(error);
      }
    });
  },


  methods: {
    saveCount: function saveCount(id, count) {
      fetch(this.URL + 'client/api/user/cart/', {
        method: 'PUT',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'hash=' + this.user.hash + '&id=' + id + '&count=' + count
      }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {} else {
          var error = 'Error in saveCount()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });
    },
    deleteBooks: function deleteBooks() {
      var _this2 = this;

      this.userCart.forEach(function (element, key) {
        _this2.deleteId.forEach(function (id) {
          if (element.id == id) _this2.userCart.splice(key, 1);
        });
      });

      this.user.cart.forEach(function (element, key) {
        _this2.deleteId.forEach(function (id) {
          if (element == id) _this2.user.cart.splice(key, 1);
        });
      });

      var user = JSON.parse(localStorage['user']);
      user.cart = this.user.cart;
      localStorage['user'] = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(user);

      this.deleteId.forEach(function (id) {
        fetch(_this2.URL + 'client/api/user/cart/' + _this2.user.hash + '/' + id, {
          method: 'DELETE',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        }).then(_this2.status).then(_this2.json).then(function (data) {
          if (data.server.status == 200) {} else {
            var error = 'Error in deleteBooks()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
            alert(error);
          }
        });
      });

      this.deleteId = [];
    },
    saveOrder: function saveOrder() {
      this.userCart = [];
      this.user.cart = [];
      var user = JSON.parse(localStorage['user']);
      user.cart = this.user.cart;
      localStorage['user'] = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(user);

      fetch(this.URL + 'client/api/user/orders/', {
        method: 'POST',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'hash=' + this.user.hash + '&id=' + this.paymentId
      }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {} else {
          var error = 'Error in saveOrder()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });

      location.replace("/#/orders");
      location.reload();
    },
    status: function status(response) {
      if (response.status == 200) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(response);
      } else {
        console.log('ERROR RESPONSE');
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error(response.statusText));
      }
    },
    json: function json(response) {
      return response.json();
    }
  }
});

/***/ }),

/***/ "0mNB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_config__ = __webpack_require__("/98u");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'EditAuthor',
  data: function data() {
    return {
      URL: __WEBPACK_IMPORTED_MODULE_1__static_config__["a" /* default */].config.URL,
      name: '',
      nameCheck: false
    };
  },


  watch: {
    name: function name() {
      var _this = this;

      this.nameCheck = false;
      var x = this.adminData.allAuthors.filter(function (el) {
        if (el.authorsName.toLowerCase() == _this.name.toLowerCase()) return true;
      });

      if (x && x.length) {
        this.nameCheck = true;
      }
    }
  },

  props: ["user", "adminData"],

  computed: {
    getAuthorName: function getAuthorName() {
      var _this2 = this;

      this.name = '';
      var x = this.adminData.allAuthors.filter(function (el) {
        if (el.id == _this2.$route.params.id) return true;
      });

      if (x.length) {
        this.name = x[0].authorsName;
        return x[0].authorsName;
      }

      location.href = '/#/admin';
    },
    validBtnAccess: function validBtnAccess() {
      if (this.validName && !this.nameCheck) {
        return true;
      }

      return false;
    },
    validName: function validName() {
      var x = /^[a-z]+(\s{1}[a-z]+)?$/i.exec(this.name);

      if (x && this.name.length >= 3 && this.name.length <= 20) {
        return true;
      }

      return false;
    }
  },

  created: function created() {},


  methods: {
    saveAuthor: function saveAuthor() {
      var _this3 = this;

      fetch(this.URL + 'client/api/admin/authors/', {
        method: 'PUT',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'hash=' + this.user.hash + '&id=' + this.$route.params.id + '&name=' + this.name
      }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          _this3.adminEvent('Authors');
        } else {
          var error = 'Error in saveAuthor()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });

      this.nameCheck = true;
    },
    deleteAuthor: function deleteAuthor() {
      var _this4 = this;

      fetch(this.URL + 'client/api/admin/authors/' + this.user.hash + '/' + this.$route.params.id, {
        method: 'DELETE',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          _this4.adminEvent('Authors');
          location.href = "/#/admin";
        } else {
          var error = 'Error in deleteAuthor()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });
    },
    adminEvent: function adminEvent(type) {
      this.$emit('adminEvent', type);
    },
    status: function status(response) {
      if (response.status == 200) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(response);
      } else {
        console.log('ERROR RESPONSE');
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error(response.statusText));
      }
    },
    json: function json(response) {
      return response.json();
    }
  }
});

/***/ }),

/***/ "1bg9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NewGenre_vue__ = __webpack_require__("5Y67");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cb195970_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NewGenre_vue__ = __webpack_require__("mk43");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NewGenre_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cb195970_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NewGenre_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "2Hqv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_config__ = __webpack_require__("/98u");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'EditBook',
  data: function data() {
    return {
      URL: __WEBPACK_IMPORTED_MODULE_1__static_config__["a" /* default */].config.URL,
      name: '',
      pubyear: '',
      price: '',
      desc: '',
      discountId: 1,
      authorsId: [],
      genresId: [],
      idCheck: ''
    };
  },


  props: ["user", "adminData"],

  computed: {
    getBookInfo: function getBookInfo() {
      var _this = this;

      this.name = '';
      var x = this.adminData.allBooks.filter(function (el) {
        if (el.id == _this.$route.params.id) return true;
      });

      if (x.length) {
        this.name = x[0].booksName;
        this.pubyear = x[0].pubyear;
        this.price = x[0].price;
        this.desc = x[0].description;
        this.discountId = x[0].discountsId;

        if (this.idCheck != this.$route.params.id) {
          this.idCheck = this.$route.params.id;

          this.authorsId = [];
          for (var key in x[0].authors) {
            if (x[0].authors.hasOwnProperty(key)) {
              this.authorsId.push(x[0].authors[key].id);
            }
          }

          this.genresId = [];
          for (var key in x[0].genres) {
            if (x[0].genres.hasOwnProperty(key)) {
              this.genresId.push(x[0].genres[key].id);
            }
          }
        }

        return x[0].booksName;
      }

      location.href = '/#/admin';
    },
    validBtnAccess: function validBtnAccess() {
      if (this.validName && this.validPubyear && this.validPrice && this.validDesc && this.authorsId.length >= 1 && this.genresId.length >= 1) {
        return true;
      }

      return false;
    },
    validName: function validName() {
      if (this.name.length >= 3 && this.name.length <= 100) {
        return true;
      }

      return false;
    },
    validDesc: function validDesc() {
      if (this.desc.length >= 3) {
        return true;
      }

      return false;
    },
    validPubyear: function validPubyear() {
      var x = /^[0-9]+$/i.exec(this.pubyear);

      if (x) {
        if (x && this.pubyear.length >= 1 && this.pubyear.length <= 4) return true;
      }

      return false;
    },
    validPrice: function validPrice() {
      var x = /^[0-9]+$/i.exec(this.price);

      if (x) {
        if (x && this.price.length >= 1 && this.price.length <= 10) return true;
      }

      return false;
    }
  },

  created: function created() {},


  methods: {
    saveBook: function saveBook() {
      var _this2 = this;

      fetch(this.URL + 'client/api/admin/books/', {
        method: 'PUT',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'hash=' + this.user.hash + '&id=' + this.$route.params.id + '&name=' + this.name + '&description=' + this.desc + '&pubyear=' + this.pubyear + '&price=' + this.price + '&idDiscount=' + this.discountId + '&authorsId=' + this.authorsId.join(',') + '&genresId=' + this.genresId.join(',')
      }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          _this2.adminEvent('Books');
        } else {
          var error = 'Error in saveBook()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });
    },
    adminEvent: function adminEvent(type) {
      this.$emit('adminEvent', type);
    },
    status: function status(response) {
      if (response.status == 200) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(response);
      } else {
        console.log('ERROR RESPONSE');
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error(response.statusText));
      }
    },
    json: function json(response) {
      return response.json();
    }
  }
});

/***/ }),

/***/ "2suK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_config__ = __webpack_require__("/98u");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Orders',
  data: function data() {
    return {
      URL: __WEBPACK_IMPORTED_MODULE_1__static_config__["a" /* default */].config.URL,
      userOrders: []
    };
  },


  props: ["user"],

  computed: {},

  created: function created() {
    var _this = this;

    if (!this.user.access) location.href = "/#/";

    fetch(this.URL + 'client/api/user/orders/' + this.user.hash, { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
      if (data.server.status == 200) {
        _this.userOrders = data.data;
      }
    });
  },


  methods: {
    timeToDate: function timeToDate(timestamp) {
      var a = new Date(timestamp * 1000);
      var today = new Date();
      var yesterday = new Date(Date.now() - 86400000);
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      if (hour < 10) hour = '0' + hour;
      var min = a.getMinutes();
      if (min < 10) min = '0' + min;

      if (a.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) return 'today, ' + hour + ':' + min;else if (a.setHours(0, 0, 0, 0) == yesterday.setHours(0, 0, 0, 0)) return 'yesterday, ' + hour + ':' + min;else if (year == today.getFullYear()) return date + ' ' + month + ', ' + hour + ':' + min;else return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
    },
    status: function status(response) {
      if (response.status == 200) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(response);
      } else {
        console.log('ERROR RESPONSE');
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error(response.statusText));
      }
    },
    json: function json(response) {
      return response.json();
    }
  }
});

/***/ }),

/***/ "4jld":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_config__ = __webpack_require__("/98u");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Registration',
  data: function data() {
    return {
      URL: __WEBPACK_IMPORTED_MODULE_1__static_config__["a" /* default */].config.URL,
      login: '',
      loginExist: false,
      password: '',
      confirm: '',
      phone: ''
    };
  },


  props: ["user"],

  watch: {
    login: function login() {
      if (this.validLogin) {
        this.checkLogin();
      }
    }
  },

  computed: {
    validBtnAccess: function validBtnAccess() {
      if (this.validLogin && this.validPassword && this.validPhone && !this.loginExist && this.password == this.confirm) {

        return true;
      }

      return false;
    },
    validLogin: function validLogin() {
      var x = /^[a-z]+[0-9a-z]*$/i.exec(this.login);

      if (x && this.login.length >= 3 && this.login.length <= 20) {
        return true;
      }

      return false;
    },
    validPassword: function validPassword() {
      var x = /^[a-z0-9]+$/i.exec(this.password);

      if (x) {
        if (x && this.password.length >= 5 && this.password.length <= 32) return true;
      }

      return false;
    },
    validPhone: function validPhone() {
      var x = /^[0-9]+$/i.exec(this.phone);

      if (x) {
        if (x && this.phone.length >= 6 && this.phone.length <= 20) return true;
      }

      return false;
    }
  },

  created: function created() {
    if (this.user.admin == 0) {
      if (this.user.access) location.href = "/#/";
    }
  },


  methods: {
    saveUser: function saveUser() {
      var _this = this;

      fetch(this.URL + 'client/api/user/users/', {
        method: 'POST',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'login=' + this.login + '&password=' + this.password + '&phone=' + this.phone
      }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          if (_this.user.admin == 0) {
            location.href = "/#/";
          } else {
            location.reload();
          }
        } else {
          var error = 'Error in saveUser()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });
    },
    checkLogin: function checkLogin() {
      var _this2 = this;

      fetch(this.URL + 'client/api/user/users/' + this.login, { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          _this2.loginExist = true;
        } else {
          _this2.loginExist = false;
        }
      });
    },
    status: function status(response) {
      if (response.status == 200) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(response);
      } else {
        console.log('ERROR RESPONSE');
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error(response.statusText));
      }
    },
    json: function json(response) {
      return response.json();
    }
  }
});

/***/ }),

/***/ "5Y67":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_config__ = __webpack_require__("/98u");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'NewGenre',
  data: function data() {
    return {
      URL: __WEBPACK_IMPORTED_MODULE_1__static_config__["a" /* default */].config.URL,
      name: '',
      nameCheck: false
    };
  },


  watch: {
    name: function name() {
      var _this = this;

      this.nameCheck = false;
      var x = this.adminData.allGenres.filter(function (el) {
        if (el.genresName.toLowerCase() == _this.name.toLowerCase()) return true;
      });

      if (x && x.length) {
        this.nameCheck = true;
      }
    }
  },

  props: ["user", "adminData"],

  computed: {
    validBtnAccess: function validBtnAccess() {
      if (this.validName && !this.nameCheck) {
        return true;
      }

      return false;
    },
    validName: function validName() {
      var x = /^[a-z]+(\s{1}[a-z]+)?$/i.exec(this.name);

      if (x && this.name.length >= 3 && this.name.length <= 20) {
        return true;
      }

      return false;
    }
  },

  created: function created() {},


  methods: {
    saveGenre: function saveGenre() {
      var _this2 = this;

      fetch(this.URL + 'client/api/admin/genres/', {
        method: 'POST',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'hash=' + this.user.hash + '&name=' + this.name
      }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          _this2.adminEvent('Genres');
        } else {
          var error = 'Error in saveGenre()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });

      this.name = '';
    },
    adminEvent: function adminEvent(type) {
      this.$emit('adminEvent', type);
    },
    status: function status(response) {
      if (response.status == 200) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(response);
      } else {
        console.log('ERROR RESPONSE');
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error(response.statusText));
      }
    },
    json: function json(response) {
      return response.json();
    }
  }
});

/***/ }),

/***/ "6ATg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row col-md-12 justify-content-md-center"},[_c('div',{staticClass:"row col-md-4"},[_c('div',{staticClass:"col-md-12"},[_c('form',[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"font-weight-bold"},[_vm._v("Change genre: "+_vm._s(_vm.getGenreName))]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.name),expression:"name"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter new name"},domProps:{"value":(_vm.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.name=$event.target.value}}}),_vm._v(" "),(_vm.name == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Only latin (3 - 20 characters) ...")]):_vm._e(),_vm._v(" "),(!_vm.validName & _vm.name.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validName & _vm.nameCheck)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("This genre already exists, please enter another!")]):_vm._e(),_vm._v(" "),(_vm.validName & !_vm.nameCheck)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()])]),_vm._v(" "),_c('button',{staticClass:"float-left btn btn-dark",on:{"click":function($event){_vm.deleteGenre()}}},[_vm._v("\n        Delete\n      ")]),_vm._v(" "),_c('button',{staticClass:"float-right btn btn-dark",attrs:{"disabled":!_vm.validBtnAccess},on:{"click":function($event){_vm.saveGenre()}}},[_vm._v("\n        Save\n      ")])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "7/vh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AllOrders_vue__ = __webpack_require__("BQp7");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_270aba9e_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AllOrders_vue__ = __webpack_require__("d8op");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AllOrders_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_270aba9e_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AllOrders_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "8c+5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditBook_vue__ = __webpack_require__("2Hqv");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_70a63f98_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditBook_vue__ = __webpack_require__("DN7o");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditBook_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_70a63f98_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditBook_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "A0w9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_OneBookCard_vue__ = __webpack_require__("UjKB");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_710064aa_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_OneBookCard_vue__ = __webpack_require__("BxcX");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_OneBookCard_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_710064aa_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_OneBookCard_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "BQp7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_config__ = __webpack_require__("/98u");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'AllOrders',
  data: function data() {
    return {
      URL: __WEBPACK_IMPORTED_MODULE_1__static_config__["a" /* default */].config.URL,
      statusId: ''
    };
  },


  props: ["user", "adminData"],

  computed: {},

  created: function created() {},


  methods: {
    saveOrderStatus: function saveOrderStatus(orderId, statusId) {
      var _this = this;

      if (+statusId == +this.statusId) {
        this.statusId = '';
        return;
      }
      fetch(this.URL + 'client/api/admin/orders/', {
        method: 'PUT',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'hash=' + this.user.hash + '&idOrder=' + orderId + '&idStatus=' + this.statusId
      }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          _this.adminEvent('Orders');
        } else {
          var error = 'Error in saveOrderStatus()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });

      this.statusId = '';
    },
    adminEvent: function adminEvent(type) {
      this.$emit('adminEvent', type);
    },
    timeToDate: function timeToDate(timestamp) {
      var a = new Date(timestamp * 1000);
      var today = new Date();
      var yesterday = new Date(Date.now() - 86400000);
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      if (hour < 10) hour = '0' + hour;
      var min = a.getMinutes();
      if (min < 10) min = '0' + min;

      if (a.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) return 'today, ' + hour + ':' + min;else if (a.setHours(0, 0, 0, 0) == yesterday.setHours(0, 0, 0, 0)) return 'yesterday, ' + hour + ':' + min;else if (year == today.getFullYear()) return date + ' ' + month + ', ' + hour + ':' + min;else return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
    },
    status: function status(response) {
      if (response.status == 200) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(response);
      } else {
        console.log('ERROR RESPONSE');
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error(response.statusText));
      }
    },
    json: function json(response) {
      return response.json();
    }
  }
});

/***/ }),

/***/ "BRWk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_config__ = __webpack_require__("/98u");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'EditUser',
  data: function data() {
    return {
      URL: __WEBPACK_IMPORTED_MODULE_1__static_config__["a" /* default */].config.URL,
      login: '',
      loginExist: false,
      password: '',
      confirm: '',
      phone: '',
      active: '',
      admin: '',
      discountId: '',
      userOrders: ''
    };
  },


  props: ["user", "adminData"],

  watch: {
    login: function login() {
      if (this.validLogin) {
        this.checkLogin();
      }
    }
  },

  computed: {
    getUserInfo: function getUserInfo() {
      var _this = this;

      this.login = '';
      var x = this.adminData.allUsers.filter(function (el) {
        if (el.id == _this.$route.params.id) return true;
      });

      if (x.length) {
        this.login = x[0].login;
        this.active = x[0].active;
        this.admin = x[0].admin;
        this.phone = x[0].phone;
        this.discountId = x[0].discountsId;
        this.password = '';
        this.confirm = '';

        this.userOrders = this.adminData.allOrders.filter(function (el) {
          if (el.login == x[0].login) return true;
        });

        return x[0].login;
      }

      location.href = '/#/admin';
    },
    validBtnAccess: function validBtnAccess() {
      if (this.validLogin && this.validPassword && this.validPhone && this.password == this.confirm) {

        return true;
      }

      return false;
    },
    validLogin: function validLogin() {
      var x = /^[a-z]+[0-9a-z]*$/i.exec(this.login);

      if (x && this.login.length >= 3 && this.login.length <= 20) {
        return true;
      }

      return false;
    },
    validPassword: function validPassword() {
      var x = /^[a-z0-9]+$/i.exec(this.password);

      if (x) {
        if (x && this.password.length >= 5 && this.password.length <= 32) return true;
      }

      return false;
    },
    validPhone: function validPhone() {
      var x = /^[0-9]+$/i.exec(this.phone);

      if (x) {
        if (x && this.phone.length >= 6 && this.phone.length <= 20) return true;
      }

      return false;
    }
  },

  created: function created() {
    if (this.user.admin == 0) {
      if (this.user.access) location.href = "/#/";
    }
  },


  methods: {
    saveUser: function saveUser() {
      var _this2 = this;

      fetch(this.URL + 'client/api/admin/users/', {
        method: 'PUT',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'login=' + this.login + '&password=' + this.password + '&phone=' + this.phone + '&hash=' + this.user.hash + '&id=' + this.$route.params.id + '&idDiscount=' + this.discountId + '&admin=' + this.admin + '&active=' + this.active
      }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          _this2.adminEvent('Users');
          _this2.adminEvent('Orders');
        } else {
          var error = 'Error in saveUser()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });
    },
    checkLogin: function checkLogin() {
      var _this3 = this;

      fetch(this.URL + 'client/api/user/users/' + this.login, { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          _this3.loginExist = true;
        } else {
          _this3.loginExist = false;
        }
      });
    },
    timeToDate: function timeToDate(timestamp) {
      var a = new Date(timestamp * 1000);
      var today = new Date();
      var yesterday = new Date(Date.now() - 86400000);
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      if (hour < 10) hour = '0' + hour;
      var min = a.getMinutes();
      if (min < 10) min = '0' + min;

      if (a.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) return 'today, ' + hour + ':' + min;else if (a.setHours(0, 0, 0, 0) == yesterday.setHours(0, 0, 0, 0)) return 'yesterday, ' + hour + ':' + min;else if (year == today.getFullYear()) return date + ' ' + month + ', ' + hour + ':' + min;else return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
    },
    adminEvent: function adminEvent(type) {
      this.$emit('adminEvent', type);
    },
    status: function status(response) {
      if (response.status == 200) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(response);
      } else {
        console.log('ERROR RESPONSE');
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error(response.statusText));
      }
    },
    json: function json(response) {
      return response.json();
    }
  }
});

/***/ }),

/***/ "BxcX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card col-md-3",staticStyle:{"width":"20rem","margin-bottom":"30px","margin-left":"30px"}},[_c('img',{staticClass:"card-img-top",attrs:{"src":"https://image.jimcdn.com/app/cms/image/transf/dimension=270x1024:format=jpg/path/s031157332e8c77b3/image/i9b56b68841ba013e/version/1298320698/image.jpg","alt":_vm.book.booksName}}),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('h4',{staticClass:"card-title text-center"},[_vm._v(_vm._s(_vm.book.booksName))]),_vm._v(" "),_c('p',{staticClass:"card-text"},[_vm._v(_vm._s(_vm.book.description))]),_vm._v(" "),_c('p',{staticClass:"card-text"},[_c('strong',[_vm._v("Author(s):")]),_vm._v(" "),_vm._l((_vm.book.authors),function(author,key){return _c('a',{key:key,staticClass:"badge badge-pill badge-light",attrs:{"href":"#"},on:{"click":function($event){_vm.cardEvent('byAuthor', author.id)}}},[_vm._v("\n        "+_vm._s(author.authorsName)+"\n      ")])})],2),_vm._v(" "),_c('p',{staticClass:"card-text"},[_c('strong',[_vm._v("Genre(s):")]),_vm._v(" "),_vm._l((_vm.book.genres),function(genre,key){return _c('a',{key:key,staticClass:"badge badge-pill badge-light",attrs:{"href":"#"},on:{"click":function($event){_vm.cardEvent('byGenre', genre.id)}}},[_vm._v("\n        "+_vm._s(genre.genresName)+"\n      ")])})],2),_vm._v(" "),(_vm.book.percent != '0')?_c('p',{staticClass:"card-text"},[_c('strong',[_vm._v("Discount:")]),_vm._v(" "+_vm._s(_vm.book.discountsName)+" ("+_vm._s(_vm.book.percent)+"%)")]):_vm._e(),_vm._v(" "),_c('p',{staticClass:"card-text"},[_c('strong',[_vm._v("Pubyear:")]),_vm._v("  "+_vm._s(_vm.book.pubyear))]),_vm._v(" "),(_vm.book.percent == '0')?_c('p',{staticClass:"card-text"},[_c('strong',[_vm._v("Price:")]),_vm._v("  "+_vm._s(_vm.book.price)+" "),_c('strong',[_vm._v("₴")])]):_vm._e(),_vm._v(" "),(_vm.book.percent != '0')?_c('p',{staticClass:"card-text"},[_c('strong',[_vm._v("Price:")]),_vm._v(" "),_c('del',[_vm._v(_vm._s(_vm.book.price))]),_vm._v("  "+_vm._s(_vm.book.price - (_vm.book.price * _vm.book.percent / 100))+" "),_c('strong',[_vm._v("₴")])]):_vm._e(),_vm._v(" "),(_vm.btnToCartAccess)?_c('div',[_c('button',{staticClass:"btn btn-outline-dark",attrs:{"disabled":!_vm.user.access},on:{"click":function($event){_vm.toCart()}}},[_c('i',{staticClass:"fa fa-cart-plus",staticStyle:{"font-size":"30px"},attrs:{"aria-hidden":"true"}})]),_vm._v(" "),_c('button',{staticClass:"btn btn-dark",attrs:{"disabled":_vm.count <= 1},on:{"click":function($event){_vm.count--}}},[_c('i',{staticClass:"fa fa-minus",attrs:{"aria-hidden":"true"}})]),_vm._v(" "),_c('button',{staticClass:"btn btn-light font-weight-bold",attrs:{"type":"button"}},[_vm._v(_vm._s(_vm.count))]),_vm._v(" "),_c('button',{staticClass:"btn btn-dark",on:{"click":function($event){_vm.count++}}},[_c('i',{staticClass:"fa fa-plus",attrs:{"aria-hidden":"true"}})])]):_vm._e(),_vm._v(" "),(!_vm.btnToCartAccess)?_c('button',{staticClass:"btn btn-outline-dark",attrs:{"type":"button","disabled":""}},[_c('i',{staticClass:"fa fa-cart-arrow-down",staticStyle:{"font-size":"30px"},attrs:{"aria-hidden":"true"}})]):_vm._e()])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "DN7o":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row col-md-12 justify-content-md-center"},[_c('div',{staticClass:"row col-md-4"},[_c('div',{staticClass:"col-md-12"},[_c('form',[_c('label',{staticClass:"font-weight-bold"},[_vm._v("Change book: "+_vm._s(_vm.getBookInfo))]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Name")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.name),expression:"name"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter book name"},domProps:{"value":(_vm.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.name=$event.target.value}}}),_vm._v(" "),(_vm.name == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("3 - 100 characters")]):_vm._e(),_vm._v(" "),(!_vm.validName & _vm.name.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validName)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Pubyear")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pubyear),expression:"pubyear"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter pubyear"},domProps:{"value":(_vm.pubyear)},on:{"input":function($event){if($event.target.composing){ return; }_vm.pubyear=$event.target.value}}}),_vm._v(" "),(_vm.pubyear == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Only 1-4 numbers")]):_vm._e(),_vm._v(" "),(!_vm.validPubyear & _vm.pubyear.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validPubyear)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Price")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.price),expression:"price"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter price"},domProps:{"value":(_vm.price)},on:{"input":function($event){if($event.target.composing){ return; }_vm.price=$event.target.value}}}),_vm._v(" "),(_vm.price == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Only 1-10 numbers")]):_vm._e(),_vm._v(" "),(!_vm.validPrice & _vm.price.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validPrice)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Description")]),_vm._v(" "),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.desc),expression:"desc"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter description"},domProps:{"value":(_vm.desc)},on:{"input":function($event){if($event.target.composing){ return; }_vm.desc=$event.target.value}}}),_vm._v(" "),(_vm.desc == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Minimum 3 characters")]):_vm._e(),_vm._v(" "),(!_vm.validDesc & _vm.desc.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validDesc)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{staticClass:"custom-controls-stacked"},[_c('span',{staticClass:"float-left font-weight-bold"},[_vm._v("Select discount:")]),_vm._v(" "),_vm._l((this.adminData.allDiscounts),function(discount,key){return _c('label',{key:key,staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.discountId),expression:"discountId"}],staticClass:"custom-control-input",attrs:{"type":"radio"},domProps:{"value":discount.id,"checked":_vm._q(_vm.discountId,discount.id)},on:{"change":function($event){_vm.discountId=discount.id}}}),_vm._v(" "),_c('span',{staticClass:"custom-control-indicator"}),_vm._v(" "),_c('span',{staticClass:"custom-control-description font-weight-bold"},[_vm._v(_vm._s(discount.discountsName)+" ("+_vm._s(discount.percent)+"%)")])])})],2),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"float-left font-weight-bold"},[_vm._v("Select Author(s):")]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.authorsId),expression:"authorsId"}],staticClass:"form-control",attrs:{"multiple":"","size":"5"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.authorsId=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((this.adminData.allAuthors),function(author,key){return _c('option',{key:key,domProps:{"value":author.id}},[_vm._v("\n              "+_vm._s(author.authorsName)+"\n            ")])}))]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"float-left font-weight-bold"},[_vm._v("Select Genre(s):")]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.genresId),expression:"genresId"}],staticClass:"form-control",attrs:{"multiple":"","size":"5"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.genresId=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((this.adminData.allGenres),function(genre,key){return _c('option',{key:key,domProps:{"value":genre.id}},[_vm._v("\n              "+_vm._s(genre.genresName)+"\n            ")])}))])]),_vm._v(" "),_c('button',{staticClass:"float-right btn btn-dark",attrs:{"disabled":!_vm.validBtnAccess},on:{"click":function($event){_vm.saveBook()}}},[_vm._v("\n        Save\n      ")])])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',{staticClass:"d-block bg-secondary col-md-12",staticStyle:{"height":"2px","margin-bottom":"10px","margin-top":"10px"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',{staticClass:"d-block bg-secondary col-md-12",staticStyle:{"height":"2px","margin-bottom":"10px","margin-top":"10px"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "EJtX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Orders_vue__ = __webpack_require__("2suK");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4a8b1b91_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Orders_vue__ = __webpack_require__("hnMZ");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Orders_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4a8b1b91_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Orders_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "FC4X":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_config__ = __webpack_require__("/98u");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'EditGenre',
  data: function data() {
    return {
      URL: __WEBPACK_IMPORTED_MODULE_1__static_config__["a" /* default */].config.URL,
      name: '',
      nameCheck: false
    };
  },


  watch: {
    name: function name() {
      var _this = this;

      this.nameCheck = false;
      var x = this.adminData.allGenres.filter(function (el) {
        if (el.genresName.toLowerCase() == _this.name.toLowerCase()) return true;
      });

      if (x && x.length) {
        this.nameCheck = true;
      }
    }
  },

  props: ["user", "adminData"],

  computed: {
    getGenreName: function getGenreName() {
      var _this2 = this;

      this.name = '';
      var x = this.adminData.allGenres.filter(function (el) {
        if (el.id == _this2.$route.params.id) return true;
      });

      if (x.length) {
        this.name = x[0].genresName;
        return x[0].genresName;
      }

      location.href = '/#/admin';
    },
    validBtnAccess: function validBtnAccess() {
      if (this.validName && !this.nameCheck) {
        return true;
      }

      return false;
    },
    validName: function validName() {
      var x = /^[a-z]+(\s{1}[a-z]+)?$/i.exec(this.name);

      if (x && this.name.length >= 3 && this.name.length <= 20) {
        return true;
      }

      return false;
    }
  },

  created: function created() {},


  methods: {
    saveGenre: function saveGenre() {
      var _this3 = this;

      fetch(this.URL + 'client/api/admin/genres/', {
        method: 'PUT',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'hash=' + this.user.hash + '&id=' + this.$route.params.id + '&name=' + this.name
      }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          _this3.adminEvent('Genres');
        } else {
          var error = 'Error in saveGenre()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });

      this.nameCheck = true;
    },
    deleteGenre: function deleteGenre() {
      var _this4 = this;

      fetch(this.URL + 'client/api/admin/genres/' + this.user.hash + '/' + this.$route.params.id, {
        method: 'DELETE',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          _this4.adminEvent('Genres');
          location.href = "/#/admin";
        } else {
          var error = 'Error in deleteGenre()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });
    },
    adminEvent: function adminEvent(type) {
      this.$emit('adminEvent', type);
    },
    status: function status(response) {
      if (response.status == 200) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(response);
      } else {
        console.log('ERROR RESPONSE');
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error(response.statusText));
      }
    },
    json: function json(response) {
      return response.json();
    }
  }
});

/***/ }),

/***/ "G9tn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditGenre_vue__ = __webpack_require__("FC4X");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_549e26e4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditGenre_vue__ = __webpack_require__("6ATg");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditGenre_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_549e26e4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditGenre_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "GY9B":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row col-md-12 justify-content-md-center"},[_c('div',{staticClass:"row col-md-4"},[_c('div',{staticClass:"col-md-12"},[_c('label',{staticClass:"font-weight-bold"},[_vm._v("Change user: "+_vm._s(_vm.getUserInfo))]),_vm._v(" "),_c('form',[_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Login")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.login),expression:"login",modifiers:{"trim":true}}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Login"},domProps:{"value":(_vm.login)},on:{"input":function($event){if($event.target.composing){ return; }_vm.login=$event.target.value.trim()},"blur":function($event){_vm.$forceUpdate()}}}),_vm._v(" "),(_vm.login == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Start whith latin, remain are numbers and latin (3 - 20 characters) ...")]):_vm._e(),_vm._v(" "),(!_vm.validLogin & _vm.login.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validLogin & _vm.loginExist)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Login is already taken, please enter another!")]):_vm._e(),_vm._v(" "),(_vm.validLogin & !_vm.loginExist)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Password")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.password),expression:"password",modifiers:{"trim":true}}],staticClass:"form-control",attrs:{"type":"password","placeholder":"Password"},domProps:{"value":(_vm.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value.trim()},"blur":function($event){_vm.$forceUpdate()}}}),_vm._v(" "),(_vm.password == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Only latin and numbers (5 - 32 characters) ...")]):_vm._e(),_vm._v(" "),(!_vm.validPassword & _vm.password.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validPassword)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Confirm password")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.confirm),expression:"confirm",modifiers:{"trim":true}}],staticClass:"form-control",attrs:{"type":"password","placeholder":"Confirm the password"},domProps:{"value":(_vm.confirm)},on:{"input":function($event){if($event.target.composing){ return; }_vm.confirm=$event.target.value.trim()},"blur":function($event){_vm.$forceUpdate()}}}),_vm._v(" "),(_vm.confirm == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Confirm the password")]):_vm._e(),_vm._v(" "),(_vm.password != _vm.confirm & _vm.confirm != '')?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.password == _vm.confirm & _vm.validPassword)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Phone")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.phone),expression:"phone",modifiers:{"trim":true}}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Phone"},domProps:{"value":(_vm.phone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.phone=$event.target.value.trim()},"blur":function($event){_vm.$forceUpdate()}}}),_vm._v(" "),(_vm.phone == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Only numbers (6 - 20 characters) ...")]):_vm._e(),_vm._v(" "),(!_vm.validPhone & _vm.phone.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validPhone)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{staticClass:"custom-controls-stacked"},[_c('span',{staticClass:"float-left font-weight-bold"},[_vm._v("Select discount:")]),_vm._v(" "),_vm._l((this.adminData.allDiscounts),function(discount,key){return _c('label',{key:key,staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.discountId),expression:"discountId"}],staticClass:"custom-control-input",attrs:{"type":"radio"},domProps:{"value":discount.id,"checked":_vm._q(_vm.discountId,discount.id)},on:{"change":function($event){_vm.discountId=discount.id}}}),_vm._v(" "),_c('span',{staticClass:"custom-control-indicator"}),_vm._v(" "),_c('span',{staticClass:"custom-control-description font-weight-bold"},[_vm._v(_vm._s(discount.discountsName)+" ("+_vm._s(discount.percent)+"%)")])])})],2),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('div',{staticClass:"custom-controls-stacked"},[_c('span',{staticClass:"float-left font-weight-bold"},[_vm._v("Activation & Deactivation:")]),_vm._v(" "),_c('label',{staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.active),expression:"active"}],staticClass:"custom-control-input",attrs:{"type":"radio","value":"1"},domProps:{"checked":_vm._q(_vm.active,"1")},on:{"change":function($event){_vm.active="1"}}}),_vm._v(" "),_c('span',{staticClass:"custom-control-indicator"}),_vm._v(" "),_c('span',{staticClass:"custom-control-description font-weight-bold"},[_vm._v("Active")])]),_vm._v(" "),_c('label',{staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.active),expression:"active"}],staticClass:"custom-control-input",attrs:{"type":"radio","value":"0"},domProps:{"checked":_vm._q(_vm.active,"0")},on:{"change":function($event){_vm.active="0"}}}),_vm._v(" "),_c('span',{staticClass:"custom-control-indicator"}),_vm._v(" "),_c('span',{staticClass:"custom-control-description font-weight-bold"},[_vm._v("Blocked")])])]),_vm._v(" "),_vm._m(2),_vm._v(" "),_c('div',{staticClass:"custom-controls-stacked"},[_c('span',{staticClass:"float-left font-weight-bold"},[_vm._v("Activation & Deactivation:")]),_vm._v(" "),_c('label',{staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.admin),expression:"admin"}],staticClass:"custom-control-input",attrs:{"type":"radio","value":"1"},domProps:{"checked":_vm._q(_vm.admin,"1")},on:{"change":function($event){_vm.admin="1"}}}),_vm._v(" "),_c('span',{staticClass:"custom-control-indicator"}),_vm._v(" "),_c('span',{staticClass:"custom-control-description font-weight-bold"},[_vm._v("IMPERATOR")])]),_vm._v(" "),_c('label',{staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.admin),expression:"admin"}],staticClass:"custom-control-input",attrs:{"type":"radio","value":"0"},domProps:{"checked":_vm._q(_vm.admin,"0")},on:{"change":function($event){_vm.admin="0"}}}),_vm._v(" "),_c('span',{staticClass:"custom-control-indicator"}),_vm._v(" "),_c('span',{staticClass:"custom-control-description font-weight-bold"},[_vm._v("Human")])])]),_vm._v(" "),_vm._m(3)]),_vm._v(" "),_c('button',{staticClass:"float-left btn btn-dark",attrs:{"data-toggle":"collapse","data-target":"#collapseUserOrders","aria-expanded":"false","aria-controls":"collapseUserOrders"}},[_vm._v("\n        Show orders\n      ")]),_vm._v(" "),_c('button',{staticClass:"float-right btn btn-dark",attrs:{"disabled":!_vm.validBtnAccess},on:{"click":function($event){_vm.saveUser()}}},[_vm._v("\n        Save\n      ")])])]),_vm._v(" "),_c('p'),_vm._v(" "),_c('div',{staticClass:"collapse col-md-10 mt-md-5",attrs:{"id":"collapseUserOrders"}},[_c('table',{staticClass:"table table-hover font-weight-bold"},[_vm._m(4),_vm._v(" "),_vm._l((_vm.userOrders),function(order,key){return _c('tbody',{key:key},[_c('tr',{attrs:{"data-toggle":"collapse","data-target":'#collapseInfoBooks'+order.id,"aria-expanded":"false","aria-controls":'collapseInfoBooks'+order.id}},[_c('td',[_vm._v(_vm._s(order.id))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.login))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.timeToDate(order.time)))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.orderTotalPrice))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.clientDiscount)+"%")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.paymentName))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.statusName))])]),_vm._v(" "),_c('tr',{staticClass:"collapse",attrs:{"id":'collapseInfoBooks'+order.id}},[_c('td',{attrs:{"colspan":"7"}},[_c('table',{staticClass:"table table-striped font-weight-bold"},[_vm._m(5,true),_vm._v(" "),_c('tbody',_vm._l((order.books),function(book,key){return _c('tr',{key:key},[_c('td',[_vm._v(_vm._s(book.booksName))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.bookDiscount)+"%")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.count))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.bookTotalPrice))])])}))])])])])})],2)])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',{staticClass:"d-block bg-secondary col-md-12",staticStyle:{"height":"2px","margin-bottom":"10px","margin-top":"10px"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',{staticClass:"d-block bg-secondary col-md-12",staticStyle:{"height":"2px","margin-bottom":"10px","margin-top":"10px"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',{staticClass:"d-block bg-secondary col-md-12",staticStyle:{"height":"2px","margin-bottom":"10px","margin-top":"10px"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',{staticClass:"d-block bg-secondary col-md-12",staticStyle:{"height":"2px","margin-bottom":"10px","margin-top":"10px"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{staticClass:"thead-inverse"},[_c('tr',[_c('th',[_vm._v("№")]),_vm._v(" "),_c('th',[_vm._v("Login")]),_vm._v(" "),_c('th',[_vm._v("Date")]),_vm._v(" "),_c('th',[_vm._v("Amount")]),_vm._v(" "),_c('th',[_vm._v("Discount")]),_vm._v(" "),_c('th',[_vm._v("Peyment")]),_vm._v(" "),_c('th',[_vm._v("Status")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{staticClass:"thead-inverse"},[_c('tr',[_c('th',[_vm._v("Name")]),_vm._v(" "),_c('th',[_vm._v("Discount")]),_vm._v(" "),_c('th',[_vm._v("Count")]),_vm._v(" "),_c('th',[_vm._v("Amount")])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "IVMH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row col-md-12 justify-content-md-center"},[_c('div',{staticClass:"row col-md-4"},[_c('div',{staticClass:"col-md-12"},[_c('form',[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"font-weight-bold"},[_vm._v("Change author: "+_vm._s(_vm.getAuthorName))]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.name),expression:"name"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter new name"},domProps:{"value":(_vm.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.name=$event.target.value}}}),_vm._v(" "),(_vm.name == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Only latin (3 - 20 characters) ...")]):_vm._e(),_vm._v(" "),(!_vm.validName & _vm.name.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validName & _vm.nameCheck)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("This author already exists, please enter another!")]):_vm._e(),_vm._v(" "),(_vm.validName & !_vm.nameCheck)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()])]),_vm._v(" "),_c('button',{staticClass:"float-left btn btn-dark",on:{"click":function($event){_vm.deleteAuthor()}}},[_vm._v("\n        Delete\n      ")]),_vm._v(" "),_c('button',{staticClass:"float-right btn btn-dark",attrs:{"disabled":!_vm.validBtnAccess},on:{"click":function($event){_vm.saveAuthor()}}},[_vm._v("\n        Save\n      ")])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "KQfU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NewBook_vue__ = __webpack_require__("ltBx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_11f01298_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NewBook_vue__ = __webpack_require__("ehnQ");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NewBook_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_11f01298_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NewBook_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "KS52":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_config__ = __webpack_require__("/98u");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


// import addUser from './Registration'

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Admin',
  data: function data() {
    return {
      URL: __WEBPACK_IMPORTED_MODULE_1__static_config__["a" /* default */].config.URL,
      adminData: {
        allAuthors: [],
        allGenres: [],
        allBooks: [],
        allDiscounts: [],
        allStatus: [],
        allUsers: [],
        allOrders: []
      }
    };
  },


  props: ["user"],

  // components:{
  //   'adduser': addUser
  // },

  computed: {},

  created: function created() {
    if (this.user.admin != 1) location.href = "/#/";

    this.getAuthors();
    this.getGenres();
    this.getBooks();
    this.getDiscounts();
    this.getStatus();
    this.getOrders();
    this.getUsers();
  },


  methods: {
    getAuthors: function getAuthors() {
      var _this = this;

      fetch(this.URL + 'client/api/shop/authors/', { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
        // console.log(data)
        _this.adminData.allAuthors = data.data;
      });
    },
    getGenres: function getGenres() {
      var _this2 = this;

      fetch(this.URL + 'client/api/shop/genres/', { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
        // console.log(data)
        _this2.adminData.allGenres = data.data;
      });
    },
    getBooks: function getBooks() {
      var _this3 = this;

      fetch(this.URL + 'client/api/shop/books/', { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
        // console.log(data.data)
        _this3.adminData.allBooks = data.data;
      });
    },
    getDiscounts: function getDiscounts() {
      var _this4 = this;

      fetch(this.URL + 'client/api/shop/discounts/', { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
        // console.log(data.data)
        _this4.adminData.allDiscounts = data.data;
      });
    },
    getStatus: function getStatus() {
      var _this5 = this;

      fetch(this.URL + 'client/api/shop/status/', { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
        // console.log(data.data)
        _this5.adminData.allStatus = data.data;
      });
    },
    getOrders: function getOrders() {
      var _this6 = this;

      fetch(this.URL + 'client/api/admin/orders/' + this.user.hash, { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          _this6.adminData.allOrders = data.data;
        }
      });
    },
    getUsers: function getUsers() {
      var _this7 = this;

      fetch(this.URL + 'client/api/admin/users/' + this.user.hash, { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          _this7.adminData.allUsers = data.data;
        }
      });
    },
    adminEvent: function adminEvent(type) {
      switch (type) {
        case 'Authors':
          this.getAuthors();
          break;
        case 'Genres':
          this.getGenres();
          break;
        case 'Books':
          this.getBooks();
          break;
        case 'Orders':
          this.getOrders();
          break;
        case 'Users':
          this.getUsers();
          break;
      }
    },
    status: function status(response) {
      if (response.status == 200) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(response);
      } else {
        console.log('ERROR RESPONSE');
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error(response.statusText));
      }
    },
    json: function json(response) {
      return response.json();
    }
  }
});

/***/ }),

/***/ "M93x":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__("xJD8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2fdc5734_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__("T2Lz");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2fdc5734_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "MjDO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row col-md-12 justify-content-md-center"},[_c('div',{staticClass:"row col-md-4"},[_c('div',{staticClass:"col-md-12"},[_c('form',[_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Login")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.login),expression:"login",modifiers:{"trim":true}}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Login"},domProps:{"value":(_vm.login)},on:{"input":function($event){if($event.target.composing){ return; }_vm.login=$event.target.value.trim()},"blur":function($event){_vm.$forceUpdate()}}}),_vm._v(" "),(_vm.login == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Start whith latin, remain are numbers and latin (3 - 20 characters) ...")]):_vm._e(),_vm._v(" "),(!_vm.validLogin & _vm.login.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validLogin & _vm.loginExist)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Login is already taken, please enter another!")]):_vm._e(),_vm._v(" "),(_vm.validLogin & !_vm.loginExist)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Password")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.password),expression:"password",modifiers:{"trim":true}}],staticClass:"form-control",attrs:{"type":"password","placeholder":"Password"},domProps:{"value":(_vm.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value.trim()},"blur":function($event){_vm.$forceUpdate()}}}),_vm._v(" "),(_vm.password == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Only latin and numbers (5 - 32 characters) ...")]):_vm._e(),_vm._v(" "),(!_vm.validPassword & _vm.password.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validPassword)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Confirm password")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.confirm),expression:"confirm",modifiers:{"trim":true}}],staticClass:"form-control",attrs:{"type":"password","placeholder":"Confirm the password"},domProps:{"value":(_vm.confirm)},on:{"input":function($event){if($event.target.composing){ return; }_vm.confirm=$event.target.value.trim()},"blur":function($event){_vm.$forceUpdate()}}}),_vm._v(" "),(_vm.confirm == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Confirm the password")]):_vm._e(),_vm._v(" "),(_vm.password != _vm.confirm & _vm.confirm != '')?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.password == _vm.confirm & _vm.validPassword)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Phone")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.phone),expression:"phone",modifiers:{"trim":true}}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Phone"},domProps:{"value":(_vm.phone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.phone=$event.target.value.trim()},"blur":function($event){_vm.$forceUpdate()}}}),_vm._v(" "),(_vm.phone == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Only numbers (6 - 20 characters) ...")]):_vm._e(),_vm._v(" "),(!_vm.validPhone & _vm.phone.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validPhone)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_c('router-link',{attrs:{"to":'/'}},[_c('button',{staticClass:"float-left btn btn-dark"},[_vm._v("\n            Home\n          ")])])],1),_vm._v(" "),_c('button',{staticClass:"float-right btn btn-dark",attrs:{"disabled":!_vm.validBtnAccess},on:{"click":function($event){_vm.saveUser()}}},[_vm._v("\n          Submit\n        ")])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "NHnr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__("M93x");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__("YaEn");
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */] }
});

/***/ }),

/***/ "O/+0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row col-md-12 justify-content-md-center"},[_c('div',{staticClass:"row col-md-4"},[_c('div',{staticClass:"col-md-12"},[_c('form',[_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Author name")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.name),expression:"name"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter name"},domProps:{"value":(_vm.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.name=$event.target.value}}}),_vm._v(" "),(_vm.name == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Only latin (3 - 20 characters) ...")]):_vm._e(),_vm._v(" "),(!_vm.validName & _vm.name.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validName & _vm.nameCheck)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("This author already exists, please enter another!")]):_vm._e(),_vm._v(" "),(_vm.validName & !_vm.nameCheck)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()])]),_vm._v(" "),_c('button',{staticClass:"float-right btn btn-dark",attrs:{"disabled":!_vm.validBtnAccess},on:{"click":function($event){_vm.saveAuthor()}}},[_vm._v("\n        Submit\n      ")])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "Qt/K":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NewAuthor_vue__ = __webpack_require__("z1pi");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9d07c8d4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NewAuthor_vue__ = __webpack_require__("O/+0");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NewAuthor_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9d07c8d4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NewAuthor_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "RcER":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main"},[_c('div',{staticClass:"row col-12"},[_c('div',{staticClass:"col-2"},[_c('div',{staticClass:"list-group"},[_c('button',{staticClass:"list-group-item list-group-item-primary text-center",on:{"click":function($event){_vm.contentAllBooks()}}},[_vm._v("\n          All Books\n        ")]),_vm._v(" "),_c('button',{staticClass:"list-group-item list-group-item-secondary text-center",attrs:{"type":"button","data-toggle":"collapse","data-target":"#collapseAuthors","aria-expanded":"false","aria-controls":"collapseAuthors"}},[_vm._v("\n          Authors\n        ")]),_vm._v(" "),_c('div',{staticClass:"collapse",attrs:{"id":"collapseAuthors"}},_vm._l((_vm.allAuthors),function(author,key){return _c('button',{key:key,staticClass:"list-group-item list-group-item-action list-group-item-light",on:{"click":function($event){_vm.contentByAuthor(author.id)}}},[_vm._v("\n            "+_vm._s(author.authorsName)+"\n          ")])})),_vm._v(" "),_c('button',{staticClass:"list-group-item list-group-item-secondary text-center",attrs:{"type":"button","data-toggle":"collapse","data-target":"#collapseGenres","aria-expanded":"false","aria-controls":"collapseGenres"}},[_vm._v("\n          Genres\n        ")]),_vm._v(" "),_c('div',{staticClass:"collapse",attrs:{"id":"collapseGenres"}},_vm._l((_vm.allGenres),function(genre,key){return _c('button',{key:key,staticClass:"list-group-item list-group-item-action list-group-item-light",on:{"click":function($event){_vm.contentByGenre(genre.id)}}},[_vm._v("\n            "+_vm._s(genre.genresName)+"\n          ")])})),_vm._v(" "),_c('button',{staticClass:"list-group-item list-group-item-secondary text-center",attrs:{"type":"button","data-toggle":"collapse","data-target":"#collapseBooks","aria-expanded":"false","aria-controls":"collapseBooks"}},[_vm._v("\n          Books\n        ")]),_vm._v(" "),_c('div',{staticClass:"collapse",attrs:{"id":"collapseBooks"}},_vm._l((_vm.allBooks),function(book,key){return _c('button',{key:key,staticClass:"list-group-item list-group-item-action list-group-item-light",on:{"click":function($event){_vm.contentByBook(book.id)}}},[_vm._v("\n            "+_vm._s(book.booksName)+"\n          ")])}))])]),_vm._v(" "),_c('div',{staticClass:"col"},[_c('div',{staticClass:"row justify-content-center"},_vm._l((_vm.content),function(book,key){return _c('one-book-card',{key:key,attrs:{"book":book,"user":_vm.user},on:{"cardEvent":_vm.cardEvent}})}))])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "T2Lz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('nav',{staticClass:"navbar navbar-expand-lg navbar-light bg-light",staticStyle:{"margin-bottom":"30px"}},[_c('a',{staticClass:"navbar-brand",attrs:{"href":"/"}},[_vm._v("BookShop")]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{staticClass:"collapse navbar-collapse"},[_c('ul',{staticClass:"navbar-nav mr-auto"},[_c('li',{staticClass:"nav-item active"},[_c('router-link',{attrs:{"to":'/'}},[_c('span',{staticClass:"nav-link"},[_vm._v("Home "),_c('span',{staticClass:"sr-only"},[_vm._v("(current)")])])])],1)]),_vm._v(" "),(!_vm.user.access)?_c('div',{staticClass:"row"},[_c('router-link',{attrs:{"to":'/registration'}},[_c('button',{staticClass:"btn btn-light mr-sm-1 my-sm-0",attrs:{"type":"button"}},[_vm._v("\n            Registration\n          ")])]),_vm._v(" "),_c('form',{staticClass:"form-inline my-2 my-lg-0"},[_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.login),expression:"login",modifiers:{"trim":true}}],staticClass:"form-control mr-sm-1",attrs:{"type":"text","placeholder":"Login","aria-label":"Login"},domProps:{"value":(_vm.login)},on:{"input":function($event){if($event.target.composing){ return; }_vm.login=$event.target.value.trim()},"blur":function($event){_vm.$forceUpdate()}}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.password),expression:"password",modifiers:{"trim":true}}],staticClass:"form-control mr-sm-1",attrs:{"type":"password","placeholder":"Password","aria-label":"Password"},domProps:{"value":(_vm.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value.trim()},"blur":function($event){_vm.$forceUpdate()}}}),_vm._v(" "),_c('button',{staticClass:"btn btn-outline-dark mr-sm-2 my-sm-0",attrs:{"type":"button","disabled":_vm.validBtnAccess},on:{"click":function($event){_vm.logIn()}}},[_c('i',{staticClass:"fa fa-sign-in",attrs:{"aria-hidden":"true"}})])])],1):_vm._e(),_vm._v(" "),(_vm.user.access)?_c('div',{staticClass:"row"},[(_vm.user.admin == 1)?_c('router-link',{staticClass:"btn btn-light mr-sm-1 my-sm-0 text-primary font-weight-bold",attrs:{"to":'/admin'}},[_vm._v("\n          Admin panel\n        ")]):_vm._e(),_vm._v(" "),_c('router-link',{attrs:{"to":'/orders'}},[_c('button',{staticClass:"btn btn-light mr-sm-1 my-sm-0 text-primary font-weight-bold",attrs:{"type":"button"}},[_vm._v("\n            "+_vm._s(_vm.user.login)+"\n          ")])]),_vm._v(" "),_c('router-link',{attrs:{"to":'/cart'}},[_c('button',{staticClass:"btn btn-outline-dark mr-sm-2 my-sm-0",attrs:{"type":"button"}},[_c('i',{staticClass:"fa fa-shopping-cart",attrs:{"aria-hidden":"true"}})])]),_vm._v(" "),_c('button',{staticClass:"btn btn-outline-dark mr-sm-2 my-sm-0",attrs:{"type":"button"},on:{"click":function($event){_vm.logOut()}}},[_c('i',{staticClass:"fa fa-sign-out",attrs:{"aria-hidden":"true"}})])],1):_vm._e()])]),_vm._v(" "),_c('router-view',{attrs:{"user":_vm.user}})],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"navbar-toggler",attrs:{"type":"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[_c('span',{staticClass:"navbar-toggler-icon"})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "TZhk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row col-12"},[_c('div',{staticClass:"col-2"},[_c('div',{staticClass:"list-group"},[_c('router-link',{staticClass:"list-group-item list-group-item-primary text-center",attrs:{"to":"/admin/new-author"}},[_vm._v("\n        New Author\n      ")]),_vm._v(" "),_c('button',{staticClass:"list-group-item list-group-item-secondary text-center",attrs:{"type":"button","data-toggle":"collapse","data-target":"#collapseAuthors","aria-expanded":"false","aria-controls":"collapseAuthors"}},[_vm._v("\n        All Authors\n      ")]),_vm._v(" "),_c('div',{staticClass:"collapse",attrs:{"id":"collapseAuthors"}},_vm._l((_vm.adminData.allAuthors),function(author,key){return _c('router-link',{key:key,staticClass:"list-group-item list-group-item-action list-group-item-light",attrs:{"to":'/admin/edit-author/'+author.id},on:{"click":function($event){_vm.contentByAuthor(author.id)}}},[_vm._v("\n          "+_vm._s(author.authorsName)+"\n        ")])})),_vm._v(" "),_c('router-link',{staticClass:"list-group-item list-group-item-primary text-center",attrs:{"to":"/admin/new-genre"}},[_vm._v("\n        New Genre\n      ")]),_vm._v(" "),_c('button',{staticClass:"list-group-item list-group-item-secondary text-center",attrs:{"type":"button","data-toggle":"collapse","data-target":"#collapseGenres","aria-expanded":"false","aria-controls":"collapseGenres"}},[_vm._v("\n        All Genres\n      ")]),_vm._v(" "),_c('div',{staticClass:"collapse",attrs:{"id":"collapseGenres"}},_vm._l((_vm.adminData.allGenres),function(genre,key){return _c('router-link',{key:key,staticClass:"list-group-item list-group-item-action list-group-item-light",attrs:{"to":'/admin/edit-genre/'+genre.id}},[_vm._v("\n          "+_vm._s(genre.genresName)+"\n        ")])})),_vm._v(" "),_c('router-link',{staticClass:"list-group-item list-group-item-primary text-center",attrs:{"to":"/admin/new-book"}},[_vm._v("\n        New Book\n      ")]),_vm._v(" "),_c('button',{staticClass:"list-group-item list-group-item-secondary text-center",attrs:{"type":"button","data-toggle":"collapse","data-target":"#collapseBooks","aria-expanded":"false","aria-controls":"collapseBooks"}},[_vm._v("\n        All Books\n      ")]),_vm._v(" "),_c('div',{staticClass:"collapse",attrs:{"id":"collapseBooks"}},_vm._l((_vm.adminData.allBooks),function(book,key){return _c('router-link',{key:key,staticClass:"list-group-item list-group-item-action list-group-item-light",attrs:{"to":'/admin/edit-book/'+book.id}},[_vm._v("\n          "+_vm._s(book.booksName)+"\n        ")])})),_vm._v(" "),_c('router-link',{staticClass:"list-group-item list-group-item-primary text-center",attrs:{"to":"/admin/new-user"}},[_vm._v("\n        New User\n      ")]),_vm._v(" "),_c('button',{staticClass:"list-group-item list-group-item-secondary text-center",attrs:{"type":"button","data-toggle":"collapse","data-target":"#collapseUsers","aria-expanded":"false","aria-controls":"collapseUsers"}},[_vm._v("\n        All Users\n      ")]),_vm._v(" "),_c('div',{staticClass:"collapse",attrs:{"id":"collapseUsers"}},_vm._l((_vm.adminData.allUsers),function(user,key){return _c('router-link',{key:key,staticClass:"list-group-item list-group-item-action list-group-item-light",attrs:{"to":'/admin/edit-user/'+user.id}},[_vm._v("\n          "+_vm._s(user.login)+"\n        ")])})),_vm._v(" "),_c('router-link',{staticClass:"list-group-item list-group-item-primary text-center",attrs:{"to":"/admin/all-orders"}},[_vm._v("\n        All Orders\n      ")])],1)]),_vm._v(" "),_c('div',{staticClass:"col"},[_c('div',{staticClass:"row justify-content-center"},[_c('router-view',{attrs:{"user":_vm.user,"adminData":_vm.adminData},on:{"adminEvent":_vm.adminEvent}})],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "Uhku":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_config__ = __webpack_require__("/98u");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sections_OneBookCard__ = __webpack_require__("A0w9");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'MainPage',
  data: function data() {
    return {
      URL: __WEBPACK_IMPORTED_MODULE_1__static_config__["a" /* default */].config.URL,
      allBooks: '',
      allAuthors: '',
      allGenres: '',
      content: ''
    };
  },


  components: {
    'one-book-card': __WEBPACK_IMPORTED_MODULE_2__sections_OneBookCard__["a" /* default */]
  },

  props: ["user"],

  created: function created() {
    var _this = this;

    fetch(this.URL + 'client/api/shop/authors/', { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
      // console.log(data)
      _this.allAuthors = data.data;
    });

    fetch(this.URL + 'client/api/shop/genres/', { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
      // console.log(data)
      _this.allGenres = data.data;
    });

    fetch(this.URL + 'client/api/shop/books/', { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
      // console.log(data.data)
      _this.allBooks = data.data;
      _this.content = data.data;
    });
  },


  methods: {
    status: function status(response) {
      if (response.status == 200) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(response);
      } else {
        console.log('ERROR RESPONSE');
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error(response.statusText));
      }
    },
    json: function json(response) {
      return response.json();
    },
    contentAllBooks: function contentAllBooks() {
      var _this2 = this;

      fetch(this.URL + 'client/api/shop/books/', { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
        // console.log(data.data)
        _this2.content = data.data;
      });
    },
    contentByGenre: function contentByGenre(id) {
      var _this3 = this;

      fetch(this.URL + 'client/api/shop/books/FALSE/FALSE/' + id, { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
        // console.log(data.data)
        _this3.content = data.data;
      });
    },
    contentByAuthor: function contentByAuthor(id) {
      var _this4 = this;

      fetch(this.URL + 'client/api/shop/books/FALSE/' + id, { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
        // console.log(data.data)
        _this4.content = data.data;
      });
    },
    contentByBook: function contentByBook(id) {
      var _this5 = this;

      fetch(this.URL + 'client/api/shop/books/' + id, { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
        // console.log(data.data)
        _this5.content = data.data;
      });
    },
    cardEvent: function cardEvent(type, id) {
      // console.log(type, id)
      switch (type) {
        case 'byAuthor':
          this.contentByAuthor(id);
          break;
        case 'byGenre':
          this.contentByGenre(id);
          break;
      }
    }
  }
});

/***/ }),

/***/ "UjKB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__("mvHQ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__static_config__ = __webpack_require__("/98u");


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'OneBookCard',
  data: function data() {
    return {
      URL: __WEBPACK_IMPORTED_MODULE_2__static_config__["a" /* default */].config.URL,
      count: 1
    };
  },


  props: ["book", "user"],

  computed: {
    btnToCartAccess: function btnToCartAccess() {
      var _this = this;

      if (this.user.cart) {
        var result = this.user.cart.filter(function (el) {
          if (el == _this.book.id) return true;

          return false;
        });

        if (result.length) return false;
      }

      return true;
    }
  },

  created: function created() {},


  methods: {
    toCart: function toCart() {
      var user = JSON.parse(localStorage['user']);
      user.cart.push(this.book.id);
      localStorage['user'] = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(user);
      this.user.cart.push(this.book.id);

      fetch(this.URL + 'client/api/user/cart/', {
        method: 'POST',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'hash=' + this.user.hash + '&id=' + this.book.id + '&count=' + this.count
      }).then(this.status).then(this.json).then(function (data) {
        // console.log(data)
        if (data.server.status == 200) {} else {
          var error = 'Error in toCart()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });
    },
    cardEvent: function cardEvent(type, id) {
      this.$emit('cardEvent', type, id);
    },
    status: function status(response) {
      if (response.status == 200) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(response);
      } else {
        console.log('ERROR RESPONSE');
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error(response.statusText));
      }
    },
    json: function json(response) {
      return response.json();
    }
  }
});

/***/ }),

/***/ "YaEn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__("/ocq");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Main__ = __webpack_require__("s6+2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Cart__ = __webpack_require__("Zc39");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Orders__ = __webpack_require__("EJtX");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Registration__ = __webpack_require__("mRaa");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Admin__ = __webpack_require__("qbhH");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_sections_admin_EditUser__ = __webpack_require__("ymyn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_sections_admin_NewAuthor__ = __webpack_require__("Qt/K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_sections_admin_EditAuthor__ = __webpack_require__("gkf3");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_sections_admin_NewGenre__ = __webpack_require__("1bg9");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_sections_admin_EditGenre__ = __webpack_require__("G9tn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_sections_admin_NewBook__ = __webpack_require__("KQfU");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_sections_admin_EditBook__ = __webpack_require__("8c+5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_sections_admin_AllOrders__ = __webpack_require__("7/vh");





















__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/',
    name: 'Main page',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Main__["a" /* default */]
  }, {
    path: '/cart',
    name: 'User Cart',
    component: __WEBPACK_IMPORTED_MODULE_3__components_Cart__["a" /* default */]
  }, {
    path: '/orders',
    name: 'User Orders',
    component: __WEBPACK_IMPORTED_MODULE_4__components_Orders__["a" /* default */]
  }, {
    path: '/registration',
    name: 'User Registration',
    component: __WEBPACK_IMPORTED_MODULE_5__components_Registration__["a" /* default */]
  }, {
    path: '/admin',
    name: 'Admin',
    component: __WEBPACK_IMPORTED_MODULE_6__components_Admin__["a" /* default */],
    children: [{ path: 'new-user', component: __WEBPACK_IMPORTED_MODULE_5__components_Registration__["a" /* default */] }, { path: 'edit-user/:id', component: __WEBPACK_IMPORTED_MODULE_7__components_sections_admin_EditUser__["a" /* default */] }, { path: 'new-author', component: __WEBPACK_IMPORTED_MODULE_8__components_sections_admin_NewAuthor__["a" /* default */] }, { path: 'edit-author/:id', component: __WEBPACK_IMPORTED_MODULE_9__components_sections_admin_EditAuthor__["a" /* default */] }, { path: 'new-genre', component: __WEBPACK_IMPORTED_MODULE_10__components_sections_admin_NewGenre__["a" /* default */] }, { path: 'edit-genre/:id', component: __WEBPACK_IMPORTED_MODULE_11__components_sections_admin_EditGenre__["a" /* default */] }, { path: 'new-book', component: __WEBPACK_IMPORTED_MODULE_12__components_sections_admin_NewBook__["a" /* default */] }, { path: 'edit-book/:id', component: __WEBPACK_IMPORTED_MODULE_13__components_sections_admin_EditBook__["a" /* default */] }, { path: 'all-orders', component: __WEBPACK_IMPORTED_MODULE_14__components_sections_admin_AllOrders__["a" /* default */] }]
  }]
}));

/***/ }),

/***/ "Zc39":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Cart_vue__ = __webpack_require__("/w5R");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1efcb34c_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Cart_vue__ = __webpack_require__("tGYa");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Cart_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1efcb34c_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Cart_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "d8op":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row col-md-8"},[_c('div',{staticClass:"col-md-12"},[_c('table',{staticClass:"table table-hover font-weight-bold"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.adminData.allOrders),function(order,key){return _c('tbody',{key:key},[_c('tr',[_c('td',{attrs:{"data-toggle":"collapse","data-target":'#collapseInfoBooks'+order.id,"aria-expanded":"false","aria-controls":'collapseInfoBooks'+order.id}},[_vm._v("\n            "+_vm._s(order.id)+"\n          ")]),_vm._v(" "),_c('td',{attrs:{"data-toggle":"collapse","data-target":'#collapseInfoBooks'+order.id,"aria-expanded":"false","aria-controls":'collapseInfoBooks'+order.id}},[_vm._v("\n            "+_vm._s(order.login)+"\n          ")]),_vm._v(" "),_c('td',{attrs:{"data-toggle":"collapse","data-target":'#collapseInfoBooks'+order.id,"aria-expanded":"false","aria-controls":'collapseInfoBooks'+order.id}},[_vm._v("\n            "+_vm._s(_vm.timeToDate(order.time))+"\n          ")]),_vm._v(" "),_c('td',{attrs:{"data-toggle":"collapse","data-target":'#collapseInfoBooks'+order.id,"aria-expanded":"false","aria-controls":'collapseInfoBooks'+order.id}},[_vm._v("\n            "+_vm._s(order.orderTotalPrice)+"\n          ")]),_vm._v(" "),_c('td',{attrs:{"data-toggle":"collapse","data-target":'#collapseInfoBooks'+order.id,"aria-expanded":"false","aria-controls":'collapseInfoBooks'+order.id}},[_vm._v("\n            "+_vm._s(order.clientDiscount)+"%\n          ")]),_vm._v(" "),_c('td',{attrs:{"data-toggle":"collapse","data-target":'#collapseInfoBooks'+order.id,"aria-expanded":"false","aria-controls":'collapseInfoBooks'+order.id}},[_vm._v("\n            "+_vm._s(order.paymentName)+"\n          ")]),_vm._v(" "),_c('td',[_c('span',[_vm._v(_vm._s(order.statusName))]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.statusId),expression:"statusId"}],staticClass:"form-control",on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.statusId=$event.target.multiple ? $$selectedVal : $$selectedVal[0]},function($event){_vm.saveOrderStatus(order.id, order.statusId)}]}},[_c('option',{attrs:{"value":""}},[_vm._v("Select")]),_vm._v(" "),_vm._l((_vm.adminData.allStatus),function(status,key){return _c('option',{key:key,domProps:{"value":status.id}},[_vm._v("\n                  "+_vm._s(status.statusName)+"\n                ")])})],2)])])]),_vm._v(" "),_c('tr',{staticClass:"collapse",attrs:{"id":'collapseInfoBooks'+order.id}},[_c('td',{attrs:{"colspan":"7"}},[_c('table',{staticClass:"table table-striped font-weight-bold"},[_vm._m(1,true),_vm._v(" "),_c('tbody',_vm._l((order.books),function(book,key){return _c('tr',{key:key},[_c('td',[_vm._v(_vm._s(book.booksName))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.bookDiscount)+"%")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.count))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.bookTotalPrice))])])}))])])])])})],2)])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{staticClass:"thead-inverse"},[_c('tr',[_c('th',[_vm._v("№")]),_vm._v(" "),_c('th',[_vm._v("Login")]),_vm._v(" "),_c('th',[_vm._v("Date")]),_vm._v(" "),_c('th',[_vm._v("Amount")]),_vm._v(" "),_c('th',[_vm._v("Discount")]),_vm._v(" "),_c('th',[_vm._v("Peyment")]),_vm._v(" "),_c('th',[_vm._v("Status")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{staticClass:"thead-inverse"},[_c('tr',[_c('th',[_vm._v("Name")]),_vm._v(" "),_c('th',[_vm._v("Discount")]),_vm._v(" "),_c('th',[_vm._v("Count")]),_vm._v(" "),_c('th',[_vm._v("Amount")])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "ehnQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row col-md-12 justify-content-md-center"},[_c('div',{staticClass:"row col-md-4"},[_c('div',{staticClass:"col-md-12"},[_c('form',[_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Name")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.name),expression:"name"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter book name"},domProps:{"value":(_vm.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.name=$event.target.value}}}),_vm._v(" "),(_vm.name == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("3 - 100 characters")]):_vm._e(),_vm._v(" "),(!_vm.validName & _vm.name.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validName)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Pubyear")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pubyear),expression:"pubyear"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter pubyear"},domProps:{"value":(_vm.pubyear)},on:{"input":function($event){if($event.target.composing){ return; }_vm.pubyear=$event.target.value}}}),_vm._v(" "),(_vm.pubyear == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Only 1-4 numbers")]):_vm._e(),_vm._v(" "),(!_vm.validPubyear & _vm.pubyear.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validPubyear)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Price")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.price),expression:"price"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter price"},domProps:{"value":(_vm.price)},on:{"input":function($event){if($event.target.composing){ return; }_vm.price=$event.target.value}}}),_vm._v(" "),(_vm.price == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Only 1-10 numbers")]):_vm._e(),_vm._v(" "),(!_vm.validPrice & _vm.price.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validPrice)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Description")]),_vm._v(" "),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.desc),expression:"desc"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter description"},domProps:{"value":(_vm.desc)},on:{"input":function($event){if($event.target.composing){ return; }_vm.desc=$event.target.value}}}),_vm._v(" "),(_vm.desc == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Minimum 3 characters")]):_vm._e(),_vm._v(" "),(!_vm.validDesc & _vm.desc.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validDesc)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{staticClass:"custom-controls-stacked"},[_c('span',{staticClass:"float-left font-weight-bold"},[_vm._v("Select discount:")]),_vm._v(" "),_vm._l((this.adminData.allDiscounts),function(discount,key){return _c('label',{key:key,staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.discountId),expression:"discountId"}],staticClass:"custom-control-input",attrs:{"type":"radio"},domProps:{"value":discount.id,"checked":_vm._q(_vm.discountId,discount.id)},on:{"change":function($event){_vm.discountId=discount.id}}}),_vm._v(" "),_c('span',{staticClass:"custom-control-indicator"}),_vm._v(" "),_c('span',{staticClass:"custom-control-description font-weight-bold"},[_vm._v(_vm._s(discount.discountsName)+" ("+_vm._s(discount.percent)+"%)")])])})],2),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"float-left font-weight-bold"},[_vm._v("Select Author(s):")]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.authorsId),expression:"authorsId"}],staticClass:"form-control",attrs:{"multiple":"","size":"5"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.authorsId=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((this.adminData.allAuthors),function(author,key){return _c('option',{key:key,domProps:{"value":author.id}},[_vm._v("\n              "+_vm._s(author.authorsName)+"\n            ")])}))]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"float-left font-weight-bold"},[_vm._v("Select Genre(s):")]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.genresId),expression:"genresId"}],staticClass:"form-control",attrs:{"multiple":"","size":"5"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.genresId=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((this.adminData.allGenres),function(genre,key){return _c('option',{key:key,domProps:{"value":genre.id}},[_vm._v("\n              "+_vm._s(genre.genresName)+"\n            ")])}))])]),_vm._v(" "),_c('button',{staticClass:"float-right btn btn-dark",attrs:{"disabled":!_vm.validBtnAccess},on:{"click":function($event){_vm.saveBook()}}},[_vm._v("\n        Save\n      ")])])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',{staticClass:"d-block bg-secondary col-md-12",staticStyle:{"height":"2px","margin-bottom":"10px","margin-top":"10px"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',{staticClass:"d-block bg-secondary col-md-12",staticStyle:{"height":"2px","margin-bottom":"10px","margin-top":"10px"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "gkf3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditAuthor_vue__ = __webpack_require__("0mNB");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3cabbb7a_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditAuthor_vue__ = __webpack_require__("IVMH");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditAuthor_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3cabbb7a_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditAuthor_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "hnMZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row justify-content-md-center"},[_c('div',{staticClass:"row col-md-8"},[_c('div',{staticClass:"col-md-12"},[_c('table',{staticClass:"table table-hover font-weight-bold"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.userOrders),function(order,key){return _c('tbody',{key:key},[_c('tr',{attrs:{"data-toggle":"collapse","data-target":'#collapseInfoBooks'+order.id,"aria-expanded":"false","aria-controls":'collapseInfoBooks'+order.id}},[_c('td',[_vm._v(_vm._s(order.id))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.timeToDate(order.time)))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.orderTotalPrice))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.clientDiscount)+"%")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.paymentName))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.statusName))])]),_vm._v(" "),_c('tr',{staticClass:"collapse",attrs:{"id":'collapseInfoBooks'+order.id}},[_c('td',{attrs:{"colspan":"6"}},[_c('table',{staticClass:"table table-striped font-weight-bold"},[_vm._m(1,true),_vm._v(" "),_c('tbody',_vm._l((order.books),function(book,key){return _c('tr',{key:key},[_c('td',[_vm._v(_vm._s(book.booksName))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.bookDiscount)+"%")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.count))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.bookTotalPrice))])])}))])])])])})],2),_vm._v(" "),_c('router-link',{attrs:{"to":'/'}},[_c('button',{staticClass:"float-left btn btn-dark"},[_vm._v("\n          Home\n        ")])])],1)])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{staticClass:"thead-inverse"},[_c('tr',[_c('th',[_vm._v("№")]),_vm._v(" "),_c('th',[_vm._v("Date")]),_vm._v(" "),_c('th',[_vm._v("Amount")]),_vm._v(" "),_c('th',[_vm._v("Discount")]),_vm._v(" "),_c('th',[_vm._v("Peyment")]),_vm._v(" "),_c('th',[_vm._v("Status")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{staticClass:"thead-inverse"},[_c('tr',[_c('th',[_vm._v("Name")]),_vm._v(" "),_c('th',[_vm._v("Discount")]),_vm._v(" "),_c('th',[_vm._v("Count")]),_vm._v(" "),_c('th',[_vm._v("Amount")])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "ltBx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_config__ = __webpack_require__("/98u");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'NewBook',
  data: function data() {
    return {
      URL: __WEBPACK_IMPORTED_MODULE_1__static_config__["a" /* default */].config.URL,
      name: '',
      pubyear: '',
      price: '',
      desc: '',
      discountId: 1,
      authorsId: [],
      genresId: []
    };
  },


  props: ["user", "adminData"],

  computed: {
    validBtnAccess: function validBtnAccess() {
      if (this.validName && this.validPubyear && this.validPrice && this.validDesc && this.authorsId.length >= 1 && this.genresId.length >= 1) {
        return true;
      }

      return false;
    },
    validName: function validName() {
      if (this.name.length >= 3 && this.name.length <= 100) {
        return true;
      }

      return false;
    },
    validDesc: function validDesc() {
      if (this.desc.length >= 3) {
        return true;
      }

      return false;
    },
    validPubyear: function validPubyear() {
      var x = /^[0-9]+$/i.exec(this.pubyear);

      if (x) {
        if (x && this.pubyear.length >= 1 && this.pubyear.length <= 4) return true;
      }

      return false;
    },
    validPrice: function validPrice() {
      var x = /^[0-9]+$/i.exec(this.price);

      if (x) {
        if (x && this.price.length >= 1 && this.price.length <= 10) return true;
      }

      return false;
    }
  },

  created: function created() {},


  methods: {
    saveBook: function saveBook() {
      var _this = this;

      fetch(this.URL + 'client/api/admin/books/', {
        method: 'POST',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'hash=' + this.user.hash + '&name=' + this.name + '&description=' + this.desc + '&pubyear=' + this.pubyear + '&price=' + this.price + '&idDiscount=' + this.discountId + '&authorsId=' + this.authorsId.join(',') + '&genresId=' + this.genresId.join(',')
      }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          _this.adminEvent('Books');
        } else {
          var error = 'Error in saveBook()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });

      this.name = this.desc = this.pubyear = this.price = '';
      this.discountId = 1;
      this.authorsId = [];
      this.genresId = [];
    },
    adminEvent: function adminEvent(type) {
      this.$emit('adminEvent', type);
    },
    status: function status(response) {
      if (response.status == 200) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(response);
      } else {
        console.log('ERROR RESPONSE');
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error(response.statusText));
      }
    },
    json: function json(response) {
      return response.json();
    }
  }
});

/***/ }),

/***/ "mRaa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Registration_vue__ = __webpack_require__("4jld");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2eead865_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Registration_vue__ = __webpack_require__("MjDO");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Registration_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2eead865_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Registration_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "mk43":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row col-md-12 justify-content-md-center"},[_c('div',{staticClass:"row col-md-4"},[_c('div',{staticClass:"col-md-12"},[_c('form',[_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Genre name")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.name),expression:"name"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter name"},domProps:{"value":(_vm.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.name=$event.target.value}}}),_vm._v(" "),(_vm.name == '')?_c('small',{staticClass:"form-text text-muted"},[_vm._v("Only latin (3 - 20 characters) ...")]):_vm._e(),_vm._v(" "),(!_vm.validName & _vm.name.length > 0)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("Not yet correct ...")]):_vm._e(),_vm._v(" "),(_vm.validName & _vm.nameCheck)?_c('small',{staticClass:"form-text text-danger"},[_vm._v("This genre already exists, please enter another!")]):_vm._e(),_vm._v(" "),(_vm.validName & !_vm.nameCheck)?_c('small',{staticClass:"form-text text-success"},[_vm._v("Сorrectly!")]):_vm._e()])]),_vm._v(" "),_c('button',{staticClass:"float-right btn btn-dark",attrs:{"disabled":!_vm.validBtnAccess},on:{"click":function($event){_vm.saveGenre()}}},[_vm._v("\n        Submit\n      ")])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "qbhH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Admin_vue__ = __webpack_require__("KS52");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9055d95a_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Admin_vue__ = __webpack_require__("TZhk");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Admin_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9055d95a_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Admin_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "s6+2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Main_vue__ = __webpack_require__("Uhku");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1e184965_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Main_vue__ = __webpack_require__("RcER");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Main_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1e184965_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Main_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "tGYa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row justify-content-md-center"},[_c('div',{staticClass:"row col-md-10"},[_c('div',{staticClass:"col-md-8"},[_c('table',{staticClass:"table table-striped font-weight-bold"},[_vm._m(0),_vm._v(" "),_c('tbody',_vm._l((_vm.userСalculatedCart),function(book,key){return _c('tr',{key:key},[_c('td',[_vm._v(_vm._s(book.booksName))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.percent)+"%")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.price))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.discount))]),_vm._v(" "),_c('td',{staticClass:"row"},[_c('button',{staticClass:"btn btn-dark",attrs:{"disabled":book.count <= 1},on:{"click":function($event){book.count-- & _vm.saveCount(book.id, book.count)}}},[_c('i',{staticClass:"fa fa-minus",attrs:{"aria-hidden":"true"}})]),_vm._v(" "),_c('button',{staticClass:"btn btn-light font-weight-bold"},[_vm._v(_vm._s(book.count))]),_vm._v(" "),_c('button',{staticClass:"btn btn-dark",on:{"click":function($event){book.count++ & _vm.saveCount(book.id, book.count)}}},[_c('i',{staticClass:"fa fa-plus",attrs:{"aria-hidden":"true"}})])]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.total))]),_vm._v(" "),_c('td',[_c('label',{staticClass:"custom-control custom-checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.deleteId),expression:"deleteId"}],staticClass:"custom-control-input",attrs:{"type":"checkbox"},domProps:{"value":book.id,"checked":Array.isArray(_vm.deleteId)?_vm._i(_vm.deleteId,book.id)>-1:(_vm.deleteId)},on:{"change":function($event){var $$a=_vm.deleteId,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=book.id,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.deleteId=$$a.concat([$$v]))}else{$$i>-1&&(_vm.deleteId=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.deleteId=$$c}}}}),_vm._v(" "),_c('span',{staticClass:"custom-control-indicator"})])])])}))])]),_vm._v(" "),_c('div',{staticClass:"col-md-4"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"clearfix"},[_c('span',{staticClass:"float-left font-weight-bold"},[_vm._v("In your Cart:")]),_vm._v(" "),_c('span',{staticClass:"float-right font-weight-bold"},[_vm._v(_vm._s(_vm.getTotal)+" ₴")])]),_vm._v(" "),_c('div',{staticClass:"clearfix"},[_c('span',{staticClass:"float-left font-weight-bold"},[_vm._v("Your discount:")]),_vm._v(" "),_c('span',{staticClass:"float-right font-weight-bold"},[_vm._v(_vm._s(_vm.user.percent)+"%")])]),_vm._v(" "),_c('div',{staticClass:"clearfix"},[_c('span',{staticClass:"float-left font-weight-bold"},[_vm._v("Proceeds:")]),_vm._v(" "),_c('span',{staticClass:"float-right font-weight-bold"},[_vm._v(_vm._s(_vm.getUserProceeds)+" ₴")])]),_vm._v(" "),_c('p'),_vm._v(" "),_c('div',{staticClass:"clearfix"},[_c('h4',{staticClass:"float-left font-weight-bold"},[_vm._v("Grand Total:")]),_vm._v(" "),_c('h4',{staticClass:"float-right font-weight-bold"},[_vm._v("\n          "+_vm._s(_vm.getGrandTotal)+" ₴\n        ")])]),_vm._v(" "),_vm._m(2),_vm._v(" "),_c('div',{staticClass:"custom-controls-stacked"},[_c('span',{staticClass:"float-left font-weight-bold"},[_vm._v("Select a Payment Method:")]),_vm._v(" "),_vm._l((_vm.payments),function(payment,key){return _c('label',{key:key,staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.paymentId),expression:"paymentId"}],staticClass:"custom-control-input",attrs:{"type":"radio"},domProps:{"value":payment.id,"checked":_vm._q(_vm.paymentId,payment.id)},on:{"change":function($event){_vm.paymentId=payment.id}}}),_vm._v(" "),_c('span',{staticClass:"custom-control-indicator"}),_vm._v(" "),_c('span',{staticClass:"custom-control-description font-weight-bold"},[_vm._v(_vm._s(payment.paymentName))])])})],2),_vm._v(" "),_vm._m(3),_vm._v(" "),_c('div',{staticClass:"clearfix"},[_c('button',{staticClass:"float-left btn btn-dark",attrs:{"disabled":!_vm.deleteId.length},on:{"click":function($event){_vm.deleteBooks()}}},[_vm._v("\n          Delete\n        ")]),_vm._v(" "),_c('button',{staticClass:"float-right btn btn-dark",attrs:{"disabled":!_vm.paymentId},on:{"click":function($event){_vm.saveOrder()}}},[_vm._v("\n          Order\n        ")])])])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{staticClass:"thead-inverse"},[_c('tr',[_c('th',[_vm._v("Name")]),_vm._v(" "),_c('th',[_vm._v("Discount (%)")]),_vm._v(" "),_c('th',[_vm._v("Price")]),_vm._v(" "),_c('th',[_vm._v("Discount")]),_vm._v(" "),_c('th',[_vm._v("Count")]),_vm._v(" "),_c('th',[_vm._v("Total")]),_vm._v(" "),_c('th',[_vm._v("Delete")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',{staticClass:"d-block bg-secondary col-md-12",staticStyle:{"height":"2px","margin-bottom":"10px","margin-top":"10px"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',{staticClass:"d-block bg-secondary col-md-12",staticStyle:{"height":"2px","margin-bottom":"10px","margin-top":"10px"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',{staticClass:"d-block bg-secondary col-md-12",staticStyle:{"height":"2px","margin-bottom":"10px","margin-top":"10px"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "xJD8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__("mvHQ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__static_config__ = __webpack_require__("/98u");


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'app',
  data: function data() {
    return {
      URL: __WEBPACK_IMPORTED_MODULE_2__static_config__["a" /* default */].config.URL,
      login: '',
      password: '',
      user: {
        access: false,
        cart: [],
        login: '',
        hash: '',
        percent: '',
        admin: ''
      }
    };
  },


  computed: {
    validBtnAccess: function validBtnAccess() {
      if (this.validLogin && this.validPassword) {
        return false;
      }

      return true;
    },
    validLogin: function validLogin() {
      var x = /^[a-z]+[0-9a-z]*$/i.exec(this.login);
      if (x && this.login.length >= 3) {
        return true;
      }

      return false;
    },
    validPassword: function validPassword() {
      var x = /^[a-z0-9]+$/i.exec(this.password);

      if (x) {
        if (x && this.password.length >= 5) return true;
      }

      return false;
    }
  },

  created: function created() {
    if (localStorage['user']) {
      this.user = JSON.parse(localStorage['user']);
      this.checkAuth(this.user.hash);
    }
  },


  methods: {
    checkAuth: function checkAuth(hash) {
      var _this = this;

      fetch(this.URL + 'client/api/user/users/false/' + hash, { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {}
        // console.log(data)

        /* TODO modal window with error */
        else if (data.server.code == '013') {
            localStorage.removeItem("user");
            _this.user.access = false;
            var error = 'Login time has expired, please login!';
            alert(error);
            location.href = "/#/";
          } else {
            var _error = 'Error in checkAuth(hash)' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
            alert(_error);
            location.href = "/#/";
          }
      });
    },
    logOut: function logOut() {
      localStorage.removeItem("user");
      this.user.access = false;
      this.user.cart = [];
      fetch(this.URL + 'client/api/user/users/' + this.user.hash, {
        method: 'DELETE',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {} else {
          var error = 'Error in logOut()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });

      location.href = "/#/";
    },
    logIn: function logIn() {
      var _this2 = this;

      fetch(this.URL + 'client/api/user/users/', {
        method: 'PUT',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'login=' + this.login + '&password=' + this.password
      }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          if (data.data.active == 1) {
            _this2.user.access = true;
          }
          _this2.user.login = data.data.login;
          _this2.user.hash = data.data.hash;
          _this2.user.admin = data.data.admin;
          _this2.user.percent = data.data.percent;
          _this2.getUserCartBooksId(_this2.user.hash);
          localStorage['user'] = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(_this2.user);
        } else {
          var error = 'Error in logIn()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });
    },
    getUserCartBooksId: function getUserCartBooksId(hash) {
      var _this3 = this;

      fetch(this.URL + 'client/api/user/cart/' + hash, { method: 'GET' }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          _this3.user.cart = [];
          data.data.forEach(function (element) {
            _this3.user.cart.push(element.id);
          });

          var user = JSON.parse(localStorage['user']);
          user.cart = _this3.user.cart;
          localStorage['user'] = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(user);
        }
      });
    },
    status: function status(response) {
      if (response.status == 200) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(response);
      } else {
        console.log('ERROR FETCH RESPONSE!');
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error(response.statusText));
      }
    },
    json: function json(response) {
      return response.json();
    }
  }
});

/***/ }),

/***/ "ymyn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditUser_vue__ = __webpack_require__("BRWk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2d70a10c_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditUser_vue__ = __webpack_require__("GY9B");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditUser_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2d70a10c_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditUser_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "z1pi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_config__ = __webpack_require__("/98u");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'NewAuthor',
  data: function data() {
    return {
      URL: __WEBPACK_IMPORTED_MODULE_1__static_config__["a" /* default */].config.URL,
      name: '',
      nameCheck: false
    };
  },


  watch: {
    name: function name() {
      var _this = this;

      this.nameCheck = false;
      var x = this.adminData.allAuthors.filter(function (el) {
        if (el.authorsName.toLowerCase() == _this.name.toLowerCase()) return true;
      });

      if (x && x.length) {
        this.nameCheck = true;
      }
    }
  },

  props: ["user", "adminData"],

  computed: {
    validBtnAccess: function validBtnAccess() {
      if (this.validName && !this.nameCheck) {
        return true;
      }

      return false;
    },
    validName: function validName() {
      var x = /^[a-z]+(\s{1}[a-z]+)?$/i.exec(this.name);

      if (x && this.name.length >= 3 && this.name.length <= 20) {
        return true;
      }

      return false;
    }
  },

  created: function created() {},


  methods: {
    saveAuthor: function saveAuthor() {
      var _this2 = this;

      fetch(this.URL + 'client/api/admin/authors/', {
        method: 'POST',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'hash=' + this.user.hash + '&name=' + this.name
      }).then(this.status).then(this.json).then(function (data) {
        if (data.server.status == 200) {
          _this2.adminEvent('Authors');
        } else {
          var error = 'Error in saveAuthor()' + '\nStatus: ' + data.server.status + '\nError code: ' + data.server.code + '\nInfo: ' + data.server.information;
          alert(error);
        }
      });

      this.name = '';
    },
    adminEvent: function adminEvent(type) {
      this.$emit('adminEvent', type);
    },
    status: function status(response) {
      if (response.status == 200) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(response);
      } else {
        console.log('ERROR RESPONSE');
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error(response.statusText));
      }
    },
    json: function json(response) {
      return response.json();
    }
  }
});

/***/ })

},["NHnr"]);
//# sourceMappingURL=app.abb8652c9b70896d0f10.js.map