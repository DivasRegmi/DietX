module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('Doctor', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    mobile: {
      type: DataTypes.BIGINT(11),
      allowNull: false,
      validate: {
        is: /^98\d{8}$/i,
      },
    },
    profile: DataTypes.TEXT,
    fee: DataTypes.NUMBER,
    description: DataTypes.STRING,
  });
  return Doctor;
};
