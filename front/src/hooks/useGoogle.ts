import { useEffect, useState } from "react";
import { GOOGLE_API_KEY } from "../../config.json";
import { GoogleData } from "./apiTypes";

export const useGoogle = (
	radius: number,
	lat: number,
	lng: number,
) => {
	const [fetchData, setFetchData] = useState(<{
		data: GoogleData,
		isPending: boolean,
		error: string
	}>{
			data: {},
			isPending: false,
			error: '',
		});
	useEffect(() => {
		const url = "https://places.googleapis.com/v1/places:searchNearby";
		const body = JSON.stringify({
			"includedTypes": ["restaurant"],
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
		});
		const headers = {
			"Content-Type": "application/json",
			"X-Goog-Api-Key": GOOGLE_API_KEY,
			"X-Goog-FieldMask": "places.displayName,places.location"
		};
		const fetchData = async () => {
			setFetchData(d => {
				d.isPending = true;
				return d
			});
			try {
				const res = await fetch(url,
					{
						method: "POST",
						body: body,
						headers: headers
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
	}, [radius, lat, lng]);
	console.log(fetchData);
	return fetchData;
}
