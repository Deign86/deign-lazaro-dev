# Automated Deploy Hook Setup

## Quick Setup Instructions

### Step 1: Create Deploy Hook in Vercel (Manual - 30 seconds)

1. Open: https://vercel.com/deign86s-projects/deign-lazaro-dev/settings/git
2. Scroll to **Deploy Hooks** section
3. Click **Create Hook**
   - Name: `Auto Deploy from GitHub`
   - Git Branch Name: `main`
4. Click **Create Hook**
5. **Copy the webhook URL** (looks like: `https://api.vercel.com/v1/integrations/deploy/...`)

### Step 2: Run This Command (Automated)

Once you have the webhook URL, run this command (replace `YOUR_WEBHOOK_URL`):

```powershell
# Set your Vercel Deploy Hook URL
$DEPLOY_HOOK_URL = "YOUR_WEBHOOK_URL_HERE"

# Create GitHub webhook using GitHub CLI
gh api repos/Deign86/deign-lazaro-dev/hooks -X POST -f name='web' -f config[url]="$DEPLOY_HOOK_URL" -f config[content_type]='application/json' -f config[insecure_ssl]='0' -F events[]='push' -F active=true
```

### Alternative: Using GitHub MCP (If you want me to do it)

Just paste the Vercel Deploy Hook URL here and I'll add it to your GitHub repo automatically!

---

## What This Does

✅ Triggers Vercel deployment on every push to `main`
✅ Works with private repositories
✅ No Vercel Pro plan needed
✅ Bypasses GitHub App integration requirements

## Verification

After setup, test with:
```bash
git commit --allow-empty -m "Test deploy hook"
git push origin main
```

Check your Vercel dashboard - deployment should start within seconds!
