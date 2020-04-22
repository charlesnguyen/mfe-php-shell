export function prefix(location, ...prefixes) {
  return prefixes.some(
    prefix => location.href.indexOf(`${location.origin}/${prefix}`) !== -1
  );
}

export function aisp(location) {
  return prefix(location, "apps/aisp");
}

export function pisp(location) {
  return prefix(location, "apps/pisp");
}
