import React, {useRef} from 'react';
import {Text, StyleSheet, Animated, Pressable} from 'react-native';

const Cards = props => {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  let flipRotation = 0;
  flipAnimation.addListener(({value}) => (flipRotation = value));
  const flipToFrontStyle = {
    transform: [
      {
        rotateX: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateX: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        !props.isFlipped &&
          !props.isDisabled &&
          props.handleCardClick(props.index);
        !!flipRotation ? flipToBack() : flipToFront();
      }}>
      {!props.isFlipped && !props.isDisabled && !props.isInactive
        ? flipToBack()
        : null}
      <Animated.View style={{...props.style, ...flipToBackStyle}}>
        <Text>{props.value}</Text>
      </Animated.View>

      <Animated.View
        style={{...props.style, ...props.backstyle, ...flipToFrontStyle}}>
        <Text></Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignitems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    backgroudColor: 'red',
  },
  flipCard: {
    width: 110,
    height: 180,
    alignitems: 'center',
    justifyContent: 'center',
    backgroudColor: 'red',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
  },
});

export default Cards;
