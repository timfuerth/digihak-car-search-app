import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from 'utils/Constants';

const carImage = require('assets/car.png');

const StartScreen: React.FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>DigiHAK Praxisworkshop</Text>
            <Image source={carImage} />
            <View style={styles.textContainer}>
                <Text>react-native</Text>
                <Text>Expo</Text>
                <Text>Typescript</Text>
                <Text>ESLint</Text>
                <Text>Prettier</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    title: {
        marginBottom: 10,
        fontSize: 30,
        fontFamily: 'OpenSans-Bold',
    },
    textContainer: {
        width: '30%',
        backgroundColor: colors.Primary800,
    },
});

export { StartScreen };
