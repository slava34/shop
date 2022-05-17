<template>
  <!--    start 1     -->
  <div class="b-product">
    <div class="b-product__foto">
      <a><img :src="require(`../assets/img/${product.image}`)"></a>
    </div>
    <div class="b-product__description">
      <div class="b-specification">
        <p class="b-specification__name">{{ product.name }}</p>
        <p class="b-specification__parameters">{{ product.description}}</p>
        <p class="b-specification__article">Артикул: {{ product.article }}</p>
      </div>
    </div>
    <div class="b-product__counter">
      <div class="counter-and-price">
        <div class="b-registrar">
          <button class="b-registrar__left-button" :disabled="isRemovable" @click="removeProductFromCart(-product.price)">-</button>
          <p class="b-registrar__result">{{ product.quantity }}</p>
          <button class="b-registrar__right-button" @click="addProductToCart(product.price)">+</button>
        </div>
        <div class="b-price-per-piece" v-if="!isRemovable">
          <p class="b-price-per-piece__style">{{ product.price }} ₽/шт.</p>
        </div>
      </div>
    </div>
    <div class="b-total-per-product">
      <p class="b-total-per-product__style">{{ product.total_price }} ₽</p>
    </div>
    <div class="b-delete-product">
      <div>
        <button class="b-delete-product__button" @click="deleteProduct"><img class="b-delete-product__img" src="../assets/img/kr.png"></button>
      </div>
    </div>
  </div>
  <!--    end 1    -->
</template>

<script>
export default {
  name: "ProductCard",
  props: ['product'],
  methods: {
    addProductToCart() {
      this.$store.dispatch('ADD_PRODUCT', this.product.id)
    },
    removeProductFromCart() {
      this.$store.dispatch('REMOVE_PRODUCT', this.product.id)
    },
    deleteProduct() {
      this.$store.dispatch('DELETE_PRODUCT', this.product);
    }
  },
  computed: {
    isRemovable() {
      return this.product.quantity === 1
    }
  }
}
</script>

<style scoped>
@import '../style.css';
</style>