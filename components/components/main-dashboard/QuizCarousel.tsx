import { CATEGORIES } from '@/constants/data'
import { Category } from '@/types'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import QuizItem from './QuizItem'

type QuizCarouselProps = {
    onCategoryPress?: (category: Category) => void;
};

const QuizCarousel = ({ onCategoryPress }: QuizCarouselProps) => {
    return (
        <View>
            <FlatList
                data={CATEGORIES}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (<QuizItem category={item} onPress={onCategoryPress} />)}
            />
        </View>
    )
}

export default QuizCarousel

const styles = StyleSheet.create({
    listContent: {
        paddingRight: 12,
    },
})