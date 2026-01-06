"use client";
import { useEffect, useState } from "react";
import { WordOption } from "@/app/types";
export default function Admin() {

  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [words, setWords] = useState<WordOption[]>([]);
  const [error, setError] = useState<string>("");
  const [newWord, setNewWord] = useState<string>("");
  const [wordError, setWordError] = useState<string>("");

  useEffect(() => {
    if (authenticated) {
      fetch('/api/words', {
        method: 'GET',
        cache: 'no-store',
      }).then(res => res.json()).then(data => {
        setWords(data.words);
      });
    }
  }, [authenticated]);

  const handleAuthenticate = () => {
    setError("");
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setAuthenticated(true);
        setError("");
      } else {
        setAuthenticated(false);
        setPassword("");
        setError("Invalid password. Only Dad knows the password!");
      }
    }).catch(() => {
      setError("An error occurred. Please try again.");
      setPassword("");
    });
  }

  const handleSetAsCurrentWord = async(id: number) => {

    await fetch(`/api/words/set-current`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const newWords = words.map(word => word.id === id ? { ...word, isCurrentWord: true } : { ...word, isCurrentWord: false });
      setWords(newWords);
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAuthenticate();
    }
  }

  const handleNewWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
    setNewWord(value);
    
    // Validate word length
    if (value.length > 0 && (value.length < 4 || value.length > 10)) {
      setWordError('Word must be between 4 and 10 characters');
    } else {
      setWordError('');
    }
  }

  const handleAddWord = async () => {
    if (newWord.length < 4 || newWord.length > 10) {
      setWordError('Word must be between 4 and 10 characters');
      return;
    }

    setWordError('');
    try {
      const response = await fetch('/api/words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: newWord }),
      });

      if (!response.ok) {
        const data = await response.json();
        setWordError(data.error || 'Failed to add word');
        return;
      }

      // Refresh words list
      const wordsResponse = await fetch('/api/words', {
        method: 'GET',
        cache: 'no-store',
      });
      const wordsData = await wordsResponse.json();
      setWords(wordsData.words);
      setNewWord('');
    } catch (error) {
      setWordError('An error occurred while adding the word');
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Dad&apos;s Login</h1>
          <p className="text-sm text-gray-600 mb-6">Only Dad knows the password!</p>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            onClick={handleAuthenticate}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Authenticate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Word Admin</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">Word List</h2>
          </div>

          <div className="px-6 py-4">
            <div className="mb-2">
              <input 
                type="text" 
                value={newWord} 
                onChange={handleNewWordChange} 
                maxLength={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Enter new word (4-10 characters)" 
              />
              {wordError && (
                <p className="mt-1 text-sm text-red-600">{wordError}</p>
              )}
              {newWord.length > 0 && !wordError && (
                <p className="mt-1 text-sm text-gray-500">{newWord.length} characters</p>
              )}
            </div>
            <button 
              className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed" 
              onClick={handleAddWord}
              disabled={newWord.length < 4 || newWord.length > 10 || wordError !== ''}
            >
              Add Word
            </button>
          </div>

          <ul className="divide-y divide-gray-200">
            {words.map((word) => (
              <li
                key={word.id}
                className={`px-6 py-4 transition-colors ${
                  word.isCurrentWord
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-medium ${
                      word.isCurrentWord ? 'text-blue-700' : 'text-gray-800'
                    }`}>
                      {word.word}
                    </span>
                    {word.isCurrentWord ? (
                      <span className="px-2 py-1 text-xs font-semibold bg-blue-500 text-white rounded-full">
                        Current
                      </span>
                    ) : (
                      <button className="px-2 py-1 text-xs font-semibold bg-blue-100 text-white rounded-full hover:bg-blue-300" onClick={() => handleSetAsCurrentWord(word.id)}>
                        Set as current word
                      </button>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(word.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}