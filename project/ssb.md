---
layout: page
title: Evolving a disordered bacterial protein tail as a fusion tag
permalink: /project/ssb/
---
## Why the SSB tail?

Our SSB construct uses a 42-amino-acid C-terminal fragment of *Escherichia coli* single-stranded DNA-binding protein, encoded by 126 bp. The design focuses on its flexible, extended, and disordered C-terminus region instead of its structured DNA-binding domain, while leaving out the last few C-terminal residues involved in interacting with other proteins.
 
We hypothesized that if we fuse this intrinsically disordered peptide (SSB IDP) to the C-terminus of a client protein, it can hinder contacts between aggregation-promoting hydrophobic surfaces on client proteins. 

SSB IDP therefore offered a template naturally derived from E coli to generate mutated variants with different hydrophilicity, charge, and composition. 

Our aim was to identify SSB-derived variant sequences better at enhancing client protein solubility. Therefore, we fused SSB-derived variants to an aggregation-prone beta-lactamase and applied carbenicillin antibiotic to E coli expressing this beta-lactamase. SSB-derived variants better at solubilizing beta-lactamase confer higher carbenicillin resistance and were favored by selection pressure. E coli carrying these variants survived more and sequencing reads were more enriched with these variants. 

## How we built the SSB library

### Amino acid mutagenesis and filtering

Computational mutagenesis replaced consecutive blocks of 5 amino acids and then 3 amino acids, with 1,000 candidates generated per block. The preliminary SSB library contained 22,000 sequences. Variants with (assumed) worse in-silico properties than original SSB sequence was filtered out, and only 132 candidate variants remained.

| Descriptor | SSB filter threshold |
| --- | --- |
| GRAVY | ≤ −1.3048 |
| Estimated net charge at pH 7 | ≤ −1.0 or ≥ 2.0 |
| Helix–sheet fraction sum | ≤ 0.1428 |
| Turn fraction | ≥ 0.5714 |
| Instability index | ≤ 102.6 |

These SSB-specific thresholds retained variants compatible with the intended hydrophilic, flexible tag design. A small caveat is that the small retained set reflects the chosen filters, rather than proof that other SSB variants definitely cannot function better in reality. Other caveats include that the instability index does not directly measure cellular degradation, and the helix–sheet fraction does not establish the peptide's structure experimentally.

### Encoding the library in degenerate DNA

The filtered SSB sequences were deduplicated and aligned. Mutation hotspots were identified relative to original SSB sequence, with original residues retained outside the selected hotspots. Degenerate codons were chosen to cover the desired hotspot residues while penalising off-target residues and excluding stop-encoding codons. The resulting 126-bp library sequence, excluding homology arms, was:

```text
AGACAAGGAGGAGGAARCCSAGVCRGARGCAACATAGGAGGAGGACAACCACAAGGAGGAAASCRACRACVCCVAMASCSACAAGGAGGAAACCAATTCAGCGGAGGAARARGSMVCAGACCACAA
```

Its theoretical encoding space was 995,328 sequences. One caveat was that the degenerate codons recombined to allow residues not present in the selected sequence to enter the encoding space. Nevertheless, approximately 47.3% (470,332 sequences) still met our previous in silico filtering criteria. Also, these figures describe the designed encoding space, and there were loss of variants gibson assembly, plasmid transformation or variant sequencing. 

### Expression and antibiotic selection

The tag was fused to the C-terminus of aggregation-prone L76N TEM-1 β-lactamase through a `GGGGSGGGGS` linker. This configuration preserved the enzyme's N-terminal secretion signal. Expression was controlled by the arabinose-inducible pBAD promoter. Empty pBAD and untagged L76N β-lactamase served as controls for antibiotic susceptibility and tag-independent resistance, respectively.

The sfGFP coding sequence was removed from the starting backbone by PCR, followed by DpnI digestion and purification. β-Lactamase and its linker were inserted by Gibson assembly at a vector:insert molar ratio of 1:2, at 50°C for 15 minutes. The resulting plasmid was linearised immediately before the stop codon, and the tag insert was assembled at a ratio of 1:5, at 50°C for 30 minutes. Degenerate oligonucleotides were converted from single-stranded to double-stranded DNA before assembly. Assembly products (2 µL) were transformed into 50 µL competent DH10β cells, with 30 minutes on ice, heat shock at 42°C for 30 seconds and one hour of SOC recovery before overnight LB culture.

Cultures were induced with 0.2% L-arabinose and diluted to a starting OD₆₀₀ of 0.05 in Lennox LB containing 10 µg/mL tetracycline. Carbenicillin concentrations were 0, 5,000, 10,000, 15,000, 30,000 and 40,000 µg/mL. OD₆₀₀ was measured using three 100 µL aliquots from each culture. These were technical measurements of one culture, rather than independent biological replicates. Plate-reader values follow that of standard 96 well-plate instead of being converted to 1 cm path length (the documented conversion factor is 5.6).

After 21 hours, it was discovered that 40,000 µg/mL carbenicillin was the most stringent selection pressure in our test that allowed at least some E coli variants to survive. Hence, only 0 and 40,000 µg/mL carbenicillin cultures were used for sequencing. Here, “untreated” denotes the parallel culture without carbenicillin; it is not necessarily a time-zero sample. OD₆₀₀ measures culture turbidity and was thought to represent viability of survived E coli variants. However, it turned out OD₆₀₀ cannot by itself establish viable-cell survival or soluble β-lactamase yield.

### Sequencing and variant identification

Following selection, cultures were grown at 25°C and harvested before saturation. Plasmids were isolated using the PureLink Quick Plasmid Miniprep Kit. The tag-containing region was amplified with pBAD F and pBAD R, gel-purified and submitted to Plasmidsaurus for Oxford Nanopore R10.4.1 amplicon sequencing.

To get effective SSB variant sequences as much as possible, FASTQ reads were searched in both orientations for a 60-nucleotide upstream anchor using Edlib semiglobal alignment, allowing up to 16 edit differences. The pipeline extracted the 126-bp tag region and checked the downstream 60-nucleotide flank. A second reference alignment, allowing up to 32 edit differences, rescued reads only when the variable region retained its expected length and contained no insertion or deletion. Extracted sequences were checked against the designed IUPAC nucleotide pattern. High-confidence mismatches (Phred ≥30) were discarded. Lower-quality mismatches at fixed-base positions were corrected to the expected base; mismatches at ambiguous positions were discarded when the intended nucleotide could not be resolved. Sequences containing premature stop codons were also excluded.

Reads were translated and frequency of each SSB variant was counted. Subsequent analyses used this count of individual SSB variants, without the optional abundance-based merging of similar sequences.

### Comparing composition and sequence properties before and after selection

All retained SSB sequences observed in either culture were combined into one catalogue. A two-row contingency table contained untreated and selected read counts for each sequence, with zero assigned where a sequence was not detected. Pearson's χ² statistic quantified the discrepancy from equal relative composition. Because many expected counts were small, its null distribution was estimated from 100,000 random tables generated with Patefield's algorithm, preserving both sample read totals and pooled counts for each variant. The seed was 42 and the Monte Carlo estimate was `(b + 1) / (100,000 + 1)`, where `b` counted simulated statistics at least as large as the observed statistic. This tests compatibility with random read allocation under the equal-composition model; it does not correct experimental biases or supply biological replication.

Importantly, we hope to know whether our selection pressure has significantly favored certain properties of SSB-derived variants compared to our unselected library. For property analysis, each unique SSB sequence was characterized by eight descriptors: GRAVY, estimated net charge at pH 7, instability index, turn fraction, combined helix- and sheet-associated residue fractions, and IDP-BERT predictions of radius of gyration, heat capacity and end-to-end decorrelation time. Features were standardised once across the pooled catalogue. For each descriptor (property), we performed a non-parametric Mann-Whitney U test by categorising variants into before selection group and after selection group. This test was applied because the descriptors are non-normally distributed; some descriptors take few distinct values; and many variants are tied in descriptor values. 

For more detailed property analysis, we found our sequencing depth to be very limited, and we encountered many variants present in low counts after selection but absent before selection, or vice versa. Fortunately, the essence of SSB-derived IDP variants lies in their property instead of the specific sequence as it is disordered. Therefore, based on property similarity, we were able to merge these very low frequency variants into large clusters for detailed pre & post-selection property analysis, finding best-performing cluster, and later the best-performing variant. Ward hierarchical clustering with Euclidean distance was evaluated for two to nine clusters, with the highest mean silhouette score used to select the partition.

These fixed clusters were used in both samples pre & post-selection. Cluster abundance was the sum of frequency of member variants divided by the sample's total reads. PCA projected the same standardised features onto two axes for display; clustering used the full feature space. A change in a read-weighted cluster centre reflects changes in member abundance, rather than movement of an individual sequence or redefinition of its cluster. All retained sequences, including singletons, contributed to the analysis. 



### Selecting current best-performing SSB-derived variant

Relative frequency was calculated for each SSB-derived variant before and after selection, using [variant frequency / total number of effective sequencing reads in the FASTQ file]. The percentage increase [(relative frequency after selection - relative frequency before selection) / relative frequency before selection] was calculated for each SSB-derived variant. Highest percentage increase was taken to mean better solubility-enhancing performance of the variant, so the variant was ranked closer to the top. 

If 2 or more variants have the same percentage increase, the variant with higher relative frequency before selection was ranked closer to the top, as the percentage increase has more certainty and less relative error due to random sampling.  The overall top enriched variant was found to also come from the most enriched cluster of variants, and this provided internal consistency. 



## What we observed

### Culture response to carbenicillin

The SSB-derived library reached an endpoint OD₆₀₀ of 0.091 at 10,000 µg/mL carbenicillin after 21 hours. The corresponding [NEXT library](next.md) value was 0.314. This comparison showed that SSB-derived libraries seemed to grow slower under selection pressure. However, this OD₆₀₀ does not measure the solubility enhancement of individual SSB variants.

<figure class="project-figure">
  <img src="{{ '/img/figures/endpoint.png' | relative_url }}"
       alt="Endpoint optical density of the empty pBAD control, untagged beta-lactamase, SSB library and NEXT-A library across carbenicillin concentrations"
       loading="lazy">
  <figcaption><strong>Figure 1.</strong> Endpoint blank-corrected OD<sub>600</sub> across the tested initial carbenicillin concentrations. Open symbols are three well readings and filled symbols show their mean ± one standard deviation. The controls were measured on a different date and at a slightly different endpoint from the SSB and NEXT-A libraries, so these are technical measurements rather than same-run biological replicates.</figcaption>
</figure>

### SSB sequence composition changed strongly

Untreated and selected SSB samples differed in variant composition (Pearson χ² = 1026.1). None of 100,000 fixed-margin simulated tables produced a statistic as large as observed. The corrected Monte Carlo estimate was approximately 1 × 10⁻⁵, at the simulation resolution floor. Under the equal-composition model, random read allocation alone was unlikely to produce the observed discrepancy. Nevertheless, the result does not establish that selection was the sole cause of the change as genetic drift effect was unable to be directly measured. 

### Properties changes of whole population
Our Mann-Whitney U test between before and after selection groups showed six significant property changes in whole population. 

First, charge at pH 7 increases after selection (p<0.05) and hydrophilicity also increases by GRAVY score (p<0.05). This increase in hydrophilicity is consistent with results from Tang et al. (2024) and Ma et al. (2026). Increased hydrophilicity allows more polar interaction between the IDP and aqueous environment, thus increasing the solubility-enhancing performance of selected SSB-derived variants. Moreover, increased charge cause more intramolecular repulsion and may lead to more expanded conformation (Müller-Späth et al., 2010). This is consistent with the observed increase in radius of gyration of SSB-derived IDPs after selection (p<0.05). 

Second, the helix sheet sum decreases significantly from before to after selection (p<0.05). This corroborates well with our expectation, because a lower tendency to form such stable, ordered secondary structures–alpha helix and beta sheets–-increase the intrinsic disorder of the peptide, which contributes mainly to its behavior as an entropic bristle. 

Third, the instability index showed decrease from before to after selection with nominal statistical significance (p<0.05). This might be because our SSB-derived IDPs exposed potential degron sequences while extending from the C terminus of fusion protein. The more degradation-prone sequences were degraded faster and confer less carbenicillin resistance, and were more depleted after selection. However, instability index rely mostly on dipeptide composition and its accuracy was questionable (Gunaratne et al.,2019), so the conclusion here requires further validation. 

Fourth, the turn fraction decreases significantly from before to after selection (p<0.05). This was not directly within our expectation, and we proposed that for IDPs to better block the aggregation-prone surface of client protein more completely, it needs more extended conformation (Santner et al., 2012) and thus less turn fraction, despite turns being a type of disordered structure. This is also consistent with the increase in radius of gyration after selection (p<0.05). 

Overall, these population property changes provides some certainty that our selection method did favor the more solubility-enhancing SSB-derived variants.

<figure class="project-figure project-figure--portrait">
  <img src="{{ '/img/figures/ssb_pop_means.png' | relative_url }}"
       alt="Bar charts comparing count-weighted mean sequence properties of untreated and selected SSB populations"
       loading="lazy">
  <figcaption><strong>Figure 2.</strong> Count-weighted mean properties of the untreated and selected SSB populations. Whiskers show ± one count-weighted population standard deviation. An asterisk denotes a significant pairwise Mann–Whitney U test after correction at <em>p</em> &lt; 0.05.</figcaption>
</figure>


### Enrichment was dominated by SSB-054

The shared hierarchical analysis selected two SSB property clusters, with a silhouette score of 0.321.

| Sample | C1 (% of reads) | C2 (% of reads) |
| --- | --- | --- |
| Untreated | 72.2 | 27.8 |
| Selected | 89.5 | 10.5 |

C1 increased by 17.3 percentage points. Much of this shift was attributable to SSB-054, which accounted for 352 selected reads post-selection (72.6% of that sample) and was not detected in the untreated sample. A finite fold-enrichment value cannot be calculated from 0 pre-selection frequency, but non-detection does not demonstrate absence from the starting library. 

The silhouette score indicates only moderate separation of these property groups. C1 and C2 should therefore be treated as useful descriptive partitions, rather than two established functional classes. Their numbering is specific to SSB and does not identify corresponding NEXT clusters.

### Properties of the enriched cluster (cluster 1)

Within cluster 1, the helix sheet sum and instability index decrease after selection. Moreover, the read-weighted mean GRAVY decreased from −1.96 to −2.08 and estimated charge at pH 7 increased from 8.86 to 9.83. Selected cluster 1 had a predicted radius of gyration of 18.61 Å and end-to-end decorrelation time of 143,617 fs. These property changes were largely consistent with the population-level property changes, and similar explanations may apply. 

These summaries are strongly influenced by the sequences accounting for most reads, especially SSB-054. They suggest which properties to investigate, but they cannot show that greater hydrophilicity, charge or predicted expansion caused enrichment because they can be enriched passively while inherited along with an unmeasured beneficial property. 

<figure class="project-figure">
  <img src="{{ '/img/figures/ssb_pca.png' | relative_url }}"
       alt="PCA projections of untreated and selected SSB variants coloured by property cluster and sized by read fraction"
       loading="lazy">
  <figcaption><strong>Figure 3.</strong> PCA display of the fixed SSB property clusters before and after selection. Point area represents each variant's fraction of reads on a shared scale; crosses mark read-weighted cluster centres. Clustering used all standardised features, whereas the two PCA axes are a display projection explaining 80.5% of feature variance.</figcaption>
</figure>

<figure class="project-figure project-figure--portrait">
  <img src="{{ '/img/figures/ssb_weighted_traits.png' | relative_url }}"
       alt="Plots of read-weighted SSB sequence traits within clusters C1 and C2 before and after selection"
       loading="lazy">
  <figcaption><strong>Figure 4.</strong> Read-weighted trait means within each fixed SSB cluster. Lines connect the untreated and selected summaries for the same cluster; they describe changes in read composition and do not show movement or experimental measurement of an individual sequence.</figcaption>
</figure>

### Current best-performing SSB-derived variant
SSB-054:RQGGGNRGRSNIGGGQPQGGKRRPQQRQGGNQFSGGRGRRPQ

## What this means for SSB

The clearest outcome is enrichment of the selected population around SSB-054 and the cluster it belongs to. SSB-054 is a candidate for individual reconstruction and functional testing. The population property shift suggested but not necessarily established better improvement in β-lactamase solubility by our post-selection SSB-derived IDPs. We are also not certain that these SSB-derived IDPs can fully retain enzyme activity, or if the enrichment after selection is highly reproducible. 

One biological replicate and finite sequencing depth leave culture bottlenecks, founder effects and amplification bias unresolved. Replicated assays of SSB-054 alongside parental SSB and untagged β-lactamase would test whether the enrichment reflects a useful fusion-tag phenotype.


## Sources and code

- SSB background papers cited in the report: Savvides et al. (2004), Tan et al. (2017), Kozlov et al. (2015) and Kinebuchi et al. (1997); see the project's SSB research-paper collection. 
- Additional citation used in wiki: 
Gunaratne, A., Gamage, D.G., Periyannan, G.R. and Russell, T.G. (2019). Applicability of instability index for in vitro protein stability prediction. Protein and Peptide Letters, [online] 26(5), pp.339–347. doi:10.2174/0929866526666190228144219.
Ma, Y., Yang, L., Chen, Y., Chen, M.W., Yu, W. and Dai, Y. (2026). Directed evolution of functional intrinsically disordered proteins. Nature Chemical Biology. [online] doi:10.1038/s41589-025-02128-3.
Muller-Spath, S., Soranno, A., Hirschfeld, V., Hofmann, H., Ruegger, S., Reymond, L., Nettels, D. and Schuler, B. (2010). Charge interactions can dominate the dimensions of intrinsically disordered proteins. Proceedings of the National Academy of Sciences, 107(33), pp.14609–14614. doi:10.1073/pnas.1001743107.
Santner, A.A., Croy, C.H., Vasanwala, F.H., Uversky, V.N., Van, Y.-Y.J. and Dunker, A.K. (2012). Sweeping away protein aggregation with entropic bristles: Intrinsically disordered protein fusions enhance soluble expression. Biochemistry, [online] 51(37), pp.7250–7262. doi:10.1021/bi300653m.
Tang, N.C., Su, J.C., Shmidov, Y., Kelly, G., Deshpande, S., Sirohi, P., Peterson, N. and Chilkoti, A. (2024). Synthetic intrinsically disordered protein fusion tags that enhance protein solubility. Nature Communications, 15(1). doi:10.1038/s41467-024-47519-7.
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
