<template>
  <div id="app" class="b-page">
    <div class="b-page__line">
      <div class="b-basket">
        <div class="b-basket__logo">
          <div class="b-logo">
            <a><img class="b-logo__img" src="./assets/img/Vector.png" ></a>
          </div>
        </div>
        <div class="b-basket__title">
          <div class="b-title">
            <p class="b-title__name">Ваша корзина</p>
            <p class="b-title__quantity">{{ computeNumberOfProducts }} товара</p>
            <p class="b-title__price">{{ computePrice }} ₽</p>
          </div>
        </div>
      </div>
    </div>
    <div class="b-page__line">
      <div class="b-way">
        <p class="b-way__main">Главная</p>
        <div class="b-way__foto">
          <img src="./assets/img/Vector6.png">
        </div>
        <p class="b-way__basket">Корзина</p>
      </div>
    </div>
    <div class="b-page__line">
      <div class="b-location">
        <div class="b-location__left-field">
          <div class="b-heading">
            <p class="b-heading__head">Ваша корзина</p>
            <p class="b-heading__sum">{{ computeNumberOfProducts }} товара</p>
            <p class="b-heading__clear" @click="clearCart">Очистить корзину</p>
          </div>
          <div v-if="this.$store.getters.getProducts.length === 0">
            <p>Ваша корзина пуста</p>
          </div>
          <div v-if="this.$store.getters.getProducts">
            <div class="b-products" v-for="product in this.$store.getters.getProducts" :key="product.id">
              <product-card :product="product"></product-card>
            </div>
          </div>
          <div v-if="this.$store.getters.getProducts.length !== 0" class="b-installation">
            <a class="b-installation__checkbox">
              <input type="checkbox" name="a" v-model="needInstall">
            </a>
            <img class="b-installation__foto" src="./assets/img/Group564.png">
            <div class="b-installation__description">
              <div class="b-definition">
                <p class="b-definition__term">Установка</p>
                <p class="b-definition__explanation">Отметьте, если Вам необходима консультация профессионала по монтажу выбранных товаров.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="b-location__right-field">
          <div class="b-payment">
            <div class="b-payment__heading">
              <p class="b-total-in-basket">Итого</p>
            </div>
            <div class="b-payment__order">
              <div class="b-items-in-basket">
                <p class="b-items-in-basket__name">Сумма заказа</p>
                <p class="b-items-in-basket__name">Количество</p>
                <p class="b-items-in-basket__name">Установка</p>
              </div>
              <div class="b-summary-by-points">
                <p class="b-summary-by-points__result">{{ computePrice }}</p>
                <p class="b-summary-by-points__result">{{ computeNumberOfProducts }}</p>
                <p class="b-summary-by-points__result" v-if="!needInstall || this.$store.getters.getProducts.length === 0">нет</p>
                <p class="b-summary-by-points__result" v-else>да</p>
              </div>
            </div>
            <div class="b-payment__total">
              <div class="b-amount-be-paid">
                <p class="b-amount-be-paid__text">Стоимость товаров</p>
                <p class="b-amount-be-paid__cost">{{ computePrice }} ₽</p>
              </div>
            </div>
            <div class="b-payment__button">
              <div class="b-order-execution">
                <button class="b-order-execution__making" @click="buyProducts">Оформить заказ</button>
                <button class="b-order-execution__one-click">Купить в 1 клик</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="b-page__line">
      <div class="b-previously-viewed">
        <div class="b-previously-viewed__heading">
          <div class="b-caption">
            <p class="b-caption__text">Просмотренные товары</p>
            <div class="b-caption__slider">
              <div class="b-button-slider">
                <button class="b-button-slider__left" :disabled="isFirst" @click="previousPage">-</button>
                <div class="b-button-slider__counter"><b>{{ computeCurrentPage }}</b>/{{ computeAllPage }}</div>
                <button class="b-button-slider__right" :disabled="isLast" @click="nextPage">+</button>
              </div>
            </div>
          </div>
        </div>
          <div v-if="computeViewProducts" class="b-previously-viewed__products">
            <div v-for="viewedProduct in computeViewProducts" :key="viewedProduct.id">
              <viewed-product-card :viewedProductsCard="viewedProduct"></viewed-product-card>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

import ProductCard from "@/components/ProductCard";
import axios from "axios"
import ViewedProductCard from "@/components/ViewedProductCard";

export default {
  name: 'App',
  data (){
    return {
      needInstall: false
    }
  },
  components: {ViewedProductCard, ProductCard},
  methods: {
    clearCart() {
      this.$store.dispatch('CLEAR_CART')
    },
    async buyProducts() {
      const params = {
        products: this.$store.getters.getProducts,
        needInstall: this.needInstall,
      }
      const { data } = await axios.post('test_url', params)
      return data
    },
    nextPage() {
      this.$store.dispatch('NEXT_PRODUCT')
    },
    previousPage() {
      this.$store.dispatch('PREVIOUS_PRODUCT')
    },
  },
  created() {
    this.$store.dispatch('INIT')
    this.$store.dispatch('VIEWED_INIT')
  },
  computed: {
    computePrice() {
      let sum = 0
      this.$store.getters.getProducts.forEach(function (item) {
        sum += item.total_price
      })
      return sum
    },
    computeNumberOfProducts() {
      let sum = 0
      this.$store.getters.getProducts.forEach(function (item) {
        sum += item.quantity
      })
      return sum
    },
    computeViewProducts() {
      const allProducts = this.$store.getters.getViewedProduct.products
      const pageNumber = this.$store.getters.getViewedProduct.pageNumber
      return allProducts.slice(pageNumber, pageNumber + 4)
    },
    computeCurrentPage() {
      return this.$store.getters.getViewedProduct.pageNumber + 1
    },
    isFirst() {
      return this.$store.getters.getViewedProduct.pageNumber === 0
    },
    computeAllPage() {
      return this.$store.getters.getViewedProduct.products.length - 3
    },
    isLast() {
      return this.computeCurrentPage === this.computeAllPage
    }
  }
}
</script>

<style>
@import './style.css';
</style>