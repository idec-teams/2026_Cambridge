---
layout: page
title: NEXT
permalink: /project/next/
---

## Why NEXT?

NEXT was chosen as a starting template for evolving a compact tag that could support the soluble expression of an aggregation-prone enzyme. It originates from the N-terminal extension of α-carbonic anhydrase from *Hydrogenovibrio marinus*. The construct used in this project contains 52 amino acids, encoded by 156 bp.

The background literature describes this extension as intrinsically disordered and proposes an entropic-bristle mechanism: a flexible peptide can hinder intermolecular contacts that promote aggregation. Jo et al. (2022) reported improved soluble expression of several fusion partners, including carbonic anhydrase from *Thermovibrio ammonificans*, with limited effects on enzyme activity. This provided a rationale for exploring variants of an existing solubility tag rather than designing a completely new sequence.

Our question was whether computationally generated NEXT variants would change in representation during carbenicillin selection when fused to L76N TEM-1 β-lactamase, and which sequence-property groups and individual candidates would become enriched.

## How we built the NEXT library

### Amino acid mutagenesis and filtering

The NEXT amino acid sequence was mutated computationally in consecutive blocks of five residues and then three residues, generating 1,000 candidates per block. Mutagenesis and filtering were performed at the amino acid level. The resulting preliminary library contained 29,000 sequences, of which 4,285 passed all five criteria below.

| Descriptor | NEXT threshold |
| --- | --- |
| GRAVY | ≤ −0.7558 |
| Estimated net charge at pH 7 | ≤ −1.0 or ≥ 1.0 |
| Helix–sheet fraction sum | ≤ 0.6923 |
| Turn fraction | ≥ 0.25 |
| Instability index | ≤ 50.35 |

These criteria selected sequence properties considered compatible with the design hypothesis. They do not demonstrate intrinsic disorder, resistance to degradation or improved protein solubility experimentally. In particular, the secondary-structure fractions and instability index are sequence-derived proxies.

### Encoding variants in degenerate DNA

Filtered sequences were deduplicated and aligned to identify positions frequently differing from parental NEXT. Outside selected hotspots, the parental residue was retained. Within hotspots, degenerate codons were chosen to represent target residues while limiting off-target residues and excluding stop-encoding codons. This produced the following library sequence, excluding assembly homology arms:

```text
GCAGTACAACACAGCAACGSAARCCYAADCGACCTAGGAGCAGAAATGAAAAAACAACACAAAVMSMRAAASCCAGAAGGAVVCGSAARCGCACAAGGAAAAGCARRSRMSHACRASRVAAAAAAAGAAGAAGCACCAAAACCAAAACCAGTAGTA
```

The reported theoretical encoding space was 1.41 × 10⁸ sequences, with an estimated 97.5% meeting the computational criteria, corresponding to approximately 1.38 × 10⁸ sequences. These are computational estimates, not measured library diversity or a functional success rate. Degenerate codons also permit combinations absent from the filtered catalogue, so synthesis does not reproduce that catalogue exactly.

### Expression and antibiotic selection

The tag was fused to the C-terminus of aggregation-prone L76N TEM-1 β-lactamase through a `GGGGSGGGGS` linker. This configuration preserved the enzyme's N-terminal secretion signal. Expression was controlled by the arabinose-inducible pBAD promoter. Empty pBAD and untagged L76N β-lactamase served as controls for antibiotic susceptibility and tag-independent resistance, respectively.

The sfGFP coding sequence was removed from the starting backbone by PCR, followed by DpnI digestion and purification. β-Lactamase and its linker were inserted by Gibson assembly at a vector:insert molar ratio of 1:2, at 50°C for 15 minutes. The resulting plasmid was linearised immediately before the stop codon, and the tag insert was assembled at a ratio of 1:5, at 50°C for 30 minutes. Degenerate oligonucleotides were converted from single-stranded to double-stranded DNA before assembly. Assembly products (2 µL) were transformed into 50 µL competent DH10β cells, with 30 minutes on ice, heat shock at 42°C for 30 seconds and one hour of SOC recovery before overnight LB culture.

Cultures were induced with 0.2% L-arabinose and diluted to a starting OD₆₀₀ of 0.05 in Lennox LB containing 10 µg/mL tetracycline. Carbenicillin concentrations were 0, 5,000, 10,000, 15,000, 30,000 and 40,000 µg/mL. OD₆₀₀ was measured using three 100 µL aliquots from each culture. These were technical measurements of one culture, rather than independent biological replicates. Plate-reader values were not converted to a 1 cm path length; the documented conversion factor is 5.6.

After 21 hours, the 0 and 40,000 µg/mL cultures were used for sequencing. Here, “untreated” denotes the parallel culture without carbenicillin; it is not necessarily a time-zero sample. OD₆₀₀ measures culture turbidity and cannot by itself establish viable-cell survival or soluble β-lactamase yield.

### Sequencing and variant identification

Following selection, cultures were grown at 25°C and harvested before saturation. Plasmids were isolated using the PureLink Quick Plasmid Miniprep Kit. The tag-containing region was amplified with pBAD F and pBAD R, gel-purified and submitted to Plasmidsaurus for Oxford Nanopore R10.4.1 amplicon sequencing.

FASTQ reads were searched in both orientations for a 60-nucleotide upstream anchor using Edlib semiglobal alignment, allowing up to 16 edit differences. The pipeline extracted the 156-bp tag region and checked the downstream 60-nucleotide flank. A second reference alignment, allowing up to 32 edit differences, rescued reads only when the variable region retained its expected length and contained no insertion or deletion.

Extracted sequences were checked against the designed IUPAC nucleotide pattern. High-confidence mismatches (Phred ≥30) were discarded. Lower-quality mismatches at fixed-base positions were corrected to the expected base; mismatches at ambiguous positions were discarded when the intended nucleotide could not be resolved. Reads were translated, sequences containing premature stop codons were excluded, and identical amino acid sequences were counted. Subsequent analyses used the raw amino acid variant counts, without the optional abundance-based merging of similar sequences.

### Comparing composition and sequence properties

All retained NEXT sequences observed in either culture were combined into one catalogue. A two-row contingency table contained untreated and selected read counts for each sequence, with zero assigned where a sequence was not detected. Pearson's χ² statistic quantified the discrepancy from equal relative composition. Because many expected counts were small, its null distribution was estimated from 100,000 random tables generated with Patefield's algorithm, preserving both sample read totals and pooled counts for each variant. The seed was 42 and the Monte Carlo estimate was `(b + 1) / (100,000 + 1)`, where `b` counted simulated statistics at least as large as the observed statistic. This tests compatibility with random read allocation under the equal-composition model; it does not correct experimental biases or supply biological replication.

For property analysis, each unique NEXT sequence was represented once by eight descriptors: GRAVY, estimated net charge at pH 7, instability index, turn fraction, combined helix- and sheet-associated residue fractions, and IDP-BERT predictions of radius of gyration, heat capacity and end-to-end decorrelation time. Features were standardised once across the pooled catalogue. Ward hierarchical clustering with Euclidean distance was evaluated for two to nine clusters, with the highest mean silhouette score used to select the partition.

These fixed clusters were used in both samples. Cluster abundance was the sum of member read counts divided by the sample's total reads. PCA projected the same standardised features onto two axes for display; clustering used the full feature space. A change in a read-weighted cluster centre reflects changes in member abundance, rather than movement of an individual sequence or redefinition of its cluster. All retained sequences, including singletons, contributed to the analysis.

## What we observed

### Culture response to carbenicillin

The NEXT-derived library had an endpoint OD₆₀₀ of 0.314 at 10,000 µg/mL carbenicillin after 21 hours. The corresponding [SSB library](ssb.md) value was 0.091. This difference describes the bulk culture response under the tested conditions; it does not establish that an individual NEXT variant is more soluble or more protective than an SSB variant.

> **Figure to include:** endpoint OD₆₀₀ versus carbenicillin concentration for NEXT-A, SSB and the pBAD control.
### NEXT sequence composition changed

The untreated and selected samples differed in variant composition (Pearson χ² = 545.25). None of 100,000 fixed-margin simulated tables reached the observed statistic, giving a corrected Monte Carlo estimate of approximately 1 × 10⁻⁵. This is the simulation's resolution floor, rather than a precise estimate of a smaller underlying tail probability.

### A less abundant property group became enriched

The shared property analysis identified two NEXT clusters. Their contributions to the sequenced population were:

| Sample | C1 (% of reads) | C2 (% of reads) |
| --- | --- | --- |
| Untreated | 93.9 | 6.1 |
| Selected | 70.4 | 29.6 |

C2 increased by 23.5 percentage points, or approximately 4.9-fold in relative abundance. In the selected sample, C2 had a higher read-weighted estimated charge than C1 (5.55 versus 2.34) and a more negative GRAVY score (−1.41 versus −1.32). The C1 instability index decreased from 29.4 to 24.9. The combined helix–sheet fraction in C2 remained broadly similar.

C2 also had a higher predicted mean radius of gyration (20.5 Å versus 19.5 Å) and end-to-end decorrelation time (258,947 fs versus 216,561 fs) than C1 after selection. These model outputs describe the enriched sequences; they are not measurements of molecular dimensions or dynamics.

> **Figures to include:** paired untreated/selected PCA plots 

### NEXT-072 as a candidate for validation

NEXT-072 was prioritised for its increase in relative representation during selection. Its sequence is:

```text
AVQHSNGNLSDLGAEMKKQHKTKNPEGHASAQGKAGAHNRKKEEAPKPKPVV
```

In the recorded candidate table, its counts increased from 4 untreated reads to 98 selected reads, corresponding to approximately 0.84% and 18.39% of their respective samples. This is an increase of 17.55 percentage points, or approximately 22-fold in relative abundance. Its GRAVY score was −1.3692, estimated charge at pH 7 was 5.276 and instability index was 25.97. Enrichment makes it a candidate for reconstruction and individual testing; it does not yet establish superior soluble protein yield.

### Comparison with error-prone PCR

A separate, unselected NEXT error-prone PCR library was generated through three consecutive PCR rounds. The analysed frequency table contained 2,448 unique sequences and 2,850 reads. After excluding stop-containing sequences, 2,088 unique sequences and 2,482 reads remained.

For visual comparison, the valid error-prone PCR variants were displayed in one colour, with NEXT-072 projected as a labelled reference point using the same feature scaling and PCA transformation fitted to that catalogue. The first two components represented approximately 62% of the feature variance. NEXT-072 lay outside the densest region of this projection and was not detected as an exact sequence in the analysed error-prone PCR dataset.

This suggests that the computationally designed candidate occupies a property combination poorly represented in this particular error-prone PCR sample. It does not demonstrate that error-prone PCR could not generate it, or that computational design is necessary: sequencing coverage was finite, the PCR library was not selected, and the two-dimensional projection omits some feature variation.

## What this means for NEXT

The NEXT experiment identified a change in sequence composition, enrichment of C2 and a strongly enriched candidate, NEXT-072. These findings support prioritising particular variants for follow-up assays. They do not establish which property caused enrichment or whether improved solubility was responsible. With one biological replicate, founder effects, culture bottlenecks, amplification and sampling can also contribute to the observed differences. Independent reconstructions, replicated selection and measurements of soluble β-lactamase yield and activity are needed to test the proposed mechanism.

## Sources and code

- Jo et al. (2022), background evidence for NEXT as a solubility tag; see the project's research-paper collection.
- Project report and protocol master sheet, NEXT design and selection records.
- Project sequencing, clustering and error-prone PCR analysis outputs; candidate counts above are from the recorded NEXT-072 table.
- [Project code repository](https://github.com/TKA0329/iDEC_Cambridge_2026).

## Protocol reference

### Converting the degenerate oligonucleotide to double-stranded DNA

| Component | Final concentration |
| --- | --- |
| IDP F and IDP R | 0.5 µM each |
| Single-stranded template | 0.1 mg/L |
| Q5-XT Hot Start High-Fidelity Master Mix | 1× |

Cycling: 98°C for 30 seconds; 30 cycles of 98°C for 30 seconds, 61.7°C for 20 seconds and 72°C for 7 seconds; hold at 4°C.

### Amplifying the tag region for sequencing

```text
pBAD F: GTGTCTATAATCACGGCAGAAAAGTCCACA
pBAD R: TCATCCGCCAAAACAGCCAAGCTGGAGACCG
```

Each primer was used at 0.3 µM, with plasmid at 1.0 mg/L and Q5-XT Master Mix at 1×. Cycling: 98°C for 60 seconds; 20 cycles of 98°C for 60 seconds, 65°C for 20 seconds and 72°C for 16 seconds; hold at 4°C. Amplicons were separated on 2% agarose in 1× lithium borate at 120 V for 90 minutes and purified using the PureLink Quick Gel Extraction Kit.



