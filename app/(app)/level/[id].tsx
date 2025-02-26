import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LevelPage() {
  // Utilisez useLocalSearchParams pour récupérer les paramètres de l'URL
  const { id } = useLocalSearchParams();

  const [level, setLevel] = useState([]);

  useEffect(() => {
      fetch(`https://devjourney.elioooooo.fr/levels/${id}`)
          .then(res => res.json())
          .then(
              (result) => {
                  setLevel(result);
                  console.log("Level fetched");
              },
              (error) => {
                  console.error("Error fetching level:", error);
              }
          );
  }, []);

  const handleSubmit = (submit) => {
    if (submit == level.answer) {
      console.log("Correct answer");
    } else {
      console.log("Wrong answer");
      // implémenter ici la logique de feedback par l'API OpenAI
  }};

  return (
    <ScrollView>
      <ThemedView style={{ padding: 16 }} >
        <ThemedView style={{ alignSelf: 'flex-start', marginBottom: 8 }} >
          <ThemedText style={{ fontSize: 16, backgroundColor: '#939292', width: 'fit-content', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 30, color: 'white' }}>
            {level.type}
          </ThemedText> 
        </ThemedView>
        <ThemedText style={{ fontSize: 20, fontWeight: 'bold' }} >{level.question}</ThemedText>
      </ThemedView>
      <ThemedView style={{ padding: 16 }} >
        
      </ThemedView>
    </ScrollView>
  );
};
