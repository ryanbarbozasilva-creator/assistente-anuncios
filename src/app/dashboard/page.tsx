"use client";

import { useState } from "react";
import { 
  Zap, 
  Plus, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut,
  Sparkles,
  Video,
  Image as ImageIcon,
  Clock,
  TrendingUp,
  Target,
  Users,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Copy,
  Download,
  Share2
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "create" | "schedule" | "analytics">("overview");
  const [connectedAccounts, setConnectedAccounts] = useState({
    meta: false,
    tiktok: false
  });

  // Simulação de dados de performance
  const performanceData = [
    {
      id: 1,
      creative: "Roteiro 1 - Curso de Inglês",
      platform: "Meta",
      impressions: 45000,
      clicks: 2250,
      ctr: 5.0,
      cpc: 0.85,
      conversions: 180,
      roi: 340,
      status: "active",
      performance: "+40%",
      feedback: "Esse criativo performou 40% melhor que a média, repita esse estilo!"
    },
    {
      id: 2,
      creative: "Roteiro 2 - Depoimento Aluno",
      platform: "TikTok",
      impressions: 32000,
      clicks: 1600,
      ctr: 5.0,
      cpc: 0.92,
      conversions: 128,
      roi: 280,
      status: "active",
      performance: "+28%",
      feedback: "Bom desempenho! Considere testar variações com mais humor."
    },
    {
      id: 3,
      creative: "Roteiro 3 - Transformação",
      platform: "Meta",
      impressions: 28000,
      clicks: 980,
      ctr: 3.5,
      cpc: 1.15,
      conversions: 78,
      roi: 180,
      status: "paused",
      performance: "-12%",
      feedback: "Performance abaixo da média. Teste uma abordagem mais direta no CTA."
    }
  ];

  const ConnectAccountsView = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Conecte Suas Contas
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Conecte suas contas de anúncios para começar a criar campanhas incríveis
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setConnectedAccounts({ ...connectedAccounts, meta: true })}
            className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
              connectedAccounts.meta
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-purple-500"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">f</span>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-900 dark:text-white">Meta Ads</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Facebook & Instagram
                  </p>
                </div>
              </div>
              {connectedAccounts.meta ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <ArrowRight className="w-6 h-6 text-gray-400" />
              )}
            </div>
          </button>

          <button
            onClick={() => setConnectedAccounts({ ...connectedAccounts, tiktok: true })}
            className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
              connectedAccounts.tiktok
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-purple-500"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">TT</span>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-900 dark:text-white">TikTok Ads</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    TikTok for Business
                  </p>
                </div>
              </div>
              {connectedAccounts.tiktok ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <ArrowRight className="w-6 h-6 text-gray-400" />
              )}
            </div>
          </button>
        </div>

        {(connectedAccounts.meta || connectedAccounts.tiktok) && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setActiveTab("create")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Começar a Criar
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const CreateContentView = () => {
    const [productInput, setProductInput] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState<"meta" | "tiktok" | "both">("both");
    const [selectedTone, setSelectedTone] = useState<"professional" | "casual" | "humorous" | "inspirational">("inspirational");
    const [generatedContent, setGeneratedContent] = useState<any>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateContent = async () => {
      setIsGenerating(true);
      setError(null);
      
      try {
        const response = await fetch('/api/generate-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productDescription: productInput,
            targetAudience: targetAudience || undefined,
            platform: selectedPlatform,
            tone: selectedTone
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao gerar conteúdo');
        }

        const data = await response.json();
        setGeneratedContent(data);
      } catch (err) {
        console.error('Erro:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido ao gerar conteúdo');
      } finally {
        setIsGenerating(false);
      }
    };

    return (
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Input de Produto */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Criar Novo Conteúdo com ChatGPT
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Descreva seu produto ou serviço *
              </label>
              <textarea
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
                placeholder="Ex: Curso de inglês online para adultos que querem fluência em 6 meses..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all resize-none"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Público-alvo (opcional)
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Ex: Adultos de 25-45 anos que querem crescer na carreira"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Plataforma
                </label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                >
                  <option value="both">Ambas (Meta + TikTok)</option>
                  <option value="meta">Meta (Facebook/Instagram)</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Tom do conteúdo
                </label>
                <select
                  value={selectedTone}
                  onChange={(e) => setSelectedTone(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                >
                  <option value="inspirational">Inspirador</option>
                  <option value="professional">Profissional</option>
                  <option value="casual">Casual</option>
                  <option value="humorous">Humorístico</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-900 dark:text-red-300 mb-1">
                      Erro ao gerar conteúdo
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-400">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={generateContent}
              disabled={!productInput || isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ChatGPT está gerando seu conteúdo...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Gerar Conteúdo com ChatGPT
                </>
              )}
            </button>
          </div>
        </div>

        {/* Conteúdo Gerado */}
        {generatedContent && (
          <div className="space-y-6">
            {/* Roteiros */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Video className="w-6 h-6 text-purple-600" />
                Roteiros de Vídeo Gerados por ChatGPT
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {generatedContent.scripts.map((script: any) => (
                  <div key={script.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">{script.title}</h4>
                      <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full">
                        {script.duration}
                      </span>
                    </div>
                    
                    <pre className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap mb-4 font-mono bg-gray-50 dark:bg-gray-900 p-4 rounded-lg max-h-64 overflow-y-auto">
                      {script.script}
                    </pre>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                      Tom: {script.tone}
                    </p>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => navigator.clipboard.writeText(script.script)}
                        className="flex-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all flex items-center justify-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        Copiar
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:shadow-lg transition-all">
                        Agendar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legendas */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-pink-600" />
                Legendas com CTA (ChatGPT)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {generatedContent.captions.map((caption: any) => (
                  <div key={caption.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-3 py-1 rounded-full">
                        {caption.platform}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap mb-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      {caption.text}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        CTA: {caption.cta}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => navigator.clipboard.writeText(caption.text)}
                        className="flex-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 py-2 rounded-lg hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-all flex items-center justify-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        Copiar
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:shadow-lg transition-all">
                        Usar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sugestão de Thumbnail */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-blue-600" />
                Sugestão de Thumbnail (ChatGPT)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {generatedContent.thumbnail.suggestion}
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Paleta de Cores:</h4>
                      <div className="flex gap-2">
                        {generatedContent.thumbnail.colors.map((color: string, index: number) => (
                          <div
                            key={index}
                            className="w-12 h-12 rounded-lg shadow-md"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Elementos Chave:</h4>
                      <ul className="space-y-2">
                        {generatedContent.thumbnail.elements.map((element: string, index: number) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            {element}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl font-bold mb-2">PREVIEW</div>
                    <div className="text-2xl mb-4">THUMBNAIL</div>
                    <div className="text-sm opacity-80">Criado com ChatGPT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ScheduleView = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState("18:00");
    const [selectedPlatform, setSelectedPlatform] = useState<"meta" | "tiktok">("meta");

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-600" />
            Agendar Publicação
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Selecione a Plataforma
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedPlatform("meta")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedPlatform === "meta"
                      ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">f</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">Meta Ads</span>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedPlatform("tiktok")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedPlatform === "tiktok"
                      ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">TT</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">TikTok</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Data
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Horário
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                    Melhor Horário Sugerido (ChatGPT)
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Baseado em análises anteriores, segunda-feira às 18h tem 35% mais engajamento para seu público.
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Agendar Publicação
            </button>
          </div>
        </div>

        {/* Posts Agendados */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Posts Agendados
          </h3>
          
          <div className="space-y-4">
            {[
              { day: "Segunda", time: "18:00", platform: "Meta", content: "Roteiro 1 - Transformação" },
              { day: "Quarta", time: "19:00", platform: "TikTok", content: "Roteiro 2 - Depoimento" },
              { day: "Sexta", time: "17:00", platform: "Meta", content: "Roteiro 3 - Urgência" }
            ].map((post, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{post.content}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {post.day} às {post.time} • {post.platform}
                    </p>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-700 transition-colors">
                  Cancelar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AnalyticsView = () => (
    <div className="space-y-8">
      {/* Cards de Métricas */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: "Impressões Totais", value: "105K", change: "+23%", icon: Users, color: "blue" },
          { label: "Cliques", value: "4.8K", change: "+18%", icon: Target, color: "purple" },
          { label: "Conversões", value: "386", change: "+40%", icon: CheckCircle2, color: "green" },
          { label: "ROI Médio", value: "267%", change: "+15%", icon: DollarSign, color: "yellow" }
        ].map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${metric.color}-100 dark:bg-${metric.color}-900/30`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
              </div>
              <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {metric.change}
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Performance dos Criativos */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-purple-600" />
          Performance dos Criativos (Análise ChatGPT)
        </h2>

        <div className="space-y-6">
          {performanceData.map((item) => (
            <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.creative}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{item.platform}</span>
                    <span className={`px-3 py-1 rounded-full ${
                      item.status === "active" 
                        ? "bg-green-100 dark:bg-green-900/30 text-green-600" 
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600"
                    }`}>
                      {item.status === "active" ? "Ativo" : "Pausado"}
                    </span>
                  </div>
                </div>
                <div className={`text-2xl font-bold ${
                  item.performance.startsWith("+") ? "text-green-600" : "text-red-600"
                }`}>
                  {item.performance}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Impressões</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{item.impressions.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Cliques</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{item.clicks.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">CTR</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{item.ctr}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">CPC</div>
                  <div className="font-semibold text-gray-900 dark:text-white">R$ {item.cpc}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Conversões</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{item.conversions}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">ROI</div>
                  <div className="font-semibold text-green-600">{item.roi}%</div>
                </div>
              </div>

              {/* Feedback da IA */}
              <div className={`p-4 rounded-xl ${
                item.performance.startsWith("+") 
                  ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" 
                  : "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
              }`}>
                <div className="flex items-start gap-3">
                  <Sparkles className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    item.performance.startsWith("+") ? "text-green-600" : "text-yellow-600"
                  }`} />
                  <div>
                    <h4 className={`font-semibold mb-1 ${
                      item.performance.startsWith("+") 
                        ? "text-green-900 dark:text-green-300" 
                        : "text-yellow-900 dark:text-yellow-300"
                    }`}>
                      Feedback do ChatGPT
                    </h4>
                    <p className={`text-sm ${
                      item.performance.startsWith("+") 
                        ? "text-green-700 dark:text-green-400" 
                        : "text-yellow-700 dark:text-yellow-400"
                    }`}>
                      {item.feedback}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
        <Link href="/" className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AdMind
          </span>
        </Link>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-semibold">Visão Geral</span>
          </button>

          <button
            onClick={() => setActiveTab("create")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "create"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Criar Conteúdo</span>
          </button>

          <button
            onClick={() => setActiveTab("schedule")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "schedule"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="font-semibold">Agendamento</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "analytics"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-semibold">Analytics</span>
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-semibold">Configurações</span>
          </button>
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Sair</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {activeTab === "overview" && "Visão Geral"}
              {activeTab === "create" && "Criar Conteúdo com ChatGPT"}
              {activeTab === "schedule" && "Agendamento"}
              {activeTab === "analytics" && "Analytics"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {activeTab === "overview" && "Conecte suas contas e comece a criar"}
              {activeTab === "create" && "Gere roteiros, legendas e thumbnails com inteligência artificial"}
              {activeTab === "schedule" && "Agende suas publicações"}
              {activeTab === "analytics" && "Acompanhe o desempenho das suas campanhas com análise de IA"}
            </p>
          </div>

          {/* Content */}
          {activeTab === "overview" && (!connectedAccounts.meta && !connectedAccounts.tiktok) && <ConnectAccountsView />}
          {activeTab === "overview" && (connectedAccounts.meta || connectedAccounts.tiktok) && <AnalyticsView />}
          {activeTab === "create" && <CreateContentView />}
          {activeTab === "schedule" && <ScheduleView />}
          {activeTab === "analytics" && <AnalyticsView />}
        </div>
      </main>
    </div>
  );
}
