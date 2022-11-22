'use strict';

import lessons from './lessons.js';

let app = new Vue({
  el: '#lessons-page',
  data: {
    sitename: 'Lessons',
    allLessons: lessons,
    // cart array for storing the lessons added to the cart
    cart: [],
    displayLessons: true,
    searchTerm: '',
    sort: {
      sortValue: '',
      sortOrder: '',
    },
    form: {
      fullName: '',
      phoneNumber: '',
    },
  },
  methods: {
    // adds the chosen lesson to the cart and reduces the spaces left
    addToCart(lesson) {
      this.cart.push(lesson);
      lesson.spacesLeft--;
    },

    // removes a chosen lesson from the cart and increases the spaces left
    removeFromCart(id) {
      for (let i = 0; i < this.cart.length; i++) {
        // checks if lesson id in cart is same as the id passed as param
        if (this.cart[i].id === id) {
          this.cart.splice(i, 1);
          // uses break because we want to remove only one lesson at a time
          break;
        }
      }

      for (let i = 0; i < this.allLessons.length; i++) {
        if (this.allLessons[i].id === id) {
          this.allLessons[i].spacesLeft++;
        }
      }
    },

    /*
      terinary operatory that is used to switch
      between the lessons and the checkout page
    */
    displayCheckoutPage() {
      this.displayLessons = this.displayLessons ? false : true;
    },

    // adds the product to the cart as long as spaces left is greater than 0
    canAddToCart(lesson) {
      return lesson.spacesLeft !== 0;
    },

    // counts the number of lessons in the cart for a particular lesson
    cartCount(id) {
      let count = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    },

    // method thats called when user clicks the submit button
    submitOrder(message, event) {
      if (event) {
        // to prevent button from reloading the page
        event.preventDefault();
      }
      alert(message);
      // resets the full name, phone number, and the cart
      this.form.fullName = '';
      this.form.phoneNumber = null;
      this.cart = [];
    },
  },

  computed: {
    // returns the number of lessons in the cart
    cartItemCount() {
      return this.cart.length;
    },

    // returns the lessons stored in the cart
    cartItems() {
      return this.cart;
    },

    /*
    checks if the cart is empty so that the checkout page can display a different message when the cart is empty
    */
    isCheckoutPageEmpty() {
      return this.cart.length === 0;
    },

    sortedLessons() {
      // returns all lessons by default when none of the sorting is applied
      if (!(this.sort.sortValue && this.sort.sortOrder)) {
        return this.allLessons;
      }
    },
  },
});
