import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Button,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Spinner,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "./ProductCard";
import MarketPlaceAPI from "./api";
import { observer } from "mobx-react-lite";
import AddToCart from "./AddToCart";

const Stack = createStackNavigator();

function Product({ navigation, product }) {
  return (
    <View style={styles.product}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductCard", { id: product.id })}
      >
        <Image style={styles.productImage} source={{ uri: product.image }} />
      </TouchableOpacity>
      <Text style={{ marginVertical: 8, fontSize: 20 }}>{product.title}</Text>
      <View style={styles.actions}>
        <Button title='Like' />
        <Text style={{ fontSize: 20 }}>${product.price}</Text>
        <AddToCart id={product.id} />
      </View>
    </View>
  );
}

function Feed({ navigation }) {
  const [idProdLoaded, setIdProdLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const prod = async () => {
    await MarketPlaceAPI.getProducts();
    setProducts(MarketPlaceAPI.products);
    setIdProdLoaded(true);
  };
  if (!idProdLoaded) prod();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {(typeof products !== "undefined") & (products.length > 0) ? (
        products.map((p) => (
          <Product navigation={navigation} product={p} key={p.id} />
        ))
      ) : (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text>Loading...</Text>
        </View>
      )}
    </ScrollView>
  );
}

const Home = observer(() => {
  return (
    <Stack.Navigator
      initialRouteName='Feed'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='Feed'
        component={Feed}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => alert("This is a button!")}
              title='Info'
              color='#00cc00'
            />
          ),
        }}
      />
      <Stack.Screen name='ProductCard' component={ProductCard} />
    </Stack.Navigator>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  productImage: {
    width: 300,
    height: 300,
    borderRadius: 5,
  },
  product: {
    width: "70%",
    margin: 20,
    alignSelf: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default Home;
