import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-10 w-full p-4 bg-white border-t border-gray-200 shadow sm:flex sm:items-center sm:justify-between sm:p-6 dark:bg-gray-800 dark:border-gray-600">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023 <Link to="/" className="hover:underline">Food App</Link>. All Rights Reserved.
      </span>
    </footer>
  );
}

