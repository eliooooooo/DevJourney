import React, { useEffect, useState } from 'react';
import { Button, ScrollView, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '../../../context/ctx';
import axios from 'axios';

export default function LevelPage() {
  const colorScheme = useColorScheme() ?? 'light';
  const { id } = useLocalSearchParams();

  const [level, setLevel] = useState(null);
  const [value, setValue] = useState('');
  const [submited, setSubmited] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [explanation, setExplanation] = useState('');
  const [multiple, setMultiple] = useState([]);

  const { session, isLoading } = useSession();
  const { update } = useSession();
  const userId = session._id;
  const inputText = colorScheme === 'dark' ? 'white' : 'black';

  const [nextLevel, setNextLevel] = useState('');

  useEffect(() => {
    const fetchLevelData = async () => {
      try {
        const response = await fetch(`https://devjourney.elioooooo.fr/levels/${id}`);
        const result = await response.json();
        setSubmited(false);
        setFeedback('');
        setExplanation('');
        setLevel(result.level);
        setValue('');
        setNextLevel(result.nextLevelId);
        console.log("Level fetched");
      } catch (error) {
        console.error("Error fetching level:", error);
      }
    };

    fetchLevelData();
    console.log(nextLevel);
  }, [id]);

  useEffect(() => {
    if (level && level.type === "multiple" && level.subQuestion) {
      try {
        const parsedSubQuestion = level.subQuestion.split(',');
        setMultiple(parsedSubQuestion);
      } catch (error) {
        console.error("Error parsing subQuestion:", error);
      }
    }
  }, [level]);

  const handleSubmit = async (submit) => {
    console.log(submit);
    console.log(level.answer);
    if (submit.toLowerCase() === level.answer.toLowerCase()) {
      setFeedback("Correct answer!");
      update({
        _id: userId,
        level: session.level + 1,
        streak: session.streak + 1,
        bestStreak: Math.max(session.streak + 1, session.bestStreak),
      });
    } else {
      setFeedback("Wrong answer...");
      update({ _id: userId, level: session.level + 1, streak: 0 });

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            "model": "gpt-4o-mini",
            "messages": [{
                "role": "assistant",
                "content": `Explain in 2 phrases, why the answer "${submit}" is incorrect for the question "${level.question}". The correct answer is "${level.answer}".`
                }],
            "max_tokens": 100
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer API_KEY`,
            },
          }
        );

        const explanation = response.data.choices[0].message.content;
        setFeedback("Wrong answer...");
        setExplanation(explanation);
      } catch (error) {
        console.error('Error fetching explanation from OpenAI:', error);
        setFeedback("Wrong answer... Couldn't fetch explanation.");
      }
    }

    setSubmited(true);
  };

  if (!level) {
    return <ThemedText>Loading...</ThemedText>;
  }

  return (
    <ScrollView style={{ backgroundColor: colorScheme === "light" ? "#EAEAEA" : "#1E1E1E", padding: 16, paddingTop: 32 }} contentContainerStyle={{ display: 'flex', justifyContent: 'space-between', height: "100%", flexDirection: 'column' }}>
      <ThemedView>
        <ThemedView style={{ alignSelf: 'flex-start', marginBottom: 8 }}>
          <ThemedText style={{ fontSize: 16, backgroundColor: "rgba(81, 116, 244, 0.2)", width: 'fit-content', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 30 }}>
            {level.type}
          </ThemedText>
        </ThemedView>
        {level.title && <ThemedText>{level.title}</ThemedText>}
        <ThemedText style={{ fontSize: 20, fontWeight: 'bold' }}>{level.question}</ThemedText>
        {level.type === "multiple" ? null : <ThemedView style={{ paddingVertical: 24 }}><ThemedText>{level.subQuestion}</ThemedText></ThemedView>}
      </ThemedView>
      <ThemedView>
        {level.type === "boolean" ?
          <ThemedView style={{ paddingVertical: 32, display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
            <TouchableOpacity onPress={() => setValue("true")} style={{ backgroundColor: value === "true" ? '#5174F4' : colorScheme === "dark" ? '#EAEAEA' : "#F6F6F6", padding: 12, borderTopLeftRadius: 30, borderBottomLeftRadius: 30, flex: 1 }} disabled={submited}>
              <ThemedText style={{ color: value === "true" ? 'white' : 'black', fontSize: 16, textAlign: 'center' }}>True</ThemedText>
            </TouchableOpacity>
            <View style={{ width: 1, backgroundColor: colorScheme === "dark" ? '#1E1E1E' : "#EAEAEA" }} />
            <TouchableOpacity onPress={() => setValue("false")} style={{ backgroundColor: value === "false" ? '#5174F4' : colorScheme === "dark" ? '#EAEAEA' : "#F6F6F6", padding: 12, borderTopRightRadius: 30, borderBottomRightRadius: 30, flex: 1 }} disabled={submited}>
              <ThemedText style={{ color: value === "false" ? 'white' : 'black', fontSize: 16, textAlign: 'center' }}>False</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          : null}
        {level.type === "multiple" ?
          <ThemedView style={{ paddingVertical: 32, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <ThemedView style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
              <TouchableOpacity onPress={() => setValue(multiple[0])} style={{ backgroundColor: value === multiple[0] ? '#5174F4' : colorScheme === "dark" ? '#EAEAEA' : "#F6F6F6", padding: 12, borderTopLeftRadius: 30, flex: 1 }} disabled={submited}>
                <ThemedText style={{ color: value === multiple[0] ? 'white' : 'black', fontSize: 16, textAlign: 'center' }}>{multiple[0]}</ThemedText>
              </TouchableOpacity>
              <View style={{ width: 1, backgroundColor: colorScheme === "dark" ? '#1E1E1E' : "#EAEAEA" }} />
              <TouchableOpacity onPress={() => setValue(multiple[1])} style={{ backgroundColor: value === multiple[1] ? '#5174F4' : colorScheme === "dark" ? '#EAEAEA' : "#F6F6F6", padding: 12, borderTopRightRadius: 30, flex: 1 }} disabled={submited}>
                <ThemedText style={{ color: value === multiple[1] ? 'white' : 'black', fontSize: 16, textAlign: 'center' }}>{multiple[1]}</ThemedText>
              </TouchableOpacity>
            </ThemedView>
            <View style={{ height: 1, backgroundColor: colorScheme === "dark" ? '#1E1E1E' : "#EAEAEA" }} />
            <ThemedView style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
              <TouchableOpacity onPress={() => setValue(multiple[2])} style={{ backgroundColor: value === multiple[2] ? '#5174F4' : colorScheme === "dark" ? '#EAEAEA' : "#F6F6F6", padding: 12, borderBottomLeftRadius: 30, flex: 1 }} disabled={submited}>
                <ThemedText style={{ color: value === multiple[2] ? 'white' : 'black', fontSize: 16, textAlign: 'center' }}>{multiple[2]}</ThemedText>
              </TouchableOpacity>
              <View style={{ width: 1, backgroundColor: colorScheme === "dark" ? '#1E1E1E' : "#EAEAEA" }} />
              <TouchableOpacity onPress={() => setValue(multiple[3])} style={{ backgroundColor: value === multiple[3] ? '#5174F4' : colorScheme === "dark" ? '#EAEAEA' : "#F6F6F6", padding: 12, borderBottomRightRadius: 30, flex: 1 }} disabled={submited}>
                <ThemedText style={{ color: value === multiple[3] ? 'white' : 'black', fontSize: 16, textAlign: 'center' }}>{multiple[3]}</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
          : null}
        {level.type === 'input' ?
          <ThemedView style={{ paddingVertical: 32, display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
            <TextInput
              placeholder="Your answer"
              placeholderTextColor={'gray'}
              onChangeText={(text) => setValue(text.toLowerCase())}
              value={value}
              style={{ padding: 10, borderColor: 'gray', borderWidth: 1, color: inputText, width: '100%' }}
              editable={!submited} // Désactiver l'input après soumission
            />
          </ThemedView>
          : null}
      </ThemedView>
      <ThemedView style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => handleSubmit(value)} style={{ backgroundColor: '#5174F4', padding: 12, borderRadius: 30, width: '100%', display: submited === false ? 'flex' : 'none' }}>
          <ThemedText style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Submit</ThemedText>
        </TouchableOpacity>
        <ThemedText style={{ fontSize: 16, fontWeight: 'bold' }}>{feedback}</ThemedText>
        <ThemedText style={{ fontSize: 16 }}>{explanation}</ThemedText>
        {nextLevel !== '' && nextLevel != level.id ? <Link href={`/(app)/level/${nextLevel}`} style={{ backgroundColor: '#5174F4', padding: 12, borderRadius: 30, width: '100%', display: submited === false ? 'none' : 'flex', marginTop: 16 }}>
          <ThemedText style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Next level</ThemedText>
        </Link> : null}
        {nextLevel == level.id ? <ThemedText style={{ fontSize: 16, display: submited === false ? 'none' : 'flex' }}>You have finished the game, thank you !</ThemedText> : null}
        {nextLevel == level.id ? <Link href="/" style={{ backgroundColor: '#5174F4', padding: 12, borderRadius: 30, width: '100%', display: submited === false ? 'none' : 'flex', marginTop: 16 }}>
          <ThemedText style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Go back to home</ThemedText>
        </Link> : null}
      </ThemedView>
    </ScrollView>
  );
}