-- Pedidos
create table if not exists pedidos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  telefone text not null,
  cpf text,
  total numeric(10,2) not null,
  status text not null default 'pendente', -- pendente | aprovado | cancelado | reembolsado
  mp_preference_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Itens do pedido
create table if not exists pedido_items (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid references pedidos(id) on delete cascade,
  produto_id uuid,
  nome text not null,
  preco numeric(10,2) not null,
  quantidade int not null,
  imagem_url text
);

-- Pagamentos (registro dos webhooks do MP)
create table if not exists pagamentos (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid references pedidos(id) on delete cascade,
  mp_payment_id text unique,
  status text,
  metodo text,
  valor numeric(10,2),
  raw jsonb,
  created_at timestamptz default now()
);

-- RLS: apenas service role acessa
alter table pedidos enable row level security;
alter table pedido_items enable row level security;
alter table pagamentos enable row level security;

create policy "service only" on pedidos for all using (false);
create policy "service only" on pedido_items for all using (false);
create policy "service only" on pagamentos for all using (false);
