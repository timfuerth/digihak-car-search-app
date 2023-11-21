import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Brands, Models, Registration } from 'api/types';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DropdownComponent, { DropdownItem } from 'screens/home/components/Dropdown';
import { Stage } from 'screens/home/components/Stage';
import { colors, environment } from 'utils/Constants';
import { RootStackParamList } from 'utils/types';
import { useFetch } from 'utils/useFetch';

const HomeScreen: React.FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const bottomInset = useSafeAreaInsets().bottom;

    const [selectedBrand, setSelectedBrand] = React.useState<DropdownItem | null>(null);
    const [selectedModel, setSelectedModel] = React.useState<DropdownItem | null>(null);
    const [selectedRegistration, setSelectedRegistration] = React.useState<DropdownItem | null>(null);
    const [selectedMileage, setSelectedMileage] = React.useState<string>('');

    const brandsUrl = `${environment.domain}/digihak-car-search/brands`;
    const { data: brandsData, loading: brandsLoading, error: brandsError } = useFetch<Brands[]>(brandsUrl);

    const modelsUrl =
        selectedBrand != null
            ? `${environment.domain}/digihak-car-search/cars/models?brandId=${selectedBrand?.value}`
            : null;
    const { data: modelsData, loading: modelsLoading, error: modelsError } = useFetch<Models[]>(modelsUrl);

    const registrationUrl =
        selectedBrand != null
            ? `${environment.domain}/digihak-car-search/cars/registrations?brandId=${selectedBrand?.value}&model=${selectedModel?.value}`
            : null;
    const { data: registrationData, loading: registrationLoading } = useFetch<Registration[]>(registrationUrl);

    // reset other data, when brand is selected
    const onSelectBrand = (item: DropdownItem) => {
        setSelectedBrand(item);
        setSelectedModel(null);
        setSelectedRegistration(null);
    };

    const brandItems = brandsData?.map((item) => ({
        label: item.name,
        value: item.id.toString(),
    }));

    const modelItems = modelsData?.map((item) => ({
        label: item.model,
        value: item.model,
    }));

    const registrationItems = registrationData?.map((item) => ({
        label: item.initial_registration,
        value: item.initial_registration,
    }));

    const error = brandsError || modelsError;
    const submitButtonDisabled = selectedBrand == null && selectedModel == null && selectedRegistration == null;

    return (
        <ScrollView style={styles.container}>
            <Stage />
            <View style={[styles.textContainer, { paddingBottom: bottomInset + 20 }]}>
                <Text style={styles.descriptionText}>
                    Erhalte ohne Stress, schnell und einfach deinen besten Verkaufspreis.
                </Text>
                {error ? <Text style={[styles.descriptionText, { color: colors.Error }]}>{error}</Text> : null}
                <DropdownComponent
                    title="Marke"
                    value={selectedBrand}
                    setValue={onSelectBrand}
                    data={brandItems ?? []}
                    loading={brandsLoading}
                />
                <DropdownComponent
                    title="Modell"
                    value={selectedModel}
                    setValue={setSelectedModel}
                    data={modelItems ?? []}
                    loading={modelsLoading}
                    disabled={modelItems == null}
                />
                <DropdownComponent
                    title="Erstzulassung"
                    value={selectedRegistration}
                    setValue={setSelectedRegistration}
                    data={registrationItems ?? []}
                    loading={registrationLoading}
                    disabled={registrationItems == null}
                />
                <TextInput
                    style={styles.textInput}
                    value={selectedMileage}
                    onChange={(event) => setSelectedMileage(event.nativeEvent.text)}
                />
                <TouchableOpacity
                    style={[styles.touchableContainer, submitButtonDisabled && { backgroundColor: colors.Neutral300 }]}
                    onPress={() => navigation.push('Result')}
                    disabled={submitButtonDisabled}
                >
                    <Text style={styles.buttonText}>Jetzt Verkaufspreis erhalten</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textContainer: {
        padding: 20,
    },
    descriptionText: {
        fontFamily: 'OpenSans-Medium',
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 20,
    },
    touchableContainer: {
        backgroundColor: colors.Primary300,
        borderRadius: 16,
        paddingHorizontal: 40,
        paddingVertical: 17,
    },
    textInput: {
        height: 50,
        borderColor: colors.Neutral300,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 20,
        fontFamily: 'OpenSans-Medium',
        fontSize: 16,
    },
    buttonText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
        lineHeight: 22,
    },
});

export { HomeScreen };
