import { OFFRestaurantProduct } from "@/hooks/apiTypes";
import ProductItem from "../ProductItem/ProductItem";

interface ProductListProps {
	products: OFFRestaurantProduct[],
};

export default function ProductList({ products }: ProductListProps) {
	return (
		<ul>
			{products.map((v, i) =>
				<ProductItem product={v} key={i} />
			)}
		</ul>
	);
}
