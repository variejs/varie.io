export default function goToDocumentationHash(id: string): void {
  setTimeout(() => {
    document.getElementById(
      "documentation",
    ).scrollTop = document.getElementById(id.replace("#", "")).offsetTop;
  }, 0);
}
