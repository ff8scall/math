Add-Type -AssemblyName System.Drawing

function Remove-NearWhiteBackground {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$Threshold = 245
    )
    
    Write-Host "Processing with Threshold ($Threshold): $InputPath -> $OutputPath"
    
    if (-not (Test-Path $InputPath)) {
        Write-Error "File not found: $InputPath"
        return
    }

    $img = [System.Drawing.Image]::FromFile($InputPath)
    $bmp = New-Object System.Drawing.Bitmap($img)
    $img.Dispose()

    $width = $bmp.Width
    $height = $bmp.Height

    # Iterate through pixels to find near-white ones
    for ($y = 0; $y -lt $height; $y++) {
        for ($x = 0; $x -lt $width; $x++) {
            $pixel = $bmp.GetPixel($x, $y)
            # If R, G, and B are all above threshold, make it transparent
            if ($pixel.R -ge $Threshold -and $pixel.G -ge $Threshold -and $pixel.B -ge $Threshold) {
                $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
            }
        }
    }
    
    $dir = Split-Path $OutputPath -Parent
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }

    $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Saved successfully with threshold."
}

# Mapping
$brainPath = "C:/Users/ff8sc/.gemini/antigravity/brain/02bd52fa-d2a8-42cc-a27f-4926c5b9823b"
$projectRoot = "C:/AI/Antigravity/FreeMath"

# Retry with threshold (245 means very light grey/white becomes transparent)
Remove-NearWhiteBackground "$brainPath/avatar_boy_v4_1770179272068.png" "$projectRoot/src/assets/images/avatar/boy.png"
Remove-NearWhiteBackground "$brainPath/avatar_girl_v4_1770179293670.png" "$projectRoot/src/assets/images/avatar/girl.png"
Remove-NearWhiteBackground "$brainPath/pet_hamster_v3_1770179315153.png" "$projectRoot/src/assets/images/pets/hamster.png"
Remove-NearWhiteBackground "$brainPath/pet_rabbit_v3_1770179339693.png" "$projectRoot/src/assets/images/pets/rabbit.png"
Remove-NearWhiteBackground "$brainPath/pet_cat_siamese_v4_1770179440823.png" "$projectRoot/src/assets/images/pets/cat_siamese.png"
