export function prefix(location, ...prefixes) {
  return prefixes.some(
    prefix => location.href.indexOf(`${location.origin}/${prefix}`) !== -1
  );
}

export function aisp(location) {
  return prefix(location, "aisp");
}

export function pisp(location) {
  return prefix(location, "pisp");
}
