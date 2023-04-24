import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import {
  Button,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MarketPlaceAPI from "./api";

const AddToCart = observer(({ id }) => {
  const cartCount = () => {
    const counts = {};
    for (const num of MarketPlaceAPI.cart) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts;
  };
  const count = cartCount()[id] ?? 0;

  return (
    <View style={{ marginBottom: 20 }}>
      {count !== 0 ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button
            title='-'
            onPress={async () => {
              MarketPlaceAPI.popItem(id);
              await MarketPlaceAPI.getStuff(id);
            }}
          />
          <Text>{count}</Text>
          <Button
            title='+'
            onPress={async () => {
              MarketPlaceAPI.addToCart(id);
              await MarketPlaceAPI.getStuff(id);
            }}
          />
        </View>
      ) : (
        <Button
          title='Add to Cart'
          onPress={async () => {
            MarketPlaceAPI.addToCart(id);
            await MarketPlaceAPI.getStuff(id);
            // MarketPlaceAPI.addToTotal(MarketPlaceAPI.stuff.price);
            // setCount(cartCount()[id]);
          }}
        />
      )}
    </View>
  );
});

export default AddToCart;
