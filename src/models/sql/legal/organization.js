export default (sequelize, DataTypes) => {
	const Organization = sequelize.define(
		"organization",
		{
			organization_id: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			organization_name: {
				type: DataTypes.STRING,
			},
		},
		{
			timestamps: true,
			tableName: "organizations",
		}
	);
	return Organization;
};
