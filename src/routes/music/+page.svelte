<script>
	import { onMount } from 'svelte';
	import { musicList } from './musiclist';
	import Header from '../Header.svelte';
	import { AccordionItem, Accordion, Avatar, Hr, Layout, P } from 'flowbite-svelte';
	import { CheckCircle } from 'svelte-heros-v2';
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
				<P size="2xl">{$musicList[currentAlbumIndex].songs[currentSongIndex].name}</P>
				<P style="padding:4px 0 4px 0">{$musicList[currentAlbumIndex].album}</P>
				<P>{$musicList[currentAlbumIndex].songs[currentSongIndex].artist}</P>
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
			<Accordion
				activeClasses="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-white focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800"
				inactiveClasses="text-white hover:text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:dark:bg-gray-800"
			>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				{#each $musicList as album, i}
					<div class:active={listIsShowing} on:click={() => setAlbum(i)}>
						<AccordionItem
							activeClasses="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-white focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800"
							inactiveClasses="text-white hover:text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:dark:bg-gray-800"
						>
							<span slot="arrowup">
								<svg
									class="w-6 h-6 shrink-0 rotate-180"
									fill="gray"
									stroke="white"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
									/>
								</svg>
							</span>
							<span slot="arrowdown">
								<svg
									class="w-6 h-6 shrink-0"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
									/>
								</svg>
							</span>
							<span slot="header" class="text-base flex gap-5">
								<Avatar
									src={album.image ? `../../../files/images/${album.image}` : ''}
									rounded
									size="lg"
								/>
								<span style="padding-top:25px;">{album.album}</span>
							</span>
							{#each $musicList[currentAlbumIndex].songs as music, j}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<div
									class={j == currentSongIndex ? 'song active' : 'song'}
									on:click={() => setSong(j)}
								>
									<Layout gap={6} cols="grid-cols-1 sm:grid-cols-8">
										{#if j == currentSongIndex}
											<div style="padding-top:15px">
												<CheckCircle size="25" />
											</div>
										{/if}
										<div class="col-span-7">
											<p class="text-xl dark:text-white">{music.name}</p>
											<p class="text-l dark:text-white">{music.artist}</p>
										</div>
									</Layout>
									{#if j !== $musicList[currentAlbumIndex].songs.length - 1}
										<Hr />
									{/if}
								</div>
							{/each}
						</AccordionItem>
					</div>
				{/each}
			</Accordion>
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
	/* .player .current-song .song-controls h2 {
		margin-bottom: 15px;
		font-size: 20px;
		color: #111;
	} */
	.player .current-song .song-controls .controls {
		display: flex;
		justify-content: space-between;
		padding-top: 10px;
		padding-right: 40px;
		margin-bottom: 10px;
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
	.song.active {
		/* backdrop-filter: blur(50px); */
		color: white;
	}
	.song {
		color: #cccccc;
		padding: 5px;
	}
	.song:hover {
		color: yellow;
		cursor: pointer;
	}

	/* .player .album-list > div .avatar {
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
	} */
</style>
