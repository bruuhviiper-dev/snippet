<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use App\Models\SnippetVersion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class SnippetController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $snippets = $user->snippets()->orderBy('updated_at', 'desc')->get();
        $folders = $user->folders()->orderBy('name', 'asc')->get();

        return Inertia::render('Dashboard', [
            'snippets' => $snippets,
            'folders' => $folders
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'code' => 'required|string',
            'language' => 'required|string|max:50',
            'description' => 'nullable|string',
            'tags' => 'nullable|array',
            'is_public' => 'boolean',
            'is_favorite' => 'boolean',
            'folder_id' => 'nullable|exists:folders,id'
        ]);

        $user = Auth::user();
        
        $snippet = $user->snippets()->create($validated);

        return redirect()->back()->with('success', 'Snippet criado com sucesso!');
    }

    public function update(Request $request, Snippet $snippet)
    {
        if ($snippet->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'code' => 'required|string',
            'language' => 'required|string|max:50',
            'description' => 'nullable|string',
            'tags' => 'nullable|array',
            'is_public' => 'boolean',
            'is_favorite' => 'boolean',
            'folder_id' => 'nullable|exists:folders,id'
        ]);

        $oldCode = $snippet->code;
        
        $snippet->update($validated);

        $user = Auth::user();
        // Se mudou o código e é Pro, salva versão
        if ($oldCode !== $validated['code'] && $user->plan === 'pro') {
            SnippetVersion::create([
                'snippet_id' => $snippet->id,
                'code' => $oldCode
            ]);
            
            // Mantém apenas últimas 10 versões
            $versionsCount = $snippet->versions()->count();
            if ($versionsCount > 10) {
                $snippet->versions()->orderBy('created_at', 'asc')->first()->delete();
            }
        }

        return redirect()->back()->with('success', 'Snippet atualizado!');
    }

    public function destroy(Snippet $snippet)
    {
        if ($snippet->user_id !== Auth::id()) {
            abort(403);
        }

        $snippet->delete();

        return redirect()->back()->with('success', 'Snippet excluído.');
    }
}
