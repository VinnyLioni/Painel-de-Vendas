export function goToLink(link, vm) {
  const currentPath = vm.$route.path;

  if (currentPath !== link) {
    vm.$router.push({
      path: link
    });
  }
}