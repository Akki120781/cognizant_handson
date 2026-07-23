param(
    [switch]$SkipFrontendInstall,
    [switch]$SkipAngularTests
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot

function Invoke-Step {
    param(
        [string]$Name,
        [scriptblock]$Command
    )

    Write-Host ""
    Write-Host "==> $Name"
    & $Command
}

function Invoke-InDirectory {
    param(
        [string]$Path,
        [scriptblock]$Command
    )

    Push-Location (Join-Path $repoRoot $Path)
    try {
        & $Command
    }
    finally {
        Pop-Location
    }
}

Invoke-Step "Git working tree summary" {
    git status --short
}

Invoke-Step "Maven project tests" {
    $pomFiles = Get-ChildItem -Path $repoRoot -Recurse -Filter pom.xml |
        Where-Object { $_.FullName -notmatch "\\target\\" }

    foreach ($pom in $pomFiles) {
        $projectDir = Split-Path -Parent $pom.FullName
        Write-Host "Testing $projectDir"
        Push-Location $projectDir
        try {
            mvn -q test
        }
        finally {
            Pop-Location
        }
    }
}

$frontendProjects = @(
    "Week_04/react-fundamentals",
    "Week_05/react-advanced",
    "Week_07/angular-hands-on"
)

foreach ($project in $frontendProjects) {
    Invoke-Step "Frontend build: $project" {
        Invoke-InDirectory $project {
            if (-not $SkipFrontendInstall) {
                pnpm install --frozen-lockfile
            }

            pnpm build
        }
    }
}

if (-not $SkipAngularTests) {
    Invoke-Step "Angular unit tests" {
        Invoke-InDirectory "Week_07/angular-hands-on" {
            pnpm test
        }
    }
}

Write-Host ""
Write-Host "Verification completed."
