# Production Planning System

Sistema full-stack para **gestão de produtos, matérias-primas e planejamento de produção**, permitindo calcular automaticamente **quantos produtos podem ser fabricados com base no estoque disponível**.

A aplicação ajuda a responder perguntas como:

* Quantos produtos podem ser produzidos com o estoque atual?
* Quais matérias-primas são necessárias para fabricar um produto?
* Qual o valor total estimado da produção?

---

##  Funcionalidades

### Product Management

* Criar produtos
* Listar produtos
* Editar produtos
* Remover produtos

---

### Raw Materials Management

* Cadastrar matérias-primas
* Atualizar estoque
* Listar materiais disponíveis

---

###  Product Composition

Define **quais matérias-primas compõem um produto**.

Exemplo:

| Produto | Matéria-prima | Quantidade |
| ------- | ------------- | ---------- |
| Bread   | Flour         | 0.5 kg     |
| Bread   | Yeast         | 0.05 kg    |

---

###  Production Suggestions

Calcula automaticamente:

* Quantos produtos podem ser fabricados com o estoque atual
* O valor estimado da produção

Exemplo:

| Produto | Possível Produção | Preço | Valor Total |
| ------- | ----------------- | ----- | ----------- |
| Bread   | 100               | $5    | $500        |

---

##  Arquitetura

A aplicação segue arquitetura **Full Stack separada**:

```
Frontend (React + RTK Query)
        ↓
REST API
        ↓
Backend (Spring Boot)
        ↓
PostgreSQL Database
```

---

##  Tecnologias

### Frontend

* React
* TypeScript
* Redux Toolkit
* RTK Query
* Vite
* Lucide Icons

---

### Backend

* Java 17+
* Spring Boot
* Spring Data JPA
* Bean Validation
* Lombok
* PostgreSQL

---

## Banco de Dados

* PostgreSQL
* Migrations SQL

---

## 🗂 Estrutura do Projeto

### Frontend

```
frontend
 ├ features
 │   ├ products
 │   ├ rawMaterials
 │   ├ compositions
 │   └ production
 │
 ├ pages
 │   ├ Products.tsx
 │   ├ RawMaterials.tsx
 │   ├ ProductComposition.tsx
 │   └ ProductionSuggestions.tsx
 │
 ├ components
 │   ├ shared
 │   │   ├ DataTable
 │   │   └ Dialog
 │   └ composition
 │       └ CompositionForm
```

---

### Backend

```
backend
 ├ product
 │   ├ entity
 │   ├ controller
 │   ├ service
 │   └ repository
 │
 ├ rawmaterial
 │   ├ entity
 │   ├ controller
 │   ├ service
 │   └ repository
 │
 ├ composition
 │   ├ entity
 │   ├ dto
 │   ├ mapper
 │   ├ controller
 │   └ service
 │
 └ production
     ├ controller
     └ service
```

---

## 🗄 Estrutura do Banco de Dados

### Products

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL
);
```

---

### Raw Materials

```sql
CREATE TABLE raw_materials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    stock_quantity NUMERIC(15,3) NOT NULL CHECK (stock_quantity >= 0)
);
```

---

### Product Composition

Relacionamento **N:N entre produto e matéria-prima**.

```sql
CREATE TABLE product_raw_materials (
    product_id BIGINT NOT NULL,
    raw_material_id BIGINT NOT NULL,
    required_quantity NUMERIC(15,3) NOT NULL CHECK (required_quantity > 0),

    PRIMARY KEY (product_id, raw_material_id),

    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (raw_material_id) REFERENCES raw_materials(id)
);
```

---

## 🔌 API Endpoints

### Products

| Método | Endpoint             |
| ------ | -------------------- |
| GET    | `/api/products`      |
| POST   | `/api/products`      |
| PUT    | `/api/products/{id}` |
| DELETE | `/api/products/{id}` |

---

## Raw Materials

| Método | Endpoint                  |
| ------ | ------------------------- |
| GET    | `/api/raw-materials`      |
| POST   | `/api/raw-materials`      |
| PUT    | `/api/raw-materials/{id}` |
| DELETE | `/api/raw-materials/{id}` |

---

## Product Composition

| Método | Endpoint                                           |
| ------ | -------------------------------------------------- |
| GET    | `/api/product-materials/product/{productId}`       |
| POST   | `/api/product-materials`                           |
| DELETE | `/api/product-materials?productId=&rawMaterialId=` |

---

## Production Suggestions

Calcula automaticamente a produção possível.

| Método | Endpoint                      |
| ------ | ----------------------------- |
| GET    | `/api/production/suggestions` |

---

# 🚀 Como executar o projeto

## 1️⃣ Clonar repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

---

## 2️⃣ Backend

Entrar na pasta do backend:

```bash
cd backend
```

Executar aplicação:

```bash
./mvnw spring-boot:run
```

ou

```bash
mvn spring-boot:run
```

Servidor rodará em:

```
http://localhost:8080
```

---

## 3️⃣ Frontend

Entrar na pasta:

```bash
cd frontend
```

Instalar dependências:

```bash
npm install
```

Rodar aplicação:

```bash
npm run dev
```

Frontend disponível em:

```
http://localhost:5173
```

---

## Lógica de Production Suggestions

O sistema calcula a produção possível usando a fórmula:

```
produção possível = estoque disponível / quantidade necessária
```

Para cada matéria-prima:

```
possible = floor(stock / required_quantity)
```

A produção máxima de um produto é o **menor valor entre todos os materiais necessários**.

---

## Exemplo

Produto:

```
Bread
```

Composição:

| Material | Quantidade |
| -------- | ---------- |
| Flour    | 0.5 kg     |
| Yeast    | 0.05 kg    |

Estoque:

| Material | Estoque |
| -------- | ------- |
| Flour    | 50 kg   |
| Yeast    | 3 kg    |

Cálculo:

```
Flour → 50 / 0.5 = 100
Yeast → 3 / 0.05 = 60
```

Produção máxima:

```
60 breads
```

---

## Possíveis Melhorias

* Controle de ordens de produção
* Histórico de produção
* Dashboard com gráficos
* Autenticação de usuários
* Atualização automática de estoque após produção

---

## Autora

Desenvolvido como case tecnico:

* Full Stack Development
* API REST
* Arquitetura Backend
* Integração React + Spring Boot

