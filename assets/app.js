(() => {
  "use strict";

  const config = window.APP_CONFIG || {};
  const version = typeof config.version === "string" ? config.version : "Ikke udgivet";
  const date = typeof config.releaseDate === "string" ? config.releaseDate : "Ikke oplyst";
  const file = typeof config.apkFile === "string" ? config.apkFile : "Ikke oplyst";
  const sha = /^[a-f0-9]{64}$/i.test(config.sha256 || "") ? config.sha256 : "Ikke oplyst";
  const downloadUrl = typeof config.downloadUrl === "string" && /^https:\/\//.test(config.downloadUrl)
    ? config.downloadUrl
    : (typeof config.apkFile === "string" ? "download/" + encodeURIComponent(config.apkFile) : null);

  for (const [selector, value] of [
    ["[data-version]", version],
    ["[data-date]", date],
    ["[data-filename]", file],
    ["[data-sha]", sha]
  ]) {
    document.querySelectorAll(selector).forEach((element) => { element.textContent = value; });
  }

  for (const id of ["hero-download", "main-download"]) {
    const link = document.getElementById(id);
    if (!link) continue;
    if (downloadUrl) {
      link.href = downloadUrl;
      if (downloadUrl.startsWith("https://")) link.removeAttribute("download");
    } else {
      link.removeAttribute("href");
      link.setAttribute("aria-disabled", "true");
      link.title = "Download bliver tilgængelig ved første offentliggørelse";
    }
  }

  // Screenshots are deliberately optional until real app screenshots have been supplied.
  document.querySelectorAll("img.screen-image").forEach((img) => {
    const showFallback = () => {
      if (img.dataset.fallbackShown) return;
      img.dataset.fallbackShown = "true";
      img.hidden = true;
      const fallback = document.createElement("div");
      fallback.className = "screen-placeholder";
      fallback.setAttribute("role", "img");
      fallback.setAttribute("aria-label", img.alt || "Skærmbillede endnu ikke tilgængeligt");
      fallback.textContent = "Skærmbillede kommer snart";
      img.insertAdjacentElement("afterend", fallback);
    };
    img.addEventListener("error", showFallback);
    if (img.complete && img.naturalWidth === 0) showFallback();
  });
})();
