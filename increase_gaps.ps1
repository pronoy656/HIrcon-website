$files = @(
    "c:\office-project\HIrcon-website\src\app\dashboard\page.tsx",
    "c:\office-project\HIrcon-website\src\app\dashboard\quote\saved-quotation\page.tsx",
    "c:\office-project\HIrcon-website\src\app\dashboard\print\print-manifest\page.tsx",
    "c:\office-project\HIrcon-website\src\app\dashboard\products\edit-products\page.tsx",
    "c:\office-project\HIrcon-website\src\app\dashboard\products\edit-packaging\page.tsx",
    "c:\office-project\HIrcon-website\src\app\dashboard\invoice\page.tsx",
    "c:\office-project\HIrcon-website\src\app\dashboard\manage\csv-mapping\page.tsx",
    "c:\office-project\HIrcon-website\src\app\dashboard\manage\preference\page.tsx",
    "c:\office-project\HIrcon-website\src\app\dashboard\manage\dashboard-preference\page.tsx",
    "c:\office-project\HIrcon-website\src\app\dashboard\manage\contact\page.tsx",
    "c:\office-project\HIrcon-website\src\app\dashboard\manage\preference\auto-print-guidelines\page.tsx",
    "c:\office-project\HIrcon-website\src\app\dashboard\integration\page.tsx",
    "c:\office-project\HIrcon-website\src\components\features\shipment\BaseShipmentForm.tsx",
    "c:\office-project\HIrcon-website\src\components\features\tracking\tracking-history\TrackingHistoryClient.tsx",
    "c:\office-project\HIrcon-website\src\components\features\quote\quick-quote\QuickQuoteForm.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $c = Get-Content $file -Raw
        
        # Increase wrapper margin bottom
        $newC = $c -replace 'className="mb-2"(\s*>\s*<h1)', 'className="mb-8"$1'
        $newC = $newC -replace 'className="mb-4"(\s*>\s*<h1)', 'className="mb-8"$1'
        $newC = $newC -replace 'className="mb-1"(\s*>\s*<h1)', 'className="mb-8"$1'
        
        # Also adjust mt-4 to mt-8 in QuickQuoteForm if needed, or just let mb-8 handle it.
        $newC = $newC -replace 'mt-4"(\s*>\s*<div className="grid grid-cols-1 md:grid-cols-4)', 'mt-8"$1'
        
        if ($c -ne $newC) {
            Set-Content -Path $file -Value $newC -NoNewline
        }
    }
}
