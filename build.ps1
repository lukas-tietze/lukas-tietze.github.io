Write-Host "Baue Skripte"
tsc --build .\tsconfig.json

Write-Host "Baue Stile"
sass .\styles\main.scss index.css