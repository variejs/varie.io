export default function goToDocumentationHash(id: string): void {
  document.getElementById("documentation").scrollTop = document.getElementById(
    id.replace("#", ""),
  ).offsetTop;
}
