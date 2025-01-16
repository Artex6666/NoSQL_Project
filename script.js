document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const resultsDiv = document.getElementById("results");

  async function searchMusic(query) {
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la recherche");
      }

      const data = await response.json();

      displayResults(data);
    } catch (error) {
      console.error(error);
      resultsDiv.innerHTML = `<p class="error">Une erreur s'est produite pendant la recherche.</p>`;
    }
  }

  function displayResults(musicList) {
    resultsDiv.innerHTML = "";

    if (musicList.length === 0) {
      resultsDiv.innerHTML = "<p>Aucun résultat trouvé.</p>";
      return;
    }

    musicList.forEach((music) => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("result-item");

      resultItem.innerHTML = `
          <h3>${music.title}</h3>
          <p>Artiste : ${music.artist}</p>
          <p>Date de sortie : ${music.releaseDate}</p>
          <p>Genre : ${music.genre}</p>
        `;

      resultsDiv.appendChild(resultItem);
    });
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = searchInput.value.trim();
    if (query) {
      searchMusic(query);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const playlistsContainer = document.getElementById("playlists");

  // Charge les playlists de l'utilisateur
  async function loadPlaylists() {
    try {
      const user = await User.findById(userId);
      const response = await fetch(`/api/user/${userId}/playlists`);
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des playlists");
      }

      const playlists = await response.json();
      displayPlaylists(playlists);
    } catch (error) {
      console.error(error);
      playlistsContainer.innerHTML = `<p class="error">Impossible de charger les playlists.</p>`;
    }
  }

  // Affiche les playlists et leurs chansons
  function displayPlaylists(playlists) {
    playlistsContainer.innerHTML = "";

    playlists.forEach((playlist) => {
      const playlistDiv = document.createElement("div");
      playlistDiv.classList.add("playlist");

      playlistDiv.innerHTML = `
          <h2>${playlist.name}</h2>
          <div class="songs">
            ${playlist.songs
              .map(
                (song) => `
              <div class="song">
                <span>${song.title} - ${song.artist}</span>
                <button data-song-id="${song._id}" data-playlist-id="${playlist._id}">
                  Supprimer
                </button>
              </div>
            `
              )
              .join("")}
          </div>
        `;

      playlistsContainer.appendChild(playlistDiv);
    });

    const deleteButtons = document.querySelectorAll(".song button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        const songId = e.target.dataset.songId;
        const playlistId = e.target.dataset.playlistId;

        await deleteSongFromPlaylist(playlistId, songId);
        loadPlaylists();
      });
    });
  }

  // Supprime une chanson d'une playlist
  async function deleteSongFromPlaylist(playlistId, songId) {
    try {
      const response = await fetch(`/api/user/playlists/${playlistId}/songs`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songId }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la chanson");
      }
    } catch (error) {
      console.error(error);
    }
  }

  loadPlaylists();
});
