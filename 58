import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock, Key, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecovery(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
    } else {
      setMessage('Password updated successfully! Redirecting to login...');
      setTimeout(() => navigate('/admin/login'), 2000);
    }
    setIsLoading(false);
  };

  if (!isRecovery) {
    return (
      <div className="min-h-screen bg-ui-background flex items-center justify-center">
        <div className="text-center p-8">
            <h1 className="text-xl text-ui-text-secondary">Waiting for password recovery link...</h1>
            <p className="text-ui-text-secondary/80">Please access this page through the link sent to your email.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark-blue to-brand-dark-teal flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-ui-surface rounded-lg shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-mid-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <Key className="w-8 h-8 text-ui-text-light" />
          </div>
          <h1 className="text-2xl font-bold text-ui-text-primary mb-2 font-serif">Update Your Password</h1>
          <p className="text-ui-text-secondary">Enter a new, strong password for your account.</p>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-6">
          {error && <div className="bg-rose-100 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm">{error}</div>}
          {message && <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">{message}</div>}
          
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-ui-text-secondary mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ui-text-secondary/50 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-black/10 rounded-lg bg-ui-background"
                placeholder="Enter new password"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ui-text-secondary/50 hover:text-ui-text-secondary">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading || !!message} className="w-full bg-brand-coral text-brand-dark-blue py-3 px-4 rounded-lg hover:bg-opacity-90 font-semibold disabled:opacity-50">
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdatePassword;
