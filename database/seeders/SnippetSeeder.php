<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Snippet;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SnippetSeeder extends Seeder
{
    public function run(): void
    {
        $user = clone User::first();
        if (!$user) {
            $user = User::create(['name' => 'Comunidade Open Source', 'email' => 'comunidade@snippetvault.com', 'password' => bcrypt('password')]);
        }

        $languages = [
            'javascript' => ['Manipulação de Arrays', 'Promises e Async/Await', 'Regex Avançado', 'Design Patterns', 'Performance API', 'React Hooks', 'Node.js Utils'],
            'python' => ['List Comprehensions', 'Data Science Pandas', 'FastAPI Endpoints', 'Scraping BeautifulSoup', 'Machine Learning', 'Decorators'],
            'typescript' => ['Generics', 'Interfaces Complexas', 'Utility Types', 'Decorators', 'Type Guards'],
            'go' => ['Goroutines', 'Channels', 'HTTP Servers', 'JSON Parsing', 'Interfaces'],
            'rust' => ['Borrow Checker', 'Lifetimes', 'Traits', 'Structs', 'Concurrency'],
            'java' => ['Streams API', 'Lambdas', 'Spring Boot Autowiring', 'Concurrency', 'Design Patterns'],
            'csharp' => ['LINQ', 'Async/Await Tasks', 'Entity Framework', 'Delegates', 'Events'],
            'php' => ['Laravel Eloquent', 'Traits', 'Interfaces', 'Array Manipulation', 'Security'],
            'ruby' => ['ActiveRecord', 'Blocks and Procs', 'Metaprogramming', 'Sinatra', 'RSpec'],
            'sql' => ['CTEs', 'Window Functions', 'Joins Complexos', 'Triggers', 'Stored Procedures'],
            'bash' => ['Awk e Sed', 'Loops Avançados', 'Cron Jobs', 'Network Config', 'File Manipulation'],
            'css' => ['Flexbox Layouts', 'CSS Grid', 'Animações Keyframes', 'Variáveis Nativas', 'Media Queries'],
            'html' => ['Semântica HTML5', 'Acessibilidade ARIA', 'Forms Validação', 'Canvas API', 'Meta Tags SEO'],
            'react' => ['Custom Hooks', 'Context API', 'Suspense e Lazy', 'UseEffect Avançado', 'Zustand/Redux'],
            'docker' => ['Multi-stage Builds', 'Docker Compose', 'Network Bridges', 'Volumes', 'Alpine Images']
        ];

        $actions = ['Implementação de', 'Guia definitivo para', 'Como fazer', 'Exemplo avançado de', 'Padrão moderno para', 'Otimizando', 'Resolvendo problemas de'];
        $adjectives = ['em produção', 'rápido e fácil', 'com alta performance', 'seguro e validado', 'para iniciantes', 'nível sênior'];

        $snippetsToInsert = [];
        $totalTarget = 1050; // Goal > 1000
        $perLanguage = ceil($totalTarget / count($languages));

        foreach ($languages as $lang => $topics) {
            for ($i = 0; $i < $perLanguage; $i++) {
                $topic = $topics[array_rand($topics)];
                $action = $actions[array_rand($actions)];
                $adj = $adjectives[array_rand($adjectives)];
                
                $title = "{$action} {$topic} {$adj} " . rand(100, 999);
                $description = "Aprenda a aplicar {$topic} em seus projetos {$lang}. Este snippet mostra exatamente como implementar {$title} de forma limpa e escalável.";
                
                $code = $this->generateFakeCode($lang, $topic);
                
                $snippetsToInsert[] = [
                    'user_id' => $user->id,
                    'folder_id' => null,
                    'title' => Str::limit($title, 100),
                    'language' => $lang,
                    'description' => Str::limit($description, 250),
                    'code' => $code,
                    'is_public' => true,
                    'is_favorite' => false,
                    'views' => rand(10, 5000),
                    'created_at' => now()->subDays(rand(1, 300)),
                    'updated_at' => now()->subDays(rand(1, 50)),
                ];
            }
        }

        // Apaga os antigos
        Snippet::truncate();

        // Insert in chunks to avoid memory limit
        foreach (array_chunk($snippetsToInsert, 200) as $chunk) {
            Snippet::insert($chunk);
        }
    }

    private function generateFakeCode($lang, $topic) {
        $lines = rand(8, 25);
        $code = "// Implementação focada em: {$topic}\n// Linguagem: {$lang}\n\n";
        
        if ($lang === 'javascript' || $lang === 'typescript' || $lang === 'react') {
            $code .= "const executeTask = async (data) => {\n";
            for ($j = 0; $j < $lines; $j++) {
                $code .= "    console.log('Processando step " . ($j + 1) . " para {$topic}...');\n";
                if ($j % 3 == 0) $code .= "    await new Promise(r => setTimeout(r, 100));\n";
            }
            $code .= "    return data;\n};\n\nexport default executeTask;";
        } elseif ($lang === 'python') {
            $code .= "def execute_task(data):\n    \"\"\" Implementa {$topic} de forma otimizada \"\"\"\n";
            for ($j = 0; $j < $lines; $j++) {
                $code .= "    print(f'Processando step " . ($j + 1) . " para {$topic}')\n";
                if ($j % 4 == 0) $code .= "    data.append(True)\n";
            }
            $code .= "    return data\n";
        } elseif ($lang === 'php') {
            $code .= "<?php\n\nclass " . str_replace(' ', '', $topic) . "Manager\n{\n    public function handle(array \$data): array\n    {\n";
            for ($j = 0; $j < $lines; $j++) {
                $code .= "        // Logica para step " . ($j + 1) . "\n        \$data['step_{$j}'] = true;\n";
            }
            $code .= "        return \$data;\n    }\n}\n";
        } elseif ($lang === 'sql') {
            $code .= "-- Query avançada: {$topic}\n";
            $code .= "WITH RankedData AS (\n    SELECT id, name, ROW_NUMBER() OVER(PARTITION BY category_id ORDER BY created_at DESC) as rn\n    FROM main_table\n)\n";
            $code .= "SELECT * FROM RankedData WHERE rn <= 5;\n";
            for ($j = 0; $j < $lines - 5; $j++) {
                $code .= "-- Step " . ($j + 1) . " logic...\n";
            }
        } else {
            $code .= "// Exemplo genérico de {$topic} em {$lang}\nfunction main() {\n";
            for ($j = 0; $j < $lines; $j++) {
                $code .= "    // Operação " . ($j + 1) . " complexa omitida\n";
            }
            $code .= "    return true;\n}\n";
        }
        
        return $code;
    }
}
