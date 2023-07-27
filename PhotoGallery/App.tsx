import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import { ContactList } from './ContactList';  -- Not needed for this project. But, would like to keep for future referencing.
import GalleryView from './GalleryView';


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

     {/* <ContactList/>  -- Not needed for this project. But, would like to keep for future referencing.*/}
      
     <GalleryView />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


