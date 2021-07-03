INSERT INTO "user"("username", "password") VALUES
('davdav', '$2b$10$8Rg8nYApCkvclK2ZU32em.lfDMDvGr6PBu38i7/b3K/bCNixYis3K');

INSERT INTO "building"("name", "cost_factor", "upgrade_factor", "default_cost", "default_value",
"is_storage_building") VALUES 
('Sawmill', 1.4, 1.3, 4, 0.2, false),
('Silo', 1.3, 1.3, 15, 30, true);