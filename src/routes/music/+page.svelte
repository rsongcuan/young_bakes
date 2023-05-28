<script>
	import { onMount } from 'svelte';
	import { musicList } from './musiclist';
	import Header from '../Header.svelte';
	// import {} from '../../'

	let currentAlbumIndex = 0;
	let currentSongIndex = 0;
	let playerState = 'pause';
	let listIsShowing = false;
	const showPlayList = () => (listIsShowing = !listIsShowing);
	/**
	 * @type {HTMLAudioElement}
	 */
	let audioElement;
	/**
	 * @type {HTMLElement}
	 */
	let mainElement;

	function setBackground() {
		let background = `
			linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.5)),
			url(../../../files/images/${$musicList[currentAlbumIndex].image}) center no-repeat
		`;
		mainElement.style.background = background;
		mainElement.style.backgroundSize = 'cover';
	}

	onMount(function () {
		setBackground();
	});

	function prev() {
		if (currentSongIndex === 0) {
			currentSongIndex = $musicList[currentAlbumIndex].songs.length - 1;
		} else {
			currentSongIndex = (currentSongIndex - 1) % $musicList[currentAlbumIndex].songs.length;
		}
		if (playerState === 'play') {
			playerState = 'play';
			audioElement.play();
		} else {
			playerState = 'pause';
			audioElement.pause();
		}
		setBackground();
	}
	function playpause() {
		if (playerState === 'play') {
			playerState = 'pause';
			audioElement.pause();
		} else {
			playerState = 'play';
			audioElement.play();
		}
	}
	function next() {
		currentSongIndex = (currentSongIndex + 1) % $musicList[currentAlbumIndex].songs.length;
		if (playerState === 'play') {
			playerState = 'play';
			audioElement.play();
		} else {
			playerState = 'pause';
			audioElement.pause();
		}
		setBackground();
	}
	/**
	 * @param {number} i
	 */
	function setAlbum(i) {
		currentAlbumIndex = i;
		setBackground();
		showPlayList();
	}
	/**
	 * @param {number} j
	 */
	function setSong(j) {
		currentSongIndex = j;
		playerState = 'pause';
		audioElement.pause();
	}
</script>

<svelte:head>
	<title>Music</title>
	<meta name="description" content="Music player" />
</svelte:head>

<div class="music-main" bind:this={mainElement}>
	<Header />
	<audio
		src={`../../../files/audio/${$musicList[currentAlbumIndex].songs[currentSongIndex].audio}`}
		bind:this={audioElement}
	/>
	<div class="player">
		<div class="current-song">
			<div class="avatar">
				<img src={`../../../files/images/${$musicList[currentAlbumIndex].image}`} alt="Album Art" />
			</div>
			<div class="song-controls">
				<h2>{$musicList[currentAlbumIndex].songs[currentSongIndex].name}</h2>
				<p>{$musicList[currentAlbumIndex].songs[currentSongIndex].artist}</p>
				<div class="controls">
					<button on:click={prev}>
						<i class="fa fa-backward" />
					</button>
					<button on:click={playpause}>
						{#if playerState == 'play'}
							<i class="fa fa-pause" />
						{:else}
							<i class="fa fa-play" />
						{/if}
					</button>
					<button on:click={next}>
						<i class="fa fa-forward" />
					</button>
				</div>
			</div>
		</div>
		<div class="album-list">
			{#each $musicList as album, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="album" class:active={listIsShowing} on:click={() => setAlbum(i)}>
					<div class="avatar">
						<img src={`../../../files/images/${album.image}`} alt="Album Art" />
					</div>
					<div class="album-details">
						<h2>{album.album}</h2>
					</div>
				</div>
				{#if i === currentAlbumIndex}
					{#each $musicList[currentAlbumIndex].songs as music, j}
						<div class="song-list" class:show-list={listIsShowing}>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								class={j == currentSongIndex ? 'song active' : 'song'}
								on:click={() => setSong(j)}
							>
								<div class="song-details">
									<h2>{music.name}</h2>
									<p>{music.artist}</p>
								</div>
							</div>
						</div>
					{/each}
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.music-main {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
	}
	audio {
		display: none;
	}
	.player {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 430px;
		height: 480px;
		display: flex;
		flex-direction: column;
		border-radius: 20px;
		overflow: hidden;
	}
	.player .current-song {
		height: 150px;
		padding: 10px;
		display: flex;
		background: rgba(255, 255, 255, 0.8);
		z-index: 2;
	}
	.player .current-song .avatar {
		width: 130px;
		height: 130px;
		padding: 10px;
		text-align: center;
	}
	.player .current-song .avatar img {
		width: 100%;
		height: 100%;
		border-radius: 10%;
		object-fit: cover;
	}
	.player .current-song .song-controls {
		padding-left: 10px;
		flex: 1;
	}
	.player .current-song .song-controls h2 {
		margin-bottom: 15px;
		font-size: 20px;
		color: #111;
	}
	.player .current-song .song-controls .controls {
		display: flex;
		justify-content: space-between;
		padding-top: 10px;
		padding-right: 40px;
	}
	.player .current-song .song-controls .controls button {
		outline: none;
		border: none;
		background: transparent;
		color: #111;
		font-size: 20px;
		cursor: pointer;
	}
	.player .album-list {
		height: calc(100% - 120px);
		background: rgba(255, 255, 255, 0.2);
		box-shadow: 0px 8px 32px 0 rgba(32, 38, 135, 0.2);
		backdrop-filter: blur(5px);
		border: 1px solid rgba(255, 255, 255, 0.4);
		overflow-y: auto;
	}
	.player .album-list::-webkit-scrollbar {
		width: 4px;
		background: transparent;
	}
	.player .album-list::-webkit-scrollbar-thumb {
		width: 4px;
		background: #fff;
	}
	.player .album-list > div {
		border-top: 0.5px solid rgba(255, 255, 255, 0.25);
		border-bottom: 0.5px solid rgba(255, 255, 255, 0.25);
		cursor: pointer;
	}

	.album {
		display: flex;
	}
	.song.active {
		backdrop-filter: blur(50px);
		background: rgba(255, 255, 255, 0.25);
	}
	.player .album-list > div .avatar {
		width: 50px;
		height: 50px;
		text-align: center;
		padding: 10px;
	}
	.player .album-list > div .avatar img {
		width: 100%;
		height: 100%;
		border-radius: 10%;
		object-fit: cover;
	}
	.player .album-list > div .album-details {
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.player .album-list > div .album-details h2 {
		font-size: 16px;
		margin: 5px 0px 2px;
		color: #fff;
	}
	.song-list {
		height: 0;
		opacity: 0;
		translate: translateY(-50px);
	}
	.show-list {
		height: auto;
		opacity: 1;
		translate: translateY(0);
	}
	.song-list:hover {
		background-color: transparent;
	}
	.player .song-list > div .song-details {
		padding-left: 10px;
		display: list-item;
		justify-content: center;
	}
	.player .song-list > div .song-details h2 {
		font-size: 16px;
		margin: 5px;
		color: #fff;
	}
	.player .song-list > div .song-details p {
		color: #eee;
		font-size: 15px;
		margin: 5px;
	}
</style>
