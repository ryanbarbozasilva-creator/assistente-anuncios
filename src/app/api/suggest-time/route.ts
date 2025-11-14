import { NextRequest, NextResponse } from 'next/server';
import { suggestBestPostingTime } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { platform, targetAudience } = body;

    // Validação
    if (!platform || !targetAudience) {
      return NextResponse.json(
        { error: 'Plataforma e público-alvo são obrigatórios' },
        { status: 400 }
      );
    }

    // Gera sugestão com ChatGPT
    const suggestion = await suggestBestPostingTime(platform, targetAudience);

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error('Erro na API de sugestão de horário:', error);
    
    return NextResponse.json(
      { 
        error: 'Erro ao gerar sugestão',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
