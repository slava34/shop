<template>
  <div class="b-viewed-product-card">
    <div class="b-viewed-product-card__foto">
      <img :src="require(`../assets/img/${viewedProductsCard.image}`)">
    </div>
    <div class="b-viewed-product-card__description">
      <div class="b-viewed-product-specification">
        <p class="b-viewed-product-specification__name">{{ viewedProductsCard.name }}</p>
        <p class="b-viewed-product-specification__detailed"> {{ viewedProductsCard.description }}</p>
        <p class="b-viewed-product-specification__price-rubles">{{ viewedProductsCard.priceRubMin }} ₽ – {{ viewedProductsCard.priceRubMax }} ₽ </p>
        <p class="b-viewed-product-specification__price-euro">{{ viewedProductsCard.priceEuroMin }} € – {{ viewedProductsCard.priceEuroMax }} €</p>
      </div>
    </div>
    <div class="b-viewed-product-card__button">
      <button class="b-learn-button">Подробнее</button>
    </div>
  </div>
</template>

<script>
export default {
name: "ViewedProductCard",
props: ['viewedProductsCard'],
}
</script>

<style scoped>
@import '../style.css';
</style>