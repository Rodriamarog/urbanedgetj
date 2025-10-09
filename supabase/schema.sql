-- Urban Edge TJ Database Schema
-- Orders and Order Items Tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Order identification
  order_number TEXT UNIQUE NOT NULL, -- ORDER-1234567890-ABC123
  external_reference TEXT UNIQUE NOT NULL, -- URBANEDGE-1234567890
  mercadopago_preference_id TEXT,
  mercadopago_payment_id TEXT,

  -- Customer information
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,

  -- Shipping address
  shipping_name TEXT NOT NULL,
  shipping_address_line1 TEXT NOT NULL,
  shipping_address_line2 TEXT,
  shipping_colonia TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_postal_code TEXT NOT NULL,
  shipping_country TEXT DEFAULT 'México',

  -- Pricing
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) DEFAULT 0,
  discount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'MXN',

  -- Coupon
  coupon_code TEXT,

  -- Order status
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, processing, shipped, delivered, cancelled, rejected
  payment_status TEXT DEFAULT 'pending', -- pending, approved, rejected, refunded

  -- Tracking information (for fulfillment)
  tracking_number TEXT,
  tracking_url TEXT,
  carrier TEXT, -- DHL, FedEx, Estafeta, etc.

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,

  -- Indexes for common queries
  CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'processing', 'shipped', 'delivered', 'cancelled', 'rejected')),
  CONSTRAINT valid_payment_status CHECK (payment_status IN ('pending', 'approved', 'rejected', 'refunded'))
);

-- Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

  -- Product information
  product_id TEXT NOT NULL, -- ferrari-black-jacket
  product_name TEXT NOT NULL,
  product_slug TEXT NOT NULL,

  -- Variant information (IMPORTANT for fulfillment)
  size TEXT NOT NULL, -- m-female, l-male, etc.
  size_display TEXT NOT NULL, -- M, L, XL, etc.
  gender TEXT NOT NULL, -- male, female

  -- Pricing
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,

  -- Product snapshot (JSON of full product data at time of order)
  product_snapshot JSONB,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Constraints
  CONSTRAINT positive_quantity CHECK (quantity > 0),
  CONSTRAINT valid_gender CHECK (gender IN ('male', 'female'))
);

-- Indexes for performance
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_external_reference ON orders(external_reference);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_mercadopago_payment_id ON orders(mercadopago_payment_id);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_order_items_size ON order_items(size);
CREATE INDEX idx_order_items_gender ON order_items(gender);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) - Disable for service role access
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policy to allow service role to do anything
CREATE POLICY "Service role can do everything on orders"
  ON orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can do everything on order_items"
  ON order_items
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Comments for documentation
COMMENT ON TABLE orders IS 'Main orders table storing customer orders';
COMMENT ON TABLE order_items IS 'Individual items within each order';
COMMENT ON COLUMN order_items.size IS 'Full size string including gender (e.g., m-female)';
COMMENT ON COLUMN order_items.size_display IS 'Display-friendly size (e.g., M, L, XL)';
COMMENT ON COLUMN order_items.gender IS 'Gender variant: male or female';
