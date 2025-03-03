import React from 'react';
import { Button, View, Text } from 'react-native';
import { NativeModules } from 'react-native';

const { WidgetModule } = NativeModules;

const Widget = () => {
  const updateWidget = () => {
    // Mettre à jour le widget avec un message
    WidgetModule.updateWidget('Nouveau message');
  };

  return (
    <View>
      <Text>Cliquez sur le bouton pour mettre à jour le widget</Text>
      <Button title="Mettre à jour le widget" onPress={updateWidget} />
    </View>
  );
};

export default Widget;
