Add-Type -AssemblyName System.Drawing

function Safe-RemoveBackground {
    param(
        [string]$Path,
        [int]$Threshold = 245
    )
    
    if (-not (Test-Path $Path)) { return }
    Write-Host "Safely Processing: $Path"
    
    $img = [System.Drawing.Image]::FromFile($Path)
    $bmp = New-Object System.Drawing.Bitmap($img)
    $img.Dispose()

    $width = $bmp.Width
    $height = $bmp.Height
    $toTransparent = New-Object System.Collections.Generic.HashSet[string]

    # Wipe from Top to Bottom
    for ($x = 0; $x -lt $width; $x++) {
        for ($y = 0; $y -lt $height; $y++) {
            $pixel = $bmp.GetPixel($x, $y)
            if ($pixel.R -ge $Threshold -and $pixel.G -ge $Threshold -and $pixel.B -ge $Threshold) {
                $toTransparent.Add("$x,$y") | Out-Null
            } else { break } # Stop at first non-white
        }
    }
    # Wipe from Bottom to Top
    for ($x = 0; $x -lt $width; $x++) {
        for ($y = $height - 1; $y -ge 0; $y--) {
            $pixel = $bmp.GetPixel($x, $y)
            if ($pixel.R -ge $Threshold -and $pixel.G -ge $Threshold -and $pixel.B -ge $Threshold) {
                $toTransparent.Add("$x,$y") | Out-Null
            } else { break }
        }
    }
    # Wipe from Left to Right
    for ($y = 0; $y -lt $height; $y++) {
        for ($x = 0; $x -lt $width; $x++) {
            $pixel = $bmp.GetPixel($x, $y)
            if ($pixel.R -ge $Threshold -and $pixel.G -ge $Threshold -and $pixel.B -ge $Threshold) {
                $toTransparent.Add("$x,$y") | Out-Null
            } else { break }
        }
    }
    # Wipe from Right to Left
    for ($y = 0; $y -lt $height; $y++) {
        for ($x = $width - 1; $x -ge 0; $x--) {
            $pixel = $bmp.GetPixel($x, $y)
            if ($pixel.R -ge $Threshold -and $pixel.G -ge $Threshold -and $pixel.B -ge $Threshold) {
                $toTransparent.Add("$x,$y") | Out-Null
            } else { break }
        }
    }

    if ($toTransparent.Count -gt 0) {
        foreach ($coord in $toTransparent) {
            $parts = $coord.Split(',')
            $bmp.SetPixel([int]$parts[0], [int]$parts[1], [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        }
        $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Host "  -> Done."
    }
    $bmp.Dispose()
}

$targets = @(
    "C:/AI/Antigravity/Math/src/assets/images/avatar/boy.png",
    "C:/AI/Antigravity/Math/src/assets/images/avatar/girl.png",
    "C:/AI/Antigravity/Math/src/assets/images/pets/hamster.png",
    "C:/AI/Antigravity/Math/src/assets/images/pets/rabbit.png",
    "C:/AI/Antigravity/Math/src/assets/images/pets/cat_siamese.png"
)

foreach ($t in $targets) {
    Safe-RemoveBackground $t
}
