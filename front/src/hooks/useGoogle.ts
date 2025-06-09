import { useEffect, useState } from "react";
import { GOOGLE_API_KEY } from "../../config.json";

export const useGoogle = (
	url: string,
	radius: number,
	lat: number,
	lng: number,
) => {
	const [fetchData, setFetchData] = useState({
		data: '',
		isPending: false,
		error: '',
	});
	useEffect(() => {
		const fetchData = async () => {
			setFetchData(d => {
				d.isPending = true;
				return d
			});
			try {
				const res = await fetch(url, {
					method: "POST",
					body: JSON.stringify({
						"includeTypes": ["restaurant"],
						"maxResultCount": 15,
						"locationRestriction": {
							"circle": {
								"center": {
									"latitude": lat,
									"longitude": lng,
								},
								"radius": radius
							}
						}
					}),
					headers: {
						"Content-Type": "application/json",
						"X-Goog-Api-Key": GOOGLE_API_KEY,
						"X-Goog-FieldMask": "places.displayName,places.location"
					}
				});
				if (!res.ok) throw new Error(res.statusText);
				const json = await res.json();
				setFetchData(d => {
					d.isPending = false;
					d.data = json;
					return d;
				});
			} catch (err) {
				setFetchData(d => {
					d.error = `${err} Could not fetch Data`;
					return d;
				});
			}

		}
		fetchData();
	}, [url]);
	return fetchData;
}
