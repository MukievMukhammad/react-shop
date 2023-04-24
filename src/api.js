import axios from "axios";
import { makeAutoObservable } from "mobx";
import React, { useState } from "react";

// const Client = axios.create({
//   baseURL: "https://search.wb.ru",
//   timeout: 1000,
// });

const Client = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 1000,
});

class MarketPlaceAPI {
  products = [];
  stuff = [];
  cart = [];
  cartTotal = 0;

  constructor() {
    makeAutoObservable(this);
  }

  async getProducts() {
    await Client.get("/products")
      .then((response) => {
        this.products = response["data"];
      })
      .catch((error) => {
        console.log("Error in getProducts");
        console.log(error);
      });
  }

  async getStuff(id) {
    await Client.get("/products/" + id)
      .then((response) => {
        this.stuff = response["data"];
      })
      .catch((error) => {
        console.log("Error in getStuff");
        console.log(error);
      });
  }

  addToCart(product) {
    this.cart.push(product);
  }

  popItem(product) {
    var index = this.cart.indexOf(product);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }

  addToTotal(price) {
    this.cartTotal = this.cartTotal + Number(price);
    console.log(this.cartTotal);
  }

  subtractFromTotal(price) {
    this.cartTotal = this.cartTotal - Number(price);
    console.log(this.cartTotal);
  }
}

export default new MarketPlaceAPI();
