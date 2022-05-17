import Vue from 'vue'
import Vuex from 'vuex'
import products from "@/products";
import viewedProduct from "@/viewedProductsCard";
Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: null,
        viewedProduct: null
    },
    actions: {
        INIT ({commit}) {
            commit('INIT')
        },
        VIEWED_INIT ({commit}) {
            commit('VIEWED_INIT')
        },
        ADD_PRODUCT ({commit}, productId) {
            commit('ADD_PRODUCT', productId)
        },
        REMOVE_PRODUCT ({commit}, productId) {
            commit('REMOVE_PRODUCT', productId)
        },
        DELETE_PRODUCT ({commit}, currentProduct) {
            commit('DELETE_PRODUCT',currentProduct)
        },
        CLEAR_CART ({commit}) {
            commit('CLEAR_CART')
        },
        NEXT_PRODUCT ({commit}) {
            commit('NEXT_PRODUCT')
        },
        PREVIOUS_PRODUCT ({commit}) {
            commit('PREVIOUS_PRODUCT')
        },
    },
    mutations: {
        INIT: (state) => {
            state.products = products;
        },
        VIEWED_INIT: (state) => {
            state.viewedProduct = viewedProduct;
        },
        ADD_PRODUCT: (state, productId) => {
            state.products.forEach(function(product) {
                if (product.id === productId) {
                    product.quantity++
                    product.total_price += product.price
                }
            });
        },
        REMOVE_PRODUCT: (state, productId) => {
            state.products.forEach(function(product) {
                if (product.id === productId) {
                    product.quantity--
                    product.total_price -= product.price
                }
            });
        },
        DELETE_PRODUCT: (state, currentProduct) => {
            state.products = state.products.filter(product => product.id !== currentProduct.id);
            state.price -= currentProduct.total_price;
        },
        CLEAR_CART: state => state.products = [],
        NEXT_PRODUCT: (state) => {
            state.viewedProduct.pageNumber ++
        },
        PREVIOUS_PRODUCT: (state) => {
            state.viewedProduct.pageNumber --
        }
    },
    getters: {
        getProducts(state) {
            return state.products;
        },
        getViewedProduct(state) {
            return state.viewedProduct;
        },
    }
});

export default store;