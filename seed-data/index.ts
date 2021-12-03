import {products} from './data';

export const insertSeedData = async (ks) => {
    // Keystone API changed, so we need to check for both versions to get keystone

    const {adapter} = ks.keystone;

    console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
    const {mongoose} = adapter;
    for (const product of products) {
        console.log(`  🛍️ Adding Product: ${product.name}`);
        const {_id} = await mongoose
            .model('ProductImage')
            .create({image: product.photo, altText: product.description});
        product.photo = _id;
        await mongoose.model('Product').create(product);
    }
    console.log(`✅ Seed Data Inserted: ${products.length} Products`);
    console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``);
    process.exit();
};
