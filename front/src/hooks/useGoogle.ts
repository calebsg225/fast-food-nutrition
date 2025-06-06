import { useEffect, useState } from "react";

export const useGoogle = (url: string) => {
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
						"maxResultCount": 10,
						"locationRestriction": {
							"circle": {
								"center": {
									"latitude": 33.95611,
									"longitude": -84.05641,
								},
								"radius": 500.0
							}
						}
					}),
					headers: {
						"Content-Type": "application/json",
						"X-Goog-Api-Key": "",
						"X-Goog-FieldMask": "places.displayName"
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
