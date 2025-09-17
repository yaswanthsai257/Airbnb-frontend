import type { Category } from '../types';
import { CATEGORIES } from '../constants';

export const fetchCategories = async (): Promise<Category[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  return CATEGORIES;
};

export const fetchCategoryById = async (id: string): Promise<Category | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const category = CATEGORIES.find(c => c.id === id);
  return category || null;
};

export const createCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const newCategory: Category = {
    ...category,
    id: Date.now().toString()
  };

  CATEGORIES.push(newCategory);
  return newCategory;
};

export const updateCategory = async (id: string, updates: Partial<Category>): Promise<Category> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = CATEGORIES.findIndex(c => c.id === id);
  if (index === -1) {
    throw new Error('Category not found');
  }

  CATEGORIES[index] = { ...CATEGORIES[index], ...updates };
  return CATEGORIES[index];
};

export const deleteCategory = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const index = CATEGORIES.findIndex(c => c.id === id);
  if (index !== -1) {
    CATEGORIES.splice(index, 1);
  }
};
