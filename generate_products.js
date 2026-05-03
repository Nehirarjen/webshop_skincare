const fs = require('fs');

// Read existing product-detail.html
const detailHtml = fs.readFileSync('product-detail.html', 'utf8');

// Extract existing product IDs
const idRegex = /id="(detail-[^"]+)"/g;
let match;
const existingIds = [];
while ((match = idRegex.exec(detailHtml)) !== null) {
    if (!existingIds.includes(match[1])) {
        existingIds.push(match[1]);
    }
}

console.log('Existing product IDs:', existingIds.length);

// Define 94 products with proper categorization
const allProducts = [
    // CLEANSER (16 products)
    { id: 'detail-skin-4', brand: 'Skin1004', name: 'Madagascar Centella Light Cleansing Oil', price: 'CHF 17.00', cat: 'cleanser', img: 'https://img01.ztat.net/article/spp-media-p1/864fdaabb59640029859a67ff42f3161/162ffffd60a9416c9769e2bffbb6748e.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-med-1', brand: 'Medicube', name: 'Zero Pore Pad 2.0', price: 'CHF 28.00', cat: 'cleanser', img: 'https://img01.ztat.net/article/spp-media-p1/05b28ee78b054d1992d6f5e4b9411a2c/300554931141442ab2fb99bf9ee8991a.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-anua-2', brand: 'ANUA', name: 'Heartleaf Quercetinol Pore Deep Cleansing Foam', price: 'CHF 28.00', cat: 'cleanser', img: 'https://img01.ztat.net/article/spp-media-p1/68abefd64aef403e86668e340d2f0e5e/1270cd1b275c4d58b5f0330c6f189ecb.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-skin-5', brand: 'Skin1004', name: 'Madagascar Centella Poremizing Deep Cleansing Foam', price: 'CHF 22.00', cat: 'cleanser', img: 'https://img01.ztat.net/article/spp-media-p1/180d630b8512476c89894ce0597f16e5/6f45141997844ea39069c332ed91c3ed.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-round-lab-2', brand: 'ROUND LAB', name: '1025 Dokdo Cleanser', price: 'CHF 9.80', cat: 'cleanser', img: 'https://d1flfk77wl2xk4.cloudfront.net/Assets/00/352/M_p0107035200.jpg?w=500&q=80' },
    { id: 'detail-cosrx', brand: 'COSRX', name: 'Low pH Good Morning Gel Cleanser', price: 'CHF 9.51', cat: 'cleanser', img: 'https://d1flfk77wl2xk4.cloudfront.net/Assets/80/821/M_p0056482180.jpg?w=500&q=80' },
    { id: 'detail-boj-4', brand: 'Beauty of Joseon', name: 'Green Plum Refreshing Cleanser', price: 'CHF 15.00', cat: 'cleanser', img: 'https://beautyofjoseon.com/cdn/shop/files/mo_e319f4f4-ea6e-4e26-8f7e-3b5dc9c98546.webp?v=1768543753&w=500&q=80' },
    { id: 'detail-heimish', brand: 'heimish', name: 'All Clean Balm', price: 'CHF 12.49', cat: 'cleanser', img: 'https://d1flfk77wl2xk4.cloudfront.net/Assets/57/967/M_p0125396757.jpg?w=500&q=80' },
    { id: 'detail-mixsoon', brand: 'mixsoon', name: 'Centella Cleansing Foam', price: 'CHF 8.88', cat: 'cleanser', img: 'https://d1flfk77wl2xk4.cloudfront.net/Assets/08/611/M_p0185161108.jpg?w=500&q=80' },
    { id: 'detail-haruharu', brand: 'haruharu wonder', name: 'Black Rice Moisture 5.5 Soft Cleansing Gel', price: 'CHF 7.84', cat: 'cleanser', img: 'https://d1flfk77wl2xk4.cloudfront.net/Assets/01/990/M_p0141099001.jpg?w=500&q=80' },
    { id: 'detail-anua-6', brand: 'ANUA', name: 'Heartleaf Pore Control Cleansing Oil', price: 'CHF 26.00', cat: 'cleanser', img: 'https://img01.ztat.net/article/spp-media-p1/981399dcbc4d46f2b37c4fea27134397/2c84e620d82e449c8d733f916f799eba.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-etude', brand: 'ETUDE', name: 'Soon Jung pH 6.5 Whip Cleanser', price: 'CHF 9.44', cat: 'cleanser', img: 'https://d1flfk77wl2xk4.cloudfront.net/Assets/23/498/M_p0067949823.jpg?w=500&q=80' },
    { id: 'detail-boj-7', brand: 'Beauty of Joseon', name: 'Calming Cleansing Balm', price: 'CHF 18.50', cat: 'cleanser', img: 'https://beautyofjoseon.com/cdn/shop/files/mo_7d47ae20-baed-479c-b159-7c9539c6d93e.webp?v=1768543720&w=500&q=80' },
    { id: 'detail-skin-7', brand: 'Skin1004', name: 'Madagascar Centella Ampoule Foam', price: 'CHF 19.00', cat: 'cleanser', img: 'https://img01.ztat.net/article/spp-media-p1/6e1ebdeb671c468eaccfe1ebdad2ee6d/62a00df006004ae39ceca11cf051d527.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-torriden-7', brand: 'Torriden', name: 'DIVE IN Cleansing Foam', price: 'CHF 16.50', cat: 'cleanser', img: 'https://torriden.us/cdn/shop/files/DIVEINSerum1_631ac0e3-a77b-422a-a806-bf34477cac19.jpg?v=1753346213&w=500&q=80' },
    { id: 'detail-anua-7', brand: 'ANUA', name: 'Heartleaf Foam Cleanser', price: 'CHF 15.50', cat: 'cleanser', img: 'https://img01.ztat.net/article/spp-media-p1/57a8758e479f4c7eb4ffb15059858c59/c0c68089d1b246499534465d7d7e97e0.jpg?imwidth=500&filter=packshot' },

    // TONER (16 products)
    { id: 'detail-anua-1', brand: 'ANUA', name: 'Heartleaf 77% Soothing Toner', price: 'CHF 26.00', cat: 'toner', img: 'https://img01.ztat.net/article/spp-media-p1/9fe15e8a8743497d8d9f4a011aa40eb4/2e8264089a604c658965e513ab5ea96f.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-boj-5', brand: 'Beauty of Joseon', name: 'Ginseng Essence Water', price: 'CHF 19.00', cat: 'toner', img: 'https://beautyofjoseon.com/cdn/shop/files/mo_7d47ae20-baed-479c-b159-7c9539c6d93e.webp?v=1768543720&w=500&q=80' },
    { id: 'detail-torriden-6', brand: 'Torriden', name: 'CELLMAZING Vita C Toning Pad', price: 'CHF 28.00', cat: 'toner', img: 'https://torriden.us/cdn/shop/files/06_80368f6c-2e81-480b-8a1f-6a2cf313e697.jpg?v=1760666839&w=500&q=80' },
    { id: 'detail-scinic', brand: 'SCINIC', name: 'The Simple Calming Toner', price: 'CHF 13.50', cat: 'toner', img: 'https://d1flfk77wl2xk4.cloudfront.net/Assets/11/443/M_p0191844311.jpg?w=500&q=80' },
    { id: 'detail-round-lab', brand: 'ROUND LAB', name: '1025 Dokdo Toner', price: 'CHF 16.20', cat: 'toner', img: 'https://d1flfk77wl2xk4.cloudfront.net/Assets/00/352/M_p0107035200.jpg?w=500&q=80' },
    { id: 'detail-pyunkang', brand: 'Pyunkang Yul', name: 'Calming Deep Moisture Toner', price: 'CHF 16.19', cat: 'toner', img: 'https://d1flfk77wl2xk4.cloudfront.net/Assets/28/372/M_p0185237228.jpg?w=500&q=80' },
    { id: 'detail-benton', brand: 'Benton', name: 'Aloe BHA Skin Toner', price: 'CHF 17.10', cat: 'toner', img: 'https://d1flfk77wl2xk4.cloudfront.net/Assets/01/990/M_p0141099001.jpg?w=500&q=80' },
    { id: 'detail-boj-8', brand: 'Beauty of Joseon', name: 'Green Plum Refreshing Toner', price: 'CHF 16.80', cat: 'toner', img: 'https://beautyofjoseon.com/cdn/shop/files/mo_89750dbc-bef4-433b-b301-194406d5812e.webp?v=1768543872&w=500&q=80' },
    { id: 'detail-anua-3', brand: 'ANUA', name: 'Rice 70 Glow Milky Toner', price: 'CHF 26.00', cat: 'toner', img: 'https://img01.ztat.net/article/spp-media-p1/57a8758e479f4c7eb4ffb15059858c59/c0c68089d1b246499534465d7d7e97e0.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-skin-8', brand: 'Skin1004', name: 'Madagascar Centella Probio-Cica Essence Toner', price: 'CHF 24.00', cat: 'toner', img: 'https://img01.ztat.net/article/spp-media-p1/6e1ebdeb671c468eaccfe1ebdad2ee6d/62a00df006004ae39ceca11cf051d527.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-torriden-8', brand: 'Torriden', name: 'Balanceful Gradient Toner', price: 'CHF 19.80', cat: 'toner', img: 'https://torriden.us/cdn/shop/files/BALANCEFULControlMask-01.jpg?v=1774422767&w=500&q=80' },
    { id: 'detail-med-7', brand: 'Medicube', name: 'Deep Vita C Toner', price: 'CHF 22.00', cat: 'toner', img: 'https://img01.ztat.net/article/spp-media-p1/d4065e1b690a4c7383bd7f20e2e469a9/1f7404e563a44563b66faf8660fe9d29.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-boj-9', brand: 'Beauty of Joseon', name: 'Red Bean Water Gel', price: 'CHF 18.50', cat: 'toner', img: 'https://beautyofjoseon.com/cdn/shop/files/DTFS_LP100_Thumbnail_1_8b32d7e3-3b13-44ec-93fe-b7fbb3074da0.jpg?v=1763424563&w=500&q=80' },
    { id: 'detail-anua-8', brand: 'ANUA', name: 'Heartleaf 80% Moisture Soothing Toner', price: 'CHF 24.00', cat: 'toner', img: 'https://img01.ztat.net/article/spp-media-p1/9fe15e8a8743497d8d9f4a011aa40eb4/2e8264089a604c658965e513ab5ea96f.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-skin-9', brand: 'Skin1004', name: 'Madagascar Centella Toning Toner', price: 'CHF 20.00', cat: 'toner', img: 'https://img01.ztat.net/article/spp-media-p1/852034f5e2244df6938a3d3e9579be59/8c9901affd2548418502edb1aa26fa5a.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-torriden-9', brand: 'Torriden', name: 'DIVE IN Soothing Toner', price: 'CHF 21.00', cat: 'toner', img: 'https://torriden.us/cdn/shop/files/DIVEINSerum1_631ac0e3-a77b-422a-a806-bf34477cac19.jpg?v=1753346213&w=500&q=80' },

    // SERUM (16 products)
    { id: 'detail-torriden-1', brand: 'Torriden', name: 'DIVE IN Serum', price: 'CHF 24.00', cat: 'serum', img: 'https://torriden.us/cdn/shop/files/DIVEINSerum1_631ac0e3-a77b-422a-a806-bf34477cac19.jpg?v=1753346213&w=500&q=80' },
    { id: 'detail-boj-3', brand: 'Beauty of Joseon', name: 'Glow Serum : Propolis + Niacinamide', price: 'CHF 14.00', cat: 'serum', img: 'https://beautyofjoseon.com/cdn/shop/files/mo_89750dbc-bef4-433b-b301-194406d5812e.webp?v=1768543872&w=500&q=80' },
    { id: 'detail-med-3', brand: 'Medicube', name: 'PDRN Pink Peptide Serum', price: 'CHF 22.90', cat: 'serum', img: 'https://img01.ztat.net/article/spp-media-p1/d4065e1b690a4c7383bd7f20e2e469a9/1f7404e563a44563b66faf8660fe9d29.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-med-4', brand: 'Medicube', name: 'Deep Vita C Capsule Cream', price: 'CHF 32.90', cat: 'serum', img: 'https://img01.ztat.net/article/spp-media-p1/3e6d9b4bffc4468cb4ecff2b62681329/81f45b38c3cc484488543fa5c75a7ace.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-anua-4', brand: 'ANUA', name: 'Niacinamide 10%+TXA 4% Dark Spot Correcting Serum', price: 'CHF 26.00', cat: 'serum', img: 'https://img01.ztat.net/article/spp-media-p1/4356db90feab48e8923b0777af4953d0/43faca1b953440208a2c98ddaa4d7709.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-skin-1', brand: 'Skin1004', name: 'Madagascar Centella Ampoule', price: 'CHF 23.00', cat: 'serum', img: 'https://img01.ztat.net/article/spp-media-p1/6e1ebdeb671c468eaccfe1ebdad2ee6d/62a00df006004ae39ceca11cf051d527.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-torriden-3', brand: 'Torriden', name: 'SOLID IN Lip Essence', price: 'CHF 11.00', cat: 'serum', img: 'https://torriden.us/cdn/shop/files/01._f1388ec2-1faf-4e49-86c8-3f62133fde5f.jpg?v=1754894980&w=500&q=80' },
    { id: 'detail-boj-10', brand: 'Beauty of Joseon', name: 'Relief Serum : Rice + Centella', price: 'CHF 26.50', cat: 'serum', img: 'https://beautyofjoseon.com/cdn/shop/files/relief-sunscreen-1-front.webp?v=1770603160&w=500&q=80' },
    { id: 'detail-med-8', brand: 'Medicube', name: 'Deep VC 500mg Vitamin C Serum', price: 'CHF 38.00', cat: 'serum', img: 'https://img01.ztat.net/article/spp-media-p1/d5f2dd7f958f477d9ccc58e43b080e57/e2bf3540763a47dc94256d4b28fbe174.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-anua-9', brand: 'ANUA', name: 'Peach 70% Niacin Serum', price: 'CHF 28.00', cat: 'serum', img: 'https://img01.ztat.net/article/spp-media-p1/b8a3fe37f88d4c41bf87d11b87aca585/d4d9338f4d284772a79b22aa55b8080c.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-skin-10', brand: 'Skin1004', name: 'Madagascar Centella Hyalu-Cica Blue Serum', price: 'CHF 25.00', cat: 'serum', img: 'https://img01.ztat.net/article/spp-media-p1/852034f5e2244df6938a3d3e9579be59/8c9901affd2548418502edb1aa26fa5a.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-torriden-10', brand: 'Torriden', name: 'CELLMAZING Hyaluronic Acid Serum', price: 'CHF 27.00', cat: 'serum', img: 'https://torriden.us/cdn/shop/files/CELLMAZING_Pore_Tightening_Mask_10ea-04.jpg?v=1767591188&w=500&q=80' },
    { id: 'detail-boj-11', brand: 'Beauty of Joseon', name: 'Ginseng Essence Water', price: 'CHF 24.00', cat: 'serum', img: 'https://beautyofjoseon.com/cdn/shop/files/mo_7d47ae20-baed-479c-b159-7c9539c6d93e.webp?v=1768543720&w=500&q=80' },
    { id: 'detail-med-9', brand: 'Medicube', name: 'CICA-M 1% Niacinamide Serum', price: 'CHF 32.00', cat: 'serum', img: 'https://img01.ztat.net/article/spp-media-p1/3b7e95b2f6ef423fb70f8eb9131daf6e/2327fb299b264c78a506453f4d7d4e9a.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-anua-10', brand: 'ANUA', name: 'Heartleaf 80% Intense Soothing Ampoule', price: 'CHF 30.00', cat: 'serum', img: 'https://img01.ztat.net/article/spp-media-p1/9fe15e8a8743497d8d9f4a011aa40eb4/2e8264089a604c658965e513ab5ea96f.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-skin-11', brand: 'Skin1004', name: 'Madagascar Centella Poremizing Ampoule', price: 'CHF 26.00', cat: 'serum', img: 'https://img01.ztat.net/article/spp-media-p1/6e1ebdeb671c468eaccfe1ebdad2ee6d/62a00df006004ae39ceca11cf051d527.jpg?imwidth=500&filter=packshot' },

    // MASK (15 products)
    { id: 'detail-torriden-4', brand: 'Torriden', name: 'BALANCEFUL Control Mask', price: 'CHF 33.00', cat: 'mask', img: 'https://torriden.us/cdn/shop/files/BALANCEFULControlMask-01.jpg?v=1774422767&w=500&q=80' },
    { id: 'detail-torriden-5', brand: 'Torriden', name: 'CELLMAZING Pore Perfecting Mask', price: 'CHF 32.00', cat: 'mask', img: 'https://torriden.us/cdn/shop/files/CELLMAZING_Pore_Tightening_Mask_10ea-04.jpg?v=1767591188&w=500&q=80' },
    { id: 'detail-med-5', brand: 'Medicube', name: 'Collagen Night Wrapping Mask', price: 'CHF 25.90', cat: 'mask', img: 'https://img01.ztat.net/article/spp-media-p1/d5f2dd7f958f477d9ccc58e43b080e57/e2bf3540763a47dc94256d4b28fbe174.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-med-6', brand: 'Medicube', name: 'Pore Blackhead Mud Mask', price: 'CHF 19.90', cat: 'mask', img: 'https://img01.ztat.net/article/spp-media-p1/3b7e95b2f6ef423fb70f8eb9131daf6e/2327fb299b264c78a506453f4d7d4e9a.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-skin-6', brand: 'Skin1004', name: 'Madagascar Centella Quick Calming Pad', price: 'CHF 24.90', cat: 'mask', img: 'https://img01.ztat.net/article/spp-media-p1/71d2bbe6ee634cd4b064ebda3e6527a3/e6a41fa50add4743a113632ac8567a80.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-boj-12', brand: 'Beauty of Joseon', name: 'Ginseng Essence Mask', price: 'CHF 22.00', cat: 'mask', img: 'https://beautyofjoseon.com/cdn/shop/files/mo_7d47ae20-baed-479c-b159-7c9539c6d93e.webp?v=1768543720&w=500&q=80' },
    { id: 'detail-anua-11', brand: 'ANUA', name: 'Heartleaf BHA Peeling Pad', price: 'CHF 28.00', cat: 'mask', img: 'https://img01.ztat.net/article/spp-media-p1/57a8758e479f4c7eb4ffb15059858c59/c0c68089d1b246499534465d7d7e97e0.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-torriden-11', brand: 'Torriden', name: 'DIVE IN Moisture Mask', price: 'CHF 30.00', cat: 'mask', img: 'https://torriden.us/cdn/shop/files/DIVEINSerum1_631ac0e3-a77b-422a-a806-bf34477cac19.jpg?v=1753346213&w=500&q=80' },
    { id: 'detail-med-10', brand: 'Medicube', name: 'Zero Pore Pad 2.0', price: 'CHF 28.00', cat: 'mask', img: 'https://img01.ztat.net/article/spp-media-p1/05b28ee78b054d1992d6f5e4b9411a2c/300554931141442ab2fb99bf9ee8991a.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-skin-12', brand: 'Skin1004', name: 'Madagascar Centella Poremizing Clay Mask', price: 'CHF 20.00', cat: 'mask', img: 'https://img01.ztat.net/article/spp-media-p1/852034f5e2244df6938a3d3e9579be59/8c9901affd2548418502edb1aa26fa5a.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-boj-13', brand: 'Beauty of Joseon', name: 'Red Bean Mask', price: 'CHF 24.00', cat: 'mask', img: 'https://beautyofjoseon.com/cdn/shop/files/DTFS_LP100_Thumbnail_1_8b32d7e3-3b13-44ec-93fe-b7fbb3074da0.jpg?v=1763424563&w=500&q=80' },
    { id: 'detail-anua-12', brand: 'ANUA', name: 'Heartleaf Clay Mask', price: 'CHF 26.00', cat: 'mask', img: 'https://img01.ztat.net/article/spp-media-p1/68abefd64aef403e86668e340d2f0e5e/1270cd1b275c4d58b5f0330c6f189ecb.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-torriden-12', brand: 'Torriden', name: 'CELLMAZING Brightening Mask', price: 'CHF 31.00', cat: 'mask', img: 'https://torriden.us/cdn/shop/files/06_80368f6c-2e81-480b-8a1f-6a2cf313e697.jpg?v=1760666839&w=500&q=80' },
    { id: 'detail-med-11', brand: 'Medicube', name: 'Collagen Wrapping Mask', price: 'CHF 27.00', cat: 'mask', img: 'https://img01.ztat.net/article/spp-media-p1/d5f2dd7f958f477d9ccc58e43b080e57/e2bf3540763a47dc94256d4b28fbe174.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-skin-13', brand: 'Skin1004', name: 'Madagascar Centella Ampoule Mask', price: 'CHF 22.00', cat: 'mask', img: 'https://img01.ztat.net/article/spp-media-p1/6e1ebdeb671c468eaccfe1ebdad2ee6d/62a00df006004ae39ceca11cf051d527.jpg?imwidth=500&filter=packshot' },

    // MOISTURIZER (15 products)
    { id: 'detail-torriden-2', brand: 'Torriden', name: 'DIVE IN Soothing Cream', price: 'CHF 25.00', cat: 'moisturizer', img: 'https://torriden.us/cdn/shop/files/jar_-05.jpg?v=1753761627&w=500&q=80' },
    { id: 'detail-boj-2', brand: 'Beauty of Joseon', name: 'Dynasty Cream : Ginseng + Royal Jelly', price: 'CHF 22.90', cat: 'moisturizer', img: 'https://beautyofjoseon.com/cdn/shop/files/mo_ad641840-f615-4cd9-9ee8-a02116e44f58.webp?v=1768543753&w=500&q=80' },
    { id: 'detail-med-2', brand: 'Medicube', name: 'PDRN Pink Collagen Capsule Cream', price: 'CHF 23.90', cat: 'moisturizer', img: 'https://img01.ztat.net/article/spp-media-p1/01be75de5bda4e71aac7624df0222838/e658fe2e4fed426b89aebe1a8e3a8ff6.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-anua-5', brand: 'ANUA', name: '3 Ceramide Panthenol Moisture Barrier Cream', price: 'CHF 44.90', cat: 'moisturizer', img: 'https://img01.ztat.net/article/spp-media-p1/b8a3fe37f88d4c41bf87d11b87aca585/d4d9338f4d284772a79b22aa55b8080c.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-skin-2', brand: 'Skin1004', name: 'Madagascar Centella Soothing Cream', price: 'CHF 16.00', cat: 'moisturizer', img: 'https://img01.ztat.net/article/spp-media-p1/1274bd9bf68542ac92fb81f35df1c1cf/a907804de64c48ce8263482f3827164a.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-boj-14', brand: 'Beauty of Joseon', name: 'Ginseng Moisture Cream', price: 'CHF 26.00', cat: 'moisturizer', img: 'https://beautyofjoseon.com/cdn/shop/files/mo_7d47ae20-baed-479c-b159-7c9539c6d93e.webp?v=1768543720&w=500&q=80' },
    { id: 'detail-anua-13', brand: 'ANUA', name: 'Heartleaf 80% Moisture Cream', price: 'CHF 42.00', cat: 'moisturizer', img: 'https://img01.ztat.net/article/spp-media-p1/9fe15e8a8743497d8d9f4a011aa40eb4/2e8264089a604c658965e513ab5ea96f.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-torriden-13', brand: 'Torriden', name: 'CELLMAZING Hyaluronic Cream', price: 'CHF 28.00', cat: 'moisturizer', img: 'https://torriden.us/cdn/shop/files/jar_-05.jpg?v=1753761627&w=500&q=80' },
    { id: 'detail-med-12', brand: 'Medicube', name: 'Deep Vita C Capsule Cream', price: 'CHF 32.90', cat: 'moisturizer', img: 'https://img01.ztat.net/article/spp-media-p1/3e6d9b4bffc4468cb4ecff2b62681329/81f45b38c3cc484488543fa5c75a7ace.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-skin-14', brand: 'Skin1004', name: 'Madagascar Centella Hyalu-Cica Moisture Cream', price: 'CHF 18.00', cat: 'moisturizer', img: 'https://img01.ztat.net/article/spp-media-p1/1274bd9bf68542ac92fb81f35df1c1cf/a907804de64c48ce8263482f3827164a.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-boj-15', brand: 'Beauty of Joseon', name: 'Relief Sun Aqua-Fresh Cream', price: 'CHF 24.00', cat: 'moisturizer', img: 'https://beautyofjoseon.com/cdn/shop/files/mo_ad641840-f615-4cd9-9ee8-a02116e44f58.webp?v=1768543753&w=500&q=80' },
    { id: 'detail-anua-14', brand: 'ANUA', name: 'Peach 70% Moisture Cream', price: 'CHF 40.00', cat: 'moisturizer', img: 'https://img01.ztat.net/article/spp-media-p1/b8a3fe37f88d4c41bf87d11b87aca585/d4d9338f4d284772a79b22aa55b8080c.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-torriden-14', brand: 'Torriden', name: 'DIVE IN Lotion', price: 'CHF 22.00', cat: 'moisturizer', img: 'https://torriden.us/cdn/shop/files/DIVEINSerum1_631ac0e3-a77b-422a-a806-bf34477cac19.jpg?v=1753346213&w=500&q=80' },
    { id: 'detail-med-13', brand: 'Medicube', name: 'PDRN Pink Collagen Barrier Cream', price: 'CHF 26.00', cat: 'moisturizer', img: 'https://img01.ztat.net/article/spp-media-p1/01be75de5bda4e71aac7624df0222838/e658fe2e4fed426b89aebe1a8e3a8ff6.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-skin-15', brand: 'Skin1004', name: 'Madagascar Centella Probio-Cica Cream', price: 'CHF 20.00', cat: 'moisturizer', img: 'https://img01.ztat.net/article/spp-media-p1/1274bd9bf68542ac92fb81f35df1c1cf/a907804de64c48ce8263482f3827164a.jpg?imwidth=500&filter=packshot' },

    // SPF (16 products)
    { id: 'detail-boj-1', brand: 'Beauty of Joseon', name: 'Relief Sun: Rice + Probiotics SPF50+', price: 'CHF 16.90', cat: 'spf', img: 'https://beautyofjoseon.com/cdn/shop/files/relief-sunscreen-1-front.webp?v=1770603160&w=500&q=80' },
    { id: 'detail-boj-6', brand: 'Beauty of Joseon', name: 'Daily Tinted Fluid Sunscreen SPF30', price: 'CHF 18.90', cat: 'spf', img: 'https://beautyofjoseon.com/cdn/shop/files/DTFS_LP100_Thumbnail_1_8b32d7e3-3b13-44ec-93fe-b7fbb3074da0.jpg?v=1763424563&w=500&q=80' },
    { id: 'detail-skin-3', brand: 'Skin1004', name: 'Madagascar Centella Hyalu-Cica Water-Fit Sun Serum', price: 'CHF 21.90', cat: 'spf', img: 'https://img01.ztat.net/article/spp-media-p1/852034f5e2244df6938a3d3e9579be59/8c9901affd2548418502edb1aa26fa5a.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-boj-16', brand: 'Beauty of Joseon', name: 'Relief Sun Aqua-Fresh : Rice + B5', price: 'CHF 19.00', cat: 'spf', img: 'https://beautyofjoseon.com/cdn/shop/files/mo_ad641840-f615-4cd9-9ee8-a02116e44f58.webp?v=1768543753&w=500&q=80' },
    { id: 'detail-anua-15', brand: 'ANUA', name: 'Heartleaf Sunscreen SPF50+', price: 'CHF 20.00', cat: 'spf', img: 'https://img01.ztat.net/article/spp-media-p1/9fe15e8a8743497d8d9f4a011aa40eb4/2e8264089a604c658965e513ab5ea96f.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-skin-16', brand: 'Skin1004', name: 'Madagascar Centella Hyalu-Cica Sun Stick', price: 'CHF 18.00', cat: 'spf', img: 'https://img01.ztat.net/article/spp-media-p1/852034f5e2244df6938a3d3e9579be59/8c9901affd2548418502edb1aa26fa5a.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-torriden-15', brand: 'Torriden', name: 'DIVE IN Sunscreen SPF50+', price: 'CHF 22.00', cat: 'spf', img: 'https://torriden.us/cdn/shop/files/DIVEINSerum1_631ac0e3-a77b-422a-a806-bf34477cac19.jpg?v=1753346213&w=500&q=80' },
    { id: 'detail-med-14', brand: 'Medicube', name: 'Deep Vita C Sunscreen SPF50+', price: 'CHF 24.00', cat: 'spf', img: 'https://img01.ztat.net/article/spp-media-p1/3e6d9b4bffc4468cb4ecff2b62681329/81f45b38c3cc484488543fa5c75a7ace.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-boj-17', brand: 'Beauty of Joseon', name: 'Ginseng Sunscreen SPF50+', price: 'CHF 21.00', cat: 'spf', img: 'https://beautyofjoseon.com/cdn/shop/files/mo_7d47ae20-baed-479c-b159-7c9539c6d93e.webp?v=1768543720&w=500&q=80' },
    { id: 'detail-anua-16', brand: 'ANUA', name: 'Heartleaf 78% Sunscreen SPF50+', price: 'CHF 19.00', cat: 'spf', img: 'https://img01.ztat.net/article/spp-media-p1/9fe15e8a8743497d8d9f4a011aa40eb4/2e8264089a604c658965e513ab5ea96f.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-skin-17', brand: 'Skin1004', name: 'Madagascar Centella Tone Brightening Sunscreen', price: 'CHF 23.00', cat: 'spf', img: 'https://img01.ztat.net/article/spp-media-p1/852034f5e2244df6938a3d3e9579be59/8c9901affd2548418502edb1aa26fa5a.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-torriden-16', brand: 'Torriden', name: 'CELLMAZING Sunscreen SPF50+', price: 'CHF 21.00', cat: 'spf', img: 'https://torriden.us/cdn/shop/files/CELLMAZING_Pore_Tightening_Mask_10ea-04.jpg?v=1767591188&w=500&q=80' },
    { id: 'detail-med-15', brand: 'Medicube', name: 'PDRN Pink Collagen Sunscreen SPF50+', price: 'CHF 25.00', cat: 'spf', img: 'https://img01.ztat.net/article/spp-media-p1/01be75de5bda4e71aac7624df0222838/e658fe2e4fed426b89aebe1a8e3a8ff6.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-boj-18', brand: 'Beauty of Joseon', name: 'Tinted Sunscreen SPF50+', price: 'CHF 20.00', cat: 'spf', img: 'https://beautyofjoseon.com/cdn/shop/files/DTFS_LP100_Thumbnail_1_8b32d7e3-3b13-44ec-93fe-b7fbb3074da0.jpg?v=1763424563&w=500&q=80' },
    { id: 'detail-anua-17', brand: 'ANUA', name: 'Niacinamide Sunscreen SPF50+', price: 'CHF 22.00', cat: 'spf', img: 'https://img01.ztat.net/article/spp-media-p1/4356db90feab48e8923b0777af4953d0/43faca1b953440208a2c98ddaa4d7709.jpg?imwidth=500&filter=packshot' },
    { id: 'detail-skin-18', brand: 'Skin1004', name: 'Madagascar Centella Water-Fit Sun Cream', price: 'CHF 19.00', cat: 'spf', img: 'https://img01.ztat.net/article/spp-media-p1/852034f5e2244df6938a3d3e9579be59/8c9901affd2548418502edb1aa26fa5a.jpg?imwidth=500&filter=packshot' },
];

console.log('Total products defined:', allProducts.length);

// Generate product-detail.html sections for new products
function generateDetailSection(p) {
    return '\n    <div class="product-detail-section" id="' + p.id + '">\n        <div class="product-detail-grid">\n            <div class="product-detail-media">\n                <img src="' + p.img + '" alt="' + p.name + '" />\n            </div>\n            <div class="product-detail-info">\n                <span class="product-brand">' + p.brand + '</span>\n                <h1>' + p.name + '</h1>\n                <p class="product-price-large">' + p.price + '</p>\n                <p class="product-desc">High-quality Korean skincare product from ' + p.brand + '.</p>\n                <div class="product-ingredients">\n                    <h3>Schlüsselinhaltsstoffe</h3>\n                    <div class="ingredient-tags">\n                        <span class="ingredient-tag">Centella Asiatica</span>\n                        <span class="ingredient-tag">Hyaluronic Acid</span>\n                        <span class="ingredient-tag">Niacinamide</span>\n                    </div>\n                </div>\n                <form class="add-to-cart-form" action="order-confirmation.html" method="get">\n                    <div class="form-row">\n                        <div class="form-group">\n                            <label for="qty-' + p.id + '">Menge</label>\n                            <input type="number" id="qty-' + p.id + '" name="qty" min="1" max="10" value="1" />\n                        </div>\n                    </div>\n                    <div class="form-row">\n                        <div class="form-group">\n                            <label for="name-' + p.id + '">Name</label>\n                            <input type="text" id="name-' + p.id + '" name="name" required />\n                        </div>\n                        <div class="form-group">\n                            <label for="email-' + p.id + '">E-Mail</label>\n                            <input type="email" id="email-' + p.id + '" name="email" required />\n                        </div>\n                    </div>\n                    <div class="form-row">\n                        <div class="form-group">\n                            <label for="address-' + p.id + '">Adresse</label>\n                            <input type="text" id="address-' + p.id + '" name="address" required />\n                        </div>\n                    </div>\n                    <div class="form-row">\n                        <div class="form-group">\n                            <label for="plz-' + p.id + '">PLZ</label>\n                            <input type="text" id="plz-' + p.id + '" name="plz" required />\n                        </div>\n                        <div class="form-group">\n                            <label for="city-' + p.id + '">Ort</label>\n                            <input type="text" id="city-' + p.id + '" name="city" required />\n                        </div>\n                    </div>\n                    <input type="hidden" name="product" value="' + p.name + '" />\n                    <input type="hidden" name="price" value="' + p.price + '" />\n                    <button type="submit" class="btn-primary">Jetzt bestellen</button>\n                </form>\n            </div>\n        </div>\n    </div>';
}

// Find where to insert new sections (before closing main tag)
const mainCloseIndex = detailHtml.lastIndexOf('</main>');
const beforeMainClose = detailHtml.substring(0, mainCloseIndex);
const afterMainClose = detailHtml.substring(mainCloseIndex);

// Add new product sections
let newDetailSections = '';
allProducts.forEach(function(p) {
    if (!existingIds.includes(p.id)) {
        newDetailSections += generateDetailSection(p);
    }
});

const newDetailHtml = beforeMainClose + newDetailSections + afterMainClose;
fs.writeFileSync('product-detail.html', newDetailHtml);
console.log('Added new product detail sections to product-detail.html');

// Generate products.html
function generateProductCard(p) {
    return '\n            <article class="product-card">\n                <a href="product-detail.html#' + p.id + '" class="product-card__link">\n                    <div class="product-card__img">\n                        <img src="' + p.img + '" alt="' + p.name + '" />\n                    </div>\n                    <div class="product-card__body">\n                        <span class="product-brand">' + p.brand + '</span>\n                        <h3 class="product-name">' + p.name + '</h3>\n                        <div class="product-footer">\n                            <span class="product-price">' + p.price + '</span>\n                        </div>\n                    </div>\n                </a>\n            </article>';
}

const catNames = {
    cleanser: 'Cleanser',
    toner: 'Toner',
    serum: 'Serum & Essenz',
    mask: 'Masken',
    moisturizer: 'Creme',
    spf: 'Sonnenschutz'
};

let newProductsHtml = '<!DOCTYPE html>\n<html lang="de">\n<head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Produkte — SUNA Korean Skincare</title>\n    <link rel="stylesheet" href="style.css" />\n    <link rel="preconnect" href="https://fonts.googleapis.com" />\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />\n</head>\n<body>\n\n<!-- HEADER -->\n<header class="site-header">\n    <div class="header-inner">\n        <nav class="nav-left">\n            <a href="products.html" class="active">Produkte</a>\n            <a href="brands.html">Marken</a>\n            <a href="contact.html">Kontakt</a>\n        </nav>\n        <a href="index.html" class="logo">SUNA</a>\n        <div class="nav-right">\n            <span class="tagline">Korean Skincare</span>\n        </div>\n    </div>\n</header>\n\n<main>\n\n    <!-- Anchor for modal close -->\n    <div id="products"></div>\n\n    <!-- PAGE HERO -->\n    <section class="page-hero">\n        <div class="page-hero__text">\n            <p class="hero-eyebrow">전체 제품 — Alle Produkte</p>\n            <h1>Unser<br /><em>Sortiment</em></h1>\n        </div>\n        <div class="page-hero__deco">\n            <div class="deco-ring deco-ring--1"></div>\n            <div class="deco-ring deco-ring--2"></div>\n        </div>\n    </section>\n\n    <!-- CATEGORY FILTER -->\n    <section class="filter-bar">\n        <div class="filter-inner">\n            <span class="filter-label">Kategorie:</span>\n            <div class="filter-buttons">\n                <a href="#all" class="filter-btn active">Alle</a>\n                <a href="#cleanser" class="filter-btn">Cleanser</a>\n                <a href="#toner" class="filter-btn">Toner</a>\n                <a href="#serum" class="filter-btn">Serum & Essenz</a>\n                <a href="#mask" class="filter-btn">Masken</a>\n                <a href="#moisturizer" class="filter-btn">Creme</a>\n                <a href="#spf" class="filter-btn">Sonnenschutz</a>\n            </div>\n        </div>\n    </section>\n';

// Add each category section
Object.keys(catNames).forEach(function(cat) {
    const catProducts = allProducts.filter(function(p) { return p.cat === cat; });
    newProductsHtml += '\n    <!-- PRODUCTS GRID - ' + cat.toUpperCase() + ' -->\n    <section class="section products-section" id="' + cat + '">\n        <div class="section-header">\n            <h2 class="section-title">' + catNames[cat] + '</h2>\n        </div>\n        <div class="products-grid products-grid--full">';
    catProducts.forEach(function(p) {
        newProductsHtml += generateProductCard(p);
    });
    newProductsHtml += '\n        </div>\n    </section>';
});

newProductsHtml += '\n</main>\n</body>\n</html>';

fs.writeFileSync('products.html', newProductsHtml);
console.log('Generated new products.html with ' + allProducts.length + ' products');
