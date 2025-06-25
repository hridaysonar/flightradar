import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

// IconCloud Component with enhanced 3D effects
const IconCloud = ({ images }) => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.3);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-96 h-96 mx-auto perspective-1000">
      <div 
        className="absolute inset-0"
        style={{ 
          transform: `rotateY(${rotation}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {images.map((image, index) => {
          const angle = (index / images.length) * 360;
          const radius = 150;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const z = Math.sin((angle * Math.PI) / 180) * radius;
          
          return (
            <div
              key={index}
              className="absolute w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl hover:scale-125 transition-all duration-500 border border-white/20"
              style={{
                transform: `translate3d(${x}px, ${(index % 5 - 2) * 50}px, ${z}px) rotateY(${-rotation}deg)`,
                left: '50%',
                top: '50%',
                marginLeft: '-28px',
                marginTop: '-28px',
              }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                {image.slice(-2).toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const IconCloudDemo = () => {
  const slugs = [
    "React", "JS", "TS", "Node", "Exp", "Next", "AWS", "DB", "Git", "Docker",
    "API", "CSS", "HTML", "Vue", "Ang", "PHP", "Py", "Java", "Go", "Rust"
  ];
  
  return (
    <div className="relative flex w-full h-96 items-center justify-center overflow-hidden">
      <IconCloud images={slugs} />
    </div>
  );
};

const EnhancedAboutPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const teamMembers = [
    { 
      name: "Md. Hriday", 
      role: "CEO & Founder", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: "Visionary leader with 10+ years of experience",
      delay: "0s"
    },
    { 
      name: "HM Neyam", 
      role: "Chief Operations Officer", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description: "Operations expert ensuring seamless delivery",
      delay: "0.2s"
    },
    { 
      name: "Hasan", 
      role: "Product Manager", 
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
      description: "Product strategist focused on user experience",
      delay: "0.4s"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-800 min-h-screen">
      <Helmet>
        <title>About</title>
      </Helmet>
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent"></div>
        
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 20 - 100,
            top: mousePosition.y / 20 - 100,
          }}
          
        ></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 space-y-32 w-full max-w-7xl mx-auto px-4 pt-20 pb-32">
        
        {/* Hero Section with Enhanced Design */}
        <section 
          id="hero"
          data-animate
          className={`relative bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-sm text-white text-center p-16 rounded-3xl shadow-2xl border border-white/10 transform transition-all duration-1000 ${
            isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-8 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-2xl font-bold">
                ES
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100 animate-fade-in-up">
              About Easy Sub
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-12 text-gray-100 animate-fade-in-up animation-delay-500">
              Experience the future of subscription boxes with our AI-powered curation system that delivers 
              <span className="font-bold text-yellow-300"> personalized surprises </span> 
              from local artisans and businesses directly to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-bounce-subtle">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Enhanced Mission & Vision Section */}
        <section 
          id="mission"
          data-animate
          className={`text-center py-20 transform transition-all duration-1000 ${
            isVisible.mission ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Our Mission & Vision
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Revolutionizing the subscription box industry through innovation and community connection
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { 
                icon: "🚀", 
                title: "Innovation First", 
                desc: "We leverage cutting-edge AI and machine learning to create personalized experiences that surprise and delight our customers every month.",
                color: "from-blue-500 to-cyan-500"
              },
              { 
                icon: "🌍", 
                title: "Community Impact", 
                desc: "Supporting local businesses and artisans is our core mission. We create sustainable partnerships that benefit entire communities.",
                color: "from-purple-500 to-pink-500"
              },
              { 
                icon: "⭐", 
                title: "Premium Quality", 
                desc: "Every product undergoes rigorous quality testing. We guarantee satisfaction with our 100% money-back promise.",
                color: "from-orange-500 to-red-500"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-10 rounded-3xl border border-white/10 hover:border-white/20 transform transition-all duration-500 hover:-translate-y-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Technologies Section */}
        <section 
          id="technologies"
          data-animate
          className={`py-20 bg-gradient-to-br from-slate-800/50 via-purple-800/30 to-slate-800/50 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl transform transition-all duration-1000 ${
            isVisible.technologies ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Powered by Advanced Technology
            </h2>
            <p className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
              Our platform combines artificial intelligence, machine learning, and modern web technologies 
              to deliver unparalleled personalization and seamless user experiences.
            </p>
          </div>
          <div className="relative">
            <IconCloudDemo />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl"></div>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: "React", desc: "Modern UI" },
              { name: "Node.js", desc: "Backend API" },
              { name: "AI/ML", desc: "Smart Curation" },
              { name: "Cloud", desc: "Scalable Infrastructure" }
            ].map((tech, index) => (
              <div key={index} className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <h4 className="text-white font-bold mb-2">{tech.name}</h4>
                <p className="text-gray-400 text-sm">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Team Section */}
        <section 
          id="team"
          data-animate
          className={`relative bg-gradient-to-br from-slate-800/50 via-indigo-800/30 to-slate-800/50 backdrop-blur-sm text-white text-center p-20 rounded-3xl border border-white/10 shadow-2xl transform transition-all duration-1000 ${
            isVisible.team ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Meet Our Visionary Team
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              A diverse group of innovators, creators, and problem-solvers dedicated to revolutionizing your subscription experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: member.delay }}
              >
                <div className="relative mb-8 mx-auto w-fit">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500 scale-110"></div>
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-all duration-500 group-hover:scale-105">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {member.name}
                  </h3>
                  <p className="text-blue-300 text-lg font-semibold">
                    {member.role}
                  </p>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 max-w-xs mx-auto">
                    {member.description}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Benefits Section */}
        <section 
          id="benefits"
          data-animate
          className={`py-20 bg-gradient-to-r from-emerald-800/30 via-teal-800/30 to-emerald-800/30 backdrop-blur-sm rounded-3xl border border-white/10 shadow-xl transform transition-all duration-1000 ${
            isVisible.benefits ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
              Why Choose Easy Sub?
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Experience the difference with our premium subscription service
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-8 px-8">
            {[
              {
                icon: "🎯",
                title: "AI-Powered Personalization",
                benefit: "Our advanced algorithm learns your preferences and curates boxes tailored specifically to your tastes and lifestyle."
              },
              {
                icon: "🌟",
                title: "Local Business Support",
                benefit: "Every purchase directly supports small local businesses and artisans, creating a positive impact in communities nationwide."
              },
              {
                icon: "📦",
                title: "Premium Quality Guarantee",
                benefit: "Hand-selected, premium products delivered with our 100% satisfaction guarantee and hassle-free returns."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="group flex gap-8 items-start p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-emerald-400/30 hover:bg-white/10 transform transition-all duration-500 hover:-translate-y-2 animate-fade-in-right"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl group-hover:scale-125 transition-transform duration-300 filter drop-shadow-lg">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-400 mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {item.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section 
          id="testimonials"
          data-animate
          className={`py-20 text-center transform transition-all duration-1000 ${
            isVisible.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <h2 className="text-5xl font-bold mb-16 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
            Customer Success Stories
          </h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
            {[
              { 
                text: "Easy Sub has completely transformed my monthly routine. The AI curation is incredibly accurate, and I've discovered amazing local products I never would have found otherwise. It's like having a personal shopper who knows exactly what I love!", 
                author: "Jessica Smith", 
                role: "Marketing Director",
                rating: 5,
                delay: "0s" 
              },
              { 
                text: "As a busy professional, Easy Sub saves me so much time while supporting local businesses. The quality is outstanding, and the surprise element makes every delivery feel like Christmas morning. Highly recommended!", 
                author: "Michael Brown", 
                role: "Software Engineer",
                rating: 5,
                delay: "0.3s" 
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-10 rounded-3xl border border-white/10 hover:border-rose-400/30 shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-4 animate-fade-in-up"
                style={{ animationDelay: testimonial.delay }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 italic text-lg leading-relaxed mb-8 group-hover:text-gray-200 transition-colors duration-300">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="text-rose-400 font-bold text-xl mb-1 group-hover:text-rose-300 transition-colors duration-300">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section 
          id="cta"
          data-animate
          className={`relative bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-sm text-white text-center p-20 rounded-3xl border border-white/10 shadow-2xl transform transition-all duration-1000 ${
            isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-5xl font-bold mb-8 animate-pulse-subtle">
              Ready to Transform Your Subscription Experience?
            </h2>
            <p className="text-xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-100">
              Join thousands of satisfied customers who have discovered the perfect blend of surprise, quality, and community support. 
              Start your personalized subscription journey today with our risk-free trial.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xl rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-bounce-subtle">
                <span className="relative z-10 flex items-center gap-3">
                  Start Free Trial
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <button className="px-10 py-5 border-2 border-white/30 text-white font-semibold text-lg rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Learn More
              </button>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { icon: "🚚", text: "Free Shipping" },
                { icon: "💰", text: "30-Day Money Back" },
                { icon: "🔒", text: "Secure Payment" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-center gap-3 text-sm text-gray-200">
                  <span className="text-2xl">{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-subtle {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-4px);
          }
          60% {
            transform: translateY(-2px);
          }
        }

        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out forwards;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default EnhancedAboutPage;