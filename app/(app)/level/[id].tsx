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
      <ThemedText>Level: {level.number}</ThemedText>
      <ThemedText>Question : {level.question}</ThemedText>
      <ThemedText>Difficulty : {level.difficulty}</ThemedText>
      <ThemedText>Type : {level.type}</ThemedText>
      <ScrollView>
        <ThemedView>

        </ThemedView>
      </ScrollView>
    </ScrollView>
  );
};
