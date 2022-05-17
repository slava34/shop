<template>
  <div class="b-viewed-product-card">
    <div class="b-viewed-product-card__foto">
      <img :src="require(`../assets/img/${viewedProductsCard.image}`)">
    </div>
    <div class="b-viewed-product-card__description">
      <div class="b-viewed-product-specification">
        <p class="b-viewed-product-specification__name">{{ viewedProductsCard.name }}</p>
        <p class="b-viewed-product-specification__detailed"> {{ viewedProductsCard.id }}</p>
        <p class="b-viewed-product-specification__price-rubles">6 848 ₽ – 56 584 ₽ </p>
        <p class="b-viewed-product-specification__price-euro">77.60 € – 643.86 €</p>
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