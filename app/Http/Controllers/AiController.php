<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ClaudeService;
use Illuminate\Support\Facades\Auth;

class AiController extends Controller
{
    protected $claude;

    public function __construct(ClaudeService $claude)
    {
        $this->claude = $claude;
    }

    public function tags(Request $request)
    {
        $request->validate(['code' => 'required|string']);
        
        $user = Auth::user();
        if ($user->plan === 'free') {
            // Simplistic rate limit verification could be added here
        }

        $data = $this->claude->analyzeCode($request->code);
        
        return response()->json($data);
    }

    public function explain(Request $request)
    {
        $request->validate(['code' => 'required|string']);
        
        $explanation = $this->claude->explainCode($request->code);
        
        return response()->json(['explanation' => $explanation]);
    }

    public function generate(Request $request)
    {
        $user = Auth::user();
        
        if ($user->plan !== 'pro') {
            return response()->json(['error' => 'Apenas plano Pro pode gerar snippets.'], 403);
        }

        $request->validate([
            'prompt' => 'required|string',
            'language' => 'required|string',
        ]);
        
        $code = $this->claude->generateSnippet($request->prompt, $request->language);
        
        return response()->json(['code' => $code]);
    }
}
