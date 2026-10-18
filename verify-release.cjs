// Fail CI before signing a release if website messaging or version metadata drift.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const gradle=read('app/build.gradle.kts');
const version=/versionName\s*=\s*"([^"]+)"/.exec(gradle)?.[1];
assert.equal(version,'2.0.0','Unexpected Gradle versionName');
const html=read('website/index.html');
const notes=read('website/releases/2.0.html');
const css=read('website/assets/style.css');
const workflow=read('.github/workflows/android.yml');
const releaseNotes=read('docs/RELEASE_NOTES_V2.0.0.md');
for(const str of ['id="training"','VO₂max','id="changelog"','releases/2.0.html','id="download"','id="main-download"'])
  assert.ok(html.includes(str),'Missing landing page element '+str);
for(const str of ['VO₂max','Zoom','nyeste'])
  assert.ok(notes.includes(str),'Missing release page subject '+str);
assert.ok(css.includes('.training-layout'),'Training feature styles missing');
assert.ok(workflow.includes('version: "2.0.0 (build'), 'Generated public version label is stale');
assert.ok(workflow.includes('Publish version 2.0.0 release'),'Stable tagged release step missing');
assert.ok(releaseNotes.includes('Garmin Route Atlas 2.0.0'),'GitHub release notes missing');
for(const file of ['website/assets/app.js','website/assets/favicon.svg','website/releases/2.0.html'])
  assert.ok(fs.statSync(path.join(root,file)).size>0,'Missing website asset '+file);
console.log('Website v2.0.0 assertions passed');
