---
layout: page
title: Additional Discussions
permalink: /project/additional-discussions/
---

## Property changes observed in both SSB and NEXT tags

### Instability index

The instability index of a protein is an index assigned to a peptide sequence based on the sum of instability weight values associated with each of the 400 possible dipeptide combinations, normalised by sequence length. (Guruprasad et al., 1990). Traditionally, a score below 40 indicates a more stable protein with a longer half life, while a higher score than 40 is associated with lower stability. HOwever, it is important to note that in this context ‘stability’ refers to the ability of a protein to stay persistent in vivo, rather than its ability to retain a fixed conformational state. A lower stability index observed during enrichment would suggest that the IDP tags that retain their functions for longer in vivo are favoured, due to their ability in maintaining the solubility of b-lactamase for longer periods of time. 

However, protein persistence and solubilities are still different properties. The instability index of the tag does not necessarily reflect the stability of the entire protein, and a persistent tag attached to an inactivated protein will not improve its function. The mechanisms behind the association with enrichment requires additional investigation.

One possible explanation can be found in the position of tag placement: since each tag is connected to the target protein by the C terminus, a reduction in instability index may signal potentially reduced occurrences of C-degron motifs, which are short peptide sequences that tags the molecule for destruction via the ubiquitin-proteosome degradation pathway. More work is required to verify and quantify this hypothesis, through investigating the exact occurrences of C-degron motifs before and after selection.

Another possibility is that of indirect sequence association. A particular motif may be favoured during selection due to other unknown factors, which happens to be associated with a lowering of the instability index. More sequence level analysis investigating the rate of substitutions of amino acids and the changes in associated properties is needed to properly quantify the relationship between protein level changes and the decrease in instability index.

### Lower GRAVY and higher net charge

A higher net charge was observed to be associated with the enrichment of SSB and NEXT tags post selection. This suggests that an imbalance of positive and negative charges are favoured, rather than that the total number of charged residues increased. This change is also coupled with a decrease in GRAVY score, which is associated with an increase in proportion of hydrophilic residues. There is evidence through study of dehydrin IDPs that a possible mechanism for solubilising proteins is through the bridging of water molecules (Mouillon et al, 2006\) , and the increased GRAVY score would favour this hypothesis. 

A secondary consideration can be made through the perspective of charge imbalance. A greater proportion of positive or negative charges can favour more disordered behaviour through electrostatic repulsions, increasing the area which the IDP can ‘sweep’ out, thus increasing the entropic penalty for close protein interactions that lead to aggregation. Like charges on the same IDP tag can also potentially increase the electrostatic repulsion between target proteins, enhancing the entropic bristle mechanism.

We thus propose that the enrichment of NEXT and SSB derived tags can be explained through increased entropic bristle function, where an increased ability to sterically hinder the protein interactions that led to b-lactamase aggregation lead to greater cell survival. The tags favoured by selection are those that are able to exclude a greater area for protein interaction, thus disfavouring b-lactamase aggregation to a greater extent, or for a longer period of time. This view is also backed up by predictions from the IDP-BERT model, which reveals that enrichment is also associated with the increase in radius of gyration. 

## Eppcr methodology

### References:

[https\://pubs.acs.org/bichaw/article/51/37/7250/848878/Sweeping-Away-Protein-Aggregation-with-Entropic](https://pubs.acs.org/bichaw/article/51/37/7250/848878/Sweeping-Away-Protein-Aggregation-with-Entropic)

[https\://www\.jstor.org/stable/20205784?seq=1](https://www.jstor.org/stable/20205784?seq=1)  
