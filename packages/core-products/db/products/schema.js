import SimpleSchema from 'simpl-schema';
import { Schemas } from 'meteor/unchained:utils';
import { Products, ProductTexts } from './collections';

export const ProductTypes = {
  SimpleProduct: 'SIMPLE_PRODUCT',
  ConfigurableProduct: 'CONFIGURABLE_PRODUCT',
};

export const ProductStatus = {
  DRAFT: null,
  ACTIVE: 'ACTIVE',
  DELETED: 'DELETED',
};

const ProductCommerceSchema = new SimpleSchema({
  salesUnit: String,
  pricing: Array,
  'pricing.$': Object,
  'pricing.$.isTaxable': Boolean,
  'pricing.$.isNetPrice': Boolean,
  'pricing.$.countryCode': String,
  'pricing.$.currencyCode': String,
  'pricing.$.amount': Number,
  'pricing.$.maxQuantity': Number,
}, { requiredByDefault: false });

const ProductWarehousingSchema = new SimpleSchema({
  baseUnit: String,
  sku: String,
  maxAllowedQuantityPerOrder: Number,
  allowOrderingIfNoStock: Boolean,
}, { requiredByDefault: false });

const ProductSupplySchema = new SimpleSchema({
  weightInGram: Number,
  heightInMillimeters: Number,
  lengthInMillimeters: Number,
  widthInMillimeters: Number,
}, { requiredByDefault: false });

const ProductProxySchema = new SimpleSchema({
  assignments: Array,
  'assignments.$': Object,
  'assignments.$.vector': { type: Object, blackbox: true },
  'assignments.$.productId': String,
}, { requiredByDefault: false });

Products.attachSchema(new SimpleSchema({
  sequence: { type: Number, required: true, index: true },
  slugs: { type: Array, index: true },
  'slugs.$': String,
  type: { type: String, required: true },
  status: { type: String, index: true },
  authorId: { type: String, required: true },
  published: Date,
  tags: { type: Array, index: true },
  'tags.$': String,
  commerce: ProductCommerceSchema,
  warehousing: ProductWarehousingSchema,
  supply: ProductSupplySchema,
  proxy: ProductProxySchema,
  meta: { type: Object, blackbox: true },
  ...Schemas.timestampFields,
}, { requiredByDefault: false }));

ProductTexts.attachSchema(new SimpleSchema({
  productId: { type: String, required: true, index: true },
  locale: { type: String, required: true, index: true },
  vendor: String,
  title: String,
  slug: { type: String, index: true },
  subtitle: String,
  description: String,
  labels: Array,
  'labels.$': String,
  ...Schemas.timestampFields,
}, { requiredByDefault: false }));