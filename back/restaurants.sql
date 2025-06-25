CREATE SCHEMA IF NOT EXISTS "public";


CREATE TABLE "public"."menu_item_ingredients" (
    "ingredient_id" bigint NOT NULL,
    "menu_item_id" bigint NOT NULL,
    "position" integer,
    PRIMARY KEY ("ingredient_id", "menu_item_id")
);



CREATE TABLE "public"."menu_items" (
    "id" bigint NOT NULL,
    "name" varchar NOT NULL,
    "restaurant_id" integer NOT NULL,
    "price" integer,
    "calories" integer,
    "total_fat" integer,
    "total_carbs" integer,
    "protein" integer,
    "last_updated" timestamp NOT NULL,
    PRIMARY KEY ("id")
);



CREATE TABLE "public"."ingredients" (
    "id" bigint NOT NULL,
    "name" varchar NOT NULL,
    "vegan" boolean,
    "vegetarian" boolean,
    "gluten" boolean,
    "dairy" boolean,
    "soy" boolean,
    "nut" boolean,
    "dye" boolean,
    "last_updated" timestamp NOT NULL,
    PRIMARY KEY ("id")
);



CREATE TABLE "public"."restaurants" (
    "id" bigint NOT NULL,
    "name" varchar NOT NULL,
    "location" integer NOT NULL,
    "chain_id" integer,
    "street_number" integer,
    "street_address" varchar,
    "street_address_2" varchar,
    "city" varchar,
    "state" varchar,
    "zip" varchar,
    "last_updated" timestamp NOT NULL,
    PRIMARY KEY ("id")
);



CREATE TABLE "public"."restaurant_chains" (
    "id" integer NOT NULL,
    "name" varchar NOT NULL,
    PRIMARY KEY ("id")
);



ALTER TABLE "public"."menu_item_ingredients"
ADD CONSTRAINT "fk_menu_item_ingredients_ingredient_id_ingredients_id" FOREIGN KEY("ingredient_id") REFERENCES "public"."ingredients"("id");

ALTER TABLE "public"."menu_item_ingredients"
ADD CONSTRAINT "fk_menu_item_ingredients_menu_item_id_menu_items_id" FOREIGN KEY("menu_item_id") REFERENCES "public"."menu_items"("id");

ALTER TABLE "public"."menu_items"
ADD CONSTRAINT "fk_menu_items_restaurant_id_restaurants_id" FOREIGN KEY("restaurant_id") REFERENCES "public"."restaurants"("id");

ALTER TABLE "public"."restaurants"
ADD CONSTRAINT "fk_restaurants_chain_id_restaurant_chains_id" FOREIGN KEY("chain_id") REFERENCES "public"."restaurant_chains"("id");
