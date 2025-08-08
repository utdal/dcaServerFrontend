export const genetic_code = {
    "A": ["GCT", "GCC", "GCA", "GCG"],
    "R": ["CGT", "CGC", "CGA", "CGG", "AGA", "AGG"],
    "N": ["AAT", "AAC"],
    "D": ["GAT", "GAC"],
    "C": ["TGT", "TGC"],
    "Q": ["CAA", "CAG"],
    "E": ["GAA", "GAG"],
    "G": ["GGT", "GGC", "GGA", "GGG"],
    "H": ["CAT", "CAC"],
    "I": ["ATT", "ATC", "ATA"],
    "L": ["TTA", "TTG", "CTT", "CTC", "CTA", "CTG"],
    "K": ["AAA", "AAG"],
    "M": ["ATG"],
    "F": ["TTT", "TTC"],
    "P": ["CCT", "CCC", "CCA", "CCG"],
    "S": ["TCT", "TCC", "TCA", "TCG", "AGT", "AGC"],
    "T": ["ACT", "ACC", "ACA", "ACG"],
    "W": ["TGG"],
    "Y": ["TAT", "TAC"],
    "V": ["GTT", "GTC", "GTA", "GTG"],
    "-": ["---"]
}
export function aaToNt(amino_acid_seq) {
  const cleaned = amino_acid_seq.replace(/\s+/g, '');
  const filtered = cleaned.replace(/[^A-Za-z-]/g, '');
  const validKeys = Object.keys(genetic_code);
  const chars = filtered.split('').filter(c => validKeys.includes(c.toUpperCase()));
  const aa_filtered = chars.join('');
  const nt_seq = chars.map(char => {
    const codons = genetic_code[char.toUpperCase()];
    return codons[codons.length - 1];
  });

  return [nt_seq.join(''), aa_filtered];
}
