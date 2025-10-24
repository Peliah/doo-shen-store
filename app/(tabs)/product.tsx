import { NeoBrutalismButton, NeoBrutalismText } from '@/components/neo-brutalism';
import {
  ProductActionSection,
  ProductDetailHeader,
  ProductImageSection,
  ProductInfoSection,
  ProductMetadataSection,
  ProductPricingSection,
} from '@/components/product-detail';
import { Colors } from '@/constants/theme';
import { useAlert } from '@/contexts/AlertContext';
import { useTheme } from '@/contexts/ThemeContext';
import { deleteProduct, getProduct, Product } from '@/utils/database';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetailScreen() {
  const { isDark } = useTheme();
  const { showAlert } = useAlert();
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      const productData = await getProduct(parseInt(productId!));
      setProduct(productData);
    } catch (error) {
      console.error('Error loading product:', error);
      showAlert('Error', 'Failed to load product details', [
        { text: 'OK', onPress: () => { } }
      ]);
    } finally {
      setLoading(false);
    }
  }, [productId, showAlert]);

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId, loadProduct]);

  const handleEdit = () => {
    showAlert('Edit Product', 'Edit functionality coming soon!', [
      { text: 'OK', onPress: () => { } }
    ]);
  };

  const handleDelete = () => {
    showAlert(
      'Delete Product',
      'Are you sure you want to delete this product? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => { } },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: confirmDelete,
        },
      ]
    );
  };

  const confirmDelete = async () => {
    try {
      if (product?.id) {
        await deleteProduct(product.id);
        showAlert('Success', 'Product deleted successfully!', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      showAlert('Error', 'Failed to delete product', [
        { text: 'OK', onPress: () => { } }
      ]);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
        <View style={styles.loadingContainer}>
          <NeoBrutalismText variant="body" color="primary">
            Loading product details...
          </NeoBrutalismText>
        </View>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
        <View style={styles.errorContainer}>
          <NeoBrutalismText variant="heading" color="primary">
            Product Not Found
          </NeoBrutalismText>
          <NeoBrutalismText variant="body" color="secondary" style={styles.errorText}>
            The product you&apos;re looking for doesn&apos;t exist or has been deleted.
          </NeoBrutalismText>
          <NeoBrutalismButton
            title="Go Back"
            onPress={() => router.back()}
            variant="primary"
            size="lg"
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProductDetailHeader />
        <ProductImageSection product={product} />
        <ProductInfoSection product={product} />
        <ProductPricingSection product={product} />
        <ProductMetadataSection product={product} />
        <ProductActionSection onEdit={handleEdit} onDelete={handleDelete} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    textAlign: 'center',
    marginVertical: 16,
  },
  backButton: {
    marginTop: 16,
  },
});
