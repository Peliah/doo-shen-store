// Main Storage Index - Re-exports all storage modules
export { AppStorage } from './app';
export { STORAGE_KEYS, StorageUtils } from './base';
export { QuizStorage } from './quiz';
export { ResultsStorage } from './results';
export { UserStorage } from './user';

// Utilities
export {
    addAnswerToSession, calculateAverageScore,
    calculateCategoryStats, calculatePerformanceLevel, completeQuizSession, createQuizSession, generateSessionId, generateUserId
} from './utils';

// Question utilities
export {
    analyzeQuestionPerformance, calculateQuestionScore, getCorrectAnswerIndex, getQuestionDifficultyMultiplier, getQuestionExplanation,
    getQuestionReference, validateAnswer
} from './questions';

