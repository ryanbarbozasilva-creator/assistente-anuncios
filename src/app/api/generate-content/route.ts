import { NextRequest, NextResponse } from 'next/server';
import { generateContentWithAI, GenerateContentRequest } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body: GenerateContentRequest = await request.json();

    // Validação básica
    if (!body.productDescription || body.productDescription.trim().length < 10) {
      return NextResponse.json(
        { error: 'Descrição do produto deve ter pelo menos 10 caracteres' },
        { status: 400 }
      );
    }

    // Gera conteúdo com ChatGPT
    const generatedContent = await generateContentWithAI(body);

    return NextResponse.json(generatedContent);
  } catch (error) {
    console.error('Erro na API de geração de conteúdo:', error);
    
    return NextResponse.json(
      { 
        error: 'Erro ao gerar conteúdo. Verifique se a chave da API do OpenAI está configurada corretamente.',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
