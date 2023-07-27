import { useState } from 'react';
import {Alert, FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { ContactCard } from './ContactCard';
import { StyleSheet } from 'react-native';


// StyleSheet should always live OUTSIDE of your component
const styles = StyleSheet.create({
    // viewbox
    view: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // the text input
    textInput: {
        borderWidth: 1, 
        paddingHorizontal: 10, 
        width: '50%', 
        marginVertical: 60
      },
  });

const CONTACTS = [
    {
      id: '1',
      name: 'Dennis',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: '2',
      name: 'Sweet Dee',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: '3',
      name: 'Frank',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: '4',
      name: 'Mac',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
  ];

export const ContactList = ()=>{
    const[searchQuery, setSearchQuery]= useState('');
    const[activeContacts, setActiveContacts]=useState(CONTACTS);

    // handle presses (contact Card)
    const handleOnPress=(name: string)=>{
        Alert.alert(`CLICKED ${name} row`)
    }

    const renderItem=({item}: any)=>{

        return(
            <TouchableOpacity onPress={()=>handleOnPress(item.name)}> 
                <ContactCard name={item.name} image={item.image} />
            </TouchableOpacity>
        );
    } //only jsx only needs parenthesis, but this works as well. Both are fine.


    const search=(query: string)=>{
        const filteredContacts = CONTACTS.filter((contact)=>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()));
        
        setActiveContacts(filteredContacts);
        setSearchQuery(query);
    }
    
    return(
        <View style={styles.view}>
            <Text>
                Contact Card
            </Text>


            <TextInput 

            //value can be optional. (?) if you're using State . But may not be able to extract value. (?)
            value={searchQuery}// since searchQuery is blank string by default, it sets as a blank string.
            onChangeText={search} //sets the searchQuery to the text grabbed by the js element.
            placeholder="Search Here" 
            style={styles.textInput}/>
            

            <FlatList 
                data={activeContacts} // ex. List of contacts
                keyExtractor={(item)=>item.id} // ex. uniquely indentify each item in the list via keys
                renderItem={renderItem}
            />
            
        </View>
    )
}