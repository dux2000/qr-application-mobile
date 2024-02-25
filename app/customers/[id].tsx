import { useLocalSearchParams } from 'expo-router';
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native';

const Customer = () => {
  const local = useLocalSearchParams();
  return (
    <Text>{local.id}</Text>
  )
}

export default Customer