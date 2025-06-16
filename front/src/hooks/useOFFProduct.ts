import { useEffect, useState } from "react";

export default function useOFFProduct(product_code: string) {
	const [offProductData, setOffProductData] = useState({});
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState('');
	useEffect(() => {
		const fetchData = async () => {
			// staging server url: no username or password
			const url = `https://world.openfoodfacts.net/api/v2/product/${product_code}.json`;
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
				setOffProductData(json);
				setIsPending(false);
			} catch (err) {
				setError(`${err}: Could not fetch OFF product info`);
			}
		}
		fetchData();
	}, [product_code]);
	return { offProductData, isPending, error };
}
