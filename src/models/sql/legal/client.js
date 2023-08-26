module.exports = (sequelize, DataTypes) => {
	const Client = sequelize.define(
		"client",
		{
			organization_id: {
				type: DataTypes.STRING,
			},
			client_id: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			client_name: {
				type: DataTypes.STRING,
			},
			client_email: {
				type: DataTypes.STRING,
			},
			appwrite_id: {
				type: DataTypes.STRING,
			},
		},
		{
			timestamps: true,
			tableName: "clients",
		}
	);
	return Client;
};
