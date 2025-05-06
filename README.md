# Vocify

**Vocify** is an AI-powered mock interview platform that simulates real interview experiences using voice-based AI, tailored to the user’s preferences. It provides detailed feedback and analytics to help users improve their performance.

## 🚀 Features

- 🎤 Voice-based AI interview simulation using **Vapi**
- 👤 User authentication and session management with **Firebase**
- 📋 Dynamic question generation based on user preferences
- 🧠 Feedback generation using stored responses
- 📊 Interview history and analytics dashboard

## 🛠️ Tech Stack

- **Frontend**: Next.js, Tailwind CSS, TypeScript
- **Backend**: Firebase (Firestore, Auth)
- **AI Voice API**: Vapi AI
- **State & Data Management**: Zod

## 📁 Folder Structure

```

vocify/
├── app/
│   ├── (auth) /                     # Authentication routes
│   │   ├── sign-in/                 # Login page
│   │   ├── sign-up/                 # Registration page
│   │   └── layout.tsx               # Authentication layout
│   ├── (root)                       # Main routes and layout
│   │   ├── interview/               # Interview page
│   │        └── [id]/               # Interview session page
│   │              └── Feedback/     # Feedback page
│   │   ├── layout                   # Main layout
│   │   ├── page.tsx                 # Main page
│   └── api/
│       └── vapi/
│           └── generate/            # Vapi API endpoint for generating responses
├── components/
│   ├── ui/                          # ShadCN UI components
│   ├── Agent.tsx                    # Agent interaction component
│   ├── AuthForm.tsx                 # Authentication form component
│   ├── InterviewCard.tsx            # Interview session component
│   ├── FormField.tsx                # Form field component
│   └── DisplayTechIcons             # Tech stack icons component
├── constants/                       # Static constants used across the app
├── firebase/                        # Firebase configuration and initialization
│   ├── client.ts                    # Firebase client SDK for client-side operations
│   └── admin.ts                     # Firebase admin SDK for server-side operations
├── lib/
│   ├── actions/                     # Firebase and general utility actions
│   ├── vapi.sdk.ts                  # Vapi SDK for voice interactions
│   └── utils.ts                     # Utility functions
├── types/                           # TypeScript types and interfaces
├── public/                          # Static assets
├── styles/                          # Global styles (if any)
├── .env.local                      # Environment variables
├── README.md
├── package.json
└── tsconfig.json

```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/JeetDas5/vocify
cd vocify
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## 🌐 Deployment

Vocify is deployed on **Vercel**. Ensure your environment variables are set in the Vercel dashboard before deploying.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Jeet Das**
🔗 [vocify.jeetdas.tech](https://vocify.jeetdas.tech)
🌐 [jeetdas.tech](https://jeetdas.tech)
💼 [LinkedIn](https://www.linkedin.com/in/jeet-das-7633a52ab)
🐙 [GitHub](https://github.com/JeetDas5)

---
