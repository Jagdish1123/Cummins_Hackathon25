/*
  # Initial Schema Setup for Smart Expense Manager

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `email` (text)
      - `name` (text)
      - `created_at` (timestamp)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `amount` (numeric)
      - `merchant` (text)
      - `category` (text)
      - `date` (timestamp)
      - `description` (text)
      - `bill_image_url` (text)
      
    - `expense_groups`
      - `id` (uuid, primary key)
      - `name` (text)
      - `created_by` (uuid, foreign key)
      - `created_at` (timestamp)
      
    - `group_members`
      - `group_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `joined_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  name text,
  created_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  amount numeric NOT NULL,
  merchant text NOT NULL,
  category text NOT NULL,
  date timestamptz DEFAULT now(),
  description text,
  bill_image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create expense_groups table
CREATE TABLE IF NOT EXISTS expense_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_by uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create group_members table
CREATE TABLE IF NOT EXISTS group_members (
  group_id uuid REFERENCES expense_groups(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (group_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read groups they belong to"
  ON expense_groups
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM group_members
      WHERE group_id = expense_groups.id
      AND user_id = auth.uid()
    )
    OR created_by = auth.uid()
  );

CREATE POLICY "Users can manage groups they created"
  ON expense_groups
  FOR ALL
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can read group members for their groups"
  ON group_members
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM expense_groups
      WHERE id = group_members.group_id
      AND created_by = auth.uid()
    )
    OR user_id = auth.uid()
  );