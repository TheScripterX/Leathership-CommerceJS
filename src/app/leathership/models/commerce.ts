export interface Product {
  id: string;
  created: number;
  updated: number;
  active: boolean;
  permalink: string;
  name: string;
  description: string;
  price: Price;
  inventory: Inventory;
  sku?: any;
  sort_order: number;
  seo: Seo;
  thank_you_url?: any;
  meta?: any;
  conditionals: Conditionals;
  is: Is;
  has: Has;
  collects: Collects;
  checkout_url: CheckoutUrl;
  extra_fields: any[];
  variant_groups: VariantGroup[];
  categories: Category[];
  assets: Asset[];
  image: Image;
  related_products: RelatedProduct[];
  attributes: any[];
}

export interface RootProduct {
  data: Product[];
  meta: Meta;
}

export interface RootVariants {
  data: Variants[];
  meta: Meta;
}

export interface Variants {
  id: string;
  sku: null;
  description: null;
  inventory: null;
  price: Price;
  is_valid: boolean;
  invalid_reason_code: null;
  meta: null;
  created: number;
  updated: number;
  options: Option[];
  assets: any[];
}

export interface RootVariantGroup {
  data: VariantGroup[];
  meta: Meta;
}

export interface VariantData {
  [key: string]: string; // Dynamic Interface
}

export interface Price {
  raw: number;
  formatted: string;
  formatted_with_symbol: string;
  formatted_with_code: string;
}

export interface RootCart {
  success: boolean;
  event: string;
  line_item_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  line_total: number;
  cart: Cart;
  image: Image;
}

export interface Cart {
  id: string;
  created: number;
  updated: number;
  expires: number;
  total_items: number;
  total_unique_items: number;
  subtotal: Subtotal;
  hosted_checkout_url: string;
  line_items: LineItem[];
  currency: Currency;
  discount: any[];
}

export interface Currency {
  code: string;
  symbol: string;
}

export interface LineItem {
  id: string;
  product_id: string;
  name: string;
  product_name: string;
  sku: null;
  permalink: string;
  quantity: number;
  price: Subtotal;
  line_total: Subtotal;
  is_valid: boolean;
  product_meta: any[];
  selected_options: any[];
  variant: null;
  image: Image;
}

export interface Subtotal {
  raw: number;
  formatted: string;
  formatted_with_symbol: string;
  formatted_with_code: string;
}

export interface Inventory {
  managed: boolean;
  available: number;
}

export interface Seo {
  title: string;
  description: string;
}

export interface Conditionals {
  is_active: boolean;
  is_tax_exempt: boolean;
  is_pay_what_you_want: boolean;
  is_inventory_managed: boolean;
  is_sold_out: boolean;
  has_digital_delivery: boolean;
  has_physical_delivery: boolean;
  has_images: boolean;
  collects_fullname: boolean;
  collects_shipping_address: boolean;
  collects_billing_address: boolean;
  collects_extra_fields: boolean;
}

export interface Is {
  active: boolean;
  tax_exempt: boolean;
  pay_what_you_want: boolean;
  inventory_managed: boolean;
  sold_out: boolean;
}

export interface Has {
  digital_delivery: boolean;
  physical_delivery: boolean;
  images: boolean;
}

export interface Collects {
  fullname: boolean;
  shipping_address: boolean;
  billing_address: boolean;
  extra_fields: boolean;
}

export interface CheckoutUrl {
  checkout: string;
  display: string;
}

export interface Price2 {
  raw: number;
  formatted: string;
  formatted_with_symbol: string;
  formatted_with_code: string;
}

export interface Option {
  id: string;
  name: string;
  price: Price2;
  assets: any[];
  meta?: any;
  created: number;
  updated: number;
}

export interface VariantGroup {
  id: string;
  name: string;
  meta?: any;
  created: number;
  updated: number;
  options: Option[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface Asset {
  id: string;
  url: string;
  description?: any;
  is_image: boolean;
  filename: string;
  file_size: number;
  file_extension: string;
  image_dimensions: ImageDimensions;
  meta: any[];
  created_at: number;
  updated_at: number;
}

export interface ImageDimensions2 {
  width: number;
  height: number;
}

export interface Image {
  id: string;
  url: string;
  description?: any;
  is_image: boolean;
  filename: string;
  file_size: number;
  file_extension: string;
  image_dimensions: ImageDimensions2;
  meta: any[];
  created_at: number;
  updated_at: number;
}

export interface Price3 {
  raw: number;
  formatted: string;
  formatted_with_symbol: string;
  formatted_with_code: string;
}

export interface ImageDimensions3 {
  width: number;
  height: number;
}

export interface Image2 {
  id: string;
  url: string;
  description?: any;
  is_image: boolean;
  filename: string;
  file_size: number;
  file_extension: string;
  image_dimensions: ImageDimensions3;
  meta: any[];
  created_at: number;
  updated_at: number;
}

export interface RelatedProduct {
  id: string;
  name: string;
  sku?: any;
  permalink: string;
  description?: any;
  price: Price3;
  quantity: number;
  image: Image2;
}

export interface Links {}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: Links;
}

export interface Meta {
  pagination: Pagination;
}
