import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import App from "./app/App.tsx";
import Auth from "./app/Auth.tsx";
import "./styles/index.css";

function Root() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <p className="text-gray-600">Loading...</p>
    </div>
  );

  return session ? <App session={session} /> : <Auth />;
}

createRoot(document.getElementById("root")!).render(<Root />);