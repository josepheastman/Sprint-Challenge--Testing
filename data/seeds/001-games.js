exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("games")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("games").insert([
        { title: "Pacman", genre: "Arcade", releaseYear: 1980 },
        { title: "Mega Man", genre: "Action-platform", releaseYear: 1987 },
        { title: "Kingdom Hearts II", genre: "Action RPG", releaseYear: 2005 }
      ]);
    });
};
