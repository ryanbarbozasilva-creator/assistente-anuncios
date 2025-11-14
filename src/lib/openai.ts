import OpenAI from 'openai';

// Inicializa o cliente OpenAI
// Nota: A chave da API deve ser configurada nas variáveis de ambiente
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: false // Sempre use no servidor
});

// Tipos para as requisições
export interface GenerateContentRequest {
  productDescription: string;
  targetAudience?: string;
  platform?: 'meta' | 'tiktok' | 'both';
  tone?: 'professional' | 'casual' | 'humorous' | 'inspirational';
}

export interface GeneratedContent {
  scripts: Array<{
    id: number;
    title: string;
    duration: string;
    script: string;
    tone: string;
  }>;
  captions: Array<{
    id: number;
    text: string;
    cta: string;
    platform: string;
  }>;
  thumbnail: {
    suggestion: string;
    colors: string[];
    elements: string[];
  };
}

// Função para gerar conteúdo com ChatGPT
export async function generateContentWithAI(
  request: GenerateContentRequest
): Promise<GeneratedContent> {
  const { productDescription, targetAudience, platform, tone } = request;

  const prompt = `Você é um especialista em marketing digital e criação de conteúdo para anúncios.

PRODUTO/SERVIÇO: ${productDescription}
${targetAudience ? `PÚBLICO-ALVO: ${targetAudience}` : ''}
${platform ? `PLATAFORMA: ${platform === 'both' ? 'Meta (Facebook/Instagram) e TikTok' : platform === 'meta' ? 'Meta (Facebook/Instagram)' : 'TikTok'}` : ''}
${tone ? `TOM: ${tone}` : ''}

Gere o seguinte conteúdo em formato JSON:

1. **3 roteiros de vídeo** para anúncios (15-20 segundos cada):
   - Título criativo
   - Duração estimada
   - Script completo com marcações de tempo [GANCHO], [PROBLEMA], [SOLUÇÃO], [CTA]
   - Tom/estilo do roteiro

2. **2 legendas otimizadas** com CTA forte:
   - Uma para Instagram/Facebook (mais formal, com emojis estratégicos)
   - Uma para TikTok (mais casual, linguagem jovem)
   - Incluir hashtags relevantes
   - CTA claro e direto

3. **Sugestão de thumbnail/capa**:
   - Descrição detalhada da imagem ideal
   - Paleta de cores (3 cores em hexadecimal)
   - Elementos visuais chave (texto, ícones, composição)

Retorne APENAS um objeto JSON válido com esta estrutura:
{
  "scripts": [
    {
      "id": 1,
      "title": "string",
      "duration": "string",
      "script": "string",
      "tone": "string"
    }
  ],
  "captions": [
    {
      "id": 1,
      "text": "string",
      "cta": "string",
      "platform": "string"
    }
  ],
  "thumbnail": {
    "suggestion": "string",
    "colors": ["#hex1", "#hex2", "#hex3"],
    "elements": ["elemento1", "elemento2", "elemento3"]
  }
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em marketing digital e copywriting para anúncios. Sempre retorne respostas em formato JSON válido.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2500,
      response_format: { type: 'json_object' }
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('Nenhum conteúdo foi gerado pela IA');
    }

    const generatedContent = JSON.parse(content);
    return generatedContent;
  } catch (error) {
    console.error('Erro ao gerar conteúdo com OpenAI:', error);
    throw new Error('Falha ao gerar conteúdo. Tente novamente.');
  }
}

// Função para gerar feedback sobre performance de anúncios
export async function generatePerformanceFeedback(
  creative: string,
  metrics: {
    impressions: number;
    clicks: number;
    ctr: number;
    cpc: number;
    conversions: number;
    roi: number;
  }
): Promise<string> {
  const prompt = `Analise a performance deste anúncio e forneça feedback acionável:

CRIATIVO: ${creative}

MÉTRICAS:
- Impressões: ${metrics.impressions.toLocaleString()}
- Cliques: ${metrics.clicks.toLocaleString()}
- CTR: ${metrics.ctr}%
- CPC: R$ ${metrics.cpc}
- Conversões: ${metrics.conversions}
- ROI: ${metrics.roi}%

Forneça um feedback curto (máximo 2 frases) com:
1. Avaliação da performance (boa/média/baixa)
2. Uma sugestão específica e acionável para melhorar

Seja direto e prático.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Você é um analista de performance de anúncios digitais. Seja conciso e prático.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    return completion.choices[0].message.content || 'Análise não disponível no momento.';
  } catch (error) {
    console.error('Erro ao gerar feedback:', error);
    return 'Não foi possível gerar feedback no momento.';
  }
}

// Função para sugerir melhor horário de postagem
export async function suggestBestPostingTime(
  platform: 'meta' | 'tiktok',
  targetAudience: string
): Promise<string> {
  const prompt = `Baseado em dados de engajamento, sugira o melhor horário para postar na ${platform === 'meta' ? 'Meta (Facebook/Instagram)' : 'TikTok'} para o seguinte público: ${targetAudience}.

Forneça uma resposta curta (1 frase) com:
- Dia da semana
- Horário específico
- Percentual estimado de aumento de engajamento

Exemplo: "Segunda-feira às 18h tem 35% mais engajamento para seu público."`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em timing de postagens em redes sociais.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.5,
      max_tokens: 100
    });

    return completion.choices[0].message.content || 'Sugestão não disponível no momento.';
  } catch (error) {
    console.error('Erro ao sugerir horário:', error);
    return 'Não foi possível gerar sugestão no momento.';
  }
}
