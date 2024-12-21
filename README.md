# AI-Powered Blog Platform

A full-stack blog application with AI-generated summaries, built with React, Node.js, Express, and MongoDB.

## Features

- 📝 Create, read, update, and delete blog posts
- 🤖 AI-powered automatic summary generation
- 📱 Responsive Material-UI design
- 📝 Rich text editor for content creation
- 🔍 View detailed posts with summaries

## Tech Stack

### Frontend
- React
- Material-UI
- React Router DOM
- React Quill (Rich Text Editor)
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- OpenAI API for summary generation

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-blog-platform.git
cd ai-blog-platform
```

2. Install dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Environment Setup

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-ai
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the application

```bash
# Start backend server (from server directory)
npm run dev

# Start frontend development server (from client directory)
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
blog-ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── App.js        # Main App component
│   └── package.json
│
└── server/                # Node.js backend
    ├── config/           # Configuration files
    ├── models/          # Database models
    ├── routes/          # API routes
    ├── services/        # Business logic
    ├── server.js        # Server entry point
    └── package.json
```

## API Endpoints

- `POST /api/posts` - Create a new blog post
- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get a specific post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- OpenAI for providing the AI summarization capabilities
- Material-UI for the component library
- React Quill for the rich text editor
