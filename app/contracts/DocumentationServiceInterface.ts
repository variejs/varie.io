export interface DocumentationServiceInterface {
  menu(version: string): string;
  page(version: string, page: string): string;
}
