# Production Planning System – Frontend

Interface web desenvolvida em **React + TypeScript** para gerenciamento de produção industrial.

A aplicação consome a **Production Control API** e permite gerenciar:

- Produtos
- Matérias-primas
- Composição de produtos
- Sugestões de produção
- Dashboard com métricas e gráficos

O sistema ajuda a responder perguntas como:

- Quantos produtos podem ser fabricados com o estoque atual?
- Quais matérias-primas são necessárias para produzir um produto?
- Qual o valor estimado da produção?
- Como está a distribuição do estoque?

---

# Backend API

Este frontend consome a API:

👉 [Repositório do Backend](https://github.com/Priscila-Santos/production_control_API.git)

---

# Funcionalidades

## Dashboard

Painel com métricas da produção:

- Total de produtos
- Total de matérias-primas
- Quantidade total em estoque
- Valor estimado de produção

Gráficos:

- **Production Value Trend** (produção mensal)
- **Stock Distribution** (distribuição do estoque)

Tecnologia de gráficos:

- Recharts

---

## Product Management

Permite:

- Criar produtos
- Editar produtos
- Remover produtos
- Listar produtos

---

## Raw Materials Management

Permite:

- Cadastrar matérias-primas
- Atualizar estoque
- Remover materiais
- Listar materiais

---

## Product Composition

Define quais matérias-primas são usadas em cada produto.

Exemplo:

| Produto | Matéria-prima | Quantidade |
|--------|---------------|-----------|
| Bread | Flour | 0.5 kg |
| Bread | Yeast | 0.05 kg |

---

## Production Suggestions

Calcula automaticamente:

- Quantidade possível de produção
- Valor estimado da produção

Exemplo:

| Produto | Produção | Preço | Valor Total |
|--------|----------|------|-------------|
| Bread | 100 | $5 | $500 |

---

# Arquitetura

```

React
↓
RTK Query
↓
REST API
↓
Spring Boot Backend
↓
PostgreSQL

```

---

# Tecnologias utilizadas

- React
- TypeScript
- Vite
- Redux Toolkit
- RTK Query
- Recharts
- Lucide Icons
- CSS Modules

---

# Estrutura do projeto

```

src
├ components
│   ├ dashboard
│   │   └ StatCard
│   ├ shared
│   │   ├ DataTable
│   │   └ Dialog
│
├ features
│   ├ products
│   ├ rawMaterials
│   ├ compositions
│   ├ production
│   └ dashboard
│
├ pages
│   ├ Dashboard.tsx
│   ├ Products.tsx
│   ├ RawMaterials.tsx
│   ├ ProductComposition.tsx
│   └ ProductionSuggestions.tsx
│
├ services
│   └ api.ts

```

---

# Configuração da API

Arquivo:

```

services/api.ts

````

```ts
baseUrl: "http://localhost:8080/api"
````

---

# Como executar

## 1 Clonar repositório

```
git clone https://github.com/Priscila-Santos/production_control_app_frontend.git
```

---

## 2 Instalar dependências

```
npm install
```

---

## 3 Executar aplicação

```
npm run dev
```

Aplicação disponível em:

```
http://localhost:5173
```

---

# Fluxo recomendado de uso

1 Criar matérias-primas
2 Criar produtos
3 Definir composição do produto
4 Atualizar estoque
5 Consultar sugestões de produção
6 Visualizar dashboard

---

# Melhorias futuras

* Autenticação de usuários
* Controle de ordens de produção
* Histórico de produção
* Atualização em tempo real do dashboard
* Exportação de relatórios

---

# Autora

Projeto desenvolvido por **Priscila Santos**