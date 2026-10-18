# Garmin Route Atlas – officiel hjemmeside

Den offentlige hjemmeside til Android-appen Garmin Route Atlas 2.0.

- Website: https://app.hoeyer.org
- Kildekode til hjemmesiden: Dette repository, `main`.
- Android-kildekode og buildpipeline: det private repository `hoeyerdkdk/GarminRouteAtlasReadOnly`.
- Distribution af APK: [GitHub Releases](https://github.com/hoeyerdkdk/GarminRouteAtlasWebsite/releases/latest).

## Publicering

GitHub Pages er konfigureret til at udgive `main` fra repositoryets rod.
Seneste verificerede Pages-udgivelse med de fem app-skærmbilleder:
[Pages build and deployment – 18. oktober 2026](https://github.com/hoeyerdkdk/GarminRouteAtlasWebsite/actions/runs/39142661672).

- `index.html`, `assets/` og `releases/2.0.html` er de statiske webfiler.
- `CNAME` indeholder `app.hoeyer.org`.
- `.nojekyll` bevarer statiske filnavne uændrede.

## Skærmbilleder

De fem originale JPG-filer fra appen er tilføjet i `assets/screenshots/`:

- `overview-map.jpg`
- `satellite-map.jpg`
- `selected-activity.jpg`
- `activity-filter.jpg`
- `activity-list.jpg`

`index.html` henviser direkte til filerne. Publiceringsworkflowet i appens private repository er konfigureret til at **bevare** `assets/screenshots/` ved `rsync --delete`, så senere app-releases ikke fjerner billederne. Billederne vedligeholdes i dette offentlige repository.

## Automatisk APK- og websiteudgivelse

Ved vellykkede Android-builds opretter det private repository et verificeret release-arkiv.
Workflowet `Publish Garmin Route Atlas website`:

1. Kontrollerer APK'ens SHA-256 og versionsmetadata.
2. Udgiver den signerede APK til offentlige GitHub Releases.
3. Opdaterer webfiler og `assets/config.js` med versionsnummer, hash og offentlig downloadadresse.
4. Bevarer de manuelt tilføjede skærmbilleder samt dette README.

Offentligt APK-link: https://github.com/hoeyerdkdk/GarminRouteAtlasWebsite/releases/latest/download/GarminRouteAtlas.apk

## Kontrol

- [GitHub Pages deployments](https://github.com/hoeyerdkdk/GarminRouteAtlasWebsite/actions)
- [Hjemmesidens billedfiler](https://github.com/hoeyerdkdk/GarminRouteAtlasWebsite/tree/main/assets/screenshots)
- [Android- og publiceringsworkflows](https://github.com/hoeyerdkdk/GarminRouteAtlasReadOnly/actions)

En vellykket Pages-workflowkørsel viser, at GitHub har gennemført udgivelsen.
Kontrollér særskilt DNS, HTTPS og visningen på `https://app.hoeyer.org`, hvis domænet ikke kan åbnes udefra.

Officiel GitHub-dokumentation: [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) og [custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
