import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';

const TextAnimated = () => {
  const screenWidth = Dimensions.get('window').width;

  const words = [
    { text: 'HAPPY😍', color: 'rgb(255, 105, 180)' }, // Pink
    { text: 'BIRTHDAY🎂', color: 'rgb(100, 149, 237)' }, // Cornflower Blue
    {text: ' TO🎈', color: 'rgb(255, 165, 0)' }, // Orange
    {text: 'YOU🎁', color: 'rgb(0, 255, 21)' }, // Orange
    { text: 'BESTIE👸', color: 'rgb(241, 27, 45)' }, // Orange
    { text: '🎁💖🎈🎂🎈💖🧕', color: 'hsl(16.235294117647058, 100%, 50%)' } // Red-Orange
  ];


  const animatedValues = useRef(words.map(() => ({
    position: new Animated.ValueXY({ x: screenWidth / 1, y: screenWidth / 1 }), // Center horizontally initially
    opacity: new Animated.Value(0),
    scale: new Animated.Value(0.5),
    rotate: new Animated.Value(0),
  }))).current;

  useEffect(() => {
    const animations = animatedValues.map((animatedValue, index) => {
      return Animated.parallel([
        Animated.timing(animatedValue.position, {
          toValue: {
            x: 0,
            y: (screenWidth / words.length) * index + (screenWidth / words.length / 2) - (screenWidth / (words.length * 1)), // Keep vertical position constant
          },
          duration: 6000, // Increased duration for position
          delay: index * 500, // Stagger the animation for each word
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue.opacity, {
          toValue: 1, // Fade in effect
          duration: 2000, // Increased duration for opacity
          delay: index * 500, // Stagger the animation for each word
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue.scale, {
          toValue: 1.5, // Scale up to normal size
          duration: 2000, // Increased duration for scale
          delay: index * 500, // Stagger the animation for each word
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue.rotate, {
          toValue: 1, // Rotate slightly
          duration: 4000, // Increased duration for rotation
          delay: index * 500, // Stagger the animation for each word
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.stagger(500, animations).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        {words.map((wordObj, index) => {
          const { text, color } = wordObj;
          const { position, opacity, scale, rotate } = animatedValues[index];
          return (
            <Animated.View
              key={index}
              style={[
                styles.wordContainer,
                {
                  transform: [
                    ...position.getTranslateTransform(),
                    { scale },
                    {
                      rotate: rotate.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '-5deg'] // Rotate slightly
                      })
                    }
                  ],
                  opacity,
                }
              ]}
            >
              <Text style={[styles.text, { color }]}>{text}</Text>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 70, // Add padding to avoid clipping
  },
  textRow: {
    flexDirection: 'row', // Arrange children in a row
    alignItems: 'center', // Center vertically
    flexWrap: 'wrap', // Allow wrapping if needed
    justifyContent: 'center', // Center items horizontally
    width: '100%', // Ensure the row spans the full width of the container
  },
  wordContainer: {
    // Space between words
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000000', // Black shadow
    textShadowOffset: { width: 5, height: 2 }, // Offset for shadow
    textShadowRadius: 3, // Blur radius for shadow
    padding: 10, // Padding around text
    borderRadius: 10, // Rounded corners for the background
    overflow: 'hidden', // Ensure text doesn't overflow container
  },
});

export default TextAnimated;
