Set WshShell = CreateObject("WScript.Shell")
DesktopPath = WshShell.SpecialFolders("Desktop")
Username = WshShell.ExpandEnvironmentStrings("%USERNAME%")
FolderPath = "C:\Users\" & Username & "\Desktop\Setup\electron\public"

' Create PublicShortcut.lnk
PublicShortcutPath = DesktopPath & "\PublicShortcut.lnk"
Set PublicShortcut = WshShell.CreateShortcut(PublicShortcutPath)
PublicShortcut.TargetPath = FolderPath
PublicShortcut.Save

' Create D-LAB.lnk in Desktop folder



SRDLShortcutPath = DesktopPath & "\D-LAB.lnk"
Set SRDLShortcut = WshShell.CreateShortcut(SRDLShortcutPath)
SRDLShortcut.TargetPath = "%USERPROFILE%\Desktop\Setup\instantstart.vbs"
SRDLShortcut.WorkingDirectory = "%USERPROFILE%\Desktop\Setup"
SRDLShortcut.WindowStyle = 0
SRDLShortcut.IconLocation = "%USERPROFILE%\Desktop\Setup\icon\Icon.ico"
SRDLShortcut.Save

' Create D-LAB.lnk in Startup folder
StartupFolderPath = WshShell.SpecialFolders("Startup")
SRDLStartupShortcutPath = StartupFolderPath & "\D-LAB.lnk"
Set SRDLStartupShortcut = WshShell.CreateShortcut(SRDLStartupShortcutPath)
SRDLStartupShortcut.TargetPath = "%USERPROFILE%\Desktop\Setup\instantstart.vbs"
SRDLStartupShortcut.WorkingDirectory = "%USERPROFILE%\Desktop\Setup"
SRDLStartupShortcut.WindowStyle = 0
SRDLStartupShortcut.IconLocation = "%USERPROFILE%\Desktop\Setup\icon\Icon.ico"
SRDLStartupShortcut.Save

Set WshShell = Nothing

MsgBox "Installation Completed successfully!"
