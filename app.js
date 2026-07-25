/**
 * StreamPulse TV - Core Application Logic
 * Integrates HLS.js video streaming, state management, live chat simulation, search, and EPG schedules.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Load custom channels from LocalStorage and merge into CHANNELS_DATA
  try {
    const storedCustomChannels = JSON.parse(localStorage.getItem("custom_streampulse_channels") || "[]");
    storedCustomChannels.forEach(customCh => {
      const idx = CHANNELS_DATA.findIndex(c => c.id === customCh.id);
      if (idx !== -1) {
        CHANNELS_DATA[idx] = customCh;
      } else {
        CHANNELS_DATA.unshift(customCh);
      }
    });
  } catch (e) {
    console.warn("LocalStorage custom channels error:", e);
  }

  // State variables
  let activeChannel = CHANNELS_DATA[0] || null;
  let favorites = [];
  try {
    favorites = JSON.parse(localStorage.getItem("streampulse_favs") || "[]");
  } catch (e) {
    favorites = [];
  }

  let currentCategory = "all";
  let searchQuery = "";
  let onlyFavorites = false;
  let hlsInstance = null;

  // DOM Elements
  const videoPlayer = document.getElementById("live-player");
  const playerContainer = document.getElementById("player-container");
  const playerLoader = document.getElementById("player-loader");
  const playerBadge = document.getElementById("player-badge");

  const currentChName = document.getElementById("current-ch-name");
  const currentChLogo = document.getElementById("current-ch-logo");
  const currentChViewers = document.getElementById("current-ch-viewers");
  const currentChShow = document.getElementById("current-ch-show");

  const btnFav = document.getElementById("btn-favorite");
  const btnPip = document.getElementById("btn-pip");
  const btnTheater = document.getElementById("btn-theater");
  const btnShare = document.getElementById("btn-share");

  const channelsGrid = document.getElementById("channels-grid");
  const categoryContainer = document.getElementById("category-container");
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search");
  const favFilterBtn = document.getElementById("fav-toggle-filter");
  const favCountBadge = document.getElementById("fav-count-badge");
  const channelCountDisplay = document.getElementById("channel-count-display");

  const epgTimeline = document.getElementById("epg-timeline");
  const guideToggleBtn = document.getElementById("guide-toggle-btn");
  const epgModal = document.getElementById("epg-modal");
  const closeEpgModal = document.getElementById("close-epg-modal");
  const fullEpgContent = document.getElementById("full-epg-content");

  // Add Channel Modal Elements
  const addChannelBtn = document.getElementById("add-channel-btn");
  const addChannelModal = document.getElementById("add-channel-modal");
  const closeAddModal = document.getElementById("close-add-modal");
  const addChannelForm = document.getElementById("add-channel-form");

  const chatContainer = document.getElementById("chat-messages-container");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const layoutContainer = document.querySelector(".layout-container");
  const totalLiveUsersElem = document.getElementById("total-live-users");

  // Simulated Chat User Pool
  const BOT_USERS = [
    { name: "Sajid_Stream", avatar: "🎬", text: "Quality test 100% fine!", badge: "" },
    { name: "Nusrat_Vlog", avatar: "🌺", text: "Eta Amar favorite channel!", badge: "VIP" },
    { name: "Fahim_Cyber", avatar: "💻", text: "Buffering completely zero, amazing UI!", badge: "" },
    { name: "Kabir_Cricket", avatar: "🏏", text: "Next program schedule kokhon start hobe?", badge: "" },
    { name: "Riya_Dhaka", avatar: "✨", text: "Sound quality and bitrate heavy solid 👌", badge: "VIP" }
  ];

  function getFallbackSvg(name) {
    const initials = name ? name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase() : "TV";
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><rect width="100%" height="100%" fill="%231e2942"/><text x="50%" y="55%" font-family="sans-serif" font-weight="bold" font-size="42" fill="%23ef4444" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;
  }

  /* ==========================================================================
     1. Video Player Functions
     ========================================================================== */
  function loadStream(channel) {
    if (!channel) return;
    activeChannel = channel;
    showLoader(true);

    // Update Channel UI Details
    if (currentChName) currentChName.textContent = channel.name;
    if (currentChLogo) {
      currentChLogo.src = channel.logo || getFallbackSvg(channel.name);
      currentChLogo.onerror = () => {
        currentChLogo.src = getFallbackSvg(channel.name);
      };
    }
    if (currentChViewers) currentChViewers.innerHTML = `<i class="fa-solid fa-eye"></i> ${channel.viewers || "45.2K"} Viewers`;
    if (currentChShow) currentChShow.innerHTML = `<i class="fa-solid fa-play"></i> Playing: ${channel.currentProgram || channel.name}`;
    if (playerBadge) playerBadge.textContent = channel.badge || "LIVE HD";

    updateFavButtonState();
    renderEPGTimeline(channel);
    highlightActiveCardInGrid(channel.id);

    // Clean previous HLS instance
    if (hlsInstance) {
      hlsInstance.destroy();
      hlsInstance = null;
    }

    const streamUrl = channel.url;

    if (!videoPlayer) return;

    // Check if stream is HLS (.m3u8)
    if (streamUrl && streamUrl.includes(".m3u8")) {
      if (typeof Hls !== "undefined" && Hls.isSupported()) {
        hlsInstance = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90
        });

        hlsInstance.loadSource(streamUrl);
        hlsInstance.attachMedia(videoPlayer);

        hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
          showLoader(false);
          videoPlayer.play().catch(() => {});
        });

        hlsInstance.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.warn("HLS stream failed, falling back to MP4 alternative source");
            fallbackToMp4(channel);
          }
        });
      } else if (videoPlayer.canPlayType("application/vnd.apple.mpegurl")) {
        // Native Apple Safari HLS support
        videoPlayer.src = streamUrl;
        videoPlayer.addEventListener("loadedmetadata", () => {
          showLoader(false);
          videoPlayer.play().catch(() => {});
        });
      } else {
        fallbackToMp4(channel);
      }
    } else {
      // Standard Direct MP4 / Video Stream
      videoPlayer.src = streamUrl || channel.fallbackUrl;
      videoPlayer.load();
      videoPlayer.oncanplay = () => {
        showLoader(false);
        videoPlayer.play().catch(() => {});
      };
      videoPlayer.onerror = () => {
        fallbackToMp4(channel);
      };
    }
  }

  function fallbackToMp4(channel) {
    if (!videoPlayer) return;
    const fallback = channel.fallbackUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    videoPlayer.src = fallback;
    videoPlayer.load();
    videoPlayer.play().catch(() => {});
    showLoader(false);
  }

  function showLoader(visible) {
    if (!playerLoader) return;
    if (visible) {
      playerLoader.classList.remove("hidden");
    } else {
      playerLoader.classList.add("hidden");
    }
  }

  /* ==========================================================================
     2. Channel Grid & Filter Logic
     ========================================================================== */
  function renderChannelsGrid() {
    if (!channelsGrid) return;
    channelsGrid.innerHTML = "";

    const filtered = CHANNELS_DATA.filter(ch => {
      const matchesCategory = currentCategory === "all" || ch.category === currentCategory;
      const matchesSearch = searchQuery === "" || 
        (ch.name && ch.name.toLowerCase().includes(searchQuery)) ||
        (ch.currentProgram && ch.currentProgram.toLowerCase().includes(searchQuery)) ||
        (ch.description && ch.description.toLowerCase().includes(searchQuery));
      const matchesFav = !onlyFavorites || favorites.includes(ch.id);

      return matchesCategory && matchesSearch && matchesFav;
    });

    if (channelCountDisplay) channelCountDisplay.textContent = `Showing ${filtered.length} of ${CHANNELS_DATA.length} Channels`;

    if (filtered.length === 0) {
      channelsGrid.innerHTML = `
        <div class="no-results">
          <i class="fa-solid fa-tv"></i>
          <h3>No Live Channels Found</h3>
          <p>Try searching for a different channel name or select another category filter.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(ch => {
      const isFav = favorites.includes(ch.id);
      const isActive = activeChannel && activeChannel.id === ch.id;

      const card = document.createElement("div");
      card.className = `channel-card ${isActive ? "active-playing" : ""}`;
      card.dataset.id = ch.id;

      const safeLogo = ch.logo || getFallbackSvg(ch.name);

      card.innerHTML = `
        <div class="card-thumb-wrapper">
          <img src="${safeLogo}" alt="${ch.name}" class="card-thumb" loading="lazy" onerror="this.onerror=null; this.src=getFallbackSvg('${(ch.name||'').replace(/'/g, "\\'")}');">
          <div class="card-play-overlay">
            <div class="play-icon-circle">
              <i class="fa-solid fa-${isActive ? "pause" : "play"}"></i>
            </div>
          </div>
          <span class="card-badge">${ch.badge || 'LIVE HD'}</span>
          <button class="card-fav-btn ${isFav ? "is-fav" : ""}" title="Favorite Channel" data-fav-id="${ch.id}">
            <i class="fa-${isFav ? "solid" : "regular"} fa-heart"></i>
          </button>
        </div>
        <div class="card-body">
          <span class="card-cat-tag">${ch.category || 'entertainment'}</span>
          <h3 class="card-name">${ch.name}</h3>
          <p class="card-show" title="${ch.currentProgram || ch.name}"><i class="fa-solid fa-compact-disc"></i> ${ch.currentProgram || ch.name}</p>
          <div class="card-footer">
            <span class="card-viewers"><i class="fa-solid fa-eye"></i> ${ch.viewers || '45K'}</span>
            <span><i class="fa-solid fa-tower-cell"></i> 24/7 Live</span>
          </div>
        </div>
      `;

      card.addEventListener("click", (e) => {
        if (e.target.closest(".card-fav-btn")) return;
        loadStream(ch);
      });

      const cardFavBtn = card.querySelector(".card-fav-btn");
      if (cardFavBtn) {
        cardFavBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          toggleFavorite(ch.id);
        });
      }

      channelsGrid.appendChild(card);
    });
  }

  function highlightActiveCardInGrid(chId) {
    document.querySelectorAll(".channel-card").forEach(card => {
      if (card.dataset.id === chId) {
        card.classList.add("active-playing");
      } else {
        card.classList.remove("active-playing");
      }
    });
  }

  /* ==========================================================================
     3. Favorites Management
     ========================================================================== */
  function toggleFavorite(chId) {
    if (favorites.includes(chId)) {
      favorites = favorites.filter(id => id !== chId);
      showToast("Removed from your favorite channels list", "info");
    } else {
      favorites.push(chId);
      showToast("Added to your favorite channels list ❤️", "success");
    }
    localStorage.setItem("streampulse_favs", JSON.stringify(favorites));
    updateFavBadgeCount();
    updateFavButtonState();
    renderChannelsGrid();
  }

  function updateFavBadgeCount() {
    if (favCountBadge) favCountBadge.textContent = favorites.length;
  }

  function updateFavButtonState() {
    if (!activeChannel || !btnFav) return;
    const isFav = favorites.includes(activeChannel.id);
    if (isFav) {
      btnFav.classList.add("is-fav");
      btnFav.innerHTML = `<i class="fa-solid fa-heart"></i> Favorited`;
    } else {
      btnFav.classList.remove("is-fav");
      btnFav.innerHTML = `<i class="fa-regular fa-heart"></i> Favorite`;
    }
  }

  if (btnFav) {
    btnFav.addEventListener("click", () => {
      if (activeChannel) toggleFavorite(activeChannel.id);
    });
  }

  if (favFilterBtn) {
    favFilterBtn.addEventListener("click", () => {
      onlyFavorites = !onlyFavorites;
      favFilterBtn.classList.toggle("active-fav", onlyFavorites);
      renderChannelsGrid();
    });
  }

  /* ==========================================================================
     4. EPG (Electronic Program Guide) Renderers
     ========================================================================== */
  function renderEPGTimeline(channel) {
    if (!epgTimeline) return;
    epgTimeline.innerHTML = "";
    if (!channel || !channel.epg || channel.epg.length === 0) {
      epgTimeline.innerHTML = `<p style="color: var(--text-dim);">No schedule available for this channel.</p>`;
      return;
    }

    channel.epg.forEach(item => {
      const epgRow = document.createElement("div");
      epgRow.className = `epg-item ${item.status === "active" ? "active" : ""}`;
      epgRow.innerHTML = `
        <div class="epg-time">${item.time}</div>
        <div class="epg-info">
          <div class="epg-title">${item.title}</div>
          <div class="epg-duration"><i class="fa-regular fa-clock"></i> Duration: ${item.duration}</div>
        </div>
        <span class="epg-tag ${item.status}">${item.status === "active" ? "NOW ON AIR" : item.status}</span>
      `;
      epgTimeline.appendChild(epgRow);
    });
  }

  function renderFullEPGModal() {
    if (!fullEpgContent || !epgModal) return;
    fullEpgContent.innerHTML = "";

    CHANNELS_DATA.forEach(ch => {
      const section = document.createElement("div");
      section.style.marginBottom = "24px";
      section.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <img src="${ch.logo || getFallbackSvg(ch.name)}" style="width: 36px; height: 36px; border-radius: 8px; object-fit: cover;">
          <h3 style="font-family: var(--font-heading); font-size: 1.1rem;">${ch.name}</h3>
        </div>
        <div class="epg-timeline">
          ${(ch.epg || []).map(item => `
            <div class="epg-item ${item.status === "active" ? "active" : ""}">
              <div class="epg-time">${item.time}</div>
              <div class="epg-info">
                <div class="epg-title">${item.title}</div>
                <div class="epg-duration">Duration: ${item.duration}</div>
              </div>
              <span class="epg-tag ${item.status}">${item.status === "active" ? "NOW ON AIR" : item.status}</span>
            </div>
          `).join("")}
        </div>
      `;
      fullEpgContent.appendChild(section);
    });

    epgModal.classList.remove("hidden");
  }

  if (guideToggleBtn && epgModal) {
    guideToggleBtn.addEventListener("click", renderFullEPGModal);
    if (closeEpgModal) closeEpgModal.addEventListener("click", () => epgModal.classList.add("hidden"));
    epgModal.addEventListener("click", (e) => {
      if (e.target === epgModal) epgModal.classList.add("hidden");
    });
  }

  /* Add Channel Modal Handlers */
  if (addChannelBtn && addChannelModal) {
    addChannelBtn.addEventListener("click", () => addChannelModal.classList.remove("hidden"));
    if (closeAddModal) closeAddModal.addEventListener("click", () => addChannelModal.classList.add("hidden"));
    addChannelModal.addEventListener("click", (e) => {
      if (e.target === addChannelModal) addChannelModal.classList.add("hidden");
    });

    if (addChannelForm) {
      addChannelForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("new-ch-name").value.trim();
        const logo = document.getElementById("new-ch-logo").value.trim();
        const url = document.getElementById("new-ch-url").value.trim();
        const category = document.getElementById("new-ch-cat").value;
        const badge = document.getElementById("new-ch-badge").value.trim() || "LIVE HD";
        const program = document.getElementById("new-ch-program").value.trim() || "Live Broadcast & Special Features";

        const newChId = "ch-custom-" + Date.now();
        const isHls = url.toLowerCase().includes(".m3u8");

        const newChannel = {
          id: newChId,
          name: name,
          category: category,
          logo: logo,
          badge: badge,
          viewers: (Math.floor(Math.random() * 50) + 10).toFixed(1) + "K",
          type: isHls ? "hls" : "mp4",
          url: url,
          fallbackUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          currentProgram: program,
          nextProgram: "Upcoming Special Broadcast",
          description: `${name} live streaming 24/7.`,
          epg: [
            { time: "12:00 PM", title: program, duration: "120 min", status: "active" },
            { time: "02:00 PM", title: "Upcoming Special Broadcast", duration: "90 min", status: "upcoming" }
          ]
        };

        CHANNELS_DATA.unshift(newChannel);

        try {
          const currentStored = JSON.parse(localStorage.getItem("custom_streampulse_channels") || "[]");
          currentStored.unshift(newChannel);
          localStorage.setItem("custom_streampulse_channels", JSON.stringify(currentStored));
        } catch (e) {}

        addChannelForm.reset();
        addChannelModal.classList.add("hidden");

        renderChannelsGrid();
        loadStream(newChannel);
        showToast(`Channel "${name}" with custom logo added successfully! 🎉`, "success");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  /* ==========================================================================
     5. Live Interactive Chat Simulation
     ========================================================================== */
  function renderInitialChat() {
    if (!chatContainer) return;
    chatContainer.innerHTML = "";
    INITIAL_CHAT_MESSAGES.forEach(msg => appendChatMessage(msg));
    scrollChatToBottom();
  }

  function appendChatMessage(msg) {
    if (!chatContainer) return;
    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-msg";
    msgDiv.innerHTML = `
      <span class="chat-avatar">${msg.avatar}</span>
      <div class="chat-body">
        <div class="msg-header">
          <div>
            <span class="msg-user">${msg.user}</span>
            ${msg.badge ? `<span class="msg-badge">${msg.badge}</span>` : ""}
          </div>
          <span class="msg-time">${msg.time}</span>
        </div>
        <div class="msg-text">${msg.text}</div>
      </div>
    `;
    chatContainer.appendChild(msgDiv);
    scrollChatToBottom();
  }

  function scrollChatToBottom() {
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      const userMsg = {
        user: "You (Viewer)",
        avatar: "👤",
        text: text,
        time: "Just now",
        badge: "YOU"
      };

      appendChatMessage(userMsg);
      chatInput.value = "";

      setTimeout(() => {
        const bot = BOT_USERS[Math.floor(Math.random() * BOT_USERS.length)];
        appendChatMessage({
          user: bot.name,
          avatar: bot.avatar,
          text: `Hey @You, ${bot.text}`,
          time: "Just now",
          badge: bot.badge
        });
      }, 2500);
    });
  }

  document.querySelectorAll(".emoji-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (chatInput) {
        const emoji = btn.dataset.emoji;
        chatInput.value += ` ${emoji} `;
        chatInput.focus();
      }
    });
  });

  setInterval(() => {
    if (!chatContainer) return;
    const randomBot = BOT_USERS[Math.floor(Math.random() * BOT_USERS.length)];
    appendChatMessage({
      user: randomBot.name,
      avatar: randomBot.avatar,
      text: randomBot.text,
      time: "Just now",
      badge: randomBot.badge
    });
  }, 10000);

  /* ==========================================================================
     6. PiP & Theater Controls & Keyboard Shortcuts
     ========================================================================== */
  if (btnPip && videoPlayer) {
    btnPip.addEventListener("click", async () => {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
          await videoPlayer.requestPictureInPicture();
        }
      } catch (err) {
        showToast("Picture in Picture not supported on this browser.", "warning");
      }
    });
  }

  if (btnTheater && layoutContainer) {
    btnTheater.addEventListener("click", () => {
      layoutContainer.classList.toggle("theater-mode");
      const isTheater = layoutContainer.classList.contains("theater-mode");
      btnTheater.innerHTML = `<i class="fa-solid fa-${isTheater ? "compress" : "expand"}"></i> ${isTheater ? "Exit Theater" : "Theater"}`;
    });
  }

  if (btnShare) {
    btnShare.addEventListener("click", () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast("Stream link copied to clipboard! Share with friends 🚀", "success");
      }
    });
  }

  // Keyboard Shortcuts
  document.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

    if (e.code === "Space" && videoPlayer) {
      e.preventDefault();
      if (videoPlayer.paused) videoPlayer.play(); else videoPlayer.pause();
    } else if (e.code === "KeyF" && videoPlayer) {
      e.preventDefault();
      if (videoPlayer.requestFullscreen) videoPlayer.requestFullscreen();
    } else if (e.code === "KeyM" && videoPlayer) {
      e.preventDefault();
      videoPlayer.muted = !videoPlayer.muted;
      showToast(videoPlayer.muted ? "Muted Audio" : "Unmuted Audio", "info");
    }
  });

  /* ==========================================================================
     7. Search & Filter Handlers
     ========================================================================== */
  if (categoryContainer) {
    categoryContainer.addEventListener("click", (e) => {
      const chip = e.target.closest(".cat-chip");
      if (!chip) return;

      document.querySelectorAll(".cat-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      currentCategory = chip.dataset.category;
      renderChannelsGrid();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) clearSearchBtn.classList.toggle("hidden", searchQuery === "");
      renderChannelsGrid();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      searchQuery = "";
      clearSearchBtn.classList.add("hidden");
      renderChannelsGrid();
    });
  }

  /* ==========================================================================
     8. Helper Toast Notifications
     ========================================================================== */
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

  /* ==========================================================================
     Initialization
     ========================================================================== */
  updateFavBadgeCount();
  renderChannelsGrid();
  renderInitialChat();

  if (activeChannel) {
    loadStream(activeChannel);
  }

  setInterval(() => {
    if (totalLiveUsersElem) {
      const randomCount = 540000 + Math.floor(Math.random() * 5000);
      totalLiveUsersElem.textContent = randomCount.toLocaleString();
    }
  }, 5000);
});
