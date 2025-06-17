// Google Types
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

// OpenFoodFacts Types
type OFFRestaurantData = {
	"count": number,
	"page": number,
	"page_count": number,
	"page_size": number,
	"products": OFFRestaurantProduct[],
	"skip": number,
};

type OFFRestaurantProduct = {
	"code": string,
	"generic_name": string,
	"product_name": string
};

type OFFProductData = {};

export type { GoogleData, GooglePlace, RestaurantItems, OFFRestaurantData, OFFRestaurantProduct, OFFProductData }
