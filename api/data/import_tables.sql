DROP TABLE IF EXISTS "user_has_building", "user", "building";

CREATE TABLE "user" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "profile_picture_url" TEXT NOT NULL DEFAULT 'http://localhost:3000/api/img/default_avatar.jpg',
  "stock" INT NOT NULL DEFAULT 0,
  "number_of_clics" INT NOT NULL DEFAULT 0,
  "clic_dps" INT NOT NULL DEFAULT 0,
  "building_dps" INT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "building" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "cost_factor" INT NOT NULL,
  "upgrade_factor" INT NOT NULL,
  "default_cost" INT NOT NULL,
  "default_value" INT NOT NULL,
  "is_storage_building" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "user_has_building" (
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "building_id" INTEGER NOT NULL REFERENCES "building"("id") ON DELETE CASCADE,
  "level" INT NOT NULL DEFAULT 1,
  "actual_cost" INT NOT NULL,
  "actual_value" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);