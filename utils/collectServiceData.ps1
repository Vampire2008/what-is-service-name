$regex = "_[a-zA-Z0-9]{5,}$";
$services = Get-WmiObject Win32_Service | Select-Object @{Name="name";Expression={$_.Name -replace $regex}}, @{Name="displayName";Expression={$_.DisplayName -replace $regex}}, @{Name="description";Expression={if ($_.Description -eq $null) { "" } else { $_.Description }}}
Remove-Item "services.json" -ErrorAction Ignore
$services | ConvertTo-Json | Out-File "services.json"
