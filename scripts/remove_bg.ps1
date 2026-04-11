Add-Type -AssemblyName System.Drawing

function Remove-WhiteBackground {
    param(
        [string]$InputPath,
        [string]$OutputPath
    )
    
    Write-Host "Processing: $InputPath -> $OutputPath"
    
    if (-not (Test-Path $InputPath)) {
        Write-Error "File not found: $InputPath"
        return
    }

    $img = [System.Drawing.Image]::FromFile($InputPath)
    $bmp = New-Object System.Drawing.Bitmap($img)
    $img.Dispose() # Free the file handle

    # Make exact white transparent
    $bmp.MakeTransparent([System.Drawing.Color]::White)
    
    # AI images often have "almost white" pixels (like 254, 254, 254).
    # Simple MakeTransparent only hits 255,255,255.
    # For better results, we could iterate pixels, but let's try the simple one first.
    
    $dir = Split-Path $OutputPath -Parent
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }

    $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Saved successfully."
}

# Mapping
$brainPath = "C:/Users/ff8sc/.gemini/antigravity/brain/02bd52fa-d2a8-42cc-a27f-4926c5b9823b"
$projectRoot = "C:/AI/Antigravity/Math"

# Latest versions
Remove-WhiteBackground "$brainPath/avatar_boy_v4_1770179272068.png" "$projectRoot/src/assets/images/avatar/boy.png"
Remove-WhiteBackground "$brainPath/avatar_girl_v4_1770179293670.png" "$projectRoot/src/assets/images/avatar/girl.png"
Remove-WhiteBackground "$brainPath/pet_hamster_v3_1770179315153.png" "$projectRoot/src/assets/images/pets/hamster.png"
Remove-WhiteBackground "$brainPath/pet_rabbit_v3_1770179339693.png" "$projectRoot/src/assets/images/pets/rabbit.png"
Remove-WhiteBackground "$brainPath/pet_cat_siamese_v4_1770179440823.png" "$projectRoot/src/assets/images/pets/cat_siamese.png"
