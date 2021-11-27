export const googleProfileToLobbyPlayer = (userProfile) => {
	let lobbyPlayer = {};
	lobbyPlayer.name = userProfile.name;
	lobbyPlayer.id = userProfile.googleId;
	lobbyPlayer.image = userProfile.imageUrl;
	return lobbyPlayer;
}