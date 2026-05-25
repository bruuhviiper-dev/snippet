<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Snippet;

class SitemapController extends Controller
{
    public function index()
    {
        $snippets = Snippet::where('is_public', true)
            ->orderBy('views', 'desc')
            ->select('id', 'updated_at', 'views')
            ->get();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // Static routes
        $xml .= $this->createUrlNode(url('/'), '1.0', 'daily', date('c'));
        $xml .= $this->createUrlNode(url('/explore'), '0.9', 'hourly', date('c'));
        $xml .= $this->createUrlNode(url('/pricing'), '0.7', 'monthly', date('c'));

        // Dynamic Snippets
        foreach ($snippets as $snippet) {
            $priority = '0.6';
            if ($snippet->views > 1000) $priority = '0.9';
            elseif ($snippet->views > 100) $priority = '0.8';
            elseif ($snippet->views > 10) $priority = '0.7';

            $xml .= $this->createUrlNode(url('/s/' . $snippet->id), $priority, 'weekly', $snippet->updated_at->toAtomString());
        }

        $xml .= '</urlset>';

        return response($xml)->header('Content-Type', 'text/xml');
    }

    private function createUrlNode($loc, $priority, $changefreq, $lastmod)
    {
        return "<url>
            <loc>{$loc}</loc>
            <lastmod>{$lastmod}</lastmod>
            <changefreq>{$changefreq}</changefreq>
            <priority>{$priority}</priority>
        </url>";
    }
}
