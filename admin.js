/**
 * StreamPulse TV - Admin Panel Controller & Settings Portal
 * Handles Authentication, Channel CRUD, Tabbed Settings, APK Release Uploads, and Passcode Security.
 */

document.addEventListener("DOMContentLoaded", () => {
  function getAdminPasscode() {
    return localStorage.getItem("streampulse_admin_pass") || "admin123";
  }

  // Elements
  const loginScreen = document.getElementById("admin-login-screen");
  const loginForm = document.getElementById("admin-login-form");
  const passcodeInput = document.getElementById("admin-passcode-input");
  const dashboardUi = document.getElementById("admin-dashboard-ui");
  const logoutBtn = document.getElementById("admin-logout-btn");

  const statTotalChannels = document.getElementById("stat-total-channels");
  const statHlsStreams = document.getElementById("stat-hls-streams");
  const statTotalViewers = document.getElementById("stat-total-viewers");
  const statCategoriesCount = document.getElementById("stat-categories-count");

  const adminSearchInput = document.getElementById("admin-search-input");
  const adminCatFilter = document.getElementById("admin-cat-filter");
  const channelsTbody = document.getElementById("admin-channels-tbody");

  const openAddModalBtn = document.getElementById("open-add-modal-btn");
  const openImportModalBtn = document.getElementById("open-import-modal-btn");
  const exportM3uBtn = document.getElementById("export-m3u-btn");

  const channelModal = document.getElementById("channel-modal");
  const closeChannelModal = document.getElementById("close-channel-modal");
  const adminChannelForm = document.getElementById("admin-channel-form");
  const modalFormTitle = document.getElementById("modal-form-title");
  const editChannelId = document.getElementById("edit-channel-id");

  const importM3uModal = document.getElementById("import-m3u-modal");
  const closeImportModal = document.getElementById("close-import-modal");
  const bulkImportForm = document.getElementById("bulk-import-form");
  const m3uRawInput = document.getElementById("m3u-raw-input");
  const overwriteAllCheck = document.getElementById("overwrite-all-check");

  // State
  let adminChannels = [];

  function initData() {
    try {
      const stored = localStorage.getItem("streampulse_admin_channels");
      if (stored) {
        adminChannels = JSON.parse(stored);
      } else if (typeof CHANNELS_DATA !== "undefined") {
        adminChannels = [...CHANNELS_DATA];
      } else {
        adminChannels = [];
      }
    } catch (e) {
      adminChannels = (typeof CHANNELS_DATA !== "undefined" ? [...CHANNELS_DATA] : []);
    }
  }

  function saveData() {
    localStorage.setItem("streampulse_admin_channels", JSON.stringify(adminChannels));
    localStorage.setItem("custom_streampulse_channels", JSON.stringify(adminChannels));
  }

  /* 1. Tab Navigation Handler */
  const tabBtns = document.querySelectorAll(".admin-tab-btn");
  const tabContents = document.querySelectorAll(".admin-tab-content");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.add("hidden"));

      btn.classList.add("active");
      const targetTabId = btn.dataset.tab;
      const targetContent = document.getElementById(targetTabId);
      if (targetContent) targetContent.classList.remove("hidden");

      if (targetTabId === "tab-apps") loadAppReleasesConfig();
    });
  });

  /* 2. Auth Handlers */
  function checkAuth() {
    const isAuthed = sessionStorage.getItem("streampulse_admin_auth") === "true";
    if (isAuthed) {
      loginScreen.classList.add("hidden");
      dashboardUi.classList.remove("hidden");
      renderDashboard();
    } else {
      loginScreen.classList.remove("hidden");
      dashboardUi.classList.add("hidden");
    }
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const pass = passcodeInput.value.trim();
    if (pass === getAdminPasscode()) {
      sessionStorage.setItem("streampulse_admin_auth", "true");
      showToast("Access Granted! Welcome to Admin Portal.", "success");
      checkAuth();
    } else {
      showToast("Incorrect Passcode! Please try again.", "error");
    }
  });

  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("streampulse_admin_auth");
    showToast("Logged out successfully.", "info");
    checkAuth();
  });

  /* 3. Render Admin Dashboard */
  function renderDashboard() {
    initData();
    renderStats();
    renderTable();
    loadAppReleasesConfig();
    loadFeatureTogglesConfig();
  }

  function renderStats() {
    if (statTotalChannels) statTotalChannels.textContent = adminChannels.length;
    const hlsCount = adminChannels.filter(c => c.url && c.url.includes(".m3u8")).length;
    if (statHlsStreams) statHlsStreams.textContent = hlsCount;
    
    const categoriesSet = new Set(adminChannels.map(c => c.category));
    if (statCategoriesCount) statCategoriesCount.textContent = categoriesSet.size;

    let totalViewersNum = 0;
    adminChannels.forEach(c => {
      const v = parseFloat(c.viewers) || 30;
      totalViewersNum += v;
    });
    if (statTotalViewers) statTotalViewers.textContent = totalViewersNum.toFixed(1) + "K";
  }

  function renderTable() {
    if (!channelsTbody) return;
    channelsTbody.innerHTML = "";
    const search = adminSearchInput ? adminSearchInput.value.trim().toLowerCase() : "";
    const cat = adminCatFilter ? adminCatFilter.value : "all";

    const filtered = adminChannels.filter(ch => {
      const matchesCat = cat === "all" || ch.category === cat;
      const matchesSearch = search === "" ||
        (ch.name && ch.name.toLowerCase().includes(search)) ||
        (ch.url && ch.url.toLowerCase().includes(search));
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      channelsTbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 40px; color: var(--text-muted);">
            No matching channels found in database.
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(ch => {
      const tr = document.createElement("tr");
      const safeLogo = ch.logo || `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><rect width="100%" height="100%" fill="%231e2942"/><text x="50%" y="55%" fill="%23fff" text-anchor="middle">TV</text></svg>`;

      const isHidden = !!ch.hidden;
      const statusBadge = isHidden 
        ? `<span class="badge" style="background: #64748b; color: #fff;">HIDDEN</span>` 
        : `<span class="badge">${ch.badge || 'LIVE HD'}</span>`;

      tr.innerHTML = `
        <td><img src="${safeLogo}" alt="${ch.name}" class="admin-table-logo" onerror="this.src='https://via.placeholder.com/40';"></td>
        <td>
          <strong style="color: #fff; font-size: 0.95rem;">${ch.name}</strong>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${ch.currentProgram || ch.name}</div>
        </td>
        <td><span class="cat-tag-pill">${ch.category || 'entertainment'}</span></td>
        <td>${statusBadge}</td>
        <td style="max-width: 230px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.8rem; color: var(--text-dim);">${ch.url}</td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="btn-action toggle-visibility ${isHidden ? 'is-hidden' : ''}" data-id="${ch.id}" title="${isHidden ? 'Show on Public Site' : 'Hide from Public Site'}">
              <i class="fa-solid fa-${isHidden ? 'eye-slash' : 'eye'}"></i>
            </button>
            <button class="btn-action edit" data-id="${ch.id}" title="Edit Channel"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-action delete" data-id="${ch.id}" title="Delete Channel"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      `;

      tr.querySelector(".btn-action.toggle-visibility").addEventListener("click", () => toggleChannelVisibility(ch.id, ch.name));
      tr.querySelector(".btn-action.edit").addEventListener("click", () => openEditModal(ch));
      tr.querySelector(".btn-action.delete").addEventListener("click", () => deleteChannel(ch.id, ch.name));

      channelsTbody.appendChild(tr);
    });
  }

  function toggleChannelVisibility(id, name) {
    const idx = adminChannels.findIndex(c => c.id === id);
    if (idx !== -1) {
      adminChannels[idx].hidden = !adminChannels[idx].hidden;
      const isNowHidden = adminChannels[idx].hidden;
      saveData();
      showToast(isNowHidden ? `"${name}" is now HIDDEN from public website.` : `"${name}" is now VISIBLE on website.`, isNowHidden ? "warning" : "success");
      renderDashboard();
    }
  }

  /* 4. CRUD Handlers */
  if (openAddModalBtn && channelModal) {
    openAddModalBtn.addEventListener("click", () => {
      editChannelId.value = "";
      modalFormTitle.innerHTML = `<i class="fa-solid fa-square-plus"></i> Add New Channel`;
      adminChannelForm.reset();
      channelModal.classList.remove("hidden");
    });
  }

  if (closeChannelModal && channelModal) {
    closeChannelModal.addEventListener("click", () => channelModal.classList.add("hidden"));
  }

  function openEditModal(ch) {
    editChannelId.value = ch.id;
    modalFormTitle.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Channel: ${ch.name}`;
    document.getElementById("admin-ch-name").value = ch.name;
    document.getElementById("admin-ch-logo").value = ch.logo;
    document.getElementById("admin-ch-url").value = ch.url;
    document.getElementById("admin-ch-cat").value = ch.category || "entertainment";
    document.getElementById("admin-ch-badge").value = ch.badge || "LIVE HD";
    channelModal.classList.remove("hidden");
  }

  if (adminChannelForm) {
    adminChannelForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = editChannelId.value;
      const name = document.getElementById("admin-ch-name").value.trim();
      const logo = document.getElementById("admin-ch-logo").value.trim();
      const url = document.getElementById("admin-ch-url").value.trim();
      const category = document.getElementById("admin-ch-cat").value;
      const badge = document.getElementById("admin-ch-badge").value.trim() || "LIVE HD";

      const isHls = url.toLowerCase().includes(".m3u8");

      if (id) {
        const idx = adminChannels.findIndex(c => c.id === id);
        if (idx !== -1) {
          adminChannels[idx] = {
            ...adminChannels[idx],
            name, logo, url, category, badge, type: isHls ? "hls" : "mp4"
          };
          showToast(`Channel "${name}" updated successfully!`, "success");
        }
      } else {
        const newCh = {
          id: "ch-admin-" + Date.now(),
          name, logo, url, category, badge,
          viewers: (Math.floor(Math.random() * 50) + 10).toFixed(1) + "K",
          type: isHls ? "hls" : "mp4",
          fallbackUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          currentProgram: `${name} - Live 24/7`,
          nextProgram: "Upcoming Broadcast",
          description: `${name} live stream.`,
          epg: [{ time: "12:00 PM", title: `${name} Live Stream`, duration: "120 min", status: "active" }]
        };
        adminChannels.unshift(newCh);
        showToast(`New channel "${name}" added!`, "success");
      }

      saveData();
      channelModal.classList.add("hidden");
      renderDashboard();
    });
  }

  function deleteChannel(id, name) {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      adminChannels = adminChannels.filter(c => c.id !== id);
      saveData();
      showToast(`Channel "${name}" removed.`, "info");
      renderDashboard();
    }
  }

  /* 5. M3U Import / Export */
  if (openImportModalBtn && importM3uModal) openImportModalBtn.addEventListener("click", () => importM3uModal.classList.remove("hidden"));
  if (closeImportModal && importM3uModal) closeImportModal.addEventListener("click", () => importM3uModal.classList.add("hidden"));

  if (bulkImportForm) {
    bulkImportForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const rawText = m3uRawInput.value.trim();
      if (!rawText) return;

      const parsed = parseM3uRaw(rawText);
      if (parsed.length === 0) {
        showToast("No valid channels found in pasted M3U text!", "error");
        return;
      }

      if (overwriteAllCheck && overwriteAllCheck.checked) {
        adminChannels = parsed;
      } else {
        adminChannels = [...parsed, ...adminChannels];
      }

      saveData();
      bulkImportForm.reset();
      importM3uModal.classList.add("hidden");
      showToast(`Successfully imported ${parsed.length} channels from M3U!`, "success");
      renderDashboard();
    });
  }

  function parseM3uRaw(text) {
    const lines = text.split("\n");
    const channels = [];
    let currentCh = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("#EXTINF:")) {
        let logo = "";
        const logoMatch = line.match(/tvg-logo="([^"]+)"/);
        if (logoMatch && logoMatch[1]) logo = logoMatch[1];

        let group = "entertainment";
        const groupMatch = line.match(/group-title="([^"]+)"/);
        if (groupMatch && groupMatch[1]) group = groupMatch[1];

        const commaIdx = line.lastIndexOf(",");
        let name = "Live Channel";
        if (commaIdx !== -1) name = line.substring(commaIdx + 1).trim();

        currentCh = { name, logo, group };
      } else if (line.startsWith("http://") || line.startsWith("https://")) {
        if (currentCh) {
          const url = line.trim();
          const isHls = url.includes(".m3u8");
          channels.push({
            id: "ch-imp-" + (channels.length + 1) + "-" + Date.now(),
            name: currentCh.name,
            category: "entertainment",
            logo: currentCh.logo || "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300&auto=format&fit=crop&q=80",
            badge: isHls ? "LIVE HD" : "HD",
            viewers: (Math.floor(Math.random() * 50) + 10).toFixed(1) + "K",
            type: isHls ? "hls" : "mp4",
            url: url,
            fallbackUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            currentProgram: `${currentCh.name} Live`,
            nextProgram: "Upcoming Program",
            description: `${currentCh.name} live streaming.`,
            epg: [{ time: "12:00 PM", title: `${currentCh.name} Live`, duration: "120 min", status: "active" }]
          });
          currentCh = null;
        }
      }
    }
    return channels;
  }

  if (exportM3uBtn) {
    exportM3uBtn.addEventListener("click", () => {
      let m3uContent = "#EXTM3U\n\n";
      adminChannels.forEach(ch => {
        m3uContent += `#EXTINF:-1 group-title="${ch.category}" tvg-logo="${ch.logo}",${ch.name}\n${ch.url}\n\n`;
      });

      const blob = new Blob([m3uContent], { type: "audio/x-mpegurl" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "streampulse_playlist.m3u";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast("Exported playlist to streampulse_playlist.m3u! 🚀", "success");
    });
  }

  /* 6. App Release Upload & File Feedback */
  const adminMobileFile = document.getElementById("admin-mobile-file");
  const mobileFileName = document.getElementById("mobile-file-name");
  const adminTvFile = document.getElementById("admin-tv-file");
  const tvFileName = document.getElementById("tv-file-name");
  const adminAppReleaseForm = document.getElementById("admin-app-release-form");

  if (adminMobileFile && mobileFileName) {
    adminMobileFile.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        mobileFileName.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> ${e.target.files[0].name} (${(e.target.files[0].size / (1024*1024)).toFixed(1)} MB)`;
      }
    });
  }

  if (adminTvFile && tvFileName) {
    adminTvFile.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        tvFileName.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> ${e.target.files[0].name} (${(e.target.files[0].size / (1024*1024)).toFixed(1)} MB)`;
      }
    });
  }

  function loadAppReleasesConfig() {
    try {
      const saved = localStorage.getItem("streampulse_app_releases");
      if (saved) {
        const config = JSON.parse(saved);
        if (document.getElementById("admin-mobile-ver") && config.mobileVer) document.getElementById("admin-mobile-ver").value = config.mobileVer;
        if (document.getElementById("admin-mobile-size") && config.mobileSize) document.getElementById("admin-mobile-size").value = config.mobileSize;

        const mobileUrlInput = document.getElementById("admin-mobile-url");
        if (mobileUrlInput && config.mobileUrl) {
          if (config.mobileUrl.startsWith("http://") || config.mobileUrl.startsWith("https://")) {
            mobileUrlInput.value = config.mobileUrl;
          } else if (config.mobileUrl.startsWith("data:")) {
            mobileUrlInput.value = "";
            const mobileFileName = document.getElementById("mobile-file-name");
            if (mobileFileName) mobileFileName.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Uploaded Mobile APK File Active (${config.mobileSize || "Saved"})`;
          }
        }

        if (document.getElementById("admin-tv-ver") && config.tvVer) document.getElementById("admin-tv-ver").value = config.tvVer;
        if (document.getElementById("admin-tv-size") && config.tvSize) document.getElementById("admin-tv-size").value = config.tvSize;

        const tvUrlInput = document.getElementById("admin-tv-url");
        if (tvUrlInput && config.tvUrl) {
          if (config.tvUrl.startsWith("http://") || config.tvUrl.startsWith("https://")) {
            tvUrlInput.value = config.tvUrl;
          } else if (config.tvUrl.startsWith("data:")) {
            tvUrlInput.value = "";
            const tvFileName = document.getElementById("tv-file-name");
            if (tvFileName) tvFileName.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Uploaded TV APK File Active (${config.tvSize || "Saved"})`;
          }
        }

        if (document.getElementById("admin-pwa-title") && config.pwaTitle) document.getElementById("admin-pwa-title").value = config.pwaTitle;
        if (document.getElementById("admin-pwa-short") && config.pwaShort) document.getElementById("admin-pwa-short").value = config.pwaShort;
      }
    } catch (e) {
      console.warn("loadAppReleasesConfig error:", e);
    }
  }

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  if (adminAppReleaseForm) {
    adminAppReleaseForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      let mobileUrl = document.getElementById("admin-mobile-url").value.trim();
      let mobileSize = document.getElementById("admin-mobile-size").value.trim() || "18.5 MB";
      
      if (adminMobileFile && adminMobileFile.files.length > 0) {
        const file = adminMobileFile.files[0];
        mobileSize = (file.size / (1024 * 1024)).toFixed(1) + " MB";
        showToast("Encoding uploaded Mobile APK file...", "info");
        try {
          mobileUrl = await readFileAsDataURL(file);
        } catch (err) {
          console.error("FileReader error:", err);
        }
      }

      let tvUrl = document.getElementById("admin-tv-url").value.trim();
      let tvSize = document.getElementById("admin-tv-size").value.trim() || "21.2 MB";

      if (adminTvFile && adminTvFile.files.length > 0) {
        const file = adminTvFile.files[0];
        tvSize = (file.size / (1024 * 1024)).toFixed(1) + " MB";
        showToast("Encoding uploaded TV APK file...", "info");
        try {
          tvUrl = await readFileAsDataURL(file);
        } catch (err) {
          console.error("FileReader error:", err);
        }
      }

      const releaseData = {
        mobileVer: document.getElementById("admin-mobile-ver").value.trim() || "v2.4.0",
        mobileSize: mobileSize,
        mobileUrl: mobileUrl,
        tvVer: document.getElementById("admin-tv-ver").value.trim() || "v2.4.0 TV",
        tvSize: tvSize,
        tvUrl: tvUrl,
        pwaTitle: document.getElementById("admin-pwa-title").value.trim() || "StreamPulse TV",
        pwaShort: document.getElementById("admin-pwa-short").value.trim() || "StreamPulse"
      };

      try {
        localStorage.setItem("streampulse_app_releases", JSON.stringify(releaseData));
        showToast("App Releases & APK Download links published! 🎉", "success");
      } catch (err) {
        showToast("File size is too large for LocalStorage. Please enter direct APK download link URL instead.", "warning");
      }
    });
  }

  /* 7. Public Feature Toggles */
  const featureTogglesForm = document.getElementById("feature-toggles-form");
  const toggleDownloadApp = document.getElementById("toggle-download-app");
  const toggleAddChannel = document.getElementById("toggle-add-channel");

  function loadFeatureTogglesConfig() {
    try {
      const saved = localStorage.getItem("streampulse_feature_toggles");
      if (saved) {
        const config = JSON.parse(saved);
        if (toggleDownloadApp) toggleDownloadApp.checked = config.enableAppDownload !== false;
        if (toggleAddChannel) toggleAddChannel.checked = config.enableAddChannel !== false;
      }
    } catch (e) {}
  }

  if (featureTogglesForm) {
    featureTogglesForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const config = {
        enableAppDownload: toggleDownloadApp ? toggleDownloadApp.checked : true,
        enableAddChannel: toggleAddChannel ? toggleAddChannel.checked : true
      };
      localStorage.setItem("streampulse_feature_toggles", JSON.stringify(config));
      showToast("Public Website Feature Toggles saved! 🎉", "success");
    });
  }

  /* 8. Passcode Security Form */
  const changePasscodeForm = document.getElementById("change-passcode-form");
  if (changePasscodeForm) {
    changePasscodeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const currentPass = document.getElementById("current-pass-input").value.trim();
      const newPass = document.getElementById("new-pass-input").value.trim();

      if (currentPass !== getAdminPasscode()) {
        showToast("Current passcode is incorrect!", "error");
        return;
      }

      if (newPass.length < 4) {
        showToast("New passcode must be at least 4 characters long.", "warning");
        return;
      }

      localStorage.setItem("streampulse_admin_pass", newPass);
      changePasscodeForm.reset();
      showToast("Admin Passcode updated successfully! 🔒", "success");
    });
  }

  if (adminSearchInput) adminSearchInput.addEventListener("input", renderTable);
  if (adminCatFilter) adminCatFilter.addEventListener("change", renderTable);

  function showToast(message, type = "info") {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${message}`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  checkAuth();
});
