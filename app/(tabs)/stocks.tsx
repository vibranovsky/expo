import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Requests from '@/helpers/requests';
import { LinkButton } from '@/components/LinkButton';
import { useFocusEffect } from '@react-navigation/native';
import StockTable from '@/components/Table/StocksTable';

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
  const previousStocks = useRef<Stock[]>([]);

  const fetchStocks = async () => {
    try {
      const result = await Requests.getStocks();
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

  useEffect(() => {
    previousStocks.current = stocks;
  }, [stocks]);

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(fetchStocks, 5000);
      return () => clearInterval(interval);
    }, [])
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
            <StockTable stocks={stocks} previousStocks={previousStocks.current} />
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 8,
  },
});
