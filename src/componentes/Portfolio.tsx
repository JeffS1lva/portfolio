import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Smartphone,
  ArrowRight,
  ChevronDown,
  Star,
  Calendar,
  MapPin,
  Download,
  Zap,
  Database,
  Brain,
  Cpu,
  Terminal,
  Rocket,

} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  tech: string[];
  year: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const TechPortfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [, setParticles] = useState<Particle[]>([]);
  const [typedText, setTypedText] = useState('');

  const animationRef = useRef<number>(0);

  const roles = ['FrontEnd Developer', 'Tech Avançada', 'Arquitetura Digital', 'Code Artist'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const projects: Project[] = [
    {
      id: 1,
      title: "Teste",
      description: "Plataforma de e-commerce alimentada por IA com recomendações personalizadas, análise preditiva e automação de vendas.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      tags: ["AI/ML", "React", "Node.js", "TensorFlow"],
      tech: ["Next.js", "TypeScript", "Python", "MongoDB", "Redis", "Docker"],
      liveUrl: "https://neural-commerce.tech",
      githubUrl: "https://github.com/usuario/neural-commerce",
      featured: true,
      year: "2024"
    },
    {
      id: 2,
      title: "Teste",
      description: "Dashboard analítico em tempo real com visualizações 3D, processamento de big data e interface holográfica.",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop",
      tags: ["3D", "WebGL", "Real-time", "Analytics"],
      tech: ["Three.js", "WebGL", "D3.js", "WebSocket", "Rust", "GraphQL"],
      liveUrl: "https://quantum-dash.io",
      githubUrl: "https://github.com/usuario/quantum-dashboard",
      featured: true,
      year: "2024"
    },
    {
      id: 3,
      title: "CyberSec Vault",
      description: "Sistema de segurança avançado com criptografia quântica, autenticação biométrica e blockchain.",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop",
      tags: ["Security", "Blockchain", "Encryption", "Biometric"],
      tech: ["Solidity", "Web3", "Crypto", "Node.js", "PostgreSQL"],
      liveUrl: "https://cybersec-vault.com",
      githubUrl: "https://github.com/usuario/cybersec-vault",
      featured: false,
      year: "2023"
    },
    {
      id: 4,
      title: "MetaVerse Studio",
      description: "Plataforma para criação de mundos virtuais com realidade aumentada e experiências imersivas.",
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=600&fit=crop",
      tags: ["VR/AR", "3D", "Gaming", "Metaverse"],
      tech: ["Unity", "WebXR", "Blender", "C#", "WebRTC"],
      liveUrl: "https://metaverse-studio.dev",
      githubUrl: "https://github.com/usuario/metaverse-studio",
      featured: false,
      year: "2023"
    }
  ];

  const techStack = [
    { name: "Frontend", icon: Code2, items: ["React", "Vue 3", "Angular", "Next.js", "Svelte"], color: "from-cyan-400 to-blue-500" },
    { name: "Backend", icon: Database, items: ["Node.js", "Python", "Go", "Rust", "GraphQL"], color: "from-green-400 to-emerald-500" },
    { name: "Mobile", icon: Smartphone, items: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic"], color: "from-indigo-400 to-purple-500" },
  ];

  // Particle system initialization
  useEffect(() => {
    const initParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 100; i++) {
        newParticles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      setParticles(newParticles);
    };

    initParticles();
    window.addEventListener('resize', initParticles);
    return () => window.removeEventListener('resize', initParticles);
  }, []);

  // Particle animation
  useEffect(() => {
    const animate = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
       
      })));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Typing animation
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let i = 0;
    const typing = setInterval(() => {
      if (i < currentRole.length) {
        setTypedText(currentRole.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
        setTimeout(() => {
          const deleting = setInterval(() => {
            if (i > 0) {
              setTypedText(currentRole.slice(0, i - 1));
              i--;
            } else {
              clearInterval(deleting);
              setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
            }
          }, 50);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typing);
  }, [currentRoleIndex]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'sobre', 'projetos', 'tech', 'contato'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950 text-white overflow-x-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Interactive mouse follower */}
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>


      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Terminal className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Dev_Front
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Inicio', icon: Zap },
                { id: 'sobre', label: 'Sobre', icon: Brain },
                { id: 'projetos', label: 'Projetos', icon: Rocket },
                { id: 'tech', label: 'Tecnologias', icon: Cpu },
                { id: 'contato', label: 'Contato', icon: Mail }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 transition-all duration-300 hover:text-cyan-400 relative group ${activeSection === item.id ? 'text-cyan-400' : 'text-gray-300'
                    }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                  <div className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center max-w-6xl mx-auto px-6">
          <div className="space-y-6 mb-12">
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              Jefferson Silva
            </h1>
            <div className="text-2xl md:text-3xl text-cyan-400 font-mono h-12 flex items-center justify-center">
              <span className="mr-2">{'>'}</span>
              <span>{typedText}</span>
              <span className="animate-pulse ml-1">|</span>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Construindo o futuro através de código.
              <span className="text-cyan-400"></span>, <span className="text-purple-400">Web3</span> e
              <span className="text-pink-400"> experiências imersivas</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button
              onClick={() => scrollToSection('projetos')}
              className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Explorar Projetos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-cyan-400/30 text-cyan-400 px-8 py-4 rounded-xl font-semibold hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center gap-2">
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Download CV
            </button>
          </div>

          <div className="flex justify-center gap-6">
            {[
              { icon: Github, href: "https://github.com/JeffS1lva", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/jefferson-silva-developer/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:jeffdsilva.29@gmail.com", label: "Email" }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl flex items-center justify-center hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110"
              >
                <social.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-cyan-400 animate-bounce" />
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Sobre Mim
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-500/20">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                  <span className="text-gray-300 text-lg">São Paulo, Brasil</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  <span className="text-gray-300 text-lg">2+ anos de experiência</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-xl border border-pink-500/20">
                  <Star className="w-6 h-6 text-pink-400" />
                  <span className="text-gray-300 text-lg">15+ projetos entregues</span>
                </div>
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                <p>
                  Sou um <span className="text-cyan-400 font-semibold">desenvolvedor apaixonado por inovação</span>,
                  especializado em criar experiências digitais que transcendem o comum.
                </p>
                <p>
                  Minha jornada começou com curiosidade sobre <span className="text-purple-400 font-semibold">inteligência artificial</span>
                  e evoluiu para dominar tecnologias emergentes como Web3, realidade virtual e computação quântica.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 backdrop-blur-sm border border-cyan-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 animate-pulse"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Brain className="w-8 h-8 text-cyan-400" />
                    <h3 className="text-3xl font-bold text-white">Visão & Missão</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg mb-6">
                    Acredito que a tecnologia deve ser uma extensão natural da criatividade humana.
                    Meu objetivo é construir soluções que não apenas resolvem problemas, mas
                    <span className="text-cyan-400 font-semibold"> inspiram e transformam</span> a forma como interagimos com o mundo digital.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-black/30 rounded-lg">
                      <div className="text-2xl font-bold text-cyan-400">150+</div>
                      <div className="text-sm text-gray-400">Clientes Satisfeitos</div>
                    </div>
                    <div className="text-center p-4 bg-black/30 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400">25+</div>
                      <div className="text-sm text-gray-400">Tecnologias</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Projetos em Destaque
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-8"></div>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Projetos que definem o futuro da tecnologia, combinando inovação com excelência técnica.
            </p>
          </div>

          {/* Featured Projects */}
          <div className="space-y-16">
            {projects.filter(p => p.featured).map((project, index) => (
              <div
                key={project.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 group-hover:border-cyan-500/40 transition-all duration-500">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-cyan-400 font-semibold mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 border-2 border-cyan-400/30 text-cyan-400 px-6 py-3 rounded-xl hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
                    >
                      <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Projects Grid */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-white mb-12 text-center">Outros Projetos Notáveis</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.filter(p => !p.featured).map((project) => (
                <div key={project.id} className="group relative bg-gradient-to-br from-gray-900/50 to-purple-900/20 rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h4>
                      <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors text-sm group/link"
                      >
                        <ExternalLink className="w-3 h-3 group-hover/link:rotate-45 transition-transform" />
                        Live
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-400 hover:text-gray-300 transition-colors text-sm group/link"
                      >
                        <Github className="w-3 h-3 group-hover/link:rotate-12 transition-transform" />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Arsenal Tecnológico
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-8"></div>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Ferramentas e tecnologias que utilizo para construir o futuro digital.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((category, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors group/item"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${category.color} rounded-full`}></div>
                        <span className="text-gray-300 group-hover/item:text-white transition-colors">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Stats */}

        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">


          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 border border-cyan-500/20">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Rocket className="w-6 h-6 text-cyan-400" />
                  Projetos & Consultorias
                </h3>
                <p className="text-gray-300 mb-6">
                  Desenvolvimento de aplicações web/mobile, consultoria em IA, arquitetura de sistemas e muito mais.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Disponível para projetos
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    Resposta em 24h
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Consulta gratuita
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/20">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Brain className="w-6 h-6 text-purple-400" />
                  Colaborações & Parcerias
                </h3>
                <p className="text-gray-300 mb-6">
                  Interessado em colaborar? Sempre aberto a parcerias estratégicas e projetos inovadores.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    Startups & Scale-ups
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    Projetos Open Source
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    Mentorias & Workshops
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <a
                href="mailto:jeffdsilva.29@gmail.com"
                className="group flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                jeffdsilva.29@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/jefferson-silva-developer/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 border-2 border-cyan-400/30 text-cyan-400 px-8 py-4 rounded-xl hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
              >
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                LinkedIn
              </a>
              <a
                href="https://github.com/JeffS1lva"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 border-2 border-purple-400/30 text-purple-400 px-8 py-4 rounded-xl hover:bg-purple-400/10 hover:border-purple-400 transition-all duration-300"
              >
                <Github className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                GitHub
              </a>
            </div>

            <p className="text-gray-400 text-sm">
              Geralmente respondo em algumas horas. Vamos conversar sobre seu próximo projeto!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 bg-black/50 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Terminal className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Dev_Front
              </span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2025 Jefferson Silva. Crafted with ❤️ using React, TypeScript & Tailwind CSS.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Powered by cutting-edge technologies and endless curiosity.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechPortfolio;