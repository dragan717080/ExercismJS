function wrap(text, tag) {
  return `<${tag}>${text}</${tag}>`;
}

function parser(markdown, delimiter, tag) {
  const pattern = new RegExp(`${delimiter}(.+)${delimiter}`);
  const replacement = `<${tag}>$1</${tag}>`;

  return markdown.replace(pattern, replacement);
}

function parseStrong(markdown) {
  return parser(markdown, '__', 'strong');
}

function parseEmphasis(markdown) {
  return parser(markdown, '_', 'em');
}

function parseText(markdown, isList) {
  const parsedText = parseEmphasis(parseStrong(markdown));

  return isList ? parsedText : wrap(parsedText, 'p');
}

function parseHeader(markdown, list) {
  let count = 0;

  for (let i = 0; i < markdown.length; i++) {
    if (markdown[i] === '#') {
      count += 1;
    } else {
      break;
    }
  }

  if (count === 0 || count > 6) {
    return [null, list];
  }

  const headerTag = `h${count}`;
  const headerHtml = wrap(markdown.substring(count + 1), headerTag);

  return list ? [`</ul>${headerHtml}`, false] : [headerHtml, false];
}

function parseLineItem(markdown, list) {
  if (markdown.startsWith('*')) {
    const innerHtml = wrap(parseText(markdown.substring(2), true), 'li');

    return list ? [innerHtml, true] : [`<ul>${innerHtml}`, true];
  }

  return [null, list];
}

function parseParagraph(markdown, list) {
  return !list ? [parseText(markdown, false), false] : [`</ul>${parseText(markdown, false)}`, false];
}

function parseLine(markdown, list) {
  let [result, inListAfter] = parseHeader(markdown, list);

  if (result === null) {
    [result, inListAfter] = parseLineItem(markdown, list);
  }

  if (result === null) {
    [result, inListAfter] = parseParagraph(markdown, list);
  }

  if (result === null) {
    throw new Error('Invalid markdown');
  }

  return [result, inListAfter];
}

export function parse(markdown) {
  const lines = markdown.split('\n');
  let result = '';
  let list = false;

  for (let i = 0; i < lines.length; i++) {
    let [lineResult, newList] = parseLine(lines[i], list);
    result += lineResult;
    list = newList;
  }

  const tag = list ? '</ul>' : '';

  return result + tag;
}
