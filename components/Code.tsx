import React from 'react';
import { Text, ScrollView } from 'react-native';

const Code: React.FC = () => {
    const codeString = '(num) => num + 1';

    return (
        <ScrollView>
            <Text>
                {codeString}
            </Text>
        </ScrollView>
    );
};

export default Code;