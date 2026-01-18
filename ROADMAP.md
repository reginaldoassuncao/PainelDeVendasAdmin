# 🗺️ Roadmap: Migração para Firebase

Este documento descreve os passos para migrar a persistência de dados do LocalStorage para o **Google Firebase**, transformando o Painel de Vendas em uma aplicação Full-Stack.

---

## 🎯 Objetivo
Substituir o gerenciamento de estado local por uma infraestrutura em nuvem, permitindo autenticação real, banco de dados escalável e sincronização em tempo real.

---

## 📍 Fase 1: Fundação e Setup
*   [x] **Criação do Projeto:** Configurar novo projeto no [Firebase Console](https://console.firebase.google.com/).
*   [x] **Instalação de Dependências:** `npm install firebase`.
*   [x] **Configuração do SDK:** Criar `src/firebase/config.js` com as chaves de API.
*   [x] **Segurança de Variáveis:** Configurar `.env` e `.env.local` para proteger as chaves no GitHub.

## 📍 Fase 2: Autenticação (Firebase Auth)
*   [x] **Ativação de Métodos:** Habilitar login por E-mail/Senha no console.
*   [x] **Hook de Autenticação:** Criar um contexto de autenticação (`AuthContext`) para gerenciar o estado global do usuário.
*   [x] **Substituição do Login:** Trocar a lógica de `loginAdmin` em `Login.jsx` pela função `signInWithEmailAndPassword`.
*   [x] **Persistência de Sessão:** Utilizar `onAuthStateChanged` para manter o usuário logado entre recarregamentos.

## 📍 Fase 3: Banco de Dados (Cloud Firestore)
*   [x] **Provisionamento:** Criar coleção `orders` e `customers` no Cloud Firestore.
*   [x] **Migração de Escrita:**
    *   Alterar `saveOrder` para usar `addDoc` ou `setDoc`.
    *   Alterar cadastro de clientes para salvar no Firestore.
*   [x] **Migração de Leitura:**
    *   Implementar `getDocs` para carregar dados iniciais.
    *   **Bônus:** Implementar `onSnapshot` para atualizações em tempo real (Real-time).

## 📍 Fase 4: Cloud Storage (Opcional/Futuro)
*   [ ] **Upload de Imagens:** Permitir que o usuário adicione fotos de produtos ou avatares de clientes.

## 📍 Fase 5: Segurança e Deploy
*   [x] **Security Rules:** Escrever regras para permitir que apenas administradores autenticados leiam/escrevam no banco.
*   [x] **Deploy:** Publicar a aplicação na Vercel integrada ao Firebase.

---

## 📝 Notas de Progresso
*   **Branch Atual:** `migrando-projeto-para-firebase`
*   **Status:** Iniciado 🚀
