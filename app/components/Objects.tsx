// data/navData.js

export const nav_category_mobile = [
  { cat_name: "Weight Training", cat_img: "weight_training.jpg" },
  { cat_name: "Calisthenics", cat_img: "calisthenics.jpg" },
  { cat_name: "Skateboarding", cat_img: "skateboarding.jpg" },
];

export const nav_flyout_weight = [
  { product_id: 1, title: "weight_training", img_path: "/images/product_images/product3.jpeg" },
  { product_id: 2, title: "weight_training", img_path: "weight_training.jpg" },
  { product_id: 3, title: "weight_training", img_path: "weight_training.jpg" },
  { product_id: 4, title: "weight_training", img_path: "weight_training.jpg" },
  { product_id: 5, title: "weight_training", img_path: "weight_training.jpg" },
];

export const nav_flyout_calisthenics = [
  { product_id: 1, title: "calisthenics", img_path: "/images/product_images/product14.jpeg" },
  { product_id: 2, title: "calisthenics", img_path: "calisthenics.jpg" },
  { product_id: 3, title: "calisthenics", img_path: "calisthenics.jpg" },
  { product_id: 4, title: "calisthenics", img_path: "calisthenics.jpg" },
  { product_id: 5, title: "calisthenics", img_path: "calisthenics.jpg" },
];

export const nav_flyout_skateboarding = [
  { product_id: 1, title: "skateboarding", img_path: "/images/product_images/product10.jpeg" },
  { product_id: 2, title: "skateboarding", img_path: "skateboarding.jpg" },
  { product_id: 3, title: "skateboarding", img_path: "skateboarding.jpg" },
  { product_id: 4, title: "skateboarding", img_path: "skateboarding.jpg" },
  { product_id: 5, title: "skateboarding", img_path: "skateboarding.jpg" },
];

// categories section
export const categories = [
  {cat_name : "Electronics", cat_img : "/images/category_images/category2.jpeg"},
  {cat_name : "Electronics", cat_img : "/images/category_images/category2.jpeg"},
  {cat_name : "Electronics", cat_img : "/images/category_images/category2.jpeg"},
];

interface Category {
  cat_id: number;
  cat_name: string;
  cat_icon: string;
  brands: Brand[];
}

interface Brand {
  brand_id: number;
  brand_name: string;
  models: Model[];
}

interface Model {
  model_id: number;
  model_name: string;
  products: Product[];
}

interface Product {
  id: number;
  title: string;
}
export const sortCategoryData: Category[] = [
  {
    cat_id: 1,
    cat_name: "Electronics",
    cat_icon: "icon-electronics.svg",
    brands: [
      {
        brand_id: 101,
        brand_name: "Apple",
        models: [
          {
            model_id: 1001,
            model_name: "iPhone 12",
            products: [
              { id: 1, title: "iPhone 12 128GB" },
              { id: 2, title: "iPhone 12 256GB" },
            ],
          },
        ],
      },
      {
        brand_id: 102,
        brand_name: "Samsung",
        models: [
          {
            model_id: 1002,
            model_name: "Galaxy S21",
            products: [
              { id: 3, title: "Galaxy S21 128GB" },
              { id: 4, title: "Galaxy S21 256GB" },
            ],
          },
        ],
      },
    ],
  },
  {
    cat_id: 2,
    cat_name: "Clothing",
    cat_icon: "pc.svg",
    brands: [
      {
        brand_id: 103,
        brand_name: "Nike",
        models: [
          {
            model_id: 1003,
            model_name: "Air Max",
            products: [
              { id: 5, title: "Air Max 2021" },
              { id: 6, title: "Air Max 2019" },
            ],
          },
        ],
      },
    ],
  },
];
