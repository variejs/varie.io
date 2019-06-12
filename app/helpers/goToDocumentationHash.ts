export default function goToDocumentationHash(id: string): void {
  setTimeout(() => {
    let element = document.getElementById(id.replace("#", ""));
    if (element) {
      document.getElementById("documentation").scrollTop = element.offsetTop;
    }
  }, 0);
}
