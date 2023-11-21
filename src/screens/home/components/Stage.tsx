import { Dimensions, Image, ImageBackground, StyleSheet, Text } from 'react-native';

const stageLogo = require('assets/logo.png');
const stageImage = require('assets/stage.jpg');

const Stage: React.FunctionComponent = () => {
    const imageHeight = (Dimensions.get('screen').width * 570) / 390;

    return (
        <ImageBackground source={stageImage} style={[styles.stageImage, { height: imageHeight }]} resizeMode="contain">
            <Text style={styles.title}>Verkaufe dein Auto einfach auf</Text>
            <Image source={stageLogo} />
            <Text style={styles.bottomText}>Einfach - Sicher - Schnell</Text>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    stageImage: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        margin: 20,
        fontFamily: 'OpenSans-Bold',
        fontSize: 40,
        lineHeight: 44,
        textAlign: 'center',
        fontWeight: '700',
        color: 'white',
    },
    bottomText: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#00000080',
        paddingHorizontal: 10,
        paddingVertical: 13,

        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
        lineHeight: 22,
        textAlign: 'center',
        color: 'white',
    },
});

export { Stage };
