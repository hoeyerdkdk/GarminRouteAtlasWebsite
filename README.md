# Garmin Route Atlas – officiel hjemmeside

Dette offentlige repository er destinationsrepository for Garmin Route Atlas' statiske produkthjemmeside. Kildekode, versionsoplysninger og den signerede Android APK bygges og verificeres i det private repository `hoeyerdkdk/GarminRouteAtlasReadOnly`.

## Klar til GitHub Pages

Webfilerne til version 2.0.0 er lagt i repositoryets rod:
- `index.html`, `assets/`, `releases/2.0.html`
- `CNAME` peger på `app.hoeyer.org`.
- `.nojekyll` sikrer at statiske filer kopieres uændret.

**Aktivér Pages**: [Settings → Pages](https://github.com/hoeyerdkdk/GarminRouteAtlasWebsite/settings/pages), vælg `Deploy from a branch`, branch `main` og `/(root)`. Angiv `app.hoeyer.org` under Custom domain og gem. Pages er ikke aktiveret endnu (kontroller status efter opsætning).

## Automatisk udgivelse af APK og website

Fordi appens kildekode og builds er i et **andet, privat** repository, kan standard-`GITHUB_TOKEN` i dette workflow ikke skrive på tværs af repositories.

For at aktivere den allerede implementerede publiceringspipeline:
1. Opret et **fine-grained personal access token** i GitHub med repositoryadgang **kun** til `hoeyerdkdk/GarminRouteAtlasWebsite` og **Contents: Read and write**.
2. Gem tokenet under [GarminRouteAtlasReadOnly → Settings → Secrets and variables → Actions](https://github.com/hoeyerdkdk/GarminRouteAtlasReadOnly/settings/secrets/actions) med det præcise navn `WEBSITE_PUBLISH_TOKEN`. Del ikke tokenet i chats eller filer.
3. Udløs [Publish Garmin Route Atlas website](https://github.com/hoeyerdkdk/GarminRouteAtlasReadOnly/actions/workflows/publish-website.yml) via `Run workflow`.
4. Kontrollér at steppene Download release, Publish APK og Update public website faktisk er gennemført (ikke markeret skipped).
5. Fremtidige vellykkede builds på `main` udløser automatisk publicering af nyt webindhold og signeret APK.

**Vigtigt:** Den indledende version af `assets/config.js` har bevidst ingen APK-downloadadresse. Første vellykkede publicering erstatter den med det verificerede offentlige APK-link og SHA-256. Downloadknapperne er deaktiverede, indtil publicering er gennemført. Det undgår at vise en falsk download.

## Domæne hos one.com

Opret/ret DNS-record for `app.hoeyer.org`:
- Type: `CNAME`
- Host/navn: `app`
- Mål: `hoeyerdkdk.github.io`

Fjern eventuelle modstridende A/AAAA/CNAME for netop `app`-subdomænet, men ændr **ikke** `hoeyer.org` eller andre subdomæner. Gennemfør først DNS-skift, når Pages faktisk fungerer, og offentlig APK er verificeret.

DNS og aktivering af GitHub Pages skal foretages i henholdsvis one.com og GitHubs kontoindstillinger; disse rettigheder findes ikke i den tilknyttede ChatGPT GitHub-app. Kontroller efterfølgende HTTPS og at `https://app.hoeyer.org` viser version 2.0, samt at APK-link og SHA-256 virker.
