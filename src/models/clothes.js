// Our table schema
const clothes = (sequelize, DataTypes) =>
    sequelize.define("clothes", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        clothesType: {
            type: DataTypes.STRING,
        },
    });

module.exports = clothes;
