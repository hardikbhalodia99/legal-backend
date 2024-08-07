module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define(
		"product",
		{
			organization_id: {
				type: DataTypes.STRING,
			},
			product_id: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			product_name: {
				type: DataTypes.STRING,
			},
			product_price: {
				type: DataTypes.FLOAT,
			},
			product_discount: {
				type: DataTypes.FLOAT,
        defaultValue : 0
			},
			product_slug : {
				type : DataTypes.STRING
			},
			is_deleted : {
				type : DataTypes.BOOLEAN,
				defaultValue : false
			}
		},
		{  
			timestamps: true,
			tableName: "products",
		}
	);
	return Product;
};
