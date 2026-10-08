---
layout: page
title: Proportion optimiser
permalink: /project/pro_optimisation/
---

### Conceptualization
Based on the findings for iterating on the results of proportion optimization, the most effective method of improving degenerate sequence quality based on the filter metric is by refinement of input sequences.

### Function
This programme will refine the list of sequences to produce a degenerate sequence that has a higher quality by restricting the positions where degenerate bases can appear via median absolute deviation filtering and restricting the composition of amino acids in degenerate positions via proportion filtering.

The input set of sequences are used to generate multiple sets of all amino acids that appear in each amino acid position. These sets have the amino acid and the proportion that it occupies in the position.

Mutation hotspots are identified through median absolute deviation (MAD) filtering. A suitable threshold multiplier was selected such that all visible hotspots in the sequence logo of the initial set are included. All positions not included in this filter are set to appear as the amino acid with the highest proportion in each position, which is the original amino acid in the sequence.

Then, within each position, the top amino acid in each position is removed from consideration, and the top nth proportion of amino acids are defined to be included. This filters out the original sequences and amino acids that appear rarely.

The programme produces the quality score of degenerate sequences produced in 0.1 increments of proportion from 0 to 1. The selection of a suitable degenerate sequence that optimizes encoding space and proportion passing the filter test was selected.

### Rationale & Assumptions
The sequence logo of our input sequences definitively show the presence of hotspots. It was the background noise of amino acids that were included in non-hotspot regions and the noise within the hotspot regions that causes the combinatorial increase in encoding space.

Therefore, non-hotspot regions were wholly excluded from degenerate sequences as they were judged to carry minimal significance.

Furthermore, within each hotspot region, the background noise was causing the formation of many NNK bases, which encode too many amino acids. This was resolved by proportion filtering which removes the background noise across all hotspot regions fairly based on relative proportions within each set when dominant amino acid is removed.

These filtering steps produced degenerate sequences of higher quality of which were synthesized for wet-lab processes.

