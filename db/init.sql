-- =====================================================
-- MVP Billing System - Database Initialization Script
-- =====================================================
-- This script creates all required tables, constraints,
-- and indexes for the project.
--
-- Compatible with Supabase / PostgreSQL
-- =====================================================

-- ---------- Extensions ----------
create extension if not exists "pgcrypto";

-- =====================================================
-- Countries
-- =====================================================
create table if not exists public.mvp_countries (
  id bigint generated always as identity primary key,
  name text not null,
  iso char(2) not null unique,
  created_at timestamptz default now()
);

-- =====================================================
-- States
-- =====================================================
create table if not exists public.mvp_states (
  id bigint generated always as identity primary key,
  country_id bigint not null,
  name text not null,
  created_at timestamptz default now(),

  constraint fk_states_country
    foreign key (country_id)
    references public.mvp_countries(id)
    on delete cascade
);

-- =====================================================
-- Cities
-- =====================================================
create table if not exists public.mvp_cities (
  id bigint generated always as identity primary key,
  state_id bigint not null,
  name text not null,
  created_at timestamptz default now(),

  constraint fk_cities_state
    foreign key (state_id)
    references public.mvp_states(id)
    on delete cascade
);

-- =====================================================
-- Clients
-- =====================================================
create table if not exists public.mvp_clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,

  name text not null,
  business_name text,
  rfc text,
  address text,
  phone text,
  email text,

  country_id bigint,
  state_id bigint,
  city_id bigint,

  created_at timestamptz default now(),

  constraint fk_clients_user
    foreign key (user_id)
    references auth.users(id)
    on delete cascade,

  constraint fk_clients_country
    foreign key (country_id)
    references public.mvp_countries(id),

  constraint fk_clients_state
    foreign key (state_id)
    references public.mvp_states(id),

  constraint fk_clients_city
    foreign key (city_id)
    references public.mvp_cities(id)
);

-- =====================================================
-- Invoices
-- =====================================================
create table if not exists public.mvp_invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  client_id uuid not null,

  folio serial,
  issue_date date not null,

  status text not null default 'draft',
  subtotal numeric(12,2) not null,
  tax numeric(12,2) not null,
  total numeric(12,2) not null,

  created_at timestamptz default now(),

  constraint fk_invoices_user
    foreign key (user_id)
    references auth.users(id),

  constraint fk_invoices_client
    foreign key (client_id)
    references public.mvp_clients(id),

  constraint mvp_invoices_status_check
    check (status in ('draft', 'issued', 'paid', 'cancelled'))
);

-- =====================================================
-- Invoice Items
-- =====================================================
create table if not exists public.mvp_invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null,

  description text not null,
  quantity numeric(12,2) not null,
  price numeric(12,2) not null,
  total numeric(12,2) not null,

  constraint fk_items_invoice
    foreign key (invoice_id)
    references public.mvp_invoices(id)
    on delete cascade
);

-- =====================================================
-- Indexes
-- =====================================================
create index if not exists idx_states_country
  on public.mvp_states(country_id);

create index if not exists idx_cities_state
  on public.mvp_cities(state_id);

create index if not exists idx_clients_user
  on public.mvp_clients(user_id);

create index if not exists idx_invoices_user
  on public.mvp_invoices(user_id);

create index if not exists idx_invoices_client
  on public.mvp_invoices(client_id);

-- =====================================================
-- Optional seed data (commented)
-- =====================================================
-- insert into mvp_countries (name, iso)
-- values ('México', 'MX'), ('Estados Unidos', 'US');
