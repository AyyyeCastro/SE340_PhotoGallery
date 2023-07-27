import { View, Image, Text } from 'react-native';

interface Props {
  name: string;
  image: string;
}


export const ContactCard = ({ name, image }: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
      }}
    >
      <Image
        source={{ uri: image }}
        style={{ width: 50, height: 50, borderRadius: 5 }}
      />
      <Text style={{ marginLeft: 10, fontSize: 18 }}>{name}</Text>

     
    </View>
  );
};