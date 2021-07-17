Write-Host "Baue Skripte"
tsc --build .\tsconfig.json

Write-Host "Erzeuge Bundle"
npx webpack

Write-Host "Baue Stile"
sass .\styles\main.scss dist\index.css