Add-Type -AssemblyName System.Drawing

function Slice-And-RemoveBackground {
    param(
        [string]$InputPath,
        [string]$OutputDir,
        [string[]]$Names
    )
    
    if (-not (Test-Path $InputPath)) {
        Write-Host "File not found: $InputPath"
        return
    }

    $img = [System.Drawing.Image]::FromFile($InputPath)
    $fullWidth = $img.Width
    $fullHeight = $img.Height
    
    $cellWidth = [int]($fullWidth / 3)
    $cellHeight = [int]($fullHeight / 3)

    if (-not (Test-Path $OutputDir)) {
        New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
    }

    for ($row = 0; $row -lt 3; $row++) {
        for ($col = 0; $col -lt 3; $col++) {
            $index = ($row * 3) + $col
            if ($index -ge $Names.Length) { break }
            
            $name = $Names[$index]
            $outputPath = Join-Path $OutputDir "$name.png"
            Write-Host "Slicing: $name at ($row, $col)"

            # Crop
            $rect = New-Object System.Drawing.Rectangle ($col * $cellWidth), ($row * $cellHeight), $cellWidth, $cellHeight
            $bmp = New-Object System.Drawing.Bitmap $cellWidth, $cellHeight
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $cellWidth, $cellHeight), $rect, [System.Drawing.GraphicsUnit]::Pixel)
            $g.Dispose()

            # Remove Background (Threshold based for better results)
            # Simple MakeTransparent White
            # $bmp.MakeTransparent([System.Drawing.Color]::White)
            
            # Smart Background Removal (Better for JPEG artifacts)
            for ($y = 0; $y -lt $bmp.Height; $y++) {
                for ($x = 0; $x -lt $bmp.Width; $x++) {
                    $pixel = $bmp.GetPixel($x, $y)
                    # If very close to white, make transparent
                    if ($pixel.R -gt 245 -and $pixel.G -gt 245 -and $pixel.B -gt 245) {
                        $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
                    }
                }
            }

            $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
            $bmp.Dispose()
        }
    }
    $img.Dispose()
    Write-Host "Sheet processed: $InputPath"
}

$projectRoot = "C:/AI/Antigravity/FreeMath"
$petsDir = "$projectRoot/src/assets/images/pets"
$avatarDir = "$projectRoot/src/assets/images/avatar"
$brain = "C:/Users/ff8sc/.gemini/antigravity/brain/0ca0c21e-2ff1-4dc7-aa06-161ba8ac1719"

# Sheet 1: Cats/Dogs
Slice-And-RemoveBackground "$brain/pet_sheet_1_1770387166980.png" $petsDir @("cat_tabby_v2", "dog_retriever_v2", "cat_calico_v2", "dog_corgi_v2", "cat_black_v2", "dog_husky", "dog_bichon", "cat_grey_v2", "dog_beagle")

# Sheet 2: Forest
Slice-And-RemoveBackground "$brain/pet_sheet_2_forest_1770387225047.png" $petsDir @("forest_bear", "forest_fox", "forest_deer", "forest_raccoon", "forest_squirrel", "forest_owl", "forest_hedgehog", "forest_rabbit", "forest_wolf")

# Sheet 3: Safari
Slice-And-RemoveBackground "$brain/pet_sheet_3_safari_1770387255598.png" $petsDir @("safari_lion", "safari_elephant", "safari_giraffe", "safari_zebra", "safari_monkey", "safari_tiger", "safari_hippo", "safari_rhino", "safari_koala")

# Sheet 4: Farm
Slice-And-RemoveBackground "$brain/pet_sheet_4_farm_1770387293788.png" $petsDir @("farm_cow", "farm_pig", "farm_sheep", "farm_chicken", "farm_duck", "farm_horse", "farm_goat", "farm_chick", "farm_goose")

# Sheet 5: Sea
Slice-And-RemoveBackground "$brain/pet_sheet_5_sea_1770387319916.png" $petsDir @("sea_penguin", "sea_seal", "sea_whale", "sea_dolphin", "sea_shark", "sea_turtle", "sea_octopus", "sea_crab", "sea_starfish")

# Sheet 6: Small Pets
Slice-And-RemoveBackground "$brain/pet_sheet_6_small_pets_1770387353476.png" $petsDir @("pet_parrot", "pet_turtle_v2", "pet_mouse", "pet_guinea_pig", "pet_chinchilla", "pet_chameleon", "pet_red_panda", "pet_frog", "pet_hedgehog_v2")

# Sheet 7: Boys
Slice-And-RemoveBackground "$brain/avatar_sheet_1_boys_1770387382565.png" $avatarDir @("avatar_boy_hoodie", "avatar_boy_glasses", "avatar_boy_beanie", "avatar_boy_cap", "avatar_boy_scarf", "avatar_boy_bandaid", "avatar_boy_cat", "avatar_boy_skate", "avatar_boy_dino")

# Sheet 8: Girls
Slice-And-RemoveBackground "$brain/avatar_sheet_2_girls_1770387412534.png" $avatarDir @("avatar_girl_kimono", "avatar_girl_pink", "avatar_girl_bob", "avatar_girl_purple", "avatar_girl_school", "avatar_girl_red", "avatar_girl_cat", "avatar_girl_orange", "avatar_girl_rain")

# Sheet 9: Costume Boys
Slice-And-RemoveBackground "$brain/avatar_sheet_3_boys_costumes_1770387697657.png" $avatarDir @("avatar_boy_police", "avatar_boy_firefighter", "avatar_boy_doctor", "avatar_boy_astronaut", "avatar_boy_chef", "avatar_boy_scientist", "avatar_boy_explorer", "avatar_boy_superhero", "avatar_boy_wizard")

# Sheet 10: Costume Girls
Slice-And-RemoveBackground "$brain/avatar_sheet_4_girls_costumes_1770387727222.png" $avatarDir @("avatar_girl_mermaid", "avatar_girl_princess", "avatar_girl_fairy", "avatar_girl_ballerina", "avatar_girl_witch", "avatar_girl_detective", "avatar_girl_nurse", "avatar_girl_artist", "avatar_girl_athlete")
