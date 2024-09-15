import create from 'zustand';

interface Category {
  id: string;
  name: string;
}

interface CategoryStore {
  categories2: Category[];
  setCategories2: (categories: Category[]) => void;
  addCategory2: (category: Category) => void;
  removeCategory2: (id: string) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories2: [],
  setCategories2: (categories2) => set({ categories2 }),
  addCategory2: (category) => set((state) => ({
    categories2: [...state.categories2, category],
  })),
  removeCategory2: (id) => set((state) => ({
    categories2: state.categories2.filter((cat) => cat.id !== id),
  })),
}));
