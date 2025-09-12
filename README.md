# 🛒 Checkout Restaurant

Um sistema de **self checkout** desenvolvido em **Next.js** para gerenciar pedidos, integrar pagamentos via **Stripe** e organizar o fluxo de consumo em restaurantes.

## 🚀 Tecnologias utilizadas

- [Next.js 15](https://nextjs.org/) – Framework React para aplicações web modernas
- [React](https://react.dev/) – Biblioteca para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) – Tipagem estática
- [Prisma ORM](https://www.prisma.io/) – ORM para banco de dados relacional
- [PostgreSQL](https://www.postgresql.org/) – Banco de dados
- [TailwindCSS](https://tailwindcss.com/) – Estilização
- [Radix UI](https://www.radix-ui.com/) – Componentes acessíveis
- [React Hook Form](https://react-hook-form.com/) – Formulários 
- [Zod](https://zod.dev/) – Validação de dados
- [Stripe](https://stripe.com/) – Integração de pagamentos
- [Sonner](https://sonner.emilkowal.ski/) – Notificações
- [Lucide React](https://lucide.dev/) – Ícones modernos

## 📌 Funcionalidades

- Cadastro e listagem de produtos
- Criação de pedidos com múltiplos produtos
- Associação de pedidos a clientes via **CPF**
- Escolha do método de consumo (ex: local, entrega)
- Redirecionamento para página de pedidos
- Integração com **Stripe** para checkout de pagamento

## 📂 Estrutura de scripts

| Script                | Descrição |
|-----------------------|-----------|
| `npm run dev`         | Inicia o servidor em modo desenvolvimento |
| `npm run build`       | Cria a build de produção |
| `npm run start`       | Inicia a aplicação em produção |
| `npm run lint`        | Executa o linter |
| `npm run postinstall` | Gera o cliente do Prisma automaticamente |
| `npx prisma migrate dev` | Executa as migrations no banco |
| `npx prisma studio`   | Abre o Prisma Studio para visualizar os dados |
| `npm run seed`        | Executa o seeder de dados (`prisma/seed.ts`) |

## 🛠️ Como rodar o projeto

1. Clone o repositório:
   ```bash
   gh repo clone nicolassaraivaa/checkout-fast-food
   

2. Instale as dependências:
   ```bash
   npm install


3. Configure as variáveis de ambiente (.env):
   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   STRIPE_SECRET_KEY="sua_chave_stripe"
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY="sua_chave_publica_stripe"

   
4. Rode as migrations do Prisma:
   ```bash
   npx prisma migrate dev

   
5. (Opcional) Popule o banco com dados iniciais:
   ```bash
   npm run seed


6. Inicie o servidor:
   ```bash
   npm run dev




