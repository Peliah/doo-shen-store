import { NeoBrutalismButton, NeoBrutalismCard, NeoBrutalismInput, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { useUser } from '@/contexts/UserContext';
import { createProduct } from '@/utils/database';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CreateProductModalProps {
    visible: boolean;
    onClose: () => void;
    onProductCreated: () => void;
}

export const CreateProductModal: React.FC<CreateProductModalProps> = ({
    visible,
    onClose,
    onProductCreated,
}) => {
    const { isDark } = useTheme();
    const { currentUser } = useUser();
    const [loading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
    });

    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImagePicker = () => {
        Alert.alert(
            'Select Image',
            'Choose an option',
            [
                { text: 'Camera', onPress: () => pickImage('camera') },
                { text: 'Gallery', onPress: () => pickImage('gallery') },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    const pickImage = async (source: 'camera' | 'gallery') => {
        try {
            let result;

            if (source === 'camera') {
                const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
                if (permissionResult.granted === false) {
                    Alert.alert('Permission Required', 'Camera permission is required to take photos');
                    return;
                }
                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.8,
                });
            } else {
                const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (permissionResult.granted === false) {
                    Alert.alert('Permission Required', 'Gallery permission is required to select images');
                    return;
                }
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.8,
                });
            }

            if (!result.canceled && result.assets[0]) {
                setImageUri(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            Alert.alert('Validation Error', 'Product name is required');
            return false;
        }
        if (!formData.price.trim() || isNaN(parseFloat(formData.price))) {
            Alert.alert('Validation Error', 'Valid price is required');
            return false;
        }
        if (!formData.quantity.trim() || isNaN(parseInt(formData.quantity))) {
            Alert.alert('Validation Error', 'Valid quantity is required');
            return false;
        }
        if (!currentUser) {
            Alert.alert('Error', 'User not found');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);

            // For now, we'll use the first store of the user
            // Later we can add store selection
            const storeId = 1; // This should be dynamic based on user's stores

            await createProduct({
                store_id: storeId,
                name: formData.name.trim(),
                description: formData.description.trim() || undefined,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity),
                category: formData.category.trim() || undefined,
                image_url: imageUri || undefined,
            });

            Alert.alert('Success', 'Product created successfully!');
            onProductCreated();
            handleClose();
        } catch (error) {
            console.error('Error creating product:', error);
            Alert.alert('Error', 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            quantity: '',
            category: '',
        });
        setImageUri(null);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Ionicons
                                name="close"
                                size={24}
                                color={isDark ? Colors.dark.text : Colors.light.text}
                                onPress={handleClose}
                                style={styles.closeButton}
                            />
                            <NeoBrutalismText variant="heading" color="primary" style={styles.title}>
                                Add Product
                            </NeoBrutalismText>
                            <View style={styles.placeholder} />
                        </View>
                    </View>

                    {/* Image Section */}
                    <View style={styles.section}>
                        <NeoBrutalismText variant="subheading" color="primary" style={styles.sectionTitle}>
                            Product Image
                        </NeoBrutalismText>
                        <TouchableOpacity onPress={handleImagePicker} style={styles.imageContainer}>
                            {imageUri ? (
                                <Image source={{ uri: imageUri }} style={styles.productImage} />
                            ) : (
                                <View style={[styles.imagePlaceholder, { backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground }]}>
                                    <Ionicons
                                        name="camera-outline"
                                        size={32}
                                        color={isDark ? Colors.dark.text : Colors.light.text}
                                    />
                                    <NeoBrutalismText variant="body" color="secondary" style={styles.imageText}>
                                        Tap to add image
                                    </NeoBrutalismText>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Basic Information */}
                    <View style={styles.section}>
                        <NeoBrutalismText variant="subheading" color="primary" style={styles.sectionTitle}>
                            Basic Information
                        </NeoBrutalismText>

                        <NeoBrutalismCard variant="default" padding="base" style={styles.inputCard}>
                            <NeoBrutalismText variant="body" color="primary" style={styles.inputLabel}>
                                Product Name *
                            </NeoBrutalismText>
                            <NeoBrutalismInput
                                placeholder="Enter product name"
                                value={formData.name}
                                onChangeText={(value) => handleInputChange('name', value)}
                                style={styles.input}
                            />
                        </NeoBrutalismCard>

                        <NeoBrutalismCard variant="accent" padding="base" style={styles.inputCard}>
                            <NeoBrutalismText variant="body" color="primary" style={styles.inputLabel}>
                                Description
                            </NeoBrutalismText>
                            <NeoBrutalismInput
                                placeholder="Enter product description"
                                value={formData.description}
                                onChangeText={(value) => handleInputChange('description', value)}
                                style={styles.input}
                                multiline
                                numberOfLines={3}
                            />
                        </NeoBrutalismCard>

                        <NeoBrutalismCard variant="accent" padding="base" style={styles.inputCard}>
                            <NeoBrutalismText variant="body" color="primary" style={styles.inputLabel}>
                                Category
                            </NeoBrutalismText>
                            <NeoBrutalismInput
                                placeholder="Enter category (optional)"
                                value={formData.category}
                                onChangeText={(value) => handleInputChange('category', value)}
                                style={styles.input}
                            />
                        </NeoBrutalismCard>
                    </View>

                    {/* Pricing & Inventory */}
                    <View style={styles.section}>
                        <NeoBrutalismText variant="subheading" color="primary" style={styles.sectionTitle}>
                            Pricing & Inventory
                        </NeoBrutalismText>

                        <View style={styles.row}>
                            <NeoBrutalismCard variant="default" padding="base" style={styles.halfCard}>
                                <NeoBrutalismText variant="body" color="primary" style={styles.inputLabel}>
                                    Price *
                                </NeoBrutalismText>
                                <NeoBrutalismInput
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChangeText={(value) => handleInputChange('price', value)}
                                    style={styles.input}
                                />
                            </NeoBrutalismCard>

                            <NeoBrutalismCard variant="accent" padding="base" style={styles.halfCard}>
                                <NeoBrutalismText variant="body" color="primary" style={styles.inputLabel}>
                                    Quantity *
                                </NeoBrutalismText>
                                <NeoBrutalismInput
                                    placeholder="0"
                                    value={formData.quantity}
                                    onChangeText={(value) => handleInputChange('quantity', value)}
                                    style={styles.input}
                                />
                            </NeoBrutalismCard>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.buttonContainer}>
                        <NeoBrutalismButton
                            title="Cancel"
                            onPress={handleClose}
                            variant="secondary"
                            size="lg"
                            style={styles.button}
                        />
                        <NeoBrutalismButton
                            title={loading ? "Creating..." : "Create Product"}
                            onPress={handleSubmit}
                            variant="primary"
                            size="lg"
                            style={styles.button}
                            disabled={loading}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginBottom: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    closeButton: {
        padding: 4,
    },
    title: {
        fontWeight: '600',
    },
    placeholder: {
        width: 32,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        marginBottom: 16,
        fontWeight: '600',
    },
    imageContainer: {
        alignItems: 'center',
    },
    imagePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#ccc',
    },
    productImage: {
        width: 120,
        height: 120,
        borderRadius: 12,
    },
    imageText: {
        marginTop: 8,
        fontSize: 12,
    },
    inputCard: {
        marginBottom: 12,
    },
    inputLabel: {
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    halfCard: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
        marginBottom: 40,
    },
    button: {
        flex: 1,
    },
});
