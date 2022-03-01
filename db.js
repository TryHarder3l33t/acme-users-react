const Sequelize = require("sequelize");

const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_db"
);

//User/Table model
const User = conn.define(
  "user",
  {
    name: Sequelize.DataTypes.STRING,
    bio: Sequelize.DataTypes.TEXT,
  },
  {
    hooks: {
      beforeCreate: function (user) {
        if (!user.bio) {
          user.bio = `This is a bio, a happy bio, about living in Ohio. Where do you live? Do you live in Ohio, would you like a bio? This is silly probably written by Billy or his girl Jilly`;
        }
        console.log(user);
      },
    },
  }
);

//Class method name: name
User.createWithName = (name) =>
  User.create({
    name,
  });

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  //Nice way to const jimmy = await User.create({'jimmy'})
  const [moe, lucy, curly] = await Promise.all(
    ["moe", "lucy", "curly"].map(User.createWithName)
  );
  console.log(lucy.get());
};

module.exports = {
  models: {
    User,
  },
  syncAndSeed,
};
