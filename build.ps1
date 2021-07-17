[CmdletBinding()]
param (
    [Parameter()]
    [string]
    $mode
)

$isProd = $mode.ToLower().Equals("prod");

Write-Host "Baue Skripte"

if ($isProd) {
    tsc --build .\tsconfig.prod.json
}
else {
    tsc --build .\tsconfig.json
}

Write-Host "Fertig"

Write-Host "Erzeuge Bundle"
npx webpack
Write-Host "Fertig"

Write-Host "Baue Stile"
sass .\styles\main.scss dist\index.css --style compressed
Write-Host "Fertig"