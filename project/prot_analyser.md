---
layout: page
title: Protein analyser
permalink: /project/prot_analyser/
---

### Conceptualization
The protein analyzer is used to score proteins on computationally calculated parameters based on the amino acid sequences. These parameters were selected as suitable proxies for the mechanisms behind the tags. 

### Function
Multiple parameters were chosen in order to score the proteins. Rationale was that we would filter the proteins based on the average parameter score of the library and would choose bounds based on the properties to be promoted for ideal function. 

Due to requiring a smaller final output in order to produce a more effective degenerate sequence, the number of parameters used to filter the sequences is used to control the size of the final output library rather than increasing the bounds of the filter. This is because we do not know the strict relationship between the boundary magnitude and the contribution it has to the performance of the tag.

### Refinements
Based on wet-lab data, parameters can now be validated as ideal proxies. Based on this, further rounds of analysis need not be done on parameters that are not good proxies.

Parameters are good proxies if the average value of the wet-lab selected libraries parameters are within the bounds of defined filter parameters.
