import React, { useState, useEffect, useMemo } from 'react';
import { Search, Loader2, Trophy, Users, Award, Medal, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Result, Team } from '../types';
import PosterModal from '../components/PosterModal';

const Results: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'program' | 'team'>('program');
  const [posterModalData, setPosterModalData] = useState<{ program: { event: string; category: string }; winners: Result[]; resultNumber: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const fetchPromises = [
          supabase.from('results').select('*').order('created_at', { ascending: false }),
          supabase.from('teams').select('*').order('points', { ascending: false })
        ];
        
        const [resultsResponse, teamsResponse] = await Promise.all(fetchPromises);

        if (resultsResponse.error) throw resultsResponse.error;
        setResults(resultsResponse.data || []);

        if (teamsResponse.error) throw teamsResponse.error;
        setTeams(teamsResponse.data || []);

      } catch (err: any) {
        setError("Could not fetch results. Please ensure your Supabase project is connected and running.");
        console.error("Error fetching results data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupedResults = useMemo(() => {
    if (!results) return [];
    const groups: { [key: string]: { event: string; category: string; year: string; result_number: number; winners: Result[] } } = {};

    results.forEach(result => {
        const key = `${result.event}-${result.category}-${result.year}`;
        if (!groups[key]) {
            groups[key] = {
                event: result.event,
                category: result.category,
                year: result.year,
                result_number: result.result_number,
                winners: [],
            };
        }
        groups[key].winners.push(result);
    });

    Object.values(groups).forEach(group => {
        group.winners.sort((a, b) => a.position - b.position);
    });

    return Object.values(groups).sort((a, b) => a.event.localeCompare(b.event));
  }, [results]);

  const filteredGroups = useMemo(() => {
    return groupedResults.filter(g =>
      g.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [groupedResults, searchTerm]);

  const filteredTeams = useMemo(() => {
    return teams.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [teams, searchTerm]);

  const rankColors = [
    { bg: 'bg-gradient-to-r from-brand-secondary to-blue-400', text: 'text-white' },
    { bg: 'bg-gradient-to-r from-brand-primary to-sky-200', text: 'text-brand-text' },
    { bg: 'bg-gradient-to-r from-sky-200 to-gray-100', text: 'text-brand-text' },
  ];

  const programCardColors = [
    { topBg: 'bg-brand-secondary', circleBg: 'bg-brand-secondary', textColor: 'text-white', icon: Users },
    { topBg: 'bg-brand-primary', circleBg: 'bg-brand-primary', textColor: 'text-brand-text', icon: Award },
    { topBg: 'bg-sky-300', circleBg: 'bg-sky-300', textColor: 'text-brand-text', icon: Medal },
    { topBg: 'bg-brand-secondary/80', circleBg: 'bg-brand-secondary/80', textColor: 'text-white', icon: Medal },
    { topBg: 'bg-brand-primary/80', circleBg: 'bg-brand-primary/80', textColor: 'text-brand-text', icon: Users },
  ];
  
  const handleProgramClick = (group: { event: string; category: string; result_number: number }) => {
    const programWinners = results.filter(r => r.event === group.event && r.category === group.category);
    setPosterModalData({ program: { event: group.event, category: group.category }, winners: programWinners, resultNumber: group.result_number });
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-ui-text-primary mb-2">Results</h1>
          <p className="text-ui-text-secondary">
            {loading ? 'Loading...' : `Published ${activeTab === 'program' ? filteredGroups.length : filteredTeams.length} results`}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center bg-black/5 rounded-full p-1.5">
              <button
                onClick={() => setActiveTab('program')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${
                  activeTab === 'program' ? 'bg-white text-brand-secondary shadow-md' : 'text-ui-text-secondary hover:bg-black/5'
                }`}
              >
                <Trophy size={16} /> Program
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${
                  activeTab === 'team' ? 'bg-white text-brand-secondary shadow-md' : 'text-ui-text-secondary hover:bg-black/5'
                }`}
              >
                <Users size={16} /> Team
              </button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-ui-text-secondary/50 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search by ${activeTab === 'program' ? 'program or category' : 'team name'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-transparent rounded-2xl focus:ring-2 focus:ring-brand-secondary bg-ui-surface shadow-subtle"
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12"><Loader2 className="w-8 h-8 text-brand-secondary animate-spin" /></div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-rose-100 border border-rose-400 text-rose-700 px-4 py-3 rounded-2xl inline-block">
              <h3 className="font-bold">Connection Error</h3>
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'program' && (
              <motion.div key="program-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
                {filteredGroups.length === 0 ? (
                  <div className="text-center py-12"><div className="text-ui-text-secondary/40 text-6xl mb-4">🔍</div><h3 className="text-xl font-semibold text-ui-text-secondary/80 mb-2">No Programs Found</h3><p className="text-ui-text-secondary/70">Try adjusting your search criteria.</p></div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-12">
                    {filteredGroups.map((group, index) => {
                      const color = programCardColors[index % programCardColors.length];
                      const Icon = color.icon;
                      
                      return (
                        <motion.div
                          key={`${group.event}-${group.category}`}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: (index % 24) * 0.05 }}
                          className="h-full"
                          onClick={() => handleProgramClick(group)}
                        >
                          <div className="relative bg-ui-surface rounded-3xl shadow-subtle pt-8 pb-4 px-2 text-center h-full hover:shadow-subtle-lg hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col">
                            <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-4 border-ui-surface ${color.circleBg} ${color.textColor}`}>
                                {String(group.result_number).padStart(2, '0')}
                            </div>
                            
                            <div className="flex-grow flex flex-col justify-center items-center pt-2">
                                <Icon className={`w-8 h-8 mx-auto mb-3 ${color.textColor}`} />
                                <h3 className={`font-bold text-sm text-ui-text-primary uppercase`}>{group.event}</h3>
                                <p className="text-xs text-ui-text-secondary mt-1">{group.category}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'team' && (
              <motion.div key="team-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                {filteredTeams.length === 0 ? (
                  <div className="text-center py-12"><div className="text-ui-text-secondary/40 text-6xl mb-4">👥</div><h3 className="text-xl font-semibold text-ui-text-secondary/80 mb-2">No Teams Found</h3><p className="text-ui-text-secondary/70">Try adjusting your search criteria.</p></div>
                ) : (
                  <div className="space-y-4">
                    {filteredTeams.map((team, index) => {
                      const color = rankColors[index] || { bg: 'bg-gray-200', text: 'text-gray-800' };
                      return (
                        <motion.div
                          key={team.id}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.08 }}
                          className={`relative flex items-center h-20 rounded-2xl shadow-subtle overflow-hidden ${color.bg} ${color.text}`}
                        >
                          <div className={`z-10 flex-shrink-0 w-24 h-full flex items-center justify-center`}>
                            <span className="font-bold text-4xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="flex-grow h-full bg-ui-surface/80 backdrop-blur-sm rounded-r-2xl flex justify-between items-center pl-6 pr-6">
                            <span className="text-lg md:text-xl font-bold text-ui-text-primary truncate">{team.name}</span>
                            <div className="text-right">
                              <span className="text-xl md:text-2xl font-bold text-ui-text-primary">{team.points}</span>
                              <span className="text-xs font-medium text-ui-text-secondary block">Points</span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </>
        )}
      </div>
      <PosterModal 
        isOpen={!!posterModalData}
        onClose={() => setPosterModalData(null)}
        data={posterModalData}
      />
    </div>
  );
};

export default Results;
