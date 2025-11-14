"use client";

import { useState } from "react";
import { Check, Menu, X, Zap, Calendar, BarChart3, Lightbulb, Users, Sparkles, ArrowRight, Star, Send } from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mostrar popup após 5 segundos
  useState(() => {
    const timer = setTimeout(() => setShowPremiumPopup(true), 5000);
    return () => clearTimeout(timer);
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Premium Popup */}
      {showPremiumPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <button onClick={() => setShowPremiumPopup(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Desbloqueie Todo o Potencial!</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Upgrade para o plano Premium e tenha acesso ilimitado a roteiros com IA, análises avançadas e muito mais.
            </p>
            <button
              onClick={() => {
                setShowPremiumPopup(false);
                scrollToSection("pricing");
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Ver Planos Premium
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-40 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AdMind
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection("home")} className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors">
                Início
              </button>
              <button onClick={() => scrollToSection("features")} className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors">
                Funcionalidades
              </button>
              <button onClick={() => scrollToSection("pricing")} className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors">
                Planos
              </button>
              <button onClick={() => scrollToSection("about")} className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors">
                Sobre
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors">
                Contato
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-3 animate-in slide-in-from-top duration-300">
              <button onClick={() => scrollToSection("home")} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                Início
              </button>
              <button onClick={() => scrollToSection("features")} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                Funcionalidades
              </button>
              <button onClick={() => scrollToSection("pricing")} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                Planos
              </button>
              <button onClick={() => scrollToSection("about")} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                Sobre
              </button>
              <button onClick={() => scrollToSection("contact")} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                Contato
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Powered by AI</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Seu Co-Piloto de
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Mídia Paga</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Crie, organize e otimize campanhas de tráfego pago com inteligência artificial. Roteiros, agendamentos e análises — tudo em um só lugar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
                </button>
                <button className="flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10" />
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">10k+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Usuários Ativos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">50k+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Campanhas Criadas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">4.9⭐</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avaliação</div>
                </div>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-700">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-96 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center">
                        <Zap className="w-16 h-16 text-white" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400">App Mockup</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">+40% ROI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Funcionalidades Poderosas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tudo que você precisa para dominar suas campanhas de tráfego pago
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Roteirização com IA",
                description: "Gere scripts de anúncios profissionais em segundos. Informe produto, público e objetivo — a IA cria o roteiro perfeito.",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Copywriting Inteligente",
                description: "Legendas, CTAs e títulos de alta conversão criados automaticamente para cada plataforma.",
                color: "from-pink-500 to-pink-600"
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Agendamento Multiplataforma",
                description: "Calendário visual integrado com Instagram, TikTok, Meta Ads e muito mais. Agende tudo em um só lugar.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Análise de Performance",
                description: "Dashboard completo com CTR, CPC, ROI e custo por lead. Dados em tempo real de todas as suas campanhas.",
                color: "from-green-500 to-green-600"
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "Sugestões Automáticas",
                description: "IA analisa resultados e recomenda ajustes: 'Teste criativo com humor', 'Troque thumbnail', e muito mais.",
                color: "from-yellow-500 to-orange-600"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Gestão de Clientes",
                description: "Perfeito para agências. Crie perfis separados por marca/cliente e gerencie tudo de forma organizada.",
                color: "from-indigo-500 to-purple-600"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Planos para Todos
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Escolha o plano ideal para o seu negócio
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  billingCycle === "monthly"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  billingCycle === "yearly"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                Anual
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plano Gratuito */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Gratuito</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Para começar</p>
                <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  R$ 0
                </div>
                <p className="text-gray-500 dark:text-gray-400">para sempre</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "3 roteiros com IA por mês",
                  "Agendamento básico",
                  "1 perfil de cliente",
                  "Análises básicas",
                  "Suporte por email"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-4 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                Começar Grátis
              </button>
            </div>

            {/* Plano Pro - Destaque */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-sm">
                MAIS POPULAR
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <p className="text-purple-100 mb-6">Para profissionais</p>
                <div className="text-5xl font-bold text-white mb-2">
                  R$ {billingCycle === "monthly" ? "39,90" : "31,92"}
                </div>
                <p className="text-purple-100">por mês</p>
                {billingCycle === "yearly" && (
                  <p className="text-sm text-purple-200 mt-2">R$ 383,04 cobrado anualmente</p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Roteiros ilimitados com IA",
                  "Agendamento avançado",
                  "5 perfis de clientes",
                  "Análises completas + insights",
                  "Sugestões automáticas de IA",
                  "Calendário visual completo",
                  "Suporte prioritário"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-white text-purple-600 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
                Assinar Pro
              </button>
            </div>

            {/* Plano Agência */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Agência</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Para equipes</p>
                <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  R$ {billingCycle === "monthly" ? "99,90" : "79,92"}
                </div>
                <p className="text-gray-500 dark:text-gray-400">por mês</p>
                {billingCycle === "yearly" && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">R$ 959,04 cobrado anualmente</p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Tudo do plano Pro",
                  "Clientes ilimitados",
                  "Gestão multi-usuário",
                  "Dashboards personalizados",
                  "Relatórios em PDF/Excel",
                  "White label disponível",
                  "API de integração",
                  "Suporte VIP 24/7"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
                Assinar Agência
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300">
              Todos os planos incluem 14 dias de garantia. Cancele quando quiser.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Nossa História
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                O AdMind nasceu da frustração de gestores de tráfego que perdiam horas criando roteiros, legendas e analisando campanhas manualmente.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Percebemos que a inteligência artificial poderia revolucionar esse processo. Em 2024, lançamos a primeira versão do AdMind e, desde então, já ajudamos mais de 10 mil profissionais a otimizar suas campanhas.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Nossa missão é simples: <span className="font-bold text-purple-600">democratizar o acesso a ferramentas profissionais de marketing digital</span>, permitindo que freelancers, agências e criadores de conteúdo compitam em pé de igualdade com grandes empresas.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-12 flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Inovação Contínua</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Atualizações semanais com novas funcionalidades baseadas no feedback dos usuários
                </p>
              </div>
            </div>
          </div>

          {/* Diferenciais */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Por Que Escolher o AdMind?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "IA de Última Geração",
                  description: "Utilizamos os modelos mais avançados de inteligência artificial para gerar conteúdo que realmente converte."
                },
                {
                  title: "Economia de Tempo",
                  description: "Reduza em 80% o tempo gasto criando roteiros e analisando campanhas. Foque no que realmente importa."
                },
                {
                  title: "Resultados Comprovados",
                  description: "Nossos usuários reportam aumento médio de 40% no ROI das campanhas após 3 meses de uso."
                }
              ].map((item, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              O Que Nossos Usuários Dizem
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Mariana Silva",
                  role: "Gestora de Tráfego",
                  avatar: "MS",
                  text: "O AdMind transformou minha rotina! Antes eu gastava 3 horas criando roteiros, agora levo 10 minutos. E o melhor: os resultados melhoraram 35%!",
                  rating: 5
                },
                {
                  name: "Carlos Eduardo",
                  role: "Dono de Agência",
                  avatar: "CE",
                  text: "Consegui escalar minha agência de 5 para 20 clientes sem contratar mais pessoas. O AdMind cuida de toda a parte operacional e eu foco na estratégia.",
                  rating: 5
                },
                {
                  name: "Juliana Costa",
                  role: "Social Media Freelancer",
                  avatar: "JC",
                  text: "Como freelancer, preciso ser produtiva. O AdMind me deu superpoderes! Agora consigo atender mais clientes mantendo a qualidade altíssima.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Entre em Contato
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tem dúvidas? Estamos aqui para ajudar!
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Mensagem
                </label>
                <textarea
                  rows={6}
                  placeholder="Como podemos ajudar?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">AdMind</span>
              </div>
              <p className="text-gray-400">
                Seu co-piloto de mídia paga com inteligência artificial.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Atualizações</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <span className="text-xl">📘</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <span className="text-xl">📸</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <span className="text-xl">🎵</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <span className="text-xl">💼</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 AdMind. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
