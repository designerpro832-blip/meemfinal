import React, { useState, useEffect } from 'react';
import { Calendar, User, Eye, Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { NewsItem } from '../types';

const News: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Announcement', 'Update', 'Event', 'Result'];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('news')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (selectedCategory !== 'all') {
          query = query.eq('category', selectedCategory);
        }

        const { data, error: queryError } = await query;

        if (queryError) throw queryError;
        setNewsItems(data || []);
      } catch (err: any) {
        setError("Could not fetch news. Please ensure your Supabase project is connected and running.");
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  const filteredNews = newsItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.excerpt && item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const featuredNews = filteredNews.filter(item => item.is_featured);
  const regularNews = filteredNews.filter(item => !item.is_featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-ui-text-primary mb-4 font-serif">Latest News & Updates</h1>
          <p className="text-ui-text-secondary max-w-2xl mx-auto">
            Stay updated with the latest announcements, events, and news from Muhimmath
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-ui-surface rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ui-text-secondary/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-black/10 rounded-lg focus:ring-2 focus:ring-brand-light-blue focus:border-transparent bg-ui-background text-ui-text-primary"
              />
            </div>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border border-black/10 rounded-lg focus:ring-2 focus:ring-brand-light-blue focus:border-transparent bg-ui-background text-ui-text-primary"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-brand-mid-blue animate-spin" />
            <span className="ml-4 text-ui-text-secondary">Loading News...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-rose-100 border border-rose-400 text-rose-700 px-4 py-3 rounded-lg inline-block">
              <h3 className="font-bold">Connection Error</h3>
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Featured News */}
            {featuredNews.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-ui-text-primary mb-6 font-serif">Featured News</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredNews.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-ui-surface rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <img
                        src={item.image_url || 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/800x400/134D80/FFFFFF?text=News'}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-ui-text-secondary mb-3">
                          <span className="bg-black/5 text-ui-text-primary px-2 py-1 rounded-full text-xs">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(item.created_at)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {item.views}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-ui-text-primary mb-3">{item.title}</h3>
                        <p className="text-ui-text-secondary mb-4">{item.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-ui-text-secondary">
                            <User className="w-4 h-4" />
                            {item.author}
                          </div>
                          <button className="text-brand-mid-blue hover:text-brand-dark-blue font-semibold">
                            Read More →
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Regular News */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-ui-text-primary mb-6 font-serif">All News</h2>
              <div className="space-y-6">
                {regularNews.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-ui-surface rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <img
                        src={item.image_url || 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/800x400/134D80/FFFFFF?text=News'}
                        alt={item.title}
                        className="w-full md:w-48 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-4 text-sm text-ui-text-secondary mb-3">
                          <span className="bg-black/5 text-ui-text-primary px-2 py-1 rounded-full text-xs">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(item.created_at)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {item.views}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-ui-text-primary mb-3">{item.title}</h3>
                        <p className="text-ui-text-secondary mb-4">{item.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-ui-text-secondary">
                            <User className="w-4 h-4" />
                            {item.author}
                          </div>
                          <button className="text-brand-mid-blue hover:text-brand-dark-blue font-semibold">
                            Read More →
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredNews.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="text-ui-text-secondary/40 text-6xl mb-4">📰</div>
                  <h3 className="text-xl font-semibold text-ui-text-secondary/80 mb-2">No News Found</h3>
                  <p className="text-ui-text-secondary/70">Try adjusting your search criteria.</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default News;
