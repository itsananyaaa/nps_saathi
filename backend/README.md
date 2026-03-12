# NPS Saathi Backend Architecture

A scalable, modular Node.js backend designed for the NPS Saathi fintech AI platform.

## 🚀 Tech Stack
- **Node.js (Express.js)**: Core web framework.
- **PostgreSQL**: Relational database for financial data integrity.
- **JWT**: Stateless authentication.
- **REST APIs**: Organized by domain.

## 📁 Project Structure
The project follows a **Modular Monolith** pattern, making it highly scalable and ready for a microservices transition.

```text
src/
├── config/             # DB and core configurations
├── middleware/         # Auth and shared middleware
├── modules/            # Domain-specific modules
│   ├── auth/           # Authentication & Registration
│   ├── profiles/       # User Profile management
│   ├── finance/        # Financial data tracking
│   ├── simulations/    # Pension AI simulations
│   ├── documents/      # DigiLocker integration
│   └── aggregation/    # Account Aggregator (AA) flows
├── utils/              # Shared helper functions
├── app.js              # Express app initialization
└── server.js           # Server entry point
```

## 🛡️ Secure Data Flow
1. **Authentication**: All sensitive routes are protected by the `protect` middleware, which verifies the JWT in the Authorization header.
2. **Authorization**: Role-based access control (RBAC) ensures users only access what they own.
3. **External Integrations**:
   - **DigiLocker**: OAuth2 flow implemented in the `documents` module.
   - **Account Aggregator**: Consent-driven fetching logic in `aggregation`.
4. **Validation**: All incoming requests are validated to prevent injection and malformed data.

## ⚙️ How to Run
1. Configure `.env` with your DB credentials.
2. Install dependencies: `npm install`
3. Start in dev mode: `npm run dev`

## 📡 API Endpoints
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/simulations/pension` - Run AI pension projection
- `GET /api/v1/documents/digilocker/fetch` - Retrieve DigiLocker docs
- `GET /api/v1/aggregation/aa/fetch` - Aggregate financial data
