"use client"

import { useMemo } from "react";
import styles from "./page.module.css";
import dynamic from "next/dynamic";

export default function FoodMap() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/Map/Map'),
    {
      loading: () => <p>Loading the map...</p>,
      ssr: false
    }
  ), []);
  return (
    <div className={styles.foodmap} >
      <Map position={[51.505, -0.09]} zoom={13} />
    </div>
  );
}
