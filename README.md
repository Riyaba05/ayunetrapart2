# Ayunetra - Your AI-Powered Health Assistant 🏥

## Overview

Ayunetra is an intelligent healthcare assistant that provides personalized recommendations for common day-to-day health concerns. Powered by advanced AI technology, it helps users manage and find relief from various common ailments such as cough, fever, sneezing, acidity, and more.

## Features 🌟

- **Personalized Health Recommendations**: Get tailored advice based on your specific symptoms
- **Common Ailment Support**: Assistance for daily health issues including:
  - Fever
  - Cough
  - Sneezing
  - Acidity
  - And many more common conditions
- **User-Friendly Interface**: Easy-to-use chatbot interface for seamless interaction
- **24/7 Availability**: Access health recommendations anytime, anywhere
- **Safe and Reliable**: Focuses on common health issues while clearly directing serious conditions to medical professionals

## Important Note ⚠️

Ayunetra is designed to provide general guidance for common, non-severe health conditions. It is not a replacement for professional medical advice. Always consult a healthcare provider for serious medical conditions.

## Technology Stack 💻

- Next.js - Frontend Framework
- AI/ML Backend for Intelligent Recommendations
- Modern UI/UX Design
- Real-time Chat Interface

## Getting Started 🚀

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ayunetra.git
   cd ayunetra
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your API keys and configuration:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_KEY`: Your Supabase anon/public key
     - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API key
     - `PINECONE_API_KEY`: Pinecone API key
     - `AZURE_OPENAI_ENDPOINT`: Azure OpenAI endpoint
     - `AZURE_OPENAI_API_KEY`: Azure OpenAI API key

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Contributing 🤝

We welcome contributions to Ayunetra! Please feel free to submit issues and pull requests.

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact 📧

For any queries or suggestions, please reach out to us at [contact email]

---

Built with ❤️ for better health assistance
