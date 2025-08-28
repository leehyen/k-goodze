function importAll(r) {
  const map = {};
  r.keys().forEach((key) => {
    const file = key.replace("./", ""); // "hero-hanbok-accessory.jpg"
    map[file] = r(key);
  });
  return map;
}

const images = importAll(require.context("../assets", false, /\.(png|jpe?g|svg)$/));

export const getAsset = (name) => images[name] ?? null;