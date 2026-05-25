<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PublicSnippetController extends Controller
{
    public function explore(Request $request)
    {
        $languageCounts = Snippet::where('is_public', true)
            ->selectRaw('language, count(*) as total')
            ->groupBy('language')
            ->orderByDesc('total')
            ->get();

        $snippets = Snippet::with('user:id,name')
            ->where('is_public', true)
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('language', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Explore', [
            'snippets' => $snippets,
            'languageCounts' => $languageCounts,
            'filters' => $request->only(['search'])
        ]);
    }

    public function exploreLanguage($language)
    {
        $snippets = Snippet::with('user:id,name')
            ->where('is_public', true)
            ->where('language', 'like', $language)
            ->latest()
            ->paginate(1000);

        return Inertia::render('Explore', [
            'snippets' => $snippets,
            'filters' => ['language' => $language]
        ]);
    }

    public function show($id)
    {
        $snippet = Snippet::with('user:id,name')->where('is_public', true)->findOrFail($id);
        
        // Aumenta contador de visualizações
        $snippet->increment('views');

        $relatedSnippets = Snippet::with('user:id,name')
            ->where('is_public', true)
            ->where('id', '!=', $id)
            ->where(function($query) use ($snippet) {
                $query->where('language', $snippet->language)
                      ->orWhere('user_id', $snippet->user_id);
            })
            ->inRandomOrder()
            ->limit(4)
            ->get();

        $languageCounts = Snippet::where('is_public', true)
            ->selectRaw('language, count(*) as total')
            ->groupBy('language')
            ->orderByDesc('total')
            ->limit(8)
            ->get();

        return Inertia::render('PublicSnippet', [
            'snippet' => $snippet,
            'relatedSnippets' => $relatedSnippets,
            'languageCounts' => $languageCounts,
            'appUrl' => config('app.url')
        ]);
    }

    public function embed($id)
    {
        $snippet = Snippet::with('user:id,name')->where('is_public', true)->findOrFail($id);
        
        // Aumenta view também quando embedado
        $snippet->increment('views');

        return Inertia::render('Embed', [
            'snippet' => $snippet,
            'appUrl' => config('app.url')
        ]);
    }

    public function rate(Request $request, Snippet $snippet)
    {
        if (!$snippet->is_public) {
            abort(404);
        }

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5'
        ]);

        if ($request->cookie('rated_snippet_' . $snippet->id)) {
            return back()->with('error', 'Você já avaliou este snippet.');
        }

        $snippet->increment('rating_sum', $validated['rating']);
        $snippet->increment('rating_count');

        return back()
            ->with('success', 'Avaliação registrada com sucesso!')
            ->withCookie(cookie()->forever('rated_snippet_' . $snippet->id, true));
    }

    public function ogImage($id)
    {
        $snippet = Snippet::where('is_public', true)->findOrFail($id);
        
        $title = htmlspecialchars(mb_strimwidth($snippet->title, 0, 45, '...'));
        $lang = htmlspecialchars(strtoupper($snippet->language));
        
        $svg = '<?xml version="1.0" encoding="utf-8"?>
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0D0D0D"/>
  <text x="80" y="100" fill="#A8FF3E" font-family="monospace" font-size="40" font-weight="bold">&lt;/&gt; SnippetVault</text>
  <text x="80" y="300" fill="#FFFFFF" font-family="sans-serif" font-size="72" font-weight="bold">' . $title . '</text>
  <rect x="80" y="380" width="160" height="50" rx="8" fill="#1E293B"/>
  <text x="160" y="415" fill="#A8FF3E" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle">' . $lang . '</text>
  <text x="80" y="520" fill="#94A3B8" font-family="sans-serif" font-size="28">Explore milhares de snippets de código prontos para usar.</text>
</svg>';

        return response($svg)->header('Content-Type', 'image/svg+xml')
                            ->header('Cache-Control', 'public, max-age=604800');
    }
}
