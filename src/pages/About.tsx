import React, { useState, useEffect } from 'react';
import { Users, Target, Award, Calendar, MapPin, Heart, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { AboutContent, TeamMember } from '../types';
import SectionDivider from '../components/SectionDivider';

const About: React.FC = () => {
  const [aboutContent, setAboutContent] = useState<Record<string, string>>({});
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: contentData, error: contentError } = await supabase
          .from('about_content')
          .select('section, content');

        if (contentError) throw contentError;

        const contentMap = (contentData || []).reduce((acc, item) => {
          acc[item.section] = item.content;
          return acc;
        }, {} as Record<string, string>);
        setAboutContent(contentMap);

        const { data: teamData, error: teamError } = await supabase
          .from('team_members')
          .select('*')
          .order('created_at', { ascending: true });

        if (teamError) throw teamError;
        setTeamMembers(teamData || []);

      } catch (err: any) {
        setError("Could not fetch page data. Please ensure your Supabase project is connected and running.");
        console.error("Error fetching about page data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { icon: Users, label: 'Participants', value: '500+' },
    { icon: Award, label: 'Competitions', value: '25+' },
    { icon: Calendar, label: 'Years Running', value: '15+' },
    { icon: Heart, label: 'Community Projects', value: '100+' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-transparent">
        <Loader2 className="w-12 h-12 text-brand-mid-blue animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center p-4 bg-transparent">
        <div className="bg-rose-100 border border-rose-400 text-rose-700 px-4 py-3 rounded-lg text-center">
          <h3 className="font-bold">Connection Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-dark-blue to-brand-mid-blue text-ui-text-light py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-fractual">About SSF Muhimmath</h1>
            <p className="text-xl md:text-2xl text-ui-text-light/80 max-w-3xl mx-auto">
              Celebrating cultural unity and creative expression in the Daawa Sector
            </p>
          </motion.div>
        </div>
        <SectionDivider style="wave" color="fill-ui-background" />
      </section>

      {/* Mission & Vision */}
      <section className="relative py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-ui-surface rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-brand-mid-blue mr-3" />
                <h2 className="text-2xl font-bold text-ui-text-primary font-serif">Our Mission</h2>
              </div>
              <p className="text-ui-text-secondary leading-relaxed">
                {aboutContent.mission || 'Loading mission...'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-ui-surface rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <Award className="w-8 h-8 text-brand-light-blue mr-3" />
                <h2 className="text-2xl font-bold text-ui-text-primary font-serif">Our Vision</h2>
              </div>
              <p className="text-ui-text-secondary leading-relaxed">
                {aboutContent.vision || 'Loading vision...'}
              </p>
            </motion.div>
          </div>
        </div>
        <SectionDivider style="angle" color="fill-ui-surface" />
      </section>

      {/* Statistics */}
      <section className="relative py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-ui-text-primary mb-4 font-serif">Our Impact in Numbers</h2>
            <p className="text-ui-text-secondary max-w-2xl mx-auto">
              Over the years, Muhimmath has grown into a significant cultural event that brings together the entire community
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-brand-mid-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-ui-text-light" />
                </div>
                <div className="text-3xl font-bold text-ui-text-primary mb-2">{stat.value}</div>
                <div className="text-ui-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <SectionDivider style="zigzag" color="fill-ui-background" />
      </section>

      {/* History */}
      <section className="relative py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-ui-text-primary mb-4 font-serif">Our Journey</h2>
            <p className="text-ui-text-secondary max-w-2xl mx-auto">
              From humble beginnings to becoming a cornerstone of cultural celebration in the Daawa Sector
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-ui-surface rounded-lg shadow-lg p-8"
          >
            <div className="prose max-w-none text-ui-text-secondary">
              <p className="text-lg leading-relaxed">
                {aboutContent.history || 'Loading history...'}
              </p>
            </div>
          </motion.div>
        </div>
        <SectionDivider style="clouds" color="fill-ui-surface" />
      </section>

      {/* Team */}
      <section className="relative py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-ui-text-primary mb-4 font-serif">Meet Our Team</h2>
            <p className="text-ui-text-secondary max-w-2xl mx-auto">
              The dedicated individuals who work tirelessly to make Muhimmath a memorable experience for everyone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-ui-surface rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-ui-text-primary mb-2">{member.name}</h3>
                <p className="text-brand-mid-blue font-medium mb-3">{member.position}</p>
                <p className="text-ui-text-secondary text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <SectionDivider style="wave" color="fill-ui-background" />
      </section>

      {/* Location */}
      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-ui-text-primary mb-4 font-serif">Event Location</h2>
            <p className="text-ui-text-secondary max-w-2xl mx-auto">
              Our events take place in the beautiful town of Muhimmath, known for its rich cultural heritage
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-ui-surface rounded-lg shadow-lg p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-brand-mid-blue mr-3" />
                  <h3 className="text-2xl font-bold text-ui-text-primary font-serif">Muhimmarhul Muslimeen Education Centre</h3>
                </div>
                <p className="text-ui-text-secondary leading-relaxed mb-6">
                  Muhimmath is a culturally rich town in Kasaragod , Kerala. The town provides the perfect backdrop for our events, with its peaceful environment and strong community support for cultural activities.
                </p>
                <div className="space-y-2 text-ui-text-secondary">
                  <p><strong>Venue:</strong> Muhimmathul Mislimeen Educayion Centre</p>
                  <p><strong>Accessibility:</strong> Well-connected by road and rail</p>
                  <p><strong>Accommodation:</strong> Multiple lodging options available</p>
                </div>
              </div>
              <div className="bg-ui-background rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-ui-text-secondary/60">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">Coming Soon</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
