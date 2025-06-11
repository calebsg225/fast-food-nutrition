import { useEffect, useState } from "react";
import { GOOGLE_API_KEY } from "../../config.json";
import { GoogleData } from "./apiTypes";

export const useGoogle = (
	radius: number,
	lat: number,
	lng: number,
) => {
	const [googleData, setGoogleData] = useState<GoogleData>({ places: [] });
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState('');
	useEffect(() => {
		const url = "https://places.googleapis.com/v1/places:searchNearby";
		const body = JSON.stringify({
			"includedTypes": ["restaurant"],
			"maxResultCount": 20,
			"locationRestriction": {
				"circle": {
					"center": {
						"latitude": lat,
						"longitude": lng,
					},
					"radius": radius
				}
			}
		});
		const headers = {
			"Content-Type": "application/json",
			"X-Goog-Api-Key": GOOGLE_API_KEY,
			"X-Goog-FieldMask": "places.displayName,places.location"
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
				setGoogleData(json);
			} catch (err) {
				setError(`${err}: Could not nearby places from google`);
			}

		}
		fetchData();
	}, [radius, lat, lng]);
	return { googleData, isPending, error };
}
