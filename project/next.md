---
layout: page
title: Evolving a natural solubility tag
permalink: /project/next/
---

## Why NEXT?

NEXT was chosen as a starting template for evolving a compact tag that could support the soluble expression of an aggregation-prone enzyme. It originates from the N-terminal extension of α-carbonic anhydrase from *Hydrogenovibrio marinus*. The construct used in this project contains 52 amino acids, encoded by 156 bp.

The background literature describes this extension as intrinsically disordered and proposes an entropic-bristle mechanism: a flexible peptide can hinder intermolecular contacts that promote aggregation. Jo et al. (2022) reported improved soluble expression of several fusion partners, including carbonic anhydrase from *Thermovibrio ammonificans*, with limited effects on enzyme activity. This provided a rationale for exploring variants of an existing solubility tag rather than designing a completely new sequence, even though this solubility tag was not natural to *Escherichia coli*.

Our aim was to identify NEXT-derived variant sequences better at enhancing client protein solubility. Therefore, we fused NEXT-derived variants to an aggregation-prone beta-lactamase and applied carbenicillin antibiotic to E coli expressing this beta-lactamase. NEXT-derived variants better at solubilizing beta-lactamase confer higher carbenicillin resistance and were favored by selection pressure. E coli carrying these variants survived more and sequencing reads were more enriched with these variants.

## How we built the NEXT library

### Amino acid mutagenesis and filtering

Computational mutagenesis replaced consecutive blocks of 5 amino acids and then 3 amino acids, with 1,000 candidates generated per block. The preliminary NEXT library contained 29,000 sequences. Variants with (assumed) worse in-silico properties than original SSB sequence was filtered out, and only 4,285 candidate variants remained.

| Descriptor | NEXT threshold |
| --- | --- |
| GRAVY | ≤ −0.7558 |
| Estimated net charge at pH 7 | ≤ −1.0 or ≥ 1.0 |
| Helix–sheet fraction sum | ≤ 0.6923 |
| Turn fraction | ≥ 0.25 |
| Instability index | ≤ 50.35 |

These NEXT-specific thresholds retained variants compatible with the intended hydrophilic, flexible tag design. A small caveat is that the small retained set reflects the chosen filters, rather than proof that other SSB variants definitely cannot function better in reality. Other caveats include that the instability index does not directly measure cellular degradation, and the helix–sheet fraction does not establish the peptide's structure experimentally.

### Encoding variants in degenerate DNA

The filtered NEXT sequences were deduplicated and aligned. Mutation hotspots were identified relative to original NEXT sequence, with original residues retained outside the selected hotspots. Degenerate codons were chosen to cover the desired hotspot residues while penalising off-target residues and excluding stop-encoding codons. The resulting 156-bp library sequence, excluding homology arms, was:

```text
GCAGTACAACACAGCAACGSAARCCYAADCGACCTAGGAGCAGAAATGAAAAAACAACACAAAVMSMRAAASCCAGAAGGAVVCGSAARCGCACAAGGAAAAGCARRSRMSHACRASRVAAAAAAAGAAGAAGCACCAAAACCAAAACCAGTAGTA
```

Its theoretical encoding space was 1.41 × 10⁸ sequences. One caveat was that the degenerate codons recombined to allow residues not present in the selected sequence to enter the encoding space. Nevertheless, approximately 97.5% (1.38 × 10⁸ sequences) still met our previous in silico filtering criteria. Also, these figures describe the designed encoding space, and there were loss of variants gibson assembly, plasmid transformation or variant sequencing. 

### Expression and antibiotic selection
<figure class="project-figure project-figure--portrait">
  <img src="{{ '/img/figures/carb_method.jpeg' | relative_url }}"
       alt="carbenicillin selection workflow"
       loading="lazy">
  <figcaption><strong>Figure 2. </strong> Carbenicillin selection mechanism.</figcaption>
</figure>

The tag was fused to the C-terminus of aggregation-prone L76N TEM-1 β-lactamase through a `GGGGSGGGGS` linker. This configuration preserved the enzyme's N-terminal secretion signal. Expression was controlled by the arabinose-inducible pBAD promoter. Empty pBAD and untagged L76N β-lactamase served as controls for antibiotic susceptibility and tag-independent resistance, respectively.

The sfGFP coding sequence was removed from the starting backbone by PCR, followed by DpnI digestion and purification. β-Lactamase and its linker were inserted by Gibson assembly at a vector:insert molar ratio of 1:2, at 50°C for 15 minutes. The resulting plasmid was linearised immediately before the stop codon, and the tag insert was assembled at a ratio of 1:5, at 50°C for 30 minutes. Degenerate oligonucleotides were converted from single-stranded to double-stranded DNA before assembly. Assembly products (2 µL) were transformed into 50 µL competent DH10β cells, with 30 minutes on ice, heat shock at 42°C for 30 seconds and one hour of SOC recovery before overnight LB culture.

Cultures were induced with 0.2% L-arabinose and diluted to a starting OD₆₀₀ of 0.05 in Lennox LB containing 10 µg/mL tetracycline. Carbenicillin concentrations were 0, 5,000, 10,000, 15,000, 30,000 and 40,000 µg/mL. OD₆₀₀ was measured using three 100 µL aliquots from each culture. These were technical measurements of one culture, rather than independent biological replicates. Plate-reader values follow that of standard 96 well-plate instead of being converted to 1 cm path length (the documented conversion factor is 5.6).

After 21 hours, it was discovered that 40,000 µg/mL carbenicillin was the most stringent selection pressure in our test that allowed at least some E coli variants to survive. Hence, only 0 and 40,000 µg/mL carbenicillin cultures were used for sequencing. Here, “untreated” denotes the parallel culture without carbenicillin; it is not necessarily a time-zero sample. OD₆₀₀ measures culture turbidity and was thought to represent viability of survived E coli variants. However, it turned out OD₆₀₀ cannot by itself establish viable-cell survival or soluble β-lactamase yield.

### Sequencing and variant identification

Following selection, cultures were grown at 25°C and harvested before saturation. Plasmids were isolated using the PureLink Quick Plasmid Miniprep Kit. The tag-containing region was amplified with pBAD F and pBAD R, gel-purified and submitted to Plasmidsaurus for Oxford Nanopore R10.4.1 amplicon sequencing.

To get effective NEXT variant sequences as much as possible, FASTQ reads were searched in both orientations for a 60-nucleotide upstream anchor using Edlib semiglobal alignment, allowing up to 16 edit differences. The pipeline extracted the 126-bp tag region and checked the downstream 60-nucleotide flank. A second reference alignment, allowing up to 32 edit differences, rescued reads only when the variable region retained its expected length and contained no insertion or deletion. Extracted sequences were checked against the designed IUPAC nucleotide pattern. High-confidence mismatches (Phred ≥30) were discarded. Lower-quality mismatches at fixed-base positions were corrected to the expected base; mismatches at ambiguous positions were discarded when the intended nucleotide could not be resolved. Sequences containing premature stop codons were also excluded.

Reads were translated and frequency of each NEXT variant was counted. Subsequent analyses used this count of individual NEXT variants, without the optional abundance-based merging of similar sequences.

### Comparing composition and sequence properties

All retained NEXT sequences observed in either culture were combined into one catalogue. A two-row contingency table contained untreated and selected read counts for each sequence, with zero assigned where a sequence was not detected. Pearson's χ² statistic quantified the discrepancy from equal relative composition. Because many expected counts were small, its null distribution was estimated from 100,000 random tables generated with Patefield's algorithm, preserving both sample read totals and pooled counts for each variant. The seed was 42 and the Monte Carlo estimate was `(b + 1) / (100,000 + 1)`, where `b` counted simulated statistics at least as large as the observed statistic. This tests compatibility with random read allocation under the equal-composition model; it does not correct experimental biases or supply biological replication.

Importantly, we hope to know whether our selection pressure has significantly favored certain properties of NEXT-derived variants compared to our unselected library. For property analysis, each unique NEXT sequence was characterized by eight descriptors: GRAVY, estimated net charge at pH 7, instability index, turn fraction, combined helix- and sheet-associated residue fractions, and IDP-BERT predictions of radius of gyration, heat capacity and end-to-end decorrelation time. Features were standardised once across the pooled catalogue. For each descriptor (property), we performed a non-parametric Mann-Whitney U test by categorising variants into before selection group and after selection group. This test was applied because the descriptors are non-normally distributed; some descriptors take few distinct values; and many variants are tied in descriptor values. 

For more detailed property analysis, we found our sequencing depth to be very limited, and we encountered many variants present in low counts after selection but absent before selection, or vice versa. Fortunately, the essence of NEXT-derived IDP variants lies in their property instead of the specific sequence as it is disordered. Therefore, based on property similarity, we were able to merge these very low frequency variants into large clusters for detailed pre & post-selection property analysis, finding best-performing cluster, and later the best-performing variant. Ward hierarchical clustering with Euclidean distance was evaluated for two to nine clusters, with the highest mean silhouette score used to select the partition.

These fixed clusters were used in both samples pre & post-selection. Cluster abundance was the sum of frequency of member variants divided by the sample's total reads. PCA projected the same standardised features onto two axes for display; clustering used the full feature space. A change in a read-weighted cluster centre reflects changes in member abundance, rather than movement of an individual sequence or redefinition of its cluster. All retained sequences, including singletons, contributed to the analysis. 

### Selecting current best-performing NEXT-derived variant

Relative frequency was calculated for each NEXT-derived variant before and after selection, using [variant frequency / total number of effective sequencing reads in the FASTQ file]. The percentage increase [(relative frequency after selection - relative frequency before selection) / relative frequency before selection] was calculated for each NEXT-derived variant. Highest percentage increase was taken to mean better solubility-enhancing performance of the variant, so the variant was ranked closer to the top. 

If 2 or more variants have the same percentage increase, the variant with higher relative frequency before selection was ranked closer to the top, as the percentage increase has more certainty and less relative error due to random sampling.  The overall top enriched variant was found to also come from the most enriched cluster of variants, and this provided internal consistency. 

## What we observed

### Culture response to carbenicillin

The NEXT-derived library had an endpoint OD₆₀₀ of 0.314 at 10,000 µg/mL carbenicillin after 21 hours. The corresponding [SSB library]({{ '/project/ssb/' | relative_url }}) value was 0.091. This comparison showed that NEXT-derived libraries seemed to grow faster under selection pressure. However, this OD₆₀₀ does not measure the solubility enhancement of individual NEXT variants.

<figure class="project-figure">
  <img src="{{ '/img/figures/endpoint.png' | relative_url }}"
       alt="Endpoint optical density of the empty pBAD control, untagged beta-lactamase, SSB library and NEXT-A library across carbenicillin concentrations"
       loading="lazy">
  <figcaption><strong>Figure 1.</strong> Endpoint blank-corrected OD<sub>600</sub> across the tested initial carbenicillin concentrations. Open symbols are three well readings and filled symbols show their mean ± one standard deviation. The controls were measured on a different date and at a slightly different endpoint from the SSB and NEXT-A libraries, so these are technical measurements rather than same-run biological replicates.</figcaption>
</figure>

### NEXT sequence composition changed

The untreated and selected NEXT samples differed in variant composition (Pearson χ² = 545.25). None of 100,000 fixed-margin simulated tables reached the observed statistic, giving a corrected Monte Carlo estimate of approximately 1 × 10⁻⁵. This is the simulation's resolution floor, rather than a precise estimate of a smaller underlying tail probability.

### Properties changes of whole population
Our Mann-Whitney U test between before and after selection groups showed three significant property changes in whole population.

First, hydrophilicity increases as GRAVY score become more negative after selection (p<0.05). This increase in hydrophilicity is consistent with results from Tang et al. (2024) and Ma et al. (2026). Increased hydrophilicity allows more polar interaction between the IDP and aqueous environment, thus increasing the solubility-enhancing performance of selected SSB-derived variants.

Second, the instability index showed decrease from before to after selection (p<0.05). This might be because our NEXT-derived IDPs exposed potential degron sequences while extending from the C terminus of fusion protein. The more degradation-prone sequences were degraded faster and confer less carbenicillin resistance, and were more depleted after selection. However, the instability index rely mostly on dipeptide composition and its accuracy was questionable (Gunaratne et al.,2019), so the conclusion here requires further validation.

Third, the radius of gyration increases after selection with nominal statistical significance (p<0.05). This might allow more aggregation-prone surface of the client protein to be shielded from aggregating into inclusion bodies.

Overall, these population property changes provide some but limited certainty that our selection method did favour the more solubility-enhancing NEXT-derived variants. 

 
<figure class="project-figure project-figure--portrait">
  <img src="{{ '/img/figures/next_properties_updated.png' | relative_url }}"
       alt="Bar charts comparing count-weighted mean sequence properties of untreated and selected NEXT populations"
       loading="lazy">
  <figcaption><strong>Figure 2. </strong> above shows the change in three properties of NEXT-derived IDP variants before (untreated) and after (selected) selection. * indicates statistical significance with corrected Mann-Whitney U test p value threshold = 0.05. Notice that error bars are plotted as ±1 standard deviation but they are not representative. This is because the property values are non-normally distributed; values take few distinct values; and many variants are tied in property values.</figcaption>
</figure>

### A less abundant property group became enriched

The shared property analysis identified two NEXT clusters. Their contributions to the sequenced population were:

| Sample | C1 (% of reads) | C2 (% of reads) |
| --- | --- | --- |
| Untreated | 93.9 | 6.1 |
| Selected | 70.4 | 29.6 |

C2 increased by 23.5 percentage points, or approximately 4.9-fold in relative abundance. 

### Properties of the enriched cluster (cluster 2)

In the selected sample, C2 had a higher read-weighted estimated charge than C1 (5.55 versus 2.34) and a more negative GRAVY score (−1.41 versus −1.32). As C2 was enriched while C1 decreases in proportion after selection, this is roughly consistent with the Mann-Whitney U test on whole population property changes. More polar, hydrophilic variants in cluster 2 enhances the solubility of fused beta-lactamase protein more. 

C2 also had a higher predicted mean radius of gyration (20.5 Å versus 19.5 Å) and end-to-end decorrelation time (258,947 fs versus 216,561 fs) than C1 after selection. The higher radius of gyration in C2 may be due to higher magnitude of charge in C2. This is because increased charge magnitude increases intramolecular repulsion to cause more expanded IDP conformation (Müller-Späth et al., 2010) and thus increases radius of gyration.  

Both C2 and C1 decreased significantly in the instability index from before to after selection. Similar explanations from whole population decrease in the instability index apply here. 

The combined helix–sheet fraction in C2 remained broadly similar before and after selection. This was not directly within our expectation. Further exploration is needed to determine why a further drop in tendency to form stable secondary structure–alpha helix and beta sheet–was not observed in NEXT-derived variants after selection, but was observed in SSB-derived variants. 

However, it is also important to note that these are predicted properties. Real experimental measurements of molecular dimensions or dynamics in the future are necessary to validate or disproof the explanations.  

<figure class="project-figure">
  <img src="{{ '/img/figures/next_pca.png' | relative_url }}"
       alt="PCA projections of untreated and selected NEXT variants coloured by property cluster and sized by read fraction"
       loading="lazy">
  <figcaption><strong>Figure 3.</strong> PCA display of the fixed NEXT property clusters before and after selection. Point area represents each variant's fraction of reads on a shared scale; crosses mark read-weighted cluster centres. Clustering used all standardised features, whereas the two PCA axes are a display projection explaining 69.8% of feature variance.</figcaption>
</figure>

<figure class="project-figure project-figure--portrait">
  <img src="{{ '/img/figures/next_weighted_traits.png' | relative_url }}"
       alt="Plots of read-weighted NEXT sequence traits within clusters C1 and C2 before and after selection"
       loading="lazy">
  <figcaption><strong>Figure 4.</strong> Read-weighted trait means within each fixed NEXT cluster. Lines connect the untreated and selected summaries for the same cluster; they describe changes in read composition and do not show movement or experimental measurement of an individual sequence.</figcaption>
</figure>

### NEXT-072 as a candidate for validation

NEXT-072 was prioritised for its increase in relative representation during selection. Its sequence is:

```text
AVQHSNGNLSDLGAEMKKQHKTKNPEGHASAQGKAGAHNRKKEEAPKPKPVV
```

In the recorded candidate table, its counts increased from 4 untreated reads to 98 selected reads, corresponding to approximately 0.84% and 18.39% of their respective samples. This is an increase of 17.55 percentage points, or approximately 22-fold in relative abundance. Its GRAVY score was −1.3692, estimated charge at pH 7 was 5.276 and instability index was 25.97. Enrichment makes it a candidate for reconstruction and individual testing; it does not completely establish that NEXT-072 confers superior soluble protein yield.

### Comparison with error-prone PCR

A separate, unselected NEXT error-prone PCR library was generated through three consecutive PCR rounds. The analysed frequency table contained 2,448 unique sequences and 2,850 reads. After excluding stop-containing sequences, 2,088 unique sequences and 2,482 reads remained.

<figure class="project-figure project-figure--portrait">
  <img src="{{ '/img/figures/eppcr_comparison.png' | relative_url }}"
       alt="PCA plot of epPCR generated NEXT tags with NEXT-072 as reference"
       loading="lazy">
  <figcaption><strong>Figure 5.</strong> PCA plot of epPCR generated NEXT tags with NEXT-072 as a reference sequence.</figcaption>
</figure>

For visual comparison, the valid error-prone PCR variants were displayed in one colour, with NEXT-072 projected as a labelled reference point using the same feature scaling and PCA transformation fitted to that catalogue. The first two components represented approximately 62% of the feature variance. NEXT-072 lay outside the densest region of this projection and was not detected as an exact sequence in the analysed error-prone PCR dataset.

Since error-prone PCR could not persist over 3-4 rounds in our test due to drastic drop in amplicon yield, this suggests that this selected variant (NEXT-072) has properties that error-prone PCR may not generate and the computational design was indispensable. However, many limitations weaken this claim. For instance, our sequencing coverage was finite, the PCR library was not selected, and the two-dimensional projection omits some feature variation. 
 

## What this means for NEXT

The NEXT experiment identified a change in sequence composition, enrichment of C2 and a strongly enriched candidate, NEXT-072. These findings support prioritising particular variants for follow-up assays. We were uncertain which property actively caused enrichment. With one biological replicate, genetic drifts, bias in sampling can also contribute to the observed differences. Independent reconstructions, replicated selection and measurements of soluble β-lactamase yield and activity are needed to test the selected NEXT-072.

## Sources and code

- Jo et al. (2022), background evidence for NEXT as a solubility tag; see the project's research-paper collection.
- Additional citation used in wiki: 
Gunaratne, A., Gamage, D.G., Periyannan, G.R. and Russell, T.G. (2019). Applicability of instability index for in vitro protein stability prediction. Protein and Peptide Letters, [online] 26(5), pp.339–347. doi:10.2174/0929866526666190228144219.
Ma, Y., Yang, L., Chen, Y., Chen, M.W., Yu, W. and Dai, Y. (2026). Directed evolution of functional intrinsically disordered proteins. Nature Chemical Biology. [online] doi:10.1038/s41589-025-02128-3.
Muller-Spath, S., Soranno, A., Hirschfeld, V., Hofmann, H., Ruegger, S., Reymond, L., Nettels, D. and Schuler, B. (2010). Charge interactions can dominate the dimensions of intrinsically disordered proteins. Proceedings of the National Academy of Sciences, 107(33), pp.14609–14614. doi:10.1073/pnas.1001743107.
Tang, N.C., Su, J.C., Shmidov, Y., Kelly, G., Deshpande, S., Sirohi, P., Peterson, N. and Chilkoti, A. (2024). Synthetic intrinsically disordered protein fusion tags that enhance protein solubility. Nature Communications, 15(1). doi:10.1038/s41467-024-47519-7.
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
