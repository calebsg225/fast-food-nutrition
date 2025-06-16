import { useEffect, useState } from "react";

export default function useOFFRestaurant(restaurant: string, page: number) {
	const [offRestaurantData, setOffRestaurantData] = useState({});
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState('');
	useEffect(() => {
		const fetchData = async () => {
			// parameters for searching all restaurant items
			const parameters = [
				`stores_tags=${restaurant}`,
				"fields=product_name,generic_name,code,codes_tags,brands",
				"page_size=48",
				`page=${page}`,
			];
			// staging server url: no username or password
			const url = `https://world.openfoodfacts.net/api/v2/search${parameters.length ? `?${parameters.join('&')}` : ''}`;
			const headers = {
				// Basic off:off
				// using dev server
				"Authorization": "Basic b2ZmOm9mZg=="
			};
			setIsPending(true);
			try {
				const res = await fetch(url,
					{
						method: "GET",
						headers: headers
					});
				if (!res.ok) throw new Error(res.statusText);
				const json = await res.json();
				setOffRestaurantData(json);
				setIsPending(false);
			} catch (err) {
				setError(`${err}: Could not fetch restaurant item data`);
			}
		}
		fetchData();
	}, [restaurant, page]);
	return { offRestaurantData, isPending, error };
}
