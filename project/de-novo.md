---
layout: page
title: De Novo
permalink: /project/de-novo/
---

# De novo: designing disordered tags from sequence motifs

## Why design a tag without a natural template?

The de novo branch explored whether proposed features of an entropic-bristle tag could be built into new sequences rather than introduced by mutating an existing protein fragment. Unlike NEXT and SSB, this library had no parental sequence. Its design varied peptide length, charge density, charge patterning and the presence of short hydrophobic patches.

The rationale drew on the project's artificial-IDP background reading, including Tang et al. (2024), and motif analysis of proteins used as solubility tags, including Smt3. Polar and charged residues and proline-rich patterns were used to create candidate sequences compatible with a flexible, hydrophilic fusion-tag hypothesis. These design rules were hypotheses to test, not evidence that every resulting sequence would be disordered or improve solubility.

## How we generated the library

### Residue categories and motif rules

The generator used the following operational categories. They describe the software's design choices rather than a universal biochemical classification.

| Design category | Allowed residues |
| --- | --- |
| Positively charged | K, R, H* |
| Negatively charged | E, D |
| Nonpolar motif residues | G, P, with a documented G:P ratio of 1:7 |
| Hydrophobic-patch pool | G, A, V*, I*, L* |
| Polar | S, T, Q, N* |

Residues marked `*` were sampled less frequently. Motifs were generated from these categories as follows:

| Motif | Length (aa) | Pattern |
| --- | --- | --- |
| Smt3_based_motif1 | 4 | Positive–proline–negative–nonpolar |
| EB_based_motif1 | 5 | Negative–negative–proline–polar–polar |
| EB_based_motif2 | 5 | Negative–negative–proline–positive–positive |
| EB_based_motif3 | 5 | Positive–positive–proline–polar–polar |
| EB_based_motif4 | 5 | Polar–polar–proline–negative–negative |
| EB_based_motif5 | 5 | Polar–polar–proline–polar–polar |
| EB_based_motif6 | 5 | Proline at position 3; each remaining position polar, positive or negative |
| Other_rules_based_motif1 | 5 | At least one nonpolar residue; remaining residues polar or charged |
| Other_rules_based_motif2 | 10 | At least one nonpolar residue; remaining residues polar or charged |

Motifs were repeated or combined to generate nominal lengths of 15, 50, 100, 150, 200 and 250 amino acids, each with a tolerance of ±3 residues. Additional candidates contained two-residue patches from the designated nonpolar pool, placed at randomly chosen motif junctions or at every junction. In total, 3,747,989 candidate sequences were generated.

### Computational filtering

The de novo library used three filters:

| Descriptor | Threshold |
| --- | --- |
| Helix–sheet fraction sum | ≤ 0.5 |
| Turn fraction | ≥ 0.4 |
| Instability index | ≤ 40.0 |

Filtering retained 378,679 sequences, approximately 10.1% of the generated catalogue. GRAVY and net charge were not used as additional filters because residue-category choices were already constrained during motif generation. This was a design decision; it does not imply that all candidates had the same hydrophobicity or charge.

The retained sequences satisfied these computational thresholds. Their actual disorder, solubility and effects on a fusion partner remained to be established experimentally.

### Degenerate DNA design

The recorded de novo degenerate sequence was:

```text
VRSVRSVASVASVRSVRSVRSRRSVASVRSVNWVDWVRSVRSVRSVRSVRSVVSVASVRSVNWVNWVRSVRSVRSVRSVRSVVSVRSVRSVNWVNWVRSVRSVASVRSVRSVVSVRSVRSVNWVNWVVSVRSVASVASVRSVRSVRSRRSVNWVNW
```

The reported theoretical encoding space was 6.18 × 10⁵⁰ sequences. An estimated 4.94% met the computational criteria, corresponding to approximately 3.05 × 10⁴⁸ sequences. This enormous space could not be represented comprehensively by the physical library. It describes possible encoding combinations, not measured transformant diversity or a count of functional variants.

> **Design detail to verify:** the copied report describes compression using parental residues and mutation hotspots. That procedure cannot be transferred directly to a library with no parent. The documentation should specify how the variable-length motif catalogue was reduced to this particular synthesised sequence, including which length or subset it represents. Until clarified, we report the recorded sequence and estimates without attributing a template-based hotspot procedure to it.

## Intended experimental test

The intended de novo construct fused the tag to the C-terminus of L76N TEM-1 β-lactamase through a `GGGGSGGGGS` linker under the pBAD promoter, preserving the enzyme's N-terminal secretion signal. The degenerate oligonucleotide was intended for double-stranded conversion, Gibson assembly and transformation into DH10β cells using the β-lactamase fusion workflow.

The planned comparison used 0.2% L-arabinose induction and carbenicillin exposure, with empty pBAD and untagged β-lactamase controls. Culture turbidity was measured by OD₆₀₀, and untreated and selected populations were intended for amplicon sequencing to identify enriched de novo sequences. This describes the intended test; the culture measurements cannot be assigned to that library because of the identity problem below.

## What happened: a sample-identity problem

The culture labelled “de novo” was subsequently identified as a NEXT culture. The project record indicates a likely mix-up during assembly or transformation, but the precise step was not established. Consequently, its OD₆₀₀ and sequencing results could not be used as evidence for de novo-tag performance.

The de novo branch therefore has computational design outputs but no confidently attributable selection result. NEXT-derived sequences observed in the mislabelled sample do not validate the de novo library, and no de novo winner or pre/post-selection property-cluster shift can be inferred from those data.

## What we can conclude and how to continue

The design work produced a motif-based sequence catalogue and a recorded degenerate synthesis design. These remain useful outputs for reconstructing the intended experiment. Their biological value has not yet been tested with a verified de novo culture.

A repeat should resolve the catalogue-to-oligonucleotide mapping, verify insert identities before pooling and selection, and document the realised library diversity. Subsequent selection could then test whether newly designed sequence patterns support β-lactamase function, with independent cultures and direct measurements of soluble protein yield and enzyme activity. Outcomes should be compared with the controls and natural-template tags only after sample identity is established.

## Sources and code

- Tang et al. (2024), artificial-IDP background reading in the project research collection.
- Project report and protocol master sheet, motif definitions and generation criteria.
- Project sample-identity record for the culture labelled de novo.
- [Project code repository](https://github.com/TKA0329/iDEC_Cambridge_2026).

