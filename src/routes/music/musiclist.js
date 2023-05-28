import { writable } from 'svelte/store';

export const musicList = writable([
	{
		image: 'launch_times_and_spaceships.png',
		album: 'Launch Times and Spaceships',
		songs: [
			{
				audio: 'Test_100KB.mp3',
				name: 'Test1',
				// artist: ['Young Bakes', 'SJ23', 'Brodie1', 'Fass Blaq']
				artist: 'Young Bakes'
			},
			{
				audio: 'Test_100KB.mp3',
				name: 'Test2',
				artist: 'Young Bakes'
			},
			{
				audio: 'Test_100KB.mp3',
				name: 'Test3',
				artist: 'Young Bakes'
			}
		]
	},
	{
		image: 'selfmade_family_reunion.png',
		album: 'Selfmade Family Reunion',
		songs: [
			{
				audio: 'Test_500KB.mp3',
				name: 'Test1',
				// artist: ['Young Bakes', 'SJ23', 'Brodie1', 'Fass Blaq', 'Little Chief']
				artist: 'Young Bakes'
			},
			{
				audio: 'Test_500KB.mp3',
				name: 'Test2',
				artist: 'Young Bakes'
			},
			{
				audio: 'Test_500KB.mp3',
				name: 'Test3',
				artist: 'Young Bakes'
			}
		]
	},
	{
		image: 'launch_times_and_spaceships.png',
		album: 'Album 3',
		songs: [
			{
				audio: 'Test_100KB.mp3',
				name: 'Test1',
				// artist: ['Young Bakes', 'SJ23', 'Brodie1', 'Fass Blaq']
				artist: 'Young Bakes'
			},
			{
				audio: 'Test_100KB.mp3',
				name: 'Test2',
				artist: 'Young Bakes'
			},
			{
				audio: 'Test_100KB.mp3',
				name: 'Test3',
				artist: 'Young Bakes'
			}
		]
	},
	{
		image: 'selfmade_family_reunion.png',
		album: 'Album4',
		songs: [
			{
				audio: 'Test_500KB.mp3',
				name: 'Test1',
				// artist: ['Young Bakes', 'SJ23', 'Brodie1', 'Fass Blaq', 'Little Chief']
				artist: 'Young Bakes'
			},
			{
				audio: 'Test_500KB.mp3',
				name: 'Test2',
				artist: 'Young Bakes'
			},
			{
				audio: 'Test_500KB.mp3',
				name: 'Test3',
				artist: 'Young Bakes'
			}
		]
	}
]);
