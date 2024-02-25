import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Link, useRouter } from 'expo-router';

const Home: React.FC = () => {
  console.log("home");
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#f1f1f1' }}>
        <Text>BOK</Text>
        <TouchableOpacity
              onPress={() => {
                router.push(`/customers/2`)
              }}>
              <Text>2</Text>
            </TouchableOpacity>
      </View>
      {/* Rest of your Home content here */}
    </SafeAreaView>
  );
};

export default Home;
