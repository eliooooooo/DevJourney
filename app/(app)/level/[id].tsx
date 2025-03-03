import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Touchable, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '../../../context/ctx';
import axios from 'axios';

export default function LevelPage() {
  const { id } = useLocalSearchParams();

  const [level, setLevel] = useState([]);
  const [value, setValue] = useState('');
  const [submited, setSubmited] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [explanation, setExplanation] = useState('');

  const { session, isLoading } = useSession();
  const { update } = useSession();
  const userId = session._id;

  useEffect(() => {
    console.log(value);
    setValue('');
    setSubmited(false);
    setFeedback('');
  }, []);

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

  const handleSubmit = async (submit) => {
    console.log('submit:', submit);
    console.log('answer:', level.answer);

    if (submit === level.answer) {
      setFeedback("Correct answer!");
      if(session.streak + 1 > session.bestStreak) {
        update({ _id: userId, level: session.level + 1, streak: session.streak + 1, bestStreak: session.streak + 1 });
      } else {
        update({ _id: userId, level: session.level + 1, streak: session.streak + 1 });
      }
    } else {
      setFeedback("Wrong answer...");
      // Update the user's level and streak
      update({ _id: userId, level: session.level + 1, streak: 0 });

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            "model": "gpt-4o-mini",
            "messages": [{
                "role": "assistant",
                "content": `Explain why the answer "${submit}" is incorrect for the question "${level.question}". The correct answer is "${level.answer}".`
                }],
            "max_tokens": 150
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer API_KEY`,
            },
          }
        );
        
        const explanation = response.data.choices[0].message.content;
        setFeedback(`Wrong answer...`);
        setExplanation(explanation);
      } catch (error) {
        console.error('Error fetching explanation from OpenAI:', error);
        setFeedback("Wrong answer... Couldn't fetch explanation.");
      }
    }

    setSubmited(true);
  };

  return (
    <ScrollView style={{ backgroundColor: "#EAEAEA", padding: 16, paddingTop: 32 }} contentContainerStyle={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }} >
      <ThemedView>
        <ThemedView style={{ alignSelf: 'flex-start', marginBottom: 8 }} >
          <ThemedText style={{ fontSize: 16, backgroundColor: '#939292', width: 'fit-content', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 30, color: 'white' }}>
            {level.type}
          </ThemedText> 
        </ThemedView>
        { level.title != null ? <ThemedText >{level.title}</ThemedText> : null }
        <ThemedText style={{ fontSize: 20, fontWeight: 'bold' }} >{level.question}</ThemedText>
        { level.subQuestion != null ? <ThemedView style={{ paddingVertical: 24 }} ><ThemedText>{level.subQuestion}</ThemedText></ThemedView> : null }
      </ThemedView>
      <ThemedView >
        <ThemedView style={{ paddingVertical: 32, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'stretch' }} >
          <Button onPress={() => setValue("true")} title="True" color={value === "true" ? 'red' : 'blue'} />
          <Button onPress={() => setValue("false")} title="False" color={value === "false" ? 'red' : 'blue'} />
        </ThemedView>
      </ThemedView>
      <ThemedView style={{ display: value != null ? 'flex' : 'none', flexDirection: 'row', justifyContent: 'center' }} >
        <TouchableOpacity onPress={() => handleSubmit(value)} style={{ backgroundColor: '#FFD700', padding: 12, borderRadius: 30, width: '100%', display: submited === false ? 'flex' : 'none' }} >
          <ThemedText style={{ color: 'black', fontSize: 16, textAlign: 'center' }} >Submit</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView>
        <ThemedText style={{ fontSize: 16, fontWeight: 'bold' }} >{feedback}</ThemedText>
        <ThemedText style={{ fontSize: 16 }} >{explanation}</ThemedText>
      </ThemedView>
    </ScrollView>
  );
};
