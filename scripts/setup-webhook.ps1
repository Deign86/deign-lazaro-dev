$VERCEL_DEPLOY_HOOK = "https://api.vercel.com/v1/integrations/deploy/prj_61DK1WALRgtHeI1VqhPUJ43v1l77/UREwdUyrKq"
$GITHUB_REPO = "Deign86/deign-lazaro-dev"

Write-Host "Setting up GitHub webhook..." -ForegroundColor Cyan

if (Get-Command gh -ErrorAction SilentlyContinue) {
    Write-Host "Creating webhook via GitHub CLI..." -ForegroundColor Green
    
    gh api repos/$GITHUB_REPO/hooks -X POST -f name=web -f config[url]=$VERCEL_DEPLOY_HOOK -f config[content_type]=application/json -f config[insecure_ssl]=0 -F events[]=push -F active=true
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n SUCCESS! Webhook created!" -ForegroundColor Green
        Write-Host "`nTest with:" -ForegroundColor Yellow
        Write-Host "  git commit --allow-empty -m 'Test deploy hook'"
        Write-Host "  git push origin main"
    }
} else {
    Write-Host "`n GitHub CLI not found." -ForegroundColor Yellow
    Write-Host "`nManual setup: https://github.com/$GITHUB_REPO/settings/hooks/new"
    Write-Host "Payload URL: $VERCEL_DEPLOY_HOOK"
    Write-Host "Content type: application/json"
    Write-Host "Events: Just the push event"
}
