// ----- Imports ---- //
import React, { useState } from 'react';
import { View, Image, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';

// ----- Stylesheet ---- //

/* 
  Andrew's future self note:
  For this project I am utilizing a blur package that can apply over componenets via Expo CLI. 
  > npx expo install expo-blur
  > import { BlurView } from 'expo-blur';
*/

const styles = StyleSheet.create({
  /* Some sourced from: https://reactnative.dev/docs/flexbox */
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    padding: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '32%', // 3 photos in a row with some spacing in between
    aspectRatio: 1, // Ensure images maintain their aspect ratio
    marginBottom: 5, // Spacing between rows
    marginLeft: 5,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },

  /* Important: read above notes regarding Blurring */
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullImage: {
    width: '90%',
    aspectRatio: 1,
  },
  textInput: {
    textAlign: 'center',
    height: '4%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 50,
  },
});


// Define ImageData interface code from Canvas WK2: Photo Gallery Assignment
interface ImageData {
  id: number;
  url: string;
}

// Loop provided from Canvas WK2: Photo Gallery HW Assignment
const imageData: ImageData[] = [];
for (let i = 151; i < 250; i++) {
  imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
}


const GalleryView = () => {

  // default image should be empty. 
  const [selectedImage, setSelectedImage] = useState<string>('');

  // when clicking an image, set the Selected image to the url of the image selected.
  const HandleOnPressGrid = (image: ImageData) => {
    setSelectedImage(image.url);
  };

  /* IMPORTANT:
     Set it back to an empty string when tapped again, to go back to grid view 
  */
  const HandleOnPressFullscreen = () => {
    setSelectedImage('');
  };

  // default state should be an empty string
  const [searchQuery, setSearchQuery] = useState('');


  const renderGridItem = ({ item }: { item: ImageData }) => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => HandleOnPressGrid(item)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>
    );
  };

  //Note: overall logic trys to follow the ContactList component. 
  const filteredImage = imageData.filter((image) =>
    image.id.toString().includes(searchQuery)
  );

  return (
    
    <View style={styles.container}>
      {/* Search input */}
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Find Photo (ID)"
        style={styles.textInput}
      />

      <FlatList
        data={filteredImage}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3} // Display images in a grid with 3 columns
        renderItem={renderGridItem}
      />

      {/* When image tapped -> fullscreen it */}
      {selectedImage !== '' && (
        <TouchableOpacity
          style={styles.blurContainer}
          onPress={HandleOnPressFullscreen}
          activeOpacity={1}
        >
          {/* Use the Expo BlurView for the semi-transparent background with blur effect */}
          <BlurView intensity={100} style={styles.blurContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </BlurView>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GalleryView;
