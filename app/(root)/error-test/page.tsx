'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFetchWithError } from '@/hooks/useFetchWithError';

export default function ErrorTestPage() {
  const { fetchData, error: fetchError, isLoading } = useFetchWithError();
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testThrowError = () => {
    addResult('Testing: Throwing error...');
    throw new Error('This is a test error from the error boundary');
  };

  const testApiError = async () => {
    addResult('Testing: Calling non-existent API endpoint...');
    const { data, error } = await fetchData('/api/non-existent-endpoint');
    if (error) {
      addResult(`API Error: ${error.message} (Code: ${error.code})`);
    } else {
      addResult(`API Success: ${JSON.stringify(data)}`);
    }
  };

  const testValidApi = async () => {
    addResult('Testing: Calling valid endpoint...');
    const { data, error } = await fetchData('/api/debug/env');
    if (error) {
      addResult(`API Error: ${error.message}`);
    } else {
      addResult(`API Success: Endpoint responded`);
    }
  };

  const testNetworkError = async () => {
    addResult('Testing: Network error (timeout)...');
    try {
      const { data, error } = await fetchData('http://invalid-url-12345.com/api/test');
      if (error) {
        addResult(`Network Error: ${error.message}`);
      }
    } catch (err: any) {
      addResult(`Caught Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Error Handling Test Suite
          </h1>
          <p className="text-gray-600">
            Test all error handling features of the application
          </p>
        </div>

        {/* Test Buttons */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Test Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={testThrowError}
              className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              🔴 Test Error Boundary
            </button>
            <button
              onClick={testApiError}
              disabled={isLoading}
              className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : '🟠 Test API Error'}
            </button>
            <button
              onClick={testValidApi}
              disabled={isLoading}
              className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : '🟢 Test Valid API'}
            </button>
            <button
              onClick={testNetworkError}
              disabled={isLoading}
              className="px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : '🟡 Test Network Error'}
            </button>
          </div>
        </div>

        {/* Test Results */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Test Results
          </h2>
          <div className="bg-white rounded border border-gray-200 p-4 max-h-96 overflow-y-auto font-mono text-sm">
            {testResults.length === 0 ? (
              <p className="text-gray-400">Click a test button to see results...</p>
            ) : (
              <ul className="space-y-2">
                {testResults.map((result, idx) => (
                  <li key={idx} className="text-gray-700">
                    <span className="text-blue-600">[{idx + 1}]</span> {result}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Current Error State */}
        {fetchError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-red-900 mb-2">Current Error:</h3>
            <p className="text-red-700 text-sm mb-2">
              <strong>Message:</strong> {fetchError.message}
            </p>
            {fetchError.code && (
              <p className="text-red-700 text-sm mb-2">
                <strong>Code:</strong> {fetchError.code}
              </p>
            )}
            {fetchError.status && (
              <p className="text-red-700 text-sm">
                <strong>HTTP Status:</strong> {fetchError.status}
              </p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-3">Test Other Pages:</h3>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/404"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
            >
              → 404 Page
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
            >
              → Home Page
            </Link>
            <Link
              href="/transformations"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
            >
              → Transformations
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gray-100 border border-gray-300 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">ℹ️ Test Guide:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✅ <strong>Error Boundary:</strong> Catches component errors and prevents full app crash</li>
            <li>✅ <strong>API Error:</strong> Tests error handling for failed API requests</li>
            <li>✅ <strong>Valid API:</strong> Confirms successful API calls work correctly</li>
            <li>✅ <strong>Network Error:</strong> Tests handling of network failures</li>
            <li>✅ <strong>404 Page:</strong> Tests the not-found error page</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
