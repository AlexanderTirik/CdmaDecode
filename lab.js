const compose = (...fs) =>
        x => fs.reduceRight((a, f) => f(a), x);
 
    // concat :: [[a]] -> [a]
    const concat = xs => [].concat.apply([], xs);
 
 
    // concatMap :: (a -> [b]) -> [a] -> [b]
    const concatMap = f =>
        xs => xs.flatMap(f);
 
    // flip :: (a -> b -> c) -> b -> a -> c
    const flip = f =>
        x => y => f(y)(x);
 
    // map :: (a -> b) -> [a] -> [b]
    const map = f =>
        xs => xs.map(f);
 
    // mul (*) :: Num a => a -> a -> a
    const mul = a =>
        b => a * b;
 
    // show :: a -> String
    const show = x =>
        JSON.stringify(x);
 
    // transpose :: [[a]] -> [[a]]
    const transpose = xs =>
        xs[0].map((_, col) => xs.map(row => row[col]));
 
    // unlines :: [String] -> String
    const unlines = xs =>
        xs.join('\n');

const kprod = xs =>
        ys => concatMap(
            compose(map(concat), transpose)
        )(
            map(map(
                flip(compose(map, map, mul))(ys)
            ))(xs)
        );


// Функція для матриці Адамара
const adamarMatrix = (n) => {
    if (n == 1) return [[1]];
    if (n == 2) return [[1,1],[1,-1]];
    const a = adamarMatrix(n-1);
    return kprod(a)(a);
}

// Інпут
const input = [0,-12,-4,0,0,4,-4,0,0,4,-4,0,0,4,-4,0,0,-12,0,-4,0,4,0,-4,0,4,0,-4,0,4,0,-4,0,-4,-4,8,0,4,-4,0,0,4,-4,0,0,-4,-4,-8,0,8,0,0,0,0,0,-8,0,0,0,-8,0,-8,0,0,0,4,0,4,0,4,0,4,0,-4,0,-4,0,-4,0,12,0,-4,4,0,0,-4,4,0,0,4,4,-8,0,4,4,8,-2,-6,-2,10,2,-2,2,-2,2,6,2,6,-2,2,-2,2,2,-6,6,6,-2,-2,2,-6,-2,6,2,2,2,2,6,-2];

// Номер варіанта
const variantNumber = 1
// Строка варіанту з матриці Адамара
const variant = adamarMatrix(4)[(variantNumber - 1) % 16];

const preResult = [];

// Пошук результату
for(let j = 0; j < 8; j++) {
    let sum = 0;
    for (let i = 16*j; i < 16*(j + 1); i++) {
        sum += variant[i%16]*input[i]
    }
    preResult.push(sum/16);

}

const result = preResult.map(el => el == 1 ? 0 : 1)

console.log(result);
