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

export type { GoogleData, GooglePlace }
