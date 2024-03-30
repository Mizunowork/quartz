created com.mischa.zksync.plist in /Users/mischa/Library/LaunchAgents

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.mischa.zksync</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Users/mischa/Repos/github.com/mischavandenburg/dotfiles/scripts/autopush</string>
    </array>
    <key>StartInterval</key>
    <integer>1800</integer>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
```


This runs every 30 minutes

# Problems

Had a lot of problems due to rsync permissions. Had to do something crazy to give rsync full disk access, which I would never have come up with myself. Found it here:

[Mojave rsync full disk access failure - Apple Community](https://discussions.apple.com/thread/250165035?answerId=250419395022&sortBy=best#250419395022)

## Links:


[Mojave rsync full disk access failure - Apple Community](https://discussions.apple.com/thread/250165035?answerId=250419395022&sortBy=best#250419395022)

[Backing up your iCloud Drive files using rsync · Jesse Squires](https://www.jessesquires.com/blog/2019/09/27/icloud-backup-using-rsync/)

202403291506