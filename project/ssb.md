# SSB: evolving a disordered bacterial tail as a fusion tag

## Why the SSB tail?

Our SSB construct uses a 42-amino-acid C-terminal fragment of *Escherichia coli* single-stranded DNA-binding protein, encoded by 126 bp. The design focuses on its flexible, disordered tail/linker region rather than the whole SSB protein or its structured DNA-binding domain.

The SSB background literature describes a flexible C-terminal region involved in interactions with other proteins. We used that disorder and flexibility as the basis for an entropic-bristle hypothesis: a fused tail could hinder aggregation-promoting contacts around a client protein. The native biological functions of SSB provide context, but DNA binding and native partner recruitment were not the functions assessed in our β-lactamase selection experiment.

SSB therefore offered a bacterial, naturally disordered template from which to generate variants with different hydrophilicity, charge and composition. Our aim was to identify SSB-derived sequences enriched during carbenicillin selection and determine whether enrichment was associated with particular property groups.

## How we built the SSB library

### Amino acid mutagenesis and filtering

Computational mutagenesis replaced consecutive blocks of five amino acids and then three amino acids, with 1,000 candidates generated per block. The preliminary SSB library contained 22,000 sequences. Filtering amino acid sequences against all five criteria retained 132 candidates.

| Descriptor | SSB threshold |
| --- | --- |
| GRAVY | ≤ −1.3048 |
| Estimated net charge at pH 7 | ≤ −1.0 or ≥ 2.0 |
| Helix–sheet fraction sum | ≤ 0.1428 |
| Turn fraction | ≥ 0.5714 |
| Instability index | ≤ 102.6 |

These SSB-specific thresholds retained variants compatible with the intended hydrophilic, flexible tag design. The small retained set reflects the chosen filters, rather than proof that other SSB variants cannot function. The descriptors are sequence-based proxies; the instability index does not directly measure cellular degradation, and the helix–sheet fraction does not establish the peptide's structure experimentally.

### Encoding the library in degenerate DNA

The filtered SSB sequences were deduplicated and aligned. Mutation hotspots were identified relative to parental SSB, with parental residues retained outside the selected hotspots. Degenerate codons were chosen to cover the desired hotspot residues while penalising off-target residues and excluding stop-encoding codons. The resulting 126-bp library sequence, excluding homology arms, was:

```text
AGACAAGGAGGAGGAARCCSAGVCRGARGCAACATAGGAGGAGGACAACCACAAGGAGGAAASCRACRACVCCVAMASCSACAAGGAGGAAACCAATTCAGCGGAGGAARARGSMVCAGACCACAA
```

Its reported theoretical encoding space was 995,328 sequences. An estimated 47.3%, approximately 470,332 sequences, met the computational criteria. These figures describe the designed encoding space, rather than the number successfully assembled, transformed or sequenced. Degenerate encoding also recombines allowed residues into sequences not present in the original filtered catalogue.

### Expression and antibiotic selection

The tag was fused to the C-terminus of aggregation-prone L76N TEM-1 β-lactamase through a `GGGGSGGGGS` linker. This configuration preserved the enzyme's N-terminal secretion signal. Expression was controlled by the arabinose-inducible pBAD promoter. Empty pBAD and untagged L76N β-lactamase served as controls for antibiotic susceptibility and tag-independent resistance, respectively.

The sfGFP coding sequence was removed from the starting backbone by PCR, followed by DpnI digestion and purification. β-Lactamase and its linker were inserted by Gibson assembly at a vector:insert molar ratio of 1:2, at 50°C for 15 minutes. The resulting plasmid was linearised immediately before the stop codon, and the tag insert was assembled at a ratio of 1:5, at 50°C for 30 minutes. Degenerate oligonucleotides were converted from single-stranded to double-stranded DNA before assembly. Assembly products (2 µL) were transformed into 50 µL competent DH10β cells, with 30 minutes on ice, heat shock at 42°C for 30 seconds and one hour of SOC recovery before overnight LB culture.

Cultures were induced with 0.2% L-arabinose and diluted to a starting OD₆₀₀ of 0.05 in Lennox LB containing 10 µg/mL tetracycline. Carbenicillin concentrations were 0, 5,000, 10,000, 15,000, 30,000 and 40,000 µg/mL. OD₆₀₀ was measured using three 100 µL aliquots from each culture. These were technical measurements of one culture, rather than independent biological replicates. Plate-reader values were not converted to a 1 cm path length; the documented conversion factor is 5.6.

After 21 hours, the 0 and 40,000 µg/mL cultures were used for sequencing. Here, “untreated” denotes the parallel culture without carbenicillin; it is not necessarily a time-zero sample. OD₆₀₀ measures culture turbidity and cannot by itself establish viable-cell survival or soluble β-lactamase yield.

### Sequencing and variant identification

Following selection, cultures were grown at 25°C and harvested before saturation. Plasmids were isolated using the PureLink Quick Plasmid Miniprep Kit. The tag-containing region was amplified with pBAD F and pBAD R, gel-purified and submitted to Plasmidsaurus for Oxford Nanopore R10.4.1 amplicon sequencing.

FASTQ reads were searched in both orientations for a 60-nucleotide upstream anchor using Edlib semiglobal alignment, allowing up to 16 edit differences. The pipeline extracted the 126-bp tag region and checked the downstream 60-nucleotide flank. A second reference alignment, allowing up to 32 edit differences, rescued reads only when the variable region retained its expected length and contained no insertion or deletion.

Extracted sequences were checked against the designed IUPAC nucleotide pattern. High-confidence mismatches (Phred ≥30) were discarded. Lower-quality mismatches at fixed-base positions were corrected to the expected base; mismatches at ambiguous positions were discarded when the intended nucleotide could not be resolved. Reads were translated, sequences containing premature stop codons were excluded, and identical amino acid sequences were counted. Subsequent analyses used the raw amino acid variant counts, without the optional abundance-based merging of similar sequences.

### Comparing composition and sequence properties

All retained SSB sequences observed in either culture were combined into one catalogue. A two-row contingency table contained untreated and selected read counts for each sequence, with zero assigned where a sequence was not detected. Pearson's χ² statistic quantified the discrepancy from equal relative composition. Because many expected counts were small, its null distribution was estimated from 100,000 random tables generated with Patefield's algorithm, preserving both sample read totals and pooled counts for each variant. The seed was 42 and the Monte Carlo estimate was `(b + 1) / (100,000 + 1)`, where `b` counted simulated statistics at least as large as the observed statistic. This tests compatibility with random read allocation under the equal-composition model; it does not correct experimental biases or supply biological replication.

For property analysis, each unique SSB sequence was represented once by eight descriptors: GRAVY, estimated net charge at pH 7, instability index, turn fraction, combined helix- and sheet-associated residue fractions, and IDP-BERT predictions of radius of gyration, heat capacity and end-to-end decorrelation time. Features were standardised once across the pooled catalogue. Ward hierarchical clustering with Euclidean distance was evaluated for two to nine clusters, with the highest mean silhouette score used to select the partition.

These fixed clusters were used in both samples. Cluster abundance was the sum of member read counts divided by the sample's total reads. PCA projected the same standardised features onto two axes for display; clustering used the full feature space. A change in a read-weighted cluster centre reflects changes in member abundance, rather than movement of an individual sequence or redefinition of its cluster. All retained sequences, including singletons, contributed to the analysis.

## What we observed

### Culture response to carbenicillin

The SSB-derived library reached an endpoint OD₆₀₀ of 0.091 at 10,000 µg/mL carbenicillin after 21 hours. The corresponding [NEXT library](next.md) value was 0.314. This comparison describes the bulk library cultures under the tested conditions. It does not measure the activity or solubility of an individual SSB fusion.

> **Figure to include:** endpoint OD

### SSB sequence composition changed strongly

Untreated and selected SSB samples differed in variant composition (Pearson χ² = 1026.1). None of 100,000 fixed-margin simulated tables produced a statistic as large as observed. The corrected Monte Carlo estimate was approximately 1 × 10⁻⁵, at the simulation resolution floor. Under the equal-composition model, random read allocation alone was unlikely to produce the observed discrepancy. The result does not establish that selection was the sole cause of the change.

### Enrichment was dominated by SSB-054

The shared hierarchical analysis selected two SSB property clusters, with a silhouette score of 0.321.

| Sample | C1 (% of reads) | C2 (% of reads) |
| --- | --- | --- |
| Untreated | 72.2 | 27.8 |
| Selected | 89.5 | 10.5 |

C1 increased by 17.3 percentage points. Much of this shift was attributable to SSB-054, which accounted for 352 selected reads, or 72.6% of that sample, and was not detected in the untreated sample. Non-detection does not demonstrate absence from the starting library, so a finite fold-enrichment value cannot be inferred from a zero observed baseline without additional assumptions.

The silhouette score indicates only moderate separation of these property groups. C1 and C2 should therefore be treated as useful descriptive partitions, rather than two established functional classes. Their numbering is specific to SSB and does not identify corresponding NEXT clusters.

### Properties of the enriched group

Within C1, the read-weighted mean GRAVY decreased from −1.96 to −2.08 and estimated charge at pH 7 increased from 8.86 to 9.83. Both clusters showed lower mean instability indices and combined helix–sheet fractions after selection. Selected C1 had a reported predicted radius of gyration of 18.61 Å and end-to-end decorrelation time of 143,617 fs.

These summaries are strongly influenced by the sequences accounting for most reads, especially SSB-054. They suggest which properties to investigate, but they cannot show that greater hydrophilicity, charge or predicted expansion caused enrichment.

> **Figures to include:** untreated and selected PCA panels, property changes

## What this means for SSB

The clearest outcome is concentration of the selected population around SSB-054 and its property group. SSB-054 is a candidate for individual reconstruction and functional testing. The population shift alone does not establish improved β-lactamase solubility, retained enzyme activity or reproducible enrichment. One biological replicate and finite sequencing depth leave culture bottlenecks, founder effects and amplification bias unresolved. Replicated assays of SSB-054 alongside parental SSB and untagged β-lactamase would test whether the enrichment reflects a useful fusion-tag phenotype.

## Sources and code

- SSB background papers cited in the report: Savvides et al. (2004), Tan et al. (2017), Kozlov et al. (2015) and Kinebuchi et al. (1997); see the project's SSB research-paper collection.
- Project report and protocol master sheet, SSB design and selection records.
- SSB sequencing and property-clustering outputs.
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

