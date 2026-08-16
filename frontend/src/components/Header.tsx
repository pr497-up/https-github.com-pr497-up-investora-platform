import React from 'react';
import { Navigation, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Navigation className="w-8 h-8" />
          <Link to="/" className="text-2xl font-bold">
            INVESTORA
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/955748798"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:bg-secondary px-3 py-2 rounded-lg transition"
          >
            <Phone className="w-5 h-5" />
            <span className="hidden sm:inline">955748798</span>
          </a>
          <a
            href="https://t.me/eurynoviss1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:bg-secondary px-3 py-2 rounded-lg transition"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Telegram</span>
          </a>
        </div>
      </div>
    </header>
  );
};
