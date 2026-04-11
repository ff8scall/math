Add-Type -AssemblyName System.Drawing

function FloodFill-Background {
    param(
        [string]$Path,
        [int]$Threshold = 245
    )
    
    if (-not (Test-Path $Path)) { return }
    Write-Host "Smart Processing: $Path"
    
    $img = [System.Drawing.Image]::FromFile($Path)
    $bmp = New-Object System.Drawing.Bitmap($img)
    $img.Dispose()

    $width = $bmp.Width
    $height = $bmp.Height
    
    # Queue for Flood Fill
    $queue = New-Object System.Collections.Generic.Queue[System.Drawing.Point]
    $visited = New-Object 'bool[,]' $width, $height
    
    # Start points: corners and edges
    for ($x = 0; $x -lt $width; $x++) {
        $queue.Enqueue((New-Object System.Drawing.Point($x, 0)))
        $queue.Enqueue((New-Object System.Drawing.Point($x, $height - 1)))
    }
    for ($y = 0; $y -lt $height; $y++) {
        $queue.Enqueue((New-Object System.Drawing.Point(0, $y)))
        $queue.Enqueue((New-Object System.Drawing.Point($width - 1, $y)))
    }

    $toTransparent = New-Object System.Collections.Generic.List[System.Drawing.Point]

    while ($queue.Count -gt 0) {
        $p = $queue.Dequeue()
        if ($p.X -lt 0 -or $p.X -ge $width -or $p.Y -lt 0 -or $p.Y -ge $height) { continue }
        if ($visited[$p.X, $p.Y]) { continue }
        $visited[$p.X, $p.Y] = $true

        $pixel = $bmp.GetPixel($p.X, $p.Y)
        
        # Check if it's "Background White"
        if ($pixel.R -ge $Threshold -and $pixel.G -ge $Threshold -and $pixel.B -ge $Threshold) {
            $toTransparent.Add($p)
            
            # Add neighbors
            $queue.Enqueue((New-Object System.Drawing.Point($p.X + 1, $p.Y)))
            $queue.Enqueue((New-Object System.Drawing.Point($p.X - 1, $p.Y)))
            $queue.Enqueue((New-Object System.Drawing.Point($p.X, $p.Y + 1)))
            $queue.Enqueue((New-Object System.Drawing.Point($p.X, $p.Y - 1)))
        }
    }

    if ($toTransparent.Count -gt 0) {
        foreach ($p in $toTransparent) {
            $bmp.SetPixel($p.X, $p.Y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        }
        $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Host "  -> Background removed (internal white preserved)."
    }
    $bmp.Dispose()
}

# Apply only to the 5 main ones for now to be safe
$targets = @(
    "C:/AI/Antigravity/Math/src/assets/images/avatar/boy.png",
    "C:/AI/Antigravity/Math/src/assets/images/avatar/girl.png",
    "C:/AI/Antigravity/Math/src/assets/images/pets/hamster.png",
    "C:/AI/Antigravity/Math/src/assets/images/pets/rabbit.png",
    "C:/AI/Antigravity/Math/src/assets/images/pets/cat_siamese.png"
)

foreach ($t in $targets) {
    FloodFill-Background $t
}
