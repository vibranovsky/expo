import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Requests from '@/helpers/requests';
import { LinkButton } from '@/components/LinkButton';
import { useFocusEffect } from '@react-navigation/native';

interface Stock {
  symbol: string;
  price: string;
  bestBidPrice: string;
  bestAskPrice: string;
  bestAskSize: string;
}

export default function StocksScreen() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStocks = async () => {
    try {
      const result = await Requests.getStocks()
      setStocks(result);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Ошибка');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(fetchStocks, 5000);
      return () => clearInterval(interval);
    }, [])
  );

  const renderItem = ({ item }: { item:Stock }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.symbol}</Text>
      <Text style={styles.cell}>{item.price}</Text>
      <Text style={styles.cell}>{item.bestBidPrice}</Text>
      <Text style={styles.cell}>{item.bestAskPrice}</Text>
      <Text style={styles.cell}>{item.bestAskSize}</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <LinkButton style={styles.link} to="/" text="О приложении" />
      <View style={styles.content}>
        <Text style={styles.title}>Список котировок</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {error && <Text style={styles.error}>{error}</Text>}
            <FlatList
              data={stocks}
              renderItem={renderItem}
              keyExtractor={(item) => item.symbol}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  content: {
    flex: 1,
  },
  link: {
    alignSelf: 'flex-start',
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 40,
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 8,
  },
});
