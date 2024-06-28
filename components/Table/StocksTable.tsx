import React from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import StockRow from './StocksRow'

interface Stock {
  symbol: string;
  price: string;
  bestBidPrice: string;
  bestAskPrice: string;
  bestAskSize: string;
}

interface StockTableProps {
  stocks: Stock[];
  previousStocks: Stock[];
}

const StockTable: React.FC<StockTableProps> = ({ stocks, previousStocks }) => {
  return (
    <View style={styles.table}>
      <View style={styles.header}>
        <Text style={styles.headerCell}>Symbol</Text>
        <Text style={styles.headerCell}>Price</Text>
        <Text style={styles.headerCell}>Best Bid Price</Text>
        <Text style={styles.headerCell}>Best Ask Price</Text>
        <Text style={styles.headerCell}>Best Ask Size</Text>
      </View>
      <ScrollView>
        {stocks.map((stock, index) => {
          const previousStock = previousStocks.find((s) => s.symbol === stock.symbol);
          return <StockRow key={stock.symbol} stock={stock} previousStock={previousStock} last={index === stocks.length - 1} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#000',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default StockTable;
