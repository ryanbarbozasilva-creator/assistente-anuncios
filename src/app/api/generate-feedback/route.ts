import { NextRequest, NextResponse } from 'next/server';
import { generatePerformanceFeedback } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { creative, metrics } = body;

    // Validação
    if (!creative || !metrics) {
      return NextResponse.json(
        { error: 'Criativo e métricas são obrigatórios' },
        { status: 400 }
      );
    }

    // Gera feedback com ChatGPT
    const feedback = await generatePerformanceFeedback(creative, metrics);

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error('Erro na API de feedback:', error);
    
    return NextResponse.json(
      { 
        error: 'Erro ao gerar feedback',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
