import React from "react";
import { useNavigate } from "react-router-dom";
import "src/styles/404.css"

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main className="not-found relative flex h-screen w-full flex-col items-center justify-center gap-8">
      <div className="blur-blob blob-1"></div>
      <div className="blur-blob blob-2"></div>
      <h1 className="big-heading mt-sect-default">404</h1>
      <p className="p-medium text-center">
        The page you are looking for might have been removed <br /> had its name
        changed or is temporarily unavailable.
      </p>
      <button
        className="btn bg-background-dark uppercase text-text-dark"
        onClick={() => navigate("/")}
      >
        Back to home
      </button>
    </main>
  );
};

export default NotFoundPage;
