/**
 * @param {string} s
 * @returns {string}
 */
export const tournamentTally = (s) => {
  const matches = s.split('\n').filter(Boolean);
  const header = 'Team                           | MP |  W |  D |  L |  P';

  if (!s.length) {
    return header;
  }

  let result = [header];
  let table = {};

  matches.forEach(match => processMatch(match, table));

  const pad = (n, _) => String(n).padStart(2);

  const sortedTable = Object.fromEntries(Object.entries(table).sort(([name1, stats1], [name2, stats2]) => {
    // Sort by points, if same, by alphabetic name
    const pointsSorted = stats2.p - stats1.p;

    return pointsSorted || name1.localeCompare(name2);
  }));

  const teams = Object.entries(sortedTable).map(([name, stats]) => 
    name.padEnd(31, ' ') + '| ' +
    pad(stats['mp']) + ' | ' +
    pad(stats['w']) + ' | ' +
    pad(stats['d']) + ' | ' +
    pad(stats['l']) + ' | ' +
    pad(stats['p'])
  );

  result.push([teams.join('\n')]);

  return result.join('\n');
}

/**
 * @param {string} match
 * @param {Record<string<string, number>>} table
 */
const processMatch = (match, table) => {
  const [team1, team2, outcome] = match.split(';');
  setDefaultObjectValues(table, team1);
  setDefaultObjectValues(table, team2);

  switch (outcome) {
    case 'win': {
      handleObjectKeyInsert(table, team1, 'mp', 1);
      handleObjectKeyInsert(table, team1, 'w', 1);
      handleObjectKeyInsert(table, team1, 'p', 3);
      handleObjectKeyInsert(table, team2, 'mp', 1);
      handleObjectKeyInsert(table, team2, 'l', 1);
      break;
    }
    case 'draw': {
      handleObjectKeyInsert(table, team1, 'mp', 1);
      handleObjectKeyInsert(table, team1, 'd', 1);
      handleObjectKeyInsert(table, team1, 'p', 1);
      handleObjectKeyInsert(table, team2, 'mp', 1);
      handleObjectKeyInsert(table, team2, 'd', 1);
      handleObjectKeyInsert(table, team2, 'p', 1);
      break;
    }
    case 'loss': {
      handleObjectKeyInsert(table, team1, 'mp', 1);
      handleObjectKeyInsert(table, team1, 'l', 1);
      handleObjectKeyInsert(table, team2, 'mp', 1);
      handleObjectKeyInsert(table, team2, 'w', 1);
      handleObjectKeyInsert(table, team2, 'p', 3);
      break;
    }
  }
}

/**
 * If key exists in object, increase its value by given amount,
 * else, set it to given amount.
 * 
 * @param {Record<string<string, number>>} d
 * @param {string} key
 * @param {string} subkey
 * @param {number} value
 */
const handleObjectKeyInsert = (d, key, subkey, value) => {
  if (d[key]) {
    d[key][subkey] = d[key][subkey] ? d[key][subkey] + value : value
  } else {
    d[key] = { [subkey]: value }
  }
}

/**
 * @param {Record<string<string, number>>} d
 * @param {string} key
 */
const setDefaultObjectValues = (d, key) => {
  if (d[key]) {
    d[key] = {
      'mp': d[key].mp || 0,
      'w': d[key].w || 0,
      'd': d[key].d || 0,
      'l': d[key].l || 0,
      'p': d[key].p || 0,
    }
  } else {
    d[key] = { 'mp': 0, 'w': 0, 'd': 0, 'l': 0, 'p': 0 };
  }
}
