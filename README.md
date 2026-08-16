# 🚀 INVESTORA - Plataforma Digital de Investimento

**Versão 1.0.0** | Desenvolvido com as melhores tecnologias

## 📋 Visão Geral

INVESTORA é uma plataforma de investimento digital segura, com suporte a múltiplos planos de retorno fixo, sistema de comissões por indicação e painel administrativo completo.

### Características Principais

✅ **5 Planos de Investimento** com retorno fixo (2x investido)
✅ **Renda Diária Automática** via sistema de cron-job
✅ **Sistema de Convites** com comissão de 4%
✅ **Múltiplos Métodos de Depósito** (Banco, Unitel Pay, PayPal)
✅ **Painel Administrativo Completo** com gerenciamento de usuários
✅ **Autenticação Segura** com JWT e hash bcrypt
✅ **Históricos Completos** de todas as transações
✅ **Suporte 24/7** via WhatsApp e Telegram

---

## 🛠️ Stack Tecnológico

### Backend
- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Banco de Dados**: PostgreSQL 14+
- **Autenticação**: JWT + bcrypt
- **Job Scheduler**: node-cron
- **ORM**: Sequelize
- **Validação**: Joi
- **Testing**: Jest + Supertest
- **Logging**: Winston
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 18+
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **Estado**: Redux Toolkit
- **Requisições HTTP**: Axios
- **Roteamento**: React Router v6
- **Form Validation**: React Hook Form + Zod
- **UI Components**: Radix UI
- **Responsive Design**: Mobile First

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- Docker & Docker Compose
- Git

### Com Docker Compose

```bash
git clone https://github.com/pr497-up/investora-platform.git
cd investora-platform
docker-compose up -d
```

**Acesso:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin: http://localhost:3000/admin
- API Docs: http://localhost:5000/api/docs

---

## 💰 Planos de Investimento

| Plano | Investimento | Retorno | Renda Diária | Período |
|-------|--------------|---------|--------------|----------|
| 🟢 Foort Start | 6.500 Kz | 13.000 Kz | 217 Kz | ~60 dias |
| 🔵 Foort Growth | 15.000 Kz | 30.000 Kz | 500 Kz | ~60 dias |
| 🟡 Foort Premium | 35.000 Kz | 70.000 Kz | 1.167 Kz | ~60 dias |
| 🔴 Foort Business | 65.000 Kz | 130.000 Kz | 2.167 Kz | ~60 dias |
| ⭐ Foort Elite | 103.000 Kz | 206.000 Kz | 3.434 Kz | ~60 dias |

---

## 🔒 Segurança

✅ Autenticação JWT com refresh tokens
✅ Senha de 6 dígitos com hash bcrypt (10 rounds)
✅ Proteção contra SQL Injection (Sequelize + Prepared Statements)
✅ Proteção contra XSS (React sanitize)
✅ Rate limiting em endpoints sensíveis
✅ CORS configurado
✅ HTTPS obrigatório em produção
✅ Logs de todas as ações do admin
✅ Bloqueio automático após 3 tentativas
✅ Sessão com expiração de 24h

---

## 📞 Suporte

- **WhatsApp**: 955748798
- **Telegram**: @eurynoviss1

---

**Status**: 🚧 Em Desenvolvimento | v1.0.0