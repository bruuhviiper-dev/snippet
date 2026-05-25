<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SnippetController;
use App\Http\Controllers\AiController;
use App\Http\Controllers\SitemapController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\PublicSnippetController;

Route::get('/sitemap.xml', [SitemapController::class, 'index']);
Route::get('/s/{id}', [PublicSnippetController::class, 'show'])->name('snippet.public');
Route::get('/s/{id}/og.svg', [PublicSnippetController::class, 'ogImage'])->name('snippet.og');
Route::get('/embed/{id}', [PublicSnippetController::class, 'embed'])->name('snippet.embed');
Route::post('/s/{snippet}/rate', [PublicSnippetController::class, 'rate'])->name('snippets.rate');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/pricing', [SubscriptionController::class, 'pricing'])->name('pricing');
Route::get('/explore', [PublicSnippetController::class, 'explore'])->name('explore');
Route::get('/explore/{language}', [PublicSnippetController::class, 'exploreLanguage'])->name('explore.language');
Route::get('/s/{snippet}', [PublicSnippetController::class, 'show'])->name('snippets.public');

Route::get('/changelog', function () {
    return Inertia::render('Changelog');
})->name('changelog');

Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

Route::get('/privacy', function () {
    return Inertia::render('Privacy');
})->name('privacy');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/dashboard', [SnippetController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::post('/snippets', [SnippetController::class, 'store'])->name('snippets.store');
    Route::put('/snippets/{snippet}', [SnippetController::class, 'update'])->name('snippets.update');
    Route::delete('/snippets/{snippet}', [SnippetController::class, 'destroy'])->name('snippets.destroy');

    Route::post('/checkout/pro', [SubscriptionController::class, 'checkout'])->name('checkout.pro');
    Route::get('/billing-portal', [SubscriptionController::class, 'portal'])->name('billing.portal');

    Route::post('/ai/tags', [AiController::class, 'tags'])->name('ai.tags');
    Route::post('/ai/explain', [AiController::class, 'explain'])->name('ai.explain');
    Route::post('/ai/generate', [AiController::class, 'generate'])->name('ai.generate');

    Route::post('/folders', [\App\Http\Controllers\FolderController::class, 'store'])->name('folders.store');
    Route::delete('/folders/{folder}', [\App\Http\Controllers\FolderController::class, 'destroy'])->name('folders.destroy');

    // Pro Plan Upgrade Route
    Route::post('/upgrade', function (Illuminate\Http\Request $request) {
        $request->user()->update(['is_pro' => true]);
        return back();
    })->name('user.upgrade');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
