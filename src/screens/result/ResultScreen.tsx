import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stage } from 'screens/home/components/Stage';
import { RootStackParamList } from 'utils/types';

const ResultScreen: React.FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <ScrollView>
            <Stage />
            <Text style={styles.h1}>Deine Fahrzeugbewertung</Text>
            <View style={styles.container}>
                <Button title="Go Back" onPress={() => navigation.pop()} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 32,
        fontFamily: 'OpenSans-Bold',
        lineHeight: 32,
        marginBottom: 20,
        paddingTop: 8,
    },
});

export { ResultScreen };
