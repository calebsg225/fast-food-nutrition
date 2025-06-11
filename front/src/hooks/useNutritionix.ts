import { useEffect, useState } from "react";
import { NUTRITIONIX_API_KEY, NUTRITIONIX_API_ID } from "../../config.json";
import { RestaurantItems } from "./apiTypes";

export const useNutritionix = (restaurantName: string) => {
	const [restaurantItems, setRestaurantItems] = useState<RestaurantItems>({});
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState('');
	useEffect(() => {
		// https://trackapi.nutritionix.com/v2/natural/nutrients
		const url = "https://trackapi.nutritionix.com/v2/";
		// "query": "grape"
		const body = JSON.stringify({
		});
		const headers = {
			"Content-Type": "application/json",
			"x-app-id": NUTRITIONIX_API_ID,
			"x-app-key": NUTRITIONIX_API_KEY,
		};
		const fetchData = async () => {
			setIsPending(true);
			try {
				const res = await fetch(url,
					{
						method: "POST",
						body: body,
						headers: headers
					});
				if (!res.ok) throw new Error(res.statusText);
				const json = await res.json();
				setIsPending(false);
				setRestaurantItems(json);
			} catch (err) {
				setError(`${err}: Could not fetch Nutritionix Restaurant Items`);
			}

		}
		fetchData();
	}, [restaurantName]);
	return { restaurantItems, isPending, error };
}
