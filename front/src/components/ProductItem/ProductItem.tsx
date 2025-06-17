import { OFFRestaurantProduct } from "@/hooks/apiTypes";

interface ProductItemProps {
	product: OFFRestaurantProduct
};
export default function ProductItem({ product }: ProductItemProps) {
	return (
		<li>
			<h2>{product.product_name}</h2>
			<p></p>
		</li>
	);
}
