
  # High-Impact Web Interface Design

  This is a code bundle for High-Impact Web Interface Design. The original project is available at https://www.figma.com/design/jJoCVF6vrC89hk9rSg0gjr/High-Impact-Web-Interface-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ## Deployment (Netlify / Vercel / Render)

  - The frontend uses `Vite`. When deploying the frontend separately from the backend, set a runtime environment variable `VITE_API_BASE_URL` to point to your backend API root (for example `https://api.yourdomain.com`). The code falls back to `/api` when the variable is not set (useful when serving both frontend and backend from the same host).

  - Example (Vercel): in the Project Settings → Environment Variables, add `VITE_API_BASE_URL = https://your-backend.example.com` for `Production`.
  - Example (Netlify): in Site Settings → Build & deploy → Environment, add `VITE_API_BASE_URL`.
  - Example (Render): in your Web Service settings, add an environment variable `VITE_API_BASE_URL`.

  Backend notes:
  - Deploy the backend (the `backend` folder) to any host (Render, Heroku, etc.). Ensure `MONGODB_URI` and `JWT_SECRET` are set in the backend environment.
  - To enable AI features (schedule generation, insights), set `GROQ_API_KEY` in the backend environment (e.g., `GROQ_API_KEY=sk-xxxxx`). If it's missing, the AI endpoints will return a clear message and the UI will display an explanatory error.
  - CORS is enabled by default in the backend; if you host frontend and backend on different domains, set the frontend URL in your hosting provider and the `VITE_API_BASE_URL` accordingly.

  After deployment, build the frontend (`npm run build`) and publish the `dist` directory according to your host's instructions.