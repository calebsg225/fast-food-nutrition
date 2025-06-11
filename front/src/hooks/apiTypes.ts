type GooglePlace = {
	"location": {
		"latitude": number,
		"longitude": number,
	},
	"displayName": {
		"text": string,
		"languageCode": string,
	}
};

type GoogleData = {
	"places": GooglePlace[]
};

type RestaurantItems = {};

export type { GoogleData, GooglePlace, RestaurantItems }
