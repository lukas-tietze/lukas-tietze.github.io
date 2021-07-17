Write-Host "Baue Skripte"
tsc --build .\scripts\tsconfig.json

Write-Host "Baue Stile"
sass .\styles\main.scss index.css