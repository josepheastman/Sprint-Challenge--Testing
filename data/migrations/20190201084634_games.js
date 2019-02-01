exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", tbl => {
    tbl.string("title", 255);

    tbl.string("genre", 255);

    tbl.integer("releaseYear");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("games");
};
