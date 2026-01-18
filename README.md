# 📊 Painel de Vendas Admin (Full-Stack Cloud)

Um dashboard administrativo moderno para gestão de vendas e clientes, desenvolvido com foco em performance, experiência do usuário (UX) e infraestrutura em nuvem. Este projeto demonstra a transição de uma aplicação frontend isolada para uma plataforma Full-Stack escalável.

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-Auth/Firestore-orange?style=for-the-badge&logo=firebase)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)

## ✨ Funcionalidades

- **🔐 Autenticação Real (Identity Cloud):** Sistema de login seguro via Firebase Authentication.
- **📈 Dashboard de Vendas:** Métricas em tempo real, Ticket Médio e Gráficos de Receita integrados ao banco.
- **📦 Gestão de Pedidos (CRUD):** Persistência em nuvem com atualizações instantâneas entre dispositivos.
- **👥 Gestão de Clientes:** Base de dados centralizada com sincronização assíncrona.
- **🌓 Dark Mode Nativo:** Alternância inteligente entre temas claro e escuro.
- **⚡ Sincronização Real-Time:** Utilização de WebSockets (via Firestore) para refletir mudanças sem refresh.
- **📱 Responsividade:** Interface adaptada para smartphones, tablets e desktops.

## 🚀 Tecnologias Utilizadas

- **React 19:** Hooks modernos e Context API para gerenciamento de estado global.
- **Firebase Auth:** Gerenciamento seguro de sessões e usuários.
- **Cloud Firestore:** Banco de Dados NoSQL escalável com suporte a Real-time.
- **Tailwind CSS v4:** Estilização de alta performance com a nova engine utilitária.
- **Vite:** Ferramenta de build e desenvolvimento ágil.

## 🛡️ Arquitetura e Segurança

A aplicação foi projetada seguindo as melhores práticas de segurança para aplicações frontend:
- **Environment Variables:** Chaves de API protegidas e não expostas no controle de versão.
- **Security Rules:** Regras de acesso no Firestore que garantem que apenas usuários autenticados possam ler ou escrever no banco de dados.
- **Protected Routes:** Verificação de estado de autenticação em nível de componente para proteção de dados sensíveis.

## 🛠️ Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/PainelDeVendasAdmin.git
   ```

2. Entre na pasta e instale as dependências:
   ```bash
   cd PainelDeVendasAdmin && npm install
   ```

3. Crie um arquivo `.env.local` na raiz com suas credenciais do Firebase:
   ```env
   VITE_FIREBASE_API_KEY=sua_chave
   VITE_FIREBASE_AUTH_DOMAIN=seu_dominio
   VITE_FIREBASE_PROJECT_ID=seu_id
   ...
   ```

4. Inicie o projeto:
   ```bash
   npm run dev
   ```

> **Credenciais de Acesso (Demo):**  
> **Usuário:** `admin@loja.com.br`  
> **Senha:** `admin123`  
> **Link do Projeto:** [painel-de-vendas-admin.vercel.app](https://painel-de-vendas-admin.vercel.app/)

## 💼 Evolução Profissional

Este projeto iniciou como uma aplicação de estado local (`LocalStorage`) e foi evoluído para uma infraestrutura **Serverless**. Essa transição demonstra minha capacidade de:
- Integrar APIs de terceiros e serviços de nuvem (BaaS).
- Gerenciar estados assíncronos e tratamento de erros de rede.
- Implementar regras de segurança rígidas em camadas de banco de dados.
- Configurar fluxos de CI/CD e Deployment automatizado.

---
Desenvolvido por [Seu Nome] - Conecte-se comigo no [LinkedIn](seu-link-aqui)!
