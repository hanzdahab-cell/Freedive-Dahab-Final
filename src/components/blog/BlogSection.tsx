import { useState } from 'react';
import { blogPosts } from '../../data/blog';
import { BlogPost } from '../../types';
import { BookOpen, Clock, User, ArrowRight, X } from 'lucide-react';

export function BlogSection() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="relative py-28 px-6 bg-[#020a10] border-t border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-xs font-mono tracking-[0.3em] uppercase text-cyan-400">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>THE ARCHIVE • DEEP DIVING INSIGHTS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Freediving <span className="text-cyan-300 italic font-normal">Journal & Blog</span>
            </h2>
            <p className="text-slate-400 font-sans font-light max-w-xl text-sm sm:text-base">
              Physiological science, equalisation breakdowns, and expedition field dispatches 
              from the depths of the Dahab Blue Hole.
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:shadow-[0_15px_40px_rgba(56,189,248,0.15)] bg-slate-900/30"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image.url}
                    alt={post.image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020a10] via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/60 border border-white/20 text-cyan-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {post.readTimeMin} min read
                    </span>
                    <span>•</span>
                    <span>{post.publishedAt}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-slate-300/80 text-xs sm:text-sm font-sans font-light line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5 text-xs">
                <div className="flex items-center gap-2 text-slate-400 font-sans">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{post.author}</span>
                </div>
                <span className="text-cyan-400 font-mono text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Blog Article Reader Modal */}
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="glass-panel w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-cyan-400/40 p-6 sm:p-8 relative bg-slate-950/95 shadow-2xl">
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-3">
                <span>{activePost.publishedAt}</span>
                <span>•</span>
                <span>{activePost.readTimeMin} MIN READ</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
                {activePost.title}
              </h2>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-6 pb-4 border-b border-white/10">
                <span className="text-cyan-200">{activePost.author}</span>
                <span>—</span>
                <span>{activePost.authorRole}</span>
              </div>

              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-white/10">
                <img
                  src={activePost.image.url}
                  alt={activePost.image.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-invert max-w-none text-slate-300 font-sans leading-relaxed text-sm sm:text-base space-y-4">
                <p>{activePost.excerpt}</p>
                <p>{activePost.content}</p>
                <p className="text-slate-400 text-xs italic">
                  Published in Dahab Blue Hole archives. For inquiries or clinical equalization consults, contact our master instructors.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
