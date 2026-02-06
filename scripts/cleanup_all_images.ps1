Add-Type -AssemblyName System.Drawing

function Remove-NearWhite {
    param(
        [string]$Path,
        [int]$Threshold = 245
    )
    
    if (-not (Test-Path $Path)) { return }
    if ($Path -like "*all.png*") { return } # Skip sprite sheets or specific files if needed

    Write-Host "Processing: $Path"
    
    $img = [System.Drawing.Image]::FromFile($Path)
    $bmp = New-Object System.Drawing.Bitmap($img)
    $img.Dispose()

    $width = $bmp.Width
    $height = $bmp.Height
    $changed = $false

    for ($y = 0; $y -lt $height; $y++) {
        for ($x = 0; $x -lt $width; $x++) {
            $pixel = $bmp.GetPixel($x, $y)
            if ($pixel.R -ge $Threshold -and $pixel.G -ge $Threshold -and $pixel.B -ge $Threshold) {
                if ($pixel.A -ne 0) {
                    $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
                    $changed = $true
                }
            }
        }
    }
    
    if ($changed) {
        $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Host "  -> Updated with transparency."
    } else {
        Write-Host "  -> No white background detected or already transparent."
    }
    $bmp.Dispose()
}

$petsDir = "C:/AI/Antigravity/FreeMath/src/assets/images/pets"
$avatarsDir = "C:/AI/Antigravity/FreeMath/src/assets/images/avatar"

Write-Host "Cleaning up Pet images..."
Get-ChildItem $petsDir -Filter *.png | ForEach-Object {
    Remove-NearWhite $_.FullName
}

Write-Host "`nCleaning up Avatar images..."
Get-ChildItem $avatarsDir -Filter *.png | ForEach-Object {
    Remove-NearWhite $_.FullName
}
