import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, SharedValue } from 'react-native-reanimated';

interface Stock {
  symbol: string;
  price: string;
  bestBidPrice: string;
  bestAskPrice: string;
  bestAskSize: string;
}
interface StockRowProps {
  stock: Stock
  previousStock?: Stock,
  last: boolean
}

const updateColor = (currentValue: string, previousValue: string, colorSharedValue: SharedValue<string>): void => {
  if (parseFloat(currentValue) > parseFloat(previousValue)) {
    colorSharedValue.value = 'green';
  } else if (parseFloat(currentValue) < parseFloat(previousValue)) {
    colorSharedValue.value = 'red';
  } else {
    colorSharedValue.value = 'transparent';
  }

  colorSharedValue.value = withTiming('transparent', { duration: 1000 });
};

const StockRow: React.FC<StockRowProps> = ({ stock, previousStock, last }) => {
  const priceColor = useSharedValue('transparent');
  const bestBidPriceColor = useSharedValue('transparent');
  const bestAskPriceColor = useSharedValue('transparent');
  const bestAskSizeColor = useSharedValue('transparent');


  useEffect(() => {
    if (previousStock) {
      updateColor(stock.price, previousStock.price, priceColor);
      updateColor(stock.bestBidPrice, previousStock.bestBidPrice, bestBidPriceColor);
      updateColor(stock.bestAskPrice, previousStock.bestAskPrice, bestAskPriceColor);
      updateColor(stock.bestAskSize, previousStock.bestAskSize, bestAskSizeColor);
    }
  }, [stock.price, stock.bestBidPrice, stock.bestAskPrice, stock.bestAskSize]);

  const priceAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: priceColor.value,
  }));

  const bestBidPriceAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: bestBidPriceColor.value,
  }));

  const bestAskPriceAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: bestAskPriceColor.value,
  }));

  const bestAskSizeAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: bestAskSizeColor.value,
  }));

  return (
    <View style={[styles.row]}>
      <View style={[styles.cell]}>
        <Text >{stock.symbol}</Text>
      </View>
      <Animated.View style={[styles.cell, priceAnimatedStyle]}>
        <Text>{stock.price}</Text>
      </Animated.View>
      <Animated.View style={[styles.cell, bestBidPriceAnimatedStyle]}>
        <Text >{stock.bestBidPrice}</Text>
      </Animated.View>
      <Animated.View style={[styles.cell, bestAskPriceAnimatedStyle]}>
        <Text >{stock.bestAskPrice}</Text>
      </Animated.View>
      <Animated.View style={[styles.cell, bestAskSizeAnimatedStyle, styles.last]}>
        <Text>{stock.bestAskSize}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
    borderLeftWidth: 1,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems:'center',
    textAlign: 'center',
  },
  last: {
    borderRightWidth: 1
  }
});

export default StockRow;
