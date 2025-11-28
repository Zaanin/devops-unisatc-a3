# Script para matar processos na porta 1337 e reiniciar o Strapi
# Use: .\restart-strapi.ps1

Write-Host "Verificando porta 1337..." -ForegroundColor Cyan

# Verifica se a porta esta em uso
$process = Get-NetTCPConnection -LocalPort 1337 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique

if ($process) {
    Write-Host "Porta 1337 em uso pelo processo PID: $process" -ForegroundColor Yellow
    Write-Host "Matando processo..." -ForegroundColor Red
    taskkill /PID $process /F
    Start-Sleep -Seconds 2
    Write-Host "Processo encerrado!" -ForegroundColor Green
} else {
    Write-Host "Porta 1337 esta livre" -ForegroundColor Green
}

Write-Host ""
Write-Host "Iniciando Strapi..." -ForegroundColor Cyan
pnpm dev
