import React, { useState } from "react";
import { View, Image, Text, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AddToCart from "./AddToCart";
import MarketPlaceAPI from "./api";

function ProductCard({ navigation, route }) {
  const [product, setProduct] = useState({
    image: "https://farkopbelgorod.ru/wp-content/uploads/2021/04/notfound.png",
    title: "",
    price: "",
    description: "",
  });
  const [idProdLoaded, setIdProdLoaded] = useState(false);
  const axios = async () => {
    await MarketPlaceAPI.getStuff(route.params.id);
    setProduct(MarketPlaceAPI.stuff);
    setIdProdLoaded(true);
  };
  if (!idProdLoaded) axios();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: "#007AFF", fontSize: 20 }}>Go Back</Text>
      </TouchableOpacity>
      <Image
        style={{ width: "100%", height: "40%", borderRadius: 5 }}
        source={{ uri: product.image }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button title='Like' />
        <Text style={{ fontSize: 20, fontWeight: "500", flex: 0.8 }}>
          {product.title}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "500", color: "green" }}>
          ${product.price}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "500",
          width: "80%",
          alignSelf: "center",
        }}
      >
        {product.description}
      </Text>
      <View style={{ marginBottom: 20 }}>
        {(typeof MarketPlaceAPI.cart !== "undefined") &
        MarketPlaceAPI.cart.includes(route.params.id) ? (
          <AddToCart id={route.params.id} />
        ) : (
          <Button
            title='Add to Cart'
            onPress={() => MarketPlaceAPI.addToCart(route.params.id)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around",
  },
});

export default ProductCard;
