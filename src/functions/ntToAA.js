import { genetic_code } from './aaToNt';

const codonToAa = Object.entries(genetic_code)
  .flatMap(([aa, codons]) => codons.map(c => [c, aa]))
  .reduce((acc, [codon, aa]) => {
    acc[codon] = aa;
    return acc;
  }, {});


export function ntToAa(ntSeq) {
  const cleaned = ntSeq.replace(/\s+/g, '').toUpperCase();
  const ntFiltered = cleaned.replace(/[^ACGT-]/g, '');

  const triplets = ntFiltered.match(/.{1,3}/g) || [];
  const aaSeq = triplets
    .filter(codon => codon.length === 3)
    .map(codon => codonToAa[codon] ?? 'X') 
    .join('');

  return [aaSeq, ntFiltered];
}