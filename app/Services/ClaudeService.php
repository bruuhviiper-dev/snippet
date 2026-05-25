<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ClaudeService
{
    protected string $apiKey;
    protected string $baseUrl = 'https://api.anthropic.com/v1/messages';
    protected string $model = 'claude-3-5-sonnet-20240620';

    public function __construct()
    {
        $this->apiKey = env('ANTHROPIC_API_KEY', '');
    }

    public function analyzeCode(string $code): array
    {
        $prompt = "Você é um assistente para devs. Analise o snippet abaixo e retorne APENAS um JSON estrito no seguinte formato: {\"tags\": [\"tag1\", \"tag2\"], \"language\": \"javascript\"}. Use nomes comuns e em minúsculas para a linguagem (ex: php, javascript, python, go). Não retorne nenhum outro texto, apenas o JSON.\nSnippet:\n" . $code;
        
        $response = $this->callApi($prompt);
        
        try {
            $clean = trim($response);
            if(str_starts_with($clean, '```json')) {
                $clean = str_replace(['```json', '```'], '', $clean);
            }
            $clean = trim($clean);
            
            $data = json_decode($clean, true);
            if (is_array($data) && isset($data['tags'])) {
                return [
                    'tags' => $data['tags'],
                    'language' => $data['language'] ?? 'plaintext'
                ];
            }
        } catch (\Exception $e) {
            Log::error('Claude API Analyze Parse Error: ' . $e->getMessage());
        }
        
        return ['tags' => ['code', 'snippet'], 'language' => 'plaintext'];
    }

    public function explainCode(string $code): string
    {
        $prompt = "Explique o snippet abaixo em português de forma clara e direta, em no máximo 4 parágrafos. Foque em: o que faz, como funciona, boas práticas e possíveis melhorias.\nSnippet:\n" . $code;
        return $this->callApi($prompt);
    }

    public function generateSnippet(string $prompt, string $language): string
    {
        $sysPrompt = "Você é um gerador de snippets de código para devs experientes. Gere um snippet em {$language} que: {$prompt}. Retorne APENAS o código, sem explicações, sem markdown (sem \`\`\`), apenas texto puro que possa ser colado no editor.";
        return $this->callApi($sysPrompt);
    }

    protected function callApi(string $prompt): string
    {
        if (empty($this->apiKey)) {
            // Mock response if no API key is provided
            return '{"tags":["mock","no-api-key"]} - Por favor configure ANTHROPIC_API_KEY no .env';
        }

        $response = Http::withHeaders([
            'x-api-key' => $this->apiKey,
            'anthropic-version' => '2023-06-01',
            'content-type' => 'application/json',
        ])->post($this->baseUrl, [
            'model' => $this->model,
            'max_tokens' => 1024,
            'messages' => [
                ['role' => 'user', 'content' => $prompt]
            ]
        ]);

        if ($response->successful()) {
            return $response->json('content.0.text') ?? '';
        }

        Log::error('Claude API Error: ' . $response->body());
        return 'Erro ao contatar API da IA.';
    }
}
