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

    [int]$width = $bmp.Width
    [int]$height = $bmp.Height
    $toTransparent = New-Object System.Collections.Generic.HashSet[string]

    # Top down
    for ($x = 0; $x -lt $width; $x++) {
        for ($y = 0; $y -lt $height; $y++) {
            $pixel = $bmp.GetPixel($x, $y)
            if ($pixel.R -ge $Threshold -and $pixel.G -ge $Threshold -and $pixel.B -ge $Threshold) {
                $null = $toTransparent.Add("$x,$y")
            } else { break }
        }
    }
    # Bottom up
    [int]$yStart = $height - 1
    for ($x = 0; $x -lt $width; $x++) {
        for ($y = $yStart; $y -ge 0; $y--) {
            $pixel = $bmp.GetPixel($x, $y)
            if ($pixel.R -ge $Threshold -and $pixel.G -ge $Threshold -and $pixel.B -ge $Threshold) {
                $null = $toTransparent.Add("$x,$y")
            } else { break }
        }
    }
    # Left to right
    for ($y = 0; $y -lt $height; $y++) {
        for ($x = 0; $x -lt $width; $x++) {
            $pixel = $bmp.GetPixel($x, $y)
            if ($pixel.R -ge $Threshold -and $pixel.G -ge $Threshold -and $pixel.B -ge $Threshold) {
                $null = $toTransparent.Add("$x,$y")
            } else { break }
        }
    }
    # Right to left
    [int]$xStart = $width - 1
    for ($y = 0; $y -lt $height; $y++) {
        for ($x = $xStart; $x -ge 0; $x--) {
            $pixel = $bmp.GetPixel($x, $y)
            if ($pixel.R -ge $Threshold -and $pixel.G -ge $Threshold -and $pixel.B -ge $Threshold) {
                $null = $toTransparent.Add("$x,$y")
            } else { break }
        }
    }

    if ($toTransparent.Count -gt 0) {
        foreach ($coord in $toTransparent) {
            $pts = $coord -split ','
            $bmp.SetPixel([int]$pts[0], [int]$pts[1], [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        }
        $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Host "  -> Done. Transparent pixels: $($toTransparent.Count)"
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
