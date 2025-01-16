import * as fs from 'fs';
import * as path from 'path';

function loadIgnorePatterns(): string[] {
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    return [];
  }

  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
  return gitignoreContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '' && !line.startsWith('#'));
}

export default loadIgnorePatterns;

