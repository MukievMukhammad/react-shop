import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Button,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "./ProductCard";
import MarketPlaceAPI from "./api";
import AddToCart from "./AddToCart";
import { observer } from "mobx-react-lite";

const Stack = createStackNavigator();

function ProductLine({ navigation, id }) {
  const [product, setProduct] = useState({
    image: "https://farkopbelgorod.ru/wp-content/uploads/2021/04/notfound.png",
    title: "",
    price: "",
    description: "",
  });
  const [idProdLoaded, setIdProdLoaded] = useState(false);
  const axios = async () => {
    await MarketPlaceAPI.getStuff(id);
    setProduct(MarketPlaceAPI.stuff);
    setIdProdLoaded(true);
    MarketPlaceAPI.addToTotal(product.price); // todo: !!!!
  };
  if (!idProdLoaded) axios();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ddd",
        padding: 8,
        margin: 8,
        borderRadius: 5,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Product")}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: product.image }}
        />
      </TouchableOpacity>
      <Text style={{ flex: 0.7 }}>{product.title}</Text>
      <View>
        <Text>${product.price}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <AddToCart id={id} />
        </View>
      </View>
    </View>
  );
}

const Feed = observer(({ navigation }) => {
  const cart = MarketPlaceAPI.cart.filter((v, i, a) => a.indexOf(v) === i);
  const cartCount = () => {
    const counts = {};
    for (const num of MarketPlaceAPI.cart) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts;
  };
  let total = 0;
  MarketPlaceAPI.products.forEach((p) => {
    if (cart.includes(p.id)) total = total + p.price * cartCount()[p.id];
  });
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cart.map((id) => (
        <ProductLine navigation={navigation} id={id} key={id} />
      ))}

      <View
        style={{
          width: "90%",
          borderColor: "black",
          borderWidth: 1,
          alignSelf: "center",
        }}
      />
      <Text style={{ textAlign: "right", margin: 16, fontSize: 20 }}>
        Total: {parseFloat(total).toFixed(2)}
      </Text>
      <Button title='Pay' />
    </ScrollView>
  );
});

function Cart() {
  return (
    <Stack.Navigator
      initialRouteName='Feed'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Feed' component={Feed} />
      <Stack.Screen name='Product' component={ProductCard} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "90%",
    alignSelf: "center",
  },
});

export default Cart;
