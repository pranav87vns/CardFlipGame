import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  style,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import Cards from '../../../src/components/Cards';
import CardsArray from './CardsArray.json';
import {shuffleCards, getIdArray, sortByKey, out} from '../../utils';

const CardBoard = () => {
  const [cards, setCards] = useState(CardsArray);
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const timeout = useRef(null);

  const evaluate = () => {
    const [first, second] = openCards;
    enable();

    if (cards[first].value === cards[second].value) {
      setClearedCards(prev => ({...prev, [cards[first].value]: true}));
      setOpenCards([]);

      return;
    }

    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 1000);
  };

  const handleCardClick = index => {
    if (openCards.length === 1) {
      setOpenCards(prev => [...prev, index]);
      setMoves(moves => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === CardsArray.length / 2) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      setTimeout(evaluate, 500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  const checkIsFlipped = index => {
    return openCards.includes(index);
  };

  const checkIsInactive = card => {
    return Boolean(clearedCards[card.value]);
  };

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const handleRestart = () => {
    setShowModal(false);
    setClearedCards({});
    setOpenCards([]);

    setMoves(0);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(CardsArray);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topcontainer}>
        <Text style={styles.text}>count {moves}</Text>
        <Button onPress={handleRestart} title="Reset" color="#841584" />
      </View>
      <FlatList
        style={{margin: 5}}
        numColumns={3}
        columnWrapperStyle={styles.row}
        data={cards}
        keyExtractor={item => item.id}
        renderItem={(data, item) => (
          <Cards
            style={styles.card}
            backstyle={styles.backcard}
            value={data.item.value}
            handleCardClick={() => handleCardClick(data.item.id)}
            isInactive={checkIsInactive(data.item)}
            isFlipped={checkIsFlipped(data.item.id)}
            index={data.item.id}
            isDisabled={shouldDisableAllCards}
          />
        )}
      />
      {showModal
        ? Alert.alert('Congratulations', 'You Won!!', [
            {text: 'OK', onPress: () => handleRestart()},
          ])
        : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 8,
  },
  topcontainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    margin: 5,
  },
  card: {
    height: 170,
    width: '90%',
    backgroundColor: '#f18484',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  backcard: {
    backgroundColor: '#ADD8E6',
    position: 'absolute',
    top: 0,
  },
  text: {
    color: '#841584',
    marginTop: 10,
  },
});

export default CardBoard;
