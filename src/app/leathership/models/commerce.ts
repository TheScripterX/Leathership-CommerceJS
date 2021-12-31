import { Customer } from '@chec/commerce.js/types/customer';
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

export interface Checkout {
  id: string;
  cart_id: string;
  created: number;
  expires: number;
  conditionals: Conditionals;
  meta: null;
  collects: Collects;
  has: CheckoutHas;
  is: CheckoutIs;
  products: Product[];
  merchant: Merchant;
  extra_fields: ExtraField[];
  gateways: Gateway[];
  shipping_methods: any[];
  live: Live;
  analytics: Analytics;
  adjustments: any[];
}

export interface captureOrder {
  id: string;
  cart_id: string;
  checkout_token_id: string;
  created: number;
  redirect: boolean;
  customer_reference: string;
  status_payment: string;
  status_fulfillment: string;
  customer: Customer;
  extra_fields: ExtraField[];
  shipping: OrderShippingClass;
  billing: any[];
  order: OrderClass;
  transactions: Transaction[];
  fulfillment: Fulfillment;
  conditionals: Conditionals;
  merchant: Merchant;
  meta: null;
}

export interface Order {
  version: string;
  sandbox: boolean;
  id: string;
  checkout_token_id: string;
  cart_id: string;
  customer_reference: string;
  created: number;
  status: string;
  status_payment: string;
  status_fulfillment: string;
  currency: Currency;
  order_value: Subtotal;
  conditionals: { [key: string]: boolean };
  meta: null;
  redirect: boolean;
  collected: Collected;
  has: Has;
  is: Is;
  order: OrderClass;
  shipping: Shipping;
  billing: any[];
  transactions: Transaction[];
  fulfillment: Fulfillment;
  customer: Customer;
  extra_fields: ExtraField[];
  client_details: ClientDetails;
  tax: Tax;
  adjustments: any[];
}

export interface Shipping {
  name: string;
  street: string;
  street_2: null;
  town_city: string;
  postal_zip_code: string;
  county_state: string;
  country: string;
  meta: null;
}

export interface ClientDetails {
  ip_address: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  postal_zip_code: string;
  _copyright: string;
}

export interface Collected {
  fullname: boolean;
  shipping_address: boolean;
  billing_address: boolean;
  extra_fields: boolean;
  tax: boolean;
  eu_vat_moss_evidence: boolean;
}

export interface Fulfillment {
  physical: Physical;
  digital: Digital;
}

export interface Digital {
  downloads: any[];
}

export interface Physical {
  items: Item[];
  shipments: any[];
}

export interface Item {
  id: string;
  shipping_method_id: string;
  line_item_id: string;
  product_id: string;
  shipping_description: string;
  provider: string;
  provider_type: string;
  product_name: string;
  status: string;
  quantity: Quantity;
  quantity_fulfilled: number;
  quantity_remaining: number;
  last_updated: number;
  linked_shipments: any[];
  variants: Variant[];
}

export interface Quantity {
  total: number;
  fulfilled: number;
  remaining: number;
}

export interface Transaction {
  id: string;
  type: string;
  status: string;
  status_reason: string;
  charge_date: number;
  gateway: string;
  gateway_name: string;
  gateway_transaction_id: string;
  gateway_reference: string;
  notes: string;
  amount: Subtotal;
  payment_source_type: string;
  payment_source: PaymentSource;
  created: number;
  updated: number;
  dunning: Dunning;
}

export interface Dunning {
  is_dunning: boolean;
  failed_attempts: number;
  last_failed_attempt: null;
  next_attempt: null;
}

export interface PaymentSource {
  brand: string;
  country: string;
  billing_zip_postal_code: string;
}

export interface OrderClass {
  line_items: LineItem[];
  subtotal: Subtotal;
  discount: any[];
  shipping: OrderShipping;
  tax: Tax;
  total: Subtotal;
  total_with_tax: Subtotal;
  pay_what_you_want: PayWhatYouWant;
}

export interface Tax {
  amount: Subtotal;
  included_in_price: boolean;
  provider: string;
  provider_type: string;
  breakdown: any[];
  zone: Zone;
}

export interface OrderShipping {
  id: string;
  description: string;
  price: Subtotal;
}

export interface OrderShippingClass {
  name: string;
  street: string;
  town_city: string;
  county_state: string;
  postal_zip_code: string;
  country: string;
}

export interface Analytics {
  google: Google;
}

export interface Google {
  settings: Settings;
}

export interface Settings {
  tracking_id: null;
  linked_domains: any[];
}

export interface Live {
  merchant_id: number;
  currency: Currency;
  subtotal: Subtotal;
  total: Subtotal;
  total_with_tax: Subtotal;
  adjustments: Adjustments;
  giftcard: any[];
  total_due: Subtotal;
  pay_what_you_want: PayWhatYouWant;
  line_items: LineItem[];
  discount: any[];
  shipping: Shipping;
  tax: LiveTax;
}

export interface Shipping {
  price: Subtotal;
  available_options: any[];
}

export interface LiveTax {
  amount: Subtotal;
  included_in_price: boolean;
  provider: string;
  breakdown: any[];
  zone: any[];
}

export interface PayWhatYouWant {
  enabled: boolean;
  minimum: null;
  customer_set_price: null;
}

export interface Adjustments {
  taxable: Subtotal;
  untaxable: Subtotal;
  total: Subtotal;
}

export interface Gateway {
  id: string;
  code: string;
  sandbox: boolean;
  config: any[];
}

export interface ExtraField {
  id: string;
  name: string;
  type?: string;
  required?: boolean;
  options: Option[] | null;
  meta: null;
  created: number;
  updated: number;
}

export interface CheckoutHas {
  physical_delivery: boolean;
  digital_delivery: boolean;
  pay_what_you_want: boolean;
  available_discounts: boolean;
}

export interface CheckoutIs {
  cart_free: boolean;
}

export interface Merchant {
  id: number;
  name: string;
  description: string;
  status: string;
  country: string;
  currency: Currency;
  has: MerchantHas;
  support_email: string;
  logo_shape: null;
  intercom: boolean;
  analytics: Analytics;
  address: Address;
  billing: Billing;
  signup_purpose: string;
  statistics: MerchantStatistics;
  notifications: Notifications;
  cors_domains: any[];
  images: Images;
}

export interface Images {
  logo: Logo;
  cover: null;
}

export interface Logo {
  id: string;
  url: string;
  description: null;
  is_image: boolean;
  filename: string;
  file_size: number;
  file_extension: FileExtension;
  image_dimensions: ImageDimensions;
  meta: any[];
  created_at: number;
  updated_at: number;
}

export enum FileExtension {
  Jpg = 'jpg',
  PNG = 'png',
}

export interface Notifications {
  token: string;
  dashboard: string;
}

export interface MerchantStatistics {
  orders: number;
  test_orders: number;
  products: number;
  shipping_zones: number;
  tax_rates: number;
  rays: number;
  has_payment_gateway: boolean;
}

export interface Billing {
  has_payment_method: boolean;
  plan: string;
  features: Features;
  usage: Usage;
}

export interface Usage {
  rays: number;
}

export interface Features {
  rays: number;
  variants: number;
}

export interface Address {
  street: string;
  city: string;
  region: string;
  country: string;
  postal_zip_code: string;
  public: boolean;
}

export interface MerchantHas {
  logo: boolean;
  cover: boolean;
  analytics: boolean;
  description: boolean;
  enabled_hosted_checkouts: boolean;
  enabled_hosted_storefront: boolean;
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
  variant: Variant;
  image: Image;
}

export interface Variant {
  id: string;
  sku: string;
  description: string;
  inventory: number;
  price: Price;
  is_valid: boolean;
  invalid_reason_code: null;
  meta: null;
  created: number;
  updated: number;
  options: Option;
  assets: any[];
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

export interface RootCategory {
  data: Category[];
  meta: Meta;
}

export interface Category {
  id: string;
  parent_id: null;
  slug: string;
  name: string;
  description: string;
  products: number;
  created: number;
  updated: number;
  meta: null;
  assets: any[];
  children: CategoryChildren[];
}
export interface CategoryChildren {
  id: string;
  slug: string;
  name: string;
  assets: Asset[];
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

export interface VariantData {
  [key: string]: string; // Dynamic Interface
}

export interface LineItemsData {
  [key: string]: {
    variant_id: string;
    quantity: number;
  };
}

export interface Test_Gateway {
  payment: {
    gateway: string;
    card: {
      number: number;
    };
  };
}

export interface DeleteCart {
  success: boolean;
  event: string;
  cart_id: string;
}
