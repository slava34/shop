import Vue from 'vue'
import Vuex from 'vuex'
import products from "@/products";
import viewedProduct from "@/viewedProductsCard";
Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        // price: null,
        // numberOfProducts: 0,
        // needInstall: false,
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
        // UPDATE_PRICE ({commit}, productPrice) {
        //     commit('UPDATE_PRICE', productPrice)
        // },
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
        // UPDATE_PRICE: (state, productPrice) => {
        //     state.price += productPrice;
        // },
        ADD_PRODUCT: (state, productId) => {
            // state.numberOfProducts++;
            state.products.forEach(function(product) {
                if (product.id === productId) {
                    product.quantity++
                    product.total_price += product.price
                }
            });
        },
        REMOVE_PRODUCT: (state, productId) => {
            // state.numberOfProducts--;
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
        // QUANTITY_PRODUCT: state => !state.needInstall,
        NEXT_PRODUCT: (state) => {
            state.viewedProduct.pageNumber ++
        },
        PREVIOUS_PRODUCT: (state) => {
            state.viewedProduct.pageNumber --
        }
    },
    getters: {
        // getPrice(state) {
        //     return state.price;
        // },
        // getNumberOfProducts(state) {
        //     return state.numberOfProducts;
        // },
        getProducts(state) {
            return state.products;
        },
        // getNeedInstall(state) {
        //     return state.needInstall;
        // }
        getViewedProduct(state) {
            return state.viewedProduct;
        },
    }
});

export default store;