"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Check, CreditCard, Lock, Zap } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<string>("pro");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    cpf: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const planParam = searchParams.get("plan");
    const billingParam = searchParams.get("billing");
    
    if (planParam) setPlan(planParam);
    if (billingParam === "yearly" || billingParam === "monthly") {
      setBilling(billingParam);
    }
  }, [searchParams]);

  const plans = {
    free: {
      name: "Gratuito",
      monthly: 0,
      yearly: 0,
      features: [
        "3 roteiros com IA por mês",
        "Agendamento básico",
        "1 perfil de cliente",
        "Análises básicas"
      ]
    },
    pro: {
      name: "Pro",
      monthly: 39.90,
      yearly: 31.92,
      features: [
        "Roteiros ilimitados com IA",
        "Agendamento avançado",
        "5 perfis de clientes",
        "Análises completas + insights",
        "Sugestões automáticas de IA",
        "Suporte prioritário"
      ]
    },
    agency: {
      name: "Agência",
      monthly: 99.90,
      yearly: 79.92,
      features: [
        "Tudo do plano Pro",
        "Clientes ilimitados",
        "Gestão multi-usuário",
        "Dashboards personalizados",
        "Relatórios em PDF/Excel",
        "White label disponível",
        "Suporte VIP 24/7"
      ]
    }
  };

  const currentPlan = plans[plan as keyof typeof plans];
  const price = billing === "monthly" ? currentPlan.monthly : currentPlan.yearly;
  const totalYearly = currentPlan.yearly * 12;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Formatação automática
    let formattedValue = value;
    
    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
    } else if (name === "expiry") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 5);
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    } else if (name === "cpf") {
      formattedValue = value.replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .slice(0, 14);
    }
    
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 2500));

    setIsProcessing(false);
    setPaymentSuccess(true);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-in zoom-in duration-500">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Check className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Pagamento Confirmado! 🎉
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300">
            Bem-vindo ao plano <span className="font-bold text-purple-600">{currentPlan.name}</span>!
            Você receberá um email com os detalhes da sua assinatura.
          </p>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Plano:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{currentPlan.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Cobrança:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {billing === "monthly" ? "Mensal" : "Anual"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Valor:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                R$ {price.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Começar a Usar
            </Link>
            
            <Link
              href="/"
              className="block w-full text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors"
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Resumo do Pedido */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Resumo do Pedido
              </h2>

              <div className="space-y-6">
                {/* Plano Selecionado */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Plano {currentPlan.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Cobrança {billing === "monthly" ? "mensal" : "anual"}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        R$ {price.toFixed(2).replace(".", ",")}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {billing === "monthly" ? "por mês" : "por mês"}
                      </div>
                    </div>
                  </div>

                  {billing === "yearly" && (
                    <div className="bg-green-100 dark:bg-green-900/20 rounded-xl p-3 mb-4">
                      <p className="text-sm text-green-700 dark:text-green-400 font-semibold">
                        💰 Você economiza R$ {((currentPlan.monthly * 12) - totalYearly).toFixed(2).replace(".", ",")} por ano!
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    {currentPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      R$ {price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  {billing === "yearly" && (
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Total anual</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        R$ {totalYearly.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-purple-600">
                      R$ {(billing === "yearly" ? totalYearly : price).toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>

                {/* Garantia */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Garantia de 14 dias
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Não gostou? Devolvemos 100% do seu dinheiro, sem perguntas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Dados de Pagamento
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Seus dados estão seguros conosco
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informações Pessoais */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Informações Pessoais
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="João Silva"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      CPF
                    </label>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      required
                      placeholder="000.000.000-00"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Dados do Cartão */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Dados do Cartão
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome no Cartão
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      placeholder="JOÃO SILVA"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Validade
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        required
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        placeholder="000"
                        maxLength={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Segurança */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 flex items-center gap-3">
                  <Lock className="w-5 h-5 text-green-500" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Pagamento 100% seguro e criptografado
                  </p>
                </div>

                {/* Botão de Pagamento */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Confirmar Pagamento
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  Ao confirmar, você concorda com nossos{" "}
                  <a href="#" className="text-purple-600 hover:underline">
                    Termos de Uso
                  </a>{" "}
                  e{" "}
                  <a href="#" className="text-purple-600 hover:underline">
                    Política de Privacidade
                  </a>
                </p>
              </form>
            </div>

            {/* Métodos de Pagamento Aceitos */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">
                Aceitamos os principais cartões:
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div className="w-12 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  MC
                </div>
                <div className="w-12 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  AMEX
                </div>
                <div className="w-12 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                  ELO
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
