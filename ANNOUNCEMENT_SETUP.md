# Setup Guide: Announcement System

## Overview
The announcement system allows instructors to post cancellation notices to the home page (`index-test.html`) via the `notify.html` page without needing to understand GitHub or authentication tokens.

## How It Works

1. Instructor visits `/notify.html`
2. Clicks "Cancel all programs today" OR enters custom message and clicks "Submit"
3. A secure request is sent to GitHub using a built-in token
4. GitHub Actions workflow automatically updates `index-test.html`
5. Changes appear on the live site within moments
6. Confirmation message appears on notify.html

## Setup Instructions

### Step 1: Create a GitHub Personal Access Token

1. Go to **github.com** and sign in
2. Click your **profile icon** (top right) → **Settings**
3. Click **Developer settings** (left sidebar)
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token (classic)**
6. Fill in the form:
   - **Note**: `Sunrise Announcement System`
   - **Expiration**: No expiration (or set to 90 days and renew)
   - **Scopes**: Check ONLY `repo` (full control of private repositories)
7. Click **Generate token**
8. **COPY THE TOKEN** - you won't see it again!

### Step 2: Store Token in Repository Secrets

1. Go to your GitHub repo: **github.com/kyase-sunrise/sunrise**
2. Click **Settings** (top of repo)
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. **Name**: `ANNOUNCEMENT_TOKEN`
6. **Value**: Paste the token you copied
7. Click **Add secret**

### Step 3: Verify the Files

The following files should be in place:

- `.github/workflows/announcement-update.yml` - Listens for update requests
- `notify.html` - Admin page for posting announcements
- `index-test.html` - Home page that displays announcements

All three files are already created and configured.

## Testing

1. Go to `https://your-site.github.io/notify.html`
2. Click **"Cancel all programs today"**
3. Look for the confirmation message
4. Wait 1-2 minutes (GitHub Actions takes time to run)
5. Go to `https://your-site.github.io/index-test.html`
6. You should see the red cancellation message at the top

## Features

### Quick Cancellation
Displays: "All programs are cancelled today (DATE) due to bad weather."

### Custom Message
Post any message you want (e.g., "Horseback riding lessons cancelled due to rain")

### Remove Cancellation
Restores the default green message: "There are no lesson or program cancellations today (DATE)."

## Message Display

- **Green background**: No cancellations
- **Red background**: Cancellation in effect

Messages automatically display with today's date.

## Troubleshooting

### Nothing happens when I click the button
1. Check that the token is stored in GitHub repository secrets (ANNOUNCEMENT_TOKEN)
2. Check GitHub repo → **Actions** tab to see if the workflow is running
3. If the workflow failed, click on it to see the error message

### Workflow fails with "Authentication failed"
The token may have expired or been revoked. Create a new token and update the repository secret.

### Message appears but formatting is wrong
Clear your browser cache and reload `index-test.html`

## When Ready for Production

Once you've tested and confirmed everything works:

1. Copy the code from `index-test.html` to `index.html`
2. Update `.github/workflows/announcement-update.yml`:
   - Change `index-test.html` to `index.html` (in the Python script)
   - Update the commit message if desired
3. Test again on the live site
4. You can then delete or archive `index-test.html`

## Security Notes

- The token is stored securely in GitHub repository secrets
- The embedded token in `notify.html` is a reference to the secret
- Only repository administrators should have access to change the secret
- The system only allows updates to the announcement div in index.html - no other changes

## Support

If something isn't working:
1. Check GitHub repo → **Actions** tab for workflow logs
2. Verify the token is still valid
3. Check that all files (announcement-update.yml, notify.html, index-test.html) are in place
