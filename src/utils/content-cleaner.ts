import sanitizeHtml from 'sanitize-html';

/**
 * Utilities for cleaning and transforming Confluence content
 */

/**
 * Extracts plain text from Confluence Storage Format (XHTML)
 * This is a simple implementation - a production version would use a proper HTML parser
 */
export function extractTextFromStorage(storageFormat: string): string {
  if (!storageFormat) return '';

  // Simple regex to strip HTML tags
  return storageFormat
    .replace(/<[^>]*>/g, ' ') // Replace HTML tags with spaces
    .replace(/&[a-z]+;/g, ' ') // Replace HTML entities
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Truncates content to a specified length, preserving word boundaries
 */
export function truncateContent(content: string, maxLength: number = 8000): string {
  if (content.length <= maxLength) return content;

  // Find a good breaking point
  const breakPoint = content.lastIndexOf(' ', maxLength);
  if (breakPoint === -1) return content.substring(0, maxLength);

  return content.substring(0, breakPoint) + '...';
}

/**
 * Optimizes content for AI context windows by removing redundant information
 * and focusing on the most important parts
 */
export function optimizeForAI(content: string): string {
  // This is a placeholder - a real implementation would be more sophisticated
  return truncateContent(content);
}

/**
 * Converts Confluence Storage Format to Markdown
 * This is a simple implementation - a production version would be more comprehensive
 */
export function storageFormatToMarkdown(storageFormat: string): string {
  if (!storageFormat) return '';

  // This is a very basic implementation
  let markdown = storageFormat;

  // Convert headings
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/g, '# $1');
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/g, '## $1');
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/g, '### $1');
  markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/g, '#### $1');
  markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/g, '##### $1');
  markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/g, '###### $1');

  // Convert paragraphs
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/g, '$1\n\n');

  // Convert bold
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/g, '**$1**');
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/g, '**$1**');

  // Convert italic
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/g, '*$1*');
  markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/g, '*$1*');

  // Convert links
  markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)');

  // Convert lists
  markdown = markdown.replace(/<ul[^>]*>(.*?)<\/ul>/g, '$1\n');
  markdown = markdown.replace(/<ol[^>]*>(.*?)<\/ol>/g, '$1\n');
  markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/g, '- $1\n');

  // Remove remaining HTML tags
  markdown = sanitizeHtml(markdown, { allowedTags: [], allowedAttributes: {} });

  // Fix spacing
  markdown = markdown.replace(/\n\s*\n/g, '\n\n');

  return markdown.trim();
}
